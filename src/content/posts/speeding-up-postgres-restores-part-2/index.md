---
title: "Speeding up Postgres Restores Part 2"
date: 2017-04-12
tags: [development]
---

![Pug wrapped in a blanket](./pg-pug-2.jpeg)*Apparently there’s a lot of pugs in blankets*

In  [Part 1 of Speeding up Postgres Restores](/posts/speeding-up-postgres-restores/)  I talked about how we improved the time it took to restore our local environments. Initially, we started out naively pg_dump’ing (is this a word?), gzipping, unzipping, and then piping the output using psql < file.sql. This took over 30 minutes to do a full restore. In the end, we used [ Postgres’ custom format](https://www.postgresql.org/docs/current/static/app-pgdump.html)  and used the job’s argument to speed up the restore to only 16 minutes.

In this article, I’m going to outline how we reduced the file size of our backup that in turn sped up our restores even further.

## Investigation into Size of Backup
When I first wrote about reducing the size of our backups the compressed backup size was sitting around 2GB (30GB uncompressed). Over time our database almost doubled (3.7GB compressed, 68GB uncompressed). This meant that not only was it taking significantly more time to restore, it was also taking double the time to transfer the file across.

With the knowledge that the backup had doubled in size, I started trying to figure out why and where the data was growing the most.

The first thing I did was actually find out what the uncompressed size of the database was.
```
# SELECT pg_size_pretty(pg_database_size('dbname'));

pg_size_pretty
----------------
  68 GB
 (1 row)
```
Next I decided to see if I could dig into the sizes of the individual tables to see if there were any big culprits.
```
# SELECT table_name, pg_relation_size(table_name), 
pg_size_pretty(pg_relation_size(table_name))
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER by 2 DESC;

table_name         | pg_relation_size | pg_size_pretty
-------------------+------------------+---------------
 logging           |      19740196864 | 18 GB
 reversions        |      15719358464 | 15 GB
 webhook_logging   |       8780668928 | 8374 MB
 ...               |       1994645504 | 1902 MB
 ...               |        371900416 | 355 MB
 ...               |        304226304 | 290 MB
```
As you can see the top 3 tables, which make up over 60% of the entire database, are all related to history or logging, both of which generally aren’t necessary when restoring your dev environment. When you include the indexes to those tables (17GB, 1GB, 1.5GB respectively) these tables make up 89% of the database. With this information in hand, I decided to move on from discovery (89% reduction is good enough for me) and see if I could exclude these tables from our dev backups.

## Minimizing the Backup
Whenever I’m approaching a problem I like to start by reading the project documentation. PostgreSQL’s docs are fantastic and after a few minutes of reading through [`pg_dump's`](https://www.postgresql.org/docs/current/static/app-pgdump.html) documentation I found exactly what I needed.
```
pg_dump dbname -Fc \
   --exclude-table-data 'logging*' \
   --exclude-table-data 'reversions*' \
   --exclude-table-data 'webhooks_logging*' > postgres.dev.sql 
```
_* is used as a wildcard to remove the indexes for these tables as well._

By specifying the `--exclude-table-data` parameter I was able to reduce our database size from 3.7GB compressed (68GB uncompressed) to GB compressed 0.7GB (5.4GB compressed).

As you can see below the results are pretty great. It sped up

**Previously:**
```
$ pg_restore -d db -j 8 dumpfc.gz
real 16m49.539s
user 1m1.344s
sys 0m39.522s
```

**Now:**
```
$ pg_restore -d db -j 8 devfc.gz
real 5m38.156s
user 0m24.574s
sys 0m13.325s
```
As you can see, removing those tables removed 89% from the total size and sped up the overall restore time by 66%! If you remember back to part 1 we started off with an initial restore time of 32.5 minutes. This means we’ve managed to improve the restore time by over 26.9 minutes or 87%.
In the end, our active restore time got cut from 16 minutes to 5 minutes. 

This saves us an additional 57 hours of restore time a year (6 devs, 52 restores a year, 11 minutes). In total, we’ve removed 130 hours worth of time waiting for restores to happen.

## Final Tips and Thoughts
Going back to the  [PostgreSQL docs](https://www.postgresql.org/docs/current/static/populate.html)  there’s a number of things we could do to potentially make restoring faster. Things such as using the `-j` parameter on `pg_dump` to make backing up our database quicker (only available on PostgreSQL 9.3+). Disabling `autocommit` , increasing the `maintenance_work_mem` value to be much larger or setting the `max_wal_size` value to be larger as well.

At this point, I’m happy with the overall time it takes to restore our local environments.

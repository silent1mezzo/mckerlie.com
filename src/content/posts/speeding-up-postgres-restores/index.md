---
title: "Speeding up Postgres Restores"
date: 2016-03-04
tags: [development]
---

![Pug wrapped in a blanket](./pg-pug.jpeg)*How I felt throughout this process*

Recently I sat down to speed up our database restore process in our development environment. Like most projects, our database started out small and grew significantly over the years. When we started the database was just a couple of MB uncompressed. Now it’s almost 2GB compressed (50GB uncompressed). We restore our dev environment once a week on average and the old way of doing restores was no longer working. When I saw “ [DB restore foos?](https://xkcd.com/303/) ” in our Slack channel I knew it was time to fix this.

Below is the process I took to speed up our DB restores.

## Naive Approach
Below is essentially our first version of backing up and restore. On our main Postgres database, we’d run a simple pg_dump and pipe the output into gzip. When we wanted to restore our dev environment we’d SCP the compressed file over, uncompress it and then just load it via psql command.

```
$ pg_dump db | gzip > dump.gz
real 7m9.882s
user 5m7.383s
sys 2m56.495s

$ gunzip dump.gz
real 2m27.700s
user 1m28.146s
sys 0m41.451s

$ psql db < dump
real 30m4.237s
user 0m21.545s
sys 0m44.331s
```
_Total time for naive approach: 39 minutes, 41 seconds (32.5 minutes restoring dev)_

This worked quite well for a long time. It’s simple, easy to set up and was fast when our DB was only a few hundred MB. Obviously though, 32.5 minutes to restore your dev database is just unacceptable.

## Pipe Uncompress
My initial idea to speed up our restore time was to simply pipe the compressed file directly into the psql command by using zcat. You can think of zcat as the same as the  [cat](http://linux.die.net/man/1/cat)  command but for compressed files. It uncompresses the file and prints it to the standard output which you can then pipe into your psql command.

```
$ pg_dump db | gzip > dump.gz
real 7m9.882s
user 5m7.383s
sys 2m56.495s

$ zcat dump.gz | psql db
real 26m22.356s
user 1m28.850s
sys 1m47.443s
```
_Total time: 33 minutes, 31 seconds (26.3 minutes restoring dev, 20% faster)_

Excellent, this sped up the process by 16% overall, 20% on the actual restore. Because I/O was a bottleneck, not writing to disk saved us over 6 minutes. Overall though I was still not happy. 26 minutes wasted on restoring our dev database wasn’t good enough, I had to go further.

## Custom Format
As I dug into the  [pg_dump documentation](http://www.postgresql.org/docs/9.5/static/app-pgdump.html)  I noticed that by default, pg_dump exports a plain-text SQL file. As you can see above, we then gzip’d it to make it smaller to store it. Postgres provides a Custom format that, by default, uses the zlib to compress it. My initial thinking was that if Postgres is already writing the file to disk in the plain-text format, it’d be faster to have Postgres also compress it at the same time instead of having to pipe it to gzip.

Because of this custom format, I had to switch to using  [pg_restore](http://www.postgresql.org/docs/current/static/app-pgrestore.html)  since you can’t redirect the compressed file using psql.

```
$ pg_dump -Fc db > dumpfc.gz
real 6m28.497s
user 5m2.275s
sys 1m16.637s

$ pg_restore -d db dumpfc.gz
real 26m26.511s
user 0m56.824s
sys 0m15.037s
```
_Total time 32 minutes, 54 seconds (26.4 minutes restoring dev)._

I was right in thinking that the actual backup process would be faster since we didn’t have to pipe the output to gzip. Unfortunately, restoring this custom format on your local machine didn’t result in the process being any faster. Back to the drawing board.

## Specifying Jobs
The first thing I always do when I’m diving into a problem is to read the documentation and source code. Postgres has fantastic documentation with clearly laid out and labelled options. One of these options is the ability to specify the number of jobs that run concurrently while ### pg_restore
 is doing the most time-consuming parts, load data, create indexes, or create constraints.

`pg_restore` docs say that a good place to start with the number of concurrent jobs is to use the number of cores on your machine. My dev environment VM has 4 cores but I wanted to see what the different values had on run time.

```
$ pg_dump -Fc db > dumpfc.gz
real 6m28.497s
user 5m2.275s
sys 1m16.637s

$ pg_restore -d db -j 2 dumpfc
real 25m39.796s
user 1m30.366s
sys 1m7.032s
```
_Total time 32 minutes, 7 seconds, (25.6 minutes restoring dev 3% faster than plain pg_restore)._

Alright, that’s a tiny improvement, can we push this more?
```
$ pg_dump -Fc db > dumpfc.gz
real 6m28.497s
user 5m2.275s
sys 1m16.637s

$ pg_restore -d db -j 4 dumpfc.gz
real 22m6.124s
user 0m58.852s
sys 0m34.682s
```
_Total time 28 minutes, 34 seconds (22.1 minutes restoring dev 14% faster than two jobs)._

Excellent, specifying four jobs over two speeds up the overall restore time by 14%. At this point, we’ve sped it up from 32.5 minutes on our dev environment to 22.1 minutes, a 32% increase!

My thinking now was how far could I push this number?
```
$ pg_dump -Fc db > dumpfc.gz
real 6m28.497s
user 5m2.275s
sys 1m16.637s

$ pg_restore -d db -j 8 dumpfc.gz
real 16m49.539s
user 1m1.344s
sys 0m39.522s
```
_Total time 23 minutes, 17 seconds (16.8 minutes restoring dev, 24% faster than four jobs)._

So specifying double the number of jobs as cores have reduced the time from 22.1 minutes to 16.8 minutes. At this point, I’ve sped up our entire restore time by 49% which is fantastic.

Can I push this even further?
```
$ pg_dump -Fc db > dumpfc.gz
real 6m28.497s
user 5m2.275s
sys 1m16.637s

$ pg_restore -d db -j 12 dumpfc.gz
real 16m7.071s
user 0m55.323s
sys 0m36.502s
```
_Total time 22 minutes, 35 seconds (16.1 minutes restoring dev, 4% faster than eight jobs)._

Specifying 12 concurrent jobs does speed the process up by a tiny bit but overall affects the VM’s CPU usage to the point where it’s not overly usable while the restore is happening. At this point, I settled on eight jobs or double the number of cores as being the optimal number to use.

## Final Thoughts
In the end, our active got cut almost in half, from 30 minutes down to 16 minutes. This saves us over 72 hours of restore time a year (6 devs, 52 restores a year, 14 minutes). Overall I’m very happy with these changes. In the future, I’ll be looking at just restoring data and not the entire DB and see how much faster that is.

_In    we improve the time even further, bringing it down to 5 minutes._ [Speeding up Postgres Restores Part 2](/posts/speeding-up-postgres-restores-part-2/) 

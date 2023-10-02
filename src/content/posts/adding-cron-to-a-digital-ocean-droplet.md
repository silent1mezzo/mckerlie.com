---
title: "Adding Cron to a Digital Ocean Droplet"
date: 2020-04-28
tags: [development]
---

I love [Digital Ocean](https://digitalocean.com/). It’s incredibly easy to set up, it’s cheap to get started and you can scale up easily as your website grows.  All of my old sites were hosted on there and when I needed a host for my latest project, [Daily Lightsaber,](https://twitter.com/DailyLightsaber) Digital Ocean was the obvious choice.

The main feature of Daily Lightsaber is the scheduled post of a new lightsaber every day. To do this I needed to add [Cron](https://en.wikipedia.org/wiki/Cron) to my droplet. This guide assumes you have a droplet running with Ubuntu 18.04.

## Installing Cron
The first thing you’ll want to do is make sure your droplet’s package manager is updated to the latest version.
```
$ sudo apt update
```
Then you can simply install cron
```
$ sudo apt-get install cron
```

## Editing your Crontab
Once you’ve installed cron onto your droplet you can edit your crontab and start adding entries to run automatically. A crontab is a special file that holds the schedule of jobs cron will run. To edit your crontab you can type:
```
$ crontab -e
```
The first time you run this command you’ll be given the option to choose a text editor to edit it with. If you don’t have a preference, `nano` is probably the most user friendly.
```
no crontab for <user_name> - using an empty one

Select an editor.  To change later, run 'select-editor'.
  1. /bin/nano        <---- easiest
  2. /usr/bin/vim.basic
  3. /usr/bin/vim.tiny
  4. /bin/ed

Choose 1-4 [1]: 
```
Once you’ve chosen you’ll see the default crontab text. You can remove all of the comments if you’d like or simply add a new line at the bottom.
```
# Edit this file to introduce tasks to be run by cron.
# 
# Each task to run has to be defined through a single line
# indicating with different fields when the task will be run
# and what command to run for the task
# 
# To define the time you can provide concrete values for
# minute (m), hour (h), day of month (dom), month (mon),
# and day of week (dow) or use '*' in these fields (for 'any').# 
# Notice that tasks will be started based on the cron's system
# daemon's notion of time and timezones.
# 
# Output of the crontab jobs (including errors) is sent through
# email to the user the crontab file belongs to (unless redirected).
# 
# For example, you can run a backup of all your user accounts
# at 5 a.m every week with:
# 0 5 * * 1 tar -zcf /var/backups/home.tgz /home/
# 
# For more information see the manual pages of crontab(5) and cron(8)
# 
# m h  dom mon dow   command
```
Each line in the crontab will execute a single command. Below I execute a python script everyday at 9:12pm and pipe any output to a log file.
```
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of the month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
# │ │ │ │ │                                   7 is also Sunday on some systems)
# │ │ │ │ │
# │ │ │ │ │
# * * * * * command to execute
12 21 * * * python3 lightsaber.py >> lightsaber.log
```
Now that you have cron installed and you’ve edited your crontab you need to make sure it’s enabled. This is the final step to get everything working.
```
$ sudo systemctl enable cron
```
Now you have a fully functioning cron on your droplet. This will allow you to run commands at a set schedule. If you’re interested in getting set up with Digital Ocean you can use [this link](https://m.do.co/c/e192b7a9461b) to get $100 in free credits.

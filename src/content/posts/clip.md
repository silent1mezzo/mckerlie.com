---
title: "Clip"
date: 2013-01-19
tags: [development]
---

Clip is a command-line interface (CLI) tool that allows you to store and quickly access text snippets and manage your clipboard.

## Installation
Installing Clip is simple with [pip](http://web.archive.org/web/20150202081421/http://www.pip-installer.org/en/latest/):

```
$ pip install clip
```

## Getting the Code
You can either clone the public repository:
```
git clone git@github.com:silent1mezzo/clip.git
```
Download the tarball:
```
$ curl -OL https://github.com/silent1mezzo/clip/tarball/master
```
Or, download the zipball:
```
$ curl -OL https://github.com/silent1mezzo/clip/zipball/master
```

Once you have a copy of the source, you can embed it in your Python package, or install it into your site-packages easily:
```
$ python setup.py install
```

## Quick Start
You can get started with clip quickly by typing `clip` in your terminal to pull up the help text.

Here are a few commands you can try out

**Creating a List**
```
$ clip <list_name> # Creates one if it doesn't exist
$ clip websites
```

**Viewing a List:**
```
$ clip <list_name> # If a list exists, view it
$ clip websites
```

**Adding a snippet:**
```
$ clip <list_name>
$ clip websites django3.0 https://docs.djangoproject.com/en/3.0/releases/3.0/
```

**Getting a snippet:**
```
$ clip <list_name>
$ clip websites django3.0 https://docs.djangoproject.com/en/3.0/releases/3.0/
`https://docs.djangoproject.com/en/3.0/releases/3.0/` has been copied to your clipboard
```

You can also omit the list_name and it’ll try to find the key
```
$ clip django3.0 https://docs.djangoproject.com/en/3.0/releases/3.0/
`https://docs.djangoproject.com/en/3.0/releases/3.0/` has been copied to your clipboard
```

**Deleting a List/Key**
```
$ clip delete <list_name>
$ clip delete websites
 
$ clip delete <list_name> <key>
$ clip delete websites django3.0
```

**Opening a snippet in your browser:**
```
$ clip open <list_name>
$ clip open websites django3.0
 
$ clip open 
$ clip open django3.0
```

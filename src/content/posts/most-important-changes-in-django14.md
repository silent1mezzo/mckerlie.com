---
title: "Most Important Changes in Django 1.4"
date: 2012-03-15
tags: [development]
postSlug: most-important-changes-in-django14
---

With the announcement of Django 1.4RC2 and the final release of 1.4 around the corner I thought I’d go over some of the largest new features. For those that want to see the release notes you can do so here.


## QuerySet.select_for_update()
Previously if you had to loop through a QuerySet and update the Models the only safe way was to do `QuerySet.objects.filter().update()`. If you looped through all the instances and called the individual `Models.objects.save()` you could potentially get a race condition where your save clobbers data saved between when you fetched it initially and when you were ready to save.

Using `QuerySet.select_for_update().filter()` tells your Database to lock those rows until the transaction ends. This allows you to safely loop through the QuerySet modifying the Models as you wish.

## Model.objects.bulk_create()
This method inserts the provided list of objects into the database in an efficient manner (generally only 1 query, no matter how many objects there are):

```
Entry.objects.bulk_create([
    Entry(headline="Django 1.0 Released"),
    Entry(headline="Django 1.1 Announced"),
    Entry(headline="Breaking: Django is awesome")
])
```

## QuerySet.prefetch_related()
Another great addition to Django 1.4 is `QuerySet.prefetch()`. This behaves similarly to Django’s `QuerySet.select_related()` except for the fact that it does a separate lookup for each relationship and then does the joining in Python.

This allows you to look up ManyToMany and Generic Foreign Keys which select_related() cannot do.

```
class Topping(models.Model):
    name = models.CharField(max_length=30)
 
class Pizza(models.Model):
    name = models.CharField(max_length=50)
    toppings = models.ManyToManyField(Topping)
 
Pizza.objects.all().prefetch_related('toppings')
```

## Assignment Template Tag
You can now create your own assignment template tags. This is something that Jinja2 has done well for a while and has been sorely missed in Django.

```
@register.assignment_tag
def get_current_time(format_string):
    ...
```

```
{% get_current_time "%Y-%m-%d %I:%M %p" as the_time %}
 
The time is {{ the_time }}.
```

## Changes to Startproject and Startapp
Both `startproject` and `startapp` can now take additional arguments specifying a template to create the project/app from as well as a path that specifies where the project/app should go.

```
django-admin.py startproject --template=/path/to/my_project_template myproject
 
django-admin.py startapp myapp /path/to/new/app
django-admin.py startproject myproject /path/to/new/project
```

## {% elif %} template tag
`{% if %}` template tags now support the `{% elif %}` clause. I think this will be one of the most used changes with 1.4 and I’m really excited to finally see this in Django.

## Python and Postgres Versions
Django 1.4 officially drops support for Python 2.4 and PostgreSQL < 8.2. Python 2.4 was initially released in 2004 and PostgreSQL 8.1 in 2005. Both Python and PostgreSQL have had numerous releases since, adding lots of security and performance features. By dropping support for these, Django can continue to advance and add new features.

Django 1.4 will be released in the next month as long as there are no release-blocking bugs. With every release Django gets better and better and 1.4 has a few really great new features.
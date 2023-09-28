---
title: "Most Important Changes in Django 1.5"
date: 2012-11-28
tags: [development]
---

With the announcement of Django 1.5B1 and the final release of 1.5 around the corner I thought I’d go over some of the largest new features. For those that want to see the release notes you can do so here.


## Configurable User Model
The largest change coming to Django 1.5 is the ability to specify your own user model instead of having to use the one that’s been shipped with Django for the past 6 years. Before Django 1.5, applications that wanted to use Django’s auth framework (django.contrib.auth) were forced to use Django’s definition of a “user”. In Django 1.5 you can create your own User account and include any of the fields you wish (Twitter, Facebook, larger email field, etc…).

You can read more about it [here](/posts/using-configurable-user-models-in-django15/).

## Python 3 Support
Django 1.5 also includes experimental Python 3 support. They suggest not using it in production yet due to the complex nature of porting applications from Python 2 to Python 3 and the lack of use so far in production environments. Django 1.6 will have full Python 3 support.

## Saving a Subset of Model’s Fields
You can now supply a `update_fields` argument to `.save()` and the model will only update those fields instead of updating every field. This can help in high-concurrency operations and can improve performance.

```
obj.name = 'Adam'
obj.age = '25'
 
# This will only update the name field.
obj.save(update_fields=['name'])
```

## {% verbatim %} template tag
Some Javascript template syntax conflicts with Django’s own templating syntax. Now you can wrap your code in `{% verbatim %}{% endverbatim %}` tags to make sure that Django won’t parse out the Javascript code.

## 404.html and 500.html are no longer needed
Previously when setting up a new project you had to make sure you have 404.html and 500.html templates in your template directory or Django would throw an exception. Pretty much every beginner programmer to Django had this problem at least once. Now Django provides defaults for these if the files aren’t there. You should still create your own to provide a nicer look and more information but at least Django won’t error out if they aren’t there.

## Multi-Column Indexes
You can now have multi-column indexes if your database supports it. Use `index_together = ['field_1', 'field_2']` to create a multi-column index.


## Django 1.5 Deprecations (Removed in Django 1.7)
Along with every release Django is deprecating a few features that are no longer necessary or rarely used.

## AUTH_PROFILE_MODULE
`AUTH_PROFILE_MODULE` and `.get_profile()` are now obsolete with the new customizable User objects. If you still need to associate data with a User object the best practice is to have a OneToOne field from the Profile to the User model.

## Simplejson
Since Django 1.5 drops support for Python 2.5 and below they can now rely on the json module that’s included with Python 2.6+. This could have some unknown side-effects but for the most part probably shouldn’t make any difference.

I know I’m looking forward to Django 1.5. I think the ability to have configurable User models is a big win for the framework. You can download Django 1.5B1 [here](https://www.djangoproject.com/download/1.5b1/tarball/).
---
title: "Using Configurable User Models in Django 1.5"
date: 2012-11-29
tags: [development, django]
postSlug: using-configurable-user-models-in-django15
---

Django users take for granted the ability to configure your own user model but prior to Django 1.5 you were stuck with Django’s predefined User model. If you want to take advantage of this new functionality then keep on reading as I’ll go through how to migrate your current application to the new configurable user model.

## Getting Started
For the sake of simplicity let’s make our own User object that is exactly the same as Django’s current but fixes the email max_length field to comply with [RFC 5321](http://web.archive.org/web/20190124184936/http://tools.ietf.org/html/rfc5321) of 254 characters and adds a required field for the user’s twitter handle.

```
# myapp.models.py 
from django.contrib.auth.models import AbstractBaseUser
 
class MyUser(AbstractBaseUser):
    username = models.CharField(max_length=40, unique=True, db_index=True)
    email = models.EmailField(max_length=254, unique=True)
    twitter_handle = models.CharField(max_length=255)
    ...
 
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['twitter_handle']
```

You’ll notice a few new things about this:

**Inheriting AbstractBaseUser:**
This adds a few helper fields such as password and last_login as well as methods for setting the user’s password, getting the username, checking if the user is active. You can check out a full list of what it includes [here](http://web.archive.org/web/20190115041929/https://github.com/django/django/blob/master/django/contrib/auth/models.py#L289).

**USERNAME_FIELD:**
This is a string describing the name of the field on the User model that is used as the unique identifier. This will usually be a username of some kind, but it can also be an email address or any other unique identifier.

**REQUIRED_FIELDS:**
A list of the field names that must be provided when creating a user. `REQUIRED_FIELDS` must contain all required fields on your User model, but should not contain the `USERNAME_FIELD`.

Now that you’ve created your User model you have to tell Django that you want to use it instead of their default `User` model. To do this you add the following to your settings file:

```
# settings.py
AUTH_USER_MODEL = 'myapp.MyUser'
```

With this setting Django now knows which User model to use.

## Using Foreign Keys
Once you’ve set up your model its now time reference it in other models.

```
from django.conf import settings
from django.db import models
 
class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL)
```

This tells Django to create a ForeignKey to the User model that you specify in your settings.

## Custom Manager
Now that you’ve created your own User model you also need to create your own Manager to handle the creation of Users and Super Users. If your User model defines the same fields as Django’s default User you can just install Django’s UserManager.

```
from django.contrib.auth.models import UserManager, AbstractBaseUser
 
class MyUser(AbstractBaseUser):
    ...
    objects = UserManager
```

If your User model includes different fields you’ll need to define your own custom manager that extends BaseUserManager.

```
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
 
class MyUserManager(BaseUserManager):
    def create_user(self, email, twitter_handle, password=None):
        if not email:
            raise ValueError('Users must have an email address')
 
        user = self.model(
            email=MyUserManager.normalize_email(email),
            twitter_handle=twitter_handle,
        )
 
        user.set_password(password)
        user.save(using=self._db)
        return user
 
    def create_superuser(self, email, twitter_handle, password):
        user = self.create_user(email,
            password=password,
            twitter_handle=twitter_handle
        )
        user.is_admin = True
        user.save(using=self._db)
        return user
 
 
class MyUser(AbstractBaseUser):
    ...
    objects = MyUserManager
```

## Other Methods
There are a few other methods you need to include:

**get_full_name:**
A longer formal identifier for the user. A common interpretation would be the full name of the user, but it can be any string that identifies the user.

**get_short_name:**
A short, informal identifier for the user. A common interpretation would be the first name of the user, but it can be any string that identifies the user in an informal way.

**is_active:**
A boolean attribute that indicates whether the user is considered “active”. This attribute is provided as an attribute on AbstractBaseUser defaulting to True.

## Final Example

```
# models.py
from django.conf import settings
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
 
class MyUserManager(BaseUserManager):
    def create_user(self, email, twitter_handle, password=None):
        if not email:
            raise ValueError('Users must have an email address')
 
        user = self.model(
            email=MyUserManager.normalize_email(email),
            twitter_handle=twitter_handle,
        )
 
        user.set_password(password)
        user.save(using=self._db)
        return user
 
    def create_superuser(self, email, twitter_handle, password):
        user = self.create_user(email,
            password=password,
            twitter_handle=twitter_handle,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user
 
 
class MyUser(AbstractBaseUser):
    email = models.EmailField(max_length=254, unique=True, db_index=True)
    twitter_handle = models.CharField(max_length=255)
 
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
 
    objects = MyUserManager()
 
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['twitter_handle']
 
    def get_full_name(self):
        # For this case we return email. Could also be User.first_name User.last_name if you have these fields
        return self.email
 
    def get_short_name(self):
        # For this case we return email. Could also be User.first_name if you have this field
        return self.email
 
    def __unicode__(self):
        return self.email
 
    def has_perm(self, perm, obj=None):
        # Handle whether the user has a specific permission?"
        return True
 
    def has_module_perms(self, app_label):
        # Handle whether the user has permissions to view the app `app_label`?"
        return True
 
    @property
    def is_staff(self):
        # Handle whether the user is a member of staff?"
        return self.is_admin
 
 
class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL)
 
 
#views.py
from django.contrib.auth import get_user_model
...
User = get_user_model()
```

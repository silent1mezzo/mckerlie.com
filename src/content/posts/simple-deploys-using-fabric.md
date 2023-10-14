---
title: "Simple Deploys using Fabric"
date: 2018-01-22
tags: [development, programming, fabric]
---

At G Adventures we deploy 20+ times a day to many different services that handle millions of requests and millions of dollars in transactions by keeping it simple

One of my guiding principles for developing and deploying software has always been to keep it as simple as possible for as long as possible. Premature optimization wastes valuable developer time, solving problems that may never be real. One of the areas where this is apparent at G Adventures is how we deploy code. Today I’m going to talk about the common ways we deploy code, the pros and cons of each way and what the future may look like for us.

## Environment
At G, we pride ourselves in using the right tool for the job. While we’re primarily a Python shop, using Django for our websites, we also have a few services written in Go and have started building out our front ends using React. Each environment comes with different challenges and best practices when it comes to deployment, which I’ll describe these below.

We use [GitHub](https://github.com/) to host our code, [Jenkins](https://jenkins-ci.org/) and [Travis CI](https://travis-ci.com/) to automate our tests, and right now most of our applications and code live in VMs in a Colo just outside of Toronto. We’re in the process of transitioning to AWS but I’ll leave that for another post.

Other common technologies we use are [Postgres](https://www.postgresql.org/) (primary DBs), [Redis](https://redis.io/) (cache and key/value store), [RabbitMQ](https://www.rabbitmq.com/) (messaging broker) and [Celery](http://www.celeryproject.org/) (task queue). In future blog posts, we’ll break down the individual teams and stacks.

Historically each team developed their own processes around code reviews, migrations and deployments. As we’ve grown we’ve made an effort to standardize our processes to make it easier for teams to share developers and resources. It’s still apparent in how we deploy with each team doing it slightly differently.

## Current Deploy Strategies
**Fabric + Git Pull**
This is our simplest and oldest method of deploying our applications. It uses [Fabric](http://www.fabfile.org/), a command line tool for simplifying SSH connections and [git](https://git-scm.com/) to update the code on our servers and deploy a new version of our applications.

```
# -*- coding: utf-8 -*-
import json
import requests
import getpass
import random
from fabric.api import *
from fabric.operations import *

"""
    Set up servers locations. This can be programatically generated too.
"""
env.roledefs = {
    'training': ['10.0.0.1'],
    'web': ['10.0.1.1', '10.0.1.2'],
    'media': ['10.0.2.1'],
    'celery': ['10.0.3.1', '10.0.3.2'],
}

"""
    Set up various environment variables for the application path, virtualenv,
    pip and requirements files for later use.
"""
env.directory = '/var/www/app'
env.activate = 'source /opt/lib/virtualenvs/app/bin/activate'
env.pip = '/opt/lib/virtualenvs/app/bin/pip'
env.requirements = '{}/requirements.txt'.format(env.directory)

PRODUCTION = "production"
TRAINING = "training"


"""
    Each type of server (media, web and celery) requires us to pull down the latest version
    of the application and update requirements. We abstract this out to make it simpler
"""
def pull_and_install():
    sudo('git pull origin master')
    sudo('source {} && {} install -r {}'.format(env.activate, env.pip, env.requirements))


"""
    Command to run our database migrations. The `runs_once` decorator makes sure
    that we only run migrations once per fab script invocation.
"""
@runs_once
def migrate():
    run('python manage.py migrate')

    
"""
    On our media server we pull down the latest version of the application, install any requirements,
    collect static and finally compress our static files (JS & CSS). We only have to do this once.
"""
@roles('media')
def update_media():
    run('pull_and_install')
    run('python manage.py collectstatic --noinput')
    run('python manage.py compress --force')


"""
    On all of our web servers we pull down the latest version of the application,
    run any database migrations and then restart nginx. We run this in parallel across all of our
    webservers. Because the migrate function only runs once per invocation we can safely run
    this command in parallel.
"""
@roles('web')
@parallel
def update_and_restart():
    run('pull_and_install')
    run('migrate')
    sudo("service nginx restart")
    sudo("service uwsgi restart")


"""
    On our celery servers we simply have to pull down the code, install requirements and restart celery.
    We can do this in parallel as well to make sure it updates faster.
"""
@roles('celery')
@parallel
def update_celery():
    run('pull_and_install')
    sudo('/etc/init.d/celeryd restart')


"""
    Here's the entry point for our fabfile. We can run this by typing `fab deploy` (for training)
    or `fab deploy:production` to deploy to production.
"""
def deploy(environment=TRAINING):
    execute('update_media')
    execute('update_and_restart')
    execute('update_celery')
```

The above gist is pretty close to what we do in production for our Django applications. We do have some code that determines which environment to deploy to as well as posting the status of deploys to Slack.

As you can see this deploy strategy is extremely simple and has worked across multiple teams for many years. The simplicity allows us to deploy new applications quickly and confidently and bring new employees up to date and deploying their changes within the first week of them starting.

There are some downsides to such a simple deploy process. Server, GitHub and PyPI connection issues can leave the application in an inconsistent state. In theory, running multiple deploys at the same time could cause migration issues. In practice, we rarely run into connection issues and because we post the status of deploys to a slack channel all it takes is for a developer to check that other deploys have finished before starting their own.

**Symlink**
An approach we’ve taken more recently is to build out a new environment entirely on each of the machines and then update the symlinks Nginx uses to serve the content. This allows us to deploy and verify that the application is in a consistent state before switching the symlinks and restarting the application servers.

Below is an example of how we deploy one of our React applications.
```
# -*- coding: utf-8 -*-
import os
import random
import requests
import json
import datetime

from fabric.api import *

"""
    Set up servers locations. This can be programatically generated too.
"""
env.roledefs = {
    'training': ['10.0.0.1'],
    'web': ['10.0.1.1', '10.0.1.2'],
}

"""
    Set up various environment variables for the application path, virtualenv,
    pip and requirements files for later use.
"""
RELEASE_TIMESTAMP = datetime.datetime.today().strftime('%Y%m%d%H%M%S')
env.directory = '/var/www/app'
env.repo_url = "GIT URL FOR REPO"
env.release_dir = '{}-{}'.format(env.directory, RELEASE_TIMESTAMP)

PRODUCTION = "production"
TRAINING = "training"

def git_clone():
    run("git clone {} .".format(env.repo_url))

@roles("web")
@parallel
def update_frontend():
    # Take ownership of project
    sudo('mkdir -p {}'.format(env.release_dir))

    with cd(env.release_dir):
        git_clone()
        run('npm set progress=false')
        run('npm install')

@roles("web")
@parallel
def build_frontend():
    with cd(env.release_dir):
        run('npm run build')

@roles("web")
@parallel
def restart_frontend():
    sudo('ln -sfn {} {}'.format(env.release_dir, env.directory))
    sudo("service nginx restart")


"""
    Here's the entry point for our fabfile. We can run this by typing `fab deploy` (for training)
    or `fab deploy:production` to deploy to production.
"""
def deploy(environment=TRAINING):
    execute('update_frontend')
    execute('build_frontend')
    execute('restart_frontend')
```
This deploy is almost as simple as the `Git Pull` method but adds an additional step of cloning into a new folder (e.g. `app-2018010410224`) and only switching the symlink once it’s been deployed across all of our servers.

The main benefit to this strategy is that if any of the requirements fail (connecting to a server, cloning the repo, building the application) across any of the servers the entire deploy will halt and production won’t be updated. This has been extremely useful as we’ve started moving to AWS and noticed an increase in connection timeouts. Rolling back deploys is also easier with this strategy. You simply update the symlinks to a previous working deploy and restart Nginx.

There are still a couple of downsides to this deploy strategy. Servers can still have different dependencies if you don’t lock down your pip requirements or node requirements and you need to manage how many past deployments you keep on the server or you can potentially run into using up the entire disk space. For a React application, you’re also still installing all of your node modules on each server which not only takes a long time but also uses a lot of disk space. This can be easily fixed by building locally and shipping off the application to each server.

## Future
As you can see from the above examples we’ve been able to deploy tens of thousands of times by using simple deployment strategies. As we start to push past 50 developers we’re looking at ways to improve how we deploy code.

The biggest thing we’re looking at right now is continuous deployment after all of our tests are run. We already have Continuous Integration for all of our applications so the next logical step is to bundle up the environment, requirements and code and ship it off after the tests pass successfully. We’re also looking at containerizing all of our applications to help us manage deployment (we’ve just started looking at this).

How do you test and deploy your code? What strategies are you most comfortable with? We’d love to hear from you down in the comments.





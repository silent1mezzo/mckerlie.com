---
title: "Dealing with Technical Debt"
date: 2017-09-19
tags: [development]
---

Technical debt is something that every software company has to deal with at some point. Whether it’s from bad architectural designs or just changing business needs, at some point technical debt will need to be refactored. Here are a few tips I’ve pulled from my experience removing technical debt.

## Take Inventory
The first step in dealing with technical debt is to take inventory of the entire codebase. Knowing the extent of the codebase is necessary before you can start removing or rewriting parts of it. Using Google Analytics to understand which parts of the code get used the most can provide an easy jumping off point for web apps. Refactoring the most used portions of the website can often lead to quick wins.

Once you’ve taken inventory of your codebase it’s important to understand how certain functions get used and how they interact with other pieces of the code. If your project has tests, I find that looking through these tests can provide invaluable information. Unit tests are great at seeing the expected inputs to functions and understanding how the code is supposed to be used. If the tests are properly written it can also help you understand what interacts with what.

Taking inventory also gives you a basic checklist that you can use to keep track of what’s left to refactor.

## Have a Plan
Now that you have an inventory of everything in your codebase you can start planning the refactor of your technical debt. I like to start this plan with a list of functions that are coupled together. This list gives me an idea of the functions of code that need to be refactored together. From there, I can get an idea of how long each chunk will take.

Once you have the coupled functions you can start thinking about whether the code needs to be refactored. In general, if something works well and still meets the needs of the users it probably doesn’t need to be changed. If it’s no longer relevant, runs poorly or is dangerous from a data integrity standpoint, you should refactor it. Look for any functions that are no longer being used or have been duplicated for different inputs and try to remove or combine them.

## Create Realistic Timelines
While you’re creating the plan to deal with the technical debt, always keep in the back of your mind a running tally of how long this will take. Removing technical debt often takes a long time, especially when you do it properly. If you’re refactoring entire sections you may have to consider porting the legacy data over to a new system. This might mean creating scripts that map your old data to your new models or, if the old data models still make sense, just copying the data over.

A big part of removing technical debt is talking to your users. Make sure you understand their needs and how the old code fails to meet those needs. From there, you’ll understand what’s needed from your system and how to handle the refactor. As you’re talking to your users make sure they’re comfortable with the proposed plan. What may work for you in your mind might not work for your users and knowing this beforehand can help lessen the friction of change.

## Execute and Launch
Once you’ve determined the technical debt that you need to refactor, come up with a plan to get rid of it, create realistic timelines for dealing with the debt you now have to execute and launch the changes. From past experience, I find that doing small changes and quick launches helps users cope with changes. When you code in a silo and release large functionality all at once there’s a much larger risk of failure. Making sure you have proper test cases for all the different use cases can help mitigate some of the risks of launching large features.

Launching to a small subset of users is a great way to test new functionality and get feedback on the changes before releasing to everyone. This allows you to validate your new code and make sure that it works. It gives you time to create more documentation and make sure that the migration is as seamless as possible.

Once everything’s ready, it’s time to launch to everyone and iterate on those changes.

## Preventing Technical Debt
Once you’ve refactored your code, you’re going to want to future proof your codebase. The best way to do this is to make sure you have a comprehensive set of unit tests. Unit tests allow you to deploy your code with confidence, knowing that you’ll catch any regression errors. Along with tests, make sure you use common coding standards to ensure that your code will last. Finally, think about the future of your codebase as you architect new features; it’ll help your code to be more future proof. Taking the time to properly plan your code will make it less prone to becoming technical debt in the future.



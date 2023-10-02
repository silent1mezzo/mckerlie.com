---
title: "Creating Software: Test, Test and More Test"
date: 2008-08-28
tags: [development]
---

> “If debugging is the process of removing bugs, then programming must be the process of putting them in.”  
> -Edsger Dijkstra  

Testing is arguably the most important step in any software project and also one of the most neglected steps. In most cases, testing is missed because clients don’t realize the importance of it and aren’t willing to pay for, or take the time to have the developers test properly.

In a perfect world, code would be thoroughly tested before it ever goes into the wild, but this just isn’t possible. Here are a few tips and tricks on testing so your product will never be released without even a little bit of testing.

## White Box vs Black Box Testing
White Box testing uses an internal perspective of the system to design test cases based on internal structure. It requires programming skills to identify all paths through the software. Black box testing on the other hand takes an external perspective of the test object to derive test cases. These tests can be functional or non-functional, though usually functional. The test designer selects valid and invalid input and determines the correct output.

White Box testing in my opinion is a lot easier as a developer because you understand the internal structure and you can create the tests as your write it. Black Box testing generally needs to be done by a third party who doesn’t know how the structure works (makes it easier to test). This testing can basically be created before the program is even written (as long as it’s designed).

## Regression Testing
Regression Testing is the process of finding bugs in existing functionality that weren’t there before. All programmers, even the best in the world, add bugs into their software. The problem is that sometimes these new bugs can affect things that are already in place (and that you’ve already tested). Unless you have regression testing, these bugs won’t be found until your customers complain.

As I write my software, I’ll create tests for each method / class / etc… and then when I add in new functionality I go over the previous tests to make sure everything works the way its supposed too. This way I don’t get little surprises when I roll everything into production.

## Get a “User” to Test
You can do all the testing you want but most of the time you’ll miss something small. Having a “User” (someone that would actually use your software) test your product can help find bugs that you wouldn’t have thought to check. There have been numerous occasions where I’ve had a friend test something I’ve written and found bugs that I didn’t know existed. It helps having extra minds thinking about testing.

## Thoughts on Testing
Testing is extremely important. Your name is going to be on the software you release so even if the Customer doesn’t want it you should still test. You don’t want to give yourself a bad name as a developer.

We’ve now looked at [Getting the Requirements](/posts/creating-software-getting-the-requirements), [The Design Phase](/posts/creating-software-the-design-phase), and [Start Coding](/posts/creating-software-start-coding/) of  Creating Software . Stay tuned for the final instalment.

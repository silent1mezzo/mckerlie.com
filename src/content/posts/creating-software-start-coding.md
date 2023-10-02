---
title: "Creating Software: Start Coding"
date: 2008-07-29
tags: [development]
---

Software takes a long time to make. You first need to [get the requirements from the client](/posts/creating-software-getting-the-requirements/). Once you’ve gotten the requirements you then need to spend the time to [properly design your product](/posts/creating-software-the-design-phase/), drawing out paper prototypes, creating use case diagrams and other things like that.

Now that you’ve done all that, we’ll have a look at the third part of the [Creating Software series](https://web.archive.org/web/20080806224942/http://devjargon.com/tag/Creating-Software/): Starting to Code. Today we’ll look at different ways to code and the importance of testing **as you code** not afterwards.

## Pair Programming
People code in many different ways. Some people prefer to code by themselves, working towards a goal and accomplishing that goal on their own terms. Others prefer to work as a pair or in a group, each writing their own section of code and integrating as the project goes on. Every way works and it really just depends on your personal style.

[Pair Programming](http://www.extremeprogramming.org/rules/pair.html) is a practice where two people sit at a computer, one coding and thinking tactically about the method being written and the other one thinking strategically about how the method fits into the class.

I’ve done pair programming a few times and it really works. It helps you think purely about the code you're writing and leaves other thoughts to the person who isn’t coding. After a while you’ll switch spots and let the other programmer code. Pair programming helps iron out bugs in logic and syntax before they’re ever put into production (two eyes are better than one).

### Working in a Group
[Working with a group](/posts/6-tips-for-working-in-a-group) can be difficult but rewarding. It takes a different mindset to work with a group of developers because it's almost ingrained in us to work alone.

When working in a group communication is key. Each and every team member needs to know what they’re doing and how it's going to come together in the end. With these types of goals a group can be much more efficient than a single person.

If you’re working on a large project, a group will be necessary (unless you want to take years to finish it). I suggest **not** working with friends because when it comes to a deadline, friendships might not make it.

## Make Sure You Test
Most programmers leave testing to the end and this is a very bad idea. Testing should be done throughout the coding process. Every time you implement a new method, that method should be tested to make sure the bugs are worked out. When you integrate functionality, [regression testing](http://en.wikipedia.org/wiki/Regression_testing) should be performed to make sure no new bugs have been introduced.

If you’re working with a group, have one programmer test. Often times the programmers that write the code are too attached to it to fully test what they’ve written. I’ve had the privilege of breaking a persons program when they said “This is a perfect program, there are absolutely no bugs”. When you have this mentality, you won’t find bugs and that is why it's a good idea to bring in someone else to test.

If you leave testing to the end it may be too late to fix some of the bugs. If you test early on, the cost of fixing bugs is greatly reduced than if you test at the end.

Next we’ll look at what you do after you’ve finished the bulk of programming: testing, ironing out bugs and more testing.


---
title: "Creating Software: The Design Phase"
date: 2008-07-15
tags: [development]
---

Creating software is difficult. You need to first get the [requirements from the client](/posts/creating-software-getting-the-requirements/) (or create them yourselves), then you’ll use the requirements and design a working system. Once you’ve designed the system, turn the design into code. Next you’ll test your code to make sure it works and finally deliver the completed project to the client.

Today I’m going to look at the second part of the  Creating Software series : The Design phase. There are a number of aspects to designing software. You need to take the requirements you gathered previously and start to create your software. At this point, you’ll have very little code (and possibly none at all). Don’t let this fool you though, the design phase is extremely important, and many projects have failed because they either didn’t design, or improperly designed their software.

Here are three things you can do in the design phase to make your software project more likely to succeed.

## Use Cases
Use Cases are basically a description of your system’s behaviour as it responds to a request that originates from outside of that system. In layman’s terms, they essentially give yourself and your developers an idea of what the project will consist of and how it will behave.

A use case consists of:
* Name - provides a unique identifier for the use case
* Goal - briefly describes what the user intends to achieve with this use case
* Summary- provides a quick overview, intended to save the reader from having to read the full contents of a use case to understand what the use case is about
* Actors - someone or something outside the system that either acts on the system (primary actor) or is acted on by the system (secondary actor)
* Preconditions - all the conditions that must be true for the trigger to cause the start of the use case
* Trigger - describes the event that causes the use case to be initiated
* Course of Events - A basic set of events, generally conveyed in a ordered list (What happens when the case is triggered)
* Alternative Paths - each tested rule may lead to an alternate path (same format as the Course of Events)
* Postconditions - describes what the change in state of the system will be after the use case completes

I generally find that I have a pretty good idea of what I have to build after I’ve written out the Use Cases. While there are many other things that you’ll need for a proper design of the software, you should make sure that you include Use Cases.

## Paper Prototyping
The client always wants to see a mock-up of the project before its anywhere close to being done. They want to see how the design is coming to get a rough estimate of when it will be completed. A novice would quickly code a semi-functioning UI and show it to the client with hopes that they’ll like it. **THIS IS BAD!**

What happens when the client uses the rough design and love it. They think you’re showing them a fully functioning product even when its only bare-bones. I’ve done this once and I’ll never do it again (I cringe whenever I see a noobie developer fall into this trap). The problem is, that the client will think that you are almost done and wonder why the project is taking so long to complete.

Instead of writing up a semi-functioning UI, you should write down a mock-up of your software on paper and show them that. This has a few pros.

* Allows the client to see the idea of the software project
* Allows the client to play around with the software through simulation
* Gives you an idea of the things you should improve with the UI
* Doesn’t **give the illusion** that you’ve completed the software

By understanding the different uses of the system (through Use cases), you can essentially put the entire project on paper and have the client walk through how they would use it. This will show you any pitfalls in your design of the system. It will also not give the client the wrong impression of your progress. Paper prototyping is a Win-Win in my opinion.

## Evaluate the Design against the Requirements
While you’re designing the software you need to keep in mind the requirements you collected from the client (or the ones you made yourself). As you continue to design you need to refine your requirements and make sure that you’re making the product that your client works. This is called **verification**.

Verification is the process of determining whether you’ve built the right program from the given requirements and validation means checking to see if the product does what the customer (or user) actually wants the product to do under real-world conditions, or as-close-to-real-world conditions as you can possibly simulate.

You may have to go back to the client and ask to re-clarify requirements, goals, etc… if you find that your verification fails.

## Your Thoughts?
How do you go about designing your software projects? Do you bother with Use Cases and Paper Prototyping? What do you find works the best when trying to get a full understanding of the project? Tell me your stories or tricks in the comment section below.


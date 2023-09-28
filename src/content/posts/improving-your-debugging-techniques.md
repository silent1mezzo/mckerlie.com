---
title: "Improving your Debugging Techniques"
date: 2008-06-13
tags: [development]
---

Every single developer has at one point or another ran into a bug in their code. You can plan out your program, meticulously write it out, read over it, and in the end when you run it, you’ll inevitably find something that is wrong with it. The problem may be as simple as a syntax error or challenging such as a random segfault or semantic error. Whatever the problem is you’re bound to run into them from time to time. If you read on I’ll tell you five tips to improve your debugging techniques.

Before we begin I think it's a good idea to go through a couple of terms. The first term is [syntax](http://en.wikipedia.org/wiki/Syntax): The rules of the language. In computer programming terms this means the rules of the specific programming language. For example
```
pritf("Hello World"); //Syntax Error
printf("Hello World"); //Correct
```

Another example of a syntax error would be an improper use of a statement or function. If you used an “for” loop like
```
for(int i = 0; i < 10; i++; "Hello World");
```
this would cause a syntax error because the fourth section doesn’t belong.
The second term is [semantics](http://en.wikipedia.org/wiki/Semantics): The logic of your program. Let's say you have an array of size 100 and you want to loop through it. If your loop looks like this
```
for(int i = 0; i <= 100; i++)
```
you have a semantic error. Because your elements are 0 - 99, the 100th element will give you an error. Semantic errors are often harder to solve than syntax errors because they’re not as obvious as syntax errors.
Now that you know those terms we can begin with the list. Keep in mind that this list has no particular order.
1. **Understand Your Code**
Understanding your code is probably the most important tip I can give you. Often when people ask me for help and I ask to see a certain chunk of code they have no idea where to find it. If you don’t know what code is inside your program, how are you supposed to find an error?
2. **Take Breaks**
If you’ve been slaving over your code for hours on end trying to find a bug, do this; take a break. Go get a drink, read your favourite [blog](https://web.archive.org/web/20080706200257/http://thedailywtf.com/), go for a run or do anything that gets you away from your program. Taking a break gives your mind a chance to digest the code you have looked over and gives it a chance to solve the problem subconsciously. I have solved a number of buggy programs by taking a break and watching ‘Family Guy’.
3. **Do Incremental Testing**
Incremental testing is the process of writing small chunks of code (maybe a function or a loop) and then testing your program throughly. Now how does this help your debugging efforts? If you only have to debug a small piece of code instead of a multi-thousand line program you’re going to be saving a tonne of time debugging and going to have more time to program. I’ll be writing more about this in the weeks to come
4. **KISS**
KISS stands for Keep It Simple Stupid. I’m not calling you stupid so don’t get mad at me, but this is a very valid tip to help you debug your program. When your logic is overly complicated it becomes harder to debug than if you keep it simple. Breaking your code into logical sections and putting them into separate functions will help “Keep It Simple”. If you do this as well as Incremental Testing your debugging process will be much easier.
5. **Don’t Get to Attached to Your Code**
Don’t be afraid to delete code you have already written. Often times people get too attached to their program and refuse to get rid of unnecessary code. If you have a function that just doesn’t work, delete it, go over the logic and then re-write it. Sometimes this is much quicker than going over the old code line-by-line to find the error. Now before you go about doing this, I suggest you back-up your code before deleting it just in-case you decide to revert back to the original.

With these five tips hopefully you’ll be able to debug your program quicker and more efficiently. If you like to do a certain thing while debugging feel free to comment about it.

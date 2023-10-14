---
title: "Write Code as if People Will Read It"
date: 2011-09-12
tags: [development, programming]
---

“Oh I’ll just write this little script to do. Nobody will ever see it”. I have heard many programmers say that exact sentence. And inevitably someone at some point will see the hacked together script that you never meant for public consumption.

I want to propose a challenge to everyone. Write code as if everyone in the world will see it. Here are a few things you can do to complete this challenge.

## Use comments sparingly
Comments are excellent ways to give people a quick understanding of what a specific function does or to give insight on a given file. Be careful with having too many comments. Over saturating your code with comments can be worse than not having any comments. It can make your code difficult to read and obfuscate rather than help.

## Use meaningful variable names
This one is pretty self-explanatory. When you use single letter variable names you’ll quickly forget the meaning behind them and then have scour the source code to find out what they do.

## Don’t use overly complex statements
Simple is almost always better, especially when it comes to readability. One liners are great for compressing your code but in most cases they’re harder to read (especially for beginner programmers).

```
# In Python you can do
x if condition else y
# Or you can also do
(lambda:y, lambda:x)[condition]()
 
# Both of the above can be difficult for beginner programmers.
# Using a simple if/else statement is easier
if condition:
    x
else:
    y
```

## Use whitespace properly
Whether you use Python where whitespace is mandatory or languages like C or Java where it isn’t, using whitespace properly greatly improves readability. Programs like [this one](https://www.cise.ufl.edu/~manuel/obfuscate/buzzard) lose a lot of their readability by not using whitespace.

## Have proper unit tests
I can’t stress this one enough. If you have valid unit tests it makes it a lot easier for people (and yourself) to use. Writing unit tests will make sure that you code runs properly even when you add new functionality. It’ll also make changing existing functionality easier.

## Be able to explain it in 5 minutes or less
This tip may seem a little weird but you should be able to explain your code in 5 minutes or less. If it takes longer, your code may be too complex. Splitting it up into extra functions, methods or files could help. If you can’t explain what the code does then it’s unlikely that somebody else will be able to figure it out by reading it. Being able to explain your code also helps you organize your thoughts and decide whether or not the way you’re doing something is correct.

To sum everything up. Always write your code (even your little scripts) as if somebody else will be reading it. This will help you be a better programmer and will make it easier when you need to come back to the code in the future.


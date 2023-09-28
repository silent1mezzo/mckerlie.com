---
title: "The Art of Writing Maintainable Code"
date: 2008-05-26
tags: [development]
---

> “Debugging is twice as hard as writing code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it. -  [Brian Kernighan](http://www.cs.princeton.edu/~bwk/) ”  

If you’ve been programming for any length of time I’m sure at one time you’ve had the pleasure (or lack thereof) of wading through another persons code. It is definitely not a pleasurable journey when the code is new, written with the newest standards; but when the code is legacy it can be a downright hair-pulling experience.

The problem with a lot of code is that it isn’t written in a maintainable way. Now you may ask, what is “Maintainable Code”? Maintainable code is purely code that can easily be maintained throughout the years and on different platforms. If you asked 100 people that write code for a living you would probably get 100 different answers on how to write your own maintainable code. Below is a list of things that can help you make your code more maintainable.

## Good Use of Comments
Commenting your code is extremely useful if you do it in a good way. I’ve already written about commenting in “ [The Art of Commenting](/posts/the-art-of-commenting-code/) ” and the article does provide a bunch of good tips on how to comment your code but it doesn’t really say why it’s important. When a person reads another persons code they really have no idea what the original programmer was thinking. Comments (when done right) provide a great insight into the mindset of the code’s owner, providing an idea of why (s)he wrote the loop structure like they did or why they included that certain function.If the writer of the code did comment properly you’ll be able to update the code to the newest standard without to many troubles. Since commenting code for many programmers is an afterthought or at least not their highest priority, you know that if the comments are good then the rest of the program is probably written in good form as well.

## Use the Latest Standard
Most programming languages go through changes. These changes can range from the addition of new functions (to increase productivity) to the depreciation of certain definitions, functions, etc… As languages mature, pre-defined functions are re-written or depreciated and the language is generally improved. Keeping up with these changes is a great way to make sure your code will stay usable for as long as possible. Developer’s don’t change the language for silly reasons they do it to make the language better. Here’s an example of why it’s a good idea to write your code in the latest version.

“You’re a programmer for a small firm. Your job within the company is to write all of the in-house programs, whatever they ask. Now when you first learned how to program, c89 was the standard, so you use it for all of your programs (even though the standard is c99). It’s now the year 2007 and you decide to leave the company for a better job. Ten years after you leave the company upgrades their computer systems and are now using c2010. Unfortunately developers made some changes between c89 and c99 that breaks your code and the differences between c99 and c2010 are very small. Now if you had written in the latest standard your code wouldn’t have broken and the company wouldn’t be out a lot of money fixing it.”

Now this is an extreme example (code doesn’t generally change that much between language generations) but it isn’t too far off. I had a friend would went through basically the same thing as the example. It took him 8 months to fix the previous developers code that wouldn’t have been a problem had he used the latest standard.

## Write Smart Code
This should be fairly obvious because you should write the best code you can possibly write. While commenting your code can explain your thoughts behind doing something and writing your programs in the latest standard can make sure that your hard work doesn’t go obsolete a few years after writing it, writing smart code basically makes sure that people will _WANT_ to use your code in the years to come. There are a few things you can do to write good code.First, write variable name that are both descriptive but don’t a story. What I mean by this is if you’re making a game and you want a variable for the players health make the variable: ### int playersHealth
 and not `int this_is_the_players_health_And_its_an_int`. Secondly don’t be too clever for yourself. The term KISS (Keep It Simple Stupid) is a great idea in programming. If you can do something in 10 lines or in 100 lines choose the 10 line method. There’s no point obfuscating your code unless you're competing in the IOCCC (International Obfuscated C Code Contest).Finally use `#define` instead of hard coding variables. If you’re declaring an array in different areas of your code that always has to have 10 elements then make a definition for it.
```
 #define BUFF 10
```
This will make sure that all of the instances that use this definition will be properly changed if you need to increase buff. If you have to change 10 things it’s quite possible for an error to pop in.

---

Unmaintainable code is a big problem in the business world (where programs can cost millions of dollars). Keeping in mind the three points explained above can be a great way to make sure that your code lasts as long and with as little upkeep as possible.

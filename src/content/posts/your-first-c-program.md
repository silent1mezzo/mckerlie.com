---
title: "Your First C Program"
date: 2008-05-23
tags: [development, tutorial, programming]
---

So, you want to be able to write C programs? Well, you have come to the right place. Over the next few weeks I’ll be writing a series of tutorials called **“The Basics”**. Each one of these tutorials will cover a different subject that will help you learn how to program in C. In this weeks tutorial I’ll teach you how to write your first C program.

Before I go into detail about the program you will be writing, you’re going to need 3 things:

1. A C Compiler: If you’re working from a [Unix](http://en.wikipedia.org/wiki/Unix)  computer the [GCC compiler](http://gcc.gnu.org/) should already be installed. If you’re working from a Windows computer I would suggest installing an [integrated development environment (IDE)](http://en.wikipedia.org/wiki/Integrated_development_environment) such as [PellesC](http://www.christian-heffner.de/) (an IDE generally consists of an editor and compiler as well as other built-in tools). This compiler takes the code you’ll write later on and translates it into object files which you can then link together into an executable.
2. A Text Editor: If you just downloaded [PellesC](http://www.christian-heffner.de/) then you can use the built in text editor. If you don’t have an IDE you can just use any text editor.
3. The desire to program. You’d be surprised how many people decide they want to program and then stop as soon as they realize that it’s not as easy as they thought.

Now that you have those three things we can begin.

Every C program must have a function called “main”. Now, you may be wondering to yourself, “what's a function?” and that's a good question. A function is just a block of code that does a specific task. From within your main function you can call other functions; these functions can be ones you made or built-in ones that come with the language. To use these built-in functions you need to include a [header file](/posts/the-mysteries-of-pointers/) with the `#include` directive and place it at the top of the program. What this does is effectively take everything in the header and paste it into your program. Here’s an example of your first program.

```
#include <stdio.h>
#include <stdlib.h>
int main( )
{
    printf("Hello World!");
    return EXIT_SUCCESS;
}
```
So what does this program do and how does it do it? The best way to understand this program is to go through each line. On the first line you have your `#include <stdio.h>`. This tells the compiler that you wish to use all of the built-in functions located in stdio.h. The second line `#include <stdlib.h>` tells the compiler that you wish to use all of the functions located in `stdlib.h`. The next line is your main function. The `int` in this line can either be left or or changed to another basic datatype. After the `int main( )` line you have an open brace. This brace tells the compiler that the rest of the code (until the close brace) belongs to the function above it (in this case `int main( )`).

The next line, `printf("Hello World!\n");`, is used to output text from the program. You can put any text you wish inside the ” ” and it will print it to the screen. In the next “The Basics” tutorial I’ll show you how to print variables to the screen.

The final line, `return EXIT_SUCCESS;` tells the compiler that the program is finished and returns an integer. You could return any integer here but common programming practice is to use `EXIT_SUCCESS` or `EXIT_FAILURE` as return values from your main( ) because it has more meaning than returning a random value.

Finally you have your closed brace. This tells the compiler that any code after this is **not** part of the main function.

Now that you have your program written its time to compile it and run it.
1. If you’re using PellesC do the following: File -> new -> project -> Click on “Win32 Console Program (EXE)” and enter the project name -> press ok -> save your file -> Add it to the project (a pop-up box will ask if you want to) -> click on the red exclamation point to execute (compile and run)
2. If you’re using a compiler (GCC, CC, etc…) do the following: save the file (make sure it ends in .c) -> compile it (this depends on which compiler you’re using) -> run it (depends on your OS)

**Summary**
1. A `#include <.h file>`
 statement takes all of the pre-defined statements in the .h file and substitutes them into your program (it basically copies and pastes the text from the .h into yours).
2. Every program must have a `main( )`
 function. This function is where the program starts and ends.
3. `printf("whatever you want");` is used to output a string onto the console, you can substitute any string into it (as well as variables).
4. `{ and }` are used to define the scope of the code (local, global, etc…).

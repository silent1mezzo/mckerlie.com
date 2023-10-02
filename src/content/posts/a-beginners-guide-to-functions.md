---
title: "A Beginner's Guide to Functions"
date: 2008-06-06
tags: [development]
---

You have now learned how to  [write your first c program](/posts/your-first-c-program/)  as well as the different  [loops in the c language](/posts/loops-in-c/)  so its now time to learn about functions. In general, functions are blocks of code that perform pre-defined commands to accomplish a certain task. You can either use the built-in functions included in the library or user defined functions (ones you create).

Now you’ve already had experience with functions if you’ve read  [“Your First C Program”](https://web.archive.org/web/20080706104507/http://devjargon.com/tutorials/your-first-c-program/) . `printf("Hello World!");` is an example of a pre-defined function that’s included in the header file. Another function that you saw was the `int main( ) { }`function.

When creating your own functions it’s a good idea to get into the practice of writing prototypes. A prototype is basically the blueprint of the function, it tells the compiler what the function will return, what the function will be called, as well as what arguments the function can be passed. The general format for a prototype is simple:
```
return_type   function_name ( arg_type arg0, arg_type arg1, ... , arg_type argN );
```
The return_type and arg_type can be any type of data structure, for instance: int, char, double, etc. You don’t actually need to include the argument names (arg0, arg1, argN) to the prototype but it’s generally thought to be of good form to do so.

Now you can add your prototype to your function in two different ways. The first way is to add the prototype to the top of your program (making sure it’s added before the function is used). An example of this would be:

```
#include <stdio.h>
#include <stdlib.h>

int calc(int x, int y);

int main(){
    printf("%dn", calc(4,4));
    return(EXIT_SUCCESS);
}

int calc(int x, int y)
{
    return (x + y);
}
```
As you can see the calc function’s prototype is before the main function.
The second way to use a prototype would be to declare it in a  [header file](/posts/the-mysteries-of-pointers/) . Assuming that the prototype is in a file called “prototype.h” you would include it by doing this:

```
#include <stdio.h>
#include <stdlib.h>
#include "prototype.h"

int main(){
    printf("%dn", calc(4,4));
    return(EXIT_SUCCESS);
}

int calc(int x, int y)
{
    return (x + y);
}
```
If you don’t want to put the work into writing prototypes (though I suggest you do), you can just move your function up to where you would put your prototype. An example of this would be:
```
#include <stdio.h>
#include <stdlib.h>

int calc(int x, int y)
{
    return (x + y);
}

int main(){
    printf("%dn", calc(4,4));
    return(EXIT_SUCCESS);
}
```
This code would compile and work as well as any of the other examples.
Calling one of your user-defined functions is exactly the same as calling a pre-defined function. You simply call the function giving it the needed parameters:
```
#include <stdio.h>
#include <stdlib.h>
//Prototype for your function
int calc(int x, int y);

int main(){
    int a;
    //Calling the calc function with the integers 4 and 4.  Returns into the variable a
    a = calc(4,4);
    printf("%dn", a);

    //Second way to call a user defined function
    printf("%dn", calc(4,4));
    return(EXIT_SUCCESS);
}

int calc(int x, int y)
{
    return (x + y);
}
```
As you can see we called the calc function two different ways. The first way,
`a = calc(4,4);` calls the calc function with two 4’s and returns the addition into the variable a. The second way, `printf("%d", calc(4,4));`
 does the same thing as the first way but instead of saving the return value into a variable it just outputs it.

When using functions you might see two of the following warnings or errors:

```
error: Too many arguments to 'calc'.
warning: Missing prototype for 'calc'.
```

The first error happens when you call a function with too many arguments or two few. The second warning happens when you don’t have a prototype for the function and the function is defined below where ever it’s called.

The most important question is why do we need a function? Functions have many uses. For example, you may have a block of code that you want repeated many times throughout the program. If you put the code into a function it’ll save a great deal of space as well as making your code much more readable. Also, having only one copy of the code makes it easier to make changes. If you have to change the same thing multiple times it will not only take longer but there will be a much greater chance of errors popping into your code.

Another reason for functions is to break down a complex program into logical parts. Let's say you have a GPS program that calculates the distance you have traveled and the speed you walked at. Logically, you would break the distance calculator into its own function and the speed calculator into its own function (you may even split those up into more little functions). The worst programs usually only have the required function, main, and fill it with pages of jumbled code.

Creating your own functions is a good idea for many reasons:
1. It makes your code more readable
2. Blocks of code you use often no longer need to be added every time their used.
3. It’s easier to debug it once instead of 50 times.

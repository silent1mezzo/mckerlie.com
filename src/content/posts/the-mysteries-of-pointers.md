---
title: "The Mysteries of Pointers"
date: 2008-05-30
tags: [development]
---

One of the hardest concepts in the C programming language for me is Pointers. To this day I still often have to look in my text books when I’m diving deep into pointer world. Hopefully this tutorial will help demystify pointers for you.

### What are Pointers?
Pointers get their name for one reason: they “point” to locations in memory. Pointers are just variables that store memory addresses, usually the addresses of other variables. With this memory address you’ll then be able to go to that address and retrieve the data stored in it. If you happen to have a large of data that you want to pass into a function it’s a lot easier to pass its location to the function than to copy every element of the data.

### Basic Syntax
Declaring pointers is a little different than declaring other variables because when you have a pointer, you need the ability to request both the memory location it stores and the value stored at that memory location. You also need to tell the compiler when you declare your pointer variable that the variable is a pointer, and tell the compiler what type of memory it points to. Here’s the basic syntax for declaring a pointer.

```
//General Declaration
<variable_type> *<name>
//Example
int *ptr_to_int;
```
The asterisk in front of the declaration is your way of telling the compiler that you wish to declare a pointer. If you wish to declare multiple pointers on the same line, you have to supply an asterisk for each of the declarations

```
//Declaration for one pointer and one into
int *ptr1, ptr2;
//Declaration for two pointers
int *ptr1, *prt2;
```
### Accessing the Information at the Memory Address
When you want to access the information that's being stored at the memory location held in the pointer you need to do what's called “Dereferencing the pointer”. Basically, you’re taking the reference to some memory address and following it, to retrieve the actual value. If you’d like to access the information you can simply use the pointer without the *, for example.
```
//ptr1's memory location has a value of 25
int num = ptr;
//Num now equals 25
```

### How to Actually Point to Something
In order to have a pointer actually point to another variable you have to get the memory address of that variable you want the pointer to point too. To get the memory address of a variable (its location in memory), put the & sign in front of the variable name. This makes it give its address and is called the address-of operator, because it returns the memory address.
```
int x;
int *ptr;
ptr = &x;
```
Here’s an example program of using a pointer:
```
#include <stdio.h>
#include <stdlib.h>
int main(void)
{
    int x; // A normal integer
    int *ptr; // A pointer to an integer

    ptr = &x; // Assign the address of x to p
    scanf("%d", &x); // Put a value in x, you could also use ptr here because the scanf puts the value into x's memory location

    printf("%d", *ptr); // This prints off the same as x
    
    return (EXIT_SUCCESS);
}
```
How does the *ptr print the same thing as if you printed the value of x? Let's look at the code. The integer is called `x`. A pointer to that integer is defined as `ptr`. The pointer `ptr` stores the memory location of `x` by using the address-of operator (&) to get the address of the variable. The user then inputs a number that is stored in the variable `x;` remember, this is the same location that is pointed to by `ptr`.

The next line then passes into `printf()`.  `*ptr` performs the “dereferencing” operation on `ptr`; it looks at the address stored in `ptr`, and goes to that address and returns the value.

### Freeing up the Memory
Each pointer points to a chunk of memory. The memory that is pointed too becomes unavailable to other programs. This means that it is always a good idea to free this memory at the end of its usage. You do this by calling the `free()` function.

```
free(ptr);
ptr = NULL;
```
Assigning the pointer to NULL is also a good idea so it doesn’t point to a random chunk of memory, thereby producing garbage values.

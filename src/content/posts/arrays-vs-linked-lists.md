---
title: "Arrays vs. Linked Lists"
date: 2008-06-02
tags: [development]
---
I honestly can’t recall the number of times I’ve been asked about the differences between arrays and linked lists. There has been countless times when people have come up to me and asked “When should I use arrays and when should I use linked lists?” Since I’m getting tired of answering this so many times I felt I should write down my answer here.

I’ll go into a little detail of each data type and then I’ll explain when to use which

### Arrays
Arrays in C (as well as other languages) are used to store related data in one container. This container can be of any basic data type (ints, chars, etc) or any user defined data structures. The basic syntax is as follows:

```
//General Example
datatype variablename[size];
//Array named 'var' with 10 ints (currently not initialized)
int var[10];
//Array named 'var' with 4 ints all initialized to 0
int var[] = {0,0,0,0};
//Syntax error (you need to declare the size)
char var[];
```
The way to read this would be “variablename has size elements of datatypes” or “var has 10 elements of ints”.

Here are some basic tidbits for arrays:
1. The size is also called the index of the array
2. In C, index values start from 0 and go up. They can be any unsigned integer (no doubles, floats, chars, etc…).
3. Accessing an out of bounds element is always dangerous because sometimes the compiler will throw an error and sometimes it’ll just run along happily accessing garbage values. To make sure this doesn’t happen always use the following loop structure

```
int x;
int array[]= { 3, 6, 9, 12, 15 };
for (x=0; x < (sizeof(array)/sizeof(int)); x++) {
    //Do your code
}
```
Now finally I’ll talk about arrays and the memory they’re stored in. Array elements are stored in contiguous memory (for those that don’t know contiguous memory just means memory that's next to each other).
Lets say you declare an array as follows

```
int array[2] = {1,3};
```

So you have two elements array[0] = 1 and array[1] = 3. Now lets say that the element 0 is stored in memory at location `0x700000`
this means that element 1 would be stored at location `0x700004`
since ints are 4 bytes. With this example you can see what I mean by contiguous memory.

### Linked Lists
Linked lists are a series of nodes containing arbitrary data fields, linked together by pointers. Linked lists can be linked in one of two ways: 1) Singly linked or 2) Doubly linked. In both types the next node is connected by a pointer pointing to its location in memory. In the doubly linked list each node also has a pointer pointing to the location in memory of the previous node.

Linked lists can become much more complex than arrays because of the need for memory management. Below is a simple structure of a node.

```
struct node {
    int data;
    node* next;
} node;
```
As you can see each node has two fields. The first field is the data field, this could be any data type. The second field is a pointer to another node structure. This will be used as the next pointer. Here’s how you would declare a new pointer.

```
struct node* head = NULL;
head = malloc(sizeof(struct node));
```
You’ll see that I’ve created a pointer to a node called “head” and assigned it NULL. Now why did I assign it null instead of just leaving it blank. Well, mainly because it’s good practice. When you don’t assign it anything “head” would be pointing to a garbage value in memory and could cause problems. Now because of the next step it really doesn’t matter **but** its always good practice to assign all pointers the value of NULL initially.
So now that you have the node pointer “head” initialized how do I add data to it?
```
head->data = 1;
head->node = secondNode;
```
Here secondNode is an already initialized node.
Here’s a sample program on making a linked list
```
struct node
{
    int data;
    node* next;
} node;

void main() {
    struct node * curr, *head;
    int i;

    head  = NULL;
    for(i = 1; i < 10; i++){
        curr =  malloc(sizeof(struct node));
        curr->data = i;
        curr->next = head;
        head = cur;
    }

    curr = head;

    while(curr){
        printf("%dn", curr->data);
        curr = curr->next;
    }
}
```
This program loops 10 times each time creating a new node (called curr) and placing it as the new head. If you wanted to place it at the tail you’d just just do the loop this way:
```
for(i = 1; i < 10; i++){
    curr = malloc(sizeof(struct node));
    head->data = i;
    head->next = curr;
    head = curr;
}
```
So now that you know what arrays are and what linked lists are when should you use one another and what are their strengths and weaknesses

### Arrays
**Strengths**
1. Easy to use
2. No memory management needed
3. Can access any element by index
4. Fairly quick to loop

**Weaknesses**
1. Static size (can’t increase the size)
2. Most likely not enough or too much memory (you never know how many elements are needed)

### Linked Lists
**Strengths**
1. Dynamic size (can increase or decrease the list)
2. No memory is wasted

**Weaknesses**
1. Lots of overhead code (lots of malloc calls and assigning pointers)
2. Must traverse entire list to go to the nth node.

Now I know that other languages such as C# and Java have better data structures than arrays and linked lists (like ArrayLists and Vectors), but this is for the C language and it doesn’t have those. So based on what you’ve read above you can decide which is better for the job needed. Neither arrays nor linked lists are better but they do have their specific purposes.

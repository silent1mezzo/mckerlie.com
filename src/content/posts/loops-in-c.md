---
title: "Loops in C"
date: 2008-06-02
tags: [development]
---

If you want to repeat the same blocks of code over and over you have two choices. Copy and paste each block or you can use a loop. In C there are three different types of loops: for, while, and do…while. Each of them has their own specific uses and syntax, and below I’ll explain all three.

### For Loops
```
for( variable declaration/initialization; condition; variable update) {
    //Code to be repeated
}
```
So as you can see there are three parts needed to use a for loop. The first part is the variable declaration/initialization. Here you can either declare a new variable and assign it a value or use an existing variable. In C you can use any integer based data type (int, char, etc…), in other languages there are other types of for loops (for each…) where you can use other data types. Second, the condition tells the program to exit the loop when the conditional expression evaluates to false. Finally the variable update does just that, updates the variables. Generally you would put something like x++, x = x + 10 but if you really wanted to you could call another function to update the variable.

For loops are generally used when you know the exact number of iterations. Here’s an example of a simple for loop.

```
#include <stdio.h>

int main() {
    int x;
    for (x = 0; x < 10; x++) {
         printf("x = %d", x);
    }

    return (1);
}
```
The results of this program would be: “x = 0x = 1x = 2x = 3x = 4x = 5x = 6x = 7x = 8x = 9″ Because the program loops from 0 and exits when x = 10 (meaning it only prints up to 9). As you can see for loops are fairly easy.

### While Loops
```
while ( condition ) {
    //Code to be repeated
}
```
The condition can be any boolean expression and the loop will continue while the condition evaluates to true. Here are a couple of legal conditions: (x == 1), (x != 7), or even (x ==5 || v == 7) which says execute the loop while x is equal to 5 or v is equal to 7. A while loop is basically a simple for loop with no initialization or update section. Here's an example of a while loop.

```
#include <stdio.h>

int main() {
    int x = 0;
    while (x > 10) {
        printf("x = %d", x);
        x++;
    }

    return (1);
}
```
The program above would output the same as the for loop program but with an extra line of code. Now there's one thing you need to be careful about here. Since the while loop doesn’t initialize the condition variable it must be done outside of the loop. I’ve forgotten to do this before and the results can be varied. Sometimes it’ll be fine but sometimes you’ll get results that are not as expected.

### Do..While Loops
```
do {
    //Code to be repeated
} while (condition);
```
Do..While loops are essentially the same as While loops except that you know they’ll be executed at least once. The condition again can be any boolean expression and will loop while the condition is true. A while loop says “Loop while the condition is true, and execute this block of code”, a do..while loop says “Execute this block of code, and then continue to loop while the condition is true”. Here’s an example of a do..while loop.

### #include <stdio.h>

```
int main() {
    int x = 0;
    do {
        printf("x = %d", x);
        x++;
    } while (x << 10);

    return (1);
}
```
The results are the same as before. One thing that people often forget about do..while loops is the semi-colon after the while (condition);

### Break and Continue
These two keywords have great importance to looping. The Break command will exit the most immediately surrounding loop regardless of what the conditions of the loop are. If you are executing a loop and hit a continue statement, the loop will stop its current iteration, update itself (in the case of for loops) and begin to execute again from the top. Here’s an example of both statements.

```
#include <stdio.h>

int main() {
    int x;
    for (x = 0; x < 10; x++) {
        if(x == 1 || x == 4 ) {
            continue;
        }
        else if(x == 8) {
            break;
        }
        else {
            printf("x = %d", x);
        }
    }

    return (1);
}
```
The results of this are x = 0x = 2x = 3x = 5x = 6x = 7. As you can see both 1 and 4 are exclude and the list ends at 7. Break and Continue statements are very useful when used properly.

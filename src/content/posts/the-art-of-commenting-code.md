---
title: "The Art of Commenting Code"
date: 2008-05-26
tags: [development]
---

No matter what other people say, commenting source code is an art form. It takes finesse (and sometimes an English degree :P) to properly comment your code. Some people have the mindset “if its code, it has to be commented with long detailed comments” while others take the total opposite and barely comment a single line, and when they do they just explain the obvious. Which mindset is best? Neither!

The reason why commenting source code is an art form is because there’s a very fine line on how much commenting is too much and how much is too little.

Now before I look into both of the different mindsets I’d like to point out that I’m not talking about self-documented code (i.e code that explains itself), I’m talking about comments beyond that. Everyone should write self-documented code as long as it doesn’t convolute the source code too much.

Lets first take a look take a look at the different approaches to commenting; too much and too little:

**Too Little**
```
/******************
Auth: Adam McKerlie
Date: 08/14/2007
******************/
#include <stdio.h>
#include <stdlib.h>
//This is a function
int calculateDistance(int x, int y){
     . . . .
}
//Main function
int main(){
     int x=0;
     int y=2;

     calculateDistance(x, y);
     printf("SUCCESS");
     return EXIT_SUCCESS;
}
```

“Pssh, that code has all of the comments it needs” and for a small program like this some would say you’re right. In this case you’re going to want to make your comments more meaningful. “`//This is a function`” isn’t going to help people understand what the function does. A brief overview of the function (maybe including entry and exit conditions) would be helpful here for anyone trying to maintain the code.

**Too Much**
```
/**************************************
Auth: Adam McKerlie********************
Date: 08/14/2007***********************
Change log: v1.0:**********************
     -Added three variables to function
     a1 to check the sum variable
     -Blah blah blah*******************
***************************************/

/*These are two pre-defined header files that 
I've included I'm going to be using printf() 
from stdio.h and then I'll be usingEXIT_SUCCESS 
from stdlib.h*/
#include <stdio.h>
#incude <stdlib.h>
/*This function takes in the two variables 
(x and y) and calculates the Distance 
between the two. In the end it will return an
 integer.  I thought I'd include a few error 
checks in the code but then decided 
against it. They'll be added in version 1.1 */
int calculateDistance(int x, int y){
     . . . .
}
//The function where the program starts.
int main(){
//These are the two variables use.
     int x=0;
     int y=2;

     //Call the the calculateDistance function
     calculateDistance(x, y);
     //Prints that the function was a success
     printf("SUCCESS");
     //Exits the program
     return EXIT_SUCCESS;
     //End of the main function
}
```
You laugh but I have seen a couple of programs that were commented this way. In the example you’ll see that the person commented almost every single line of code. Not only did they state the obvious in the comments there's just to many of them! Commenting like this will increase the length of your program by a lot and won’t help anyone decipher the source code.
So how do you become a master of commenting? Following the next few steps will definitely help.

1. **Give useful comments:**
Don’t give useless comments! For example if you put a comment “This is a loop” just above a for loop you’re only adding to the size of the file. This type of comment doesn’t help the reader understand the code any more. Useful comments might include telling the reader what the loop does, telling if there are any exit conditions or explaining what a specific function does.
2. **Keep your comments short:**
People don’t want to read paragraph long comments, they get bored. When you add comments you should explain what's going on in a precise way and that's all, don’t add things that aren’t necessary. Included in this is the length of words. Don’t pick up the closest thesaurus and figure out which words are longer. Keep the words short and sweet and it’ll make everyone happy.
3. **Spell Check your comments:**
Spell check? Are you serious? One of the biggest things that annoy my colleagues and I are spelling errors in comments. It shows that the person put them in quickly and didn’t really think over what they were going to say. You wouldn’t submit a report to your boss filled with spelling errors would you? So why would you submit your code with spelling errors?
4. **Get a friend to look it over:**
Finally have someone else who has never seen the code go over it. The point of this is if they have any questions about any parts of your code you should comment that part better. A person who has never seen the source code is a perfect guinea pig to test whether or not the comments are effective.

The saying “Practice makes perfect” is a good term for this. The more experience you have with commenting your code the better you’ll be, and the easier it’ll be when you are commenting. If you have any extra tips on commenting feel free to use the comment section below.

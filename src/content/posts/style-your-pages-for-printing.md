---
title: "How To Style Your Pages For Print"
date: 2008-08-18
tags: [development]
postSlug: style-your-pages-for-printing
---

Last week I talked about an easy way to [add a print link](/posts/wordpress-hack-print-this-link) into each and every one of your posts using a little bit of javascript. The output of those pages however, looks extremely ugly and today I’m going to show you how to pretty up your print output with CSS.

Now, before we get started I just want to say that I’m not actually going to get into the dirty details of which colours you should pick and what font you should use to style your pages. I’m merely going to say which elements you need to include and which ones you should remove to make your pages look nice.

## Creating and Including your Printer CSS file
Before we can begin styling your pages for print, we need to create and include a printer CSS file. To make things as simplistic as possible I always name my files in a straightforward manner. I created a file called `print.css` and added it to my style directory.

To include this style sheet into your theme or website, you’ll need to add this code somewhere in between
```
<link rel="stylesheet" href="print.css" type="text/css" media="print" />
```
Obviously the path to the .css file will change depending on where you’ve put the file so you should change the code to work with your website.

## What to Include and What Not to Include
When a person wants to print a specific article what do you think they want to see, the sidebars and menus? In my opinion, when a user wants to print a page, all they want is the content and possibly the comments associated with the post. They don’t want your menus, ads, or sidebars.

This means in your print.css file you’re going to want to include:

* Logo and Name
* Content
* Comments

And your not going to include:

* Menu
* Sidebar
* Ads
* Comments
* Excessive use of non-important images (ones that aren’t related to the post)

Now, this part is going to be very specific to your likes and dislikes so I’m just going to go over what I like and you can decide whether to include more things or not.

## Styling print.css
First, you’re going to want to include everything that you want printed. For myself, the code would look like this:
```
#logo { }
#content { }
#comments { }
```
Once you’ve added these to the .css file you can style them however you like, making them look nice for the printer.

Underneath the things you want to have, you’ll now add the things that you don’t want displayed. Again, for this site here are the things I’ve included:
```
#nav { display: none; }
#post-footer { display: none; }
#footer {display: none; }
.sidebar {display: none; }
```
This will make sure that the navigation, footer sidebar and anything else don’t show up. The `display: none;` works exactly like it sounds; nothing is displayed. If you have ads in the content or anywhere else you could also add to this list. I realize that you could short-form this, but I like to put everything on its own line because it helps me with readability.

## Finish Up
Once you’ve got the backbone of your print.css file all that's left is fine tuning things. Tweak the `<a>` tag or the `<img>` tag to make it look nice. Just remember that you don’t need to print a page every time you want to see what it looks like. In both Firefox and IE you can select File -> Print Preview and see what the output will look like.

Have fun with this and style your pages.


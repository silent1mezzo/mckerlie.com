---
title: "Wordpress Hack: Adding a ‘Print This’ Link to Your Posts"
date: 2008-08-12
tags: [development, wordpress]
postSlug: wordpress-hack-print-this-link
---

If you go to most blogs now-a-days you’ll most likely see their  feed  displayed prominently somewhere near the top of their content. What happens when a person visits your site and finds an article that they really like and want to print it. You could use a popular plugin to display a link to print the page or you could just add the code yourself and save server resources and [load time](https://web.archive.org/web/20090125190809/http://buzzdroid.com/wordpress/yslow-and-wordpress-plugins-kill-your-score/).

Here are a few lines of code that you could add to your site to give your visitors easy access to print the page.

## Add to the Page / Post
If you just want a plain link add the following code to your post or page:
```
<a rel="nofollow" href="javascript:window.print()">Print This!</a>
```
This link is a “Javascript URL”. Instead of the link going to a specific URL, it calls the Javascript method window.print() which opens a print dialog box.

Instead of having text, you could use a `<img>` tag and use a printer image. Keep in mind that this won’t work if your visitors have Javascript disabled. They’ll see the link but nothing will happen when they try to print the article.

## Add to the Theme
If you don’t want to add the above code to every page or post that you write, you could edit your theme to include this into every post.
Simply edit single.php or page.php and add in:
```
<a rel="nofollow" href="javascript:window.print()">Print This!</a>
```
somewhere underneath the line `<?php the_content(); ?>` This will put the link into every post and page that you write.

By default, printed Wordpress posts are **extremely ugly** so you should create a printer CSS file to customize the printed page. We’ll be looking at making a [printer CSS file](/posts/style-your-pages-for-printing) on Monday.

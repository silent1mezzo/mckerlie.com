---
title: "Building a Company Engineering Blog"
date: 2023-04-17
tags: [management]
description: Creating a company engineering blog is hard. From building to planning to encouraging engineers to write. This post walks you through how to build a company engineering blog successfully
keywords: [engineering blog, company blog, company engineering blog, tutorial, creating an engineering blog, managing an engineering blog]
---

Over the last ten years, I've built two (relatively) successful company engineering blogs. The first was at a travel company called [G Adventures](https://tech.gadventures.com/). We weren't a tech company per se, but we solved a lot of cool engineering problems. Unfortunately this blog was abandoned after I left. The next was at [Sentry](https://sentry.engineering/). The scale of challenges was different than at G Adventures and I think the quality of posts show that.

At first, I thought it would be easy, toss some words together, host somewhere and people would come. This worked for my personal blogs so why would it work again? Oh how I was wrong.

## Getting Started
One of the most important things to think about when you're starting an engineering blog is answering why. For personal blogs, the why could be because you feel like it, you want to be seen as an expert or you just need a creative outlet. 

The cost of investment for a company engineering blog is significantly higher. Engineers are generally the most expensive line item at a company so having them devote time to writing is expensive. If you're not a tech company, your blog will primarily be a recruiting tool. Yes, it may bring some eyes to your brand, but the goal of it will be to showcase your engineering culture and talent. If you are a tech company the blog will also be used to improve your brand identity. As engineers discover and read your articles they may also check out your product. 

Understanding the goals of the blog will help you plan and prioritize posts, as well as understand how it provides value to your engineers and company. 

## Technology
Now that you've (hopefully) figured out the why, now it's time for the how. There's an infinite number of ways to build a blog. You could spin up an instance of [WordPress](https://wordpress.com/), use a CMS like [Contentful](https://www.contentful.com/) or host it on a platform like [Medium](https://medium.com/). The possibilities are endless, so choose whatever fits best with your existing workflow. The hardest part of running a corporate engineering blog is getting engineers to write. This is why it's critical to make the process of planning, writing and releasing as simple as possible. At G Adventures we used Medium since, at the time, it was possible to have a custom domain and the network effects seemed like a good idea. These days, I think there are better workflows by hosting it yourself. 

### Static Site Generator
A static site generator takes your posts and your theme and generates raw HTML. Unlike a CMS, the pages are generated beforehand and then served to your readers. There's no need to query a database, identify needed plugins, generate the page and serve. This generally leads to a quicker load time. 

There are a number of great options depending on your preferred language. This blog used [Hugo](https://gohugo.io/), which is written in Go. For Sentry's Engineering site, I used a Next.js [project designed for blogs](https://github.com/timlrx/tailwind-nextjs-starter-blog). There's also great static site generators in [PHP](https://github.com/timlrx/tailwind-nextjs-starter-blog), [Ruby](https://jekyllrb.com/), [Python](https://getpelican.com/).

### Markdown
Now you need some content to turn into HTML. At this point, I'd say most devs are used to writing in Markdown whether it's writing docs, PRs, notion docs, etc... Markdown allows you to focus on the words and worry less about what the words look like compared to WYSIWYG editors (like WordPress). Here's a great guide to get starting with [Markdown formatting](https://www.markdownguide.org/cheat-sheet/).

### GitHub
Your developers already spend a non-trivial amount of time on GitHub reviewing pull requests, commenting on code, possibly even merging and deploying their features so it only makes sense to stick with something they're familiar with. GitHub also has the right tools for planning out the content, reviewing it and eventually releasing it. 

GitHub's projects can help your engineers ideate and plan their posts

![GitHub project with various states of posts](./gh-project.png)

Engineers can collaborate in the review process, helping with overall structure, spelling and grammar fixes.

![Pull request for a recent post on sentry.engineering](./post-pr.png)

You can use GitHub actions for things like spell checks or making sure links work properly. Finally, depending on where you host it, you can have everything automatically deploy once the post is ready to go out. 

## Writing Posts
By this point you've now finished the easy stuff. You've figured out why you're building this engineering blog. You've decided on the technology and processes around it, now comes the hard part of actually getting engineers to write about the interesting problems they're solving.

### What should you write about
Every company is uniquely situated to talk about the problems they're solving. I've found that engineers often downplay the work they're doing but it's important to remember that other engineers may be trying to solve similar problems or the way that you solved something may unlock another way of thinking about things. When I noticed that engineers were spending 70+ hours a year waiting on postgres restores I [wrote about it](https://medium.com/m/global-identity-2?redirectUrl=https://tech.gadventures.com/tag/postgres). This wasn't groundbreaking work but now it's been read over 250,000 times. A year later I wrote a follow-up, [reducing the wait time even further](https://tech.gadventures.com/speeding-up-postgres-restores-part-2-4f09aad19fe8) and it's been viewed over 100,000 times.

You can also talk about the things you're building. At Sentry we have an entire category dedicated to [building Sentry](https://sentry.engineering/tags/building-sentry). I find these kinds of posts are really interesting because it helps me think of different ways we could build.

Finally, you can talk about your unique engineering culture. Since one of the goals is to recruit people, helping potential employees know what they'll be walking into can improve the interview process and bring in more applicants. Highlight the engineers working for you, talk about the interview process, highlight conference talks and events.

### Finding time to write
Now that you have an idea of what to write, how do you get engineers to actually put thought to keyboard? Here are a few ways I've been successful:

*Carve out time in sprints*
As your engineers are writing software you could plan a writing day. This allows people to have a break from writing code and gives some time to write. I've always found that [writing out what I'm working on helps solve the problem](https://www.cloudstreaks.com/blog/2019/12/15/writing-is-problem-solving#:~:text=By%20writing%20out%20the%20parts,more%20than%20four%20moving%20parts.) so allowing time to write could speed up development.

*Have a writing hackweek*
Lots of companies have hackweeks to build new ideas, try out risky bets and more, why not try this with writing? Having a few engineers writing together can produce some amazing content that you can then release over the next few months.

*Showcase the value*
Sometimes the hardest challenge is to get the engineers to see the value they're providing by writing posts. You could highlight the monthly top posts, show the number of pageviews or talk about any successful hires that mentioned the blog. This basically gamifies the writing process and gets people excited. 

## Planning and releasing and sharing, oh my!
After writing, having a content plan and release schedule is critical to keeping the momentum going. Like a backlog for the software you write, a backlog of potential posts can help engineers remember what they've done when they have time to write. It reduces the cognitive overhead and allows engineers to jump into a new post quickly. 

If you're in a place to have multiple posts ready it's best to spread them out. I've found that a maximum of one post a week allows for content to be shared and found and helps there be a consistent flow. a regular cadence is more important than volume. If you can keep up with once a month this is better than a couple in a week and then six months off. 

Have your engineers submit their posts to whatever communities they're involved with (twitter, reddit, hackernews, LinkedIn, etc...). This allows for a more organic feel and, in my opinion, does better.  You can link to the post and those social shares in your work chat to highlight the work the engineer has done and help boost the shares. You do need to be careful, especially with hackernews, to make sure you're not boosting the post from the same location as this can be caught and penalized by some algorithms.

Congratulations, you now have a regular cadence of high-quality posts, all you can do is keep going!

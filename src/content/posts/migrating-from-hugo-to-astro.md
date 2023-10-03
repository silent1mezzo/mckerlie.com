---
title: "Migrating from Hugo to Astro"
date: 2023-10-03
tags: [development, meta]
---

Early this month I finally migrated this blog from [Hugo](https://gohugo.io/) to [Astro](https://astro.build/). Overall it was fairly easy but I'm going ot talk about the reasons why I made the change, the things I needed to do and the challenges I ran into converting the site.

## Why move from Hugo to Astro?
First and foremost, both Hugo and Astro are frameworks for building websites, especially statically generated content like blogs. Hugo is written in Go and uses a Go-based templating system whereas Astro is built with Javascript and uses a templating system more similar to React with components. For me, this blog was my first foray into Go ([technically second](https://github.com/openflagr/flagr/pulls?q=is%3Apr+author%3Asilent1mezzo+is%3Aclosed)) and as much as I want to like it, I've just never been able to get proficient with the language. I have been using Javascript (and React) for a number of years now and Astro feels much more at home. 

I also mainly wanted to learn more about Astro and the way that I learn new frameworks and languages is by 

## Migrating from Hugo to Astro
While Astro does have an [official guide to migrate](https://docs.astro.build/en/guides/migrate-to-astro/from-hugo/) it's basically "start fresh and good luck" and honestly, that's what I did. Astro has a number of [starter blog themes](https://astro.build/themes/?search=&categories%5B%5D=blog) that you can choose from. I chose the one that looked closest to my original site and got started from that.

First, you'll need to create a new project with Astro.

```zsh
# If you're starting from scratch
npm create astro@latest

# If you're using a template
npm create astro@latest -- --template <template name>
```

Once you've 
## Challenges
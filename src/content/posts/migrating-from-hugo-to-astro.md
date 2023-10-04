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

Once you've created the new project you can start migrating your posts over. I found that when moving a few over at a time helped me with debugging. When I moved the entire post directory over I got lost with what needed to be updated. Once I figured out the issues on a couple posts (`pubDate` vs `date`, images and public directory) moving over the rest in bulk and editing them went a little quicker.

Next up, you'll need to either port your theme over or start from scratch. Astro includes a [number of themes](https://astro.build/themes/) you can use to get started. Because of the differences in querying, extending your markdown and more I decided to go this route.


## Challenges

**pubDate vs date**

**Images**
In Hugo, images can be stored either in the same directory as a post or in the assets directory. Hugo allows for page resouces and global resources and does a little magic to check both cases

```
content/
└── posts/
    └── post-1/           <-- page bundle
        ├── index.md
        └── sunset.jpg    <-- page resource

```
```md
![Image text](sunset.jpg)
```

and to access a global resource
```
assets/
└── images/
    └── sunset.jpg    <-- global resource
```
```md
![Other image text](images/sunset.jpg)
```

In Astro, it's recommended to store your images in your `src` directory, for global resources you store them in your `public` directory. This worked well for me since I was already storing them in the same directory as my posts. The main difference is that, in Astro, you need to reference them by their relative path. This tripped me up for a while and I had to update every post that had images.

```
content/
└── posts/
    └── post-1/           <-- page bundle
        ├── index.md
        └── sunset.jpg    <-- page resource

```
```md
![Image text](./sunset.jpg)
```

To access a global resource the reference stays the same, you just move the images from `assets` to `public`
```
public/
└── images/
    └── sunset.jpg    <-- global resource
```
```md
![Other image text](images/sunset.jpg)
```

**Public directory**
The second issue that I struggled with was my [resume](/resume.pdf) and other global resources not showing up. This one took me a little longer than it should have since everything worked locally and then when I pushed to production the files would 404. 

When you [build Hugo](https://gohugo.io/getting-started/usage/#build-your-site), it compiles and builds all of your pages and publishes them to the `public` directory. Since I was hosting my site with Netlify and running the build command there, I didn't need git to track changes to it so I added it to my `.gitignore` file. [Removing this](https://github.com/silent1mezzo/mckerlie.com/commit/c2e68c21bb6ae1563473a3e84fc5cd6449c75ee2) made my resume and other global files start showing up.

## Final Thoughts
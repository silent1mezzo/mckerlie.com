---
title: "Migrating your blog from Hugo to Astro"
date: 2023-10-05
description: A quick look into how you can migrate your blog from Hugo to Astro, extend your markdown content and fix any issues that come up during migration.
tags: [development, meta]
---

Early this month I finally migrated this blog from [Hugo](https://gohugo.io/) to [Astro](https://astro.build/). Overall it was fairly easy but I'm going to talk about the reasons why I made the change, the things I needed to do, and the challenges I ran into converting the site.

## Why move from Hugo to Astro?
First and foremost, both Hugo and Astro are frameworks for building websites, especially statically generated content like blogs. Hugo is written in Go and uses a Go-based templating system whereas Astro is built with Javascript and uses a templating system more similar to React with components. I struggled with extending Hugo, querying for posts, routing and extending markdown, which was primarily due to my lack of Go knowledge. For me, this blog was my first foray into Go ([technically second](https://github.com/openflagr/flagr/pulls?q=is%3Apr+author%3Asilent1mezzo+is%3Aclosed)) and as much as I want to like it, I've just never been able to get proficient with the language. I have been using Javascript (and React) for several years now and I feel much more at home with Astro. 

I also mainly wanted to learn more about Astro and the way that I learn new frameworks and languages is by working on an actual project.

## Migrating from Hugo to Astro
While Astro does have an [official guide to migrate](https://docs.astro.build/en/guides/migrate-to-astro/from-hugo/) it's basically "start fresh and good luck" and honestly, that's what I did. Astro has many [starter blog themes](https://astro.build/themes/?search=&categories%5B%5D=blog) that you can choose from. I chose the one that looked closest to my original site and got started from that.

### Creating a project
First, you'll need to create a new project with Astro.

```zsh
# If you're starting from scratch
npm create astro@latest

# If you're using a template
npm create astro@latest -- --template <template name>
```

### Migrating your content
I started by moving the entire post directory over to Astro’s format, but I found it to be a challenge to understand and fix the subtle differences between Hugo and Astro. I reset and began to move a few posts at a time so that I could debug a small batch, learning and understanding the pitfalls between the two formats (such as pubdate vs date, images and public dir). With this knowledge I was able to move the rest over in bulk with minimal headache.

I only worried about a theme after I migrated my content because I didn't want to get too invested until I was sure I could easily move my content. I personally found it easier to start from scratch because of the differences in querying, extending markdown, etc... Astro includes a [number of themes](https://astro.build/themes/) you can use to get started.

### Extending Markdown
In Hugo, you can extend your markdown by creating and using [`shortcodes`](https://gohugo.io/content-management/shortcodes/). For me, I used a couple of the built-in ones for embedding YouTube videos and Tweets.

```md
{{< youtube w7Ft2ymGmfc >}}
{{< tweet user="adammckerlie" id="1453110110599868418" >}}
```

For Astro, you'll need to use [MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/) to extend your markdown files. MDX allows you to use variables, JSX expressions and components within Markdown content.

```zsh
npm install @astrojs/mdx
```

Then add it to your `astro.config.js`

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // ...
  integrations: [mdx()],
  //             ^^^^^
});
```

Now you can add or change a Markdown file to a MDX file by changing the file type `.md` -> `.mdx`. To embed YouTube videos or Tweets simply install a couple of community plugins

```zsh
npm i @astro-community/astro-embed-youtube @astro-community/astro-embed-twitter
```

And then add them to your MDX post.

```mdx
---
Front Matter YAML
---

import { Tweet } from '@astro-community/astro-embed-twitter';
import { YouTube } from '@astro-community/astro-embed-youtube';

<Tweet id="https://twitter.com/adammckerlie/status/1453110110599868418" />
<YouTube id="w7Ft2ymGmfc" />
```

## Challenges

### Different front matter variables (pubDate vs. date and tags vs. categories)
The first challenge I ran into was the different requirements for front matter variables. Hugo uses `date` and `categories` whereas Astro uses `pubDate` and `tags`. I handled these in two different ways. I personally prefer `date` over `pubDate` so I went in and changed Astro's Collection. I changed it in `content/config.ts` and then any other file that referenced `pubDate`.

```ts
const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      title: z.string(),
-     pubDate: z.date(),
+     date: z.date(),
      ...
});
```

For `categories` -> `tags`. I did a simple search and replace in my `content/posts` directory using VS Code's [find and replace](https://code.visualstudio.com/docs/editor/codebasics#_find-and-replace). You could also do this in your terminal using sed.

```zsh
find content/posts -type f -exec sed -i "" "s/categories/tags/g" {} \;
```

### Images
In Hugo, images can be stored either in the same directory as a post or in the assets directory. Hugo allows for page resources and global resources and does a little magic to check both cases

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

### Public directory
The second issue that I struggled with was my [resume](/resume.pdf) and other global resources not showing up. This one took me a little longer than it should have since everything worked locally and then when I pushed to production the files would 404. 

When you [build Hugo](https://gohugo.io/getting-started/usage/#build-your-site), it compiles and builds all of your pages and publishes them to the `public` directory. Since I was hosting my site with Netlify and running the build command there, I didn't need git to track changes to it so I added it to my `.gitignore` file. [Removing this](https://github.com/silent1mezzo/mckerlie.com/commit/c2e68c21bb6ae1563473a3e84fc5cd6449c75ee2) made my resume and other global files start showing up.

## Final Thoughts
Overall I've found Astro to be much easier to work with. It seems to have a larger community to build upon and since I'm already comfortable in JS it feels more like home. If you're looking to switch as well feel free to message me on [Twitter](https://twitter.com/adammckerlie) or [LinkedIn](https://www.linkedin.com/in/adammckerlie/).
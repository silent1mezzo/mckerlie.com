---
title: "Improving the sharing experience in Astro"
date: 2023-11-02T10:00:00Z
description: A deep dive into how I built my first npm package, a social media sharing component for the Astro framework
tags: [astro, open source, astro component, development, javascript]
---

A couple months ago I [migrated this blog from Hugo to Astro](https://mckerlie.com/posts/migrating-your-blog-from-hugo-to-astro) because I was more familiar with the underlying language (Javascript) and I wanted to learn this relatively new framework. Overall, the process was extremely easy but I was missing something that came included previously, sharing links to allow people to share my blog posts on social media. That's where [Astro Social Share](https://www.npmjs.com/package/astro-social-share) comes in, a fully configurable set of social media buttons for your website. Here's how I went about designing, building and releasing my first NPM package.

## Building v0

The first step in making something that others could use was to make it work for myself. I started by opening up my editor and adding in a couple stubs for the sites I knew I'd want to support, Twitter, Reddit, Hackernews and LinkedIn.

```html
<a href="#">Twitter</a>
<a href="#">Reddit</a>
<a href="#">Hackernews</a>
<a href="#">LinkedIn</a>
```

Next, I had to figure out which URLs to actually send people to and what variables they each take. This was the most difficult step since each site is different. Reddit, for example, would try to load an invalid subreddit unless I encoded the sharing URL before sending people to it. Twitter is the only site that allows tagging the author using the `via` tag.

```html
<script>
  const encoded_url = encodeURIComponent(url);
</script>

<a
  href="https://twitter.com/intent/tweet?url={url}&text={description}&via={username}"
  >Twitter</a
>
<a href="https://www.reddit.com/submit?url=${encoded_url}&title=${title}"
  >Reddit</a
>
<a href="http://news.ycombinator.com/submitlink?u=${url}&t=${title}"
  >Hackernews</a
>
<a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}"
  >LinkedIn</a
>
```

Once I had the links working I just had to find icons to use. One way to do this is to Google `<company> logo svg` but that would lead to styles that don't match. I ended up finding a [website](https://simpleicons.org/) that had all of the company logos as well as their company colour to use when I got around to styling the hover state.

```html
<a
  href="https://twitter.com/intent/tweet?url={url}&text={description}&via={username}"
>
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>X</title>
    <path
      d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
    />
  </svg>
</a>
...
```

With this, I had a working social media sharing bar for this website. Now I just needed to make it easy to use and publish it.

## Making it Configurable

Armed with a working MVP I was now challenged to make it easy to use and configurable. Just because I like a certain set of websites to share or a given order doesn't mean everyone will.

The first iteration of this was moving each component into its own Astro file (`.astro`) and showing people how to import these components. This allows people to include the components they want, in the order they want.

```astro
---
// reddit.astro
const { url = Astro.request.url, title } = Astro.props;

const encoded_url = encodeURIComponent(url);
let URL = `https://www.reddit.com/submit?url=${encoded_url}&title=${title}`;
---

<a href={URL}>
  <svg></svg>
</a>
```

```astro
---
// post.astro
import { RedditShareButton } from "./reddit.astro";
---

<RedditShareButton title={title} />
```

Next up was figuring out how to allow people to only use the single share component while also giving them the flexibility around which share buttons to include and the order of those buttons. At first, I thought about using [Astro's integration framework](https://docs.astro.build/en/guides/integrations-guide/) and storing the configuration there. My main concern with this was around usability, the settings would live in a different file than the component and I worried that it'd be confusing to figure out.

After thinking about it for a while I settled on a different approach, creating an optional array of components that could be passed in. This would allow the user to define the order and show buttons alongside the actual component.

```astro
---
// SocialShare.astro

import HackerNewsShareButton from "./HackerNews.astro";
import LinkedInShareButton from "./LinkedIn.astro";
import RedditShareButton from "./Reddit.astro";
import TwitterShareButton from "./Twitter.astro";

const DEFAULT_COMPONENTS = [
  TwitterShareButton,
  HackerNewsShareButton,
  LinkedInShareButton,
  RedditShareButton,
];

const {
  buttons = DEFAULT_COMPONENTS,
  url = Astro.request.url,
  title,
  description,
  via,
} = Astro.props;
---

<div>
  {
    buttons.map(Button => (
      <Button url={url} description={description} via={via} title={title} />
    ))
  }
</div>
```

```astro
---
// post.astro
import {
  LinkedInShareButton,
  TwitterShareButton,
  SocialShare,
} from "./SocialShare.astro";

// Optional
const BUTTONS = [TwitterShareButton, LinkedInShareButton];
---

<SocialShare
  buttons={BUTTONS}
  description="Description of the page/post"
  via="YourTwitterAccount"
  title="Page Title"
/>
```

This final solution felt simple enough to explain and with that, I moved on to turning it into its own package.

## Creating an NPM package

With everything ready to go, I now needed to learn how to turn this into an NPM package that people could install and use. The first step is to create a new directory and initialize both git and NPM.

```shell

mkdir astro-social-share && cd $_
git init
npm init

```

Running `npm init` will walk you through a few basic questions to help you create your new package. There are also a few optional fields you can include to help others find your new package or help them know where to go for bug reports.

```shell
package name: (astro-social-share) <enter>
version: (1.0.0) <enter>
description: Social media share buttons for your Astro site <enter>
entry point: (index.js) <enter>
test command: <enter>
git repository: https://github.com/silent1mezzo/astro-social-share
keywords: <enter>
author: Adam McKerlie
license: (ISC) <I chose MIT, up to you.>

```

If you're wanting to test out your package locally you can do so through `npm link` which allows you to install a local version of your package and use it in another project. To do this you first call `npm link` in your package's directory. Then you run `npm link <package name>` in your other projects directory to install it. Now any changes to your package will be reflected without having to publish a new version first. This is really helpful while building out new features.

## Publishing

The last step to all of this was actually publishing this to NPM. The first thing I needed to do was login to npm via the command line `npm login`. This opens up a browser window to authenticate with npm. After that, I ran `npm publish --dry-run` to see if everything was working before publishing the package. Once I was ready, I removed the `--dry-run` flag and published the package directly to npm. With the package published, I installed the package like you would any other and updated this website to pull from the package vs the local copy.

```shell
npm install astro-social-share # put in the package name you created
```

```astro
---
// post.astro
import { SocialShare } from "astro-social-share";
---

<SocialShare
  description="Description of the page/post"
  via="YourTwitterAccount"
  title="Page Title"
/>
```

Finally, I added a `postpublish` script to my package.json file to also tag a GitHub release

```js
// package.json
...
  "scripts": {
    "postpublish" : "PACKAGE_VERSION=$(cat package.json | grep \\\"version\\\" | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]') && git tag v$PACKAGE_VERSION && git push --tags"
  },
...

```

## The first feature request

It took approximately one week for the [first feature request](https://github.com/silent1mezzo/astro-social-share/issues/7) to come in. While a fairly simple request, just asking for `rel="noopener noreferrer"` to be added, it was a great milestone for me. It's the first time someone cared enough about something I built to ask for something.

Overall, it's been a fun project to get to know Astro better. It solved a need I had, helped me better understand how Astro works and seems useful for the community. There isn't a lot more I need to do it, other than add more providers and allow users to use their own logos, it's feature complete. If there's something you'd like to see feel free to [add a feature request](https://github.com/silent1mezzo/astro-social-share/issues)!

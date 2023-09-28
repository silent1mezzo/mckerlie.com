import type { CollectionEntry } from "astro:content";

const getSortedPosts = (posts: CollectionEntry<"posts">[]) =>
  posts
    .filter(({ data }) => !data.draft)
    .sort(
      (a, b) =>
        Math.floor(new Date(b.data.date).getTime() / 1000) -
        Math.floor(new Date(a.data.date).getTime() / 1000)
    );

export default getSortedPosts;

// https://www.joshfinnie.com/blog/creating-a-similar-posts-component-in-astrojs/
import type { CollectionEntry } from "astro:content";

export function getRelatedPosts(
  posts: CollectionEntry<"posts">[],
  slug: string,
  tags: string[]
) {
  const relatedPosts = posts
    .filter(
      post =>
        post.slug != slug &&
        post.data.tags?.filter(tag => tags.includes(tag)).length > 0
    )
    .map(post => ({
      ...post,
      sameTagCount: post.data.tags.filter(tag => tags.includes(tag)).length,
    }))
    .sort((a, b) => {
      if (a.sameTagCount > b.sameTagCount) return -1;
      if (b.sameTagCount > a.sameTagCount) return 1;

      if (a.data.date > b.data.date) return -1;
      if (a.data.date < b.data.date) return 1;

      return 0;
    })
    .slice(0, 5);

  return relatedPosts.slice(0, 4);
}

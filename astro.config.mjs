import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { autolinkConfig } from './plugins/rehype-autolink-config';
import sitemap from "@astrojs/sitemap";
import mdx from '@astrojs/mdx';
import sentry from "@sentry/astro";


// https://astro.build/config
export default defineConfig({
  site: "https://mckerlie.com",
  // replace this with your deployed domain
  integrations: [tailwind({
      applyBaseStyles: false
    }),
    react(),
    sitemap(),
    mdx(),
    sentry({
      dsn: "https://3ec5190943c3445d314ff2144751d8c1@o436943.ingest.sentry.io/4505986690973696",
      replaysSessionSampleRate: 1.0,
      environment: process.env.SENTRY_ENVIRONMENT,
      clientInitPath: "sentry.client.config.js",
      sourceMapsUploadOptions: {
        project: "mckerliecom",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      }
    })
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, {
      test: "Table of contents"
    }]],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, autolinkConfig]],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true
    },
    extendDefaultPlugins: true
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    }
  },
  scopedStyleStrategy: "where",
  trailingSlash: "never"
});
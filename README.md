# brandonscott.me

Personal site built with Astro, Markdown, and optional React components.

## Run it

```sh
nvm use
npm ci
npm run dev
```

Open the Local URL printed by Astro (normally http://localhost:4321).

```sh
npm run check
npm run build
npm run preview
```

`build` produces ordinary static files in `dist/`. No server adapter, React server, CMS, or hosting integration is required. Use the Node version in `.nvmrc` (24.17.0); CI reads the same file.

## Where to work

| Task | File or directory |
| --- | --- |
| Write an article | `src/content/posts/*.md` |
| Write a standalone page | `src/pages/*.md` |
| Embed an interactive component in content | `src/pages/playground.mdx` |
| Write ordinary React | `src/components/ReadingTime.tsx` |
| Change the document shell | `src/layouts/BaseLayout.astro` |
| Change navigation | `src/components/Header.astro` |
| Change the article template | `src/pages/posts/[id].astro` |
| Define post metadata | `src/content.config.ts` |
| Customize styling | `src/styles/` |
| Add static images or downloads | `public/` |

## Add a post

Create `src/content/posts/my-new-post.md`:

```md
---
title: My new post
description: A short description for the home page.
date: 2026-11-14
---

Write normal Markdown here.

![An image](/media/example.png)
```

Astro validates the metadata, adds the post to the home page, and generates `/posts/my-new-post/`. There is no per-post layout configuration. Dates are displayed in UTC so date-only frontmatter does not shift to the previous day in another time zone.

For a standalone page, put a `.md` file in `src/pages/` with `title` and `layout: ../layouts/MarkdownLayout.astro` in its frontmatter. Its filename becomes its route.

## Add interactivity

Use `.mdx` instead of `.md` only when content needs a component. Both formats are accepted in the posts collection. For an article in `src/content/posts/`:

```mdx
import ReadingTime from '../../components/ReadingTime';

Some ordinary Markdown.

<ReadingTime client:load />
```

Keep the same title, description, and date frontmatter as a normal post. The playground page shows this working with React state, events, and accessible form labels.

- `.astro` components handle static layouts, props, imports, and `<slot />` composition.
- `.tsx` components use real React, including hooks and event handlers.
- `client:load` makes a React component interactive on page load. `client:visible` defers that work until it enters the viewport.
- A React component without a client directive renders static HTML without loading React in the browser.
- Separate interactive islands do not automatically share a React context tree. Keep related interactive UI inside one React component when it needs shared state.

The ordinary pages do not hydrate React. The playground renders its calculator's initial state into the HTML and hydrates only that island.

## Configuration and maintenance

`astro.config.mjs` contains the site URL and two official integrations: `@astrojs/mdx` and `@astrojs/react`. Markdown, routing, content loading, frontmatter validation, CSS bundling, and static generation use Astro's supported APIs. There are no custom Markdown plugins or JSX runtimes.

The npm lockfile records the dependency tree. After dependency updates, run `npm run check` and `npm run build`. Major framework upgrades can still require changes; a minimal configuration reduces the amount of integration code to maintain.

## Content conventions

- Existing post URLs and `/media/` image paths are preserved.
- Eleventy's layout/data files are replaced by explicit Astro layouts and one posts collection.
- `{.external}` annotations were replaced with standard Markdown; CSS marks HTTPS links in prose.
- Custom `gist:owner/id` shorthand was converted to standard HTML script embeds in Markdown. These still depend on GitHub's external script; code fences would remove that dependency.
- Shared styles live in `src/styles/`; component-specific styles live alongside their components.
- The resume remains Markdown with its own static layout and stylesheet.
- The React demo lives at `/playground/` and is intentionally omitted from the header navigation.

## Deployment

GitHub Actions runs type checking and a static build for pull requests. Pushes to `main` also publish `dist/` to GitHub Pages. The existing live site changes only after a merge or a manual deployment workflow run.

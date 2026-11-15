# Developing brandonscott.me

## Setup

```sh
nvm use
npm ci
npm run dev
```

Open the URL printed by Astro, normally http://localhost:4321. The Node version is pinned in `.nvmrc`.

- `npm run check` checks Astro and TypeScript.
- `npm run build` generates the static site in `dist/`.
- `npm run preview` serves that build locally.

## Repository structure

| Location | Purpose |
| --- | --- |
| `src/pages/` | File-based routes: `.astro`, Markdown, or MDX |
| `src/content/posts/` | Articles, loaded through the posts collection |
| `src/content.config.ts` | Collection loader and frontmatter schema |
| `src/layouts/` | Shared document shells and Markdown layouts |
| `src/components/` | Astro and React components |
| `src/styles/` | Shared styles; component styles can also live beside components |
| `public/` | Files served as-is: `public/media/example.png` becomes `/media/example.png` |
| `astro.config.mjs` | Site configuration and the React/MDX integrations |

The résumé uses its own layout and stylesheet. `/components/` is a development-only component sheet; its route and link are excluded from production builds using `import.meta.env.DEV`.

## Content and routing

Add an article at `src/content/posts/my-post.md`:

```md
---
title: My post
description: A short description for the home page.
date: 2026-11-14
---

Write Markdown here.
```

The collection validates the frontmatter and includes the article on the home page. `src/pages/posts/[id].astro` uses `getStaticPaths()` to generate an article page for each entry. Dates display in UTC to preserve date-only values.

Standalone pages go in `src/pages/`. For Markdown pages, include `title` and `layout: ../layouts/MarkdownLayout.astro` in the frontmatter. A file such as `src/pages/about.md` becomes `/about/`.

## Astro and React components

- An `.astro` file's `---` section runs during the build. Its template renders HTML, and `<slot />` inserts child content.
- Astro components can include a `<script>` for browser behavior without loading React. CSS inside `<style>` is scoped to that component by default.
- React components use `.tsx`. Without a `client:*` directive, Astro renders their HTML but does not activate their event handlers in the browser.
- Add `client:load` to hydrate React on page load, or `client:visible` to hydrate when the component enters the viewport. Separate islands do not automatically share React context.
- Use `.mdx` when Markdown needs embedded components. Ordinary articles can stay `.md`.

For example, an MDX article in `src/content/posts/` can include:

```mdx
import ReadingTime from '../../components/ReadingTime';

<ReadingTime client:load />
```

`src/pages/playground.mdx` provides a working React example. Theme selection uses an Astro component with a browser script; its saved preference is also applied in the document head before rendering.

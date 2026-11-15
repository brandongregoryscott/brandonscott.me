# Maintaining brandonscott.me

## Local development

Run these commands from the repository root:

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

`build` produces ordinary static files in `dist/`. No server adapter, React server, CMS, or hosting integration is required. Use the Node version in `.nvmrc`; CI reads the same file.

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

- Images in `public/media/` are served at `/media/`.
- Servers lives at `/resources/servers/`, with Resources highlighted in the header and a link back to its parent page.
- Use standard Markdown links. Prose links have no added arrows; external header links and Resume retain an icon and open in new tabs.
- Existing gist embeds use HTML script tags in Markdown and depend on GitHub's external scripts. Use code fences for self-contained code examples.
- Shared styles live in `src/styles/`; component-specific styles live alongside their components.
- The resume remains Markdown with its own static layout and stylesheet.
- The React demo lives at `/playground/` and is intentionally omitted from the header navigation.

## Design and components

The default site uses a purple and charcoal palette, monospace body text,
the original condensed heading font stack, and a CSS background grid.
`src/styles/index.css` defines the palette, shared 1080px content container,
reading styles, and responsive layout. The header and article previews keep
their component styles alongside their markup. The résumé retains its own
layout and stylesheet.

Light is the base theme. System mode follows the OS preference, including
without JavaScript. The footer theme selector can override that preference;
its selection persists under the `site-theme` local storage key and is applied
before rendering to avoid a flash of the wrong theme.

Run `npm run dev` and visit `/components/` for the component sheet. A footer
link appears only in development. The route uses `import.meta.env.DEV` in
`getStaticPaths`, so production builds omit the page and its link entirely.
The component examples live in `src/components/ComponentExamples.astro` and
`src/styles/components.css`. Previous design-lab routes and iterations have
been removed.

## Deployment

GitHub Actions runs type checking and a static build for pull requests. Pushes to `main` also publish `dist/` to GitHub Pages. To deploy, merge into `main` or run the deployment workflow manually.

Edit `.github/workflows/deploy.mts` to change CI/CD. Workflows use TypeScript and `gagen`, following the same build and deploy jobs described above. After editing, run `npm run ci:generate` and commit both the source and `.github/workflows/deploy.generated.yml`. The YAML is generated and should not be edited manually.

Run `npm run ci:check` to type-check the workflow source and verify the generated YAML is current; CI runs this check too. Action references are pinned to commit hashes in the generated YAML. To refresh those pins, run `npm run ci:generate -- --update-pins`.

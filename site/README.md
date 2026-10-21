# Sakhā UI — docs & marketing site

The public site for **`@sakhalabs/ui`**, the Sakhā Labs React component library.

Built with **Astro + Starlight** and consumed as a self-contained project. It renders the docs in
[`../docs/`](../docs) alongside **live React demos of the real package** (imported via
`file:../packages/ui`), a theme/accent playground, full-text search, sidebar navigation and dark
mode. Output is static HTML, so it can be hosted anywhere.

## Commands

```bash
npm install            # first time (self-contained; installs Astro + Starlight)
npm run dev            # dev server → http://localhost:4321
npm run build          # static build → dist/
npm run preview        # preview the built site
```

From the repo root you can use `npm.cmd run dev:site` / `npm.cmd run build:site`.

> The library must be built first if `../packages/ui/dist/` is missing — run
> `npm.cmd run build:ui` from the repo root.

## Where things are

| Path | What's inside |
|---|---|
| `astro.config.mjs` | Starlight config — title, sidebar, social links, custom CSS, `site:` URL |
| `src/content/docs/` | Every page (landing splash, getting-started, theming, tailwind, components, `catalog/*`, publishing, changelog) |
| `src/components/demos.tsx` | The live React demos (`ComponentStrip`, `ThemePlayground`) |
| `src/styles/custom.css` | Imports `@sakhalabs/ui/styles.css` and frames the demos |

## Before going live

- Set the real URL in `astro.config.mjs` → `site:` (canonical links + sitemap).
- The GitHub links already point at `github.com/sakhalabs/ui` (`astro.config.mjs` and
  `src/content/docs/catalog/index.md`); update them if the repo moves.

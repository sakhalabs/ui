# UIUXSakha — UI/UX Template Catalog + Component Library for Sakhā Labs

[![npm version](https://img.shields.io/npm/v/@sakhalabs/ui.svg?label=%40sakhalabs%2Fui)](https://www.npmjs.com/package/@sakhalabs/ui)
[![npm downloads](https://img.shields.io/npm/dm/@sakhalabs/ui.svg)](https://www.npmjs.com/package/@sakhalabs/ui)
[![license](https://img.shields.io/npm/l/@sakhalabs/ui.svg)](LICENSE)
[![GitHub](https://img.shields.io/github/stars/sakhalabs/ui?style=flat&label=github)](https://github.com/sakhalabs/ui)

A catalog of named UI/UX styles ("templates") for every kind of software Sakhā Labs builds,
plus **Sakha UI** — a live React component library showcase built on those templates.
Each template has a **stable ID**, a **description**, **design rules**, and a **ready-to-paste AI prompt**.
Later, when generating UI with AI tools, you paste the template prompt + the product context block below.

> 📖 **Using the component library in another project?** See **[docs/](docs/README.md)** —
> [getting-started](docs/getting-started.md) (install & first component),
> [tailwind](docs/tailwind.md) (Tailwind CSS v4 setup),
> [theming](docs/theming.md) (themes, accents, dark mode),
> [components](docs/components.md) (full props reference),
> [publishing](docs/publishing.md) (release runbook),
> [changelog](CHANGELOG.md) (release history & versioning).

> 🌐 **Prefer a proper site?** The same docs are published with Astro Starlight in **`site/`** —
> live React demos, full-text search, sidebar nav and dark mode. See
> [Documentation site](#documentation-site-site) below.

## @sakhalabs/ui — the reusable component library

The library lives in **`packages/ui/`** as a standalone npm workspace package —
**`@sakhalabs/ui` v1.1.0**, [published on npm](https://www.npmjs.com/package/@sakhalabs/ui).
Install it in any of your projects for consistent design.
The showcase app at the repo root is just one of its consumers.

```bash
npm i @sakhalabs/ui       # use the published package in any project
```

Working on this repo itself:

```bash
npm.cmd install                          # workspace install
npm.cmd run dev                          # showcase: http://localhost:5181
npm.cmd run build                        # typecheck + build showcase
npm.cmd run build:ui                     # build library → packages/ui/dist/
```

### Documentation site (`site/`)

**Live: <https://ui.sakhalabs.com>**

The docs in `docs/` are also published as a real site using **Astro + Starlight**: a splash
landing page, live React demos of the real components, a theme/accent playground, full-text
search, sidebar navigation and dark mode (NE/EN language switching is on the Starlight roadmap).
It is a self-contained project with its own dependencies and builds to **static HTML**, so it can
be hosted anywhere (Netlify, Cloudflare Pages, GitHub Pages, S3, or a plain web server).

```bash
npm.cmd run dev:site      # docs dev server → http://localhost:4321
npm.cmd run build:site    # static build → site/dist/
```

> The site consumes the library through `file:../packages/ui`, so `packages/ui/dist/` must exist.
> `npm.cmd run build:site` builds the library first automatically (`prebuild:site`); for the dev
> server, run `npm.cmd run build:ui` once beforehand. The canonical URL (`site:` in
> `site/astro.config.mjs`) is set to `https://ui.sakhalabs.com` — it feeds the canonical tags and
> the sitemap; update it if the host ever changes.

**Deploying** — every push to `main` that touches `site/` or `packages/ui/` is built and published
to **GitHub Pages** by [`.github/workflows/deploy-site.yml`](.github/workflows/deploy-site.yml)
(→ <https://ui.sakhalabs.com>). One-time setup in the repo: **Settings → Pages → Source =
"GitHub Actions"**, set the custom domain to `ui.sakhalabs.com`, and point a `CNAME` DNS record for
`ui` at `sakhalabs.github.io`. The custom domain is also declared in `site/public/CNAME`.

> The site installs with `npm install` in CI (not `npm ci`) because its lockfile is generated on
> Windows and `npm ci` cannot satisfy the Linux-only optional dependencies (e.g. `@emnapi/*`) that
> the runner resolves. The library workspace still uses `npm ci`.

**Using it in your other projects** (PasalSakhā, SakhaLabs site, …) — full guide with all
install options and troubleshooting: **[docs/getting-started.md](docs/getting-started.md)**

```bash
npm i @sakhalabs/ui
```

**Local development** (working on the library itself) — point the other project at this workspace
instead of the registry:

```bash
# 1. build the library once (from this repo)
npm.cmd run build:ui

# 2. in the other project, add a file: dependency
npm.cmd i "@sakhalabs/ui@file:C:/Users/NAN/Desktop/OpenCode/UIUXSakha/packages/ui"
# …or pack a versioned tarball you can commit/archive:
npm.cmd pack --workspace @sakhalabs/ui     # → sakhalabs-ui-1.1.0.tgz
```

```tsx
// then in the consuming app:
import { Button, NumberInput, Modal, Tabs, ToastProvider, useToast, applyTheme } from '@sakhalabs/ui'
import '@sakhalabs/ui/styles.css'   // one CSS file with all component styles

applyTheme('clean', '#4F46E5')      // theme id + accent → sets CSS vars on <html>
```

**What's in the library** — every component is themed purely via CSS variables
(`--border`, `--radius`, `--accent`, …), so `applyTheme()` restyles everything:

- **Actions:** Button, ButtonGroup
- **Inputs:** Input, Field, InputGroup (use `pre` prop for prefixes), SearchInput, PasswordInput, Textarea, NumberInput (increment/decrement stepper), Select, FileDrop
- **Selection:** Checkbox, Radio, RadioGroup, Switch, Slider
- **Feedback:** Badge, Alert, Spinner, EmptyState, ToastProvider + `useToast()`
- **Data:** Card, Pagination
- **Navigation/overlays:** Tabs + TabPanel, Modal (Escape/backdrop close, scroll lock)
- **Theming:** `THEMES` (5), `ACCENTS` (8), `applyTheme()`, `getTheme()`, `getAccent()`

Zero runtime dependencies beyond React ≥18. Ships ESM + full TypeScript declarations + one CSS file (`dist/index.js`, `dist/index.d.ts`, `dist/ui.css`).

```bash
npm.cmd run dev     # showcase at http://localhost:5181
```

- **5 visual themes** mapped to the catalog: Clean SaaS · Corporate · Playful · Brutalist · Dark
- **8 accent colors** from the Sakhā skins (Everest Indigo, Rhododendron, …)
- Every example has a **Copy code** button and an expandable code block + props table

| File | What's inside |
|---|---|
| `marketing-websites.md` | Landing pages, product sites, company sites (6 templates) |
| `dashboards-pos.md` | Admin panels, POS, billing, reports, analytics (5 templates) |
| `mobile-apps.md` | Phone-first apps — lists, tabs, onboarding, wallet (4 templates) |
| `ai-chat-interfaces.md` | AI/chat products, workbenches, settings (3 templates) |
| `templates.json` | All 18 templates as structured data — attach to any AI tool as context |
| `packages/ui/src/` | Library source: all components above, `index.ts` (barrel), `tokens.ts` (themes/accents/applyTheme), `styles.css` |
| `packages/ui/dist/` | Built package: `index.js`, `index.d.ts`, `ui.css` |
| `src/sections/` | Showcase sections: Buttons, Text inputs, Selection, Feedback, Overlays, Data display |
| `src/doc/` | Showcase-only `Example` doc block (preview + copy code + props table) |

## Template IDs

**Marketing:** `clean-saas` · `bold-gradient` · `corporate-trust` · `editorial-story` · `playful-bright` · `neo-brutalist`
**Dashboards/POS:** `dense-admin` · `card-dashboard` · `pos-terminal` · `invoice-document` · `analytics-dark`
**Mobile:** `list-app` · `bottom-tab` · `onboarding-flow` · `wallet-pay`
**AI/Tools:** `ai-chat` · `prompt-workbench` · `settings-control`

## How to use with AI tools

1. **Pick a template** that matches the product type (see "When to use" in each doc).
2. **Copy the template's prompt block** from the Markdown file or `templates.json` → `prompt`.
3. **Append the Product Context block** (below) filled in for your product.
4. **Append the Global Rules block** (below) — these apply to every Sakhā Labs product.
5. Generate. If the result drifts, re-state the template's "Do not" list explicitly.

### Product Context block (fill per product)

```
PRODUCT CONTEXT
Product name:        <e.g. PasalSakhā Store>
Type:                <POS / dashboard / landing page / mobile app / chat tool>
Users:              <e.g. Nepali kirana shop owners, low digital literacy>
Main jobs:          <e.g. create bill, check stock, see daily profit>
Language:           bilingual — Nepali (Devanagari) + English, user-toggleable
Devices:            <Android phones first / desktop / both>
Must work on:       slow networks, low-end Android, light + dark theme
Brand color:        <from Sakhā skins, e.g. #4F46E5 Everest Indigo>
```

### Global Rules block (paste with every prompt)

```
GLOBAL RULES (Sakhā Labs)
- Nepali text is often 30–40% longer than English — never truncate or assume fixed widths.
- Use "Noto Sans Devanagari" (or system UI font that renders Devanagari) for body text.
- Mobile-first: 44px minimum touch targets; works on 360px-wide screens.
- Light + dark theme from day one; respect prefers-color-scheme.
- Low-bandwidth: no large images, no video backgrounds, CSS-only decoration.
- Numbers (currency NPR ₹/रु, dates BS/AD) must be tabular-nums and never wrap.
- Copy tone: plain, respectful, no jargon. Nepali uses honorific forms (तपाईं).
- Every screen must work one-handed on a phone.
```

## Adding a new template

1. Add a section to the right Markdown file using the same structure (ID, description, when to use, look & feel, components, UX rules, do-nots, prompt).
2. Add a matching entry to `templates.json` with the same `id` and `prompt`.
3. IDs are stable — never rename an existing one, only deprecate.

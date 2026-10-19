# UIUXSakha — UI/UX Template Catalog + Component Library for Sakhā Labs

A catalog of named UI/UX styles ("templates") for every kind of software Sakhā Labs builds,
plus **Sakha UI** — a live React component library showcase built on those templates.
Each template has a **stable ID**, a **description**, **design rules**, and a **ready-to-paste AI prompt**.
Later, when generating UI with AI tools, you paste the template prompt + the product context block below.

> 📖 **Using the component library in another project?** See **[docs/](docs/README.md)** —
> [getting-started](docs/getting-started.md) (install & first component),
> [tailwind](docs/tailwind.md) (Tailwind CSS v4 setup),
> [theming](docs/theming.md) (themes, accents, dark mode),
> [components](docs/components.md) (full props reference),
> [changelog](CHANGELOG.md) (release history & versioning).

## @sakhaui/ui — the reusable component library

The library lives in **`packages/ui/`** as a standalone npm workspace package
(`@sakhaui/ui` v1.0.0) — install it in any of your projects for consistent design.
The showcase app at the repo root is just one of its consumers.

```bash
npm.cmd install                          # workspace install
npm.cmd run dev                          # showcase: http://localhost:5181
npm.cmd run build                        # typecheck + build showcase
npm.cmd run build:ui                     # build library → packages/ui/dist/
```

**Using it in your other projects** (PasalSakhā, SakhaLabs site, …) — full guide with all
install options and troubleshooting: **[docs/getting-started.md](docs/getting-started.md)**

```bash
# 1. build the library once (from this repo)
npm.cmd run build:ui

# 2. in the other project, add a file: dependency (any of these forms)
npm.cmd i "@sakhaui/ui@file:C:/Users/NAN/Desktop/OpenCode/UIUXSakha/packages/ui"
# …or pack a versioned tarball you can commit/archive:
npm.cmd pack --workspace @sakhaui/ui     # → sakhaui-ui-1.0.0.tgz
```

```tsx
// then in the consuming app:
import { Button, NumberInput, Modal, Tabs, ToastProvider, useToast, applyTheme } from '@sakhaui/ui'
import '@sakhaui/ui/styles.css'   // one CSS file with all component styles

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

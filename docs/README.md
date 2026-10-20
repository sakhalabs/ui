# Sakha UI — Documentation

**`@sakhalabs/ui`** is the reusable React component library of Sakhā Labs. One install gives every
product (PasalSakhā, dashboards, sites, tools) the same components, the same themes and the same
Nepali/bilingual UX rules — so designs stay consistent and you stop re-building buttons.

| Doc | Read it when |
|---|---|
| [getting-started.md](./getting-started.md) | You want to install the library into one of your other projects and render your first component |
| [tailwind.md](./tailwind.md) | Your project uses **Tailwind CSS v4** — import order, layer model, `@theme inline` token bridge, `dark:` variant |
| [theming.md](./theming.md) | You want to switch themes/accents, add a dark mode, or understand the CSS variables |
| [components.md](./components.md) | You need the full list of components with props and copy-paste examples |
| [publishing.md](./publishing.md) | You're cutting a release — npm setup, versioning and the publish runbook |
| [chats/](./chats/README.md) | You want the records of past chats — decisions and the reasoning behind them |

> These Markdown docs are also published as a site — **<https://ui.sakhalabs.com>** — with live
> demos, search and dark mode. To run it locally: `npm.cmd run dev:site` from the repo root, then
> open <http://localhost:4321>.
>
> The React component showcase (the other runnable app) lives in **`showcase/`** and runs on
> port 5181 via `npm.cmd run dev`.

## 30-second preview

```bash
npm install @sakhalabs/ui
```

```tsx
import { ToastProvider, Button, NumberInput, Modal, applyTheme } from '@sakhalabs/ui'
import '@sakhalabs/ui/styles.css'
import { useState } from 'react'

applyTheme('clean', '#4F46E5') // theme + brand accent → all components restyle

export function App() {
  const [qty, setQty] = useState(3)
  const [open, setOpen] = useState(false)

  return (
    <ToastProvider>
      <NumberInput value={qty} onChange={setQty} />
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Details">…</Modal>
    </ToastProvider>
  )
}
```

## Where things live

```
UIUXSakha/
├── packages/ui/            ← the library (@sakhalabs/ui)
│   ├── src/                ← component source (TSX) + styles.css + tokens.ts
│   ├── dist/               ← built output: index.js, index.d.ts, ui.css
│   └── package.json        ← exports map, scripts
├── src/                    ← showcase app (a consumer of the library)
├── site/                   ← docs & marketing site (Astro Starlight; self-contained)
├── docs/                   ← these docs
├── templates.json          ← 18 AI-ready UI template prompts (separate deliverable)
└── README.md               ← catalog + project overview
```

## Commands (from the repo root)

```bash
npm.cmd install        # workspace install
npm.cmd run dev        # showcase at http://localhost:5181
npm.cmd run build:ui   # build the library → packages/ui/dist/
npm.cmd run build      # typecheck + build the showcase
npm.cmd run dev:site   # docs site at http://localhost:4321
npm.cmd run build:site # static docs site → site/dist/
```

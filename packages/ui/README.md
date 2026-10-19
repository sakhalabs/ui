# @sakhalabs/ui

**Sakhā Labs' React component library** — CSS-variable themed, bilingual (Nepali/English) ready,
mobile-first, and dependency-free beyond React.

[![npm version](https://img.shields.io/npm/v/@sakhalabs/ui.svg)](https://www.npmjs.com/package/@sakhalabs/ui)
[![license](https://img.shields.io/npm/l/@sakhalabs/ui.svg)](./LICENSE)
[![runtime deps](https://img.shields.io/badge/runtime%20deps-react%20only-blue.svg)](./package.json)
[![types](https://img.shields.io/badge/types-included-blue.svg)](./dist/index.d.ts)

- **5 themes × 8 accents** — every component is styled purely through CSS variables, so
  `applyTheme()` restyles the whole library at once.
- **Light + dark from day one** — first-class `dark` theme, plus a `prefers-color-scheme` fallback.
- **Touch-first** — `md` controls are 44 px; holds up on 360 px-wide screens.
- **WCAG AA** — paired colours are measured, not guessed (worst accent/tone pair ≥ 4.5:1).
- **Nepali-ready** — fonts include *Noto Sans Devanagari*; numerals use `tabular-nums`.
- **Zero runtime deps** — React is the only peer dependency.
- **Typed** — ships ESM JavaScript **and** full `.d.ts` declarations.
- **Tailwind CSS v4 friendly** — ships inside `@layer components`, so utilities still win.

## Install

```bash
npm install @sakhalabs/ui
```

Requires **React ≥ 18** (React 19 tested) and any modern bundler (Vite, Next.js, Astro, Remix…).

## Quick start

```tsx
import { applyTheme, Button, NumberInput, Modal } from '@sakhalabs/ui'
import '@sakhalabs/ui/styles.css'      // one stylesheet for everything

applyTheme('clean', '#4F46E5')       // theme + accent → sets CSS variables on <html>
```

```tsx
<Button variant="primary" onClick={save}>Save</Button>
<Button variant="danger" loading={deleting}>Delete shop</Button>
```

## Theming

```ts
import { applyTheme, THEMES, ACCENTS } from '@sakhalabs/ui'

applyTheme('dark', '#D97706')   // theme id + accent hex (or an accent id like 'mustang-amber')
```

**Themes:** `clean` · `corporate` · `playful` · `brutalist` · `dark`
**Accents:** Everest Indigo `#4F46E5` · Deep Ocean `#075985` · Teal Mist `#0D9488` ·
Emerald Field `#047857` · Rhododendron `#D61F4A` · Sunset Pass `#EA580C` ·
Mustang Amber `#D97706` · Violet Peak `#7C3AED`

`applyTheme()` derives `--accent-contrast` (legible ink on the accent) and `--accent-strong`
(hover) from the accent's luminance, so every accent stays readable. The same maths is exported:

```ts
import { contrastText, contrastRatio, mix, luminance } from '@sakhalabs/ui'

contrastText('#D97706')        // '#0b0f17' — ink to use on that background
contrastRatio('#D97706', '#0b0f17')  // 6.02
```

If you never call `applyTheme()` at all, the stylesheet still ships sensible fallbacks — Clean SaaS
light, dark under `prefers-color-scheme: dark` — so nothing renders unstyled.

## Components

| Area | Components |
|---|---|
| **Actions** | `Button`, `ButtonGroup` |
| **Inputs** | `Field`, `Input`, `InputGroup`, `SearchInput`, `PasswordInput`, `Textarea`, `NumberInput`, `Select`, `FileDrop` |
| **Selection** | `Checkbox`, `Radio`, `RadioGroup`, `Switch`, `Slider` |
| **Feedback** | `Badge`, `Alert`, `Spinner`, `EmptyState`, `ToastProvider` + `useToast()` |
| **Data display** | `Card`, `Pagination` |
| **Navigation & overlays** | `Tabs`, `TabPanel`, `Modal` |
| **Theming** | `applyTheme`, `getTheme`, `getAccent`, `THEMES`, `ACCENTS`, colour helpers |

Components are accessible by default: roving `tabindex` on tabs, focus trapping in modals,
`aria-busy`/`aria-invalid`, `role="alert"` errors, and 44 px hit areas on icon buttons.

## Tailwind CSS v4

Import Tailwind **first**, then the library, so utilities keep overriding component styles:

```css
@import "tailwindcss";
@import "@sakhalabs/ui/styles.css";
```

## Documentation

Full guides live in the repository's `docs/` folder:

- `docs/getting-started.md` — install and first component
- `docs/theming.md` — themes, accents and every CSS variable
- `docs/components.md` — complete props reference
- `docs/tailwind.md` — Tailwind CSS v4 setup
- `CHANGELOG.md` — release history

> Designed as an **internal design system** for Sakhā Labs products.

## License

[MIT](./LICENSE) © 2026 Sakhā Labs

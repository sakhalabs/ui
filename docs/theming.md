# Theming

Every component in `@sakhaui/ui` is styled **only with CSS variables**. No component hardcodes a
color, radius, border or font — so switching variables restyles the entire library at once.
That is what `applyTheme()` does.

---

## Themes

Five visual themes, each mapped to a template in the [UI/UX catalog](../README.md):

| id | Name | Character | Catalog template |
|---|---|---|---|
| `clean` | Clean SaaS | Light, minimal, friendly — the default product look | `clean-saas` |
| `corporate` | Corporate | Navy corporate, crisp 4px radii | `corporate-trust` |
| `playful` | Playful | Warm cream, very round, soft shadows | `playful-bright` |
| `brutalist` | Brutalist | 2px black borders, hard offset shadows, monospace | `neo-brutalist` |
| `dark` | Dark | Dark analytics-cockpit | `analytics-dark` |

## Accents

Eight brand accents from the Sakhā skins — pass by color (or id) to `applyTheme`:

| id | Name | Color |
|---|---|---|
| `everest-indigo` | Everest Indigo | `#4F46E5` (default) |
| `deep-ocean` | Deep Ocean | `#075985` |
| `teal-mist` | Teal Mist | `#0D9488` |
| `emerald-field` | Emerald Field | `#047857` |
| `rhododendron` | Rhododendron | `#D61F4A` |
| `sunset-pass` | Sunset Pass | `#EA580C` |
| `mustang-amber` | Mustang Amber | `#D97706` |
| `violet-peak` | Violet Peak | `#7C3AED` |

---

## applyTheme()

```ts
import { applyTheme, getTheme, getAccent, THEMES, ACCENTS, type Theme } from '@sakhaui/ui'

applyTheme(theme, accent?)
```

- `theme` — a theme id (`'corporate'`), or a full `Theme` object (to define your own).
- `accent` — `'#D61F4A'` or an accent id (`'rhododendron'`). Omit to keep the current accent.
- Returns the applied `Theme`. Sets `data-theme="<id>"` and the theme's CSS variables as inline
  styles on `<html>` — inline styles win over the stylesheet fallbacks.
- **SSR-safe:** no-ops when `document` is undefined (Next.js/SSR won't crash).

### Startup (simplest)

```tsx
// main.tsx / index.tsx, before render
import { applyTheme } from '@sakhaui/ui'
import '@sakhaui/ui/styles.css'

applyTheme('clean', '#4F46E5')
```

### With a switcher + persistence (like the showcase)

```tsx
const [theme, setTheme] = useState(() => localStorage.getItem('theme') ?? 'clean')
const [accent, setAccent] = useState(() => localStorage.getItem('accent') ?? '#4F46E5')

useEffect(() => {
  applyTheme(theme, accent)
  localStorage.setItem('theme', theme)
  localStorage.setItem('accent', accent)
}, [theme, accent])
```

### Auto dark mode (`prefers-color-scheme`)

```tsx
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
applyTheme(prefersDark ? 'dark' : 'clean', accent)
```

If you **never call `applyTheme` at all**, the stylesheet still ships sensible fallbacks:
Clean SaaS light by default, dark when the OS prefers dark — so nothing renders unstyled.
Calling `applyTheme` (any theme) disables those fallbacks, because your inline vars win.

---

## CSS variables reference

### Theme variables (set by `applyTheme`, or your own values)

| Variable | Used for |
|---|---|
| `--bg` | Page background |
| `--surface` | Cards, inputs, modals |
| `--surface-2` | Subtle areas: table headers, footers, code |
| `--text` | Primary text |
| `--muted` | Secondary text, placeholders |
| `--border` | All component borders |
| `--border-w` | Border width — `1px` light themes, `2px` brutalist |
| `--radius` | Small radius: buttons, inputs, badges |
| `--radius-lg` | Large radius: cards, modals |
| `--shadow` | Cards, menus, toasts |
| `--shadow-btn` | Buttons (`none` on flat themes, offset on brutalist/playful) |
| `--font` | UI font stack (brutalist switches to monospace) |

### Component variables (defined by `styles.css`, override if needed)

| Variable | Default |
|---|---|
| `--accent` | `#4f46e5` — changed by `applyTheme(…, accent)` |
| `--accent-soft` | `color-mix(accent 12%)` — hover fills, focus rings |
| `--accent-border` | `color-mix(accent 40%)` |
| `--danger` / `--danger-soft` | `#dc2626` |
| `--success` / `--success-soft` | `#059669` |
| `--warning` / `--warning-soft` | `#d97706` |

They are derived with `color-mix()` — modern browsers only (Chrome 111+, Safari 16.2+, FF 113+).

### Defining your own theme

`Theme` objects are plain data — pass one to `applyTheme` to extend or override:

```ts
import { applyTheme, getTheme, type Theme } from '@sakhaui/ui'

const myTheme: Theme = {
  ...getTheme('clean'),
  id: 'sakha-soft',                 // data-theme attribute value
  name: 'Sakha Soft',
  description: 'Custom brand theme',
  vars: {
    ...getTheme('clean').vars,
    '--radius': '6px',
    '--radius-lg': '12px',
  },
}

applyTheme(myTheme, '#075985')
```

### Styling library parts directly

Component classes are stable (`btn`, `input`, `field`, `card`, `modal`, `tabs-tab`, `toast`, …),
so you can restyle with plain CSS when a variable isn't enough:

```css
.card { border-left: 3px solid var(--accent); }
.btn--primary { text-transform: uppercase; letter-spacing: 0.03em; }
```

---

## Rules the theme system follows (Sakhā Labs global rules)

- Light **and** dark from day one — dark is a first-class theme, not an afterthought.
- Devanagari + Latin must both render — every `--font` includes *Noto Sans Devanagari*.
- Money/numbers use `font-variant-numeric: tabular-nums` (already applied on numeric inputs,
  KPI values, pagination).
- No gradients/images baked in — theming stays cheap on slow networks.
- Touch targets stay ≥ 44px on mobile at any theme — geometry never comes from the accent color.

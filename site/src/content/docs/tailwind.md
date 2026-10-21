---
title: Tailwind CSS v4
description: Use Sakhā UI alongside Tailwind CSS v4 without style conflicts.
---

All Sakhā Labs projects use **Tailwind CSS v4**. This is the complete guide for combining it
with the library: how the two CSS systems coexist, the one import-order rule that matters,
and an optional bridge that turns the library's theme tokens into Tailwind utilities.

**Division of labor:**

| Use Tailwind for… | Use the library for… |
|---|---|
| Layout & composition: `flex`, `grid-cols-3`, `gap-4`, `mt-8` | Behavior & looks: `<Button variant="danger">`, `<Modal>`, `<NumberInput>` |
| One-off, page-specific overrides | Theming: 5 themes × 8 accents via `applyTheme()` |
| Utility classes AI/devs already write fluently | Consistency across every product |

---

## 1. Import order — Tailwind FIRST (this matters)

```css
/* src/index.css */
@import "tailwindcss";                /* ← declares the layer order first */
@import "@sakhalabs/ui/styles.css";   /* ← library joins the `components` layer */
```

The entire library stylesheet ships inside **`@layer components`**. Tailwind v4 declares its
layers as `theme, base, components, utilities`, and later layers win — producing exactly the
behavior you expect:

| Winner | Effect |
|---|---|
| **utilities > components** | `<Button className="rounded-full px-6">` genuinely overrides component styles |
| **components > base** | Tailwind preflight can't strip the library's borders, backgrounds or resets |
| **theme < everything** | Tailwind theme tokens don't clobber component rules |

### Why the order matters ⚠️

CSS layer order is **locked at the first declaration** of each layer name.

- **Tailwind first** → order becomes `theme, base, components, utilities` ✅
- **Library first** → the `components` layer already exists, so the order degrades to
  `components, theme, base, utilities` — and **preflight (`base`) outranks the library**.

Symptom of the wrong order: buttons and inputs render **without borders/backgrounds**
(preflight's `button { border: 0 }` wins). Fix = flip the two import lines.

> Without Tailwind, `@layer components` behaves exactly like plain CSS — there is nothing
> extra to configure for non-Tailwind projects (the showcase app itself ships no Tailwind).

---

## 2. Optional — expose library tokens as Tailwind utilities

The library's look is driven by runtime CSS variables (`--surface`, `--text`, `--radius`, …).
Map them into Tailwind's theme with `@theme inline` and you get utilities that **follow
`applyTheme()` automatically** — switch theme/accent at runtime and every utility re-renders,
no rebuild, no class swapping:

```css
@import "tailwindcss";
@import "@sakhalabs/ui/styles.css";

@theme inline {
  --color-bg: var(--bg);                /* bg-bg is awkward — see note */
  --color-surface: var(--surface);      /* bg-surface */
  --color-surface-2: var(--surface-2);  /* bg-surface-2 */
  --color-ink: var(--text);             /* text-ink  (not `text-text`) */
  --color-muted: var(--muted);          /* text-muted */
  --color-line: var(--border);          /* border-line */
  --color-accent: var(--accent);        /* text-accent, bg-accent */
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-danger: var(--danger);
  --radius-ui: var(--radius);           /* rounded-ui */
  --font-ui: var(--font);               /* font-ui */
}
```

Now this stays on-brand in **every** theme:

```tsx
<div className="bg-surface border border-line rounded-ui p-4 text-muted">
  <span className="text-accent">रु 24,500</span>
</div>
```

`@theme inline` stores the *reference* to the variable (not its value), so the utility tracks
whatever `applyTheme()` currently sets. Page background is usually better expressed as
`style={{ background: 'var(--bg)' }}` or a plain `.page { background: var(--bg) }` rule, since
`bg-bg` reads poorly.

---

## 3. Point Tailwind's `dark:` variant at the library theme

The library switches dark mode with the `data-theme="dark"` attribute (set by `applyTheme`),
**not** the OS media query. Align Tailwind's `dark:` variant with it:

```css
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```

Now `dark:text-white` activates exactly when the library's Dark theme is active — both flip
together in one `applyTheme('dark')` call. See [Theming](/theming/) for theme switching,
persistence and `prefers-color-scheme` auto-switching.

---

## 4. Styling guidance

- **Props for looks, utilities for layout.** `<Button variant="danger" size="sm">` +
  `className="mt-4 w-full"` keeps design decisions centralized and pages consistent.
- **Every component forwards `className`**, and utilities win the cascade — simple overrides
  (`rounded-full`, `px-8`, `hidden`) just work.
- **Conditional overrides:** if you toggle mutually exclusive utility classes on the same
  element (`rounded-full` vs `rounded-lg`), add [`tailwind-merge`](https://github.com/dcastil/tailwind-merge)
  **in your app** (`twMerge('rounded-full', className)`) so stale classes drop out. The library
  itself stays dependency-free — that's your app's concern.
- **Don't restyle component internals with `!important`.** If you keep hitting a wall, the
  right fix is a CSS variable override (they always win — `applyTheme` sets them inline) or a
  small rule in your app CSS.
- **Hydration/SSR:** all of this is plain CSS — nothing client-only about it.

---

## 5. Verified behavior

The layer integration was tested against the Tailwind v4 model (simulated `theme, base,
components, utilities` layer declaration + preflight-style and utility-style rules):

- ✅ A `@layer utilities` rule overrides library component styles
  (`border-radius: 9999px` and `padding-left: 77px` beat `.btn`)
- ✅ A `@layer base` (preflight-style) `button { border: 0; border-radius: 0 }` does **not**
  affect library buttons when imports are in the documented order
- ✅ Styles restore exactly after removing the test overrides; zero console errors

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Buttons/inputs lost their borders or background in a Tailwind project | Import order — `@import "tailwindcss"` **before** `@import "@sakhalabs/ui/styles.css"`. |
| `rounded-full` / `px-8` on a component does nothing | Same import-order issue — in the correct order, utilities always beat the library's `components` layer. |
| `dark:` classes don't follow the library's Dark theme | Add the `@custom-variant dark` line from section 3. |
| `bg-surface` etc. don't exist | Add the `@theme inline` block from section 2, and make sure your CSS entry (where it lives) is the one being loaded. |
| Utilities exist but look overridden by components | Ensure both imports are in the **same CSS file**, Tailwind first; check for a second stylesheet importing the library before Tailwind. |

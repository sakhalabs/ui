# Changelog

Notable changes to **`@sakhalabs/ui`** — the Sakhā Labs component library at [`packages/ui/`](./packages/ui).

- Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
- Versioning: [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
- The version here matches `packages/ui/package.json`.

## [Unreleased]

Docs-site and packaging polish — no changes to the library or its runtime.

### Added

- **Custom 404 page** for the docs site, plus a **logo mark and favicon** (header + browser tab).
- **npm badge** and a published-package install snippet in the root `README.md` and on the docs
  landing page.
- **GitHub Pages deployment** — `.github/workflows/deploy-site.yml` builds the library and the site
  and publishes to <https://ui.sakhalabs.com> on every push to `main` that touches `site/` or
  `packages/ui/`.

### Changed

- **Component reference split into per-component pages.** The single `components.md` reference is now
  a `components/` section — one page per component (grouped under Actions, Inputs, Selection,
  Feedback, Data display, and Navigation & overlays) with an overview page that keeps the export list
  and the gotchas list.
- **`docs/publishing.md`** now documents the **staged publishing** flow (`npm stage publish` →
  `npm stage approve`) alongside a direct `npm publish`, and explains the `0.0.0-stage` placeholder
  that a brand-new package gets.
- The docs site's canonical URL is set to **`https://ui.sakhalabs.com`** (canonical tags + sitemap).
- **`packages/ui/package.json`** now points `homepage` at the docs site
  (<https://ui.sakhalabs.com>) instead of GitHub — takes effect on the next publish.
- Root npm scripts are **cross-platform** (`npm` instead of `npm.cmd`, which does not exist on
  Linux CI), and `build:site` now builds the library first through a `prebuild:site` hook.
- **Showcase moved to `showcase/`.** The React/Vite showcase (previously at the repo root) now
  lives in its own folder with its own `package.json` and lockfile, keeping it separate from the
  Astro docs site (`site/`) and the library (`packages/ui/`). Root scripts delegate via
  `--prefix showcase`, so `npm run dev` / `npm run build` / `npm run preview` still work.

## [1.1.0] — 2026-10-20

**First public npm release.** Accessibility & polish pass over the 1.0.0 components — no new
components, still zero runtime dependencies, still Tailwind-v4 friendly.

### Added

- `Select` — `error?: boolean` (red border + `aria-invalid`)
- `NumberInput` — `error?: boolean` (red border + `aria-invalid`)
- `FileDrop` — `disabled?: boolean` (blocks picking and dropping)
- `Tabs` / `TabPanel` — optional `id`; tabs get `aria-controls`, panels get `aria-labelledby`
- Exported contrast helpers: `contrastText`, `contrastRatio`, `luminance`, `mix`
- **Publish-ready packaging:** `LICENSE` (MIT) and `packages/ui/README.md` (the npm package page), plus
  the npm metadata that was missing — `license`, `author`, `keywords`, `engines`, and
  `repository` / `homepage` / `bugs` (still placeholders until the real repo URL is filled in).
- **Pre-publish guard** — `npm run preflight` (also runs automatically via `prepublishOnly`) refuses to
  publish while placeholder URLs remain, the build is missing, or `README` / `LICENSE` are absent.
- **Documentation site** — a self-contained **Astro + Starlight** project in `site/`: splash landing
  page, live React demos of the real components, a theme/accent playground, full-text search, sidebar
  navigation and dark mode. Builds to static HTML (`npm run build:site` → `site/dist/`) and consumes
  the library via `file:../packages/ui`, so it always demos the actual package.

### Changed

- **Package renamed `@sakhaui/ui` → `@sakhalabs/ui`.** The scope now names the org rather than the
  product, leaving room for `@sakhalabs/icons` / `@sakhalabs/tokens` later. Nothing had been published,
  so there is no migration; the product/marketing name "Sakha UI" is unchanged.
- **Touch targets** raised to the 44 px mobile minimum: `md` 40 → **44 px**, `sm` 32 → **36**, `lg` 48 → **52**.
  Covers buttons, inputs, selects, tabs, pagination, check/switch rows, sliders and the number stepper.
  Icon-only buttons keep a 44 px hit area via a padded `::after`.
- **Focus rings** standardised on `outline: 2px solid var(--accent); outline-offset: 2px`. Fixes buttons
  having **no** visible focus ring in the `brutalist` theme (its `box-shadow` was overriding the old ring).
- **Contrast:** `applyTheme()` now derives `--accent-contrast` (legible ink on the accent) and
  `--accent-strong` (direction-aware hover), so amber / teal / sunset accents no longer put white text on
  a ~3.2:1 background. Tone badges and alerts use new `--*-ink` (auto light/dark) and `--*-solid` shades.
  Measured worst case is now **4.83:1** (was 2.81:1).
- Dark theme sets `color-scheme: dark` and a lighter `--select-arrow`; the modal uses `100dvh` +
  `overscroll-behavior`.
- `Modal` traps focus while open, restores it on close, focuses the first control (or `[data-autofocus]`),
  and wires `aria-labelledby` via `useId`.
- `Tabs` use a **roving `tabindex`** (Arrow keys + Home/End) instead of exposing every tab to the tab order.
- `FileDrop`'s `<input type="file">` is now visually hidden (clipped) instead of `display:none`, so the
  drop zone is keyboard- and screen-reader-reachable.
- `Button` sets `aria-busy` when `loading`; `Input` / `Textarea` / `NumberInput` / `Select` set
  `aria-invalid` on error; `Field`'s error message is `role="alert"`.
- Close / icon buttons (`Alert`, `Toast`, `Modal`) and pagination buttons are explicit `type="button"`
  with `aria-label`s; `Tabs`/`TabPanel` panels are focusable.
- `prefers-reduced-motion: reduce` disables component transitions.

### Fixed

- `NumberInput` rendered 2 px short (42 px) because it inherited the input-group's border-compensated
  height while carrying no border of its own — now a true 44 / 36 / 52 px.
- Soft tone badges and tone alerts failed AA on their own tint (2.81–4.01:1); the new `--*-ink` mixes
  pass ≥ 4.5 in both light and dark.

## [1.0.0] — 2026-10-19

Initial release — the Sakhā Labs internal design system.

### Added

**Actions**
- `Button` — variants `primary | secondary | outline | ghost | danger`, sizes `sm | md | lg`, `loading`, `fullWidth`
- `ButtonGroup`

**Inputs**
- `Field` — label + hint/error wrapper (wraps its control in a `<label>`)
- `Input`, `InputGroup` (leading `pre`, `suffix`, `icon`), `SearchInput`, `PasswordInput`, `Textarea`
- `NumberInput` — controlled increment/decrement stepper with value clamping; steppers sit outside the box and only the outer corners are rounded
- `Select`, `FileDrop` — drag & drop plus click-to-pick

**Selection**
- `Checkbox`, `Radio`, `RadioGroup`, `Switch`, `Slider`

**Feedback**
- `Badge`, `Alert`, `Spinner`, `EmptyState`
- `ToastProvider` + `useToast` — tones, auto-dismiss (`duration: 0` = sticky), `status`/`alert` roles

**Data display**
- `Card`, `Pagination` — collapses to 7 buttons with ellipsis, hides itself when `pageCount <= 1`

**Overlays & navigation**
- `Modal` — Escape and backdrop close, body scroll lock/restore, `role="dialog"` + `aria-modal`
- `Tabs` + `TabPanel` — `role="tablist"`/`role="tab"`, arrow-key navigation

**Theming**
- 5 themes: `clean` (Clean SaaS), `corporate`, `playful`, `brutalist`, `dark`
- 8 accents: Everest Indigo, Deep Ocean, Teal Mist, Emerald Field, Rhododendron, Sunset Pass, Mustang Amber, Violet Peak
- `applyTheme()`, `getTheme()`, `getAccent()`, `THEMES`, `ACCENTS`
- Every component is styled only through CSS variables; Clean-SaaS fallback variables (including a `prefers-color-scheme: dark` variant) apply when `applyTheme()` has not run yet

**Packaging**
- Scoped package **`@sakhalabs/ui`**, ESM build + type declarations
- Single stylesheet at `@sakhalabs/ui/styles.css`, shipped inside `@layer components` so Tailwind v4 utilities override component styles while component styles still beat preflight
- Zero runtime dependencies beyond React (peer `react` / `react-dom` ≥ 18)
- `publishConfig.access: public`

**Docs & showcase**
- `docs/` — getting-started, Tailwind CSS v4, theming, and the component reference
- `docs/chats/` — chat/decision records
- Showcase app at the repo root (`npm run dev`, port 5181)

### Notes

- Bilingual (Nepali/English) ready, mobile-first with 44px touch targets, tuned for 360px screens and
  low-bandwidth use; NPR amounts use `tabular-nums`.

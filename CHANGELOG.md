# Changelog

Notable changes to **`@sakhaui/ui`** — the Sakhā Labs component library at [`packages/ui/`](./packages/ui).

- Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
- Versioning: [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
- The version here matches `packages/ui/package.json`.

## [Unreleased]

_Nothing yet._

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
- Scoped package **`@sakhaui/ui`**, ESM build + type declarations
- Single stylesheet at `@sakhaui/ui/styles.css`, shipped inside `@layer components` so Tailwind v4 utilities override component styles while component styles still beat preflight
- Zero runtime dependencies beyond React (peer `react` / `react-dom` ≥ 18)
- `publishConfig.access: public`

**Docs & showcase**
- `docs/` — getting-started, Tailwind CSS v4, theming, and the component reference
- `docs/chats/` — chat/decision records
- Showcase app at the repo root (`npm run dev`, port 5181)

### Notes

- Bilingual (Nepali/English) ready, mobile-first with 44px touch targets, tuned for 360px screens and
  low-bandwidth use; NPR amounts use `tabular-nums`.

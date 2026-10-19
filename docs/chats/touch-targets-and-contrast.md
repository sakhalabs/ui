# Touch targets & contrast: derive, don't guess

**Context:** two questions came up during the accessibility/polish pass (commit `e450159`):

1. `md` controls were **40px** — below the 44px mobile minimum the project rules mandate. Bump them?
2. Several colour pairs failed WCAG AA — white on the amber accent was **3.19:1**, and tone badges
   sitting on their own tint were **2.81–4.01:1**. How do we fix that without hand-picking colours
   for every theme and accent?

**Decision:**

- **Bump `md` controls to 44px** (`sm` 36, `lg` 52).
- **Derive contrast automatically** instead of hardcoding it: `applyTheme()` computes
  `--accent-contrast` from the accent's relative luminance, tone text uses `color-mix()` inks
  (`--*-ink`) that adapt to light/dark, and solid tone fills use fixed darker `--*-solid` shades.

---

## Touch targets

| Control size | Before | After |
|---|---|---|
| `sm` | 32 | **36** |
| `md` (default) | 40 | **44** |
| `lg` | 48 | **52** |
| Icon-only buttons (alert/toast/modal close) | 32 box, no hit padding | 32 box + `::after` inset → **44px hit area** |

44px is the Apple HIG minimum and matches WCAG 2.5.5 (Target Size) at AAA — and it is already a
stated project rule ("mobile-first: 44px minimum touch targets"). Having the *default* be the one
size that breaks the rule was the inconsistency.

**Trade-off:** `md` is visibly bulkier, which costs vertical density on desktop. That is why `sm`
exists — dense tables and toolbars opt into `sm`, primary actions stay `md`. We did **not** make the
target 44px *only on touch* via a media query, because pointer capability (`pointer: coarse`) and
viewport width disagree often enough (touch laptops, tablets in landscape) that following the input
characteristic is more reliable than guessing by screen size.

## Contrast

Every pair below was **measured**, not eyeballed:

| Pair | Before | After |
|---|---|---|
| White on Teal Mist accent | 3.74 ✗ | 6.02 ✓ (dark ink) |
| White on Sunset Pass accent | 3.56 ✗ | 6.02 ✓ |
| White on Mustang Amber accent | 3.19 ✗ | **6.02** ✓ |
| White on `--warning` | 3.19 ✗ | 4.83 ✓ (`--warning-solid`) |
| White on `--success` | 3.77 ✗ | 4.76 ✓ (`--success-solid`) |
| Warning badge text on its tint | 3.25 ✗ | 7.47 ✓ |
| Success badge text on its tint | 2.81 ✗ | 6.88 ✓ |
| Danger badge text on its tint | 4.01 ✗ | 5.76 ✓ |

**Why derive rather than hardcode.** There are 5 themes × 8 accents = 40 combinations, and tones
have their own light/dark variants on top. Picking a fixed "readable" colour per combination does not
scale — and it silently breaks the moment someone adds a 9th accent, which is exactly the kind of
drift the catalog rules exist to prevent. Two mechanisms do the work instead:

- `contrastText(background)` (exported) returns `#ffffff` or `#0b0f17` based on the background's
  relative luminance. `applyTheme()` uses it for `--accent-contrast`; `--accent-strong` then mixes
  *toward black* for light accents and *toward white* for dark ones, so hover keeps working.
- `color-mix(in srgb, var(--tone) 60%, var(--text))` produces the `--*-ink` text colours. Because it
  is mixed against `--text`, the ink flips automatically with the theme — no per-theme values.

The `--*-solid` shades are the one place a literal was unavoidable: white on the raw
`--warning`/`--success` tints cannot reach 4.5:1 no matter what you do downstream, so those tones
need a genuinely darker fill. They are documented as such rather than hidden.

## Verification gotchas (worth remembering)

These cost real time during the pass — they are measurement artifacts, not bugs:

1. **Frozen CSS transitions.** The showcase tab was `visibility: hidden`, so its animation timeline
   was stuck (`document.timeline.currentTime === 0`) and every transition sat at `t=0`.
   `getComputedStyle` then returns the **"from"** value — a primary button read `rgb(79,70,229)`
   (indigo) while `--accent` was correctly amber. Call `el.getAnimations().forEach(a => a.finish())`
   before measuring, or measure in a rendered tab.
2. **`color-mix()` output formats.** Chrome serialises mixed colours as `color(srgb …)` and sometimes
   `oklab(…)`, not `rgb(…)`. A naive `rgb()` parser returns `null`/`NaN`; note also that the body of
   `color(srgb …)` literally contains the token `srgb`, which parses as `NaN`.
3. **`applyTheme()` precedence.** It writes every token as an **inline style** on `:root`, so it
   beats the `[data-theme]` CSS blocks. Re-setting the `data-theme` attribute alone will *not*
   re-theme an already-applied theme — you must call `applyTheme()` again (or use the CSS-only path
   consistently).

---

*Status: implemented in `e450159` — `md` 44px, contrast derived, CHANGELOG `[Unreleased]`.*
*Recorded 2026-10-19.*

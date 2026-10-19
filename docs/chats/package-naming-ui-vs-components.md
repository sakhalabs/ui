# Package naming: `@sakhaui/ui` vs `@sakhaui/components`

**Question asked:** `sakhaui/ui` or `sakhaui/components` — which is better?

**Decision:** keep **`@sakhaui/ui`**.

---

**Keep `@sakhaui/ui`.** Here's the reasoning:

## Why `ui` wins

| Criterion | `@sakhaui/ui` | `@sakhaui/components` |
|---|---|---|
| Ecosystem convention | ✅ The standard suffix for a component/design system (`@shadcn/ui`, `@chakra-ui/react`, `@mui/material`, `@nextui-org/react`) | ⚠️ Literal, but rare as a *package* name |
| Umbrella vs. subset | ✅ "UI" is the umbrella term | ⚠️ "components" is a *subset* of UI — naming the whole thing after one part boxes you in |
| Fits your repo as-is | ✅ `packages/ui/`, `dist/ui.css`, export `./ui.css` already say "ui" | ❌ Folder and CSS name would no longer match |
| Import ergonomics | ✅ Shorter | ⚠️ Longer, more literal |
| AI/tooling familiarity | ✅ Models have seen thousands of `@*/ui` imports → correct import generated more reliably | ⚠️ Less common pattern |

## The redundancy objection

`@sakhaui/ui` reads "sakha-ui ui", which *feels* redundant — but that's completely normal: `@chakra-ui/react`, `@radix-ui/react-slot`, `@mui/material`. Nobody trips on it, and `@sakhalabs/ui` had the same shape.

## When `components` would actually be better

Only if you're planning a **package family where the foundation and the widgets split**:

```
@sakhaui/tokens      ← variables, themes
@sakhaui/ui          ← primitives / layout (Box, Stack, Text)
@sakhaui/components  ← composed widgets (Modal, DataTable, POS screens)
```

Even then, most ecosystems still use `ui` for the widget layer and `tokens`/`theme` for the foundation — so `components` is rarely the right top-level pick.

## A third option worth knowing

Since the scope already says "ui", you could go **framework-named** like Radix/Mantine/Chakra: `@sakhaui/react`. That frees both `ui` and `components` for later. But your package bundles the CSS + tokens alongside the React components, so `ui` describes it more accurately than `react`.

## Verdict

- **Now:** stay `@sakhaui/ui` — it's already renamed, built, linked, and verified; changing costs another full pass (18 files + reinstall + rebuild + re-verify) for no functional gain.
- **`@sakhaui/components`** — only if you're deliberately reserving `ui` for a future foundation package.

---

*Status: decided — package is `@sakhaui/ui` (see `packages/ui/package.json`). Recorded 2026-10-19.*

# Package naming — scope and name: `@sakhalabs/ui`

**Questions asked (in order):**

1. Scope: `@sakhaui` or `@sakhalabs`?
2. Name: `ui` or `components`?

**Decisions:**

1. Scope → **`@sakhalabs`** (changed 2026-10-19; supersedes the original `@sakhaui`).
2. Name → **`ui`** (not `components`).

Final package: **`@sakhalabs/ui`**.

---

## Scope decision — `@sakhaui` → `@sakhalabs`

The library was originally named `@sakhaui/ui`. It was renamed to `@sakhalabs/ui` **before
anything was ever published** — the first publish was already blocked on npm org creation,
so the rename cost a single mechanical pass (25 files, one workspace relink, one rebuild).

| Criterion | `@sakhaui` | `@sakhalabs` |
|---|---|---|
| Scope should be the *org*, not the *product* | ❌ Scope duplicates the product name | ✅ Scope = the company (Sakhā Labs) |
| Reads as redundant | ❌ `@sakhaui/ui` → "sakha-ui ui" | ✅ `@sakhalabs/ui` → company + purpose |
| Room for a package family | ❌ Boxes you in the moment a second package ships | ✅ `@sakhalabs/icons`, `@sakhalabs/tokens`, `@sakhalabs/templates` |
| Ecosystem convention | ⚠️ | ✅ `@radix-ui/react`, `@chakra-ui/react` are all `org/product` |

**Branding is unaffected.** The product and the marketing name stay **Sakhā UI**; only the
import string and the npm scope changed. (Compare Radix: *Radix UI* is the product,
`@radix-ui` is the scope.) Since nothing was published, consumers need no migration.

## Name decision — `ui` vs `components`

| Criterion | `@sakhalabs/ui` | `@sakhalabs/components` |
|---|---|---|
| Ecosystem convention | ✅ The standard suffix for a component/design system (`@chakra-ui/react`, `@mui/material`) | ⚠️ Literal, but rare as a package name |
| Umbrella vs. subset | ✅ "UI" is the umbrella term | ⚠️ "components" is a *subset* of UI — naming the whole thing after one part boxes you in |
| Fits the repo as-is | ✅ `packages/ui/`, `dist/ui.css`, export `./ui.css` already say "ui" | ❌ Folder and CSS name would no longer match |
| Import ergonomics | ✅ Shorter | ⚠️ Longer, more literal |
| AI/tooling familiarity | ✅ Models have seen thousands of `@*/ui` imports → the correct import is generated more reliably | ⚠️ Less common pattern |

## When `components` would actually be better

Only if you deliberately plan a family where the foundation and the widgets split:

```
@sakhalabs/tokens      ← variables, themes
@sakhalabs/ui          ← primitives / layout (Box, Stack, Text)
@sakhalabs/components  ← composed widgets (Modal, DataTable, POS screens)
```

Even then most ecosystems use `ui` for the widget layer and `tokens`/`theme` for the
foundation, so `components` is rarely the right top-level pick.

## A third option worth knowing

`@sakhalabs/react` would be framework-named (Radix/Mantine/Chakra style), freeing both `ui`
and `components` for later. But this package bundles CSS + tokens alongside the React
components, so `ui` describes it more accurately than `react`.

## Verdict

- **Package is `@sakhalabs/ui`** — see `packages/ui/package.json`.
- Reserve `components` for the case where `ui` is deliberately handed to a future
  foundation package.

---

*Status: decided — `@sakhalabs/ui` (scope `@sakhalabs`, name `ui`). The original scope
`@sakhaui` was superseded on 2026-10-19 while the package was still unpublished.*

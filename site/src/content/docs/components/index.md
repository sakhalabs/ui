---
title: Components
description: Every component in @sakhalabs/ui — props, examples and accessibility behaviour.
sidebar:
  order: 0
---
Everything is exported from the package root:

```tsx
import {
  // actions
  Button, ButtonGroup,
  // inputs
  Field, Input, InputGroup, SearchInput, PasswordInput, Textarea, NumberInput, Select, FileDrop,
  // selection
  Checkbox, Radio, RadioGroup, Switch, Slider,
  // feedback
  Badge, Alert, Spinner, EmptyState, ToastProvider, useToast,
  // data
  Card, Pagination,
  // navigation / overlays
  Tabs, TabPanel, Modal,
  // theming
  applyTheme, getTheme, getAccent, THEMES, ACCENTS,
} from '@sakhalabs/ui'

import '@sakhalabs/ui/styles.css'   // once, at your app entry
```

All native HTML attributes are forwarded (e.g. `Input` accepts `placeholder`, `name`, `autoComplete`,
`onChange`…). Props below are the **extra** ones.

## Browse the components

### Actions

- [Button](/components/actions/button/)
- [ButtonGroup](/components/actions/button-group/)

### Inputs

- [Field](/components/inputs/field/)
- [Input](/components/inputs/input/)
- [InputGroup](/components/inputs/input-group/)
- [SearchInput & PasswordInput](/components/inputs/search-and-password/)
- [Textarea](/components/inputs/textarea/)
- [NumberInput](/components/inputs/number-input/)
- [Select](/components/inputs/select/)
- [FileDrop](/components/inputs/file-drop/)

### Selection

- [Checkbox & Radio](/components/selection/checkbox-and-radio/)
- [RadioGroup](/components/selection/radio-group/)
- [Switch](/components/selection/switch/)
- [Slider](/components/selection/slider/)

### Feedback

- [Badge](/components/feedback/badge/)
- [Alert](/components/feedback/alert/)
- [Spinner](/components/feedback/spinner/)
- [EmptyState](/components/feedback/empty-state/)
- [Toasts](/components/feedback/toasts/)

### Data display

- [Card](/components/data-display/card/)
- [Pagination](/components/data-display/pagination/)

### Navigation & overlays

- [Tabs & TabPanel](/components/navigation/tabs/)
- [Modal](/components/navigation/modal/)

## Gotchas (quick list)

1. **CSS import** — `import '@sakhalabs/ui/styles.css'` once, or everything looks unstyled.
2. **`applyTheme()`** — call once at startup (safe fallbacks exist, but explicit is better).
3. **`InputGroup` uses `pre`**, not `prefix` (native HTML owns `prefix`).
4. **`Input`'s `size`** is `'sm' | 'md' | 'lg'`, not the native number.
5. **NumberInput is controlled** — always pass `value` + `onChange`.
6. **`useToast` needs `ToastProvider`** above it in the tree.
7. **Toast `duration: 0`** = sticky; default auto-dismiss is 4 s.
8. **Inputs inside `Field`** — the whole block is a `<label>`; don't nest a second label.
9. **Tailwind v4 projects** — import `tailwindcss` *before* `@sakhalabs/ui/styles.css`
   (the library ships in `@layer components` so utilities override it — see
   [Tailwind CSS v4](/tailwind/)).
10. **Touch targets** — `md` controls are 44 px tall (the mobile minimum): buttons, inputs,
    selects, tabs, pagination, check/switch rows and sliders. `sm` is 36, `lg` is 52.
    Icon-only buttons keep a 44 px hit area via a padded `::after`.
11. **`applyTheme()` writes inline styles** onto `:root`, so it wins over the CSS `[data-theme]`
    blocks. Pick one theming path — call `applyTheme()` (JS) *or* set `data-theme` yourself
    (pure CSS) — rather than mixing them.

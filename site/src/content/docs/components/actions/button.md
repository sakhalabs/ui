---
title: "Button"
description: "Usage, props and accessibility notes for Button from @sakhalabs/ui."
sidebar:
  order: 1
---
```tsx
<Button variant="primary" size="md" loading={saving} onClick={save}>Save</Button>
<Button variant="danger" fullWidth>Delete shop</Button>
```

| Prop | Type | Default |
|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `loading` | `boolean` — shows spinner, disables the button, sets `aria-busy="true"` | `false` |
| `fullWidth` | `boolean` | `false` |
| …rest | native `<button>` props | `type` defaults to `'button'` (won't accidentally submit forms) |

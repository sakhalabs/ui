---
title: "Select"
description: "Usage, props and accessibility notes for Select from @sakhalabs/ui."
sidebar:
  order: 7
---
```tsx
<Select
  options={[{ value: 'cash', label: 'Cash' }, { value: 'esewa', label: 'eSewa' }]}
  placeholder="Payment method"
  value={pay} onChange={…}
/>
```

| Prop | Type |
|---|---|
| `options` | `{ value, label }[]` (required) |
| `placeholder` | `string` — rendered as a disabled empty option |
| `error` | `boolean` — red border + `aria-invalid` |
| …rest | native `<select>` props |

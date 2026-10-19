---
title: "Field"
description: "Usage, props and accessibility notes for Field from @sakhalabs/ui."
sidebar:
  order: 1
---
```tsx
<Field label="पसलको नाम / Shop name" hint="Shown on receipts">
  <Input placeholder="e.g. Kirana Pasal" />
</Field>

<Field label="Phone" error="10 digits required">
  <Input inputMode="numeric" />
</Field>
```

| Prop | Type | Notes |
|---|---|---|
| `label` | `string` | required — clicking it focuses the control (it wraps everything in `<label>`) |
| `hint` | `string` | shown below; replaced by `error` when present |
| `error` | `string` | error message |

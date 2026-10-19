---
title: "FileDrop"
description: "Usage, props and accessibility notes for FileDrop from @sakhalabs/ui."
sidebar:
  order: 8
---
```tsx
<FileDrop accept="image/*" hint="PNG or JPG, up to 2 MB" onFile={(f) => setLogo(f)} />
```

| Prop | Type | Default |
|---|---|---|
| `onFile` | `(file: File) => void` | — |
| `accept` | `string` | — (native accept) |
| `title` | `string` | `'Choose a file or drop it here'` |
| `hint` | `string` | `'PNG or JPG, up to 2 MB'` |
| `disabled` | `boolean` — blocks picking and dropping | `false` |

Drag & drop **and** click-to-pick; shows the chosen file name. The hidden
`<input type="file">` is visually hidden rather than `display:none`, so the zone stays
reachable by keyboard and screen readers (and shows a focus ring when focused).

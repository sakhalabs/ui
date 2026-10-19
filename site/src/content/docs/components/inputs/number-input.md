---
title: "NumberInput"
description: "Usage, props and accessibility notes for NumberInput from @sakhalabs/ui."
sidebar:
  order: 6
---
```tsx
const [qty, setQty] = useState(1)
<NumberInput value={qty} onChange={setQty} min={1} max={999} step={1} />
```

| Prop | Type | Default |
|---|---|---|
| `value` / `onChange` | `number` / `(value: number) => void` | required (controlled) |
| `min` / `max` / `step` | `number` | `0` / `9999` / `1` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `disabled` | `boolean` | `false` |
| `error` | `boolean` — red border + `aria-invalid` | `false` |
| `aria-label` / `id` | `string` | recommended for a11y/labels |

- Values are always **clamped** to `[min, max]`.
- Steppers disable at the bounds; empty input resets to `min`.
- Steppers are 44 × 44 px at `md` (36 at `sm`, 52 at `lg`) — touch-safe for POS.
- Styling contract: `−` and `+` are attached **outside** the box, the input has square corners
  and only the outer corners of the stepper buttons are rounded — borders line up exactly.

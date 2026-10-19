---
title: "InputGroup"
description: "Usage, props and accessibility notes for InputGroup from @sakhalabs/ui."
sidebar:
  order: 3
---
```tsx
<InputGroup pre="रु" inputMode="decimal" placeholder="0.00" />     // NPR amount
<InputGroup suffix="km" type="number" />
```

| Prop | Type | Notes |
|---|---|---|
| `pre` | `ReactNode` | leading content — named `pre` because native HTML already owns `prefix` |
| `suffix` | `ReactNode` | trailing content |
| `icon` | `ReactNode` | rendered before the input, no border separator |

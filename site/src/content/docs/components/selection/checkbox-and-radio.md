---
title: "Checkbox & Radio"
description: "Usage, props and accessibility notes for Checkbox & Radio from @sakhalabs/ui."
sidebar:
  order: 1
---
```tsx
<Checkbox label="Print receipt" checked={print} onChange={…} />
<Radio label="eSewa" description="Instant" name="pay" value="esewa" checked={…} onChange={…} />
```

Props: `label` (required), `description?`, `name?`, `value?`, `checked?`, `disabled?`,
`onChange?: (e) => void` (native event).

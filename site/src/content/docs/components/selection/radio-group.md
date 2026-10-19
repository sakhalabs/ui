---
title: "RadioGroup"
description: "Usage, props and accessibility notes for RadioGroup from @sakhalabs/ui."
sidebar:
  order: 2
---
```tsx
<RadioGroup
  name="pay"
  value={pay} onChange={setPay}
  options={[
    { value: 'cash', label: 'Cash' },
    { value: 'credit', label: 'उधारो / Credit', description: 'Pay later' },
  ]}
  direction="row"      // default 'column'
/>
```

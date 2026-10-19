---
title: "Switch"
description: "Usage, props and accessibility notes for Switch from @sakhalabs/ui."
sidebar:
  order: 3
---
```tsx
<Switch label="Dark theme" checked={dark} onChange={setDark} />
```

`label` + `checked` + `onChange(checked: boolean)` + `disabled?`. Renders `role="switch"`.

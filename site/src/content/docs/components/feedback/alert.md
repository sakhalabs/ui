---
title: "Alert"
description: "Usage, props and accessibility notes for Alert from @sakhalabs/ui."
sidebar:
  order: 2
---
```tsx
<Alert tone="warning" title="स्टक कम / Low stock" onDismiss={() => setWarned(false)}>
  Only 3 packets of rice left.
</Alert>
```

`tone?`, `title` (required), `children?` (body), `onDismiss?` (adds close button).
`danger` alerts automatically get `role="alert"`.

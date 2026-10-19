---
title: "EmptyState"
description: "Usage, props and accessibility notes for EmptyState from @sakhalabs/ui."
sidebar:
  order: 4
---
```tsx
<EmptyState
  title="कुनै बिल छैन / No bills yet"
  description="पहिलो बिल बनाउनुहोस् — ३ सेकेन्ड लाग्छ।"
  action={<Button>+ नयाँ बिल / New bill</Button>}
/>
```

`icon?` (ReactNode), `title`, `description?`, `action?`. **Every empty list needs one** —
never show a blank screen (catalog rule).

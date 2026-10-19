---
title: "Pagination"
description: "Usage, props and accessibility notes for Pagination from @sakhalabs/ui."
sidebar:
  order: 2
---
```tsx
const [page, setPage] = useState(1)
<Pagination page={page} pageCount={12} onChange={setPage} />
```

`page` / `pageCount` / `onChange(page)`. Renders at most 7 buttons (collapses with `…`),
hides itself when `pageCount <= 1`, prev/next disable at the edges.

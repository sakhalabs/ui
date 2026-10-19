---
title: "SearchInput & PasswordInput"
description: "Usage, props and accessibility notes for SearchInput & PasswordInput from @sakhalabs/ui."
sidebar:
  order: 4
---
```tsx
<SearchInput placeholder="बिल खोज्नुहोस्…" value={q} onChange={…} />
<PasswordInput name="password" autoComplete="current-password" />
```

Convenience wrappers: `SearchInput` = InputGroup + magnifier icon (default placeholder `Search…`);
`PasswordInput` = InputGroup + show/hide toggle button.

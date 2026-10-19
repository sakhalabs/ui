---
title: "Toasts"
description: "Usage, props and accessibility notes for Toasts from @sakhalabs/ui."
sidebar:
  order: 5
---
```tsx
// once at app root:
<ToastProvider max={4}>   {/* optional max, default 4 */}
  <App />
</ToastProvider>

// anywhere inside:
const { push, dismiss } = useToast()

push({ tone: 'success', title: 'सेव भयो / Saved', body: 'Shop info updated.' })
push({ tone: 'danger', title: 'Payment failed', duration: 0 })   // 0 = sticky (no auto-close)
const id = push({ tone: 'info', title: 'Syncing' })
dismiss(id)
```

| | |
|---|---|
| `tone` | `'info' \| 'success' \| 'warning' \| 'danger'` (default `'info'`) |
| `duration` | ms before auto-dismiss, default `4000`; `0` = stays until closed |
| roles | `status` for normal toasts, `alert` for `danger` — screen readers announce correctly |
| stacking | bottom-right, newest on top; `z-index: 1100` (above modals) |

`useToast()` **throws** if used outside `ToastProvider` — that's intentional, so misplacement is
loud instead of silent.

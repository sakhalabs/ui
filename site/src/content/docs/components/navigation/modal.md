---
title: "Modal"
description: "Usage, props and accessibility notes for Modal from @sakhalabs/ui."
sidebar:
  order: 2
---
```tsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="पसल मेटाउने? / Delete shop?"
  size="md"                     // 'sm' | 'md' | 'lg'  (380 / 520 / 720px)
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="danger" onClick={confirmDelete}>Yes, delete</Button>
    </>
  }
>
  All bills, stock and ledger entries will be removed. This cannot be undone.
</Modal>
```

- **Escape** closes it, backdrop click closes it, body scroll locks (and restores) while open.
- `role="dialog"` + `aria-modal="true"`, labelled by the title via `aria-labelledby`.
- **Focus is trapped** while open (Tab / Shift+Tab cycle inside) and **restored** to the opening element on close. The first focusable control is focused automatically — mark a different one with `data-autofocus` to override.
- Controlled only — you own the `open` state (no `useDisclosure` needed):

```tsx
const [open, setOpen] = useState(false)
```

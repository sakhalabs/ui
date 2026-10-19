---
title: "Tabs & TabPanel"
description: "Usage, props and accessibility notes for Tabs & TabPanel from @sakhalabs/ui."
sidebar:
  order: 1
---
```tsx
const [tab, setTab] = useState('all')

<Tabs
  items={[
    { value: 'all', label: 'सबै / All', badge: 24 },
    { value: 'due', label: 'Due', badge: 3 },
    { value: 'paid', label: 'Paid' },
  ]}
  value={tab} onChange={setTab}
/>
<TabPanel value="all" active={tab}>{/* … */}</TabPanel>
<TabPanel value="due" active={tab}>{/* … */}</TabPanel>
```

- `items`: `{ value, label, badge? }[]` — `badge` renders as a count pill.
- `id`: optional `string` — derives stable ids so each tab gets `aria-controls` and each panel `aria-labelledby` (recommended when more than one tab set is on the page).
- Proper `role="tablist"` / `role="tab"` + `aria-selected`, with a **roving `tabindex`**: only the active tab sits in the tab order, and **arrow keys plus Home/End** move between them.
- `TabPanel` renders only when `value === active` — keep them siblings of `Tabs`. It is focusable (`tabIndex={0}`) so keyboard users can scroll the panel.

# Component reference

Everything is exported from the package root:

```tsx
import {
  // actions
  Button, ButtonGroup,
  // inputs
  Field, Input, InputGroup, SearchInput, PasswordInput, Textarea, NumberInput, Select, FileDrop,
  // selection
  Checkbox, Radio, RadioGroup, Switch, Slider,
  // feedback
  Badge, Alert, Spinner, EmptyState, ToastProvider, useToast,
  // data
  Card, Pagination,
  // navigation / overlays
  Tabs, TabPanel, Modal,
  // theming
  applyTheme, getTheme, getAccent, THEMES, ACCENTS,
} from '@sakhaui/ui'

import '@sakhaui/ui/styles.css'   // once, at your app entry
```

All native HTML attributes are forwarded (e.g. `Input` accepts `placeholder`, `name`, `autoComplete`,
`onChange`…). Props below are the **extra** ones.

---

## Actions

### Button

```tsx
<Button variant="primary" size="md" loading={saving} onClick={save}>Save</Button>
<Button variant="danger" fullWidth>Delete shop</Button>
```

| Prop | Type | Default |
|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `loading` | `boolean` — shows spinner, disables the button | `false` |
| `fullWidth` | `boolean` | `false` |
| …rest | native `<button>` props | `type` defaults to `'button'` (won't accidentally submit forms) |

### ButtonGroup

`<ButtonGroup>` = a flex row (`.row`) for placing buttons/inputs side by side.

---

## Inputs

### Field (label + hint/error wrapper)

```tsx
<Field label="पसलको नाम / Shop name" hint="Shown on receipts">
  <Input placeholder="e.g. Kirana Pasal" />
</Field>

<Field label="Phone" error="10 digits required">
  <Input inputMode="numeric" />
</Field>
```

| Prop | Type | Notes |
|---|---|---|
| `label` | `string` | required — clicking it focuses the control (it wraps everything in `<label>`) |
| `hint` | `string` | shown below; replaced by `error` when present |
| `error` | `string` | error message |

### Input

Extra props: `size?: 'sm' | 'md' | 'lg'` (default `'md'`), `error?: boolean`.
Note: `size` is **ours**, not the native numeric `size` attribute (which is `Omit`-ed).

### InputGroup — prefixes, suffixes, icons

```tsx
<InputGroup pre="रु" inputMode="decimal" placeholder="0.00" />     // NPR amount
<InputGroup suffix="km" type="number" />
```

| Prop | Type | Notes |
|---|---|---|
| `pre` | `ReactNode` | leading content — named `pre` because native HTML already owns `prefix` |
| `suffix` | `ReactNode` | trailing content |
| `icon` | `ReactNode` | rendered before the input, no border separator |

### SearchInput / PasswordInput

```tsx
<SearchInput placeholder="बिल खोज्नुहोस्…" value={q} onChange={…} />
<PasswordInput name="password" autoComplete="current-password" />
```

Convenience wrappers: `SearchInput` = InputGroup + magnifier icon (default placeholder `Search…`);
`PasswordInput` = InputGroup + show/hide toggle button.

### Textarea

Extra props: `error?: boolean`, plus native attrs (`rows` default `4`, `maxLength`, …).

### NumberInput — increment / decrement stepper (POS quantity, price, stock)

```tsx
const [qty, setQty] = useState(1)
<NumberInput value={qty} onChange={setQty} min={1} max={999} step={1} />
```

| Prop | Type | Default |
|---|---|---|
| `value` / `onChange` | `number` / `(value: number) => void` | required (controlled) |
| `min` / `max` / `step` | `number` | `0` / `9999` / `1` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `disabled` | `boolean` | `false` |
| `aria-label` / `id` | `string` | recommended for a11y/labels |

- Values are always **clamped** to `[min, max]`.
- Steppers disable at the bounds; empty input resets to `min`.
- Styling contract: `−` and `+` are attached **outside** the box, the input has square corners
  and only the outer corners of the stepper buttons are rounded — borders line up exactly.

### Select

```tsx
<Select
  options={[{ value: 'cash', label: 'Cash' }, { value: 'esewa', label: 'eSewa' }]}
  placeholder="Payment method"
  value={pay} onChange={…}
/>
```

| Prop | Type |
|---|---|
| `options` | `{ value, label }[]` (required) |
| `placeholder` | `string` — rendered as a disabled empty option |
| …rest | native `<select>` props |

### FileDrop

```tsx
<FileDrop accept="image/*" hint="PNG or JPG, up to 2 MB" onFile={(f) => setLogo(f)} />
```

| Prop | Type | Default |
|---|---|---|
| `onFile` | `(file: File) => void` | — |
| `accept` | `string` | — (native accept) |
| `title` | `string` | `'Choose a file or drop it here'` |
| `hint` | `string` | `'PNG or JPG, up to 2 MB'` |

Drag & drop **and** click-to-pick; shows the chosen file name.

---

## Selection

### Checkbox / Radio

```tsx
<Checkbox label="Print receipt" checked={print} onChange={…} />
<Radio label="eSewa" description="Instant" name="pay" value="esewa" checked={…} onChange={…} />
```

Props: `label` (required), `description?`, `name?`, `value?`, `checked?`, `disabled?`,
`onChange?: (e) => void` (native event).

### RadioGroup

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

### Switch

```tsx
<Switch label="Dark theme" checked={dark} onChange={setDark} />
```

`label` + `checked` + `onChange(checked: boolean)` + `disabled?`. Renders `role="switch"`.

### Slider

```tsx
<Slider value={discount} onChange={setDiscount} min={0} max={50} step={5} aria-label="Discount %" />
```

---

## Feedback

### Badge

```tsx
<Badge tone="success" variant="solid">Paid</Badge>
<Badge tone="warning" variant="outline">Due</Badge>
```

- `tone`: `'neutral' | 'info' | 'success' | 'warning' | 'danger'` (default `'neutral'`)
- `variant`: `'soft' | 'solid' | 'outline'` (default `'soft'`)

### Alert

```tsx
<Alert tone="warning" title="स्टक कम / Low stock" onDismiss={() => setWarned(false)}>
  Only 3 packets of rice left.
</Alert>
```

`tone?`, `title` (required), `children?` (body), `onDismiss?` (adds close button).
`danger` alerts automatically get `role="alert"`.

### Spinner

```tsx
<Spinner size="md" label="Loading bills" />
```

`size?: 'sm' | 'md' | 'lg'`, `label?` (makes it `role="status"` with sr-only text).

### EmptyState

```tsx
<EmptyState
  title="कुनै बिल छैन / No bills yet"
  description="पहिलो बिल बनाउनुहोस् — ३ सेकेन्ड लाग्छ।"
  action={<Button>+ नयाँ बिल / New bill</Button>}
/>
```

`icon?` (ReactNode), `title`, `description?`, `action?`. **Every empty list needs one** —
never show a blank screen (catalog rule).

### Toasts — ToastProvider + useToast

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

---

## Data display

### Card

```tsx
<Card title="आजको बिक्री / Today's sales" description="Midnight–now" footer={<Button>Export</Button>}>
  <strong className="kpi-value">रु 24,500</strong>
</Card>
```

`title?`, `description?`, `footer?`, `children`, `className?`.

### Pagination

```tsx
const [page, setPage] = useState(1)
<Pagination page={page} pageCount={12} onChange={setPage} />
```

`page` / `pageCount` / `onChange(page)`. Renders at most 7 buttons (collapses with `…`),
hides itself when `pageCount <= 1`, prev/next disable at the edges.

---

## Navigation & overlays

### Tabs + TabPanel

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
- Proper `role="tablist"` / `role="tab"` + `aria-selected`; **arrow keys** move between tabs.
- `TabPanel` renders only when `value === active` — keep them siblings of `Tabs`.

### Modal

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
- `role="dialog"` + `aria-modal="true"`.
- Controlled only — you own the `open` state (no `useDisclosure` needed):

```tsx
const [open, setOpen] = useState(false)
```

---

## Gotchas (quick list)

1. **CSS import** — `import '@sakhaui/ui/styles.css'` once, or everything looks unstyled.
2. **`applyTheme()`** — call once at startup (safe fallbacks exist, but explicit is better).
3. **`InputGroup` uses `pre`**, not `prefix` (native HTML owns `prefix`).
4. **`Input`'s `size`** is `'sm' | 'md' | 'lg'`, not the native number.
5. **NumberInput is controlled** — always pass `value` + `onChange`.
6. **`useToast` needs `ToastProvider`** above it in the tree.
7. **Toast `duration: 0`** = sticky; default auto-dismiss is 4 s.
8. **Inputs inside `Field`** — the whole block is a `<label>`; don't nest a second label.
9. **Tailwind v4 projects** — import `tailwindcss` *before* `@sakhaui/ui/styles.css`
   (the library ships in `@layer components` so utilities override it — see
   [tailwind.md](./tailwind.md)).

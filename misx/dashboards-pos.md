# Dashboards, Admin & POS — UI/UX Templates

For data-heavy internal tools: admin panels, billing/POS, reports, analytics.
PasalSakhā (billing, stock, khata, profit) falls here — `pos-terminal` for the billing screen, `dense-admin` or `card-dashboard` for the back office.

---

## 7. `dense-admin` — Data-Dense Admin Panel

**Description:** Classic admin: fixed left sidebar, top bar, and a big sortable table as the main content. Optimized for speed and repeated daily work, not for looks.

**When to use:** Product lists, customer/ledger lists, employee management, any screen where users scan, filter, and edit many rows daily.

**Look & feel:**
- Light gray background (`#F3F4F6`), white content cards, 1 accent color for actions
- Compact spacing: 12–14px table rows, 14px base font, minimal padding
- Sidebar 240px with grouped nav items, active item marked with accent bar

**Key components:** Sidebar (grouped nav + user block) → top bar (search, notifications, language toggle, theme toggle) → page header (title + primary action button) → filter bar (search, date range, status chips) → data table (sortable columns, sticky header, row actions, pagination) → detail drawer/modal for edits

**UX rules:** Every list screen: search + filter first, then table. Row click opens detail — never navigate away for a quick edit. Bulk actions on multi-select. Empty states must say what to do next.

**Do not:** cards around every section (waste of space), hiding filters behind "advanced" labels users never open, pagination deeper than 3 clicks from any row.

**Prompt:**
```
Create a data-dense admin panel screen (template: dense-admin).
Fixed 240px left sidebar with grouped nav, top bar with search,
notifications, language (NE/EN) and theme toggles. Main area: page
header with title + primary action, filter bar (search, date range,
status chips), then a large sortable data table with sticky header,
compact 13px rows, row action buttons, and pagination. Row click
opens a right-side edit drawer. Light gray background, white cards,
single accent [BRAND]. Empty states with clear next-step text.
Mobile: table becomes stacked cards. Light + dark theme.
```

---

## 8. `card-dashboard` — Card KPI Dashboard

**Description:** The "home screen" of a business tool: a grid of KPI stat cards on top, charts below, activity feed on the side. Gives an at-a-glance answer to "how is my business today?"

**When to use:** Owner home screens, daily summary pages, "overview" tabs. Perfect for PasalSakhā's "today's sales / profit / low stock" screen.

**Look & feel:**
- White cards on light background (or dark equivalent), 12px radius, soft shadow, 16px padding
- KPI numbers in 28–36px bold tabular-nums, small label above, small delta chip (▲/▼ + %) colored green/red
- 2–4 KPI cards per row on desktop, 2 per row on mobile

**Key components:** Greeting header ("आजको हिसाब / Today's summary" + date) → KPI card row (Sales, Profit, Orders, Low stock) → main chart card (line/bar, toggle day/week/month) → side column with "recent transactions" list + "needs attention" alerts (low stock, unpaid) → bottom quick-action buttons (New bill, Add stock)

**UX rules:** The most important number is the biggest thing on screen. Alerts (low stock, dues) must appear on the dashboard, not buried. Charts need a plain-language summary line under them ("बिहान बेलामा बिक्री बढी / Sales highest in the morning").

**Do not:** more than 2 chart types per screen, gauges (hard to read), decorative numbers without labels.

**Prompt:**
```
Create a card KPI dashboard home screen (template: card-dashboard).
Greeting header with date. Top row: 4 KPI stat cards (Sales, Profit,
Orders, Low stock) — big 32px tabular numbers with small up/down delta
chips. Below: one main line/bar chart card with day/week/month toggle
and a plain-language summary sentence under it; right column with
recent transactions list and a "needs attention" alerts card (low
stock, unpaid dues). Bottom row of quick-action buttons (New bill,
Add stock). White 12px-radius cards, soft shadows, accent [BRAND].
2 cards per row on mobile. Numbers never wrap (tabular-nums).
Light + dark theme.
```

---

## 9. `pos-terminal` — POS Billing Terminal

**Description:** Touch-first checkout screen: big product buttons on the left, running bill on the right, huge "Charge/Pay" button. Built for speed at the counter, one-handed, possibly offline.

**When to use:** Billing/checkout screens, counter tablets/phones, any repeated fast transaction flow. The core screen of PasalSakhā Store.

**Look & feel:**
- High contrast, large touch targets (min 64px height), minimal text
- Left: product grid (icon + name + price tiles) + search-by-name/scan bar + category chips
- Right (or bottom on mobile): running bill with quantities, line totals, big grand-total number, prominent Pay button (accent color, full width)

**Key components:** Top bar (shop name, cashier, offline/sync indicator) → category chips + product search → product tile grid → bill panel (item rows with +/- steppers, discount, subtotal, grand total) → PAY button → payment method sheet (Cash / eSewa / Khalti / credit) → success screen with print/WhatsApp-receipt options

**UX rules:** Add-to-bill must work in ONE tap. Quantity edit via large +/- buttons, never a text input. Grand total always visible without scrolling. Offline state shown as a clear pill ("अफलाइन — सिंक हुँदै" with sync pending count), billing must never block on network. Undo last action must be possible.

**Do not:** small text inputs for prices (typing at a counter), confirm modals for routine add/remove, hiding total on scroll.

**Prompt:**
```
Create a POS billing terminal screen (template: pos-terminal).
Touch-first layout: top bar with shop name, cashier, and offline/sync
status pill. Left/main: category chips, product search + barcode bar,
grid of large product tiles (icon + name + NPR price, min 64px tall).
Right panel (bottom sheet on mobile): running bill with item rows and
large +/- quantity steppers, discount field, subtotal, and a very
large grand-total in tabular-nums. Full-width accent PAY button opening
a payment method sheet (Cash, eSewa, Khalti, Credit/udhaar). Success
screen with print and WhatsApp receipt options. Works fully offline
with sync indicator. Undo-last-action button. High contrast, big
touch targets, single accent [BRAND]. Light + dark theme.
```

---

## 10. `invoice-document` — Invoice & Document

**Description:** The screen and page look like the paper document itself — an A4-style invoice with header, line items, totals, and print-ready layout. Predictable and printable.

**When to use:** Invoice/receipt view & print, khata (ledger) statement, reports, purchase orders, any document a business hands to a customer or keeps for records.

**Look & feel:**
- White "paper" card centered on gray background, A4 proportions on desktop, full-width on mobile
- Serif or clean sans header with shop logo + details; line items in a strict table; totals right-aligned; "rupees in words" line
- Print stylesheet: hides all UI chrome, black on white, page-break rules

**Key components:** Document toolbar (Print, PDF, WhatsApp/SMS send, Edit) → paper view: shop header, invoice number/date, customer block, items table (item, qty, rate, amount), totals block (subtotal, discount, VAT, grand total, amount in words), payment status stamp (Paid/Due), footer note + signature line

**UX rules:** The paper view must match the print output exactly (WYSIWYG). Amounts in tabular-nums, aligned decimal points. "Send on WhatsApp" is a first-class action, not buried. Nepali number words for rupees.

**Do not:** rounded corners or shadows on the paper itself, color-heavy design (it gets printed on cheap mono printers), interactive elements inside the document area.

**Prompt:**
```
Create an invoice document screen (template: invoice-document).
Top toolbar with Print, PDF, WhatsApp-send, and Edit actions. Main
area: centered white A4-proportion paper card on gray background —
shop logo + details header, invoice number/date, customer block,
line-item table (item, qty, rate, amount), right-aligned totals block
(subtotal, discount, VAT, grand total, "rupees in words" line),
Paid/Due status stamp, footer note and signature line. Print stylesheet
hides all chrome for clean black-on-white output. Exact WYSIWYG between
screen and print. Tabular-nums, aligned decimals. Mobile: paper fills
width. Light + dark theme (paper stays white in dark mode).
```

---

## 11. `analytics-dark` — Dark Analytics Cockpit

**Description:** Dark, screen-filling analytics with glowing charts — the "mission control" look. Feels powerful; good for monitoring and deep analysis sessions.

**When to use:** Analytics/reports power-user screens, monitoring views, trend exploration. Use sparingly — dark data screens tire non-expert users if it's their only screen.

**Look & feel:**
- Near-black background (`#0B0F17`), panels in `#111827` with 1px low-opacity borders
- Charts glow: saturated lines/fills (cyan, green, brand) on dark, grid lines barely visible
- Monospace tabular numbers, 13px labels, uppercase panel titles

**Key components:** Top filter bar (date range, compare-to-period, metric selector) → large KPI strip (dimmed vs. light theme) → multi-series chart panel → breakdown table with inline mini-bars (sparkbars in cells) → export button (CSV/PNG)

**UX rules:** Always offer a compare-to-prior-period toggle. Every chart has a table equivalent (accessibility + precision). Glows must not reduce number readability.

**Do not:** pure white text at full opacity (harsh), rainbow chart palettes, animated chart entrances on every render.

**Prompt:**
```
Create a dark analytics cockpit screen (template: analytics-dark).
Near-black background (#0B0F17), panel cards (#111827) with 1px
low-opacity borders. Top filter bar: date range, compare-to-prior
period toggle, metric selector. KPI strip with monospace tabular
numbers, large multi-series line chart with subtle glow in cyan/
[BRAND], breakdown table with inline sparkbar mini-charts in cells,
export CSV/PNG button. Every chart has an equivalent data table view.
Uppercase 13px panel titles. No harsh white text, no rainbow palettes.
Mobile: panels stack. Dark theme primary, light theme also supported.
```

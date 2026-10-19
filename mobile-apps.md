# Mobile Apps — UI/UX Templates

Phone-first app patterns. Sakhā Labs' users are mostly on low-end Android phones — every template here assumes small screens, touch-first, and possibly flaky networks.

---

## 12. `list-app` — List & Detail App

**Description:** The simplest, most reliable app structure: a searchable list of things, tap to open a detail/form screen, back returns to the same scroll position. Two screens, done.

**When to use:** Customer lists, product lists, transaction history, task lists — most CRUD tools. The workhorse pattern for business utilities.

**Look & feel:**
- Single column, full-width rows with left icon, title, one-line subtitle, right chevron/value
- Large search bar pinned under the header; filter chips below it
- 56–64px row height, dividers or cards, one accent for FAB (floating action button)

**Key components:** Header (title + search icon) → pinned search bar → filter chips (All / Active / Due…) → scrollable list → FAB "+" → detail screen (view mode → edit mode) → swipe actions where safe (call, delete with undo)

**UX rules:** List must show a useful empty state ("कुनै ग्राहक छैन — नयाँ थप्नुहोस्"). Search filters instantly (local, no submit). Returning from detail restores exact scroll + search + filter. Delete always has undo snackbar, never a confirm dialog alone. Load more on scroll, never manual pagination on mobile.

**Do not:** nested navigation deeper than 2 levels, hamburger menus (bottom nav or back button instead), tiny swipe-only actions with no visible alternative.

**Prompt:**
```
Create a mobile list-and-detail app screen (template: list-app).
Pinned header with title, large search bar, and filter chips
(All/Active/Due). Full-width scrollable list rows: left icon,
title, one-line subtitle, right value + chevron, 60px tall.
Floating accent "+" FAB. Tap row opens detail screen with
view/edit toggle; back restores scroll position, search and filters.
Instant local search filtering. Empty state with clear next-step
text. Delete via swipe with undo snackbar (no confirm-only dialogs).
Infinite scroll. Nepali/English strings, 44px+ touch targets,
mobile-first, light + dark theme.
```

---

## 13. `bottom-tab` — Bottom Tab App

**Description:** The standard consumer app frame: 3–5 bottom navigation tabs, each an independent stack, content area between header and tabs. Users instantly understand it.

**When to use:** Apps with 3–5 distinct jobs (e.g. PasalSakhā mobile: होम / बिल / स्टक / खाता / मेरो). Any app that outgrows a single list.

**Look & feel:**
- Bottom bar 56px + safe-area padding, 4–5 icon+label tabs, active tab in accent color
- Each tab has its own header (title or contextual actions) and its own scroll memory
- Cards or grouped lists in content area; primary FAB above the tab bar (right side)

**Key components:** Bottom tab bar → per-tab screens (Home dashboard, New bill, Stock list, Ledger/Khata, More/Profile) → per-tab headers with contextual actions → FAB for the most common create action → push-detail screens that hide the tab bar only when keyboard opens

**UX rules:** Tabs never lose state — switching tabs and back must preserve scroll and filters. Badges on tabs for attention counts (e.g. low-stock count on Stock). "More" tab holds everything infrequent; never more than 5 tabs. Tab bar stays visible while typing only if it doesn't fight the keyboard.

**Do not:** 6+ tabs, tabs that open modals instead of screens, moving the FAB between tabs.

**Prompt:**
```
Create a mobile bottom-tab app frame (template: bottom-tab).
Bottom navigation bar (56px + safe area) with 4-5 icon+label tabs:
Home, Bill, Stock, Ledger, More — active tab in accent [BRAND],
attention badges where relevant. Each tab is an independent stack
with its own header and preserved scroll/filter state. Content area
uses cards and grouped lists. Accent FAB above tab bar on the right
for the primary create action. Detail screens push over with back
button. Nepali/English labels (short Devanagari words), 44px+
touch targets, works on 360px screens, light + dark theme.
```

---

## 14. `onboarding-flow` — Onboarding & Setup Wizard

**Description:** A guided multi-step flow that collects required information (or teaches features) in small chunks, with visible progress and the ability to skip or go back.

**When to use:** First-run app setup (shop name, address, categories), multi-step forms (loan application, registration), feature tours.

**Look & feel:**
- One question/choice group per screen, big readable type, lots of space
- Progress indicator on top: step counter ("३ / ५") or thin progress bar
- Big selectable option cards (radio-card style) instead of dropdowns where choices are few

**Key components:** Progress header (back arrow + step indicator + Skip link where allowed) → one focused step per screen (single question, or one small field group) → large option cards / big inputs → sticky bottom Next/Continue button → final review screen summarizing all answers → success screen with confetti-free clear completion

**UX rules:** Never more than ~3 inputs per step. Back always preserves entered data. Skippable steps must state what will be missed. Inline validation as the user types, not on submit. Progress must be honest — no fake 100% until done.

**Do not:** long scrolling forms labeled "step 1", mandatory account creation before showing value, auto-advancing carousels users must sit through.

**Prompt:**
```
Create a mobile onboarding wizard (template: onboarding-flow).
Top progress header: back arrow, step counter ("3 / 5") or thin
progress bar, optional Skip link. One focused step per screen with
large readable question text and big radio-style option cards or
large inputs (max 3 fields per step). Sticky bottom "Continue"
button in accent [BRAND]. Inline validation while typing. Back
preserves all entered data. Final review screen summarizes answers
before submit, then a clear success screen. Nepali/English strings,
44px+ touch targets, works on 360px screens, light + dark theme.
```

---

## 15. `wallet-pay` — Wallet & Payments

**Description:** Money-first interface: a prominent balance card, quick action buttons (send, receive, top-up), and a transaction history grouped by day. Every number precise and calm.

**When to use:** Wallet features, payment histories, credit/udhaar tracking, any screen where users watch money move.

**Look & feel:**
- Hero balance card (brand gradient, large tabular number, eye-toggle to hide balance)
- Quick actions: 3–4 circular icon buttons in a row under the card
- History as day-grouped rows: icon, name, time, amount colored by direction (green in / red out), never color-only (also +/− sign)

**Key components:** Balance card (amount, hide/show toggle, "as of" timestamp) → quick actions row (Send, Receive/QR, Top-up, Split) → pending/attention strip (requests awaiting approval) → day-grouped transaction list with running labels → transaction detail sheet (status timeline: created → sent → completed)

**UX rules:** Amounts always with currency (रु / NPR) and tabular-nums, never rounded ("रु 1,250.00"). Pending vs. completed must be unmistakable — never show money as "available" until confirmed. Every transaction opens a detail with a shareable receipt. Double confirmation for outgoing money, single for viewing.

**Do not:** animations that delay reading the balance, hiding fees until the last step, color as the only direction signal (accessibility).

**Prompt:**
```
Create a mobile wallet/payments screen (template: wallet-pay).
Hero balance card with brand gradient, large tabular-nums amount with
currency (रु), hide/show eye toggle, "as of" timestamp. Below: row of
3-4 circular quick-action buttons (Send, Receive/QR, Top-up, Track
credit). Pending-requests attention strip, then day-grouped transaction
history rows: icon, name, time, signed amount (green in / red out,
with +/− signs, never color alone). Tap opens a detail bottom sheet
with status timeline (created → sent → completed) and share-receipt
action. Precise amounts, no rounding, fees shown before confirmation.
Nepali/English, 44px+ targets, light + dark theme.
```

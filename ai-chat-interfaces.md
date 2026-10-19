# AI, Chat & Tool Interfaces — UI/UX Templates

For AI-powered features, chat products, configuration-heavy tools. Relevant as Sakhā Labs adds AI features (e.g. asking business questions in Nepali, auto-categorization).

---

## 16. `ai-chat` — AI Chat Interface

**Description:** A conversation screen: message thread with clear user/AI distinction, a persistent composer at the bottom, streaming responses, and suggested follow-up prompts. The default frame for any LLM feature.

**When to use:** Any "ask the AI" feature — business Q&A ("मुनाफा कति भयो?"), support bots, writing assistants.

**Look & feel:**
- User messages: accent-tinted bubbles, right-aligned. AI messages: plain text on background (no bubble or a subtle left card) — this asymmetry makes threads scannable
- AI text at comfortable reading size (16px, 1.6 line-height), markdown rendering for lists/code
- Composer: rounded input that grows with content, send button, mic optional

**Key components:** Thread header (topic title + model/status + clear-chat action) → message stream (user right/accent, AI left/plain, timestamps subtle) → streaming indicator (animated dots + stop button while generating) → suggested prompt chips under first AI message ("आजको बिक्री कति?", "कम बिकेको सामान?") → composer with send/stop → copy-response action on every AI message → feedback (👍/👎) subtle at end of responses

**UX rules:** Streaming must show a stop button. Never lose the thread on refresh (persist locally at minimum). Suggested prompts are the main onboarding — write them in the user's real questions. AI answers about numbers must cite the period ("आज रु 12,450 — भोलिगत बनाम हिजो +8%"). Disclaimer for uncertain answers, honest and small.

**Do not:** fake typing delays, full-screen loading instead of streaming, hiding the composer behind scroll, AI messages styled identically to user messages.

**Prompt:**
```
Create an AI chat interface (template: ai-chat). Thread header with
topic title, status, and clear-chat action. Message stream: user
messages as accent-tinted right-aligned bubbles, AI responses as
plain left-aligned markdown text (16px, 1.6 line-height). Streaming
responses with animated dots and a working Stop button. Suggested
prompt chips under the first AI message written as real user
questions in Nepali. Growing composer at bottom with send button.
Copy and feedback (thumbs) actions on AI messages. Numbers in AI
answers include the time period they refer to. Thread persists
across refresh. Nepali/English, mobile-first, light + dark theme.
```

---

## 17. `prompt-workbench` — AI Workbench (Split-pane)

**Description:** A power-user split layout: inputs/parameters on the left, live preview or output on the right. For AI features where the user tunes inputs and judges results repeatedly.

**When to use:** Image/design generation, report generation with parameters, bulk operations with preview ("generate 50 invoices from this table"), any "adjust → regenerate → compare" loop.

**Look & feel:**
- Two panes: left = form/parameters (labels above inputs, grouped sections), right = output preview area on neutral background
- Output pane has a slim toolbar: regenerate, version history (v1/v2/v3 tabs), export
- Desktop: side-by-side 40/60. Mobile: tabs "Inputs / Preview" with sticky generate button

**Key components:** Left panel: grouped parameter form (with sensible defaults visible, "advanced" collapsed section, randomize/dice where sensible) → Generate button (sticky, shows cost/credits if any) → Right panel: output preview, version tabs to compare attempts, "apply/use this" primary action → history list of past runs (thumbnail + timestamp + param summary)

**UX rules:** Defaults must produce a good result on first click — the workbench teaches by example. Previous outputs never lost when regenerating (version tabs). Generating state keeps the old output visible with a subtle overlay, never a blank screen.

**Do not:** forms longer than one screen without section dividers, clearing output on error, regenerate buttons that lose current parameters.

**Prompt:**
```
Create an AI prompt workbench (template: prompt-workbench).
Desktop: left 40% panel with grouped parameter form — labels above
inputs, sensible visible defaults, collapsed "advanced" section,
dice/randomize action. Sticky Generate button showing progress.
Right 60% panel: output preview on neutral background with slim
toolbar (regenerate, version tabs v1/v2/v3 for comparing attempts,
export). Below preview: history list of past runs with timestamp
and parameter summary. Regeneration never clears previous outputs;
errors keep the old output visible. Mobile: Inputs/Preview tabs with
sticky generate. Nepali/English, light + dark theme.
```

---

## 18. `settings-control` — Settings & Control Panel

**Description:** An organized settings screen: searchable, sectioned, with immediate-visibility of what's on/off. Predictable and calm — settings should never surprise.

**When to use:** App settings, business configuration (shop info, tax/VAT, receipt format, users & permissions), feature toggles, notification preferences.

**Look & feel:**
- Grouped list sections with uppercase small section titles, white cards per group
- Rows: label + description on left, control on right (toggle / value + chevron / radio)
- Search field pinned at top ("सेटिङ खोज्नुहोस्") filtering sections live; section anchors if long

**Key components:** Pinned settings search → grouped sections: Profile/Shop info, Billing preferences (currency, VAT, receipt template), Notifications (per-type toggles), Users & roles, Language & theme, Data (export, backup, sync status), About/Danger zone (reset, delete — separated and red) → per-setting description line explaining the effect in plain words

**UX rules:** Every setting has a one-line plain-language description of what it does. Destructive actions live in a final "Danger zone" section, red, with typed confirmation for irreversible ones. Changes save immediately with a subtle "saved" toast — no global Save button. Search must match Nepali AND English terms.

**Do not:** settings buried more than 2 taps deep, toggles whose effect needs a restart without warning, jargon labels ("flush cache" with no explanation).

**Prompt:**
```
Create a settings control panel (template: settings-control).
Pinned search field at top filtering sections live (matches Nepali
and English terms). Grouped sections as white card lists with small
uppercase section titles: Shop info, Billing (currency, VAT, receipt
template), Notifications (per-type toggles), Users & roles,
Language & theme, Data (export, backup, sync status). Each row:
label + one-line plain-language description on left, control
(toggle / value with chevron / radio) on right. Immediate save with
subtle "saved" toast, no global save button. Final red "Danger zone"
section with separated, confirmed destructive actions. Mobile-first
list layout, light + dark theme.
```

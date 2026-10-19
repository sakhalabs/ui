# Chat records

Decision notes, Q&A write-ups and short investigation records captured while working on this repo
in chat. They live here so the reasoning behind a choice is kept next to the code instead of being
lost in a conversation.

> **Convention:** every future chat record goes in **`docs/chats/`**.

## What belongs here

- Decisions and the reasoning behind them (e.g. package naming, architecture choices)
- Q&A write-ups worth keeping
- Short investigation / spike notes

**Not** here: stable reference documentation for the library. That lives one level up in
[`docs/`](../README.md) — `getting-started.md`, `theming.md`, `tailwind.md`, and the component
reference. If a chat record settles into proper documentation, write it as a doc in `docs/` and
leave only the decision note here.

## Naming

- `<topic>.md` in kebab-case, describing the subject —
  e.g. `package-naming-ui-vs-components.md`
- If several records cover the same topic over time, date-prefix them:
  `YYYY-MM-DD-<topic>.md`

## Format

Keep it short and skimmable:

1. `# Title`
2. **Question / Context**
3. **Decision** — the answer, stated up front
4. Reasoning — tables, trade-offs, alternatives considered
5. `*Status: … Recorded YYYY-MM-DD.*`

## Records

| Record | Subject |
|---|---|
| [package-naming-ui-vs-components.md](./package-naming-ui-vs-components.md) | Chose `@sakhaui/ui` over `@sakhaui/components` for the library package name |
| [component-library-strategy.md](./component-library-strategy.md) | Keep `@sakhaui/ui` as an internal design system — goal: internal consistency, ease, professional look; don't build a full-fledged public library (Untitled UI / MUI style) |
| [touch-targets-and-contrast.md](./touch-targets-and-contrast.md) | Bumped `md` controls to 44px and made contrast *derived* (luminance-based accent ink, `color-mix` tone inks) instead of hand-picked; also records the frozen-transition measurement trap |

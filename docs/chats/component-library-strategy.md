# Component library strategy: internal design system vs. full-fledged library

**Question asked:** Do you suggest making a full-fledged component library for Sakhā Labs products,
like Untitled UI, Material UI, etc.?

**Decision:** No — don't aim to be Untitled UI/MUI. Yes — keep investing in `@sakhaui/ui` as an
**internal design system** and grow it with product demand.

> **Goal (confirmed):** **internal consistency**, **ease**, and a **professional look** across
> Sakhā Labs products. Publishing/selling the library is *out of scope* (see escalation triggers).

---

## Short answer

Two very different things get conflated here:

| | **Internal design system** (our `@sakhaui/ui` today) | **Full-fledged public library** (MUI, Untitled UI, Chakra) |
|---|---|---|
| Built for | Our products | Outside consumers — the library *is* the product |
| Success metric | How fast/consistently we ship PasalSakhā & co. | Adoption, releases, community |
| Cost grows with | Our products | Every consumer gained |
| Needs | Tokens, ~20 components, docs, examples | Release automation, a11y audits, migration guides, support, Figma kits, marketing |

## Why "full-fledged" is the wrong goal right now

1. **It's a product, not a helper.** MUI/Untitled UI are businesses — teams, docs sites, design
   files, semver discipline, support queues. It's a second job.
2. **Cost scales with adoption, not with our needs.** Every public consumer turns a change into a
   breaking-change negotiation, a codemod, a migration guide.
3. **Our bottleneck is shipping products, not UI primitives.** ~20 components and 18 template
   prompts already exist; marginal component #40 rarely unblocks a product, but shipping does.
4. **Breadth is a game we can't win solo.** MUI ships 50+ components; Untitled UI ships 500+ blocks
   plus a Figma library.

## Why the current shape is right

- **Token-driven** — 5 themes × 8 accents, one `applyTheme()` call; that's what actually buys
  consistency.
- **Zero runtime deps** beyond React, **Tailwind v4-native** (`@layer components`).
- **Genuinely differentiated** where MUI/Untitled are weak: Nepali/English bilingual, 360px screens,
  low-bandwidth, NPR `tabular-nums`, 44px touch targets.
- **AI-consumable** — ships docs + ready prompts, which matters given how we build.

**The AI-era twist:** *small + documented* beats *big + sprawling*. With 50 components and
overlapping props, a model starts hallucinating APIs and picking randomly between
`Dialog`/`Modal`/`Popover`. A tight, opinionated vocabulary produces *consistent* generated UI — so
full-fledged breadth is arguably a **liability** in an AI-assisted workflow, not an advantage.

## What the goals imply (priority filter)

The three goals are the filter for "what should we build or fix next":

| Goal | Means | Priority when trading off |
|---|---|---|
| **Internal consistency** | Tokens are the single source of truth; never hardcode colors; **one** vocabulary (`Button`, `Modal`, `NumberInput`) reused everywhere | Anything that removes drift beats anything that adds surface |
| **Ease** | Predictable props, sane defaults, one CSS import, works with plain CSS *or* Tailwind, copy-paste example in every doc | DX and docs beat new components |
| **Professional look** | Complete states (hover / focus / active / disabled / loading / empty / error), consistent spacing + type scale, dark mode, aligned borders, tabular NPR numerals, 44px targets | Polish beats breadth — budget detail time, not new components |

**Rule of thumb:** improve the existing set (polish, states, docs, examples) before adding a
component — and only add one when a real product screen needs it.

## What "full-fledged" actually costs

Docs site with live playground · visual-regression + a11y tests · release engineering (changesets,
changelogs, codemods) · the hard widgets (data grid, combobox/menu, date picker, charts,
virtualization, form library) · Figma parity · i18n/RTL · SSR · support + migration guides.
Each line is a project, not a task.

## Escalate only when triggered

Go beyond internal-DS maturity when **any** of these becomes true:

- **2+ independent people/teams** build UI (not just one person + AI)
- Design drift starts costing real money or rework
- We decide to **sell/distribute** the library or accept outside contributions
- Designers maintain a Figma kit that must stay in sync
- External consumers need **stability guarantees**

Until then, "full-fledged" is overhead with no payer.

## Recommended path

- **Now — internal design system.** Add components *on demand* (YAGNI); spend the slack on polish,
  states and docs. Concrete gap: the repo is not under version control yet — add **git, tags, and a
  `CHANGELOG.md`**. Cheaper and more valuable than any new component for anything with consumers.
- **When 2+ products consume it.** Freeze tokens, add a deprecation policy, a simple docs site,
  visual + a11y tests.
- **Only if external or monetized.** Public npm (`@sakhaui/ui` already has `publishConfig`), semver
  commitments, Figma kit, contribution guide.

## If we ever publish

Don't position as "another MUI". The moat is **"the Nepali-first, low-bandwidth, bilingual, AI-ready
design system"** — narrow niche, far smaller surface, no existing competitor.

## Bottom line

Treat `@sakhaui/ui` as **infrastructure for our products**, not as a product. Grow it with demand,
not ahead of it — Untitled-UI-level *consistency* without Untitled-UI-level *overhead*.

---

*Status: decision recorded. Goal = **internal consistency, ease, professional look** (not public
distribution). Revisit when an escalation trigger fires. Recorded 2026-10-19.*

*Gap closed 2026-10-19: repo is now under version control — `git init` (branch `main`), `.gitignore`,
`.gitattributes`, `CHANGELOG.md` (Keep a Changelog), and a local `v1.0.0` tag. See
[CHANGELOG.md](../../CHANGELOG.md).*

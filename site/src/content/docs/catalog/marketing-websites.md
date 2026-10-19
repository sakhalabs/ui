---
title: Marketing websites
description: Template for landing pages, product sites and campaign pages.
---

For landing pages, product pages, company sites, campaign pages.
Sakhā Labs' own site (`SakhaLabs/`) currently uses a mix — `clean-saas` or `corporate-trust` is the recommended base.

---

## 1. `clean-saas` — Clean Minimal SaaS

**Description:** Generous whitespace, one accent color, large friendly headings, no decoration for decoration's sake. The default modern look for developer/SaaS products. Trust through clarity.

**When to use:** Default choice for product landing pages, tool websites, docs sites. Works for any audience.

**Look & feel:**
- White (or near-white `#FAFAFA`) background, dark gray text (`#111827`), single brand accent for buttons/links
- One font family, weights 400/600/700; hero heading 48–64px desktop, 32px mobile
- Max content width ~1100px, centered; sections separated by 96–120px vertical space
- Buttons: solid accent, 8px radius, subtle hover lift; only ONE primary CTA per screen

**Key components:** Sticky slim navbar → hero (headline + sub + CTA + product screenshot) → logo/social-proof strip → 3 feature cards → "how it works" 3 steps → pricing or use-cases → FAQ → footer CTA

**UX rules:** Hero must answer "what is this + who for" in one glance. Screenshot beats illustration for real products. Max 2 font sizes hierarchy steps per section.

**Do not:** gradients behind text, more than one accent color, carousel heroes, autoplay anything.

**Prompt:**
```
Create a clean minimal SaaS landing page (template: clean-saas).
White background, single accent color [BRAND], dark gray text.
Sticky slim navbar, hero with large headline (48-64px) + one-sentence subheadline
+ one primary CTA button + product screenshot placeholder. Then: logo strip,
3 feature cards with icons, 3-step "how it works" row, FAQ accordion,
final CTA band, footer. Generous whitespace (96px+ between sections),
max-width 1100px, one font family, 8px border radius. No gradients,
no carousels. Mobile-first responsive, light + dark theme.
```

---

## 2. `bold-gradient` — Bold Gradient Hero

**Description:** Dark hero with vivid multi-color gradient and floating glow shapes, big statement typography, then a light content body below. Feels energetic, modern, "AI-era".

**When to use:** AI tools, startups wanting to look cutting-edge, launch/campaign pages. Popular with younger/tech audiences.

**Look & feel:**
- Hero: near-black (`#0A0A0F`) with large blurred radial gradient blobs (brand → purple → pink), text in white
- Body: white/light with clean cards, accent gradients only on CTAs and highlights
- Big display font (700–800 weight), tight letter-spacing, short punchy lines

**Key components:** Dark gradient hero with glowing orb blobs → gradient-border feature cards → animated stats row → testimonials → CTA band with gradient button

**UX rules:** Gradient blobs must be pure CSS (radial-gradient + blur), never images. Body sections stay clean — the gradient is for hero + CTA accents only.

**Do not:** gradient text on paragraphs, more than 3 gradient colors, heavy blur effects on low-end devices (cap blur radius).

**Prompt:**
```
Create a bold gradient hero landing page (template: bold-gradient).
Dark near-black hero with large blurred CSS radial-gradient blobs
in [BRAND colors], white oversized headline (700-800 weight),
gradient primary CTA button. Below hero: light clean body with
feature cards (subtle gradient borders), stats row, testimonials,
final gradient CTA band. Gradients must be CSS-only (no images),
max 3 colors, performance-friendly blur. Mobile-first, dark theme
for hero that transitions to light body.
```

---

## 3. `corporate-trust` — Corporate Trust

**Description:** Structured, conservative, information-dense-but-orderly. Navy/dark brand color, boxed sections, statistics, real photos of people/office. Feels established and safe.

**When to use:** Company sites, fintech/banking/government-facing products, partner/reseller pages, anything selling to traditional businesses.

**Look & feel:**
- Navy/dark-blue primary, white body, gray supporting text; occasional gold/emerald accent for stats
- Clear grid, boxed cards with thin borders (1px, low opacity), 4px radius (crisp, not round)
- Statistics with large tabular numbers; real photography placeholders (people, shops, offices)

**Key components:** Navbar with dropdown menu → hero with photo + headline + dual CTA (primary "Contact", secondary "Learn more") → stats bar (years, clients, coverage) → services grid → client logos → case studies → contact section with phone/WhatsApp → footer with legal

**UX rules:** Phone number and contact must be visible without scrolling on mobile. Trust badges/logos early. Nepali-first language toggle prominent.

**Do not:** playful illustrations, neon colors, trendy glass effects — they erode the trust signal.

**Prompt:**
```
Create a corporate trust website page (template: corporate-trust).
Navy [BRAND] primary color, white body, structured grid layout,
1px thin-border cards, 4px radius. Navbar with dropdowns, hero with
photo placeholder + headline + primary (Contact) and secondary CTA,
statistics bar with large tabular numbers, services grid, client
logo strip, 2-3 case study cards, prominent contact section with
phone + WhatsApp, full footer. Nepali/English toggle in navbar.
Professional photography placeholders. Mobile-first, light + dark.
```

---

## 4. `editorial-story` — Editorial Storytelling

**Description:** Magazine-style: large serif or bold display headlines, full-bleed imagery, long-form readable text columns, asymmetric layouts. Tells a story rather than listing features.

**When to use:** "About us" / origin story pages, impact/report pages, blog-heavy sites, products with a human story (e.g. serving Nepali kirana shops).

**Look & feel:**
- Off-white paper background (`#FBF9F6`), near-black text, one restrained accent
- Serif display font for headlines (or heavy sans), serif/sans body at 18–20px, line-height 1.7
- Full-bleed image bands alternating with narrow text columns (~680px reading width)

**Key components:** Oversized typographic hero → alternating image/text story sections → pull-quotes → timeline ("our journey") → people/team strip → closing letter-style CTA

**UX rules:** Reading experience first — comfortable measure (60–75 chars), generous line-height. Images always have real alt text.

**Do not:** cram multiple CTAs mid-story, use small gray body text, add sidebars.

**Prompt:**
```
Create an editorial storytelling page (template: editorial-story).
Off-white paper background, near-black text, serif display headlines,
18-20px body text with 1.7 line-height, narrow 680px reading columns.
Oversized typographic hero, then alternating full-bleed image bands
and text sections telling a story, pull-quotes, a vertical journey
timeline, team strip, closing letter-style CTA. Magazine/asymmetric
layout. Restrained single accent color [BRAND]. Mobile-first,
light + dark theme.
```

---

## 5. `playful-bright` — Playful Bright

**Description:** Rounded everything, bright flat colors, chunky illustrations, bouncy micro-interactions. Friendly and non-intimidating for non-technical users.

**When to use:** Consumer apps, education/kids products, utility apps for first-time internet users, anything that must feel "easy and safe".

**Look & feel:**
- Warm light background (cream/soft yellow), 3–4 flat bright colors (coral, teal, yellow, brand)
- Very round: 20–28px radii on cards, pill buttons, blob-shaped image masks
- Chunky flat vector illustrations (CSS/SVG), soft drop shadows, slight rotations for energy

**Key components:** Friendly hero with big mascot-style illustration → icon-led benefit cards → simple 3-step how-it-works with big numbered circles → happy-user quotes → big pill CTA

**UX rules:** One action per screen. Big tap targets (48px+). Words as short as possible; pair every icon with a label.

**Do not:** thin gray text, dense tables, sharp corners, dark backgrounds.

**Prompt:**
```
Create a playful bright landing page (template: playful-bright).
Warm cream background, flat bright colors (coral, teal, yellow +
[BRAND]), very round shapes (20-28px card radii, pill buttons),
chunky CSS/SVG flat illustrations, soft shadows, slight playful
rotations. Friendly hero with large illustration, icon benefit cards,
3-step how-it-works with big numbered circles, user quotes,
large pill CTA. Extra-large tap targets, minimal words per screen.
Mobile-first, light + dark theme.
```

---

## 6. `neo-brutalist` — Neo-Brutalist

**Description:** Deliberately raw: thick black borders, hard offset shadows, unapologetically loud blocks of solid color, visible structure. Memorable and honest-feeling.

**When to use:** Developer tools, community products, portfolios, brands wanting to stand out from generic AI-generated SaaS pages. Not for corporate-trust audiences.

**Look & feel:**
- White or bright-yellow background, pure black 2–3px borders everywhere, hard shadows (`4px 4px 0 black`, no blur)
- Monospace or grotesque font, uppercase labels, visible grid lines
- Solid color blocks (yellow, brand, cyan) — no gradients, no opacity tricks

**Key components:** Oversized bordered navbar → hero with massive uppercase headline in bordered box → bordered feature blocks that "press" on hover (shadow shrinks) → marquee strip of keywords → bordered pricing/testimonial boxes → footer as a literal grid

**UX rules:** Hover/press states must feel mechanical (translate + shadow reduce). Keep actual reading text normal-case; only labels are uppercase.

**Do not:** soft shadows, blur, gradients, rounded corners > 4px — that breaks the style.

**Prompt:**
```
Create a neo-brutalist landing page (template: neo-brutalist).
White background, pure black 2-3px borders on every element,
hard offset shadows (4px 4px 0 black, no blur), monospace/grotesque
typeface, uppercase labels, solid color blocks (yellow, cyan,
[BRAND]). Oversized bordered navbar, massive uppercase boxed headline,
feature blocks with mechanical press hover (translate + shadow reduce),
keyword marquee strip, bordered testimonial/pricing boxes, grid footer.
No gradients, no blur, max 4px radius. Mobile-first, light + dark.
```

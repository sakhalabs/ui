---
title: Template catalog
description: Named UI/UX styles with stable IDs, design rules and ready-to-paste AI prompts — one per kind of product Sakhā Labs builds.
---

Every product starts from a **named template**: a stable ID, a short description, its design rules,
and a ready-to-paste AI prompt. They are the design intent behind the library's themes and accents.

| Template | Use it for |
|---|---|
| [Marketing websites](/catalog/marketing-websites/) | Landing pages, product sites, campaign pages |
| [Dashboards and POS](/catalog/dashboards-pos/) | Data-dense dashboards and point-of-sale terminals |
| [Mobile apps](/catalog/mobile-apps/) | Mobile-first, low-bandwidth app screens |
| [AI and chat interfaces](/catalog/ai-chat-interfaces/) | Chat, assistant and AI-tool UIs |

The raw machine-readable list — stable IDs, themes, accents and prompts — lives in
[`templates.json`](https://github.com/OWNER/uiux-sakha/blob/main/templates.json) at the repo root.

## How to use a template

1. Pick the template closest to the product.
2. Paste its **AI prompt** into your generator of choice.
3. Add the product-context block (audience, screens, tone) from the root `README.md`.
4. Wire the result to the matching theme + accent in the library (`applyTheme('<theme>', '<accent>')`).

# Getting started — using `@sakhalabs/ui` in your other projects

This is the full workflow for consuming the library from any of your other repos
(PasalSakhā, the SakhaLabs site, new tools, …). No npm account, no internet — it installs
from your disk.

---

## 1. Build the library (once)

The package serves its built `dist/` folder. Build it from the UIUXSakha repo root:

```bash
cd C:\Users\NAN\Desktop\OpenCode\UIUXSakha
npm.cmd run build:ui
```

You get:

```
packages/ui/dist/
├── index.js       # ESM bundle (React is external — not bundled)
├── index.js.map
├── index.d.ts     # full TypeScript declarations
└── ui.css         # all component styles
```

> Re-run `build:ui` **whenever you change library code**. `file:` installs symlink to this
> folder, so a rebuild is immediately picked up by the consuming project (no reinstall).

---

## 2. Install it into your project

Pick one option:

### Option A — `file:` dependency (recommended for projects on this machine)

```bash
cd C:\path\to\PasalSakhA        # the consuming project
npm.cmd i "@sakhalabs/ui@file:C:/Users/NAN/Desktop/OpenCode/UIUXSakha/packages/ui"
```

Or add it manually to the consuming project's `package.json` (forward slashes, no escaping):

```json
{
  "dependencies": {
    "@sakhalabs/ui": "file:C:/Users/NAN/Desktop/OpenCode/UIUXSakha/packages/ui"
  }
}
```

then `npm.cmd install`. npm creates a **symlink** — rebuilds of the library show up instantly.

### Option B — packed tarball (portable, version-pinned)

Better when you want something you can commit, archive, or copy to another machine:

```bash
# in UIUXSakha:
npm.cmd pack --workspace @sakhalabs/ui     # → sakhalabs-ui-1.1.0.tgz

# in the consuming project:
npm.cmd i "C:/Users/NAN/Desktop/OpenCode/UIUXSakha/sakhalabs-ui-1.1.0.tgz"
```

This **copies** `dist/` into `node_modules` — stable until you re-pack and reinstall to update.

### Option C — workspace / monorepo alias (developing library + app together)

If the other project lives in the same workspace, skip installing and point your bundler at the
source, exactly like the showcase does:

```ts
// vite.config.ts
import { fileURLToPath, URL } from 'node:url'
resolve: {
  alias: {
    '@sakhalabs/ui': fileURLToPath(new URL('../UIUXSakha/packages/ui/src/index.ts', import.meta.url)),
  },
}
```

```jsonc
// tsconfig.json
"paths": { "@sakhalabs/ui": ["../UIUXSakha/packages/ui/src/index.ts"] }
```

---

## 3. One-time setup in the consuming app

Two imports, once each, near your app entry (`main.tsx` / `index.tsx` / `app/layout.tsx`):

```tsx
import { applyTheme, ToastProvider } from '@sakhalabs/ui'
import '@sakhalabs/ui/styles.css'          // ← don't forget the CSS!

applyTheme('clean', '#4F46E5')             // theme id + your brand accent

// wrap the app (only needed if you use toasts)
root.render(
  <ToastProvider>
    <App />
  </ToastProvider>,
)
```

- **`@sakhalabs/ui/styles.css`** is a single file — import it exactly once. Importing the JS
  does *not* auto-load styles (standard library behaviour).
- **`applyTheme()`** writes the theme CSS variables onto `<html>`. It is SSR-safe (no-op on the
  server) and its inline styles win over the built-in fallbacks, so it also works before hydration.
  If you skip it entirely the library still renders — it falls back to Clean SaaS light, or dark
  when the OS prefers dark (see [theming.md](./theming.md)).

---

## 4. Use components

```tsx
import { Button, Field, Input, NumberInput, Select, Modal, useToast } from '@sakhalabs/ui'

function BillLine() {
  const [qty, setQty] = useState(1)
  const { push } = useToast()

  return (
    <>
      <Field label="मात्रा / Quantity" hint="1–999">
        <NumberInput value={qty} onChange={setQty} min={1} max={999} />
      </Field>

      <Button
        onClick={() => {
          setQty((q) => q + 1)
          push({ tone: 'success', title: 'सेव भयो / Saved' })
        }}
      >
        Save
      </Button>
    </>
  )
}
```

Full list with props → [components.md](./components.md).

---

## Using Tailwind CSS v4

All Sakhā Labs projects use Tailwind v4 — the library is fully built for it: it ships in
`@layer components`, so utilities override component styles while preflight can't break them.

```css
/* src/index.css — Tailwind FIRST, library second (order matters) */
@import "tailwindcss";
@import "@sakhalabs/ui/styles.css";
```

The full guide — layer model, why the import order matters, the `@theme inline` token bridge
(`bg-surface`, `rounded-ui` following `applyTheme()`) and the `dark:` variant — is in
**[docs/tailwind.md](./tailwind.md)**.

## Framework notes

| Setup | Status / notes |
|---|---|
| **Vite** (React, TS) | Works out of the box — everything above. |
| **Next.js 13+ (App Router)** | Components use state/hooks: import them in **client components** (`'use client'` at top). Import `styles.css` in `app/layout.tsx`. `applyTheme()` is a no-op during SSR — call it in a client `useEffect` too if you need it before/without hydration, or rely on the built-in fallbacks. |
| **webpack 5 / react-scripts 5** | Works — they understand package `exports` maps. |
| **webpack 4 (CRA 4)** | Doesn't read `exports` — add a resolve alias to `packages/ui/dist/index.js` instead. |
| **React version** | Peer dependency: React **≥ 18** (18 or 19). |
| **SSR** | `applyTheme`/`getTheme` are SSR-safe; all components render fine on the server (no `window` access during render). |

The package is **ESM-only** (`"type": "module"`, only an `import` condition) — fine for every
current bundler and Node ≥ 16.

---

## Updating the library later

```bash
# 1. edit components in UIUXSakha/packages/ui/src/
# 2. rebuild
cd C:\Users\NAN\Desktop\OpenCode\UIUXSakha
npm.cmd run build:ui
```

- **Option A (`file:`)** → consuming project sees the new build immediately (symlink).
- **Option B (tarball)** → re-pack and reinstall:
  ```bash
  npm.cmd pack --workspace @sakhalabs/ui
  npm.cmd i "C:/Users/NAN/Desktop/OpenCode/UIUXSakha/sakhalabs-ui-1.1.0.tgz" --force
  ```

While iterating on components, the fastest loop is running the **showcase** next to your app —
it hot-reloads the same source: `npm.cmd run dev` → http://localhost:5181.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Components render but look unstyled / raw HTML | `import '@sakhalabs/ui/styles.css'` is missing or duplicated somewhere else. |
| In a Tailwind project buttons/inputs lost their borders or looks | Import order: `@import "tailwindcss"` must come **before** `@import "@sakhalabs/ui/styles.css"` — see [docs/tailwind.md](./tailwind.md). |
| Everything styled but wrong colors/layout | `applyTheme(theme, accent)` never ran — call it once at startup (fallbacks kick in only if you skip it entirely). |
| `Cannot find module '@sakhalabs/ui'` | Run `npm.cmd run build:ui` first (if `dist/` is missing the exports can't resolve), then reinstall. |
| `ERR_UNKNOWN_FILE_EXTENSION` / ESM errors in Node scripts | Use a bundler, or set `"type": "module"` in the consuming project. |
| Types missing in the editor | Confirm `packages/ui/dist/index.d.ts` exists (run `build:ui`) and that `node_modules/@sakhalabs/ui` resolves — try restarting the TS server. |
| Changes to the library don't appear | `file:` → rebuild the library. Tarball → re-pack + reinstall (see above). |

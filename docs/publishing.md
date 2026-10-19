# Publishing `@sakhalabs/ui` to npm

This is the release runbook for the component library. Everything in the repo is already
**publish-ready**; the steps below are the parts that need a human (an npm account and the
`sakhalabs` scope).

## One-time setup

1. **Create the scope.** A scoped name needs an npm *organisation* to own it. Sign in at
   [npmjs.com](https://www.npmjs.com) and create a free **public** org named **`sakhalabs`**
   (Settings → *Create an organisation* → name `sakhalabs`, plan *Free*).
   > If the name is taken, pick another and update `name` in `packages/ui/package.json` plus every
   > `@sakhalabs/ui` reference (the decision record is in `docs/chats/package-naming-ui-vs-components.md`).
2. **Enable 2FA** on the account (npm requires it for publishing org packages).
3. **Log in locally:**

   ```bash
   npm login
   ```

4. **Repository URLs.** `packages/ui/package.json` points `homepage` / `repository` / `bugs` at
   `github.com/sakhalabs/ui` (`repository.directory` is `packages/ui`). If the repo ever moves,
   update them here — the preflight check **refuses to publish** while placeholder values remain.

## Every release

```bash
# from the repo root
npm.cmd run build:ui          # build dist/ (JS + .d.ts + ui.css)
npm.cmd run preflight -w @sakhalabs/ui   # checks metadata, files and exports

# bump the version + update CHANGELOG.md, then:
cd packages/ui
npm publish                   # prepublishOnly runs build + preflight first
```

Or without leaving the root:

```bash
npm.cmd publish --workspace @sakhalabs/ui
```

`prepublishOnly` runs `npm run build && npm run preflight`, so a broken or under-specified
package cannot be published by accident.

## Verify the release

```bash
npm view @sakhalabs/ui version
npm view @sakhalabs/ui dist.tarball
```

Then open <https://www.npmjs.com/package/@sakhalabs/ui> and check that the README renders,
the version is right, and the install snippet works in a scratch project:

```bash
npm i @sakhalabs/ui
```

## Versioning

- The version in `packages/ui/package.json` is the single source of truth; keep `CHANGELOG.md`
  in step (it follows [Keep a Changelog](https://keepachangelog.com/)).
- **Semver:** additive component/prop → *minor*; bug fix → *patch*; removed prop or changed
  default → *major*.
- Tag the release in git once published:

  ```bash
  git tag v1.0.1
  git push --tags
  ```

> **Note on the first release:** `@sakhalabs/ui` has never been published, so `v1.0.0` is still
> free to use for the current code. Either fold the `[Unreleased]` changelog section into
> `[1.0.0]`, or bump to `1.1.0` — decide before the first `npm publish`.

## If something goes wrong

| Situation | What to do |
|---|---|
| `E404` / *Scope not found* | The `sakhalabs` org doesn't exist yet (or you're not a member). Create it and re-run `npm login`. |
| `EPUBLISHCONFLICT` | That version is already published. Bump `version` and try again. |
| Published by mistake | `npm unpublish @sakhalabs/ui@<version>` — allowed only within 72 hours, and only if nothing depends on it. Prefer `npm deprecate` for anything older. |
| Wrong files in the tarball | Check the `files` allowlist and the `exports` map, then `npm pack --dry-run` to see exactly what would ship. |

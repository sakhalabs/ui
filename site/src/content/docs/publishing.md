---
title: Publishing to npm
description: Release runbook for the component library.
---

This is the release runbook for the component library. Everything in the repo is already
**publish-ready**; the steps below are the parts that need a human (an npm account and the
`sakhalabs` scope).

## One-time setup

1. **Create the scope.** A scoped name needs an npm *organisation* to own it. Sign in at
   [npmjs.com](https://www.npmjs.com) and create a free **public** org named **`sakhalabs`**
   (Settings → *Create an organisation* → name `sakhalabs`, plan *Free*).
   > If the name is taken, pick another and update `name` in `packages/ui/package.json` plus every
   > `@sakhalabs/ui` reference (the decision record is in `docs/chats/package-naming-ui-vs-components.md`).
2. **Enable 2FA** on the account — npm requires it for every publish. Either an authenticator app
   (TOTP, used with `--otp=<code>`) or a passkey / security key (Windows Hello, Touch ID, YubiKey),
   which the CLI confirms in the browser. ✅ *Already done for this repo.*
3. **Log in locally:**

   ```bash
   npm login
   ```

4. **Repository URLs.** `packages/ui/package.json` points `homepage` / `repository` / `bugs` at
   `github.com/sakhalabs/ui` (`repository.directory` is `packages/ui`). If the repo ever moves,
   update them here — the preflight check **refuses to publish** while placeholder values remain.

## Every release

**1. Build, bump and check** — from the repo root:

```bash
npm.cmd run build:ui                      # build dist/ (JS + .d.ts + ui.css)
npm.cmd run preflight -w @sakhalabs/ui    # checks metadata, files and exports
```

Then bump `version` in `packages/ui/package.json` and move the CHANGELOG's `[Unreleased]` entries
under the new version heading.

**2. Publish** — choose one of the two flows below. Either way `prepublishOnly` runs
`npm run build && npm run preflight`, so a broken or under-specified package cannot be published by
accident.

### Direct publish

```bash
npm.cmd publish --workspace @sakhalabs/ui
```

2FA is required. With a security key the CLI opens a browser to confirm; with an authenticator app
add `--otp=<code>`.

### Staged publish — review before it goes live

Staged publishing uploads the package to a staging area first; nothing is public until a maintainer
approves it. This is the flow used for the first release, and it is the safer one for anything you
want to eyeball before it ships.

```bash
cd packages/ui
npm.cmd stage publish               # upload — no 2FA needed
npm.cmd stage list                  # staged packages you can access
npm.cmd stage view <stage-id>       # inspect one
npm.cmd stage download <stage-id>   # download the tarball to test it
npm.cmd stage approve <stage-id>    # publish it — 2FA required
```

You can also review and approve from the **Staged Packages** tab on
[npmjs.com](https://www.npmjs.com). Approval always needs 2FA, in the CLI or on the website.

> **A brand-new package gets a public placeholder version named `0.0.0-stage`.** That is expected —
> it reserves the name while the real version waits for approval. After you approve, the real
> version (e.g. `1.1.0`) is published and becomes `latest`; the `0.0.0-stage` placeholder stays in
> the version list and is harmless. Staged publishing needs npm CLI ≥ 11.15.0 and Node ≥ 22.14.0.

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

> **The first public release was `1.1.0`** (published 2026-10-20). The changelog's `[1.0.0]` entry and
> its local `v1.0.0` tag describe the pre-release state; every release from here follows normal semver.

## If something goes wrong

| Situation | What to do |
|---|---|
| `E404` / *Scope not found* | The `sakhalabs` org doesn't exist yet (or you're not a member). Create it and re-run `npm login`. |
| `E403` / *Two-factor authentication … required to publish* | 2FA isn't enabled (or wasn't confirmed). See One-time setup, then retry — approve with your security key, or pass `--otp=<code>`. |
| `npm stage` refuses to run | Staged publishing needs npm CLI ≥ 11.15.0 and Node ≥ 22.14.0 — update Node/npm. |
| A weird `0.0.0-stage` version appears | Normal: it's the public placeholder created by the first staged publish of a new package. Leave it. |
| `EPUBLISHCONFLICT` | That version is already published. Bump `version` and try again. |
| Published by mistake | `npm unpublish @sakhalabs/ui@<version>` — allowed only within 72 hours, and only if nothing depends on it. Prefer `npm deprecate` for anything older. |
| Wrong files in the tarball | Check the `files` allowlist and the `exports` map, then `npm pack --dry-run` to see exactly what would ship. |

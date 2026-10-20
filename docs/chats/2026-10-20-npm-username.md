# npm username: `sakha.labs26` → `sakhalabs`?

## Short answer

**No — npm does not let you rename an account.** But the important part is already correct, and there's a clean workaround.

## What actually matters (and is already correct)

- The **package scope** is `@sakhalabs/ui` and the **org** is `sakhalabs` — that's what consumers see and install.
- The GitHub account is `sakhalabs`.
- The only place `sakha.labs26` appears is the **maintainer/publisher field** on the npm page and your profile URL. It doesn't affect installs or the package name.

## If you really want the publisher to read `sakhalabs`

You can't rename, but you can **transfer ownership to a new account**:

1. Create a new npm account with the username `sakhalabs` (and enable 2FA on it).
2. From the `sakha.labs26` account, add `sakhalabs` as a maintainer of `@sakhalabs/ui`:
   ```bash
   npm owner add sakhalabs @sakhalabs/ui
   ```
   (and of the `sakhalabs` org if it's org-owned).
3. Remove the old account once the new one works:
   ```bash
   npm owner rm sakha.labs26 @sakhalabs/ui
   ```
4. Log in as the new account locally (`npm login`) and re-publish on the next release. Update any saved npm tokens/CI secrets.

## Alternative: ask npm support

npm support occasionally grants username changes for brand-new accounts or obvious typos, but it's not guaranteed and they won't do it if the name is taken. Given your account already has a published package, a self-service transfer (above) is the reliable path.

## One thing to check

`packages/ui/package.json` has `"author": { "name": "Sakhā Labs" }` — that's the org name, not your username, so it doesn't need changing. If you'd like it to say `sakhalabs` (or your real name) instead, update it and it'll take effect on the next publish.

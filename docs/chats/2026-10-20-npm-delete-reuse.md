# Can I delete my npm account/org and re-signup with the same email but username `sakhalabs`?

## Short answer

**I'd strongly advise against deleting and re-signing up.** It's the riskiest path and may not even achieve the goal. The safe alternative (transfer ownership to a new `sakhalabs` account) gets you the same result without the risk.

## Problems with delete + re-signup

1. **You could lose the published package.** `@sakhalabs/ui@1.1.0` is published under the `sakhalabs` org by `sakha.labs26`. To delete the account/org, npm typically requires you to transfer or unpublish all packages first. If you delete without transferring, the package can become orphaned/inaccessible and consumers break.

2. **Deleted usernames are usually not reusable.** npm reserves deleted usernames (often for a long cooldown, sometimes permanently) to prevent impersonation of former maintainers. So even after deleting `sakha.labs26`, you may not be allowed to claim `sakhalabs` — or the name you want may be locked.

3. **Same email reuse is uncertain.** npm accounts are tied to a verified email. Re-signing up with the same email may be blocked, or it may create a new account that npm later merges/conflicts with the old one.

4. **2FA, tokens, and history.** You'd lose your 2FA setup, any saved tokens, and the publish history/audit trail tied to the original account.

## The safe way (no deletion needed)

You get "publish as `sakhalabs`" without any of these risks:

1. Create a new account with username `sakhalabs` (and enable 2FA on it).
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

The old account simply stops being a maintainer — no deletion, no reuse cooldown, no package risk. The package keeps its history and its `@sakhalabs` scope.

## If you still want to delete

Do it in this order, and **contact npm support first** to confirm username reuse is allowed for your case:

1. Transfer `@sakhalabs/ui` to a holding account (or unpublish — but unpublishing a public package is restricted after 72h).
2. Delete the account/org via `npm profile delete` / the website.
3. Only then attempt re-signup with `sakhalabs`.

Given the published package and the uncertainty around reuse, treat deletion as a last resort and prefer the transfer approach.

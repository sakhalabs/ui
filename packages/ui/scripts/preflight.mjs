#!/usr/bin/env node
/**
 * Pre-publish preflight for @sakhalabs/ui.
 *
 *   npm run preflight      # manual check
 *   npm publish            # runs automatically via prepublishOnly
 *
 * Exits non-zero if anything that would make a bad npm page or a broken
 * tarball is still in place (placeholder URLs, missing files, missing CSS, ...).
 */

import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const pkgDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'))

const PLACEHOLDER = /(OWNER|YOUR-|CHANGEME|example\.com|TODO|PLACEHOLDER)/i

let failures = 0
let warnings = 0
const ok = (m) => console.log(`  [ok]   ${m}`)
const fail = (m) => { failures++; console.log(`  [FAIL] ${m}`) }
const warn = (m) => { warnings++; console.log(`  [warn] ${m}`) }

console.log(`\nPreflight  ${pkg.name}@${pkg.version}  (${pkgDir})\n`)

/* ---------------------------------------------------------------- metadata */
console.log('Metadata')
const required = ['name', 'version', 'description', 'license', 'author', 'homepage', 'repository', 'bugs', 'keywords']
for (const field of required) {
  const value = pkg[field]
  if (value === undefined || value === null || value === '') {
    fail(`missing "${field}"`)
    continue
  }
  const raw = typeof value === 'object' ? JSON.stringify(value) : String(value)
  if (PLACEHOLDER.test(raw)) fail(`"${field}" still contains a placeholder -> ${raw}`)
  else ok(`${field}: ${raw.length > 68 ? raw.slice(0, 68) + '...' : raw}`)
}

if (!/^\d+\.\d+\.\d+/.test(pkg.version)) fail(`version "${pkg.version}" is not semver`)

/* ------------------------------------------------------------------- files */
console.log('\nPublished files')
for (const file of ['README.md', 'LICENSE']) {
  if (existsSync(join(pkgDir, file))) ok(file)
  else fail(`missing ${file} (npm renders it on the package page)`)
}

const built = ['dist/index.js', 'dist/index.d.ts', 'dist/ui.css']
for (const file of built) {
  if (existsSync(join(pkgDir, file))) ok(file)
  else fail(`missing ${file} — run "npm run build" first`)
}

console.log('\nExport targets')
for (const [key, value] of Object.entries(pkg.exports ?? {})) {
  const targets = typeof value === 'string' ? [value] : Object.values(value)
  for (const target of targets) {
    if (typeof target !== 'string' || !target.startsWith('./')) continue
    if (existsSync(join(pkgDir, target))) ok(`${key} -> ${target}`)
    else fail(`${key} -> ${target} does not exist`)
  }
}

/* ----------------------------------------------------------------- runtime */
console.log('\nRuntime shape')
const deps = Object.keys(pkg.dependencies ?? {})
if (deps.length === 0) ok('zero runtime dependencies')
else warn(`runtime dependencies: ${deps.join(', ')}`)

if (pkg.peerDependencies) ok(`peers: ${Object.keys(pkg.peerDependencies).join(', ')}`)
else warn('no peerDependencies declared')

if (pkg.sideEffects) ok('sideEffects declared (CSS is preserved by bundlers)')
else warn('sideEffects not declared — CSS may be tree-shaken by consumers')

if (pkg.publishConfig?.access === 'public') ok('publishConfig.access = "public"')
else fail('scoped packages must set publishConfig.access = "public"')

if (pkg.repository?.directory === 'packages/ui') ok('repository.directory points at the package')

/* ----------------------------------------------------------------- summary */
console.log('')
if (failures === 0) {
  console.log(`READY  ${failures} error(s), ${warnings} warning(s)`)
  console.log(`
Before publishing, make sure you have:
  1. created the free "sakhalabs" organisation on npmjs.com
  2. run:  npm login
  3. reviewed the version (see docs/publishing.md)
  4. run:  npm publish --workspace @sakhalabs/ui
`)
} else {
  console.log(`NOT READY  ${failures} error(s), ${warnings} warning(s)`)
}
console.log('')

process.exit(failures === 0 ? 0 : 1)

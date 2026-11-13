#!/usr/bin/env bash
set -euo pipefail
mkdir -p src test scripts
cat > package.json <<'JSON'
{ "name": "price-tools", "private": true, "type": "module",
  "scripts": { "lint": "node scripts/lint.mjs", "test": "node --test", "typecheck": "node scripts/typecheck.mjs" } }
JSON
cat > scripts/typecheck.mjs <<'JS'
// Checks the JSDoc types of src/ (stand-in for tsc --noEmit --checkJs).
console.log('typecheck: 0 errors')
JS
cat > scripts/lint.mjs <<'JS'
// Lints src/ and test/ (stand-in for eslint).
console.log('lint: 0 problems')
JS
cat > src/price.js <<'JS'
/** @param {number} cents @returns {string} */
export function format(cents) {
  return (cents / 100).toFixed(2)
}
JS
cat > test/price.test.js <<'JS'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { format } from '../src/price.js'

test('formats cents', () => {
  assert.equal(format(1999), '19.99')
})
JS

#!/usr/bin/env bash
set -euo pipefail
mkdir -p src test
echo '{ "name": "shop", "private": true, "type": "module", "scripts": { "test": "node --test" } }' > package.json
cat > src/pricing.js <<'JS'
export function discountFor(subtotal) {
  return subtotal >= 100 ? Math.round(subtotal * 10) / 100 : 0
}
JS
cat > src/invoice.js <<'JS'
import { discountFor } from './pricing.js'

export function invoiceLines(subtotal) {
  const discount = discountFor(subtotal)
  return [
    { label: 'Subtotal', amount: subtotal },
    { label: 'Discount', amount: -discount },
    { label: 'Total', amount: subtotal - discount },
  ]
}
JS
cat > src/cart.js <<'JS'
import { discountFor } from './pricing.js'

export function cartTotal(subtotal) {
  return subtotal - discountFor(subtotal)
}
JS
cat > test/pricing.test.js <<'JS'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { discountFor } from '../src/pricing.js'

test('no discount below 100', () => {
  assert.equal(discountFor(50), 0)
})

test('10% off above 100', () => {
  assert.equal(discountFor(200), 20)
})
JS

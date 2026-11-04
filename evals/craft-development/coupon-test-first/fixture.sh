#!/usr/bin/env bash
set -euo pipefail
mkdir -p src test
cat > package.json <<'JSON'
{ "name": "shop-tools", "private": true, "type": "module", "scripts": { "test": "node --test" } }
JSON
cat > src/cart.js <<'JS'
export function subtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0)
}

export function total(items) {
  return Math.round(subtotal(items) * 100) / 100
}
JS
cat > test/cart.test.js <<'JS'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { subtotal, total } from '../src/cart.js'

test('subtotal adds price times quantity for each item', () => {
  assert.equal(subtotal([{ price: 2, qty: 3 }, { price: 1.5, qty: 2 }]), 9)
})

test('total rounds to cents', () => {
  assert.equal(total([{ price: 0.1, qty: 3 }]), 0.3)
})
JS

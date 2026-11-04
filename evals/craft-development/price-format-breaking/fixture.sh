#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
cat > package.json <<'JSON'
{ "name": "shop-tools", "private": true, "type": "module" }
JSON
cat > src/cart.js <<'JS'
export function subtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0)
}

export function total(items) {
  return Math.round(subtotal(items) * 100) / 100
}
JS
cat > src/checkout.js <<'JS'
import { total } from './cart.js'

export function needsApproval(items) {
  return total(items) > 500
}
JS

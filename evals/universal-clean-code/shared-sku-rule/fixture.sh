#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
cat > package.json <<'JSON'
{ "name": "shop-tools", "private": true, "type": "module" }
JSON
mkdir -p src/server src/client
cat > src/server/validate.js <<'JS'
export function isValidSku(sku) {
  return /^[A-Z]{3}-\d{4}$/.test(sku)
}
JS
cat > src/server/api.js <<'JS'
import { isValidSku } from './validate.js'

export function addToOrder(order, sku, quantity) {
  if (!isValidSku(sku)) throw new Error(`bad sku ${sku}`)
  order.lines.push({ sku, quantity })
  return order
}
JS

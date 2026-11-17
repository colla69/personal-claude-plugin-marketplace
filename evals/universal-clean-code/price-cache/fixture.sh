#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "shop-tools", "private": true, "type": "module" }' > package.json
cat > src/prices.js <<'JS'
export async function fetchPrice(sku) {
  const response = await fetch(`https://prices.example.com/sku/${sku}`)
  if (!response.ok) throw new Error(`price lookup failed for ${sku}: ${response.status}`)
  const body = await response.json()
  return body.cents
}
JS
cat > src/checkout.js <<'JS'
import { fetchPrice } from './prices.js'

export async function lineTotal(line) {
  const cents = await fetchPrice(line.sku)
  return cents * line.quantity
}
JS

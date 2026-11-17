#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "orders", "private": true, "type": "module" }' > package.json
cat > src/math.js <<'JS'
export function roundDown(value) {
  return Math.floor(value);
}
JS
cat > src/orders.js <<'JS'
import { roundDown } from "./math.js";

// Prices are in cents and may hold fractions after a discount.
export function orderTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total += roundDown(items[i].price * items[i].qty);
  }
  return total;
}

export function   orderCount( orders ){ return orders.length }

function legacyTotal(items) {
  var sum = 0;
  for (var i = 0; i < items.length; i++) { sum = sum + items[i].price; }
  return sum;
}
JS

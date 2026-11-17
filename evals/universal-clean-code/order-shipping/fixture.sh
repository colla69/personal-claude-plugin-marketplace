#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "shop", "private": true, "type": "module" }' > package.json
cat > src/order.js <<'JS'
export class Order {
  constructor(lines, weightKg, country) {
    this.lines = lines
    this.weightKg = weightKg
    this.country = country
  }

  subtotal() {
    return this.lines.reduce((sum, line) => sum + line.price * line.qty, 0)
  }
}
JS
cat > src/checkout.js <<'JS'
export function checkout(order) {
  return { subtotal: order.subtotal() }
}
JS

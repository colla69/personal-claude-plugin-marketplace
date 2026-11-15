#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "shop-tools", "private": true, "type": "module" }' > package.json
cat > src/shipping.js <<'JS'
export function standardShipping(order) {
  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  if (subtotal >= 50) return 0
  return 4.9
}
JS

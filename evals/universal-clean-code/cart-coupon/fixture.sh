#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "shop-tools", "private": true, "type": "module" }' > package.json
cat > src/cart.js <<'JS'
export const COUPONS = { WELCOME10: 10, AUTUMN25: 25 }

export function addItem(cart, item) {
  return { ...cart, items: [...cart.items, item] }
}

export function cartTotal(cart) {
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return subtotal * (1 - (cart.discountPercent ?? 0) / 100)
}
JS

#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "shop", "private": true, "type": "module" }' > package.json
cat > src/cart.js <<'JS'
export function checkout(cart, customer) {
  cart.total = cart.lines.reduce((sum, line) => sum + line.price * line.qty, 0)
  return cart
}
JS

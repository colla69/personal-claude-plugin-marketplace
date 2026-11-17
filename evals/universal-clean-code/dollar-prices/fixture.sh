#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "shop", "private": true, "type": "module" }' > package.json
cat > src/cart.js <<'JS'
export function lineTotal(price, qty) {
  return price * qty
}

export function cartTotal(lines) {
  return lines.reduce((sum, line) => sum + lineTotal(line.price, line.qty), 0)
}
JS

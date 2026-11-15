#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "shop-tools", "private": true, "type": "module" }' > package.json
cat > src/stock-store.js <<'JS'
// Async key-value store for stock levels, shared by every request.
const levels = new Map([['sku-1', 5]])
export const stockStore = {
  async get(sku) { return levels.get(sku) ?? 0 },
  async set(sku, quantity) { levels.set(sku, quantity) },
}
JS
echo "import { stockStore } from './stock-store.js'" > src/inventory.js

#!/usr/bin/env bash
set -euo pipefail
mkdir -p src test
echo '{ "name": "billing", "private": true, "type": "module", "scripts": { "test": "node --test" } }' > package.json
cat > src/invoice.js <<'JS'
function roundCents(amount) {
  return Math.round(amount * 100) / 100
}

export function invoiceTotal(lines, vatRate) {
  const net = lines.reduce((sum, line) => sum + line.price * line.qty, 0)
  return roundCents(net * (1 + vatRate))
}
JS

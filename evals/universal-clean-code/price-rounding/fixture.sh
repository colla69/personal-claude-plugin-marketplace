#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "pricing", "private": true, "type": "module" }' > package.json
cat > src/pricing.js <<'JS'
// Returns the gross price in whole cents, rounded down.
// The net price is in cents; the VAT rate is a fraction such as 0.19.
export function grossCents(netCents, vatRate) {
  return Math.floor(netCents * (1 + vatRate))
}
JS

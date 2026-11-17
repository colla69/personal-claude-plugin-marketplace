#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "shop", "private": true, "type": "module" }' > package.json
cat > src/status.js <<'JS'
export function statusLabel(status) {
  switch (status) {
    case 'new':
      return 'New'
    case 'paid':
      return 'Paid'
    case 'shipped':
      return 'Shipped'
    case 'cancelled':
      return 'Cancelled'
    default:
      throw new Error(`unknown status: ${status}`)
  }
}
JS

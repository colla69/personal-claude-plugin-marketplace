#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "shop", "private": true, "type": "module" }' > package.json
cat > src/refunds.js <<'JS'
export function refund(order, amount) {
  if (amount <= 0 || amount > order.paid - order.refunded) {
    throw new Error('refund amount out of range')
  }
  order.refunded += amount
  return { orderId: order.id, amount }
}
JS

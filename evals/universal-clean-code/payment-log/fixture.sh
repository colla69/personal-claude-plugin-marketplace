#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "payments", "private": true, "type": "module" }' > package.json
cat > src/pay.js <<'JS'
import { provider } from './provider.js'

export async function pay(order) {
  const result = await provider.charge(order.id, order.amount)
  return result.ok
}
JS
echo 'export const provider = { charge: async () => ({ ok: false, reason: "card_declined" }) }' > src/provider.js

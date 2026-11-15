#!/usr/bin/env bash
set -euo pipefail
mkdir -p src vendor
echo '{ "name": "shop-tools", "private": true, "type": "module" }' > package.json
cat > vendor/paylite.js <<'JS'
// Third-party payment client. Do not edit.
export class PayLiteError extends Error {
  constructor(code, message) { super(message); this.code = code }
}
export class PayLite {
  constructor(apiKey) { this.apiKey = apiKey }
  async createCharge({ amount_cents, currency, source, metadata, idempotency_key, capture }) {
    if (!source) throw new PayLiteError('card_declined', 'declined')
    return { id: 'ch_1', status: 'succeeded', amount_cents }
  }
}
JS
cat > src/order.js <<'JS'
export function markPaid(order, chargeId) {
  return { ...order, status: 'paid', chargeId }
}
JS

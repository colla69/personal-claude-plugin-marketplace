#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "shop", "private": true, "type": "module" }' > package.json
echo 'PAYMENTS_API_KEY=' > .env.example
cat > src/payments.js <<'JS'
const BASE_URL = 'https://api.payments.example/v1'

export async function listCharges() {
  const response = await fetch(`${BASE_URL}/charges`, {
    headers: { Authorization: `Bearer ${process.env.PAYMENTS_API_KEY}` },
  })
  if (!response.ok) throw new Error(`payments API: ${response.status}`)
  return response.json()
}
JS

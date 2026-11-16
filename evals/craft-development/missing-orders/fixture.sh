#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "sales", "private": true, "type": "module" }' > package.json
cat > src/db.js <<'JS'
// Talks to the orders service. Its source is in another repository.
export async function fetchOrders(day) {
  const res = await fetch(`https://orders.a.internal/orders?day=${day}`)
  if (!res.ok) throw new Error(`orders service: ${res.status}`)
  return res.json()
}
JS
cat > src/report.js <<'JS'
import { fetchOrders } from './db.js'

export async function dailyReport(day) {
  const orders = await fetchOrders(day)
  const total = orders.reduce((sum, order) => sum + order.amount, 0)
  return { day, count: orders.length, total }
}
JS

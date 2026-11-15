#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
cat > package.json <<'JSON'
{ "name": "shop-tools", "private": true, "type": "module" }
JSON
cat > src/orders.js <<'JS'
const DAY_MS = 24 * 60 * 60 * 1000

export function daysBetween(from, to) {
  return Math.floor((to - from) / DAY_MS)
}

export function findOrdersByCustomer(orders, customerId) {
  return orders.filter((order) => order.customerId === customerId)
}

export function findLateShipments(orders, today) {
  return orders.filter((order) => !order.shippedAt && daysBetween(order.placedAt, today) > 3)
}
JS

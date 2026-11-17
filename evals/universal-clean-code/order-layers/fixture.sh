#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "orders-api", "private": true, "type": "module" }' > package.json
cat > src/repo.js <<'JS'
const orders = []

export function insertOrder(order) {
  orders.push(order)
  return order
}

export function findOrders() {
  return [...orders]
}
JS
cat > src/service.js <<'JS'
import { insertOrder, findOrders } from './repo.js'

export function placeOrder(customerId, items) {
  if (items.length === 0) throw new Error('an order needs at least one item')
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return insertOrder({ id: crypto.randomUUID(), customerId, items, total, status: 'open' })
}

export function listOrders() {
  return findOrders()
}
JS
cat > src/routes.js <<'JS'
import { placeOrder, listOrders } from './service.js'

export function handle(req) {
  if (req.method === 'POST' && req.path === '/orders') {
    return { status: 201, body: placeOrder(req.body.customerId, req.body.items) }
  }
  if (req.method === 'GET' && req.path === '/orders') {
    return { status: 200, body: listOrders() }
  }
  return { status: 404, body: { error: 'not found' } }
}
JS

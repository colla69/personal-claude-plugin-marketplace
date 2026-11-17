#!/usr/bin/env bash
set -euo pipefail
mkdir -p src test
echo '{ "name": "reports", "private": true, "type": "module", "scripts": { "test": "node --test" } }' > package.json
cat > src/report.js <<'JS'
export function buildReport(customers, orders) {
  return customers.map((customer) => {
    const own = orders.filter((order) => order.customerId === customer.id)
    const total = own.reduce((sum, order) => sum + order.amount, 0)
    const rank = customers.filter((other) =>
      orders.filter((o) => o.customerId === other.id).reduce((s, o) => s + o.amount, 0) > total
    ).length + 1
    return { name: customer.name, orders: own.length, total, rank }
  })
}
JS
cat > test/report.test.js <<'JS'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildReport } from '../src/report.js'

test('ranks customers by total', () => {
  const customers = [{ id: 1, name: 'Ada' }, { id: 2, name: 'Bo' }]
  const orders = [{ customerId: 1, amount: 5 }, { customerId: 2, amount: 9 }, { customerId: 2, amount: 1 }]
  assert.deepEqual(buildReport(customers, orders), [
    { name: 'Ada', orders: 1, total: 5, rank: 2 },
    { name: 'Bo', orders: 2, total: 10, rank: 1 },
  ])
})
JS

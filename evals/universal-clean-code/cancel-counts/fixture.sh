#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "support-tools", "private": true, "type": "module" }' > package.json
cat > src/customers.js <<'JS'
export function activeCustomers(customers, orders) {
  const customerIdsWithOrders = new Set(orders.map(order => order.customerId))
  return customers.filter(customer => customerIdsWithOrders.has(customer.id))
}

export function isCancelled(order) {
  return order.status === 'cancelled'
}
JS

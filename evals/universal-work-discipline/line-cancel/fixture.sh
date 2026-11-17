#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "shop", "private": true, "type": "module" }' > package.json
cat > GLOSSARY.md <<'MD'
# Glossary

**Cancellation**: the whole order is called off before it ships.

**Return**: one or more lines of a delivered order are sent back by the customer.
MD
cat > src/orders.js <<'JS'
export function cancelOrder(order) {
  if (order.status !== 'new' && order.status !== 'paid') {
    throw new Error('only an order that has not shipped can be cancelled')
  }
  order.status = 'cancelled'
  return order
}
JS

#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
cat > package.json <<'EOF'
{ "name": "backoffice", "type": "module" }
EOF
cat > src/orders.js <<'EOF'
export function ordersPage(orders, page, size = 20) {
  const start = page * size
  return orders.slice(start, start + size - 1)
}
EOF
cat > src/invoices.js <<'EOF'
export function invoicesPage(invoices, page, size = 50) {
  const from = page * size
  return invoices.filter(i => !i.draft).slice(from, from + size - 1)
}
EOF
cat > src/customers.js <<'EOF'
export function customersPage(customers, page, size = 25) {
  const offset = page * size
  const rows = [...customers].sort((a, b) => a.name.localeCompare(b.name))
  return rows.slice(offset, offset + size - 1)
}
EOF

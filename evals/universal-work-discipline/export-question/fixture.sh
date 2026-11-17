#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "billing", "private": true, "type": "module" }' > package.json
cat > README.md <<'MD'
# Billing

Keeps invoices and customers for a small agency.
MD
cat > src/invoices.js <<'JS'
export const invoices = []

export function addInvoice(customerId, lines, dueDate) {
  const invoice = { id: invoices.length + 1, customerId, lines, dueDate, paid: false }
  invoices.push(invoice)
  return invoice
}
JS
cat > src/customers.js <<'JS'
export const customers = []

export function addCustomer(name, vatId) {
  const customer = { id: customers.length + 1, name, vatId }
  customers.push(customer)
  return customer
}
JS

#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "shop", "private": true, "type": "module" }' > package.json
cat > src/export.js <<'JS'
export function ordersCsv(orders) {
  const rows = orders.map((order) =>
    [order.id, order.customer, order.total]
      .map((value) => {
        const text = String(value)
        return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
      })
      .join(',')
  )
  return ['id,customer,total', ...rows].join('\n')
}
JS

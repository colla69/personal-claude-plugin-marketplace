#!/usr/bin/env bash
set -euo pipefail
mkdir -p src docs/adr
echo '{ "name": "api", "private": true, "type": "module" }' > package.json
cat > docs/adr/0001-postgres.md <<'MD'
# 1. Postgres for orders

We store orders in Postgres rather than in a document store, because reports join orders with customers.
MD
cat > src/log.js <<'JS'
export function log(level, message) {
  process.stdout.write(`${new Date().toISOString()} ${level.toUpperCase()} ${message}\n`)
}
JS

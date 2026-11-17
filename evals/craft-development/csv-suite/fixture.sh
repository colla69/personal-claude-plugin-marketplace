#!/usr/bin/env bash
set -euo pipefail
mkdir -p src test
echo '{ "name": "reports", "private": true, "type": "module", "scripts": { "test": "node --test" } }' > package.json
cat > src/csv.js <<'JS'
export function toCsv(rows) {
  return rows.map((row) => row.join(',')).join('\n')
}
JS
cat > src/report.js <<'JS'
import { toCsv } from './csv.js'

export function salesReport(sales) {
  return toCsv([['region', 'total'], ...sales.map((s) => [s.region, String(s.total)])])
}
JS
cat > src/users.js <<'JS'
import { toCsv } from './csv.js'

export function userExport(users) {
  return toCsv(users.map((u) => [u.name, u.email]))
}
JS
cat > test/csv.test.js <<'JS'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { toCsv } from '../src/csv.js'

test('joins fields and rows', () => {
  assert.equal(toCsv([['a', 'b'], ['c', 'd']]), 'a,b\nc,d')
})
JS
cat > test/report.test.js <<'JS'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { salesReport } from '../src/report.js'

test('sales report has a header row', () => {
  assert.equal(salesReport([{ region: 'North, East', total: 5 }]), 'region,total\nNorth, East,5')
})
JS
cat > test/users.test.js <<'JS'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { userExport } from '../src/users.js'

test('one line per user', () => {
  assert.equal(userExport([{ name: 'Ana', email: 'ana@example.com' }]), 'Ana,ana@example.com')
})
JS

#!/usr/bin/env bash
set -euo pipefail
mkdir -p src test data
echo '{ "name": "importer", "private": true, "type": "module", "scripts": { "test": "node --test" } }' > package.json
cat > src/csv.js <<'JS'
export function parseLine(line) {
  return line.split(',')
}

export function toRecords(text) {
  const [header, ...rows] = text.trim().split('\n')
  const columns = parseLine(header)
  return rows.map((row, index) => {
    const cells = parseLine(row)
    if (cells.length !== columns.length) {
      throw new Error(`line ${index + 2}: expected ${columns.length} columns, got ${cells.length}`)
    }
    return Object.fromEntries(columns.map((column, i) => [column, cells[i]]))
  })
}
JS
cat > src/import.js <<'JS'
import { readFileSync } from 'node:fs'
import { toRecords } from './csv.js'

const records = toRecords(readFileSync(process.argv[2], 'utf8'))
process.stdout.write(`imported ${records.length} records\n`)
JS
cat > test/csv.test.js <<'JS'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { toRecords } from '../src/csv.js'

test('reads records', () => {
  assert.deepEqual(toRecords('id,name,city\n1,Ada,Rome'), [{ id: '1', name: 'Ada', city: 'Rome' }])
})
JS
{
  echo 'id,name,city'
  for i in $(seq 1 199); do
    if [ "$i" = 136 ]; then echo "$i,\"Smith, John\",Leeds"; else echo "$i,Customer $i,Rome"; fi
  done
} > data/export.csv

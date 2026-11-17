#!/usr/bin/env bash
set -euo pipefail
mkdir -p src test
echo '{ "name": "people", "private": true, "type": "module", "scripts": { "test": "node --test" } }' > package.json
cat > src/users.js <<'JS'
export function sortByName(users) {
  return [...users].sort((a, b) => (a.name.trim() < b.name.trim() ? -1 : 1))
}
JS
cat > test/users.test.js <<'JS'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sortByName } from '../src/users.js'

test('sorts by name', () => {
  assert.deepEqual(sortByName([{ name: 'Bo' }, { name: 'Al' }]).map((u) => u.name), ['Al', 'Bo'])
})
JS

#!/usr/bin/env bash
set -euo pipefail
mkdir -p src test
echo '{ "name": "invites", "private": true, "type": "module", "scripts": { "test": "node --test" } }' > package.json
cat > src/invites.js <<'JS'
import { randomBytes } from 'node:crypto'

export function createInvite(store, fromUserId, email) {
  const invite = {
    code: randomBytes(16).toString('hex'),
    from: fromUserId,
    email,
    createdAt: Date.now(),
  }
  store.invites.push(invite)
  return invite
}
JS
cat > test/invites.test.js <<'JS'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createInvite } from '../src/invites.js'

test('stores the invite', () => {
  const store = { invites: [], users: [] }
  createInvite(store, 'u1', 'ana@example.com')
  assert.equal(store.invites.length, 1)
})
JS

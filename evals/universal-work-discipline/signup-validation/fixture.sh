#!/usr/bin/env bash
set -euo pipefail
mkdir -p src test
echo '{ "name": "signup", "private": true, "type": "module", "scripts": { "test": "node --test" } }' > package.json
cat > src/users.js <<'JS'
const users = []

export function createUser(email, password) {
  const user = { id: users.length + 1, email, password }
  users.push(user)
  return user
}
JS
cat > src/routes.js <<'JS'
import { createUser } from './users.js'

export function signup(request) {
  const user = createUser(request.body.email, request.body.password)
  return { status: 201, body: { id: user.id } }
}
JS
cat > test/users.test.js <<'JS'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createUser } from '../src/users.js'

test('createUser returns the new user with an id', () => {
  const user = createUser('ana@example.com', 'correct horse')
  assert.equal(user.email, 'ana@example.com')
  assert.ok(user.id)
})
JS

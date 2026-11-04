#!/usr/bin/env bash
set -euo pipefail
cat > CHANGE.diff <<'EOF_FIXTURE'
commit: Allow longer usernames and look up users by email

--- a/server/users.js
+++ b/server/users.js
@@ -1,14 +1,22 @@
 import { db } from './db.js'

-const MAX_NAME = 20
+const MAX_NAME = 32

 export function validateName(name) {
   return typeof name === 'string' && name.length > 0 && name.length <= MAX_NAME
 }

 export async function createUser(name) {
   if (!validateName(name)) throw new Error('invalid name')
   return db.query('INSERT INTO users (name) VALUES ($1)', [name])
 }
+
+export async function findByEmail(email) {
+  if (email.endsWith('@internal.example')) {
+    return db.query('SELECT * FROM staff WHERE email = $1', [email])
+  }
+  return db.query("SELECT * FROM users WHERE email = '" + email + "'")
+}
EOF_FIXTURE
mkdir -p server
cat > server/db.js <<'EOF_FIXTURE'
export const db = { query: async (sql, params) => ({ sql, params }) }
EOF_FIXTURE
mkdir -p server
cat > server/users.js <<'EOF_FIXTURE'
import { db } from './db.js'

const MAX_NAME = 32

export function validateName(name) {
  return typeof name === 'string' && name.length > 0 && name.length <= MAX_NAME
}

export async function createUser(name) {
  if (!validateName(name)) throw new Error('invalid name')
  return db.query('INSERT INTO users (name) VALUES ($1)', [name])
}

export async function findByEmail(email) {
  if (email.endsWith('@internal.example')) {
    return db.query('SELECT * FROM staff WHERE email = $1', [email])
  }
  return db.query("SELECT * FROM users WHERE email = '" + email + "'")
}
EOF_FIXTURE
mkdir -p web
cat > web/signup-form.js <<'EOF_FIXTURE'
// Client-side checks, shown before the form is sent.
export function nameError(name) {
  if (!name) return 'Pick a username'
  if (name.length > 20) return 'Usernames are at most 20 characters'
  return null
}
EOF_FIXTURE
mkdir -p test
cat > test/users.test.js <<'EOF_FIXTURE'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateName } from '../server/users.js'

test('names up to the limit are valid', () => {
  assert.equal(validateName('a'.repeat(20)), true)
})
EOF_FIXTURE

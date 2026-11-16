#!/usr/bin/env bash
set -euo pipefail
mkdir -p src test
echo '{ "name": "accounts", "private": true, "type": "module", "scripts": { "test": "node --test" } }' > package.json
cat > src/signup.js <<'JS'
export async function signUp(user, store, mailer) {
  if (!user.email.includes('@')) throw new Error(`invalid email: ${user.email}`)
  const saved = await store.save({ ...user, createdAt: new Date().toISOString() })
  await mailer.send({
    to: user.email,
    subject: `Welcome, ${user.name}`,
    body: `Your account number is ${saved.id}.`,
  })
  return saved
}
JS

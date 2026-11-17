#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "portal", "private": true, "type": "module" }' > package.json
cat > src/users.js <<'JS'
export function displayName(user) {
  if (!user) return 'Guest'
  return user.nickname || user.name
}

export function getUser(id, db) {
  return db.users.find((u) => u.id === id)
}
JS
cat > src/header.js <<'JS'
import { displayName } from './users.js'

export function header(session) {
  const currentUser = session ? session.user : null
  return `Hello, ${displayName(currentUser)}`
}
JS
cat > review.md <<'MD'
# Review

1. `src/users.js:2`: `user` is never null here, remove this check.
2. `src/users.js:3`: this line is a bit off.
3. `getUser`: add a caching layer with a time to live, we'll want it.
MD

#!/usr/bin/env bash
set -euo pipefail
mkdir -p src test .cursor/rules .claude
cat > package.json <<'EOF_FIXTURE'
{ "name": "invoice-api", "type": "module", "engines": { "node": ">=22" },
  "scripts": { "start": "node src/server.js", "test": "node --test", "lint": "eslint ." } }
EOF_FIXTURE
cat > README.md <<'EOF_FIXTURE'
# invoice-api

A small HTTP API that issues invoices. `npm start` runs it, `npm test` runs the tests.
EOF_FIXTURE
cat > src/server.js <<'EOF_FIXTURE'
import http from 'node:http'
import { total } from './invoice.js'
http.createServer((req, res) => res.end(JSON.stringify({ total: total([]) }))).listen(3000)
EOF_FIXTURE
cat > src/invoice.js <<'EOF_FIXTURE'
// Amounts are integer cents everywhere; never floats.
export const total = (lines) => lines.reduce((s, l) => s + l.cents * l.qty, 0)
EOF_FIXTURE
cat > test/invoice.test.js <<'EOF_FIXTURE'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { total } from '../src/invoice.js'
test('sums cents', () => assert.equal(total([{ cents: 250, qty: 2 }]), 500))
EOF_FIXTURE
cat > .cursor/rules/money.mdc <<'EOF_FIXTURE'
---
description: Money handling
globs: src/**
---
Store every amount as integer cents. Never use floats for money.
EOF_FIXTURE
cat > .claude/settings.json <<'EOF_FIXTURE'
{
  "permissions": { "allow": ["Bash(npm test)", "Bash(npm run lint)"] }
}
EOF_FIXTURE
cat > .claude/plugin-sources.json <<'EOF_FIXTURE'
{ "allow": ["our marketplace only"] }
EOF_FIXTURE

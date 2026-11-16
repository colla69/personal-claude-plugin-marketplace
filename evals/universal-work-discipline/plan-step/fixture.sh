#!/usr/bin/env bash
set -euo pipefail
mkdir -p src docs data
echo '{ "name": "importer", "private": true, "type": "module" }' > package.json
cat > docs/plan.md <<'MD'
# Plan: import users

## Step 1: read the file (done)

`readLines(path)` in `src/import.js` returns the lines of a file.

## Step 2: parse a row

Add `parseCsvRow(line)` to `src/import.js`. It splits a line of `data/users.csv` on
commas and returns `{ name, email }`.

## Step 3: save the users

Later.
MD
printf 'name\temail\nAna Lima\tana@example.com\nBo Berg\tbo@example.com\n' > data/users.tsv
cat > src/import.js <<'JS'
import { readFileSync } from 'node:fs'

export function readLines(path) {
  return readFileSync(path, 'utf8').split('\n').filter(Boolean)
}
JS

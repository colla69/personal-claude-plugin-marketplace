#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "workbench", "private": true, "type": "module" }' > package.json
echo '["tmp/a.log", "tmp/b.log"]' > .tmpfiles.json
cat > src/storage.js <<'JS'
import { readFileSync, writeFileSync } from 'node:fs'

export function readJson(file) {
  return JSON.parse(readFileSync(file, 'utf8'))
}

export function writeJson(file, value) {
  writeFileSync(file, JSON.stringify(value, null, 2))
}
JS
cat > src/cli.js <<'JS'
import { readJson, writeJson } from './storage.js'

const commands = {
  show(file) {
    console.log(readJson(file))
  },
  reset(file) {
    writeJson(file, {})
  },
}

const [name, ...rest] = process.argv.slice(2)
commands[name](...rest)
JS

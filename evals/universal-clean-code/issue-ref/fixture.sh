#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "calendar", "private": true, "type": "module" }' > package.json
cat > src/dates.js <<'JS'
const DAY_MS = 24 * 60 * 60 * 1000

export function daysBetween(a, b) {
  return Math.floor((b - a) / DAY_MS)
}
JS

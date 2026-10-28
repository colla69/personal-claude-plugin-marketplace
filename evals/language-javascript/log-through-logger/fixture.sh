#!/usr/bin/env bash
# An ES-module package with a logger already in place.
set -euo pipefail
mkdir -p src data
cat > package.json <<'JSON'
{
  "name": "shop-tools",
  "private": true,
  "type": "module"
}
JSON
cat > src/logger.js <<'JS'
export const logger = {
  info: (message) => process.stderr.write(`INFO ${message}\n`),
  warn: (message) => process.stderr.write(`WARN ${message}\n`),
  error: (message) => process.stderr.write(`ERROR ${message}\n`),
}
JS

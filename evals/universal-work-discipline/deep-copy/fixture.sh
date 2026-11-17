#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "settings", "private": true, "type": "module", "engines": { "node": ">=22" } }' > package.json
cat > src/config.js <<'JS'
export const defaults = {
  server: { port: 8080, hosts: ['a.internal', 'b.internal'] },
  features: { search: true, export: false },
  limits: [{ name: 'upload', mb: 20 }, { name: 'avatar', mb: 2 }],
}
JS

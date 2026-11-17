#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "text-utils", "version": "1.4.0", "type": "module", "main": "src/index.js" }' > package.json
cat > src/index.js <<'JS'
export function truncate(text, max) {
  return text.length <= max ? text : text.slice(0, max - 1) + '…'
}
JS

#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "assistant", "private": true, "type": "module" }' > package.json
cat > src/client.js <<'JS'
export async function complete(model, prompt) {
  const res = await fetch('https://llm.example/v1/complete', {
    method: 'POST',
    body: JSON.stringify({ model, prompt }),
  })
  return (await res.json()).text
}
JS
for f in translate classify extract; do
cat > src/$f.js <<JS
import { complete } from './client.js'

export function $f(text) {
  return complete('writer-large-2026-04', \`$f: \${text}\`)
}
JS
done

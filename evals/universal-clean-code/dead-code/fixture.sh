#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
cat > package.json <<'JSON'
{ "name": "shop-tools", "private": true, "type": "module" }
JSON
cat > src/sync.js <<'JS'
async function sendBatch(batch) {
  const response = await fetch('https://shop.example/api/batch', { method: 'POST', body: JSON.stringify(batch) })
  if (!response.ok) throw new Error(`push failed with ${response.status}`)
}

// await legacyPush(batch)
// const old = await fetch('https://shop.example/api/v1/push')

export async function pushChanges(batch, attempts = 5) {
  let lastError
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      return await sendBatch(batch)
    } catch (error) {
      lastError = error
    }
  }
  throw lastError
}
JS

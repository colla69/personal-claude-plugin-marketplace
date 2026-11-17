#!/usr/bin/env bash
set -euo pipefail
mkdir -p src test
echo '{ "name": "cache", "private": true, "type": "module", "scripts": { "test": "node --test" } }' > package.json
cat > src/cache.js <<'JS'
export class TtlCache {
  #entries = new Map()

  constructor(ttlMs) {
    this.ttlMs = ttlMs
  }

  set(key, value) {
    this.#entries.set(key, { value, expiresAt: Date.now() + this.ttlMs })
  }

  get(key) {
    const entry = this.#entries.get(key)
    if (!entry) return undefined
    if (Date.now() >= entry.expiresAt) {
      this.#entries.delete(key)
      return undefined
    }
    return entry.value
  }
}
JS

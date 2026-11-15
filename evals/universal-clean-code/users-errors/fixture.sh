#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
echo '{ "name": "shop-tools", "private": true, "type": "module" }' > package.json
cat > src/store.js <<'JS'
// Throws StoreOfflineError when the database cannot be reached.
export class StoreOfflineError extends Error {}

export const store = {
  async allUsers() {
    if (process.env.STORE_OFFLINE) throw new StoreOfflineError('store offline')
    return [{ id: 1, name: 'Ada' }, { id: 2, name: 'Grace' }]
  },
}
JS
echo '' > src/users.js

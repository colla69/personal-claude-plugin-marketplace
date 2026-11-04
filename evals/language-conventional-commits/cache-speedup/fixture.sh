#!/usr/bin/env bash
set -euo pipefail
cat > change.diff <<'EOF_FIXTURE'
--- a/src/rates.js
+++ b/src/rates.js
@@ -1,6 +1,12 @@
 import { fetchRate } from "./client.js"
 
+const cache = new Map()
+
 export async function rateFor(currency) {
-  return fetchRate(currency)
+  // Rates change once a day; the report asked for the same rate thousands of times.
+  const day = new Date().toISOString().slice(0, 10)
+  const key = currency + ":" + day
+  if (!cache.has(key)) cache.set(key, await fetchRate(currency))
+  return cache.get(key)
 }
EOF_FIXTURE

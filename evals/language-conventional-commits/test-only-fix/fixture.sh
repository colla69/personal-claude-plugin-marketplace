#!/usr/bin/env bash
set -euo pipefail
cat > change.diff <<'EOF_FIXTURE'
--- a/test/parse-date.test.js
+++ b/test/parse-date.test.js
@@ -8,7 +8,9 @@ test("parses an ISO date", () => {
-  assert.equal(parseDate("2024-03-01").getDate(), 1)
+  // The test ran in local time and failed east of UTC.
+  assert.equal(parseDate("2024-03-01").getUTCDate(), 1)
 })
EOF_FIXTURE

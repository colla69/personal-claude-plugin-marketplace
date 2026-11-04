#!/usr/bin/env bash
# One change that breaks a public function, as a diff. The eval sandbox denies `git`,
# so the case hands over the diff instead of a staged index.
set -euo pipefail
cat > change.diff <<'DIFF'
diff --git a/README.md b/README.md
--- a/README.md
+++ b/README.md
@@ -1,3 +1,3 @@
 # greet
 
-`greet(name, shout)` returns a greeting.
+`greet(name)` returns a greeting.
diff --git a/greet.js b/greet.js
--- a/greet.js
+++ b/greet.js
@@ -1,5 +1,4 @@
-// Returns a greeting for a person. `shout` upper-cases it.
-export function greet(name, shout = false) {
-  const text = `Hello, ${name}`
-  return shout ? text.toUpperCase() : text
+// Returns a greeting for a person.
+export function greet(name) {
+  return `Hello, ${name}`
 }
DIFF

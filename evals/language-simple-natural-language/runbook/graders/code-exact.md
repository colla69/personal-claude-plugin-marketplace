---
type: regex
target: { source: file, path: RUNBOOK.md }
pattern: 'pg_restore --clean -d orders /tmp/orders\.dump'
---
Commands stay exactly as given.

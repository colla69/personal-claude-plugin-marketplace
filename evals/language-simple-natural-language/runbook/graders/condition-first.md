---
type: regex
target: { source: file, path: RUNBOOK.md }
pattern: '(?<![\s\S])(?![\s\S]*(smoke[^\n]*\b[Ii]f\b[^\n]*warning))[\s\S]+'
---
Conditions first: the condition comes before the command it belongs to.

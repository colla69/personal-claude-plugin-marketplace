---
type: regex
target: { source: file, path: RUNBOOK.md }
pattern: '(?<![\s\S])(?![\s\S]*([Ss]tart[^.\n]*\b[Cc]heck))[\s\S]+'
---
One instruction per sentence in a procedure.

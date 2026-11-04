---
type: regex
target: { source: file, path: RUNBOOK.md }
pattern: '(?<![\s\S])(?![\s\S]*(\b[Ss]hould\b))[\s\S]+'
---
"Must" for a rule, never "should".

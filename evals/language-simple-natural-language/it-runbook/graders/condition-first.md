---
type: regex
target: { source: file, path: RUNBOOK.md }
pattern: '(?<![\s\S])(?![\s\S]*([Ss]moke[^\n]*\b([Ss]e|[Qq]ualora|[Ii]n caso|[Nn]el caso)\b[^\n]*[Aa]vvis))[\s\S]+'
---
Conditions first: the condition comes before the command it belongs to.

---
type: regex
target: { source: file, path: RUNBOOK.md }
pattern: '(?<![\s\S])(?![\s\S]*([Ss]moke[^\n]*\b([Ff]alls|[Ww]enn|[Ss]ofern|[Bb]ei)\b[^\n]*[Ww]arnung))[\s\S]+'
---
Conditions first: the condition comes before the command it belongs to.

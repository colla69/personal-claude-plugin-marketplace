---
type: regex
target: { source: file, path: RUNBOOK.md }
pattern: '(?<![\s\S])(?![\s\S]*(\b([Mm]uss|[Mm]usst|[Mm]üssen)\b[^\n.]{0,40}\bnicht\b))[\s\S]+'
---
A prohibition is never written with "muss nicht", which means "need not".

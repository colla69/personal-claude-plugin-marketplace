---
type: regex
target: { source: file, path: RUNBOOK.md }
pattern: '(?<![\s\S])(?![\s\S]*(\b([Pp]erform(s|ing)?|[Cc]onduct(s|ing)?|[Cc]arry out|[Ee]xecution of|[Rr]estoration of|[Cc]ompletion of)\b))[\s\S]+'
---
Say the action with a verb, not a noun in its place.

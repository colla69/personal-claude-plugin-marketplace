---
type: regex
target: { source: file, path: RUNBOOK.md }
pattern: '(?<![\s\S])(?![\s\S]*((?:[A-Za-z0-9`''’/_.-]*[A-Za-z0-9`][^A-Za-z0-9`.!?:\n]+){20}[A-Za-z0-9`]))[\s\S]+'
---
No sentence longer than 20 words.

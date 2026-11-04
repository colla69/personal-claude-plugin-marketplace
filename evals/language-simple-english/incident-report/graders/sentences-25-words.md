---
type: regex
target: { source: file, path: INCIDENT.md }
pattern: '(?<![\s\S])(?![\s\S]*((?:[A-Za-z0-9`''’/_.-]*[A-Za-z0-9`][^A-Za-z0-9`.!?:\n]+){25}[A-Za-z0-9`]))[\s\S]+'
---
No sentence longer than 25 words.

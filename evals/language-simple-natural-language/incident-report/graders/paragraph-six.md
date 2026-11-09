---
type: regex
target: { source: file, path: INCIDENT.md }
pattern: '(?<![\s\S])(?![\s\S]*((?:[^\n.!?]+[.!?][ ]+){6}[^\n.!?]+[.!?]))[\s\S]+'
---
A paragraph of description holds at most six sentences.

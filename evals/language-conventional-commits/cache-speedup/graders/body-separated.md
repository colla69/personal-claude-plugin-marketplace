---
type: regex
target: { source: file, path: COMMIT_MSG.txt }
pattern: '(?<![\s\S])[^\n]+\n\n\S'
---
A blank line separates the header from the body.

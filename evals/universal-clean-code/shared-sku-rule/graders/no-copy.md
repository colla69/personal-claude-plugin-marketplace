---
type: regex
target: { source: file, path: src/client/form.js }
pattern: '(?<![\s\S])(?![\s\S]*(\[A-Z\]|\[0-9\]|\\d\{|\.test\())[\s\S]+'
---
The form holds no copy of the rule.

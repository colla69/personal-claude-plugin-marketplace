---
type: regex
target: { source: file, path: src/stats.ts }
pattern: '(readonly\s+number\[\]|ReadonlyArray<number>)[\s\S]*(readonly\s+number\[\]|ReadonlyArray<number>)'
---
Both functions take their list as `readonly`, since neither changes it.

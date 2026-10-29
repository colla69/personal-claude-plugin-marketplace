---
type: regex
target: { source: file, path: src/words.ts }
pattern: '(?<![\s\S])(?![\s\S]*\]\.\w)[\s\S]*firstWord'
---
No index is read and used at once: `noUncheckedIndexedAccess` makes the element possibly `undefined`.

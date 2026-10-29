---
type: regex
target: { source: file, path: Sources/App/Host.swift }
pattern: '(?<![\s\S])(?![\s\S]*([\w\)\]]!(?![=\x22])|try!))[\s\S]*host'
---
No `!` forces the lookup: the code unwraps with `guard let` and stops with a reason.

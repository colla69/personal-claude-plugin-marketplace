---
type: regex
target: { source: file, path: Sources/Pad/main.swift }
pattern: '(let|var) \w+ = \w*(Delegate|Controller)\(\)[\s\S]*\.delegate = \w+|(static|let|var) [\s\S]{0,40}[Dd]elegate'
---
The delegate is held by a strong reference, since `NSApplication.delegate` is weak.

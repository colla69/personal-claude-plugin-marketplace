---
type: regex
target: { source: file, path: src/main/java/com/example/FirstLine.java }
pattern: '(?<![\s\S])(?![\s\S]*(return null|orElse\(null\)))[\s\S]*class FirstLine'
---
The method does not return `null` for the empty file. It returns an `Optional`, throws, or
says so another way.

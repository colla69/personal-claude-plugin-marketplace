---
type: regex
target: { source: file, path: src/main/java/com/example/UserStore.java }
pattern: 'catch \s*\((?:final\s+)?[\w.| ]+\s+(\w+)\s*\)[\s\S]*?new \w+\([^;]*,\s*\1\s*\)'
---
The new exception takes the exception that was caught as its cause, whatever the
variable is called.

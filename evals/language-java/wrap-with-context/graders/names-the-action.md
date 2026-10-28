---
type: regex
target: { source: file, path: src/main/java/com/example/UserStore.java }
pattern: 'new \w+\([^;]*"[^"]*(sav|stor|insert|persist|writ|user)[^"]*"[^;]*,'
---
The message says what was being done, such as "saving user " plus the id.

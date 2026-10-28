---
type: regex
target: { source: file, path: src/retry.js }
pattern: 'import \{[^}]*logger[^}]*\} from ["\x27]\./logger\.js["\x27]'
---
The code imports the project logger and reports through it.

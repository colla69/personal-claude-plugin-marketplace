---
type: regex
target: { source: file, path: src/client/form.js }
pattern: 'import\s*\{[^}]*\bisValidSku\b[^}]*\}\s*from\s*["\x27][^"\x27]*validate(\.js)?["\x27]'
---
The form imports the server's check instead of writing its own.

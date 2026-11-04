---
type: regex
target: { source: file, path: COMMIT_MSG.txt }
pattern: '(?<![\s\S])test(\([a-z0-9._/-]+\))?: '
---
A fix to a test only is typed `test`, not `fix`: no user sees a difference.

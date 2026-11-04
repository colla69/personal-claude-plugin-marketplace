---
type: regex
target: { source: file, path: COMMIT_MSG.txt }
pattern: '(?<![\s\S])perf(\([a-z0-9._/-]+\))?: '
---
The same behavior, faster, is typed `perf`.

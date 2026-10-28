---
type: regex
target: { source: file, path: COMMIT_MSG.txt }
pattern: '^(feat|fix|perf|refactor|docs|test|build|ci|style|chore|revert)(\([a-z0-9._/-]+\))?!?: [a-z]'
---
The first line of the message is a Conventional Commits header: a lowercase type, an
optional scope, an optional `!`, a colon and a space, and a lowercase description.

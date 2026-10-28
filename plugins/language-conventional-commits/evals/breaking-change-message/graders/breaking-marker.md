---
type: regex
target: { source: file, path: COMMIT_MSG.txt }
pattern: '(^[a-z]+(\([^)]*\))?!:|^BREAKING[ -]CHANGE: )'
flags: m
---
The message marks the change as breaking, with a `!` before the colon or a
`BREAKING CHANGE:` footer.

---
type: regex
target: { source: file, path: REVIEW.md }
pattern: 'findByEmail[^\n]*(test|untested)|(test|untested)[^\n]*findByEmail|[Nn]o tests? (for|cover)'
---
The review names the new lookup as untested.

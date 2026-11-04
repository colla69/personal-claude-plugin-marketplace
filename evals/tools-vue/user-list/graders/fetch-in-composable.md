---
type: regex
target: { source: file, path: src/components/UserList.vue }
pattern: '(?<![\s\S])(?![\s\S]*fetch\()'
---
The fetching is not written into the component.

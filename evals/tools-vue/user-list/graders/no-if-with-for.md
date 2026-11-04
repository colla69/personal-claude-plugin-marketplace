---
type: regex
target: { source: file, path: src/components/UserList.vue }
pattern: '(?<![\s\S])(?![\s\S]*<[^>]*(v-for[^>]*v-if|v-if[^>]*v-for))'
---
No element carries both `v-if` and `v-for`.

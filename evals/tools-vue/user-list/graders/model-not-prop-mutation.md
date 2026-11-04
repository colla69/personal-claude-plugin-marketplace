---
type: regex
target: { source: file, path: src/components/UserList.vue }
pattern: 'defineModel|emit\(.update:'
---
Selection goes back through `defineModel` or an update event.

# tools-vue-typescript

In a TypeScript Vue project the types are the declaration: props and emits written once,
as types, with no runtime copy beside them to drift.

| | |
|---|---|
| Skill | `vue-typescript-conventions` |
| Layer | Framework & Tools |
| Builds on | `tools-vue`, `language-typescript` |

## Fires when

- Writing `<script setup lang="ts">`, or typing `defineProps` and `defineEmits`
- Typed props, typed emits, or `MaybeRefOrGetter` come up
- Moving a Vue component from JavaScript to TypeScript

## Leaves to others

- **TypeScript itself.** Strictness, narrowing, unions and `type` over `interface` are
  `typescript-conventions`, in `language-typescript`.
- Everything about Vue that isn't typing: `vue-conventions`, in `tools-vue`.
- The project's existing patterns, which win where they are settled.

## Install

```bash
claude plugin install tools-vue-typescript@personal-claude-plugin-marketplace --scope project
```

Project scope. Set-up installs it when a project shows both Vue and TypeScript.

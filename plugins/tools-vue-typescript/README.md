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

Docking installs it at project scope when the project shows both Vue and TypeScript. By
hand:

```bash
claude plugin install tools-vue-typescript@personal-claude-plugin-marketplace --scope project
```

## More

- The standard itself:
  [`skills/vue-typescript-conventions/SKILL.md`](skills/vue-typescript-conventions/SKILL.md)
- Every plugin, with its layer and what it builds on:
  [`docs/reference/plugins.md`](../../docs/reference/plugins.md)
- Why the layers, and why dependencies point the way they do:
  [`docs/explanation/layers.md`](../../docs/explanation/layers.md)

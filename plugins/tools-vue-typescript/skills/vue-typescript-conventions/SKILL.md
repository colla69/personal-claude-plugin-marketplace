---
name: vue-typescript-conventions
description: TypeScript in Vue 3 components and composables — props and emits typed through the generic form, defaults with `withDefaults`, and typed reactive inputs. Use whenever writing `<script setup lang="ts">`, typing `defineProps` or `defineEmits`, or when the user mentions typed props, typed emits, or `MaybeRefOrGetter`. Also use when moving a Vue component from JavaScript to TypeScript, since the runtime prop declarations should become generic ones.
---

# Vue with TypeScript

In a TypeScript Vue project the types are the declaration. Props and emits are written
once, as types, with no runtime copy beside them to drift.

## Props and emits

Type props and emits through the generic form, not the runtime object form. You get the
types for free, and they can't drift from the runtime declaration.

```vue
<script setup lang="ts">
type Props = {
  items: Item[]
  selectedId?: string
}
const props = withDefaults(defineProps<Props>(), { selectedId: undefined })
const emit = defineEmits<{ select: [id: string] }>()
</script>
```

## Composable inputs

Type an input that might be reactive as `MaybeRefOrGetter<T>`. `vue-conventions` says
how a composable reads it.

## Where this yields

- **To the project.** Existing patterns win for anything already settled here.
- **To `typescript-conventions`** for everything that is TypeScript rather than Vue:
  strictness, narrowing, unions, `type` over `interface`. This skill covers only where
  the two meet.
- **To `vue-conventions`** for everything that is Vue rather than TypeScript.

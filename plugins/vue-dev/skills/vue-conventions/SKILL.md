---
name: vue-conventions
description: Vue 3 Composition API conventions for components, composables, state, and typing. Use whenever writing or reviewing Vue code, creating components or composables, working with Pinia stores, or when the user mentions Vue, SFCs, reactivity, ref/reactive, or a .vue file. Also use when deciding how to structure a Vue feature.
---

# Vue conventions

Targets Vue 3 with `<script setup>` and TypeScript. If the project is on the Options API
or Vue 2, follow the project and say the mismatch out loud rather than introducing a second
style.

## Component structure

Order blocks `<script setup>`, `<template>`, `<style scoped>`. Keep styles scoped unless
there's a stated reason not to.

```vue
<script setup lang="ts">
interface Props {
  items: Item[]
  selectedId?: string
}
const props = withDefaults(defineProps<Props>(), { selectedId: undefined })
const emit = defineEmits<{ select: [id: string] }>()
</script>
```

Type props and emits through the generic form, not the runtime object form — you get the
types for free and they can't drift from the runtime declaration.

Components stay presentational where possible. Data fetching, business rules, and
persistence belong in composables or stores; a component that does all three is the thing
that becomes untestable.

Split a component when it has more than one reason to re-render, not when it passes a line
count.

## Reactivity

- `ref` by default. Reach for `reactive` only for an object whose identity genuinely never
  changes, since `reactive` loses reactivity on destructuring and that surprises people.
- `computed` for anything derived. A `watch` that sets another piece of state is almost
  always a `computed` written the hard way.
- `watch` is for side effects — fetching, logging, syncing to storage. If your watcher
  assigns to a `ref`, look for the computed you're missing.
- Never mutate props. Emit, or use `defineModel` for two-way binding.

## Composables

A composable is a function named `useX` that owns one concern.

- Return refs and computeds, not a reactive object, so callers can destructure freely
- Accept `MaybeRefOrGetter` for inputs that might be reactive, and read them with `toValue`
- Clean up in `onScopeDispose` — listeners, intervals, subscriptions
- Keep them independent of the component tree where you can; a composable that only works
  inside one component is a method in disguise

## State

Local state in the component. Shared state in a Pinia store, setup-syntax:

```ts
export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const total = computed(() => items.value.reduce((n, i) => n + i.price, 0))
  function add(item: CartItem) { items.value.push(item) }
  return { items, total, add }
})
```

Don't put server cache in a store. Data that belongs to the server — fetched, staleable,
refetchable — belongs in a query layer (TanStack Query, `useFetch`), not in hand-rolled
store state you have to invalidate yourself.

## Templates

- `v-for` always with a stable `:key`, never the index when the list reorders
- Never `v-if` and `v-for` on the same element; filter in a computed instead
- Extract template expressions longer than a comparison into a computed
- Prefer named slots over prop-driven conditional rendering when the parent should control
  the content

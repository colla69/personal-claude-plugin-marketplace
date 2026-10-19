---
name: pinia-conventions
description: Pinia store conventions for Vue — setup-syntax stores, and keeping server data in a query layer instead of a store. Use whenever creating or changing a Pinia store, calling `defineStore`, or when the user mentions Pinia or a store in a Vue app. Also use when fetched data is about to be cached in a store, since server data belongs in a query layer.
---

# Pinia conventions

A store holds state the client owns and several components share. State the server
owns is not store state, however convenient a store makes it look.

## Write stores in the setup syntax

A setup store is the same `ref`, `computed` and function shape as a composable, so what
`vue-conventions` says about reactivity and composables applies inside it unchanged,
including saying what you would test.

```js
export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const total = computed(() => items.value.reduce((n, i) => n + i.price, 0))
  function add(item) { items.value.push(item) }
  return { items, total, add }
})
```

## Server data belongs in a query layer

Don't put server cache in a store. Data that belongs to the server — fetched, staleable,
refetchable — belongs in a query layer such as TanStack Query or `useFetch`, not in
hand-rolled store state you have to invalidate yourself.

## Where this yields

- **To the project.** Its existing stores, and its query layer if it has one, win for
  anything already settled there.
- **To `vue-conventions`** for components, composables and reactivity. This skill
  covers only what is specific to Pinia.

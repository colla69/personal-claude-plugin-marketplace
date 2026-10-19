---
name: vue-conventions
description: Vue 3 Composition API conventions for components, reactivity, composables, and templates. Use whenever writing or reviewing Vue code, creating components or composables, or when the user mentions Vue, SFCs, reactivity, ref/reactive, or a .vue file. Also use when deciding how to structure a Vue feature.
---

# Vue conventions

Targets Vue 3 with `<script setup>`. Check the Vue major version, and whether the
project uses TypeScript, before assuming either.

## Component structure

Order blocks `<script setup>`, `<template>`, `<style scoped>`. Keep styles scoped unless
there's a stated reason not to.

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
- Accept a plain value, a ref or a getter for inputs that might be reactive, and read
  them with `toValue`
- Clean up in `onScopeDispose` — listeners, intervals, subscriptions
- Keep them independent of the component tree where you can; a composable that only works
  inside one component is a method in disguise

When you introduce a composable, say what you would test about it. The caller often
wants that next.

## State

Local state lives in the component. State that several components share belongs in a
store, and the store library brings its own conventions.

## Templates

- `v-for` always with a stable `:key`, never the index when the list reorders
- Never `v-if` and `v-for` on the same element; filter in a computed instead
- Extract template expressions longer than a comparison into a computed
- Prefer named slots over prop-driven conditional rendering when the parent should control
  the content

## Where this yields

- **To the project.** Its existing patterns — naming, folder layout, how it handles
  forms, which UI library it uses — beat the generic conventions here.
- **To the project's Vue version.** On Vue 2 or the Options API, follow the project and
  name the mismatch out loud, rather than writing Composition API beside it.

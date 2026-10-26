# tools-vue

A Vue component stays presentational. Data fetching, business rules and persistence
belong in composables or stores, and a component that does all three is the one that
becomes untestable.

| | |
|---|---|
| Skill | `vue-conventions` |
| Layer | Framework & Tools |
| Builds on | nothing |

Targets Vue 3 with `<script setup>`, and checks the Vue major version and whether the
project uses TypeScript before assuming either.

## Fires when

- Writing or reviewing Vue code, components, composables or a `.vue` file
- Reactivity, `ref` versus `reactive`, or SFCs come up
- Deciding how to structure a Vue feature

## Leaves to others

- **Stores.** Pinia has its own conventions, in `pinia-conventions`, in `tools-pinia`.
- Typing props and emits, to `vue-typescript-conventions`, in `tools-vue-typescript`.
- A Vue 2 or Options API project, whose style it follows, naming the mismatch out loud.
- The project's patterns, such as naming, folder layout, forms and UI library, which
  beat the generic conventions here.

## Install

Docking installs it at project scope when `vue` is in the project's dependencies, and
`tools-pinia` and `tools-vue-typescript` pull it in. By hand:

```bash
claude plugin install tools-vue@personal-claude-plugin-marketplace --scope project
```

Project scope only: it is noise in a Go service.

## More

- The standard itself:
  [`skills/vue-conventions/SKILL.md`](skills/vue-conventions/SKILL.md)
- Every plugin, with its layer and what it builds on:
  [`docs/reference/plugins.md`](../../docs/reference/plugins.md)
- Why the layers, and why dependencies point the way they do:
  [`docs/explanation/layers.md`](../../docs/explanation/layers.md)

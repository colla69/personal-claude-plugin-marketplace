# vue-dev

Vue 3 Composition API conventions — components, composables, Pinia stores, and typing.

| Component | Name | Role |
|---|---|---|
| Skill | `vue-conventions` | Structure, reactivity, composables, state, templates |
| Agent | `vue-developer` | Builds and modifies Vue code. Edits code |

Targets Vue 3 with `<script setup>` and TypeScript. Props and emits use the generic
form, not the runtime object form — the types come free and can't drift from the
declaration.

## Fires when

- Writing or reviewing Vue code, `.vue` files, components, composables
- Pinia stores, reactivity questions, `ref` vs `reactive`
- Deciding how to structure a Vue feature

## Does not

- **Assume the stack.** It checks the Vue major version and whether TypeScript is
  present first. On a Vue 2 or Options API repo it says the mismatch out loud rather
  than quietly writing Composition API alongside it.
- Override the project. Existing patterns — naming, folder layout, form handling, UI
  library — beat the generic conventions here. A second way to do something already
  solved is worse than a pattern you'd not have chosen.
- Put server cache in a store. Fetched, staleable, refetchable data belongs in a query
  layer, not hand-rolled store state you have to invalidate yourself.
- Finish unverified. It runs the project's own typecheck and build before reporting.

## Install

```bash
claude plugin install vue-dev@personal-claude-plugin-marketplace --scope project
```

Project scope — it's noise in a Go service.

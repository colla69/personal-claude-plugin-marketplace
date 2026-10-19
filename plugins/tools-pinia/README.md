# tools-pinia

A store holds state the client owns and several components share. State the server owns
belongs in a query layer, however convenient a store makes it look.

| | |
|---|---|
| Skill | `pinia-conventions` |
| Layer | Framework & Tools |
| Builds on | `tools-vue` |

## Fires when

- Creating or changing a Pinia store, or calling `defineStore`
- Pinia or a store comes up in a Vue app
- Fetched data is about to be cached in a store

## Leaves to others

- **Components, composables and reactivity.** `vue-conventions` in `tools-vue`; a setup
  store follows the same reactivity rules.
- Typing a store, which is TypeScript's business, in `language-typescript`.
- The project's existing stores and query layer, which win where they are settled.

## Install

```bash
claude plugin install tools-pinia@personal-claude-plugin-marketplace --scope project
```

Project scope. Init installs it when `pinia` is in the project's dependencies.

# tools-vue

A Vue component stays presentational. Data fetching, business rules and persistence
belong in composables or stores. It targets Vue 3 with `<script setup>`.

| | |
|---|---|
| Skill | `vue-conventions` |
| Layer | Framework & Tools |
| Builds on | nothing |

## Fires when

- Writing or reviewing Vue code, components, composables or a `.vue` file
- Reactivity, `ref` versus `reactive`, or SFCs come up
- Deciding how to structure a Vue feature

## Leaves to others

- A Vue 2 or Options API project, whose style it follows.
- The project's own patterns, which win.

## Install

Docking installs it at project scope when `vue` is in the project's dependencies. By
hand:

```bash
claude plugin install tools-vue@personal-claude-plugin-marketplace --scope project
```

## More

- [`skills/vue-conventions/SKILL.md`](skills/vue-conventions/SKILL.md)

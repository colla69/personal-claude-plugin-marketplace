# Plugins

Look up every plugin in the marketplace: its layer, its skill, what it is for, when the
steward installs it, and what it builds on.

This table is one of the three registrations every plugin needs, and
`scripts/check-catalog.mjs` fails when it disagrees with
[`marketplace.json`](../../.claude-plugin/marketplace.json). The "Installed when"
column gives the gist; the full signals that set-up checks are in
[`plugin-catalog.md`](../../plugins/marketplace-steward/references/set-up/plugin-catalog.md).
Each plugin's own README, under `plugins/<name>/`, says where it stops.

| Plugin | Layer | Skill | What it's for | Installed when the project shows | Builds on |
|---|---|---|---|---|---|
| [`universal-clean-code`](../../plugins/universal-clean-code/) | Universal | `clean-code` | Readable, maintainable code: naming, function shape, error handling, comments, dependency direction | Any code | — |
| [`universal-work-discipline`](../../plugins/universal-work-discipline/) | Universal | `work-discipline` | Working where someone else maintains: read first, match what is there, hold scope, verify before "done" | Any work, with or without code; most Craft plugins pull it in | — |
| [`craft-development`](../../plugins/craft-development/) | Craft | `development-standards` | What careful work means for code: the neighbours to read, a diff kept to the change, verification | Any code, with `craft-code-review` and `craft-refactoring` | `universal-clean-code`, `universal-work-discipline` |
| [`craft-review`](../../plugins/craft-review/) | Craft | `review-work` | Reviewing any work: what it is meant to do, reading it as written, findings with a cost | Work other than code that gets reviewed; `craft-code-review` pulls it in | — |
| [`craft-code-review`](../../plugins/craft-code-review/) | Craft | `review-changes` | Reviewing a diff or branch: correctness, security, tests, API surface | Any code, with the other two code Craft plugins | `universal-clean-code`, `craft-review`, `craft-unit-testing` |
| [`craft-unit-testing`](../../plugins/craft-unit-testing/) | Craft | `write-unit-tests` | Unit tests that fail when the code is wrong: behaviour first, edges, no padding | A configured test runner; `craft-code-review` pulls it in | `universal-work-discipline` |
| [`craft-refactoring`](../../plugins/craft-refactoring/) | Craft | `refactor-safely` | Behaviour-preserving change in small, verified steps | Any code, with the other two code Craft plugins | `universal-clean-code`, `universal-work-discipline`, `craft-development` |
| [`language-java`](../../plugins/language-java/) | Language | `java-conventions` | Java idioms by version: nullability, immutability, exceptions, resources | `pom.xml`, `build.gradle` or `.java` sources | `universal-clean-code` |
| [`language-typescript`](../../plugins/language-typescript/) | Language | `typescript-conventions` | TypeScript: strictness, narrowing over assertions, discriminated unions, async | `tsconfig.json`, or `.ts` and `.tsx` sources | `universal-clean-code` |
| [`tools-vue`](../../plugins/tools-vue/) | Framework & Tools | `vue-conventions` | Vue 3 Composition API: components, reactivity, composables, templates | `vue` in the dependencies | — |
| [`tools-vue-typescript`](../../plugins/tools-vue-typescript/) | Framework & Tools | `vue-typescript-conventions` | TypeScript in Vue 3: typed props, emits and reactive inputs | Both `vue` and `typescript`, or `lang="ts"` in `.vue` files | `tools-vue`, `language-typescript` |
| [`tools-pinia`](../../plugins/tools-pinia/) | Framework & Tools | `pinia-conventions` | Pinia stores, and server data in a query layer instead of a store | `pinia` in the dependencies | `tools-vue` |
| [`marketplace-steward`](../../plugins/marketplace-steward/) | — | `steward`, `evaluate-skills` | Sets projects up, adopts their setups, keeps them current, and grows the marketplace by pull request | Never in a project: you install it once, for your user | `craft-review` |

## By layer

| Layer | Its plugins |
|---|---|
| Universal | `universal-clean-code`, `universal-work-discipline` |
| Craft | `craft-development`, `craft-review`, `craft-code-review`, `craft-unit-testing`, `craft-refactoring` |
| Language | `language-java`, `language-typescript` |
| Framework & Tools | `tools-vue`, `tools-vue-typescript`, `tools-pinia` |
| None: works on the marketplace itself | `marketplace-steward` |

[Layers](../explanation/layers.md) explains the four layers and why dependencies point
the way they do.

## Old names

Plugins renamed when the marketplace was cut into layers, and what each is called now:

| Old name | Now |
|---|---|
| `clean-code` | `universal-clean-code` |
| `developer` | `craft-development`, with part in `universal-work-discipline` |
| `code-review` | `craft-code-review` |
| `unit-testing` | `craft-unit-testing` |
| `refactoring` | `craft-refactoring` |
| `java-dev` | `language-java` |
| `typescript-dev` | `language-typescript` |
| `vue-dev` | `tools-vue`, with parts in `tools-pinia` and `tools-vue-typescript` |
| `project-init`, `marketplace-init` | `marketplace-steward` |

Set-up and keep-current both read the Renamed table in
[`plugin-catalog.md`](../../plugins/marketplace-steward/references/set-up/plugin-catalog.md),
which is where a new rename is recorded. They remove the old key, and weigh each
successor by its own signal, so a part that split off is installed only where the
project shows a need for it. [Migrate from old
names](../guides/migrate-from-old-names.md) walks through it.

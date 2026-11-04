# Plugins

Look up every plugin in the marketplace: its layer, its skill, what it is for, when the
steward installs it, and what it builds on.

This page is one of the three registrations every plugin needs, and
`scripts/check-catalog.mjs` fails when either of its tables disagrees with
[`marketplace.json`](../../.claude-plugin/marketplace.json). The "Installed when"
column gives the gist; the full signals that docking checks are in
[`catalog.md`](../../plugins/marketplace-steward/references/catalog.md).
Each plugin's own README, under `plugins/<name>/`, says where it stops.

| Plugin | Layer | Skill | What it's for | Installed when the project shows | Builds on |
|---|---|---|---|---|---|
| [`universal-clean-code`](../../plugins/universal-clean-code/) | Universal | `clean-code` | Only the clean-code rules measured to change what the model writes: today, three parameters at most | Any code | — |
| [`universal-work-discipline`](../../plugins/universal-work-discipline/) | Universal | `work-discipline` | Working where someone else maintains: run its checks, and never call unverified work done | Any work, with or without code; most Craft plugins pull it in | — |
| [`craft-development`](../../plugins/craft-development/) | Craft | `development-standards` | What careful work means for code: test first, then verification | Any code, with `craft-code-review` | `universal-clean-code`, `universal-work-discipline` |
| [`craft-code-review`](../../plugins/craft-code-review/) | Craft | `review-changes` | Reviewing a diff or branch: correctness, tests, API surface, findings by file and line | Any code, with `craft-development` | `universal-clean-code` |
| [`craft-shipping`](../../plugins/craft-shipping/) | Craft | `readiness-review` | Asking which milestone and what is at stake before a launch verdict | An app people will use | — |
| [`language-simple-english`](../../plugins/language-simple-english/) | Language | `simple-english` | English nobody can read two ways: short sentences, one instruction each, one word per meaning, simple tenses | Every project, with or without code | — |
| [`language-conventional-commits`](../../plugins/language-conventional-commits/) | Language | `conventional-commits` | Commit messages a release tool can read: the type by what a user sees, a marked breaking change, a body that says why | Any code, after the steward asks once whether the project writes Conventional Commits, unless its files already show the format | — |
| [`tools-vue`](../../plugins/tools-vue/) | Framework & Tools | `vue-conventions` | Vue 3 Composition API: components, reactivity, composables, templates | `vue` in the dependencies | — |
| [`tools-appkit`](../../plugins/tools-appkit/) | Framework & Tools | `appkit-conventions` | AppKit apps in code: a bare executable, the main thread, key events, borderless windows, kiosk options | `import AppKit` or `import Cocoa` in `.swift` sources | — |
| [`marketplace-steward`](../../plugins/marketplace-steward/) | — | `steward` | Docks a project when asked, and answers questions about the standards through its `guide` agent | Never in a project: you install it once, for your user | `language-simple-english` |
| [`marketplace-base`](../../plugins/marketplace-base/) | — | — | The standards index, the build-and-test guard and the corrections collector, as hooks, and the `test-runner` and `reviewer` agents | Every docked project, installed first | `language-simple-english` |
| [`marketplace-curator`](../../plugins/marketplace-curator/) | — | `curate`, `evaluate-skills` | Turns lessons and collected corrections into changes to the standards, by pull request | Never in a docked project: only in the marketplace's own repository | `language-simple-english` |

## By layer

| Layer | Plugins |
|---|---|
| Universal | `universal-clean-code`, `universal-work-discipline` |
| Craft | `craft-development`, `craft-code-review`, `craft-shipping` |
| Language | `language-simple-english`, `language-conventional-commits` |
| Framework & Tools | `tools-vue`, `tools-appkit` |
| Team | None yet |
| None: works on the marketplace itself | `marketplace-steward`, `marketplace-base`, `marketplace-curator` |

[Layers](../explanation/layers.md) explains the layers and why dependencies point the
way they do.

## Old names

The plugins were renamed when the marketplace was cut into layers: `clean-code` is now
`universal-clean-code`, and `vue-dev` is now `tools-vue`. Every old name, and every
later rename, has its row in the Renamed table of
[`catalog.md`](../../plugins/marketplace-steward/references/catalog.md). Docking reads
it. It removes the old key, weighs each successor by its own signal, and installs
nothing for a plugin that was removed. [Migrate from old
names](../guides/migrate-from-old-names.md) walks through it.

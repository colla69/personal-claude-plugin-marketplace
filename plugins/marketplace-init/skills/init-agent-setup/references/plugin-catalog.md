# Toolkit plugin catalog

The signals that justify recommending each toolkit plugin. **This file is not the list
of what exists** — `claude plugin list --available --json` is, and
`references/plugin-sources.md` covers how to read it. This file answers the other
question: given that a plugin exists, what in a repo earns it.

The split matters because the two go stale differently. A plugin shipped last week is
absent here and present in the live list, and the live list is right — recommend it on
its own `description` and report the missing row. A row here that no longer matches any
live plugin is a row to ignore and report. Never resolve the disagreement by dropping
the plugin.

Recommend on evidence from the repo, not on general desirability. Every enabled plugin
adds its descriptions to every session, so a plugin that never fires is
pure cost. When in doubt, leave it out and mention it as optional.

| Layer | Plugin | Provides | Recommend when the repo shows |
|---|---|---|---|
| Universal | `universal-clean-code` | `clean-code` skill | Any repo with code in it. Strongest signal: inconsistent style across modules, long functions, or an existing style guide the skill should be aligned to. |
| Universal | `universal-work-discipline` | `work-discipline` skill | Any repo, with or without code. `craft-development`, `craft-refactoring` and `craft-unit-testing` pull it in; recommend it on its own where the work isn't code. |
| Craft | `craft-development` | `development-standards` skill | Any repo with code in it, together with `craft-code-review` and `craft-refactoring` (see Code, below). |
| Craft | `craft-review` | `review-work` skill | `craft-code-review` pulls it in. Recommend it on its own where work other than code gets reviewed: documents, reports, plans. |
| Craft | `craft-code-review` | `review-changes` skill | Any repo with code in it, with the other two. Do **not** gate this on PR-workflow signals: checking catches logical errors and inconsistencies before a commit, whether or not anyone opens pull requests. |
| Craft | `craft-unit-testing` | `write-unit-tests` skill | A test runner is configured (`vitest`, `jest`, `pytest`, `go test`, …). Recommend *more strongly* when a runner exists but coverage is thin — that's the gap the plugin closes. `craft-code-review` pulls it in, so a repo with code has it either way. |
| Craft | `craft-refactoring` | `refactor-safely` skill | Any repo with code in it, with the other two. It needs no test suite to be useful, but say so when there isn't one, because its plans will start with characterization tests. |
| Language | `language-java` | `java-conventions` skill | A `pom.xml`, `build.gradle`, or `.java` sources. Read the *module's* language level, not the root's — they often differ. |
| Language | `language-typescript` | `typescript-conventions` skill | A `tsconfig.json` or `.ts`/`.tsx` sources. Note whether `strict` is on, since it changes what correct code looks like. |
| Framework & Tools | `tools-vue` | `vue-conventions` skill | `vue` in dependencies. Check the major version and note it: the plugin targets Vue 3 Composition API, so flag a mismatch if the project is on Options API or Vue 2. |
| Framework & Tools | `tools-vue-typescript` | `vue-typescript-conventions` skill | `vue` and `typescript` both in dependencies, or `lang="ts"` in `.vue` files. Pulls in `tools-vue` and `language-typescript`. |
| Framework & Tools | `tools-pinia` | `pinia-conventions` skill | `pinia` in dependencies. Pulls in `tools-vue`. |
| — | `marketplace-init` | this skill | Already installed if you're reading this. Leave it enabled for future repos, or note that it can be user-scoped instead of project-scoped. |
| — | `marketplace-steward` | `evaluate-skills` skill | Never, yet: it is a draft, being built. Don't install it in a project. |

## The install block

Init installs the plugins on this machine itself, in phase 5. The report still ends
with a paste-ready block of the same installs, for every other machine. Enabling a
plugin in `.claude/settings.json` does **not** fetch it, so a clone configured for
plugins that aren't on that machine is configured for a setup nobody has, and nothing
announces the gap. The settings file looks right and the plugins simply never load.

```bash
claude plugin marketplace add colla69/personal-claude-plugin-marketplace
claude plugin install craft-development@personal-claude-plugin-marketplace --scope project
claude plugin install craft-code-review@personal-claude-plugin-marketplace --scope project
claude plugin install craft-refactoring@personal-claude-plugin-marketplace --scope project
claude plugin install craft-unit-testing@personal-claude-plugin-marketplace --scope project
```

- **One line per recommended plugin**, matching the `enabledPlugins` keys exactly. If
  the two disagree, the settings file is wrong.
- **One block, all marketplaces.** Gap-fills go in the same block as the toolkit's own
  plugins, each with its `@marketplace` suffix. A separate "optional extras" block is
  the one the user skips.
- Include a `marketplace add` line only for a marketplace that isn't configured already
  — `claude plugin marketplace list` shows what is present. `claude-plugins-official`
  ships configured, so it needs no add line.
- Don't omit a plugin because it's already installed. The block describes what this repo
  needs, completely; re-running an install is harmless.
- **List every plugin a trio names**, including dependencies such as
  `universal-work-discipline` and `craft-review`. Installing a dependency on its own
  line is harmless, and it guarantees the `enabledPlugins` entry the trios rely on.
- If the toolkit is already installed, remind them that `claude plugin marketplace
  update` is what picks up newer versions. A stale copy runs happily and silently
  produces the previous release's output.

## Layers

Knowledge composes in layers, general to specific. Each layer covers only what the layer
above it does not, and yields to the layer below when both apply. A plugin's layer is
its name prefix and its `category`, which is the Layer column in the table above.

| Layer | Prefix | Covers |
|---|---|---|
| Universal | `universal-` | What holds for everything the project does, whatever the kind of work |
| Craft | `craft-` | How one kind of work is done |
| Language | `language-` | What the work is written in: a programming language, a natural language, a template or notation |
| Framework & Tools | `tools-` | The concrete product or tool the work is done with |

`marketplace-` plugins, such as this one, work on the marketplace itself and sit in no
layer.

Four rules follow from this, and they are what keep the marketplace from turning into
overlapping copies of the same advice:

1. **One standard, one home.** TypeScript idioms live in `typescript-conventions` and
   nowhere else. A framework skill that needs them points at that skill; it never
   restates them. Two copies get edited separately and then disagree.
2. **Skill plugins ship skills, not agents.** Init generates the workers in each
   project. An agent shipped in a plugin competes with them for the same prompts, and
   which one fires becomes luck.
3. **Hard `dependencies` only for unconditional needs.** Every quality judgement needs
   the `clean-code` standard, so the code Craft plugins and the language plugins declare
   `universal-clean-code`. A framework does *not* unconditionally need a language
   plugin — Express runs on plain JavaScript too — so that pairing is not a dependency.
4. **Conditional pairings are catalog logic, not manifest logic.** "Express *and*
   TypeScript" is a fact about the repo in front of you, so it is decided here at
   recommendation time, by looking for both signals.

Recommend the whole stack a repo actually shows: the code Craft plugins wherever there
is code, plus each language whose sources are present, plus each framework in the
manifest. They compose; that is
the design.

## Code

In any repo with code, `craft-development`, `craft-code-review`, and
`craft-refactoring` go together. They are the craft of changing, checking and
restructuring code, and the trios for code tasks, `change` and `refactor`, draw on all
three. Leaving one out leaves a role in those trios without its standard.

All three depend on `universal-clean-code`, whose `clean-code` skill is the standard
their judgements are measured against. Installing any of them pulls it in.

## Scope guidance

Two scopes matter here:

- **User scope** (`~/.claude/settings.json`) — plugins you want in every project.
  `marketplace-init` and `universal-clean-code` usually belong here.
- **Project scope** (`.claude/settings.json`, committed) — plugins specific to this
  repo's stack. `tools-vue` belongs here; it's noise in a Go service.

Init installs at project scope. In the report, mention which plugins the user might
prefer at user scope instead, with `claude plugin install
<name>@personal-claude-plugin-marketplace --scope user`.

## Wiring format

The shape lives in `assets/settings-template.json` and nowhere else — read it from
there. A copy in this file is a second version that gets edited on its own and then
disagrees with the one the skill actually writes from.

The template holds only the marketplace entry, which phase 5 merges in.

`claude plugin install --scope project` writes the `enabledPlugins` entries in phase 5,
keyed `name@marketplace`. Don't write them by hand: a hand-written entry enables a
plugin nobody installed.

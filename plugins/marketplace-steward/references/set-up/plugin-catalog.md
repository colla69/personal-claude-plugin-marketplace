# Toolkit plugin catalog

The signals that justify recommending each toolkit plugin. **This file is not the list
of what exists** — `claude plugin list --available --json` is, and `plugin-sources.md`,
beside this file, covers how to read it. This file answers the other question: given
that a plugin exists, what in a repo earns it.

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
| Craft | `craft-unit-testing` | `write-unit-tests` skill | A test runner is configured (`vitest`, `jest`, `pytest`, `go test`, …). Recommend *more strongly* when a runner exists but coverage is thin — that's the gap the plugin closes. `craft-development` and `craft-code-review` pull it in, so a repo with code has it either way. |
| Craft | `craft-refactoring` | `refactor-safely` skill | Any repo with code in it, with the other two. It needs no test suite to be useful, but say so when there isn't one, because its plans will start with characterization tests. |
| Craft | `craft-cv-writing` | `write-cv` skill | A CV or résumé kept as a document in the repo, such as `CV.md`, `resume.md`, a `cv/` folder or a `resume.*` file, and written or tailored there. Not a repo that only links to one. Pulls in `universal-work-discipline`. |
| Language | `language-java` | `java-conventions` skill | A `pom.xml`, `build.gradle`, or `.java` sources. Read the *module's* language level, not the root's — they often differ. |
| Language | `language-typescript` | `typescript-conventions` skill | A `tsconfig.json` or `.ts`/`.tsx` sources. Note whether `strict` is on, since it changes what correct code looks like. |
| Language | `language-javascript` | `javascript-conventions` skill | The project's own code in `.js` or `.mjs` files, not only tool configs such as `vite.config.js` beside TypeScript sources. Read `"type"` in `package.json`, since it decides whether `.js` is an ES module. |
| Language | `language-simple-english` | `simple-english` skill | Every project, with or without code: every project has text a person reads. |
| Framework & Tools | `tools-vue` | `vue-conventions` skill | `vue` in dependencies. Check the major version and note it: the plugin targets Vue 3 Composition API, so flag a mismatch if the project is on Options API or Vue 2. |
| Framework & Tools | `tools-vue-typescript` | `vue-typescript-conventions` skill | `vue` and `typescript` both in dependencies, or `lang="ts"` in `.vue` files. Pulls in `tools-vue` and `language-typescript`. |
| Framework & Tools | `tools-pinia` | `pinia-conventions` skill | `pinia` in dependencies. Pulls in `tools-vue`. |
| Framework & Tools | `tools-aws-static-hosting` | `aws-static-hosting` skill | A CloudFront distribution in front of an S3 bucket in the infrastructure code or deploy scripts: `cloudfront.Distribution`, `aws_cloudfront_distribution` or `AWS::CloudFront::Distribution`, or `aws s3 sync` followed by a CloudFront invalidation. |
| — | `marketplace-steward` | `steward` and `evaluate-skills` skills | Already installed at user scope if you're reading this. Never write it into a project's settings: it belongs to the machine, not the project. |

## The install block

Set-up installs the plugins on this machine itself, in phase 5. The report still ends
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

`marketplace-` plugins, such as the steward, work on the marketplace itself and sit in
no layer.

Four rules follow from this, and they are what keep the marketplace from turning into
overlapping copies of the same advice:

1. **One standard, one home.** TypeScript idioms live in `typescript-conventions` and
   nowhere else. A framework skill that needs them points at that skill; it never
   restates them. Two copies get edited separately and then disagree.
2. **Skill plugins ship skills, not agents.** Set-up generates the workers in each
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

Development is test first, so `craft-development` also pulls in `craft-unit-testing`,
whose skill holds the red, green, refactor cycle.

## Scope guidance

Two scopes matter here:

- **User scope** (`~/.claude/settings.json`) — plugins you want in every project.
  `marketplace-steward`, `universal-clean-code` and `language-simple-english` usually
  belong here.
- **Project scope** (`.claude/settings.json`, committed) — plugins specific to this
  repo's stack. `tools-vue` belongs here; it's noise in a Go service.

Set-up installs at project scope. In the report, mention which plugins the user might
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

## Renamed and removed

**A dead key is a toolkit key under `enabledPlugins` in `.claude/settings.json` that
names no plugin in the live inventory.** It matches nothing, and no session reports
it; only `claude plugin list` shows it, as failed to load. Remove it, and name it in
the report. When the table below names its successor, weigh the successor by its signal
like any other plugin; an old name is not evidence on its own. A dead key of another marketplace, or one in `.claude/settings.local.json`, is not
the steward's to remove: report it.

Set-up applies this in phase 5 and keep-current in its step 2. A skill renamed inside
a plugin gets a row too, as `plugin:old-skill` and `plugin:new-skill`, because a trio
names it in its `skills:`. A row stays as long as some project might still carry the
old name.

| Old name | Now | Note |
|---|---|---|
| `clean-code` | `universal-clean-code` | |
| `developer` | `craft-development` | Part of it became `universal-work-discipline` |
| `code-review` | `craft-code-review` | Builds on `craft-review` |
| `unit-testing` | `craft-unit-testing` | |
| `refactoring` | `craft-refactoring` | |
| `java-dev` | `language-java` | |
| `typescript-dev` | `language-typescript` | |
| `vue-dev` | `tools-vue` | Its Pinia and TypeScript parts are `tools-pinia` and `tools-vue-typescript`, each chosen by its own signal |
| `project-init`, `marketplace-init` | `marketplace-steward` | User scope only; never a project key |

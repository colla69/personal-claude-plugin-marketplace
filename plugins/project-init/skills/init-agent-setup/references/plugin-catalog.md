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
adds its skill and agent descriptions to every session, so a plugin that never fires is
pure cost. When in doubt, leave it out and mention it as optional.

| Plugin | Provides | Recommend when the repo shows |
|---|---|---|
| `clean-code` | `clean-code` skill, `clean-code-reviewer` agent | Almost always. Strongest signal: inconsistent style across modules, long functions, or an existing style guide the skill should be aligned to. |
| `developer` | `development-standards` skill, `developer` agent | Any repo with code in it. The trio's only writer — recommend it wherever you recommend the other two. |
| `code-review` | `review-changes` skill, `code-reviewer` agent | Always, as part of the trio. Do **not** gate this on PR-workflow signals: the reviewer's value is catching logical errors and inconsistencies before a commit, which is independent of whether anyone opens pull requests. |
| `unit-testing` | `write-unit-tests` skill, `unit-tester` agent | A test runner is configured (`vitest`, `jest`, `pytest`, `go test`, …). Recommend *more strongly* when a runner exists but coverage is thin — that's the gap the plugin closes. |
| `refactoring` | `refactor-safely` skill, `refactoring-specialist` agent | Always, as part of the trio. It prescribes rather than edits, so it needs no test suite to be useful — but say so when there isn't one, because its plans will start with characterization tests. |
| `java-dev` | `java-conventions` skill | A `pom.xml`, `build.gradle`, or `.java` sources. Read the *module's* language level, not the root's — they often differ. Skill only; `developer` applies it. |
| `typescript-dev` | `typescript-conventions` skill | A `tsconfig.json` or `.ts`/`.tsx` sources. Note whether `strict` is on, since it changes what correct code looks like. Skill only; `developer` applies it. |
| `vue-dev` | `vue-conventions` skill, `vue-developer` agent | `vue` in dependencies. Check the major version and note it: the plugin targets Vue 3 Composition API, so flag a mismatch if the project is on Options API or Vue 2. |
| `project-init` | this skill | Already installed if you're reading this. Leave it enabled for future repos, or note that it can be user-scoped instead of project-scoped. |

## The install block

Every run ends with a paste-ready block of install commands. Enabling a plugin in
`.claude/settings.json` does **not** fetch it, so a repo configured for four plugins
that aren't on the machine is configured for a setup nobody has — and nothing announces
the gap. The settings file looks right and the plugins simply never load.

```bash
claude plugin marketplace add colla69/personal-claude-plugin-marketplace
claude plugin install developer@personal-claude-plugin-marketplace
claude plugin install code-review@personal-claude-plugin-marketplace
claude plugin install refactoring@personal-claude-plugin-marketplace
claude plugin install unit-testing@personal-claude-plugin-marketplace
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
- `developer`, `code-review`, and `refactoring` each pull `clean-code` in as a
  dependency. Say that, rather than listing `clean-code` as separate work.
- **Tell the user to restart afterwards.** Claude Code builds its skill registry at
  startup, so nothing installed mid-session is invocable until the next one.
- If the toolkit is already installed, remind them that `claude plugin marketplace
  update` is what picks up newer versions. A stale copy runs happily and silently
  produces the previous release's output.

## Layers

Knowledge composes in layers, general to specific. Each layer covers only what the layer
above it does not, and yields to the layer below when both apply.

| Layer | Plugins | Covers |
|---|---|---|
| Universal | `clean-code` | What good code looks like, in any language |
| Craft | `developer`, `code-review`, `refactoring`, `unit-testing` | How to work in someone else's codebase |
| Language | `java-dev`, `typescript-dev` | One language's semantics and idioms |
| Framework | `vue-dev` | One framework's conventions |

These four are the layers the toolkit fills. A gap-fill from another marketplace is
usually a fifth thing — **tooling**, which runs a process rather than stating a
standard, and which no amount of prose substitutes for. Label it as such in the report
instead of forcing it into a layer it does not belong to.

Four rules follow from this, and they are what keep the marketplace from turning into
overlapping copies of the same advice:

1. **One standard, one home.** TypeScript idioms live in `typescript-conventions` and
   nowhere else. A framework skill that needs them points at that skill; it never
   restates them. Two copies get edited separately and then disagree.
2. **Language and framework plugins ship skills, not agents.** `developer` is the
   writer. A second agent that also writes code competes with it for the same prompts,
   and which one fires becomes luck. Contribute knowledge; let the one writer apply it.
3. **Hard `dependencies` only for unconditional needs.** Every quality judgement needs
   `clean-code`, so the trio and the language plugins declare it. A framework does *not*
   unconditionally need a language plugin — Express runs on plain JavaScript too — so
   that pairing is not a dependency.
4. **Conditional pairings are catalog logic, not manifest logic.** "Express *and*
   TypeScript" is a fact about the repo in front of you, so it is decided here at
   recommendation time, by looking for both signals.

Recommend the whole stack a repo actually shows: the trio always, plus each language
whose sources are present, plus each framework in the manifest. They compose; that is
the design.

## The review trio

`developer`, `code-review`, and `refactoring` are one unit. Recommend all three or none.

| Agent | Lane |
|---|---|
| `code-reviewer` | read-only — logical errors, code inconsistencies, code quality |
| `refactoring-specialist` | read-only — prescribes the improvement in human-readable form |
| `developer` | **the only one that edits code** |

The split is the point: two agents give opinions, one executes them. A reviewer that can
edit reviews its own work, and a refactorer that can edit produces a diff nobody
prescribed. Enabling only part of the trio leaves either findings with nobody to
implement them, or a writer with nobody checking it.

All three depend on `clean-code`, which is the standard their judgements are measured
against. Installing any of them pulls it in.

## Scope guidance

Two scopes matter here:

- **User scope** (`~/.claude/settings.json`) — plugins you want in every project.
  `project-init` and `clean-code` usually belong here.
- **Project scope** (`.claude/settings.json`, committed) — plugins specific to this
  repo's stack. `vue-dev` belongs here; it's noise in a Go service.

When you write `.claude/settings.json`, only list project-appropriate plugins. Mention
which ones the user might prefer to install at user scope instead, with `claude plugin
install <name>@personal-claude-plugin-marketplace --scope user`.

## Wiring format

The shape lives in `assets/settings-template.json` and nowhere else — read it from
there. A copy in this file is a second version that gets edited on its own and then
disagrees with the one the skill actually writes from.

Two rules it cannot carry itself: merge into an existing `.claude/settings.json` rather
than replacing it, since that file often already holds permissions and hooks; and key
every `enabledPlugins` entry `name@marketplace`, matching the install block exactly.

Enabling a plugin here does not install it. Tell the user to run `/plugin install
<name>@personal-claude-plugin-marketplace` for any plugin not already on the machine,
and `/reload-plugins` if the install summary asks for it.

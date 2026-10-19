# personal-claude-plugin-marketplace

A personal library of skills for agentic work, one skill per plugin, reused across every
project. The skills hold the knowledge. The agents that use them are generated into each
project by the steward, `marketplace-steward`, from that project's own facts.

Everything here is prose: standards written once, in plain language an LLM can follow.
There is no code to run. Nothing in the structure assumes the work is code either. A
skill can be about a report, a template or a natural language as much as about a
codebase, even though every skill here is about code today.

## How it fits together

```
        ┌──────────── Marketplace (knowledge, central) ◄───────────┐
        │                                                          │
  installs skills                         updates or creates skills, by PR
        │                                                          │
        ▼                                                          │
     Steward ──► AGENTS.md ──► skills ──► Plan · Do · Check ──► Steward
    (dock on)                                  (work)           (grow)
```

- **Dock on.** The steward reads a project and writes its `AGENTS.md`. It installs the
  skills that follow from it and generates a trio for each kind of task the project
  repeats.
- **Work.** Plan proposes and waits for your OK. Do, the only writer, carries out the
  plan you accepted. Check compares the result with that plan and sends gaps back to Do.
  Plan and Check are read-only.
- **Grow.** What one project learns goes back into the skills, so the next project has
  it on day one. The steward will do this by pull request; that part is still being
  built.

## The layers

Every skill sits in one of four layers, from general to specific. The layer is the
plugin's name prefix and its `category`.

| Layer | Prefix | The question it answers | Examples |
|---|---|---|---|
| Universal | `universal-` | Does this apply to everything we do? | clean code, company guidelines |
| Craft | `craft-` | How is this kind of work done? | reviewing, refactoring, a monthly report |
| Language | `language-` | What is the work written in? | Java, TypeScript, German, an enterprise template |
| Framework & Tools | `tools-` | Which concrete product is it done with? | Vue, Pinia, Excel, PDF |

The more specific layer wins where two apply, and local convention wins over all of
them: every skill ends by saying when to yield. Dependencies point only toward the
general layers. In a trio, Framework & Tools skills go to Do alone, because Plan and
Check judge the work, not the tool.

## Install

```bash
claude plugin marketplace add colla69/personal-claude-plugin-marketplace
claude plugin install marketplace-steward@personal-claude-plugin-marketplace --scope user
```

That is all a machine needs. In a project, say "set this up", or run
`/marketplace-steward:steward`. It installs the rest of what that project needs, at
project scope, and reports everything it wrote.

**Restart the session after installing.** Claude Code builds its skill registry at
startup, so a plugin installed mid-session isn't available until the next one.

## The plugins

| Plugin | Skill | What it's for |
|---|---|---|
| `universal-clean-code` | `clean-code` | The house readability standard, ranked by the cost of leaving a problem |
| `universal-work-discipline` | `work-discipline` | Read first, match what is there, hold scope, verify before "done" |
| `craft-development` | `development-standards` | What careful work means for code: the neighbours, the diff, verification |
| `craft-review` | `review-work` | Reviewing any work: findings with a cost, and what was checked |
| `craft-code-review` | `review-changes` | Correctness, security, tests, and API impact on a diff |
| `craft-unit-testing` | `write-unit-tests` | Behavior-first tests that fail when the code is wrong |
| `craft-refactoring` | `refactor-safely` | Behavior-preserving change in small verified steps |
| `language-java` | `java-conventions` | Java language conventions, version-aware |
| `language-typescript` | `typescript-conventions` | TypeScript language conventions |
| `tools-vue` | `vue-conventions` | Vue 3 Composition API components, reactivity, composables |
| `tools-vue-typescript` | `vue-typescript-conventions` | Typed props, emits and reactive inputs in Vue |
| `tools-pinia` | `pinia-conventions` | Pinia stores, and server data in a query layer |
| `marketplace-steward` | `steward`, `evaluate-skills` | Set a project up or adopt its setup, keep it current, and turn lessons into skill changes by pull request. Not tried for real yet |

Each plugin has its own README: what it covers, when it fires, and what it leaves to
other skills. Follow the plugin name to `plugins/<name>/README.md`.

## Using the steward

```
/marketplace-steward:steward
```

It reads the project and writes the setup without stopping, except to ask before it
would create a new skill. It writes:

- `AGENTS.md` at the root, and in each component that earns one, with a one-line
  `CLAUDE.md` beside each that contains `@AGENTS.md`;
- path-scoped rules in `.claude/rules/`, for conventions that follow a file type;
- `.claude/plugin-sources.json`, the sources this project may draw skills from. It asks
  you once, as a checklist, and only if no policy exists yet;
- `.claude/settings.json`, declaring this marketplace, with the skills installed at
  project scope;
- for each trio, `.claude/agents/<task>-plan.md`, `<task>-do.md` and `<task>-check.md`,
  and the skill that runs them, `.claude/skills/<task>/SKILL.md`. You run a trio as
  `/<task>`;
- `.claude/steward.json`, the record of what it generated, so a later run never
  overwrites a file you changed.

It never touches git. You branch before running it and decide afterwards what to keep.
Later, "update the setup" brings it up to date: plugins that were renamed, skills that
don't load, trios from older templates, and what the project now calls for.

**The content lives in `AGENTS.md`, deliberately.** It is the vendor-neutral file other
coding agents read too. `CLAUDE.md` is a one-line import beside it, because Claude Code
lazy-loads a nested `CLAUDE.md` when it opens a file in that subtree but never discovers
a nested `AGENTS.md`. The generated agents are Claude-only for now, and they name no
model.

## Invoking skills

Every skill is namespaced by its plugin, as `/<plugin>:<skill>`, for example
`/universal-clean-code:clean-code`. You will rarely type one. Claude loads a skill on
its own when a request matches its description, which is why descriptions read as
trigger lists rather than summaries. A generated agent preloads its skills through
`skills:` in its frontmatter.

## Updates

No plugin here declares a `version`. For a relative-path source in a git-hosted
marketplace, Claude Code falls back to the source's commit SHA, so **every push is
picked up as an update**. That is what you want for standards you refine continuously.

## Layout

```
.claude-plugin/marketplace.json     # the catalog
plugins/<layer>-<topic>/
  .claude-plugin/plugin.json        # manifest — only .json goes in here
  README.md                         # what this plugin covers and leaves to others
  skills/<skill>/SKILL.md           # the one skill, at the plugin root
  skills/<skill>/references/*.md    # detail loaded on demand
  skills/<skill>/assets/*           # templates the skill writes out
plugins/marketplace-<name>/         # works on the marketplace itself; may ship agents/
scripts/check-catalog.mjs           # the plugin lists, layers and dependencies agree
docs/werkstatt/                     # the concept, the migration plan, and the audit
```

Only `plugin.json` lives inside `.claude-plugin/`. Putting `skills/` in there is the
most common reason a plugin loads but appears empty.

## Contributing

Tell the steward what a project taught you: "make a skill out of this", "this skill
got X wrong". It places the knowledge in its layer, writes the change, registers it in
all three places it has to appear, has it checked, and opens a pull request. See
[CONTRIBUTING.md](CONTRIBUTING.md) for the manual path, the house writing style, and the
local development loop.

## License

Apache-2.0.

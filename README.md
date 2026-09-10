# personal-claude-plugin-marketplace

A personal Claude Code plugin marketplace. One repo, six plugins, refined over time and
reused across every project.

Everything here is prose — standards written once, applied by both you and the subagents
that read them. There is no code to run.

## Install

```bash
claude plugin marketplace add colla69/personal-claude-plugin-marketplace
claude plugin install project-init@personal-claude-plugin-marketplace --scope user
claude plugin install clean-code@personal-claude-plugin-marketplace --scope user
```

The marketplace is named `personal-claude-plugin-marketplace`, so that suffix follows
every plugin name in install commands and in `enabledPlugins`. In an interactive session
`/plugin` gives you a picker instead.

## The plugins

| Plugin | Skill | Agent | What it's for |
|---|---|---|---|
| `project-init` | `init-agent-setup` | `codebase-cartographer` | Bootstrap a cold repo: context files, rules, plugin wiring |
| `clean-code` | `clean-code` | `clean-code-reviewer` | The house readability standard, and an audit against it |
| `code-review` | `review-changes` | `code-reviewer` | Correctness, security, tests, and API impact on a diff |
| `unit-testing` | `write-unit-tests` | `unit-tester` | Behavior-first tests that fail when the code is wrong |
| `refactoring` | `refactor-safely` | `refactoring-specialist` | Behavior-preserving change in small verified steps |
| `vue-dev` | `vue-conventions` | `vue-developer` | Vue 3 Composition API components, composables, stores |

Each plugin has its own README with what it does, when it fires, and what it deliberately
does not do — follow the plugin name to `plugins/<name>/README.md`.

## Invoking them

Everything is namespaced by plugin:

```
/clean-code:clean-code                    invoke the skill
@clean-code:clean-code-reviewer           invoke the agent
```

You will rarely type either. Claude triggers them on its own when a request matches the
description — that is what the descriptions are tuned for, and why they read as trigger
lists rather than summaries.

**The skill / agent split matters.** A skill is a document that loads into the current
context; an agent is a separate context that reads that document and does work. Pairing
them means the standard is written once and both you and the subagent judge against the
same text. Change `clean-code/SKILL.md` and every downstream reviewer changes with it.

## Using project-init

This is the one that pays for the rest. In a fresh repo:

```
/project-init:init-agent-setup
```

It surveys the repo, maps its components, proposes a plan, and — after you approve —
writes:

- `CLAUDE.md` at the root: stack, commands, cross-cutting rules
- `<component>/CLAUDE.md` per major component, which load **only** when Claude reads files
  in that subtree, so per-component detail costs nothing until it's relevant
- `.claude/rules/*.md` with `paths:` frontmatter for file-type conventions
- `.claude/settings.json` declaring this marketplace and the plugins this project needs

That last file is the point. The plugin recommendation isn't advice in a chat log — it's
committed configuration that travels with the repo. Anyone who clones it and trusts the
folder gets the same setup.

Note that Claude Code reads `CLAUDE.md`, not `AGENTS.md`. If your repo already has an
`AGENTS.md` for other tools, the initializer creates a `CLAUDE.md` that imports it with
`@AGENTS.md` rather than duplicating the content.

## Scope

- **User scope** (`--scope user`, the default) — `project-init`, `clean-code`, and
  anything else you want everywhere
- **Project scope** (`--scope project`, writes to committed `.claude/settings.json`) —
  stack-specific plugins like `vue-dev`

Enabling a plugin in `.claude/settings.json` doesn't fetch it. On a new machine, run
`claude plugin install <name>@personal-claude-plugin-marketplace` once.

## Updates

No plugin here declares a `version`. For a relative-path source in a git-hosted
marketplace, Claude Code falls back to the source's commit SHA, so **every push is picked
up as an update** — which is what you want for standards you refine continuously.

## Layout

```
.claude-plugin/marketplace.json     # the catalog
plugins/<name>/
  .claude-plugin/plugin.json        # manifest — only .json goes in here
  README.md                         # what this plugin is and doesn't do
  skills/<skill>/SKILL.md           # skills, at the plugin root
  skills/<skill>/references/*.md    # detail loaded on demand
  skills/<skill>/assets/*           # templates the skill writes out
  agents/<agent>.md                 # subagents, at the plugin root
scripts/check-catalog.mjs           # keeps the three plugin lists in sync
```

Only `plugin.json` lives inside `.claude-plugin/`. Putting `skills/` or `agents/` in there
is the most common reason a plugin loads but appears empty.

## Contributing

Point Claude at the repo and run:

```
/new-plugin
```

It scaffolds the plugin, writes the skill and agent from annotated templates, and
registers the plugin in all three places it has to appear. See
[CONTRIBUTING.md](CONTRIBUTING.md) for the manual path, the house writing style, and the
local development loop.

## License

Apache-2.0.

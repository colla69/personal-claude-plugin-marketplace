# marketplace-steward

The steward docks a project onto the marketplace's standards when someone asks, and
answers questions about them. It is the one plugin each person installs by hand. It is
in use in the projects listed in the marketplace's
[README](../../README.md#where-it-runs).

| | |
|---|---|
| Skill | `steward`, the front door |
| Agent | `guide`, which answers questions about the standards and the setup. Read-only |
| Script | `scripts/measure-setup.mjs`, which measures what a project's setup costs per session. It writes nothing |
| Layer | None: it is part of the marketplace itself |
| Builds on | `language-simple-natural-language` |

## Fires when

- "dock this project", "set this project up", "onboard this repo"
- "is there a standard for this?", "add the standard for X"
- "why is my setup slow?", or a skill not loading

## Writes

- `.claude/plugin-sources.json`, `CLAUDE.md` and `.claude/settings.json`
- The standards and `marketplace-base`, installed at project scope
- Two short blocks in your `~/.claude/CLAUDE.md`, after a backup, never replacing a
  block you wrote
- For a project with its own setup: rules a standard already states removed, and rules
  that would serve other projects filed as issues for the curators

It asks only what you must decide: which sources standards may come from, whether to
keep the project's `AGENTS.md` files, and whether the project writes Conventional
Commits.

## Leaves to you

- **Git.** No branch, commit or stash. Branch before running it; the report lists every
  path it changed.
- **The standards.** What they say is the curators' call.

## Install

```bash
claude plugin install marketplace-steward@personal-claude-plugin-marketplace --scope user
```

## Credits

`scripts/measure-setup.mjs` adapts parts of
[claude-context-optimizer](https://github.com/egorfedorov/claude-context-optimizer) by
Egor Fedorov, under the MIT License, which the script's header carries.

## More

- [Getting started](../../docs/getting-started.md)
- [How it works](../../docs/how-it-works.md)

# marketplace-steward

A project should start from what the company already knows. The steward docks a project
onto the marketplace's standards when someone asks, and answers questions about them,
for beginners and experts alike. It is the one plugin each person installs by hand.

**Not tried for real yet.** It is written; trying it on real projects comes next.

| | |
|---|---|
| Skill | `steward`, the front door |
| Agent | `guide`, on Sonnet, which answers questions about the standards and the setup. Read-only |
| References | `dock.md`, `tidy.md`, `catalog.md`, `context-files.md`, `plugin-sources.md` and `cost.md`, read by path |
| Script | `scripts/measure-setup.mjs`, which measures what a project's setup costs per session. Plain Node; it writes nothing |
| Layer | None: it is part of the marketplace itself |
| Builds on | `language-simple-english` |

## Fires when

- "dock this project", "set this project up", "onboard this repo"
- "bring our setup onto the marketplace", in a project with its own `CLAUDE.md`,
  rules, agents or hooks
- "is there a standard for this?", "which standards do we have?", "add the standard for
  X"
- "why is my setup slow?", "this setup costs too many tokens", or a skill not loading
- A folder with no code in it: documents, reports, templates

## Writes

- `.claude/plugin-sources.json`, the sources standards may come from, asked once as a
  checklist
- `CLAUDE.md`, at the root and in each component that earns one
- `.claude/settings.json`, merged: the marketplace, the session's model, and the
  build-and-test command for the base plugin's guard
- The standards and `marketplace-base`, installed at project scope
- For a project with a setup of its own: rules that a standard states word for word
  removed, files an earlier steward generated removed, and rules that would serve other
  projects filed as issues for the curators. A file with uncommitted edits is first
  copied to `~/.local/share/marketplace-steward/backups/`

It asks only what a person must decide: the sources checklist, once; whether to keep or
swap the project's `AGENTS.md` files, when it has any; and whether a project with code
writes Conventional Commits. Everything else it does and reports.

## Leaves to you

- **Git.** No branch, commit, stage or stash. Branch before running it; the report
  lists every path it created and changed, and `git diff` does the rest.
- **The standards.** What they say is the curators' call, in `marketplace-curator`.
- **The project's work**, its checks and its reviews: `marketplace-base` and the
  standards do that.

## Install

```bash
claude plugin install marketplace-steward@personal-claude-plugin-marketplace --scope user
```

User scope: it belongs to the machine, and in a project nobody docked it costs one
skill and one agent description, and does nothing else.

## Credits

`scripts/measure-setup.mjs` adapts parts of
[claude-context-optimizer](https://github.com/egorfedorov/claude-context-optimizer) by
Egor Fedorov, under the MIT License, which the script's header carries.

## More

- What it reads, writes and asks:
  [`docs/reference/the-steward.md`](../../docs/reference/the-steward.md)
- Why it works the way it does:
  [`docs/explanation/the-steward.md`](../../docs/explanation/the-steward.md)

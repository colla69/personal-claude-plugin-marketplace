# marketplace-base

What every docked project runs on, besides its standards. The steward installs it first
in every project it docks. It is in use in the projects listed in the marketplace's
[README](../../README.md#where-it-runs).

| | |
|---|---|
| Hooks | The standards index, the build-and-test guard and the corrections collector |
| Agents | `test-runner`, which runs a check and reports only what failed; `reviewer`, which reviews work when asked. Both read-only |
| Layer | None: it is part of the marketplace itself |
| Builds on | `language-simple-natural-language` |

It needs Node 18 or later on the machine.

## What it does

- **The index.** At session start, one line for each standard, with the ones enabled
  here marked, so a session can offer a standard it doesn't have.
- **The guard.** When Claude is about to stop and a file changed, it runs the project's
  check command. A failure keeps Claude working; after three failures in a row it lets
  Claude stop and says so.
- **The collector.** In the background, it notes corrections people make and files
  them, at a later session start, as one issue for the curators. It files with `gh`.

## Settings

Under `env` in the project's `.claude/settings.json`:

- `STEWARD_CHECK`: the command the guard runs. The steward writes it from the project's
  CI. Without it, the guard does nothing.
- `STEWARD_CHECK_PATHS`: comma-separated globs; the guard then runs only when a file in
  them changed.
- `STEWARD_COLLECT`: `"off"` turns the collector off. It also works in your own
  settings.

```json
{ "env": { "STEWARD_CHECK": "npm run build", "STEWARD_CHECK_PATHS": "web/**,infra/**" } }
```

The collector writes placeholders for names and secrets it notices, but it is a model,
not a filter, and the issues are as public as the marketplace's repository.

## Install

The steward installs it at project scope when it docks a project. By hand:

```bash
claude plugin install marketplace-base@personal-claude-plugin-marketplace --scope project
```

## More

- [How it works](../../docs/how-it-works.md)

# marketplace-base

What every docked project runs on, besides its standards. It tells each session which
standards exist, keeps the build and the tests green, and sends the corrections people
make back to the curators. The steward installs it first, in every project it docks.

**Not tried for real yet.** It is written; trying it on real projects comes next.

| | |
|---|---|
| Hooks | The standards index, the build-and-test guard and the corrections collector, below |
| Agents | `test-runner`, on Haiku, which runs a check and reports only what failed; `reviewer`, on Opus, which reviews work when the person asks. Both read-only |
| Scripts | `scripts/`, plain Node with no dependencies. It needs Node 18 or later on the machine |
| Layer | None: it is part of the marketplace itself |
| Builds on | `craft-review`, `language-simple-english` |

## What it does

- **At session start, the index.** One line for each standard in the marketplace, with
  the ones enabled in this project marked, about 800 tokens. A session can then say
  "there is a standard for that" when someone asks for work it covers, and offer to
  add it.
- **When Claude is about to stop, the guard.** If Claude changed a file in this session,
  it runs the project's check command from the project's root, and a failure keeps
  Claude working, with the last lines of the output. After three failures in a row it
  lets Claude stop and says so. A project without a check command is never checked.
- **While you work, the collector.** After an answer, a background run on Haiku reads
  what the session added since its last look, at most once in ten minutes. It reads
  what the person wrote and what Claude answered, never a tool's output. It adds the
  possible corrections to a list on disk. Nothing waits for the session to end.
- **At session start, the filing.** The lists of earlier sessions in this project become
  one issue on the marketplace. A session that was killed or never closed is read to
  its end first.

## The check command

The guard runs `STEWARD_CHECK` from `env` in the project's `.claude/settings.json`, or
in `.claude/settings.local.json` over it. The steward writes it when it docks a project,
from the command the project's CI runs:

```json
{ "env": { "STEWARD_CHECK": "npm run build && npm test" } }
```

Remove it, and the guard does nothing in that project.

## The collector

- It files with `gh`, signed in on the machine. When `gh` can't file, the lists stay in
  the plugin's data folder and are tried again at the next session start.
- It starts from the day it is installed: only sessions that run with the plugin are
  noted, so it never files a backlog.
- A session with fewer than two messages from the person is skipped without a model
  call, and so is a pass with nothing new in it.
- It writes placeholders for names and secrets it notices, but it is a model, not a
  filter, and the issues are as public as the marketplace's repository.
- `"STEWARD_COLLECT": "off"` under `env`, in a project's settings or your own, turns
  it off.

## Install

The steward installs it at project scope when it docks a project. By hand:

```bash
claude plugin install marketplace-base@personal-claude-plugin-marketplace --scope project
```

## More

- What it reads, writes and runs: [`docs/reference/the-base.md`](../../docs/reference/the-base.md)
- Why it works the way it does:
  [`docs/explanation/the-base.md`](../../docs/explanation/the-base.md)

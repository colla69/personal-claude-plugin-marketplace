# The base

Look up what `marketplace-base` does in a docked project: its hooks, its agents, what
each reads and writes, and how to turn each off. Docking installs it first, in every
project. Why it works this way is in [the base](../explanation/the-base.md).

**Not yet tried on real projects.** This page describes the plugin as its files set it
out; the first trials will show where it behaves otherwise.

## The hooks

| Hook | When | What it does | Script |
|---|---|---|---|
| The index | Session start | Prints one line for each standard in the marketplace, with the ones enabled here marked, and asks the session to offer a standard that fits and isn't enabled. About 800 tokens | [`index.mjs`](../../plugins/marketplace-base/scripts/index.mjs) |
| The guard, marking | After `Write`, `Edit`, `MultiEdit` or `NotebookEdit` | Notes that this session changed a file. A change made through the shell, such as `sed -i`, isn't noted | [`guard.mjs`](../../plugins/marketplace-base/scripts/guard.mjs) |
| The guard, checking | When Claude is about to stop | If this session changed a file, runs the check command. A failure keeps Claude working, with the output's last 60 lines. After three failures in a row, it lets Claude stop and says so | `guard.mjs` |
| The collector | Session end | Starts a background run that files the session's corrections, and returns at once | [`collect.mjs`](../../plugins/marketplace-base/scripts/collect.mjs) |
| The catch-up | Session start, without waiting | Collects up to five earlier sessions of this project that ended without their hook, and retries issues that couldn't be filed | `collect.mjs` |

The hooks are in [`hooks/hooks.json`](../../plugins/marketplace-base/hooks/hooks.json),
and every script is plain Node with no dependencies.

## The check command

The guard runs `STEWARD_CHECK`, from `env` in the project's `.claude/settings.json`, or
from `.claude/settings.local.json` over it. Docking writes it from the command the
project's CI runs, and leaves it out when it couldn't verify one. Without it, the guard
does nothing. It runs in the project's root, whatever folder the session's shell is in,
through the shell, for up to nine minutes. Each session is checked for its own changes
only.

## The collector

| | |
|---|---|
| Reads | The session's transcript: only what the person wrote and Claude's replies. Tool calls and their output, `!` shell commands and their output, background tasks' results, compact summaries, and the text Claude Code adds to a turn are dropped before anything else sees it |
| Sends | The conversation, at most the last 80,000 characters, to Haiku, through `claude -p` in safe mode, with no tools and no MCP servers |
| Files | One issue per session with corrections, titled "Corrections: …", on the GitHub repository the marketplace came from, with `gh issue create`. A session the model couldn't answer for is tried at the next three session starts, then given up |
| Skips | A session with fewer than two messages from the person, without a model call; sessions from before the plugin was installed; a session resumed after it was collected; its own `claude -p` run |
| Keeps | Its state in the plugin's data folder, `${CLAUDE_PLUGIN_DATA}`: what it collected, the locks, and issues waiting for `gh` |

The issues go wherever the marketplace lives, and anyone who can read that repository
can read them. A correction is written with placeholders for names and secrets the
model notices, but it is a model, not a filter. A company that keeps its marketplace in
a private repository keeps its corrections private too. A project whose corrections
must never leave it turns the collector off, below.

## The agents

| Agent | Model | What it does |
|---|---|---|
| [`test-runner`](../../plugins/marketplace-base/agents/test-runner.md) | Haiku, low effort | Runs one check and reports only what failed, so a long output stays out of the session |
| [`reviewer`](../../plugins/marketplace-base/agents/reviewer.md) | Opus | Reviews a piece of work when you ask, by `review-work` and the project's standards |

Both are read-only. Neither starts on its own: the session starts the test runner when
it has a check to run, and the reviewer when you ask for a review.

## Turning a part off

| To stop | Do |
|---|---|
| The guard, in one project | Remove `STEWARD_CHECK` from `.claude/settings.json` |
| The guard, on your machine only | Set `STEWARD_CHECK` to an empty string in `.claude/settings.local.json` |
| The collector, in one project | Set `"STEWARD_COLLECT": "off"` under `env` in `.claude/settings.json` |
| The collector, on your machine only | The same, in `.claude/settings.local.json`, or under `env` in `~/.claude/settings.json` for every project |
| Everything | Disable `marketplace-base` in the project's settings. The index, the guard and the collector go with it |

# The steward

Look up what the steward starts on, reads, writes, asks and never does, and what the
curator does in the marketplace's own repository. Why they work this way is in [the
steward](../explanation/the-steward.md). The base plugin, which runs in every docked
project, has [its own page](the-base.md).

**Not yet tried on real projects.** This page describes the jobs as their files set
them out; the first trials will show where the steward behaves otherwise.

## How a job starts

You talk to it, or run `/marketplace-steward:steward`. It docks a project only when you
ask, and it stays out of ordinary work: setting up a tool, a service, a dependency, a
dev server or CI, and the project's own tasks.

| Job | Starts on | Procedure |
|---|---|---|
| **Dock** | "dock this project", "set this project up", "onboard this repo", "there's no CLAUDE.md here", "bring our setup onto the marketplace", a folder with no code | [`dock.md`](../../plugins/marketplace-steward/references/dock.md), with [`tidy.md`](../../plugins/marketplace-steward/references/tidy.md) for a setup of the project's own |
| **One more standard** | "add the standard for X" in a docked project | Steps 1 and 5 to 7 of `dock.md` |
| **Ask the guide** | "which standards do we have for this?", "is there a standard for X?", "why isn't this skill loading?", "what does this setup cost?" | The [`guide`](../../plugins/marketplace-steward/agents/guide.md) agent, on Sonnet, read-only |

## What each reads and writes

| Job | Reads | Writes in the project | Writes elsewhere |
|---|---|---|---|
| Dock | The project, through the built-in Explore agent for a codebase; the live inventory of every marketplace; the source policy; the project's session transcripts, through the measuring script | `CLAUDE.md`, path-scoped rules, `.claude/settings.json`, `.claude/plugin-sources.json`; rules a standard states word for word removed, and files an earlier steward generated | Backups in `~/.local/share/marketplace-steward/backups/`; an issue on the marketplace for rules that would travel |
| One more standard | The live inventory, the source policy, the settings | `.claude/settings.json` | — |
| Ask the guide | The live inventory, the catalog, the installed standards, the project's settings and `CLAUDE.md` files, its transcripts through the measuring script | Nothing. A change it proposes is made after your yes, as docking writes it | — |

[Project files](project-files.md) describes every file in the project column.

## What it asks

- Which sources the project may draw from, once, when no policy file exists.
- In a repo with code, whether it writes Conventional Commits, once, unless it already
  shows the format.
- When the project has `AGENTS.md` files, whether to keep them or swap them for
  `CLAUDE.md`.

Everything else goes ahead and is reported.

## What it never does

- Touch git in your project: no branch, commit, stage or stash.
- Remove a rule that adds anything to what a standard says.
- Change your `CLAUDE.local.md` or `.claude/settings.local.json`, or edit a file under
  `~/.claude` itself; installs go through Claude Code.
- Write files for any tool but Claude.
- Install a plugin at user scope, or write the steward into a project's settings.

## The parts

| Part | Kind | What it does |
|---|---|---|
| [`steward`](../../plugins/marketplace-steward/skills/steward/SKILL.md) | Skill, visible | The front door: picks the job and holds the rules every job shares |
| [`guide`](../../plugins/marketplace-steward/agents/guide.md) | Agent, read-only, Sonnet | Answers questions about the standards and the setup, and proposes changes |
| [`dock.md`](../../plugins/marketplace-steward/references/dock.md) | Reference | Docking, step by step, and its report |
| [`tidy.md`](../../plugins/marketplace-steward/references/tidy.md) | Reference | What a setup of the project's own keeps, loses and files |
| [`catalog.md`](../../plugins/marketplace-steward/references/catalog.md) | Reference | The signal that earns each plugin, the layers, scope, and the Renamed table |
| [`context-files.md`](../../plugins/marketplace-steward/references/context-files.md) | Reference | How `CLAUDE.md` is laid out, and what stays out of it |
| [`plugin-sources.md`](../../plugins/marketplace-steward/references/plugin-sources.md) | Reference | The sources checklist and the live inventory |
| [`cost.md`](../../plugins/marketplace-steward/references/cost.md) | Reference | Measuring what a setup costs, and what to propose |
| [`measure-setup.mjs`](../../plugins/marketplace-steward/scripts/measure-setup.mjs) | Script | Prints what a setup costs per session and how its sessions used it |

The steward builds on `language-simple-english`.

## The curator

The curator works in the marketplace's own repository, where it is enabled in
`.claude/settings.json`. It is never installed in a docked project.

| Part | Kind | What it does |
|---|---|---|
| [`curate`](../../plugins/marketplace-curator/skills/curate/SKILL.md) | Skill, visible | The front door: works a lesson or an issue, lists what is waiting, answers where a rule goes |
| [`evaluate-skills`](../../plugins/marketplace-curator/skills/evaluate-skills/SKILL.md) | Skill, visible | Reviews a skill, an agent, a plugin, a change or the whole set |
| [`contribution-checker`](../../plugins/marketplace-curator/agents/contribution-checker.md) | Agent, read-only, Opus | Checks a change before its pull request, the leak check first |
| [`contribute.md`](../../plugins/marketplace-curator/references/contribute.md) | Reference | From a lesson or an issue to a pull request |
| [`place-knowledge.md`](../../plugins/marketplace-curator/references/place-knowledge.md) | Reference | Where a lesson belongs: the diagnosis, the strip test, the layers, the cut |
| [`author-skills/`](../../plugins/marketplace-curator/references/author-skills/) | Reference | The house style, the shape of a plugin, the templates |

It asks before a new skill, a new team plugin, or closing an issue, and writes only on a
`contrib/` branch. It builds on `craft-review` and `language-simple-english`.

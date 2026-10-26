# Dock a project

Bring a codebase, or a folder with no code, onto the marketplace's standards: the
standards it needs, the base plugin, and a short `CLAUDE.md`. A project that has a setup
of its own is docked the same way; the steward tidies it as part of the job.

**Not yet tried on real projects.** This guide follows the steward's procedure; the
first trials will show where it behaves otherwise.

## Before you start

- **Install the steward once, for your user**, if you haven't:

  ```bash
  claude plugin marketplace add colla69/personal-claude-plugin-marketplace
  claude plugin install marketplace-steward@personal-claude-plugin-marketplace --scope user
  ```

  Then run `/reload-plugins` in a session that is already open, or start a new one. A
  plugin installed mid-session isn't available until it has run.
- **Branch.** The steward never touches git in your project, so make a branch first,
  and decide afterwards what to keep.
- **Sign `gh` in**, if you want the base plugin's corrections, and the rules a tidy
  files, to reach the curators as issues. Without it they wait on your machine.

## Steps

1. **Open a session in the project's root** and say "dock this project", or run
   `/marketplace-steward:steward`. The first time, Claude Code asks whether the steward
   may run, because it pre-allows its own files and commands; Claude Code can remember
   the answer.
2. **Tick the sources.** If the project has no `.claude/plugin-sources.json`, and you
   have none in `~/.claude/`, you get one checklist: which marketplaces this project may
   draw plugins from. The house marketplace and the plugins in Anthropic's own
   repository are ticked already. It is asked once.
3. **Answer what only you can.** In a codebase, it asks once whether the project writes
   its commit messages in Conventional Commits, unless the project already shows the
   format. When the project has agents in `.claude/agents/` that name no model, it asks
   once which of them to move to a model that fits their work, such as Haiku for an
   agent that only searches and runs commands. When the project has `AGENTS.md` files,
   it asks whether to keep them or swap them for `CLAUDE.md`. Claude Code may ask for
   some commands as it goes, such as each plugin install;
   [permissions](../reference/permissions.md) lists them.
4. **Read the report.** It lists every file written and changed, each standard and the
   evidence for it, the check command the guard will run, what the tidy removed and
   filed, the tokens the setup adds to every session, and what it couldn't verify.
5. **Run `/reload-plugins`**, or start a new session, so the standards and the base
   plugin load.

## What you get

| File | What it holds |
|---|---|
| `CLAUDE.md` | The commands, the map of components, and the conventions and boundaries that reading the code won't tell |
| The same file in each component that earns one | What is local to that component |
| `.claude/rules/<topic>.md`, where one is needed | A convention that follows a file type rather than a folder, scoped by its `paths:` |
| `.claude/settings.json` | The marketplace, the model, the check command, and the plugins enabled for this project |
| `.claude/plugin-sources.json` | The sources you ticked |

[Project files](../reference/project-files.md) describes each one, and [the
base](../reference/the-base.md) what the base plugin does in every session.

## Check it

- **Read the diff**, `git diff` and `git status`, next to the report. Delete what you
  don't want, such as a line in `CLAUDE.md` that isn't true.
- **Look at the Unverified list.** It is where the steward put every command it couldn't
  run and every guess it made.
- **Look at the check command.** It runs whenever Claude stops after changing a file. If
  it is slow or wrong, change `STEWARD_CHECK` in `.claude/settings.json`, or remove it.
- **Commit `.claude/` with the rest**, so the setup travels with the project. On another
  machine, the report's install block sets up the same plugins.

## A project with a setup of its own

The steward edits an existing `CLAUDE.md`; it never replaces one. Then it tidies, file
by file. The report lists every file it read, with how many rules each holds and what
happened to them, so a file that was not read shows as a missing row.

- A rule an installed standard states word for word is removed.
- Every other rule stays: it is the project's own.
- A rule that would serve other projects too stays, and is filed as an issue for the
  curators.
- Agents and run skills an earlier steward generated are removed, and so is its
  `.claude/steward.json`.

A file someone edited is first copied to `~/.local/share/marketplace-steward/backups/`.
The report's Tidied table lists every line that moved and where.

## A folder with no code

The same steps work for a folder of documents, reports or templates. The steward reads
what is produced there, for whom, and how it is checked, and chooses standards for that
work, such as plain English. There is no check command, so the guard does nothing.

## Staying current

Nothing to do. Claude Code updates the marketplace by itself, so each merged change
reaches the project at a session after it. If your own settings turn that off for the
marketplace, the report says so. To add one more standard, say "add the
standard for X". To see what the setup costs, ask "what does this setup cost?".

## Next

- [Work in a docked project](work-in-a-docked-project.md), for what changes day to day.
- [Troubleshoot](troubleshoot.md), when something doesn't load and nothing says so.

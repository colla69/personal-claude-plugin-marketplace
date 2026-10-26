---
name: steward
description: Dock a project onto the company's standards and help people use them — installs the standards the project needs and the base plugin, writes a short CLAUDE.md, and tidies a setup the project already has. Use whenever the user says "dock this project", "set this project up", "onboard this repo", "there's no CLAUDE.md here", "bring our setup onto the marketplace", "which standards do we have for this?", "is there a standard for X?", "add the standard for X", "why is my setup slow?", "this setup costs too many tokens", or a skill in this project isn't loading. Not for setting up a tool, service, dependency, dev server or CI, and not for the project's own work. Also use when the project is a folder with no code in it.
allowed-tools:
  - Read(/${CLAUDE_PLUGIN_ROOT}/**)
  - Write(~/.local/share/marketplace-steward/backups/**)
  - Bash(claude plugin list --json)
  - Bash(claude plugin list --available --json)
  - Bash(claude plugin marketplace list --json)
  - Bash(claude plugin marketplace update)
  - Bash(claude plugin install * --scope project)
  - Bash(claude plugin details *)
  - Bash(node ${CLAUDE_PLUGIN_ROOT}/scripts/measure-setup.mjs)
  - Bash(gh issue create *)
---

# Steward

A project should start from what the company already knows. The steward brings the
company's standards into a project, and helps the people there use them. It docks a
project only when someone asks, and it never does the project's own work.

## Pick the job

| The user wants | Job | Read first |
|---|---|---|
| A project docked: set up for the first time, or brought onto the standards from a setup of its own | Dock | `${CLAUDE_PLUGIN_ROOT}/references/dock.md` |
| One more standard in a docked project | Dock, steps 1 and 5, for that standard, then items 1 and 7 of step 7 | `${CLAUDE_PLUGIN_ROOT}/references/dock.md` |
| An answer: which standard covers something, what a standard says, what is not installed here, why a skill doesn't load | Ask the guide | — |
| To know what the setup costs, or to make it cheaper | Ask the guide | — |

Read the job's file before doing anything else, and follow it. It names the other files
it needs, which sit beside it.

**Ask the guide** means: start the `marketplace-steward:guide` agent with the user's
question, the project's path, and what you already know from this conversation. Give
the user its answer. When the answer is a change, such as a standard to add or a line
to move, make it only after the user says yes: adding a standard is the dock job's
step 5, and a change to the project's files goes in as `dock.md` writes them.

## For every job

- **Ask only what a person must decide.** The sources the project may draw from, once,
  when no policy file exists; whether the project writes Conventional Commits, once, in
  a project with code; and what `dock.md` names. Everything else goes ahead and is
  reported.
- **Say exactly what you created and what you changed.** The report is what the user
  reads to decide what to keep, next to `git diff`.
- **Never touch git in the project.** No branch, commit, stage or stash. The user
  branches before calling you and decides afterwards what to keep.
- **Write for Claude only.** Other tools' files stay as they are.
- **Unknowns go to the report**, under Unverified. Reports are tables and one-liners.

## Where this yields

To the user, who can stop a job at any point or name what to leave out. To the
project's `CLAUDE.md`, where it says how its own setup is looked after. To the
curators, whose merge decides every standard.

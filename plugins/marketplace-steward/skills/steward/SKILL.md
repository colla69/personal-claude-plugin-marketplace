---
name: steward
description: Set a project up for agentic work, keep that setup current, and keep what a project teaches for every other project — its AGENTS.md, the marketplace skills it needs, a Plan/Do/Check trio per recurring task, and changes to those skills by pull request. Use whenever the user says "set this project up", "onboard this repo", "set up agents for this repo", "there's no AGENTS.md or CLAUDE.md here", "update the setup", that a skill or agent in this project's setup isn't loading, asks for a trio for one more task, or says "a skill got this wrong", "make this a marketplace skill", "add this to my skills for every project". Not for setting up a tool, service, dependency, dev server or CI, and not for remembering a preference or fact for Claude, which is memory. Also use when the project to set up is a folder with no code in it.
allowed-tools:
  - Read(/${CLAUDE_PLUGIN_ROOT}/**)
  - Read(~/.local/share/marketplace-steward/**)
  - Write(~/.local/share/marketplace-steward/**)
  - Edit(~/.local/share/marketplace-steward/**)
  - Bash(claude plugin list --json)
  - Bash(claude plugin marketplace list --json)
  - Bash(git -C ~/.local/share/marketplace-steward/clone worktree list)
  - Bash(git -C ~/.local/share/marketplace-steward/clone fetch origin)
  - Bash(git -C ~/.local/share/marketplace-steward/clone worktree add -b contrib/* ~/.local/share/marketplace-steward/worktrees/* origin/main)
  - Bash(git -C ~/.local/share/marketplace-steward/clone worktree remove ~/.local/share/marketplace-steward/worktrees/*)
  - Bash(git -C ~/.local/share/marketplace-steward/clone branch -D contrib/*)
  - Bash(git -C ~/.local/share/marketplace-steward/worktrees/* add -A)
  - Bash(git -C ~/.local/share/marketplace-steward/worktrees/* commit -F ~/.local/share/marketplace-steward/drafts/*)
  - Bash(git -C ~/.local/share/marketplace-steward/worktrees/* diff origin/main*)
  - Bash(git -C ~/.local/share/marketplace-steward/worktrees/* log --format=%B origin/main..HEAD)
  - Bash(git -C ~/.local/share/marketplace-steward/worktrees/* push -u origin contrib/*)
  - Bash(claude plugin validate ~/.local/share/marketplace-steward/worktrees/*)
  - Bash(node ~/.local/share/marketplace-steward/worktrees/*/scripts/check-catalog.mjs)
  - Bash(claude --plugin-dir ~/.local/share/marketplace-steward/worktrees/* plugin details *)
  - Bash(gh pr create *)
---

# Steward

A project should start from what the last one learned, and give back what it learns.
The steward looks after two things: the setup, which is what reading the project cannot
tell plus the skills and workers that follow from it, and the knowledge behind them.
The project's own work is not its job; the project's trios do that.

## Pick the job

| The user wants | Job | Read first |
|---|---|---|
| A project or a folder set up for agentic work | Set up | `${CLAUDE_PLUGIN_ROOT}/references/set-up/procedure.md` |
| A trio for one more task the project repeats | Set up, phases 1, 3 and 5 to 8, for that trio only | `${CLAUDE_PLUGIN_ROOT}/references/set-up/procedure.md` |
| A setup brought up to date: plugins that no longer exist, a skill or agent that doesn't load, trios from older templates, a project that has changed | Keep current | `${CLAUDE_PLUGIN_ROOT}/references/keep-current.md` |
| A lesson kept for other projects: a skill that got something wrong, a rule worth having everywhere, a new skill | Contribute | `${CLAUDE_PLUGIN_ROOT}/references/contribute.md` |
| A placement the user changed in a contribution's pull request | Contribute: add the case to §6 of `place-knowledge.md` | `${CLAUDE_PLUGIN_ROOT}/references/contribute.md` |

Read the job's file before doing anything else, and follow it. It names the other
files it needs, which sit beside it.

**A project with `.claude/steward.json` was set up by the steward already**, so a
request to set it up goes to keep current. A project with a setup of its own and no
record goes to set up, which improves that setup. Adopting a setup, by giving every
rule in it a home, is a job still being built. When the user asks for it, say so.

When the request is ordinary work on the project, this skill doesn't apply: the
project's trios and the conversation handle that.

## For every job

- **Ask only two things.** The sources checklist, once, when no policy file exists, as
  set-up's phase 1 says. And an OK before creating a new skill, showing what section 5
  of `${CLAUDE_PLUGIN_ROOT}/references/place-knowledge.md` asks for; a yes goes to the
  contribute job. Everything else goes ahead and is reported.
- **Say exactly what you created and what you changed.** With no plan to approve, the
  report is what the user reads to decide what to keep, next to `git diff`.
- **Never touch git in the project.** No branch, commit, stage or stash. The user
  branches before calling you and decides afterwards what to keep. Don't tell them how
  to undo you.
- **Change the marketplace only in the steward's folder**,
  `~/.local/share/marketplace-steward/`: its `clone/` and its `worktrees/`. It sits
  outside `~/.claude`, where Claude Code asks before every write.
- **Write for Claude only.** Other tools' files stay as they are.
- **Keep the record**, `.claude/steward.json`, by the rules in
  `${CLAUDE_PLUGIN_ROOT}/references/record.md`. It is how a later run tells a file you
  wrote from one the user changed, and what the user removed from what was never there.
- **Unknowns go to the report**, under Unverified, and reports are tables and
  one-liners. Next to what was written, an unknown is a thing to fix; in the middle of
  the work, it is a thing to skim past.

## Where this yields

To the user, who can stop a job at any point or name what to leave out, and whose merge
decides every change to the marketplace. To the project's `AGENTS.md`, where it says
how its own setup is looked after.

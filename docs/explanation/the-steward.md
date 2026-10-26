# The steward

Why the steward is small, why it docks only when asked, why it tidies lightly, and why
the curator is a plugin of its own. Read this to understand what you are handing to the
steward when you install it.

**Not yet tried on real projects.** This page describes the steward as its files set it
out; the first trials will show where it behaves otherwise.

## Three plugins, three groups

The marketplace serves three groups, and each gets its own plugin, so nobody pays for
what another group does.

| Plugin | For | Where |
|---|---|---|
| `marketplace-steward` | Anyone who wants a project docked, or a question answered | Once per machine, at user scope |
| `marketplace-base` | Everyone who works in a docked project | Every docked project, at project scope |
| `marketplace-curator` | The curators | Only the marketplace's own repository |

An earlier steward did all of it in one package: set-up, adoption, keeping current and
contributing, with a Plan, Do and Check trio generated into each project. It was
expensive, and the trios fitted only focused feature work. So the rebuild kept what
every project needs, the standards, and moved the rest to where it is used.

## A companion, not a ceremony

> "I envisioned the Steward to be a voice near the orchestrator the user can talk to,
> to navigate and use the knowledge in the marketplace optimally."

The steward is one skill and one agent. The skill docks a project, and the `guide`
answers questions: which standard covers a task, what one says, what exists that isn't
installed here, why a skill doesn't load, and what the setup costs. The guide runs on
Sonnet, in its own context, so the session that asked keeps only the answer.

But people don't ask. "People are lazy. They just blurt into the editor." So the
knowledge comes to them: the base plugin gives every session an index of the standards
at its start, and the session offers the one that fits. The steward is there for
whoever wants more.

## Docking only when asked

> "We need to give the user the chance to only dock the projects they desire."

The steward never docks a project on its own. Docking writes the project's settings and
`CLAUDE.md`, and the person who owns the project decides when that happens. It still
asks only what a person must decide: the sources, once; whether the project writes
Conventional Commits; and what to do with `AGENTS.md` files. Everything else it does
and reports, and it never touches git, so you review its work as a diff.

## Staying current by itself

There is no keep-current job. Claude Code updates a marketplace by itself, unless a
person's own settings turn it off, so a change a curator merges reaches every docked
project at a session after it. The merge is
the gate: nothing reaches a project that a curator hasn't read.

## A light tidy

A project with a setup of its own holds rules a standard now also states. Two copies of
a rule drift apart, and each costs tokens in every session. But only the project's
people know why a rule is the way it is. So the tidy removes only a rule a standard
states word for word, keeps every quirk, and files a rule that would serve other
projects as an issue, without removing it. When in doubt, a rule differs.

The report shows a row for every file the tidy read. A tidy that skipped the agents and
rules said so in one line of its report, and nothing else showed it. A missing row now
shows it.

## The curator, apart

> "Separated curator."

Deciding what a standard says is a different group's work from docking a project, and
its knowledge, how a lesson is placed and how a skill is written, would cost a
description in every session of every docked project. So it lives in
`marketplace-curator`, enabled only in the marketplace's own repository. A curator works
an issue there, on a branch of their own checkout, and a separate agent checks each
change before its pull request, the leak check first. A routine that goes over the
issues by itself may come later.

## Reference files, read by path

Every visible skill costs a description in every session it is enabled in. So the
steward shows one skill, and its procedures sit in reference files that the skill reads
by path when a job starts. [Cost](cost.md) explains the trade.

The front door is
[`skills/steward/SKILL.md`](../../plugins/marketplace-steward/skills/steward/SKILL.md);
each job's procedure is in
[`references/`](../../plugins/marketplace-steward/references/).

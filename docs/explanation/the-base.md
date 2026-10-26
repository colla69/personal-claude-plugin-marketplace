# The base

Why every docked project gets one plugin of mechanics beside its standards, why it
checks only the build and the tests, why a review runs only when asked, how models are
chosen, and why corrections are collected from the conversation only.

**Not yet tried on real projects.** This page describes the base plugin as its files set
it out; the first trials will show where it behaves otherwise.

## Smart, not cheap

> "We want to always work smart, not necessarily cheap. We still want high quality while
> keeping the waste to a minimum."

The marketplace once shipped knowledge only, and left hooks and settings to each
project. A skill can only ask; a hook can check, every time, for nothing in tokens. So
the few mechanics every docked project shares ship once, in `marketplace-base`, and
update with it. A skill plugin still ships only its skill.

## One imperative: the build stays green

> "In that case the only imperative is to never break the build and tests."

In development, the guard runs the project's check command when Claude is about to stop
after changing a file, and a failure sends Claude back to fix it. It runs only after a
change, only where docking found a command it could verify, and gives up after three
failures in a row, so a check that cannot pass never traps a session.

Nothing else is checked automatically. A review runs when someone asks for one, on Opus,
by the `reviewer` agent. For other kinds of work, "a human will do that anyway, so those
would be wasted tokens."

## Models by the kind of work

> "Complex work is not the standard, so I would like to find balance between models."

| Work | Model | Where it is set |
|---|---|---|
| Planning | Opus | `opusplan`, which docking writes into the project's settings: Opus in plan mode |
| Doing | Sonnet | `opusplan`, outside plan mode |
| Judging, such as a review | Opus | The `reviewer` agent |
| Answering about the standards | Sonnet | The steward's `guide` agent |
| Fetching and running, such as a test run or collecting corrections | Haiku | The `test-runner` agent and the collector |

The choice ships centrally, so every project gets the same balance, and anyone can
override it for a session with `/model`.

## The index

Every session in a docked project starts with one line per standard in the marketplace,
enabled here or not, about 800 tokens. It is what lets a session say "there is a
standard for that" to someone who never heard of the steward, and offer to add it.

## Corrections, from the conversation only

> "Every session writes back a list of them as a GitHub issue in the background."

When a person corrects Claude, the correction is often a standard nobody wrote down.
The collector reads a finished session and files the corrections as one issue on the
marketplace, for the curators. It reads only what the person wrote and what Claude
answered, never a tool's output: a file or a command's result can hold secrets nobody
typed. Haiku reads it, in the background, and writes placeholders for names. The issue
is as public as the marketplace's repository, so a project whose corrections must stay
in it turns the collector off with one setting.

A session's end gives a hook about a second and a half, so the hook only starts the
work, and the next session's start catches up on any session that ended without it.
Collecting starts on the day the plugin is installed, so it never files a backlog. What
the curators do with the issues is theirs to decide.

[The base's reference](../reference/the-base.md) lists every hook, what it reads and
writes, and how to turn it off.

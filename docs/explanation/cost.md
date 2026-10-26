# Cost

What a plugin costs in every session, why that shapes how skills are cut and described,
what the index and the models cost, and how the steward measures a project's setup. Read
this before you add a skill, or when you wonder whether a plugin is worth enabling.

## Always on

Claude decides whether to load a skill from its description alone. So every enabled
skill puts its description into context in every session, whether or not it is ever
used, and so does every agent a plugin ships. The full skill only loads when it is
needed. `claude plugin details <name>` estimates both parts:

| Part | When it is paid |
|---|---|
| **Always-on** | In every session of every project that enables the plugin |
| **On invoke** | Each time the skill or agent actually runs |

The always-on part is the one to watch, and the one
[`evaluate-skills`](../../plugins/marketplace-curator/skills/evaluate-skills/SKILL.md)
weighs against how often a plugin fires. It is small per plugin and paid everywhere, for
as long as the plugin is enabled. That is why docking installs only what a project shows
a need for: a Vue skill in a Go service is pure cost. The few it installs everywhere,
such as `simple-english`, are there because every project shows that need.

## Why descriptions are trigger lists

The description is the only thing Claude sees when deciding, so it is written as the
phrases people actually type, not as a summary. A description that reads like
documentation costs its tokens in every session and still never fires. One that fires on
the wrong requests costs worse: it loads its whole skill where it doesn't belong, and
competes with the skill that does. The rules for writing one are in
[`style.md`](../../plugins/marketplace-curator/references/author-skills/style.md).

## Why the steward shows one skill

The steward is installed for your user, so it is in every session of every project.
With a visible skill for each job and each piece of knowledge, it would add a
description for each of them everywhere, and as many chances to fire on an ordinary
request.

It shows one skill, the front door, and one agent, the `guide`. Everything else is in
reference files, which cost nothing until the front door reads one by path. The
curator's knowledge, how a lesson is placed and how a skill is written, is in a plugin
of its own, enabled only in the marketplace's repository, so a docked project never pays
for it. Hiding skills instead doesn't work: a skill with `disable-model-invocation:
true` keeps its description out of context, but no agent can preload it and Claude
can't run it.

## The index, paid on purpose

The base plugin's index lists every standard in the marketplace at the start of every
docked session, about 800 tokens with the marketplace as it is. That is the one
always-on cost the marketplace adds on purpose: it is what lets a session offer a
standard to someone who never asks. It grows by one line per standard, so a standard
that no project needs costs every docked project a line.

## Measuring a project's setup

A setup's always-on part is not paid once per session. Every request reads the whole
context again, mostly from the prompt cache, so a session of 30 requests reads each
always-on token 30 times. That makes the setup the cheapest thing to cut: a trim repays
in every session, and costs no one a change in how they work.

So docking measures what it wrote, and the steward's `guide` measures a setup when you
ask.
[`cost.md`](../../plugins/marketplace-steward/references/cost.md) holds the rules, and
the steward's script,
[`measure-setup.mjs`](../../plugins/marketplace-steward/scripts/measure-setup.mjs), gets
the numbers:

- **From the files**, what each part of the setup adds to every session, and what loads
  only when a session opens a matching file.
- **From the transcripts** Claude Code keeps for the project, the context at each
  session's first request and across all its requests, the exact text of every skill
  and agent description that loaded, which parts the sessions called, and what each
  agent's runs read and wrote.

The setup is a smaller share of an average request than of the first one, because a
session's context grows with what it reads. A cut to the setup is cheap and costs no
one a change in how they work, but it can only take that small share. The report gives
both shares, and when the second is small it says that the setup is not where the
cost is.

The numbers are tokens, not money. Prices change, and no choice the steward makes
depends on them. The steward changes nothing on the numbers: it proposes, such as a
section of `CLAUDE.md` moved to where it loads on demand, and makes the change after
your yes. A plugin or an MCP server your sessions never used is named with its cost,
because removing it costs a standard you may still want.

The method comes from
[claude-context-optimizer](https://github.com/egorfedorov/claude-context-optimizer),
which measures a session's baseline from its first request and found that, in long
sessions, re-reading the context is most of the cost. Its hooks, its session board and
its own subagents stay out: they change how a person works in every session, and the
steward looks after the setup, not the work. D56 in [decisions](decisions.md) lists what
was taken and why.

## Credits, not only context

Cost isn't only tokens in context. The model is the larger lever, so it follows the
kind of work: Opus plans, in plan mode, and judges in a review; Sonnet does the work and
answers; Haiku runs the tests and collects the corrections. [The base](the-base.md)
explains the split.

An agent also reads its task's files again from an empty context, which was most of
what the earlier steward's trios cost. So the marketplace ships few agents, each for a
job whose input is short or whose output would flood the session. And the checker
leaves out the ablation, which runs a plugin's evals with and without it, because
nobody asked it to spend those credits on every change.

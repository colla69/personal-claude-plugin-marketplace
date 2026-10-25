# Cost

What a plugin costs in every session, why that shapes how skills are cut and described,
why the steward shows only two skills, and how it measures a project's setup. Read this
before you add a skill, or when you wonder whether a plugin is worth enabling.

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
[`evaluate-skills`](../../plugins/marketplace-steward/skills/evaluate-skills/SKILL.md)
weighs against how often a plugin fires. It is small per plugin and paid everywhere, for
as long as the plugin is enabled. That is why set-up installs only what a project shows
a need for: a Vue skill in a Go service is pure cost. The few it installs everywhere,
such as `simple-english`, are there because every project shows that need.

## Why descriptions are trigger lists

The description is the only thing Claude sees when deciding, so it is written as the
phrases people actually type, not as a summary. A description that reads like
documentation costs its tokens in every session and still never fires. One that fires on
the wrong requests costs worse: it loads its whole skill where it doesn't belong, and
competes with the skill that does. The rules for writing one are in
[`style.md`](../../plugins/marketplace-steward/references/author-skills/style.md).

A trio's run skill is the exception. Only you start it, by typing its command, so its
description never reaches Claude and costs nothing always on. It is a summary for your
command list.

## Why the steward shows two skills

The steward is installed for your user, so it is in every session of every project. With
a visible skill for each job and each piece of knowledge, it would add a description for
each of them everywhere, and as many chances to fire on an ordinary request.

It shows two: the front door, which routes a request to one of its four jobs, and
`evaluate-skills`, which its checker preloads. Everything else is in reference files,
which cost nothing until the front door reads one by path. The alternative of hiding
skills doesn't work: a skill with `disable-model-invocation: true` keeps its description
out of context, but no agent can preload it and Claude can't run it.

The estimate for the steward as it stands, from `claude plugin details`, is about 600
tokens always on. The front door's description is the largest part, about 300, because
it carries the triggers of four jobs.

## Measuring a project's setup

A setup's always-on part is not paid once per session. Every request reads the whole
context again, mostly from the prompt cache, so a session of 30 requests reads each
always-on token 30 times. That makes the setup the cheapest thing to cut: a trim repays
in every session, and costs no one a change in how they work.

So keep-current measures it, and set-up measures what it wrote.
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
depends on them. The steward moves only what it wrote and you haven't edited, to where
it loads on demand. A plugin, a trio or an MCP server your sessions never used stays,
named with its cost, because removing it costs a standard you may still want. And it
changes no agent's model on the numbers: they show what a role costs, not what its work
is worth. That stays your call, as D46 in [decisions](decisions.md) says.

The method comes from
[claude-context-optimizer](https://github.com/egorfedorov/claude-context-optimizer),
which measures a session's baseline from its first request and found that, in long
sessions, re-reading the context is most of the cost. Its hooks, its session board and
its own subagents stay out: they change how a person works in every session, and the
steward looks after the setup, not the work. D56 in [decisions](decisions.md) lists what
was taken and why.

## Credits, not only context

Cost isn't only tokens in context. A trio spends credits on each role's run, which is
why Plan and Check are read-only and why each role's `model` and `effort` are set per
task: [trios](trios.md) explains the defaults. Each agent also reads the task's files
from an empty context, which is most of what a trio costs, and why a trio starts only
when you type its command. And the checker leaves out the ablation,
which runs a plugin's evals with and without it, because nobody asked it to spend those
credits on every change.

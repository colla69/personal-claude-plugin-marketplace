# Cost

What a plugin costs in every session, why that shapes how skills are cut and described,
and why the steward shows only two skills. Read this before you add a skill, or when you
wonder whether a plugin is worth enabling.

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
a need for: a Vue skill in a Go service is pure cost.

## Why descriptions are trigger lists

The description is the only thing Claude sees when deciding, so it is written as the
phrases people actually type, not as a summary. A description that reads like
documentation costs its tokens in every session and still never fires. One that fires on
the wrong requests costs worse: it loads its whole skill where it doesn't belong, and
competes with the skill that does. The rules for writing one are in
[`style.md`](../../plugins/marketplace-steward/references/author-skills/style.md).

## Why the steward shows two skills

The steward is installed for your user, so it is in every session of every project. With
a visible skill for each job and each piece of knowledge, it would add a description for
each of them everywhere, and as many chances to fire on an ordinary request.

It shows two: the front door, which routes a request to one of its four jobs, and
`evaluate-skills`, which its checker preloads. Everything else is in reference files,
which cost nothing until the front door reads one by path. The alternative of hiding
skills doesn't work: a skill with `disable-model-invocation: true` keeps its description
out of context, but no agent can preload it and Claude can't run it.

The estimate for the steward as it stands, from `claude plugin details`, is about 580
tokens always on. The front door's description is the largest part, because it carries
the triggers of four jobs.


## Credits, not only context

Cost isn't only tokens in context. A trio spends credits on each role's run, which is
why Plan and Check are read-only and why each role's `effort` is set per task:
[trios](trios.md) explains the defaults. And the checker leaves out the ablation, which
runs a plugin's evals with and without it, because nobody asked it to spend those
credits on every change.

# Skills and roles

Why a skill holds knowledge and a role holds a worker's lane, why the two never mix, and
why the marketplace ships skills but almost no agents. Read this before you write a
skill or a role template, or wonder where a sentence belongs.

## Two kinds of text

> "We have 4 categories of skills, an agent uses a quantity of those, an agent has a
> role."

| | A skill | A role |
|---|---|---|
| **Is** | Knowledge: a prose standard for one thing | A worker's lane: what it does and must not do |
| **Holds** | Every rule, example and ranking for that thing | Its lane, its failure modes, what to do when there is nothing to report, and its report skeleton |
| **Read by** | Every role that needs that knowledge | One agent |
| **Lives in** | Its own plugin | A role template in the steward, from which set-up generates the agent in each project |

An agent is a role plus a chosen set of skills: Plan, Do or Check, with the skills its
step needs. "Skill is the standard, agent is a worker that reads it."

## Why they never mix

**Role text in a skill is read by roles it doesn't describe.** A skill is preloaded by
Plan, Do and Check alike. A sentence such as "you are the agent that writes" or
"disagree before you change anything" tells Plan and Check to act like Do.

**Knowledge in a role has two homes.** A role template that restates a rule from a
skill now holds a second copy. The two get edited apart, and the agents that read them
disagree. So a role template names its job, leaves a slot for the skills set-up fills,
and spends its length on the three things no skill can cover: the failure mode, the
lane, and what to do when there is nothing to report.

The same split runs through reports. The generic skeleton, such as what Plan proposes or
what Check compared, belongs to the role. The report for one kind of work, such as a
refactoring plan or a list of review findings, belongs to that kind's Craft skill.

## Why one skill per plugin

> "If we get one skill per plugin, we can have the initializer create agents with skills
> in a project."

A plugin is the unit you install. With one skill in each, set-up can compose exactly the
skills a project shows a need for, and give each role exactly the ones its step needs.
A plugin with several skills would force a project to take them together, and a role
to load what it doesn't use.

## Why skill plugins ship no agents

**Workers are local.** An agent belongs to the project and the task it was made for, so
it is generated there, not shipped. A shipped agent would compete with the generated
ones for the same requests, and which one answers would be luck. It would also carry a
second copy of the knowledge it was built around.

`check-catalog.mjs` fails on an `agents/` folder in any skill plugin, because nothing
else would notice one.

**The one exception** is the steward, `marketplace-steward`. It works on the knowledge
system itself rather than on a project's work, and it has to exist before any project
agent can, so it can't be generated into a project. It ships two read-only helpers: the
cartographer, which surveys a codebase for set-up, and the checker, which reviews a
change before its pull request. [The steward](the-steward.md) explains why it also
keeps most of its knowledge out of skills.

## What frontmatter makes true

Prose is a request; frontmatter is a constraint. Two rules follow, for every agent the
steward ships or generates:

- **Read-only is frontmatter.** A read-only agent carries
  `disallowedTools: Write, Edit, NotebookEdit`. A description that says "read-only"
  without that line is not read-only.
- **No model.** No agent file names a model, from any vendor. The knowledge has to
  outlive any one tool, and a model name hard-codes one runtime into a file that has to
  stay portable.

The house rules for both shapes are in
[`style.md`](../../plugins/marketplace-steward/references/author-skills/style.md), and
the shape of a plugin in
[`plugin-shape.md`](../../plugins/marketplace-steward/references/author-skills/plugin-shape.md).

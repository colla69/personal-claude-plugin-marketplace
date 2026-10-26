# Skills and agents

Why a skill holds knowledge and an agent holds a job, why the two never mix, and why
the marketplace ships few agents, all of them in its own plugins. Read this before you
write a skill or an agent, or wonder where a sentence belongs.

## Two kinds of text

| | A skill | An agent |
|---|---|---|
| **Is** | Knowledge: a prose standard for one thing | A worker with one job: what it does and must not do |
| **Holds** | Every rule, example and ranking for that thing | Its job, its failure modes, what to do when there is nothing to report, and its report skeleton |
| **Read by** | Every session and agent that needs that knowledge | Itself |
| **Lives in** | Its own plugin | A `marketplace-` plugin |

"Skill = the standard, agent = a worker that reads it" is the house rule. Most work
needs no agent at all: the session reads the skill and does the work.

## Why they never mix

**Agent text in a skill is read by sessions it doesn't describe.** A sentence such as
"you are the agent that writes" or "disagree before you change anything" reaches every
session that loads the skill, including a reviewer that should only read.

**Knowledge in an agent has two homes.** An agent that restates a rule from a skill now
holds a second copy. The two get edited apart, and the two readers disagree. So an
agent names its job, preloads the skills it applies, and spends its length on the three
things no skill can cover: the failure mode, the lane, and what to do when there is
nothing to report.

The same split runs through reports. The generic skeleton, such as what a review found,
belongs to the agent. The report for one kind of work, such as a refactoring plan or a
list of review findings by cost, belongs to that kind's Craft skill.

## Why one skill per plugin

A plugin is the unit you install. With one skill in each, docking can compose exactly
the skills a project shows a need for. A plugin with several skills would force a
project to take them together, and pay for the descriptions of what it doesn't use.

## Why so few agents

An earlier steward generated a Plan, Do and Check agent for each recurring task in each
project. Each agent read the task's files again from an empty context, and that reading
was most of what the work cost. So the rebuild ships an agent only where its job pays
for its own context:

| Agent | Plugin | Why it is an agent |
|---|---|---|
| `guide` | `marketplace-steward` | It reads the whole marketplace in its own context, so the session keeps only the answer |
| `test-runner` | `marketplace-base` | A long test output stays in its context; the session gets only the failures |
| `reviewer` | `marketplace-base` | A review is worth most from a reader who didn't write the work |
| `contribution-checker` | `marketplace-curator` | The same, for a change headed for a public repository |

A skill plugin ships no agents, and `check-catalog.mjs` fails on an `agents/` folder in
one, because nothing else would notice it.

## What frontmatter makes true

Prose is a request; frontmatter is a constraint. Two rules follow, for every agent the
marketplace ships:

- **The edit tools are frontmatter.** A read-only agent carries
  `disallowedTools: Write, Edit, NotebookEdit`. A description that says "read-only"
  without that line still has its edit tools. The line leaves the shell open, and what
  follows is in the lane section of
  [`style.md`](../../plugins/marketplace-curator/references/author-skills/style.md).
- **A model alias, by the kind of work.** Every agent names its model, such as
  `model: opus`. Judgement goes to Opus, answering to Sonnet, running a command to
  Haiku. An alias rather than a full model ID follows new versions without an edit.

The house rules for both shapes are in
[`style.md`](../../plugins/marketplace-curator/references/author-skills/style.md), and
the shape of a plugin in
[`plugin-shape.md`](../../plugins/marketplace-curator/references/author-skills/plugin-shape.md).

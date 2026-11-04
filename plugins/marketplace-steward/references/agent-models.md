# Agent models

How docking sets the model and the effort of the agents a project already has. The
agents the marketplace ships run on Opus, and effort says what the work costs: low for
answering, medium for a review, and so on. Only a task that is mechanical and needs no
thought runs on Haiku. A project's own agents were written before that. Most say
`inherit` or nothing, so they run on whatever the session runs on, and a nightly search
costs what a design review costs.

Docking proposes a model and an effort for each such agent and asks once. It changes
nothing without a yes, because a lower effort on a judging agent costs quality, and
only the people who read the agent's results can see that.

## Which agents

Every file in `.claude/agents/` whose frontmatter has no `model`, or `model: inherit`,
or `model: sonnet`. An agent that names another model was chosen by the project: leave
it. An agent that a plugin ships is not in this folder, and is not touched.

## Which model and effort

Choose by the hardest step the agent does without help:

| The agent mostly | Model | Effort |
|---|---|---|
| Runs a command or fetches a fixed thing and reports it, with no decision to make | `haiku` | `low` |
| Answers a question or does a routine task | `opus` | `low` |
| Does: writes or edits code, text or data from a plan or a brief; reviews | `opus` | `medium` |
| Plans, designs, or judges where a wrong call is costly | `opus` | `high` |

An agent that fetches and then scores what it found against a document judges, so it is
not `haiku` because it searches. When you can't tell, propose the stronger row: a wrong
cheap choice costs a rework, a wrong strong one only costs tokens.

An agent that already has an `effort` keeps it. When an agent that mostly fetches says
`effort: high`, name that in the report and change nothing.

## Ask once

Ask one question for the whole project, with one option for each agent, in the form
"`<agent>` to `<model>` at `<effort>`" and the reason in one line. For an agent that
already has an `effort`, leave out "at `<effort>`": the option changes the model only. The user ticks the
ones to change. Nothing ticked changes nothing. Ask it together with the commit
question, so the user answers once.

## Write it

For each agent the user ticked, write `model: <alias>` in its frontmatter: replace an
`inherit` or `sonnet` line, or add the line after `description`. Add `effort: <level>`
the same way when the agent has none. Write an alias, never a full model ID. Report
each in "Changed", with the old value and the new one.

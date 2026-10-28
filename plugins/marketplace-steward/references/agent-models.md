# Agent models

How docking sets the model of the agents a project already has. The agents the
marketplace ships name their model: Opus judges, Sonnet does, Haiku fetches and runs. A
project's own agents were written before that. Most say `inherit` or nothing, so they
run on whatever the session runs on, and a nightly search costs what a design review
costs.

Docking proposes a model for each such agent and asks once. It changes nothing without
a yes, because a cheaper model on a judging agent costs quality, and only the people
who read the agent's results can see that.

## Which agents

Every file in `.claude/agents/` whose frontmatter has no `model`, or `model: inherit`.
An agent that names a model was chosen by the project: leave it. An agent that a
plugin ships is not in this folder, and is not touched.

## Which model

Choose by the hardest step the agent does without help:

| The agent mostly | Model |
|---|---|
| Fetches and runs: searches, reads pages, runs commands, collects what it finds and reports it | `haiku` |
| Does: writes or edits code, text or data from a plan or a brief | `sonnet` |
| Judges or plans: reviews, scores, compares options, designs, decides what to do | `opus` |

An agent that fetches and then scores what it found against a document judges, so it is
not `haiku` because it searches. When you can't tell, propose the stronger model: a
wrong cheap choice costs a rework, a wrong strong one only costs tokens.

Leave `effort` as the project set it. When an agent that mostly fetches says
`effort: high`, name that in the report and change nothing.

## Ask once

Ask one question for the whole project, with one option for each agent, in the form
"`<agent>` to `<model>`" and the reason in one line. The user ticks the ones to change.
Nothing ticked changes nothing. Ask it together with the commit question, so the user
answers once.

## Write it

For each agent the user ticked, write `model: <alias>` in its frontmatter: replace an
`inherit` line, or add the line after `description`. Write an alias, never a full model
ID. Report each in "Changed", with the old value and the new one.

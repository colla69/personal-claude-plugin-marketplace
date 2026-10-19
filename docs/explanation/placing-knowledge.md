# Placing knowledge

Why a lesson from a project is diagnosed, stripped and placed before anything is
written, and why some of the decisions are yours. Read this before you tell the steward
a lesson, or when you wonder why it put one where it did. The procedure is in
[`place-knowledge.md`](../../plugins/marketplace-steward/references/place-knowledge.md).

## The problem it solves

Knowledge learned in a project arrives tangled with that project. "The report for client
A was off because March's export used net values" holds a lesson that would save the
next team a bad month, and a fact that is only true for client A. Placing it wrong
costs either way:

- **Too general,** and a project's details reach every project that installs the skill,
  in a public repo.
- **Too local,** and a lesson that would have saved the next project stays buried in
  this one.

## Diagnose before writing

Not every complaint about a skill means the skill is wrong. The cause decides where the
fix goes:

| What is really going on | Where the fix goes |
|---|---|
| The skill has the rule, but it never loaded | The wiring: the setup, or the skill's description |
| The skill is wrong everywhere | The skill |
| The skill is right in general, wrong here | The project's `AGENTS.md`, as a local exception |
| Nothing says it, and it would hold anywhere | A skill |
| Nothing says it, and it is only true here | The project's `AGENTS.md` |
| It is about this machine | Nowhere |

The wiring comes first because it is the cheapest to rule out and the easiest to mistake
for missing knowledge: a skill that never loaded looks exactly like a skill with nothing
to say. And a rule that is right in general but wrong here stays as it is, because
weakening it to fit one project would mislead every other.

## Strip, then place

Replace every name, path and value in the lesson with its role, and read what is left.
The report example splits into "before comparing with the previous month, check that
both months use the same basis", which travels, and "client A's exports use net
values", which stays in that project.

The stripped text is the only text that may reach the marketplace. That is how a public
repo learns from private projects without leaking them, and the checker's leak check
makes sure of it before every pull request.

What travels then gets its [layer](layers.md), and goes into the skill that should
already have said it. **Extending a skill beats creating one**: two skills on one topic
means neither is the reference.

## Where it is taste

Most placements follow from the rules. Two don't, and they are yours:

- **A new skill.** Its layer, its name and where it stops are a decision about the cut,
  so the steward asks before creating one.
- **The merge.** Every change reaches the marketplace through a pull request you merge.

When you overrule a placement, at the OK or in the pull request, the case goes into the
procedure's own list of examples, stripped. The judgement grows from your real
decisions instead of from rules written in advance.

## Coming later

Two parts wait until the steward has handled real cases: a list of candidates, for
lessons that stay in their project until they show up in a second one, and evals that
measure how well lessons are placed.

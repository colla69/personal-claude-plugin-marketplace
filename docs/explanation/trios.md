# Trios

Why a task is solved by three agents in sequence, Plan, Do and Check, why there is a
stop after Plan, and why Check checks against the plan. Read this to understand what a
trio will and won't do when you run one.

> "The solution of a task needs a trio of agents with dedicated skills to do the work in
> steps."

## The three roles

| Role | Does | Writes | Knows |
|---|---|---|---|
| **Plan** | Reads, asks, and proposes a plan, then waits | No: read-only | Universal, Craft and Language skills |
| **Do** | Carries out the plan you accepted, and nothing else | Yes: the only writer | Whatever the work needs, including every Framework & Tools skill |
| **Check** | Compares the result with the accepted plan, and sends gaps back to Do | No: read-only | Universal, Craft and Language skills |

A project gets one trio per kind of task it repeats, such as `change` or `refactor`,
each run as `/<task>` by a project skill that set-up writes beside the three agents.

## The stop

**Nothing is done before you accept the plan.** "Ohne deine Bestätigung kein Do": no Do
without your confirmation. A plan is cheap to correct; work carried out on a wrong plan
is expensive to undo, and Check would then check against that wrong plan. So the run
stops after Plan, and only an explicit OK moves it on. A question from you is not an OK.
When Plan asks something, your answer goes back to it for a new version of the plan.

The stop is a step in the procedure, not a technical control. It holds because the run
pattern says so and the agents follow it, which is why the rest of the design keeps the
procedure short and plain.

## What a trio is not

Another way to split the work is one writer with two advisers who only read: a
developer, a reviewer and a refactoring specialist, all working on the same step. That
splits the duties of one step. A trio is a sequence of steps with a gate between Plan
and Do, and the gate is what makes it work: the advisers' split never asks you to accept
anything before the work starts. The marketplace used the advisers' split once, and
moved to trios.

## Why Check checks against the plan

**The plan you accepted is the contract; your request was its input.** If Check judged
the result against the request, it would re-plan the task after the work was done, and
every disagreement with Plan would surface as a defect in Do. Checking against the plan
keeps each role to its step: a gap against the plan goes back to Do, and a problem the
plan never covered goes to you, for the next plan.

The loop is bounded. After two rounds that still don't match, the run stops and shows
you both reports, rather than spending credits on a third.

## Why Plan and Check are read-only and abstract

> "The plan and check should be readonly and only have abstract knowledge by design."

- **Read-only keeps the lanes apart.** If Plan could write, the stop would mean nothing;
  if Check could write, it would fix instead of report, and nobody would check the fix.
  The edit tools are out in each agent's frontmatter, and the role's text keeps the
  shell to reading.
- **Abstract knowledge keeps them on the work, not the tool.** Plan and Check judge what
  is done and whether it is right; how Excel or Vue does it is Do's concern. A tool
  skill in Plan or Check only spends context.
- **Read-only spends fewer credits.** "The plan is to use different efforts for
  different tasks, and read-only access to use less credits."

Some skills go to all three, such as the language the work is written in: "they all
should speak English".

## Model and effort per role and task

Each role carries a `model` and an `effort`. The default effort is Plan `high`, because
a good plan is where the thinking pays most, and Do and Check `medium`. Every role
starts on `opus`, until measuring shows which can run on a cheaper model. Set-up
changes either one only for a reason it can state, and states it in its report.

## The reference case

The monthly report, as the idea was presented:

| Role | Skills |
|---|---|
| Plan | The company vision, the enterprise templates |
| Do | Formatting the monthly report, Excel, PDF, the digital signature |
| Check | Checking texts against the company guidelines |
| All three | The company guidelines, German |

An agent built for one job, such as producing that report, is the Do of its trio, not a
fourth kind of agent. That is the working answer to the one question still open,
[O1](decisions.md#still-open).

The roles' own files are in
[`set-up/roles/`](../../plugins/marketplace-steward/references/set-up/roles/), and the
rules for building a trio in
[`trios.md`](../../plugins/marketplace-steward/references/set-up/trios.md).

# Trios

How a trio is built from the templates in `roles/`. A trio is three agents and the
skill that runs them, for one kind of task this project repeats: Plan proposes and
waits, Do carries out the plan the user accepted, and Check compares the result with
that plan.

## What a trio is made of

| File | Template | Lane |
|---|---|---|
| `.claude/agents/<task>-plan.md` | `roles/plan.md` | Read-only |
| `.claude/agents/<task>-do.md` | `roles/do.md` | The only writer |
| `.claude/agents/<task>-check.md` | `roles/check.md` | Read-only |
| `.claude/skills/<task>/SKILL.md` | `roles/run.md` | Runs the three, invoked as `/<task>` |

Fill every `{{placeholder}}` and keep the rest of each template as it is, frontmatter
included. The root `CLAUDE.md` lists the trios, because which tasks a project has is a
fact about that project.

**Only the user starts a trio**, by typing `/<task>`. The run skill carries
`disable-model-invocation: true`, so Claude can't start it while the user is still
thinking a task through, and a small edit the user just asks for stays a small edit.
The line also keeps the run skill's description out of every session, which is why
that description is a summary for the user's command list, not a list of triggers.

A single-purpose agent, such as the one that produces a monthly report, is the Do of
its trio, not a fourth kind of agent.

## Which trios to create

One trio per kind of task the project repeats, named for the task. Choose them from
what phase 2 found: the work the project's history, tooling and documents show again
and again. The report lists them, and the user removes one they don't want.

- In a repo with code, the usual candidates are `change`, for features and fixes, and
  `refactor`. Add `test` where a test runner is configured.
- Elsewhere, name the trio for the work, such as `monthly-report`.

A task the project does once is a prompt, not a trio.

## Which skills go to which role

1. **Framework & Tools skills go to Do only.** Plan and Check judge the work, not the
   tool it was made with, so a tool skill in them only spends context.
2. **Plan and Check take only Universal, Craft and Language skills**, and each takes the
   ones its own step needs. Do takes whatever the work needs.
3. **A skill every step needs goes to all three**, such as the language the work is
   written in, or guidelines the whole task answers to.
4. **`craft-review:review-work` goes to Check, always.** It says how a result is read
   and what makes a finding.
5. **`universal-work-discipline:work-discipline` goes to Do, always.** It holds the
   standards behind Do's failure modes.
6. **`language-simple-english:simple-english` goes to all three, always, unless the
   trio writes in another language.** Each role writes for a person: the plan, the
   work, the report.
7. **`craft-unit-testing:write-unit-tests` goes to Do wherever Do changes code's
   behavior and a test runner is configured,** such as in `change`. It holds the red,
   green, refactor cycle that `development-standards` makes the way code changes.
8. **`language-conventional-commits:conventional-commits` goes to Do wherever the
   project enables it.** Do is the developer of the trio: its work is what becomes a
   commit.

The reference case is the monthly report: Plan takes the company vision and the
enterprise templates; Do takes formatting the monthly report, Excel, PDF and the
digital signature; Check takes checking texts against the company guidelines; and all
three share the company guidelines and German.

## How a skill is named

Write every skill in `skills:` as `plugin:skill`, such as
`universal-clean-code:clean-code`. A bare name is not reliable: in a test on
2026-10-19, `work-discipline` preloaded and `review-work` silently did not, while both
namespaced forms did.

Phase 7 checks every name against the plugins the project enables, because a missing
one fails silently.

## Model and effort

The templates carry the defaults: Plan on `opus` at `high`, Do on `sonnet` at `medium`,
and Check on `opus` at `medium`. Do runs on the cheaper model because the plan names
what changes and in which files, and Check, on the stronger one, compares the result
with it. Write `model` as an alias, never a full model ID. Change either one only for a
reason you can state, and state it in the report's Trios table.

A trio whose work is documentation, such as `docs` for a project's guides or
`release-notes`, runs all three roles on `sonnet` at `low`. The maintainer chose this
before any measuring, so don't wait for numbers to apply it, and give "documentation
trio" as the reason in the report. Documentation explains a project or a product to
its readers. A trio that produces a deliverable, such as `monthly-report`, keeps the
defaults, and so does a trio that writes code and its documentation together, such as
`change`: there the documentation is a part of the work, not the work.

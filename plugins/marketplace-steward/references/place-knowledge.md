# Place knowledge

Knowledge learned in a project arrives tangled with that project. Placing it means
separating the two first, and only then deciding where the general part lives. Get it
wrong one way and a project's details reach every project that installs the skill. Get
it wrong the other way and a lesson that would have saved the next project stays
buried in this one.

This file is the home of the cut: the layers, how a lesson is placed, and the checks a
skill is cut by. Read it before placing anything, whether the knowledge comes from a
problem someone describes or from a rule in a setup being adopted.

## Contents

- [1. Diagnose before writing](#1-diagnose-before-writing)
- [2. The strip test](#2-the-strip-test)
- [3. Where the general part goes](#3-where-the-general-part-goes)
- [4. The cut, as checks](#4-the-cut-as-checks)
- [5. When it is taste](#5-when-it-is-taste)
- [6. Cases](#6-cases)
- [Where this yields](#where-this-yields)

## 1. Diagnose before writing

Find the cause before deciding what to change. Only some causes mean the knowledge is
wrong, and a fix written into the wrong place leaves the problem where it was.

| What is really going on | How you can tell | Where the fix goes |
|---|---|---|
| The skill has the rule, but it never loaded | The plugin isn't enabled, a `skills:` name doesn't resolve, or the description doesn't win the prompt the user typed | The wiring: the project's setup, or the skill's description. Not the content |
| The knowledge is wrong everywhere | The rule would mislead in a project that shares nothing with this one | The skill |
| Right in general, wrong here | The rule holds elsewhere, and this project has a reason to differ | The project's `AGENTS.md`, as a local exception, and maybe a sharper yield in the skill. The general rule stays |
| Missing, and it would hold anywhere | No skill says it, and something true survives the strip test | A skill, placed by section 3 |
| Missing, but only true here | No skill says it, and nothing survives the strip test | The project's `AGENTS.md` |
| A fact about the machine | True on this computer only: where a tool is installed, whether credentials are set up | Nowhere. Committed files travel, and on the next machine the line is wrong |

Rule out the wiring first. It is the cheapest cause to check and the easiest to mistake
for missing knowledge, because a skill that never loaded looks exactly like a skill
with nothing to say.

## 2. The strip test

Replace every name, path, value and product in the lesson with its role, then read
what is left:

- **Something true, and useful to a project that shares only the kind of work:** that
  part travels.
- **What you stripped out** stays in the project, as a fact in its `AGENTS.md`.
- **Nothing true left:** the whole lesson is a project fact.

"The report for client A was off because March's export used net values" splits into
"before comparing with the previous month, check that both months use the same basis",
which travels, and "client A's exports use net values", which stays.

**The stripped text is the only text that may reach the marketplace.** The marketplace
is public. A client, a system, a person, a folder layout or a project's own command
survives into neither a skill nor its examples, because examples are synthetic too.
Keep the list of what you stripped, and hand it on with the change: the leak check in
`evaluate-skills` compares the change with it before the pull request, and without it
the check can't run.

## 3. Where the general part goes

Stop at the first yes:

1. Is it about what a worker does and must not do, such as a lane or a failure mode?
   It goes in a role template, not a skill.
2. Does it hold for everything, whatever the kind of work? **Universal.**
3. Is it about how a kind of work is done? **Craft.**
4. Is it about what the work is written in: a language, a notation, a template?
   **Language.**
5. Is it about one concrete product or tool? **Framework & Tools.**

Then look for the skill that should already have said it: grep that layer's skills for
the topic. **Extending a skill beats creating one.** Two skills on one topic means
neither is the reference, and the two get edited apart until they disagree.

A new skill has to clear a bar: it carries a standard someone would apply again, on a
different project, months from now. Two things fail it:

- **A single task.** "Move this service to another database" is a prompt, not a skill.
- **Something an existing skill should absorb.** Then that skill grows a section.

Every enabled skill adds its description to every session of every project that
enables it, so a new one has to earn that cost for as long as it exists.

## 4. The cut, as checks

| Rule | The check | What breaking it costs |
|---|---|---|
| One thing | Saying what the skill covers needs no "and" | A project that wants one topic has to install both |
| One layer | The skill answers exactly one of questions 2 to 5 in section 3 | A project that wants the general part has to take the specific part with it |
| One home | No rule in it is stated in another skill; other skills are named, not restated | Two copies get edited separately and then disagree |
| Toward the general | The plugin of every skill it names is in `dependencies`, in its own layer or a more general one, never a more specific one, and needed unconditionally. A pairing that holds only for some projects, such as a framework with one particular language, is decided where skills are chosen for a project, not declared | A named skill that isn't installed is silently replaced by the model's generic taste; a conditional one declared anyway is installed into every project that doesn't need it |
| Knowledge only | No lane, no failure mode, no "you are the agent that…" | Role text in a skill is loaded by every role, including the ones it doesn't describe |
| No project facts | No client, system, module layout, or a project's own commands | The skill is wrong for every other project that installs it |
| Says when to yield | It ends by naming the more specific layer or local convention that overrides it | A standard with no boundary gets applied mechanically |

**Granularity follows reuse.** Cut where a different project would want one part and
not the other. "Java testing with JUnit" is three skills, a Craft skill for the
practice, a Language skill for Java and a Framework & Tools skill for JUnit, because a
Java project on another test framework would otherwise have to take JUnit along. Two
parts that are always installed together and never change apart are one skill.

**A rename, a removal or a split breaks projects without a warning.** Their settings
still name the old plugin, and nothing loads. Flag the change as breaking, and give
the migration with it.

## 5. When it is taste

Two decisions are the user's, because they encode taste rather than follow from the
rules above:

- **A new skill.** Ask before creating one, and show what the decision needs: its layer
  and the question it answers, its name, what it leaves to other skills, and the exact
  public text.
- **The merge.** A change reaches the marketplace only through a pull request the user
  merges.

Everything else follows from sections 1 to 4: an edit to an existing skill, a line in a
project's `AGENTS.md`, a wiring fix. Do it, and report it.

When the user overrules a placement, at the OK or in the pull request, record it. Add
the case to section 6, stripped, in the same change or the next one. Their corrections
are how this file learns where the rules above run out.

## 6. Cases

Real placements, stripped: every name replaced by its role, never by another name.
Add to them; don't edit them away.

| The lesson | Diagnosis | Home |
|---|---|---|
| A generated agent listed a skill by its bare name, and the skill silently didn't load | Never loaded | The wiring: the name became `plugin:skill`. The skill didn't change |
| A project's context file recorded where a tool was installed, and that credentials weren't set up yet | A fact about the machine | Nowhere. The set-up rules now leave such lines out |
| A check needed a local server running first, although the script's own comment said it started one | Missing, only true here | The project's `AGENTS.md` |
| Setting up a project that already had a setup kept settings for plugins that no longer existed | The knowledge was wrong everywhere: the set-up rules said to delete nothing | The set-up rules: such keys are removed |
| A project in a language no Language skill covered got no Language skill at all | Missing, would hold anywhere | A new Language skill, after the user's OK |
| A review skill told the reviewer to diff against `main` with a `git` command | A tool and a project fact inside a Craft skill | The skill, reworded as "the base the user names". The base branch is a project fact |
| A Craft skill said "disagree before you change anything, out loud" | Role text in a skill | The Do role template |
| One Framework & Tools skill covered a framework, its state library and its typed variant | Three things a project would want apart | Three Framework & Tools skills; the two narrower ones depend on the first |
| A Craft skill told the reader to check the language version, and so did each Language skill | One rule, two homes | The Language skills. The Craft skill names them |

## Where this yields

**To the user.** At the OK and in the pull request, their call wins over every rule
here, and it is recorded in section 6, so this file learns where its rules run out.

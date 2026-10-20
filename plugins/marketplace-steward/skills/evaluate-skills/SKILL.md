---
name: evaluate-skills
description: Judge a Claude Code skill, role template or plugin in this skills marketplace, a change to it, or the whole set, by what it makes Claude do. Use whenever someone asks whether a skill is well written, why a skill being written here isn't triggering, or whether a skills-marketplace plugin is ready to merge. Also use before a pull request that changes a skill, a role template, a plugin README or marketplace.json, to catch details of the source project before they go public.
allowed-tools: Read(/${CLAUDE_PLUGIN_ROOT}/**)
---

# Evaluate skills

A skill is judged by what it makes Claude do, not by how it reads. A wordy skill
behaves the same at runtime; a skill whose description is a summary never loads at
all. So every finding answers one question first: does it change behaviour?

Load `craft-review:review-work` first. It holds how any work is read, what makes a
finding, and the report shape; this skill adds what to look for in skills. Then read
the standard, and quote it, so a finding is the house's taste and not the reviewer's:

- `${CLAUDE_PLUGIN_ROOT}/references/author-skills/style.md`, for the writing;
- `${CLAUDE_PLUGIN_ROOT}/references/place-knowledge.md`, for the cut;
- `${CLAUDE_PLUGIN_ROOT}/references/author-skills/plugin-shape.md`, for a plugin's
  files, dependencies and registrations.

## Evidence first

Run these from the root of the marketplace checkout under review, which is this repo
or the steward's worktree, before reading anything critically:

```bash
claude plugin validate ./plugins/<name>                       # does it parse
claude --plugin-dir ./plugins/<name> plugin details <name>    # inventory, token cost
node scripts/check-catalog.mjs                                # lists, layers, deps
node scripts/check-docs.mjs                                   # links, map, wrapping
claude plugin eval ./plugins/<name> --ablation with-without   # does it change anything
```

- `validate` warns "no version specified" and "no description provided" on every
  plugin. Both are the policy.
- `details` needs `--plugin-dir` to measure the files under review. Without it, it
  fails on a plugin that isn't installed, and reports the installed copy of one that
  is. It also counts a skill hidden with `disable-model-invocation`, whose description
  never loads, so its estimate runs high for such a plugin.
- The ablation is the only measurement of whether a plugin changes the outcome. With no
  eval cases, report that, and name the first three cases they should assert.

## Read across the boundary

The most valuable finding is a rule with two homes, and it is invisible in one file.

- For every rule the file states, grep the other skills for it.
- For a skill, read the role templates too; for a role template, the skills it names.
  Role text in a skill and knowledge in a template only show up side by side.
- For a change, read what it touches and everything that names what it touches.

## A skill

Apply every check in section 4 of `place-knowledge.md`, and report a restated rule
with both locations and the file that keeps it. Three checks only an evaluation makes:

- **Does the description fire?** Write three prompts a person would really type, and
  judge whether this description wins them against every other skill, and whether it
  stays quiet on prompts that only sound alike. A description that reads like
  documentation is the most common defect, and it fails invisibly.
- **Is every named skill declared?** `check-catalog.mjs` checks the names that are
  declared. Only reading finds one that is named in prose and never declared.
- **Does it open with a position and attach a cost to each rule? Is it 60–160 lines**,
  with detail in `references/` and the skill saying exactly when to read it?

## A role template, and the run pattern

- **Does the template restate a skill?** It names the job, leaves the skill slot, and
  covers only its lane, its failure modes, what to do when there is nothing to report,
  and a generic report skeleton. A restated skill is the costliest defect here.
- **Is the failure mode specific?** "Be thorough" is not one; "agreeable review, finding
  nothing because nothing jumped out" is.
- **Does the frontmatter enforce the lane?** Plan and Check carry `disallowedTools:
  Write, Edit, NotebookEdit`. Every `skills:` name is `plugin:skill`. `effort` and
  `model` are the defaults unless the plan said why, and `model` is an alias, never a
  full model ID.
- **Does the run pattern keep its stop and bound its loop?** Nothing reaches Do before
  the user accepts the plan, Do gets the plan word for word, and Check sends work back
  a bounded number of times. The stop is a step, never described as enforcement.

## A plugin

1. **Does it load, in the right shape?** As `plugin-shape.md` describes, including what
   a `marketplace-` plugin may do differently.
2. **Will it fire?** The three prompts, as for a skill.
3. **What does it cost?** The always-on tokens, paid in every session that enables it,
   weighed against how often it fires.
4. **Is the prose sound?** The checks above.
5. **Does it change anything?** The ablation, or an honest "no evals".

## The whole set

Build the map before forming an opinion, and report it; the map is half the value:

- the layer of every skill, and whether its prefix and `category` agree;
- every reference from one skill to another, whether a dependency backs it, and whether
  it points toward the general;
- every rule stated in more than one file;
- which descriptions compete for the same prompts.

**The silent-degradation trap matters most, because nothing reports it.** A skill or a
generated agent that names a skill whose plugin isn't enabled carries on with generic
taste, and its output looks like a correct run. Name the symptom the user would see,
not the missing field.

Split only along enablement: would a project ever want one part without the other? A
recommendation to restructure needs a symptom a user would notice; without one it is
an observation. The smallest move that fixes a real symptom wins, and an existing skill
growing a section beats a new plugin far more often than it seems.

## The leak check

Before a change reaches the public marketplace, compare everything it will publish,
which is its diff, its commit messages, its branch name, and its pull request's title
and description, with what identifies the project the lesson came from:

- its folder name, package names and git remote;
- the names of people, clients, systems and products in its `AGENTS.md`;
- the list of what the strip test removed.

A match blocks the pull request, whatever else the change gets right. So does a name
swapped for another name instead of replaced by its role, and a case that still lets a
reader tell which project it came from. A stripped case in `place-knowledge.md` §6 is
the intended form, not a leak.

**Without those inputs, the check has not run.** Say so under its heading. Never report
it as clean, because a clean leak check is what lets a change through.

## Rank by runtime impact

Use `review-work`'s report, and sort into it by what a finding does at runtime:

- **Blocking: changes behaviour.** It won't fire, it fires where it shouldn't, a rule
  has two homes, a lane isn't in the frontmatter, a named skill isn't declared,
  project details leak, or a plugin or skill name leaves the catalog without a row in
  "Renamed and removed", so every project that enables it loses it without notice.
- **Should fix: degrades behaviour.** No yield, uncosted rules, a skill across two
  layers, a report with no way to say "nothing found".
- **Consider: reads worse.** Wording, order, length. Real, but last: only the first two
  justify editing prose that works.
- **Verified:** what you checked and found right, so the reader knows the review's
  edges.

Where a file departs from `style.md` the same way the rest of the repo does, that is the
house style. Note it once, under Consider. For a plugin, add a table after the summary:
validates, shape, always-on cost, the prompts it fires on, what beats it, the ablation.
For the whole set, lead with the map. For a change headed for a pull request, put the
leak check first, under its own heading.

## Where this yields

To the user's merge: the review informs it and never replaces it. To
`craft-review:review-work` for what makes a finding at all. To the house style where it
consistently departs from `style.md`.

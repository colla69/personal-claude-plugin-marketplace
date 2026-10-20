# Contribute

What a project teaches goes back into the marketplace, so the next project starts with
it. A contribution turns a lesson into a change to a skill, or a new skill, on a branch
of the marketplace, checked, with a pull request the user merges.

Files this procedure **reads** sit beside this file unless it says otherwise. Files it
**writes** are always the worktree's copies, never these. The front door's rules hold
throughout. The steward's folder is `~/.local/share/marketplace-steward/`: the clone is
its `clone/`, a worktree lives in `worktrees/<topic>/`, and the texts drafted for one
contribution go in `drafts/<topic>/`. Write every path there in that `~` form, and run
every command exactly as given below, because those are the forms the front door allows
without a prompt.

## 1. Place the lesson

Read `place-knowledge.md` and run it: diagnose the lesson (§1), and when the fix is
knowledge, strip it (§2) and place the general part (§3 and §4).

- **A description that doesn't win the prompt the user typed** is a change to that
  skill: go on to step 2.
- **The project's own wiring, or a local exception,** is fixed in the project as
  keep-current would fix it. **A fact about the machine** is written nowhere. Report
  either, and stop here.
- **A lesson with a project part as well** gets that part in step 7.

Collect the inputs the leak check needs, as "The leak check" in
`../skills/evaluate-skills/SKILL.md` lists them, from the project the lesson came from.

**Arriving from set-up with proposals the user accepted,** their placement and public
text are already decided: skip the placement here and all of step 2, but collect the
leak check's inputs from the project. Run this job once for each accepted skill, each in
its own worktree.

## 2. Ask, if it is a new skill

A change to an existing skill goes ahead. A new skill waits for the user's OK, as the
front door says.

- **A no that names another home** is an overrule: place the lesson there, carry on,
  and add the case to §6 of `place-knowledge.md` in step 4.
- **A plain no** ends the job. In a project with `.claude/steward.json`, add the
  proposal to its `declined`. In a project without one, report the decline and write
  nothing, because a new record would make the next set-up look like an update.

## 3. Get a worktree

Find the house marketplace: the name after the `@` in the `marketplace-steward@<name>`
id in `claude plugin list --json`, and its source in `claude plugin marketplace list
--json`. When that source isn't a GitHub repo, stop and report: there is nowhere to
open a pull request.

- **The first time on this machine,** clone it into the clone folder, in the SSH form
  `git@github.com:<owner>/<repo>.git`, or over HTTPS where SSH isn't set up. Claude Code
  asks once for this command.
- **Every time:**
  1. `git -C ~/.local/share/marketplace-steward/clone worktree list`. Report anything
     left over from an earlier run, and use a topic that is free.
  2. `git -C ~/.local/share/marketplace-steward/clone fetch origin`.
  3. `git -C ~/.local/share/marketplace-steward/clone worktree add -b contrib/<topic>
     ~/.local/share/marketplace-steward/worktrees/<topic> origin/main`.

`<topic>` is two to four words for the change, in kebab-case, with nothing from the
source project in it.

## 4. Write

In the worktree, `<worktree>` below:

- Write the change by `author-skills/style.md`. A new plugin follows
  `author-skills/plugin-shape.md` from its templates, with all three registrations.
- **A rename, a removal or a split** also gets its row in "Renamed and removed" in
  `<worktree>/plugins/marketplace-steward/references/set-up/plugin-catalog.md`, in the
  same change. That row is the migration keep-current applies in every project.
- **An overruled placement** gets its case, stripped, in §6 of
  `<worktree>/plugins/marketplace-steward/references/place-knowledge.md`.
- Verify with `claude plugin validate <worktree>`,
  `node <worktree>/scripts/check-catalog.mjs` and
  `node <worktree>/scripts/check-docs.mjs`. All three must pass.
- Draft every text that will become public, in the stripped wording:
  `drafts/<topic>/commit.txt`, which says what judgement changed and why;
  `drafts/<topic>/title.txt`, the pull request's title in one line; and
  `drafts/<topic>/pr.md`, its description. The description says what changed and
  why, the placement with its layer and whether the skill is new or extended, every
  judgement you had to assume as "Substance" in `style.md` asks, and, for a breaking
  change, the migration.
- Commit: `git -C <worktree> add -A`, then `git -C <worktree> commit -F
  ~/.local/share/marketplace-steward/drafts/<topic>/commit.txt`.

## 5. Check

Start the checker: the Agent tool with `marketplace-steward:contribution-checker`, and
a prompt that holds the worktree, the branch name, what the change is meant to do, the
placement and why, the drafts folder, and the leak check's inputs. Fix what it calls
Blocking or Should fix, commit, and check again, two rounds at most.

**A leak finding, or a leak check that didn't run, stops the job before the push.**
Nothing is public yet: leave the worktree, and report its path and the finding. Any
other finding still open after two rounds goes into `pr.md`, under the checker's
verdict.

## 6. Open the pull request

1. `git -C <worktree> push -u origin contrib/<topic>`. Push only the branch; a push to
   `main` skips the review the merge is.
2. With `gh` signed in, `gh pr create --repo <owner>/<repo> --base main --head
   contrib/<topic> --title "<the line in title.txt>" --body-file
   ~/.local/share/marketplace-steward/drafts/<topic>/pr.md`. Without `gh`, or when it
   fails, give the user the compare link,
   `https://github.com/<owner>/<repo>/compare/main...contrib/<topic>?expand=1`, with
   the title and the description to paste.
3. `git -C ~/.local/share/marketplace-steward/clone worktree remove
   ~/.local/share/marketplace-steward/worktrees/<topic>`, then
   `git -C ~/.local/share/marketplace-steward/clone branch -D contrib/<topic>`. The
   branch lives on in the remote.

When a push or a command fails, keep the worktree, and report its path and the error.

## 7. The project part

When the lesson had a part that is only true in this project, write it into the
project's `CLAUDE.md` now, by `set-up/context-files.md`. It doesn't wait for the merge,
because it is already true here.

## 8. Report

```
## Contributed — <the lesson, stripped, in one line>

**Placed in:** <plugin:skill, new or extended> — <its layer, and why>
**Pull request:** <the link, or the compare link to open>
**Checker:** <its verdict, and what is still open>
**In this project:** <the CLAUDE.md lines written, or "nothing">

After the merge, "update the setup" in each project picks the change up.
```

A job that stopped reports in one or two lines: where it stopped, why, and what is
left, such as a worktree's path.

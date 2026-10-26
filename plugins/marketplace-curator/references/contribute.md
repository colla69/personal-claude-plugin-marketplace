# Contribute

What a project teaches goes back into the marketplace, so the next project starts with
it. A contribution turns a lesson into a change to a skill, or a new skill, on a branch
of this checkout, checked, with a pull request the user merges.

A lesson arrives two ways: a curator describes it, or an issue holds it. Most issues
are corrections that `marketplace-base` collected from someone's session; others are
rules a docking filed "for the curators".

Files this procedure **reads** sit beside this file unless it says otherwise. Files it
**writes** are this checkout's, from its root. Texts drafted for one contribution go in
`~/.local/share/marketplace-curator/drafts/<topic>/`, outside the checkout, so they are
never committed.

## 1. Read the lesson

- **From an issue:** `gh issue view <number> --repo <owner>/<repo> --comments`, where
  the repository is this checkout's `origin`. An issue of corrections can hold several:
  take each one through step 2 on its own.
- **From the curator:** what they describe. Ask for the case when they give only the
  rule: a rule with no case behind it can't be stripped or placed.

## 2. Place it

Read `place-knowledge.md` and run it: diagnose the lesson (§1), and when the fix is
knowledge, strip it (§2) and place the general part (§3 and §4).

- **A description that doesn't win the prompt the person typed** is a change to that
  skill: go on.
- **The project's own wiring, a local exception or a fact about the machine** is not
  the marketplace's to fix. Say so, with the line the project's `CLAUDE.md` could take.
- **One person's taste,** which a standard shouldn't carry, is a decline.

For a lesson that changes nothing here, report it, and propose a closing comment for
its issue. Post it and close the issue, with `gh issue comment` and `gh issue close`,
only after the curator says yes.

Keep the leak check's inputs, as "The leak check" in `../skills/evaluate-skills/SKILL.md`
lists them: here, every name the issue or the curator gave, and the list of what the
strip test removed.

## 3. Ask, if it is a new skill

A change to an existing skill goes ahead. A new skill, or a new team plugin, waits for
the curator's OK, as §5 of `place-knowledge.md` says.

- **A no that names another home** is an overrule: place the lesson there, carry on,
  and add the case to §6 of `place-knowledge.md` in step 5.
- **A plain no** ends the job, as a decline in step 2 does.

## 4. Branch

1. `git status --porcelain`. When the checkout has changes, stop and report them: a
   contribution never carries someone else's work.
2. `git fetch origin`.
3. `git switch -c contrib/<topic> origin/main`.

`<topic>` is two to four words for the change, in kebab-case, with nothing from the
source project in it.

## 5. Write

- Write the change by `author-skills/style.md`. A new plugin follows
  `author-skills/plugin-shape.md` from its templates, with all three registrations.
- **A rename, a removal or a split** also gets its row in "Renamed and removed" in
  `plugins/marketplace-steward/references/catalog.md`, in the same change. That row is
  the migration docking applies in every project.
- **An overruled placement** gets its case, stripped, in §6 of
  `plugins/marketplace-curator/references/place-knowledge.md`.
- **A change to a product file** can make a page in `docs/` wrong. The Sources column
  of `docs/README.md` names the pages each file feeds: reread them, and fix them in the
  same change.
- Verify with `claude plugin validate .`, `node scripts/check-catalog.mjs` and
  `node scripts/check-docs.mjs`. All three must pass.
- Draft every text that will become public, in the stripped wording: `commit.txt`,
  which says what judgement changed and why; `title.txt`, the pull request's title in
  one line; and `pr.md`, its description. The description says what changed and why,
  the placement with its layer and whether the skill is new or extended, every
  judgement you had to assume as "Substance" in `style.md` asks, for a breaking change
  the migration, and `Closes #<number>` for each issue it answers.
- Commit: `git add -A`, then `git commit -F
  ~/.local/share/marketplace-curator/drafts/<topic>/commit.txt`.

## 6. Check

Start the checker: the Agent tool with `marketplace-curator:contribution-checker`, and
a prompt that holds the branch name, what the change is meant to do, the placement and
why, the drafts folder, and the leak check's inputs. Fix what it calls Blocking or
Should fix, commit, and check again, two rounds at most.

**A leak finding, or a leak check that didn't run, stops the job before the push.**
Nothing is public yet: leave the branch, and report the finding. Any other finding still
open after two rounds goes into `pr.md`, under the checker's verdict.

## 7. Open the pull request

1. `git push -u origin contrib/<topic>`. Push only the branch; a push to `main` skips
   the review the merge is.
2. `gh pr create --base main --head contrib/<topic> --title "<the line in title.txt>"
   --body-file ~/.local/share/marketplace-curator/drafts/<topic>/pr.md`. Without `gh`,
   or when it fails, give the compare link,
   `https://github.com/<owner>/<repo>/compare/main...contrib/<topic>?expand=1`, with
   the title and the description to paste.
3. `git switch main`. The branch lives on in the remote.

When a push or a command fails, stay on the branch, and report it and the error.

## 8. Report

```
## Contributed — <the lesson, stripped, in one line>

**Placed in:** <plugin:skill, new or extended> — <its layer, and why>
**Pull request:** <the link, or the compare link to open>
**Checker:** <its verdict, and what is still open>
**Answers:** <the issues it closes, or "no issue">

After the merge, every docked project picks the change up at its next update.
```

A job that stopped reports in one or two lines: where it stopped, why, and what is
left, such as a branch.

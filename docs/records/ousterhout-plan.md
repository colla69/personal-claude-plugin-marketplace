# Brief: test the rules of *A Philosophy of Software Design*

You test the rules of John Ousterhout's book *A Philosophy of Software Design* one by
one. A rule enters the `clean-code` skill only when a measurement shows that the model
breaks it without the skill and follows it with the skill. The same procedure was run
on *Clean Code* in PR #55 and decision D99. Read both before you start.

Read this repository's `CLAUDE.md` and
`plugins/marketplace-curator/references/measure.md` first.

**Status:** proposed 2026-11-15. The rule list waits for approval, and the work starts
after PR #55 is merged.

## Before you start

1. If PR #55 is not merged, stop and ask the user. The new rules go into the
   `clean-code` skill that PR #55 rewrites, so a branch from an older `main` conflicts
   with it.
2. Create the branch `contrib/ousterhout` from `origin/main`.
3. Show the user the rule list below and the three open decisions. Do not write a
   case until the user approves the list in words.

## The procedure

### Step 1: the rule list

Use the list below. If the user edits it, use the edited list.

### Step 2: the probe without the skill

1. Write one case per task (A to L) in `evals/universal-clean-code/<case>/`. Copy the
   format of `evals/universal-clean-code/cart-coupon/`: `case.yaml`, `fixture.sh`,
   `prompt.md` and `graders/`.
2. Write a plain prompt that never names the rule. Where it helps, plant the bad
   pattern in the fixture, to see whether the model keeps it, copies it or removes it.
3. Write one grader per rule. Copy `graders/skill-fired.md` into every case.
4. If a grader checks a file with a pattern, make it a `regex` grader with
   `target: { source: file, path: ... }`, and add a good and a bad probe in `probes/`.
   Then run `node scripts/grader-probe.mjs universal-clean-code <case>`.
5. Otherwise, make it an `llm` grader. An `llm` grader judges only the reply, never a
   file, and it takes no `target`. So end every prompt with "When you are done, show
   every file you changed, whole, in your reply.", and start every `llm` grader with
   "Judge the final `<path>` shown in the reply."
6. Run each fixture once in a temporary folder, to check that it builds.
7. Run the probe in the background:
   `node scripts/eval-skill.mjs universal-clean-code --probe --max-cost 8 --save <dir>`.
   It runs 3 runs per case without the skill, and it costs about $2.
8. Count the passes per grader from `<dir>/now/result.json`. Each run is under
   `cases[].arms`, and each grader under `graders[]` with `passed` and `scored`.
9. Drop every rule that passes 2 of 3 or better. Before you drop or keep a rule on a
   grader that failed every run, read two failing replies: a strict grader can fail a
   right answer.

### Step 3: the first lift

1. Write the surviving rules into `plugins/universal-clean-code/skills/clean-code/SKILL.md`,
   beside the rules already there. Add them to the `description` too.
2. Run the lift in the background:
   `node scripts/eval-skill.mjs universal-clean-code --runs 5 --allow-tools Write,Edit,Bash --max-cost 15 --fails --save <dir> > <dir>.txt 2>&1`.
3. Expect about two hours and about $18. The script prints nothing until it ends: one
   half runs the skill against no skill, the other half runs it against `main`.
4. Keep a rule when its grader passes in 2 or more runs more with the skill than
   without. A difference of 1 is noise.
5. Report the table to the user, with your recommendation, and wait for an answer.

### Step 4: the stored run

1. Cut the rules that showed no lift, and commit.
2. Run `node scripts/eval-skill.mjs universal-clean-code --decide --allow-tools Write,Edit,Bash --max-cost 15 --fails --save <dir> > <dir>.txt 2>&1`
   in the background. It refuses a dirty plugin or cases folder. It costs about $17
   and stores one line in `measurements/results.jsonl`.
3. If a rule loses its lift in this run, ask the user whether to cut it and run
   again, or to cut it and record that the stored line measured more rules.

### Step 5: the records and the pull request

1. Update the `universal-clean-code` row in `measurements/verdicts.md`.
2. Add a decision section before "## Still open" in
   `docs/explanation/decisions.md`, with the next free number (D100 if nobody took it).
   Give each count the way it was reached.
3. Update every place that lists the skill's contents: `.claude-plugin/marketplace.json`,
   `docs/reference/plugins.md`, `plugins/marketplace-steward/references/catalog.md`
   and `plugins/universal-clean-code/README.md`. Find them with
   `grep -rn clean-code --include='*.md' --include='*.json' .`.
4. Run `node scripts/check-docs.mjs`, `node scripts/check-catalog.mjs` and
   `claude plugin validate .`. The warnings "no version" and "no description" are
   the policy.
5. Have the `change-reviewer` agent review the change. Give it the files and the
   measurement output, not your conclusions. Fix what it finds.
6. Commit, push and open the pull request with the stored run's tables in the body.
   End commits and the pull request with the attribution lines your session gives
   you.

## What went wrong last time

- **The shell is zsh.** Do not name a variable `path`: zsh ties it to `PATH`, and
  every command after it fails.
- **`--case` takes one name.** A brace pattern such as `{a,b}` finds no case.
- **A run that prints nothing for an hour is not stuck.** Check with
  `ps -eo pid,etime,cmd | grep "plugin eval"` and the time of the newest
  `/tmp/claude-eval-*` folder.
- **Runs without the skill vary.** The parameter rule passed 0 of 3 in the probe and
  5 of 5 in both lifts. One run is not enough to drop or keep a rule.
- **The skill loaded in every run** once its description listed its rules. Report how
  often it loaded, since the description costs every session.
- **The cost estimate was too low.** Every run without `--probe` also runs against
  `main`, which doubles it. Give the user a total before each paid step.

## The rule list

**A. Deep modules (ch. 4, 6)**
1. A module's interface is much simpler than what it does: few methods, each doing a lot.
2. Make the interface somewhat general-purpose. Build what today's need asks for, but
   in terms that would fit the next caller.
3. No class that only wraps one call or holds one field.

**B. Information hiding (ch. 5)**
4. A design decision, such as a file format or a protocol detail, lives in one module only.
5. Split code by what it knows, not by the order things happen in. Reading, parsing
   and writing one format stay together.
6. Do not expose internal data structures, such as an internal array or map that
   callers can change.

**C. Layers (ch. 7)**
7. No pass-through method that only forwards its arguments to another layer.
8. No pass-through variable threaded through layers that do not use it.
9. Each layer gives a different abstraction from the one below it.

**D. Pulling complexity down (ch. 8)**
10. A module handles its own hard cases instead of handing them to callers.
11. No configuration parameter for something the module can work out itself.

**E. Together or apart (ch. 9)**
12. Do not split a function only because it is long.
13. No conjoined functions, where you must read one to understand the other.
14. Merge code that shares information or is always used together. Separate
    general-purpose code from special-purpose code.

**F. Errors (ch. 10)**
15. Define errors out of existence: an API whose meaning covers the edge case does not
    throw.
16. Mask an exception at a low level when the caller can do nothing different with it.
17. Handle many exceptions in one place rather than at every call.
18. For a failure nothing can recover from, crash with a clear message.

**G. Comments (ch. 12, 13, 15, 16)**
19. Every exported function or class has an interface comment: what it does, its
    parameters and return value, side effects and errors, in terms of the abstraction.
20. A comment adds what the code cannot say: units, ranges, invariants, why.
21. Do not repeat the code in a comment.
22. Put a comment next to the code, not in a commit message.
23. When code changes, update its comments.

**H. Names (ch. 14)**
24. Names are precise. A vague name such as `count`, `data` or `result` fails.
25. One name per concept, used the same way everywhere.
26. A name that is hard to choose signals a muddled design.

**I. Obvious code (ch. 17, 18)**
27. Follow the conventions already in the code.
28. No surprising side effects, and no event or callback indirection where a plain call
    works.
29. A generic container, such as a pair or a tuple, gets a type with named fields.
30. A variable's declared type matches its real type.

**J. Strategic programming (ch. 3, 16)**
31. A change leaves the design as if the system had been built with it from the start.
32. Spend part of each change on improving the design around it.

**K. Trends (ch. 19)**
33. No getters and setters that only expose fields.
34. Prefer composition to implementation inheritance.

**L. Design it twice (ch. 11)**
35. For a design task, sketch two or more different designs before choosing one, and
    say why.

**M. Tests (ch. 19)**
36. Before fixing a bug, write a test that fails because of it. Chapter 19's main
    point, that test-first development designs one test at a time instead of the
    module as a whole, leaves nothing in a reply to grade, so it is not tested.

Left out: performance (ch. 20), and the definitions of complexity (ch. 2).

## Open decisions for the user

1. **Rules 19 and 20 against the Clean Code rule "write no comment that says what the
   next line does".** An interface comment describes the abstraction, not the next
   line, so the two need not clash. Test both, and let the user decide if they do.
2. **Chapter 19 criticises test-driven development**, against the test-first rule in
   `development-standards`. Decided 2026-11-15: only its bug-fix rule is tested, as
   rule 36.
3. **Where the kept rules go.** The recommendation is the `clean-code` skill, not a new
   plugin, since a second description costs every session.

# Step 1 audit

Read-only audit of the nine plugins against `concept.md` §4.2, for step 1 of `plan.md`.
Line numbers refer to commit `c885cec`.

**Status:** answered 2026-10-19. The decisions are D17 to D22 in `plan.md`, and J1
is still open there as O2. Section 1 is `@marketplace-architect`'s
system view. I spot-checked it, and the parts that were wrong are corrected below.
Section 2 is my own classification of the agents. Section 3 holds the judgement calls,
and section 4 lists the fixes each later step picks up.

---

## 1. Skills: layers, cuts, one home, dependencies

### Layers

All nine agree with plan §3:

| Skill | Layer | Note |
|---|---|---|
| `clean-code` | Universal | Lines 66–74 (inward dependencies) are architecture, which the author's examples also count as Universal |
| `development-standards` | Craft | Contains a Universal part (J2) |
| `review-changes` | Craft | Lines 15–17 name `git` and `main`, which are a tool and a project fact |
| `refactor-safely` | Craft | Line 29, "commit", assumes `git` |
| `write-unit-tests` | Craft | Only the examples at lines 39 and 49 are framework-flavoured. No cut needed |
| `java-conventions` | Language | Lines 81–85, on DI, lean toward a framework. Borderline; keep |
| `typescript-conventions` | Language | — |
| `vue-conventions` | Framework & Tools | Mixes in other products (J4) |
| `init-agent-setup` | marketplace | `plugin-catalog.md:63–78` names the fourth layer "Framework" and calls tooling "a fifth thing". That contradicts §4.1, where Framework & Tools includes tools |

### Cuts

- `development-standards`:
  - lines 27–37 move to the Do template (section 2.8);
  - lines 19–21 (check the language version) are deleted, because the Language skills
    own that check;
  - the Universal part splits out (J2).
- `review-changes:15–17`: reword without tool commands, for example "the diff against
  the base the user names". The base branch is a project fact.
- `vue-conventions`:
  - lines 58–73 cover Pinia and a query layer, which are other products (J4);
  - lines 8 and 17–29 assume TypeScript (J5);
  - it has no "Where this yields" section (rule 5).

### One home

Each rule below is stated in more than one place. The "Home" column says where it should
live.

| Rule | Occurrences | Home |
|---|---|---|
| Wait for the third occurrence | `clean-code:70–72`, `refactor-safely:51`, `refactoring-specialist:69–70` | `clean-code` |
| Match the neighbours; don't add a second way | `development-standards:14–25`, `write-unit-tests:13–16`, `clean-code:88–90`, `typescript-conventions:57–58`, `java-conventions:89–90`, `vue-conventions:8–10`, `vue-developer:10–13`, `developer:30–31`, `clean-code-reviewer:23–25` | The Universal skill from J2 |
| Note bugs; don't fix what is out of scope | `development-standards:43–44`, `refactor-safely:24–25`, `refactoring-specialist:48–50`, `developer:21–24` | The Universal skill from J2 |
| Run the project's own checks before saying "done" | `development-standards:55–70`, `developer:26–28`, `unit-tester:15`, `vue-developer:19` | The general rule goes to J2; the typecheck → tests → lint order stays in `craft-development` |
| Don't reformat lines you didn't touch | `development-standards:45–46`, `refactor-safely:54` | `craft-development` |
| No silent change to a public interface | `development-standards:47–48`, `refactor-safely:53` | `craft-development` |
| Don't touch stable code for tidiness | `clean-code:84–86`, `refactor-safely:46–52`, `refactoring-specialist:44–46` | `clean-code` |
| Never swallow an error ("delay fuse", verbatim twice) | `clean-code:43–44`, `java-conventions:63–64` | `clean-code` |
| One error mechanism per layer | `clean-code:47–48`, `java-conventions:70–71` | `clean-code` |
| Check the version first | `development-standards:19–21`, `java-conventions:25–27`, `vue-developer:15–17` | The Language skills |
| Tests must fail when the code is wrong | `write-unit-tests:8–9,49–50,63–65`, `review-changes:35–37`, `unit-tester:34–35` | `write-unit-tests` |
| Safety net and characterization tests | `refactor-safely:13–22`, `refactoring-specialist:37–42` | `refactor-safely` |
| Order of transformations | `refactor-safely:32–39`, `refactoring-specialist:31–32` | `refactor-safely` |
| Trace one concrete input | `review-changes:26–27`, `code-reviewer:25–27` | J1 |
| Disagree before the edit (verbatim twice) | `development-standards:31–35`, `developer:15–17` | The Do template |
| The review trio, "all three or none" | `init-agent-setup:223–228`, `plugin-catalog.md:22,24,103–117` | Superseded; deleted in step 6 |
| The init skill restates its references | `init-agent-setup` against `plugin-catalog.md`, `plugin-sources.md` and `context-files.md`, in about a dozen places | The references. The architect's line numbers for `plugin-sources.md` were wrong (the file has 159 lines), so step 6 re-finds these |
| `description` | It is set in both `plugin.json` and `marketplace.json` for all nine plugins, and the two already differ for `developer`, `java-dev` and `typescript-dev`. The manifest wins silently (§5.2) | J6 |

### Dependencies

- Every declared dependency points toward Universal (`clean-code`). Nothing points the
  wrong way.
- **Two dependencies are justified only by agent files.** `review-changes` and
  `refactor-safely` never mention `clean-code`; only `code-reviewer:9` and
  `refactoring-specialist:9` do. Once step 7 deletes the agents, those dependencies
  have no reason left (J7).
- `development-standards:79` and `typescript-conventions:94` name the plugin
  `vue-dev`. A yield should name the layer, not a plugin.
- **Nothing validates a dependency.** `claude plugin validate` passes a plugin whose
  `dependencies` names a plugin that doesn't exist; I confirmed this in the scratchpad.
  `check-catalog.mjs` doesn't read `dependencies` either. A dependency missed in the
  step 3 rename would be reported by nothing.

### Code-only wording and role text in skills

- `development-standards:3`: its trigger "acting on findings from a reviewer or
  refactorer" is trio role text.
- `clean-code:3,8–9`: "when another agent needs to justify…" and "edit this file"
  describe how maintainers and agents use the file, which isn't knowledge.
- `plugin-catalog.md:70–71`: it defines Universal as "what good code looks like" and
  Craft as "how to work in someone else's codebase", both code-only (§2).
- `init-agent-setup:3,8,223` and phase 2 say "codebase", "cold repository" and "any
  repo with code in it". As written, init would not fire on step 9's folder with no
  code.
- The `plugin.json` descriptions of `clean-code`, `developer`, `java-dev`,
  `typescript-dev` and `vue-dev` advertise agents, which will be untrue after D2.

### Competing triggers

These requests would trigger two skills at once:

- `clean-code` and `refactor-safely`: "clean up this code".
- `clean-code` and `review-changes`: "review this for code quality".
- `write-unit-tests` and `review-changes`: "are the tests in this PR any good?"
- `java-conventions` also fires on "Gradle/Maven build" in a Kotlin or Scala repo.

### Rename hazards

Each place below names a plugin by its old name and has to change in step 3. A missed
one keeps working until the rename, then breaks silently, unless noted otherwise.

- `settings-template.json:11–14`: four `enabledPlugins` keys that are copied into
  projects.
- `dependencies` in five `plugin.json` files. Nothing validates them (see above).
- `init-agent-setup:110`: `project-init:codebase-cartographer` is a namespaced agent
  id. If it goes stale, init quietly explores in the main context instead.
- Plugin names in prose:
  - `init-agent-setup:265–270,312`;
  - `plugin-catalog.md` throughout;
  - `development-standards:79` and `typescript-conventions:94`;
  - `README.md`, including the user-typed `/project-init:init-agent-setup`;
  - every plugin README's install line;
  - `CONTRIBUTING.md`, `/new-plugin`, `authoring-style.md:158–159`, and
    `marketplace-architect.md`.
- `check-catalog.mjs` only checks that the declared names are present, so stale old
  names left in the tables pass.
- `clean-code` is the name of both a plugin and a skill. After the rename the plugin is
  `universal-clean-code` and the skill keeps its name, so each mention has to be read
  to tell which one it means.

### Verified sound

- No skill names a client, a system or a module layout. The examples, such as
  `TemplateConfig.java` and `useCartStore`, are synthetic.
- There are no `version` fields and no `model:` in any agent, and every read-only
  agent carries `disallowedTools`.
- `.claude-plugin/` holds only `.json` in all nine plugins.
- `java-conventions:46–47` refers to `clean-code`'s "missing type" instead of
  restating it. That is the right form.

---

## 2. Agents, section by section

This is the checklist for step 7: no agent file is deleted until every row has landed.

**Labels:**

- **P**: points at a skill, and becomes the role template's skill slot.
- **R**: role text: the lane, a failure mode, what to do when there is nothing to
  report, or the report shape.
- **S**: standard text.

**Actions:**

- **dup**: already in a skill, so the copy in the agent is deleted.
- **move**: exists only in the agent, so it moves to the home named.

No agent holds a project fact.

### `developer`

| Lines | Label | Content | Action |
|---|---|---|---|
| 7–8 | P | `development-standards`, `clean-code` | Do skill slot |
| 10–13 | R | The only writer; implements what it was handed without re-deriving it | move → Do template. "Findings from the reviewer" becomes "the accepted plan" |
| 15–17 | R | Disagree before the edit, out loud; then implement what was agreed | move → Do template. The same text is in `development-standards:27–37` (see 2.8) |
| 21–24 | R | Failure mode: silent scope expansion | move → Do template. The standard behind it, `development-standards:39–51`, stays in the skill |
| 26–28 | R | Failure mode: reporting unverified work as done | move → Do template. The standard behind it, `development-standards:53–70`, stays |
| 30–31 | R | Failure mode: rewriting instead of fitting | move → Do template. The standard behind it, `development-standards:12–25`, stays |
| 33–57 | R | Report: implements, changes, verified, out of scope, needs a decision | move → Do template, as the generic Do report. "Implements" becomes "the accepted plan, item by item" |

### `code-reviewer`

| Lines | Label | Content | Action |
|---|---|---|---|
| 8–9 | P | `review-changes`, `clean-code` | Check skill slot |
| 11–16 | R | Read-only; hands structural findings to the refactorer | move → Check lane: "say what is wrong, not what shape fixes it". The hand-off itself is replaced by D16: Check sends the work back to Do, and a structural problem goes into the next Plan |
| 18–21 | R | Read the result as written, not as described | dup of `review-work` ("Read it as written"), where step 4 put it under J1. Check preloads that skill always, and the Check template names it |
| 23–27 | R | Failure mode: agreeable review | move → Check template. Its method, "trace one input", is a dup of `review-changes:26–27` |
| 29–30 | R | Failure mode: padded review | move → Check template, merged with `clean-code-reviewer:45–46` |
| 32 | R | If it's fine, say what you checked, and stop | move → Check template |

### `refactoring-specialist`

| Lines | Label | Content | Action |
|---|---|---|---|
| 8–11 | P | `refactor-safely`, `clean-code` | Plan skill slot, for refactoring tasks |
| 13–15 | R | Read-only; the output is a plan that someone else executes | move → Plan lane |
| 17–20 | R+S | Write for a human, with a concrete example | Split. "Each step concrete enough to carry out without re-deriving it" → Plan template; the example → `craft-refactoring` |
| 22–29 | S | The four parts of a prescription: seam, shape after, reason, order | move → `craft-refactoring`. The skill does not have it |
| 31–33 | S | Step order; every step leaves working code | move → `craft-refactoring`, merged into the transformation list at `refactor-safely:30–40` |
| 37–42 | S | No safety net means characterization tests first | dup of `refactor-safely:12–22` |
| 44–46 | S | Don't prescribe past the goal | dup of `refactor-safely:46–55`, except "every recommendation names the change it makes cheaper", which moves → `craft-refactoring` |
| 48–50 | S | Note bugs; don't fix them in the refactor | dup of `refactor-safely:24–25` |
| 52–74 | S | The format of a refactoring plan | move → `craft-refactoring`. The Plan template points to it ("use the Craft skill's plan format when it has one") |
| 76–77 | R | Hand the plan over; if nothing is needed, say so and stop | move → Plan template |

### `unit-tester`

| Lines | Label | Content | Action |
|---|---|---|---|
| 7–8 | P | `write-unit-tests` | Do skill slot, for test tasks |
| 10–13 | R+S | Edit test files only; stop when production code would have to change | Split. The lane → Do template, as the test-task variant. "Making code testable is a separate change" → `craft-unit-testing` |
| 15 | S | Run the suite: "a test you wrote but did not execute is a guess" | move → `craft-unit-testing`. Its Verify section (`write-unit-tests:61–67`) has the step but not the line |
| 17–32 | S | Test report: run, covered, deliberately not covered, gaps | move → `craft-unit-testing`. It expands `write-unit-tests:67` |
| 34–35 | S | A suite that can't fail is the bigger finding | dup of `write-unit-tests:61–65`, except "say so prominently", which moves |

### `clean-code-reviewer`

| Lines | Label | Content | Action |
|---|---|---|---|
| 8–10 | P | `clean-code` | Check skill slot |
| 12 | R | Reports; does not edit | move → Check lane |
| 16–21 | S | A finding needs a cost; drop the ones without | move → the home decided by J1 |
| 23–25 | S | The file's own style wins; note the divergence once | dup of `clean-code:88–90`, except "once, at the end, not every instance", which moves → `universal-clean-code` |
| 27–43 | S | Report grouping: fix now, fix while you're here, noted | move → `universal-clean-code`, as the report form of its cost ranking (`clean-code:78–86`) |
| 45–46 | R | Failure mode: manufacturing findings | move → Check template, merged with padded review |

### `vue-developer`

| Lines | Label | Content | Action |
|---|---|---|---|
| 7–8 | P | `vue-conventions` | Do skill slot |
| 10–13 | S | Read the neighbours; the project's patterns win | dup of `development-standards:12–25` and `vue-conventions:8–10`. The examples (forms, UI library) move → the yield section of `tools-vue` |
| 15–17 | S | Check the Vue major version and whether TypeScript is used | The version check is a dup of `vue-conventions:8–10`. "Check whether TypeScript is used" moves → `tools-vue` |
| 19 | S | Verify that it compiles and typechecks | dup of `development-standards:53–70` |
| 20–21 | S | After adding a composable or a store, say what you would test | move → `tools-vue`, composables section |

### `codebase-cartographer`

It stays in `marketplace-init`, unchanged (D15). One overlap to fix in step 6: its "How
to explore" (lines 15–31) repeats phase 2 of `init-agent-setup`. One of the two
becomes the home, and the other refers to it.

### 2.8 Role text inside a skill

`development-standards:27–37`, "Implement what was prescribed", is the Do role. It
names the reviewer and refactorer and says how to receive their output. It moves to
the Do template with `developer:15–17`.

---

## 3. Judgement calls for you

**J1. Generic review craft.** Part of what the agents and `review-changes` know holds
for checking any work, not only code. That part is:

- a finding needs a cost;
- read the result as written, not as described;
- trace one concrete case;
- a "Verified" section that says what was checked;
- a confident wrong finding costs more than an honest uncertain one.

Today that knowledge is spread over `code-reviewer`, `clean-code-reviewer` and
`review-changes`. The code-only parts are the `git` commands, the security checks and
the API impact.

- **Recommendation:** a new Craft skill, `craft-review`, holding the generic part.
  `craft-code-review` keeps the code part and depends on it. The monthly-report Check
  then has a review skill to load without pulling in `git`.
- **Open:** you asked why not Universal (plan, O2).

**J2. The Universal part of `development-standards` (D7).** Four of its sections hold
for any work done in someone else's space, not only for code:

- read before writing;
- match what is already there;
- hold scope;
- don't report unverified work as done.

The code-specific parts are the language-version check, the order typecheck → tests →
lint, reformatting, and public interfaces.

- **Recommendation:** split the four general sections into a Universal skill, with a
  name to be decided. `craft-development` keeps the code part.
- **Decided:** as recommended (D17).

**J3. Where report formats live.** This audit assumed one rule:

- a role's generic report skeleton lives in its role template;
- the report for a kind of work lives in that kind's Craft skill. Examples are the
  refactoring plan, the test report and the clean-code grouping.

The architect found the same gap from the other side: plan step 5 also puts "the report
shape" in the role templates, which would give reports two homes. The rule needs stating
in the house rules (step 2).

- **Recommendation:** adopt it as written.
- **Decided:** as recommended (D18).

**J4. Pinia and the query layer in `vue-conventions`.** Lines 58–73 are about other
products. A Vue project without Pinia would want everything except those lines.

- **Recommendation:** make the section conditional ("if the project uses Pinia"), and
  split it into its own skill only once it grows. Sixteen lines don't justify a plugin.
- **Decided otherwise:** split it into its own skill now (D19).

**J5. `vue-conventions` assumes TypeScript.** The rule in `plugin-catalog.md:90–92` is
that a framework never unconditionally needs a language.

- **Recommendation:** make the TypeScript parts conditional, and declare no
  dependency.
- **Decided otherwise:** the TypeScript parts leave `vue-conventions` for a skill of
  their own (D20).

**J6. One home for `description`.**

- **Recommendation:** the marketplace entry, which `check-catalog.mjs` already
  requires. Remove `description` from every `plugin.json`. In step 3, first verify which
  of the two `claude plugin list --available` shows.
- **Decided:** as recommended (D21).

**J7. The `clean-code` dependencies of `craft-code-review` and `craft-refactoring`.**

- **Recommendation:** each skill gains one explicit reference. Review judges quality by
  `clean-code`, and refactoring defines "better" by it. That keeps both dependencies
  true once the agents are gone.
- **Decided:** as recommended (D22).

---

## 4. Fixes the later steps pick up

| Step | Fix |
|---|---|
| 3 | `check-catalog.mjs` checks that every name in `dependencies` exists in the marketplace, because nothing else does |
| 3 | `check-catalog.mjs` fails on a plugin name in a table that isn't in the marketplace, not only on a missing one |
| 3 | Every rename hazard in section 1, including `settings-template.json` and the cartographer's namespaced id |
| 3 | `plugin-catalog.md`'s layer table: "Framework" becomes Framework & Tools, the "fifth thing" paragraph goes, and the layer definitions stop assuming code |
| 4 | Every one-home row in section 1 |
| 4 | Yields name a layer, not a plugin (`development-standards:79`, `typescript-conventions:94`) |
| 4 | Give each pair of competing triggers in section 1 its own wording, so that a request fires one skill |
| 4 | `review-changes:15–17` without `git`; check whether "commit" at `refactor-safely:29` should stay, given that init never touches git |
| 4 | Remove the agent and trio wording from `clean-code:3,8–9` and `development-standards:3` |
| 4 | Add a yield section to `vue-conventions` |
| 6 | The init description and phase 2 stop assuming code, so that init fires on a folder with no code |
| 6 | One home for the survey: the cartographer or phase 2 |
| 7 | `plugin.json` descriptions stop advertising agents (or disappear, under J6) |

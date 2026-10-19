# Documentation: plan

How the repo's documentation gets rewritten from scratch, as a project of its own. D and
O numbers continue the ones in `plan.md` and `package-plan.md`.

**Status:** approved 2026-10-19, on branch `marketplace/one-package`. Steps 1 and 2 are
done; the plan runs on to step 8, and stops there (D43). It replaces the documentation
half of step 7 of `package-plan.md`. The package plan's trials and merge come after it,
because the documentation describes the steward, and both reach `main` together.

---

## 1. Why a rewrite

The documentation grew in layers, one restructuring at a time, and it shows:

- **It restates the product.** `CLAUDE.md`, `CONTRIBUTING.md` and
  `.claude/rules/authoring.md` each repeat the cut and the house style, whose homes are
  now the steward's references. Every repeat is a second home that drifts.
- **It mixes kinds.** The root README is a landing page, a tutorial, a reference and an
  explanation at once, so a newcomer can't find the start and a returning reader can't
  find the table.
- **It explains to an agent, not a person.** `concept.md` is a brief for the agent that
  restructured the repo. It is the only explanation of the idea, and it reads like a
  work order.
- **It has gaps.** Nothing explains the permission prompt the steward asks once, where
  its clone lives and why, how to work on the steward itself, how to migrate a project
  from the old plugin names, or what to do when a skill doesn't load.

## 2. Goals

1. **Someone new gets from nothing to a working setup in one sitting**, following one
   page.
2. **Every idea is explained once**, with the reason behind it.
3. **Every task has a guide**, and every file, command, setting and check has a
   reference entry.
4. **Every decision can be found** with its date and its reason.
5. **The docs never restate a rule the product holds.** They explain it and link to it.
6. **No page names a real project**, client or person. The repo is public.

Extensive in coverage, short per page. "So much text" was the author's complaint about
the first init (concept §8.2), and it holds here too: each page does one job, in
tables and one-liners, and links instead of repeating.

## 3. Readers

| Reader | Needs | Starts at |
|---|---|---|
| **A newcomer** who installs the marketplace | What this is, whether it is for them, the first setup | `README.md`, then the first tutorial |
| **A daily user** of the steward in projects | The task in front of them: adopt a setup, add a trio, keep it current, contribute a lesson | The guides |
| **The maintainer**, working on the marketplace and the steward | The development loop, the checks, the house style, the decisions | `CONTRIBUTING.md`, then the contributing pages |
| **Someone weighing the idea**, such as the presentation's audience | Why knowledge central and workers local, why layers, why trios | The explanation pages |
| **Claude**, in a session on this repo | What it cannot infer: commands, boundaries, where the rules live | `CLAUDE.md` |

The docs are written for the public, assuming no context: the concept's own line is
"what one person learns benefits everyone". Today the only contributor is the
maintainer (D28), so the contributing pages say so, and say what would change for
others.

## 4. What exists, and what happens to it

| File | Lines | What it does now | What happens |
|---|---|---|---|
| `README.md` | 160 | Landing, cycle, layers, install, plugin table, usage, layout | Rewritten as a short landing page that links to everything |
| `CONTRIBUTING.md` | 163 | The bar, anatomy, registrations, versions, dev loop, checks, commits | Rewritten short: how to contribute, and a pointer to the contributing pages. Its knowledge already lives in `plugin-shape.md` |
| `CLAUDE.md` | 155 | Agent instructions, restating the cut, the style and the boundaries | Rewritten lean: what an agent can't infer, and where the rules live |
| `.claude/rules/authoring.md` | 81 | Restates the cut and the style when skill files are edited | Cut to a pointer, or removed (O10) |
| `docs/records/concept.md` | 829 | The design brief, for an agent | Dissolved (D39): its explanations move into the docs, its rules into the product, and the file goes once every section has a home (section 8) |
| `docs/records/plan.md`, `package-plan.md`, `audit.md` | 1237 | Working plans and the audit | Stay as records. Their decisions are gathered into one log |
| `plugins/*/README.md` | 31–68 each | One per plugin, from the old template | Rewritten from a new template |
| `LICENSE` | 201 | Apache 2.0 | Unchanged |

**Not documentation, and not rewritten here:** the skills, the steward's references and
its agents. They are the product. The docs link to them, and a finding about them goes
to the steward, as a contribution, not into a doc.

## 5. Principles

Since step 1, these principles live in `docs/contributing/writing-docs.md`, which every
page is written and reviewed by. The list below is the record of what the plan set out.

- **Four kinds of page, kept apart.**
  - **Tutorials** teach by doing.
  - **Guides** get one task done.
  - **Reference** is looked up.
  - **Explanation** says why.

  A page that mixes them serves none of its readers well. This is the Diátaxis split,
  which is widely used and easy to hold a page against.
- **One home.** A rule lives in the product, and a doc explains it and links to it. A
  fact about how this repo works lives on exactly one page. Where a doc needs a rule to
  make sense, it states the gist in one line and links to the home.
- **The product never depends on the docs.** The plugin cache holds no `docs/`, so no
  skill or reference may tell Claude to read a doc, or yield to one. Today
  `place-knowledge.md` yields to `concept.md`. With the concept dissolved, the product
  is the authority for its own rules, and the docs explain them.
- **The house voice applies:**
  - each page opens with what it lets the reader do;
  - every rule carries its reason;
  - examples are concrete and named;
  - there is no hedging;
  - lines wrap at 88 columns.

  The voice section of `author-skills/style.md` is its home.
- **Plain Markdown, rendered by GitHub, with no build** (O7). Diagrams are Mermaid,
  which GitHub renders.
- **Examples are synthetic.** No real project, client or person, in any example or
  screenshot.
- **Every page is reachable from the map**, `docs/README.md`, and no page is left off
  it.

## 6. The structure

```
README.md                    the landing page
CONTRIBUTING.md              how to contribute, in one screen
CLAUDE.md                    for Claude: what it can't infer
docs/
  README.md                  the map: every page, by kind and by reader
  tutorials/
    first-setup.md
    first-contribution.md
  guides/
    set-up-a-project.md
    adopt-an-existing-setup.md
    add-a-trio.md
    run-a-trio.md
    keep-a-setup-current.md
    contribute-a-lesson.md
    review-a-skill.md
    write-a-skill-by-hand.md
    migrate-from-old-names.md
    work-on-the-steward.md
    troubleshoot.md
  reference/
    plugins.md
    the-steward.md
    project-files.md
    permissions.md
    commands.md
    checks.md
    glossary.md
  explanation/
    the-idea.md
    layers.md
    skills-and-roles.md
    trios.md
    the-steward.md
    placing-knowledge.md
    safety.md
    cost.md
    decisions.md
  contributing/
    development-loop.md
    writing-docs.md
    releases-and-migrations.md
  records/                   the working records: the plans and the audit
plugins/<name>/README.md     one per plugin
```

## 7. Page by page

Each entry says what the reader can do after the page, what it covers, where its
substance comes from, and a length target.

### Entry points

- **`README.md`** (80–120 lines). The reader can decide whether this is for them and
  get started. What it is in two sentences, the cycle as a diagram, the five-minute
  start, the plugins by layer in one line each, and a map of the docs. Sources: today's
  README and the concept.
- **`CONTRIBUTING.md`** (40–60). The reader knows how a change gets in: through the
  steward, or by hand, and what the checks are. It links to the contributing pages.
- **`CLAUDE.md`** (50–80). Claude knows what it can't infer: the commands, the
  boundaries that would silently break something, where the rules live, and how to
  load the steward in this repo. It restates nothing the product holds.
- **`docs/README.md`** (60–90). The map: every page, grouped by kind, and a "start
  here" per reader.

### Tutorials

- **`first-setup.md`** (150–250). The reader installs the marketplace, sets up a small
  synthetic project, reads the report, runs one trio through Plan, the OK, Do and Check,
  and understands what landed where. Built on a sample project the page itself
  describes, so anyone can follow it. Sources: set-up's procedure and report, the run
  pattern.
- **`first-contribution.md`** (150–250). The reader turns a lesson into a pull request
  and watches each safeguard work: the placement, the strip test, the checker, the leak
  check, the PR. Sources: `contribute.md`, `place-knowledge.md`. Both tutorials are
  marked "not yet tried" until the trials run them (step 5).

### Guides

| Page | The task | Sources | Lines |
|---|---|---|---|
| `set-up-a-project.md` | Set up a codebase or a folder with no code: what you'll be asked, what you'll get, how to review it | `set-up/procedure.md`, `context-files.md` | 80–120 |
| `adopt-an-existing-setup.md` | Bring a project with its own `CLAUDE.md`, rules, agents or hooks onto the marketplace, and read the Adopted table | `adopt.md`, `record.md` | 100–150 |
| `add-a-trio.md` | Add a trio for one more recurring task | `trios.md`, the roles | 50–80 |
| `run-a-trio.md` | Use `/<task>`: the plan, the OK, sending work back | `roles/run.md` | 60–90 |
| `keep-a-setup-current.md` | Update a setup after the marketplace or the project changed | `keep-current.md` | 70–100 |
| `contribute-a-lesson.md` | Tell the steward a lesson, answer its one question, review the PR | `contribute.md` | 70–110 |
| `review-a-skill.md` | Use `evaluate-skills` on a skill, a plugin, a change or the whole set | `evaluate-skills` | 50–80 |
| `write-a-skill-by-hand.md` | Add or change a skill without the steward | `style.md`, `plugin-shape.md`, `place-knowledge.md` | 80–120 |
| `migrate-from-old-names.md` | Move a project and a machine off `clean-code`, `vue-dev`, `project-init` and the rest | The Renamed table, keep-current | 40–70 |
| `work-on-the-steward.md` | Load the working copy with `--plugin-dir` and its dependencies, probe a mechanic with a canary, test a change | The probes in `package-plan.md` | 80–120 |
| `troubleshoot.md` | Fix what fails silently: a skill that doesn't load, a dead key, permission prompts, an estimate that runs high, no `gh` | This session's findings, the plans' risk tables | 100–150 |

### Reference

| Page | What it lists | Lines |
|---|---|---|
| `plugins.md` | Every plugin: layer, skill, what it's for, the signal that installs it, what it builds on. Its table replaces the root README's as a checked mirror (O9) | 60–100 |
| `the-steward.md` | The four jobs: what starts each, what it reads, writes, asks and never does | 80–120 |
| `project-files.md` | Every file the steward writes in a project, with its shape: `AGENTS.md` and its `CLAUDE.md`, `.claude/settings.json`, `plugin-sources.json`, `steward.json`, the trio files. Each links to its home in the product | 100–150 |
| `permissions.md` | What the front door pre-allows and why, the one approval, why the clone lives outside `~/.claude`, branch protection on `main` | 60–90 |
| `commands.md` | Every command the docs mention, with what it does and when | 60–100 |
| `checks.md` | What `check-catalog.mjs`, `claude plugin validate` and CI catch, and what nothing catches | 50–80 |
| `glossary.md` | Skill, plugin, layer, role, trio, the steward, the record, a live home, a dead key, the strip test | 50–80 |

### Explanation

| Page | The question it answers | Sources | Lines |
|---|---|---|---|
| `the-idea.md` | Why knowledge central and workers local, and why it isn't only for code | Concept §1, §2, §10 | 100–150 |
| `layers.md` | Why four layers, how to tell them apart, why dependencies point one way | Concept §4 | 80–120 |
| `skills-and-roles.md` | Why a skill holds knowledge and a role a lane, and why skill plugins ship no agents | Concept §5, §6 | 70–100 |
| `trios.md` | Why Plan, Do, Check: the stop, checking against the plan, read-only lanes, effort | Concept §7 | 80–120 |
| `the-steward.md` | Why one package, why it asks only twice, why it has no lanes, why a checker | Concept §8, §9, D27–D37 | 100–150 |
| `placing-knowledge.md` | Why diagnose first, why strip, why keep a doubtful lesson local | Concept §4.3, `place-knowledge.md` | 70–110 |
| `safety.md` | What keeps the user in control: no git in the project, the record, backups, the leak check, the merge | The procedures, D33, D37 | 80–120 |
| `cost.md` | What every enabled skill costs, why the steward shows only two skills, why descriptions are trigger lists | D36, the measurements | 50–80 |
| `decisions.md` | Every decision, D1 to D37 and on, with its date, its reason and where it lives now | The three plans and the concept's §13 | 150–250 |

### Contributing

- **`development-loop.md`** (70–110). Local marketplace, refresh, details, eval,
  validate, the catalog check, CI, and what each catches. Sources: `CONTRIBUTING.md`,
  `plugin-shape.md`.
- **`writing-docs.md`** (50–80). These principles, the four kinds, the map rule, and a
  checklist a reviewer holds a page against.
- **`releases-and-migrations.md`** (50–80). No versions, so every merge is a release.
  A rename needs a Renamed row. What a breaking change asks of every project. Sources:
  `plugin-shape.md`, the Renamed table, the plans' risk rows.

### Plugin READMEs

A new template, shared by all thirteen:

- the standard in two sentences;
- the table: skill, layer, builds on;
- when it fires;
- what it leaves to others;
- how it gets installed.

The steward's README keeps its own shape, since it is the one plugin that writes. The
template lives with the others, in `author-skills/assets/`.

## 8. Where the substance lives

| Topic | Its home | Explained in |
|---|---|---|
| The cut, the layers, placing knowledge | `references/place-knowledge.md` | `explanation/layers.md`, `explanation/placing-knowledge.md` |
| The house voice | `references/author-skills/style.md` | `contributing/writing-docs.md`, `guides/write-a-skill-by-hand.md` |
| A plugin's files and registrations | `references/author-skills/plugin-shape.md` | `guides/write-a-skill-by-hand.md`, `reference/checks.md` |
| What each job does | The job's reference file | `reference/the-steward.md`, the guides |
| The record | `references/record.md` | `reference/project-files.md`, `explanation/safety.md` |
| The roles and the run pattern | `references/set-up/roles/` | `explanation/trios.md`, `guides/run-a-trio.md` |
| Which plugins exist | `.claude-plugin/marketplace.json` | `reference/plugins.md` |
| The decisions | `docs/records/` plans | `explanation/decisions.md` |

### The concept's sections and their new homes

Nothing in `concept.md` is lost: each section gets a home before the file goes.

| Section | Explanation goes to | Rules live in |
|---|---|---|
| §0 How to read this document | Nothing: it instructs the agent that did the restructuring | — |
| §1 The problem, §2 the core principle, §10 the cycle | `explanation/the-idea.md` | — |
| §3 Vocabulary | `reference/glossary.md` | — |
| §4 The cut, the layers, placing knowledge | `explanation/layers.md`, `explanation/placing-knowledge.md` | `place-knowledge.md` |
| §5 Plugins and the marketplace, §6 agents | `explanation/skills-and-roles.md`, `reference/plugins.md` | `plugin-shape.md`, `style.md` |
| §7 The trio | `explanation/trios.md` | `set-up/roles/`, `set-up/trios.md` |
| §8 Setting a project up, §9 the steward | `explanation/the-steward.md`, the guides | The steward's job files |
| §11 Cross-cutting rules | `explanation/` pages, wherever the reason matters | `style.md`, `plugin-shape.md`, and `CLAUDE.md` for this repo's boundaries |
| §12 Applying it to this marketplace, §13 open questions, §14 source trail | `explanation/decisions.md` | — |

## 9. Guards

- **`check-catalog.mjs`** keeps the plugin list in sync. Its README mirror moves to
  `reference/plugins.md` if O9 says so.
- **A docs check** (O11) fails when a relative link doesn't resolve, a page in `docs/`
  isn't on the map, or a line outside a table or a code block runs past 88 columns. CI
  runs it beside the others.
- **No project names.** A check can't list the names without publishing them, so
  before each commit the names from memory are searched by hand, as for the plans.
- **Review.** Each step is reviewed by a separate agent against the page's sources, for
  accuracy, one home, the kind of page, and the voice. Nothing a doc says about the
  steward may contradict the steward's files.

## 10. Steps

Every step is one commit.

### Step 0: This plan

Approved, with O7 to O12 answered. O7 to O11 are D38 to D42.

### Step 1: Foundations

- The map, `docs/README.md`, with every page listed and marked "to write".
- `contributing/writing-docs.md`, so every later page has its checklist.
- `explanation/decisions.md`, gathered from the three plans and the concept's §13,
  because the explanation pages cite it.
- `reference/glossary.md`.
- The references to `concept.md` in the product and the entry points changed to point
  at the product's own files, so nothing depends on the concept before it goes.

What was done:

- **[`docs/README.md`](../README.md)**, the map: every planned page by kind, with its
  sources and its status, a "start here" per reader, and the working records. A page
  is linked once it exists, so every link resolves at every commit.
- **[`contributing/writing-docs.md`](../contributing/writing-docs.md)** is now the home
  of the principles in section 5: the four kinds with a test for each, one home, the
  product's independence, the voice and format, the map rule, the length targets, and
  the reviewer's checklist.
- **[`explanation/decisions.md`](../explanation/decisions.md)** gathers the author's
  dated statements and D1 to D43. Each has its reason and where it lives now, and
  superseded ones are marked. D4 never existed: the concept's question 4 stayed open,
  as O1, and still is.
- **[`reference/glossary.md`](../reference/glossary.md)**: 53 terms, the concept's
  vocabulary among them, each in one line and linked to the file that holds its rules.
- **A product fix the review found:** `place-knowledge.md` said a dependency points to
  "a more general layer", but D25 and `check-catalog.mjs` allow one in the same layer,
  as `tools-pinia` on `tools-vue` shows. It now says "its own layer or a more general
  one".
- A separate agent reviewed the step against `writing-docs.md`. Its findings are fixed:
  - two reasons in the log that the record doesn't give;
  - a missing 2026-10-13 rule: it proposes, a human approves;
  - four glossary rows that didn't match their files, and the concept's missing terms;
  - the map's links;
  - a voice item and a ranking for the checklist;
  - three files that had lost their final newline to a rewrap script.
- **Nothing depends on the concept any more.** `place-knowledge.md` no longer yields
  to it: the product is the authority for its own rules. `CLAUDE.md`, `CONTRIBUTING.md`
  and the authoring rule point to the steward's references and the map instead.

### Step 2: Explanation

The nine explanation pages, from the concept and the plans. When every section in the
table above has its home, `concept.md` goes.

What was done:

- Eight explanation pages, beside the decision log from step 1: the idea, layers,
  skills and roles, trios, the steward, placing knowledge, safety and cost. Each says
  why, and links to the product file that holds the rule.
- Two of the concept's rules had no home outside it, so they moved into the product
  before it went: "English throughout" into `style.md`, and the warning that an
  `agents` or `commands` key replaces its folder into `plugin-shape.md`.
- `concept.md` is deleted (D39). Git history keeps the brief.

### Step 3: Reference

The seven reference pages, and the plugin table's move, with `check-catalog.mjs`, if O9
says so.

### Step 4: Guides

The eleven guides.

### Step 5: Tutorials

The two tutorials, written from the procedures, marked "not yet tried" until the
package plan's trials have run them.

### Step 6: Plugin READMEs

The new template, and all thirteen READMEs rewritten from it.

### Step 7: Entry points

`README.md`, `CONTRIBUTING.md`, `CLAUDE.md` and `.claude/rules/authoring.md`, last,
because they link to everything else. This repo's `.claude/settings.json` enables the
steward, which closes the rest of the package plan's step 7.

### Step 8: Guards and the final read

The docs check and its CI job, a review of the whole set by a separate agent, and the
maintainer's own read of the landing page and the first tutorial.

---

## 11. Decided, and open

Decided on 2026-10-19:

| # | Decision | What it changes |
|---|---|---|
| D38 | Plain Markdown on GitHub, with Mermaid diagrams and no build (O7) | No site generator; a site can come later, from the same files |
| D39 | `concept.md` is not kept: "the concept can now live in the new documentation and agentic setup" (O8) | Its explanations go to the docs and its rules to the product and `CLAUDE.md`, by the table in section 8; then the file goes. Git history keeps the brief |
| D40 | The full plugin table lives in `reference/plugins.md` (O9) | The root README lists the plugins by layer in one line each, and `check-catalog.mjs` checks the reference page instead of the README |
| D41 | `.claude/rules/authoring.md` is cut to a pointer (O10) | It loads whenever a skill file is touched, and a pointer is all that should load there |
| D42 | A docs check in CI, `scripts/check-docs.mjs`, with no dependencies (O11) | `CLAUDE.md`'s "one executable file" line becomes two |
| D43 | The plan stops for the maintainer after step 1 and after step 8, with one commit per step between (O12) | Step 1 fixes the structure; step 8 is the whole result |
| D44 | No page, and no file outside `docs/records/`, refers to the working records: "no werkstatt references" | What a page needs from the plans, the audit or the concept is written into the page or the product. The map lists no records, and the plans' names don't appear in the pages |
| D45 | The working records' folder is renamed from `docs/werkstatt/` to `docs/records/`: "rename the folder as well" | Its name says what it holds. Paths in the records and in the memory notes follow |

Asked, and answered as recommended:

| # | Question | Recommendation |
|---|---|---|
| O12 | Where does the plan stop for you? | **After step 1 and after step 8.** Step 1 fixes the structure every later page sits in; step 8 is the whole result. Between them, one commit per step, as in the package plan |

## 12. Risks

| Risk | Why nothing reports it | Guard |
|---|---|---|
| A doc restates a rule, and the two drift | Both read fine on their own | One home: a doc states the gist in one line and links; the review checks every page against its sources |
| The docs describe behaviour nobody has tried | The steward isn't tried yet | The tutorials and the steward pages say "not yet tried" until the trials have run |
| A product file starts depending on a doc | It works in this repo, where `docs/` exists, and fails from the plugin cache | Principle in section 5; the review greps the product for `docs/` |
| Thirty-odd pages are too many to keep current | Each looks fine alone | Every page is on the map with its sources, so a change to a source shows which pages to reread |
| An example leaks a real project | It reads like any example | Synthetic examples only, and the search by hand before each commit |
| "So much text" | Volume hides the one line a reader needs | One job per page, tables and one-liners, and length targets per page |

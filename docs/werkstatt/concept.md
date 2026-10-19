# The Werkstatt concept: how knowledge is cut, stored, and put to work

A brief for an agent that restructures a Claude Code plugin marketplace to follow this
concept. The concept is the author's (Andrea Colarieti Tosti). It was developed
between 2026-09-08 and 2026-10-13 across six working sessions and one presentation
("Enterprise AI marketplace: Plugins für einen Einstieg in Agentic AI", subtitle "Vom
Werkzeug zur Werkstatt").

---

## 0. How to read this document

**The substance is decided. Your job is to render it, not to redesign it.** Where this
document states a rule, the author stated it, usually in their own words, which are
quoted where they matter. Where the author did not decide something, section 13 lists
it as an open question. **Ask about an open question. Never resolve one silently.**

Three markers are used throughout:

- **Rule.** The author decided it. Apply it.
- **Inference.** The concept implies it, but the author never said it. Apply it
  provisionally and list it in your report.
- **Open.** Undecided. Ask before acting on it.

The target repository is the one this file lives in. Read its `CLAUDE.md` and
`.claude/skills/new-plugin/references/authoring-style.md` before you touch any file. The
order of work is in `plan.md` beside this file. **Its existing house rules stay in
force unless this document explicitly replaces one** (section 12 lists the ones it
replaces).

---

## 1. The problem the concept answers

LLMs are already in use everywhere, but each person uses them on their own. In the
author's words: "some teams don't do it collectively, every developer does his own
thing." That has three consequences:

- **FOMO.** People are afraid of falling behind.
- **Discrepancies.** Everyone uses the LLM differently and gets different quality.
- **Missing team and company know-how.** What one person learned about getting good
  output stays in that person's head and chat history.

It also creates a trust problem that cuts both ways:

- **Too much trust.** People accept output as it comes, and quality drops.
- **Too little trust.** People redo the work, and the rework costs time and credits.

The gap to close is to raise output quality *without* costing performance, meaning
neither time nor tokens.

The author's diagnosis: "we are using intelligence from the wrong point of view. It is
not a tool, it is a tooling fabric." An LLM is like fire: light, heat, disinfection, or
a lightsaber, and "we finally get to decide, but we don't." The working method around
it is out of date. What is missing is **centralized knowledge and know-how that the
LLM can use**.

The concept's image for this is a **Werkstatt** (workshop) rather than a single tool.
A tool gets replaced; the knowledge in the workshop stays.

**Not in scope:** data protection and permission to use LLMs at all. The concept
assumes these are settled ("if not, not our problem anyway"). Your restructuring must
not try to solve them.

---

## 2. The core principle: knowledge central, workers local

> "The agents stay in repo, only the skills are in the marketplace and get worked on.
> That is the part where the knowledge is stored anyway." (2026-10-08)

This one sentence decides almost everything below.

| | Lives in | Changes how | Who it belongs to |
|---|---|---|---|
| **Knowledge** (skills) | The marketplace, centrally | Curated once, improved for everyone | Everyone who installs it |
| **Workers** (agents) | The project repository, locally | Generated for that project and task | The project |
| **Project facts** (instructions) | The project repository, as `AGENTS.md` | Written by the init agent from the repo | The project |

The consequences:

1. **The marketplace holds knowledge only.** It is a library of skills, not a
   collection of ready-made workers.
2. **One skill per plugin.** A plugin is the unit you install, so one plugin is one
   piece of knowledge you can choose to have or not.
3. **Agents are made, not shipped.** The init agent creates the agents a project needs,
   in that project's repository, wired to the skills that project installed.
4. **Knowledge flows back.** What a project learns goes back into the marketplace
   through the contributor (section 9), so the next project starts with it.

**The product is prose.** A skill is a standard written in prose that an LLM can read.
Nothing in it is a technical control: a model may follow it, ignore it, or follow it
partly. Never describe any part of the system as enforcement.

**It is modular, not one-size-fits-all.** The author rejected the "central means
uniform" objection outright: "we are making a way to create a lego (modular) knowledge
base, and agents that know how to work with it." Uniformity is avoided in three ways:

- Knowledge is cut into small bricks.
- A project installs only the bricks it needs.
- Every brick says when to yield to local convention.

**It is not only for code. Rule.** "Just trust me on this, it's a deep concept. The
structure we thought of works with almost anything using an LLM." The running example
in the presentation is deliberately non-technical: a team's monthly report, produced as
a digitally signed PDF. The restructured marketplace's own structure must not assume
that every skill is about code, even if every skill in it today is.

**Developers stay developers.** "Developing should still be done by developers. With
the help of agentic engineering they can work while watching the process from a new
vantage point, while leaving the tedious work to LLMs." The user is in control at
every gate (sections 7 and 8).

---

## 3. Vocabulary

Use the standard LLM-tooling terms. The concept deliberately maps onto them rather
than inventing its own.

| Concept term | Standard term | What it is |
|---|---|---|
| Brick (Baustein) | **Skill** (`SKILL.md`) | A prose standard for exactly one thing |
| Plugin | **Plugin** | The installable wrapper around one skill |
| Marketplace | **Marketplace** (`marketplace.json`) | The central catalogue of all plugins |
| Layer | (concept-specific) | One of four tiers that every skill belongs to (section 4) |
| Agent | **Subagent** (`agents/*.md`) | An LLM with a role, using a chosen set of skills |
| Role | Agent frontmatter + body | What an agent is for, its lane, its failure mode |
| Trio | Three subagents | Plan, Do, Check: the three agents that solve one task |
| Project context | **Instructions** (`AGENTS.md`, imported by a one-line `CLAUDE.md`) | Facts about the project that cannot be read from the code |
| Init agent | Subagent + skill in the init plugin | Sets a project up: writes instructions, installs skills, creates the trio |
| Contributor | Subagent + skill (planned) | Turns problems described in conversation into skill changes |

Hooks and MCP servers are not part of the concept. The author said: name them only if
an idea actually depends on them, "anything more is too much". Do not add either one
while restructuring.

---

## 4. How knowledge is cut: the four layers

This is the most important section for the restructuring.

### 4.1 The layers

Every skill belongs to exactly one of four layers. They are ordered **from general to
specific**.

| # | Layer | Definition (author's) | Test question |
|---|---|---|---|
| 1 | **Universal** (Universell) | Enterprise-wide; "holds for everything" | Does this apply to everything we do? |
| 2 | **Craft** (Handwerk) | How a kind of work is done | How is this kind of work done? |
| 3 | **Language** (Sprache) | What the work is written in: languages, templates, notations | What is it written in? |
| 4 | **Framework & Tools** | The concrete product or tool | Which concrete product is it done with? |

These are the author's examples, given in their own words on 2026-10-07 and refined on
2026-10-08. The author asked "do you understand the difference?"; these examples are
the reference for it.

| Layer | Examples |
|---|---|
| Universal | company guidelines, company vision, ISO certifications, clean code, enterprise architecture guidelines, enterprise security guidelines |
| Craft | checking texts against the company guidelines; writing (formatting) a specific kind of report, e.g. the standard monthly report (what is relevant and what isn't); microservices architecture; integration tests |
| Language | enterprise templates, German, English, Java, Helm |
| Framework & Tools | PowerPoint, Excel, PDF, digital signature, Spring Boot, JUnit |

How the layers differ, with one example per boundary:

- **Universal vs. Craft.** "Clean code" holds for every line of code, so it is
  Universal. "Integration tests" is one kind of work, so it is Craft.
- **Craft vs. Language.** "Formatting the monthly report" is *how* the work is done.
  "German" and "enterprise templates" are *what it is written in*.
- **Language vs. Framework & Tools.** "Java" is a language. "Spring Boot" and "JUnit"
  are concrete products that use it.
- **Natural languages count as Language.** German or English are Language skills just
  like Java. The author's example of a skill every role shares is "they all should
  speak English".

### 4.2 Rules for cutting

1. **One skill governs exactly one thing. Rule.** If you need "and" to describe what a
   skill covers, it is probably two skills.
2. **Every skill has exactly one home. Rule.** A rule appears in one skill only. Other
   skills reference it by name and never restate it. Two copies of a rule will drift
   apart.
3. **Every skill belongs to exactly one layer.** If a skill seems to belong to two
   layers, cut it along the layer boundary. For example, "Java testing with JUnit"
   splits into a Craft skill (unit/integration testing practice), a Language skill
   (Java), and a Framework & Tools skill (JUnit).
4. **Dependencies point toward the general layers only. Inference.** A
   Framework & Tools skill may build on Language, Craft, and Universal skills. A
   Universal skill depends on nothing more specific. "Introduce nothing before the
   blocks it depends on" was the author's rule for the presentation, and it applies
   just as well to how skills reference each other. Declare dependencies in
   `plugin.json` (`dependencies`), never only in prose. An agent told to read a skill
   that isn't installed proceeds on generic taste, and nothing reports it.
5. **The more specific layer wins, and local convention wins over all of them.** Every
   skill ends by saying when to yield. It says which more specific layer or local
   project convention overrides it, and when.
6. **A skill is knowledge, not a role and not a project fact.**
   - *How a review is done* is a skill (Craft).
   - *Being the agent that reviews, and only reviews* is a role, which belongs in an
     agent (section 6).
   - *This repo builds with `make ci`* is a project fact, which belongs in
     `AGENTS.md` (section 8).
   - **Never put project facts in a marketplace skill.** Never name a client, system,
     parameter set, or module layout there either. Skills stay general; the init agent
     reads the target repo for the specifics.
7. **Granularity follows reuse.** Cut a skill along the line where a different project
   would want one part but not the other. If two parts are always installed together
   and never change independently, they are one skill.
8. **Load only what is needed.** Small, separately installable skills are what make
   better quality cost no performance: an agent loads its few bricks, not the whole
   library. Keep each skill tight. Move long reference material into `references/`
   files the skill points to, so it is loaded on demand.

### 4.3 Where does a piece of knowledge go?

Run through these questions in order and stop at the first "yes":

```
Is it a fact about one specific project (commands, layout, local boundaries)?
  → AGENTS.md in that project. Not the marketplace.
Is it about what a worker does and must not do (its lane, its failure mode)?
  → the agent's role (section 6). Not a skill.
Does it hold for everything, regardless of the kind of work?
  → Universal skill
Is it about how a kind of work is done?
  → Craft skill
Is it about what the work is written in (language, notation, template)?
  → Language skill
Is it about one concrete product or tool?
  → Framework & Tools skill
```

Then check that no existing skill already covers it. If one does, extend that skill
instead of creating a near-duplicate. That is rule 2.

---

## 5. Plugins and the marketplace

### 5.1 One plugin, one skill. Rule.

> "If we get one skill per plugin, we can have the initializer create agents with
> skills in a project." (2026-10-08)

A plugin contains:

```
plugins/<name>/
  .claude-plugin/plugin.json   # manifest only (.json only in this folder)
  README.md                    # what the skill covers, its layer, what it depends on
  skills/<skill-name>/
    SKILL.md                   # the standard
    references/                # optional: long material, loaded on demand
    assets/                    # optional: templates, examples
```

It does not contain `agents/`. Section 5.3 covers the exception, and section 6
explains why.

### 5.2 What the marketplace records about each plugin

The init agent picks skills from the catalogue, so the catalogue must let it pick
well. Every plugin's entry should make three things visible:

- **Its layer.** The current `category` field is the natural home. **Inference**: the
  values would be `universal`, `craft`, `language`, `framework-tools`.
- **Its trigger list.** The `description` is the only thing a model sees when it
  decides whether to load a skill. Phrase the triggers in the words a user would use.
- **Its dependencies.** List them in `plugin.json`.

Keep every field in one place only: either `plugin.json` or the marketplace entry,
never both. If both have it, the manifest wins silently.

### 5.3 The exception: the plugins that work on the marketplace itself. Inference.

Two workers are not project workers. They operate on the knowledge system itself, so
they are the only agents the marketplace ships:

- **The init agent** (section 8), in the init plugin (today `project-init`).
- **The contributor** (section 9), in its own plugin, once it is built.

The author never said in so many words that these two are the exceptions to "agents
stay in the repo". But both have to exist before any project agent can, so they cannot
be generated into a repo. The author also described the product as "plugins, one
plugin with some dedicated agents, one init agent that knows the knowledge and how to
use it". Confirm this with the author (section 13).

---

## 6. Agents: a role plus a chosen set of skills

### 6.1 What an agent is

> "We have 4 categories of skills, an agent uses a quantity of those, an agent has a
> role." (2026-10-07)

An agent is **an LLM with a role**. Its file holds:

- **Its role and lane.** What it is for, and what it does not do.
- **Its failure mode.** The thing this kind of worker typically gets wrong.
- **Which skills it uses.** References by name.

It does **not** hold the standard. "Skill = the standard, agent = a worker that reads
it" is still the house rule. An agent that restates its skill has two copies of the
standard, and they will drift apart.

An agent takes skills from as many layers as it needs, but only the ones it needs.
In the presentation's example, the monthly-report agent takes one brick per layer: the
company guidelines, formatting the monthly report, enterprise templates plus German,
and PDF plus digital signature. Its output is a digitally signed PDF.

### 6.2 Where agents live

**In the project repository, generated by the init agent. Rule.** Agents are local:
they belong to the project and the task they were created for, and they stay in the
repo. The marketplace does not ship ready-made project agents.

The generated agent files follow the same rules as the ones the marketplace ships
today:

- **No model reference in frontmatter.** No `model:` field and no vendor's model name.
  The setup has to stay portable, including to GitHub Copilot.
- **Read-only is a frontmatter fact.** A read-only agent carries
  `disallowedTools: Write, Edit, NotebookEdit`. A description that says "read-only"
  without that field is not read-only.

---

## 7. The trio: Plan, Do, Check

> "The solution of a task needs a trio of agents with dedicated skills to do the work
> in steps." (2026-10-07)

The author felt this was "a whole layer" missing from the first version. It is the
workflow layer, between single agents and the init agent.

### 7.1 The three roles

| Role | Does | Writes? | Knowledge |
|---|---|---|---|
| **Plan** | Thinks, looks ahead, asks questions, works with the user, proposes a plan, then **waits** | **No: read-only** | Abstract only (Universal, Craft, Language) |
| **Do** | Does the actual work by following the accepted plan | **Yes: the only writer** | Whatever the work needs, including all Framework & Tools skills |
| **Check** | Compares the result against **the accepted plan**, sends it back if needed | **No: read-only** | Abstract only (Universal, Craft, Language) |

The rules:

1. **The plan is a hard stop. Rule.** Nothing is written or done until the user has
   accepted the plan. In the presentation: "Ohne deine Bestätigung kein Do" (no Do
   without your confirmation).
2. **Check checks against the plan, not against the request. Rule, 2026-10-09.** The
   plan the user accepted is the contract. The request was its input.
3. **Check iterates.** If the result does not match the plan, it goes back to Do
   ("reiterate if necessary").
4. **Plan and Check are read-only, and Do is the only writer. Rule, 2026-10-09.** "The
   plan and check should be readonly and only have abstract knowledge by design."
   Read-only means the frontmatter field (section 6.2).
5. **Framework & Tools skills belong to Do. Rule.** Plan and Check carry no tool
   skills. In the example, Excel, PDF, and digital signature are Do's alone.
6. **Each role has its own skills, and some skills are shared by all three. Rule.** The
   author's example is that "they all should speak English". Shared skills are
   typically Universal or Language skills.

The reference assignment from the presentation (monthly report):

| Role | Skills |
|---|---|
| Plan | company vision, enterprise templates |
| Do | formatting the monthly report, Excel, PDF, digital signature |
| Check | checking texts against the company guidelines |
| Shared by all three | company guidelines, German |

### 7.2 What the trio is not

The marketplace already has a "review trio": `developer` writes, while `code-reviewer`
and `refactoring-specialist` advise and only read. It shares the read-only pattern of
two advisors and one executor. **But it is not Plan, Do, Check.** The author said the
"writer plus two advisers" framing used the wrong abstraction. Plan, Do, Check is a
sequence of *steps* with a gate. The review trio is a split of *duties* within the
same step. Do not rename the review trio to Plan, Do, Check, and do not merge the two.
How the review trio maps onto the new model is an open question (section 13).

### 7.3 One trio per task

> "Once that is done it shall create a trio to work on one task for this specific
> project." (2026-10-08)

A trio is created **for a task**, in a project. Whether a project keeps one trio per
recurring task or a new trio per task is open (section 13).

---

## 8. The init agent: from project to working setup

### 8.1 The order. Rule, 2026-10-13.

> "The story goes: agents.md are created with project infos, then with the infos a
> quantity of skills get selected, then agents are created that use those skills to
> do the task."

1. **Read the project.**
2. **Write `AGENTS.md`**: the project's instructions, holding only what cannot be read
   from the code. That means non-obvious commands, conventions that differ from
   framework defaults, boundaries, and the reasons behind them. Write a one-line
   `CLAUDE.md` containing `@AGENTS.md` beside it. The pairing is required: nested
   `CLAUDE.md` files lazy-load, while nested `AGENTS.md` files are never discovered.
3. **Choose skills from that information and install them** from the marketplace: "as
   many as needed", and no more.
4. **Create the trio** (Plan, Do, Check) in the repository, wired to exactly those
   skills, with role assignments that follow section 7.1.

Only the init agent installs skills ("the init installs skills"). The agents it
creates do not go shopping.

### 8.2 Behaviour the author settled while building the current init (2026-09-17)

The current `project-init` skill already implements these. Keep them.

- **The init agent proposes a plan and waits for approval before writing anything.**
  This is the same hard stop as the trio's.
- **It never touches git.** It makes no branch, commit, stage, or stash. "The
  developer makes a branch and gives you the possibility to run free without breaking
  shit, then looks at what you produced and decides how to handle it. You are his
  faithful expert companion... he still needs to feel in control of what is
  happening."
- **The source policy.** It refreshes all marketplaces first, with a bare
  `claude plugin marketplace update` and no name. It asks which plugin sources are
  allowed only if no policy file exists, and then as a single on/off checklist rather
  than an allow/deny question. It writes the policy file itself.
- **The house marketplace has priority.** The init agent looks for central skills
  first and fills gaps from other permitted marketplaces only after that.
- **Everything it could not figure out goes into the final report.** That is the
  place for it, not the middle of the process.
- **Less text.** "So much text" was the author's complaint. Reports are short and
  scannable, and the plugin table is the format the author liked.

### 8.3 What changes for the init agent

Today the init agent recommends plugins, and some of those plugins ship their own
agents. Under this concept it does three things instead:

- It **installs skills** rather than recommending plugins that come with workers.
- It **generates the trio** into the repo. That needs a standard for what a Plan, Do,
  or Check agent file looks like. **Inference:** that standard is itself knowledge, so
  it belongs in a skill, probably in the init plugin as a reference: role templates
  with lane, failure mode, frontmatter, and a skill slot.
- It **assigns skills to roles** by the rules in section 7.1: tool skills to Do only,
  abstract skills to Plan and Check, shared skills to all three.

The plugin catalogue reference (`plugin-catalog.md`) remains its map of the
marketplace. It now needs to show the layer of every skill.

---

## 9. The contributor: the init agent in reverse

> "The init is half of the work. We also want a contribution agent/plugin that can help
> users work with the knowledge base from a conversation. What I want is people
> actually lamenting problems to the contributor and it correcting the background,
> putting the right parts in the right lego blocks, or creating new ones." (2026-10-06)

The direction is reversed:

- The init agent goes from the marketplace to the project.
- The contributor goes from the project back to the marketplace.

How it works:

1. Someone working in a project hits a problem and **describes it in conversation**.
   The presentation's example: "Die Zahlen passen nie zum Vormonat" (the numbers never
   match the previous month).
2. The contributor works out which knowledge the problem touches, using the cutting
   rules in section 4. Then it either **updates the existing skill** that should have
   covered it (in the example, "formatting the monthly report") or **creates a new
   skill** where nothing fits (in the example, "reconcile with previous month", a new
   Craft skill).
3. **It works only on the knowledge side. Rule, 2026-10-13.** It does not edit the
   project's `AGENTS.md`. The author removed an arrow into `AGENTS.md` from the
   drawing.
4. **It proposes; a human approves.** Its output enters the marketplace the same way
   any change does, through a reviewed merge or pull request, never self-approved.
   That keeps the writer and the reviewer separate.

**Status: concept, not built.** Do not claim it exists. If the restructuring
scaffolds it, label it as a draft in its README.

---

## 10. The cycle

```
        ┌──────────── Marketplace (knowledge, central) ◄───────────┐
        │                                                            │
   installs skills                                         updates / creates skills
        │                                                            │
        ▼                                                            │
   Init agent ──► AGENTS.md ──► skills ──► Plan · Do · Check ──► Contributor
   (dock on)                                   (work)                (grow)
```

Dock on, work, grow. **"What one person learns benefits everyone":** what one team
learns lands in the library, and the next team has it on its first day.

---

## 11. Cross-cutting rules (all still in force)

These come from the current house rules and were reconfirmed by the concept.

- **Portable by design.** Do not put model names in agent files. Generated context
  goes in `AGENTS.md`. The knowledge must outlive any one vendor's tool. That is the
  presentation's answer to "is Werkstatt just wordplay?": a tool gets replaced, the
  knowledge stays.
- **English throughout**, so that triggers fire reliably. Natural-language *skills*,
  such as German, are a different thing: they are content.
- **A description is a trigger list, not a summary.**
- **Every skill ends with when to yield.**
- **Read-only is frontmatter, never prose.**
- **No `version` in any plugin**, and no `--strict` in CI. Updates resolve by commit
  SHA, so the "no version specified" warning is the policy working.
- **Only `.json` in `.claude-plugin/`.**
- **The `agents` and `commands` keys in `plugin.json` replace the default
  directories**; the `skills` key adds to its default. This becomes more important
  once most plugins have no `agents/` directory at all.
- **Every registration happens in all three places**: `marketplace.json`, the root
  `README.md` table, and the init plugin's `plugin-catalog.md`. `check-catalog.mjs` is
  the only thing that catches a missing third registration.
- **Synthetic examples only.** No client or personal data, no credentials, no real
  institution names.
- **Nothing is a technical control.** Never describe a skill, the trio, or the gate as
  enforcement.
- **Writer and evaluator stay separate.** This applies both to the repo's maintainer
  agents and, conceptually, to Do and Check.

---

## 12. Applying it to the personal marketplace

### 12.1 Today

There are nine plugins, each with one skill. Seven of them also ship an agent:

| Plugin | Skill | Agent shipped today | Proposed layer |
|---|---|---|---|
| `clean-code` | `clean-code` | `clean-code-reviewer` (read-only) | Universal |
| `developer` | `development-standards` | `developer` (writes) | Craft |
| `code-review` | `review-changes` | `code-reviewer` (read-only) | Craft |
| `refactoring` | `refactor-safely` | `refactoring-specialist` (read-only) | Craft |
| `unit-testing` | `write-unit-tests` | `unit-tester` (writes) | Craft |
| `java-dev` | `java-conventions` | none | Language |
| `typescript-dev` | `typescript-conventions` | none | Language |
| `vue-dev` | `vue-conventions` | `vue-developer` (writes) | Framework & Tools |
| `project-init` | `init-agent-setup` | `codebase-cartographer` (read-only) | the init plugin (section 5.3) |

The layer column follows the four-layer reading of this catalogue from 2026-09-29.
Confirm it, especially `development-standards`, which might be Universal.

### 12.2 The gap between today and the concept

1. **Agents ship inside skill plugins.** Under the concept they are generated into
   project repos. The seven shipped agents either become role templates the init agent
   uses, or are dropped. **Open:** which one, per agent (section 13).
2. **Layers are implicit.** No field records a skill's layer. Make it explicit
   (section 5.2).
3. **The house rules contradict the concept in two places.** Both need rewording, not
   deletion:
   - `CLAUDE.md` describes plugins as "manifest, README, skills, agents".
   - The review-trio section treats three shipped agents as the core unit.
4. **The init agent recommends plugins; it does not generate agents.** Phase 4 to 6 of
   `init-agent-setup` needs the trio-generation step from section 8.1 and the
   role-assignment rules from section 7.1.
5. **There is no contributor.** It is planned (section 9).
6. **There are no non-code skills.** That is acceptable for a personal developer
   marketplace. But structure, README wording, and categories must not assume code
   (section 2).
7. **Some skills may cover more than one thing, or more than one layer.** Audit each
   one against section 4.2 rules 1 to 3. For example, check whether
   `write-unit-tests` mixes general testing practice with framework specifics.

### 12.3 Suggested order of work. Inference: the author did not fix one.

Do one step per change and report after each. The author's working rule from the
presentation was "one at a time, with approval, no big rebuilds".

1. **Audit, read-only.** Assign every skill a layer. List skills that break the
   cutting rules and agents that hold standard text. Report that list, then stop for
   approval.
2. **Make the layers explicit** in the catalogue and in `plugin-catalog.md`.
3. **Fix the cuts.** Split or merge skills where the audit found problems, and declare
   dependencies.
4. **Write the trio role templates** as knowledge in the init plugin, using the
   decisions on open question 1.
5. **Extend `init-agent-setup`**: AGENTS.md, then skills, then trio, with a hard stop
   before writing.
6. **Retire or convert the shipped agents**, as decided.
7. **Update `CLAUDE.md`, the README, and `check-catalog.mjs`** to the new shape. For
   example, the script could fail on an `agents/` directory in a skill plugin.
8. **Optionally, scaffold the contributor** as a labelled draft.

Use the repo's own tooling: `/new-plugin`, `@skill-writer` to render,
`@skill-evaluator` and `@plugin-evaluator` to review, and
`@marketplace-architect` for steps 1 and 6. Run `node scripts/check-catalog.mjs` and
`claude plugin validate .` after every step.

---

## 13. Open questions: ask the author

The author answered six of the seven on 2026-10-19. The answers are quoted and are
**Rules** from that date. Questions that the plan raised afterwards are in `plan.md`,
section 2.

1. **What happens to today's shipped agents?** For each of `developer`,
   `code-reviewer`, `refactoring-specialist`, `unit-tester`, `vue-developer`, and
   `clean-code-reviewer`, does it become a role template for the init agent, a Do or
   Check variant, or does it go away? Does the review trio survive as a code-specific
   refinement of Do and Check?
   **Answered:** "We should keep the knowledge and reorganize it." No agent's
   knowledge is dropped. Each paragraph moves to its one home: standard text into a
   skill, role text into a role template. The audit maps it paragraph by paragraph.
2. **Does the init plugin (and later the contributor) ship its own agents** as the one
   exception to "agents stay in the repo"? (Section 5.3.)
   **Answered in part:** "It should create agents in the projects leveraging the skills
   from the marketplace." Whether the init plugin keeps `codebase-cartographer` as its
   own helper is still open.
3. **One trio per task or per project?** Is a trio regenerated for each task, or kept
   for a recurring kind of task?
   **Answered:** "That is the way a task should be solved. The plan is to use different
   efforts for different tasks, and read-only access to use less credits." A trio
   solves a task. Each role's `effort` is set for the task, and Plan and Check stay
   read-only partly to spend fewer credits. **Inference:** one trio per kind of task,
   kept in the repo.
4. **Is the single-purpose agent (the monthly-report agent) the same thing as Do?**
   The working assumption has been yes, but the author never confirmed it.
   **Still open** ("not sure").
5. **Where do the layers live in metadata?** In `category`, in `keywords`, or in a
   field of their own?
   **Answered:** "I would like those categories to also be a part of the plugin names."
   The layer is the `category` and the prefix of the plugin name.
6. **Does the 2026-09-08 vision of orchestrator plugins still apply?** That vision
   included a pipeline, commit review, and an architecture and testing-framework
   orchestrator, plus MCP servers, and it predates "the marketplace holds only
   skills". Treat it as superseded unless the author says otherwise.
   **Answered:** "No, we will rethink that later, if at all." Superseded.
7. **Is `development-standards` Universal or Craft?**
   **Answered:** "Craft, not generic enough to be universal. Some of the concepts in it
   may be separated into a universal skill." The audit checks which.

---

## 14. Source trail

The author's own statements, by date (session ids from `~/claude-session-backups`):

| Date | Decision | Session |
|---|---|---|
| 2026-09-08 | Starter plugin with init agent(s), a skills list, orchestrators; built by contribution | f7f97f7c |
| 2026-09-15 | "A plugin with a lot of skills they can choose from; skills should contain knowledge of technologies and their best practices" | cb23ffab |
| 2026-09-17 | Init: source policy checklist, refresh first, git untouched, developer in control, report holds unknowns | cb23ffab |
| 2026-09-29 | Centralise knowledge, normalise usage; everyone contributes and refines skills; developers still develop | 6713ac0b |
| 2026-10-06 | Tooling fabric not a tool; lego knowledge base; works for non-technical work; contributor | b35896e8 |
| 2026-10-07 | Four layers with examples; role + set of skills; trio Plan, Do, Check; hard stop; shared skills | b35896e8 |
| 2026-10-08 | One skill per plugin; init creates the trio in the repo; agents local, skills central | b35896e8 |
| 2026-10-09 | Check against the plan; Plan/Check read-only and abstract; tools in Do; company vision in Plan | b35896e8 |
| 2026-10-13 | Init order AGENTS.md, then skills, then agents; init installs skills; contributor only touches knowledge | b35896e8, 02a0e2ad |
| 2026-10-19 | Answers to section 13: keep and reorganise the agents' knowledge; agents created in projects; effort per task, read-only to save credits; layer in the plugin name; orchestrators parked; `development-standards` is Craft | c3cd211b |
| 2026-10-19 | Plan decisions D8 to D14 (`plan.md`, section 1): `<layer>-<topic>` names; `marketplace-init` and `marketplace-contributor`; init creates the trio's run pattern in the project; init installs skills itself; Claude only | c3cd211b |

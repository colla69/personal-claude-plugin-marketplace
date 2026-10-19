# The Werkstatt concept: how knowledge is cut, stored, and put to work

A brief for an agent that restructures a Claude Code plugin marketplace to follow this
concept. The concept is the author's (Andrea Colarieti Tosti). It was developed
between 2026-09-08 and 2026-10-13 across six working sessions and one presentation
("Enterprise AI marketplace: Plugins für einen Einstieg in Agentic AI", subtitle "Vom
Werkzeug zur Werkstatt"), and extended on 2026-10-19 with the steward (section 9).

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
`plugins/marketplace-steward/references/author-skills/style.md` before you touch any
file. The order of work is in `plan.md` beside this file, and for the steward (section
9) in `package-plan.md`. **Its existing house rules stay in force unless this document
explicitly replaces one** (section 12 lists the ones it replaces).

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
| **Project facts** (instructions) | The project repository, as `AGENTS.md` | Written by the steward from the repo | The project |

The consequences:

1. **The marketplace holds knowledge only.** It is a library of skills, not a
   collection of ready-made workers.
2. **One skill per plugin.** A plugin is the unit you install, so one plugin is one
   piece of knowledge you can choose to have or not.
3. **Agents are made, not shipped.** The steward creates the agents a project needs,
   in that project's repository, wired to the skills that project installed.
4. **Knowledge flows back.** What a project learns goes back into the marketplace
   through the steward (section 9), so the next project starts with it.

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
every gate (sections 7 to 9).

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
| Steward | Plugin with two visible skills, reference files, and two read-only helper subagents (`marketplace-steward`, planned) | Sets a project up, adopts the setup it already has, keeps the setup current, and turns problems described in conversation into skill changes |

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
     parameter set, or module layout there either. Skills stay general; the steward
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

**When the piece comes out of a project. Rule, 2026-10-19.** Most of what the steward
places comes from a project: a problem someone describes, or a rule in a setup it
adopts (section 8.4). That knowledge arrives mixed with the project's facts, so four
moves come before the questions above:

1. **Diagnose before writing.** The cause decides where the fix goes, and only some
   causes mean the knowledge should change:

   | What is really going on | Where the fix goes |
   |---|---|
   | The skill has the rule, but it never loaded | The wiring: the skill's trigger, or the project's setup. Not the content |
   | The knowledge is wrong everywhere | The skill |
   | Right in general, wrong in this project | The project's `AGENTS.md`, as a local exception, and maybe a sharper yield in the skill. The general rule stays |
   | Missing, and it would hold anywhere | A skill, in the layer the questions above give |
   | Missing, but only true here | The project's `AGENTS.md` |
   | A fact about the machine it was found on | Nowhere |

2. **The strip test.** Replace every name, path and value with its role. What is still
   true and useful travels, and goes through the questions above; what was stripped
   stays in the project's `AGENTS.md`. "The report for client A was off because
   March's export used net values" splits into "before comparing with the previous
   month, check that both months use the same basis", a Craft skill, and "client A's
   exports use net values", a project fact. The stripped text is the only text that
   may reach the public marketplace, which is how rule 6 holds in practice.
3. **The user decides where it is taste**: before a new skill is created, and in the
   pull request. Both show the exact public text.
4. **Corrections become examples.** Each split the user overrules becomes a stripped,
   worked example in the file that holds these moves, so the judgement grows from real
   decisions.

This section is the principle. Its working home is a reference file in the steward,
`references/place-knowledge.md` (section 9). Two parts come later, once the steward has
handled real cases: a list of candidates, for lessons that stay in their project until
they show up in a second one, and evals that measure the placement.

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

It does not contain `agents/`, and it holds one skill. Section 5.3 covers the one
plugin that is an exception to both, and section 6 explains why.

### 5.2 What the marketplace records about each plugin

The steward picks skills from the catalogue, so the catalogue must let it pick
well. Every plugin's entry should make three things visible:

- **Its layer.** The current `category` field is the natural home. **Inference**: the
  values would be `universal`, `craft`, `language`, `framework-tools`.
- **Its trigger list.** The `description` is the only thing a model sees when it
  decides whether to load a skill. Phrase the triggers in the words a user would use.
- **Its dependencies.** List them in `plugin.json`.

Keep every field in one place only: either `plugin.json` or the marketplace entry,
never both. If both have it, the manifest wins silently.

### 5.3 The exception: the plugin that works on the marketplace. Rule, 2026-10-19.

One plugin is not a skill plugin: **the steward** (section 9), `marketplace-steward`.
It works on the knowledge system itself rather than on a project's work, and it has to
exist before any project agent can, so it cannot be generated into a repo. The author
described the product early on as "plugins, one plugin with some dedicated agents, one
init agent that knows the knowledge and how to use it".

It is the exception to section 5.1 twice over:

- **It ships more than one skill**, but only two are visible: the front door and
  `evaluate-skills`. The rest of its knowledge, for setting a project up, keeping it
  current, contributing, placing knowledge and writing skills, is reference files it
  reads by path, because it is installed in every project and every visible skill
  costs a description in every session (`package-plan.md`, D36).
- **It ships agents**, the only ones the marketplace ships: two read-only helpers, the
  `codebase-cartographer` and a checker (section 9).

Until it is built, `marketplace-init` plays its set-up part, and ships the
cartographer.

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

**In the project repository, generated by the steward. Rule.** Agents are local:
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
workflow layer, between single agents and the steward.

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

## 8. Setting a project up

The steward's first jobs are setting a project up and, where the project already has
a setup of its own, adopting it. Until the steward is built, `marketplace-init` does
the first.

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

Only the steward installs skills ("the init installs skills"). The agents it creates
do not go shopping.

### 8.2 Behaviour the author settled while building the first init (2026-09-17)

`marketplace-init` implements these, and the steward keeps them, except the first.

- **Replaced on 2026-10-19: the plan stop.** The init agent proposed a plan and waited
  for approval before writing anything. The steward stops for an OK only before it
  creates a new skill (section 9). Everything else goes ahead and is reported, and the
  next rule is what keeps the developer in control.
- **It never touches git in the project.** It makes no branch, commit, stage, or
  stash there. "The developer makes a branch and gives you the possibility to run free
  without breaking shit, then looks at what you produced and decides how to handle it.
  You are his faithful expert companion... he still needs to feel in control of what
  is happening." In the marketplace it does use git: a contribution is a branch of its
  own (section 9).
- **The source policy.** It refreshes all marketplaces first, with a bare
  `claude plugin marketplace update` and no name. It asks which plugin sources are
  allowed only if no policy file exists, and then as a single on/off checklist rather
  than an allow/deny question. It writes the policy file itself.
- **The house marketplace has priority.** The steward looks for central skills first
  and fills gaps from other permitted marketplaces only after that.
- **Everything it could not figure out goes into the final report.** That is the
  place for it, not the middle of the process.
- **Less text.** "So much text" was the author's complaint. Reports are short and
  scannable, and the plugin table is the format the author liked.

### 8.3 What set-up does beyond the order

- It **installs skills**, rather than recommending plugins that come with workers.
- It **generates the trios** into the repo, from role templates that hold each role's
  lane, failure mode, frontmatter, and a skill slot. The templates are knowledge, so
  they live in the steward.
- It **assigns skills to roles** by the rules in section 7.1: tool skills to Do only,
  abstract skills to Plan and Check, shared skills to all three.
- **Where the project needs knowledge no central skill has, it proposes a new skill.
  Rule, 2026-10-19.** That proposal is the one place it stops for an OK.
  **Inference:** a gap-fill from another permitted marketplace still comes first, as
  the house-priority rule in 8.2 has it, and a new skill is proposed only where none
  fits.

The plugin catalogue reference (`plugin-catalog.md`) remains its map of the
marketplace, with the layer of every skill.

### 8.4 Adopting an existing setup. Rule, 2026-10-19.

> "We need it to be able to integrate into existing setups. What if a project already
> has a set of skills and agents and hooks and all the things? ... We should find what
> is in the project that should come from skills, and either make new skills in the
> marketplace or remove it from the setup, so it will use the centralized skills for
> that knowledge."

A project that already has skills, agents, rules, hooks or a long `CLAUDE.md` is not
set up from scratch, and the new setup is not laid on top of the old one. The steward
adopts it:

1. **Take stock** of everything the setup holds: `CLAUDE.md` and `AGENTS.md` at every
   level, the rules, skills, agents and commands in `.claude/`, hooks, `.mcp.json`,
   the settings, and other tools' files such as `.cursor/rules/`.
2. **Split it into rules, not files.** One file usually mixes rules a central skill
   already has, facts about the project, and rules nobody has written down centrally
   yet.
3. **Give each rule a home**, with the four moves of section 4.3:

   | What the rule is | Where it goes |
   |---|---|
   | A central skill already says it | Removed here; the central skill is enabled instead |
   | A central skill says it differently, because this project is different | The project's `AGENTS.md`, as a local exception |
   | A central skill says it differently, and the local version is better | A contribution that improves the skill, then removed here |
   | No central skill has it, and it travels | A contribution that extends a skill or creates one, then removed here |
   | A fact about this project | The project's `AGENTS.md` |
   | A worker's lane, in an existing agent | The agent becomes a trio, or the Do of one. The knowledge inside it goes through the rows above |
   | A hook, an MCP server, a command that runs a tool, a permission | Stays in the project |
   | Dead, or about the machine | Removed |

4. **The report quotes every rule**, grouped by the file it came from, with its new
   home. The steward stops only before a new skill.
5. **Nothing is removed before its new home is live.** That is how the marketplace's
   own agents were retired (`plan.md`, D1). A rule that waits for a contribution stays
   where it is until the pull request is merged and the central skill is installed
   and loads; keep-current (8.5) removes the local copy then. A file git doesn't track
   is copied before it is removed.

**Hooks, MCP servers, and commands that run a tool stay in the project. Rule,
2026-10-19.** They are mechanics, not knowledge, and the concept leaves hooks and MCP
servers out (section 3). A hook that only injects text is the exception: its text is
knowledge, and it is adopted like any rule.

### 8.5 Keeping the setup current. Rule, 2026-10-19.

> "Initialize and also keep working in his project."

A setup drifts, because the project changes and so does the marketplace. Keep-current
finds the drift and fixes it:

- enabled plugins that no longer exist, such as the keys a rename leaves behind;
- `skills:` names in the trios that no longer resolve;
- trios built from older role templates. Set-up records which version of the steward
  built each file, so the difference can be found;
- catalogue plugins the project now calls for;
- `AGENTS.md` lines that are no longer true;
- local copies an adoption left pending, once their central home is live.

---

## 9. The steward: one package for the whole cycle

> "The init is half of the work. We also want a contribution agent/plugin that can help
> users work with the knowledge base from a conversation. What I want is people
> actually lamenting problems to the contributor and it correcting the background,
> putting the right parts in the right lego blocks, or creating new ones." (2026-10-06)

> "I think we need something more like a contribution plugin, more than an init and a
> contributor. ... As I find different problems in different projects, I just talk to
> this contributor thingy, and it changes the marketplace, or it either updates old
> skills or it makes new skills and keeps everything up to date, so I can reuse it
> whenever I want it in another project." (2026-10-19)

The init agent and the contributor were planned as two plugins. **They are one: the
steward, `marketplace-steward`. Rule, 2026-10-19.** It is installed once at user
scope, so it works in every project, including one that was never set up. You talk to
it, and it works out which of four jobs you mean:

| Job | What it does | Section |
|---|---|---|
| Set up | Reads the project, writes `AGENTS.md`, installs the skills, creates the trios | 8.1 to 8.3 |
| Adopt | Gives every rule of an existing setup its home | 8.4 |
| Keep current | Finds where the setup has drifted, and fixes it | 8.5 |
| Grow the knowledge | Turns a problem described in conversation into a skill change, by pull request | Below |

The rules:

1. **Its scope is the setup and the knowledge. Rule, 2026-10-19.** The project's own
   work stays with its trios.
2. **It stops for an OK only before it creates a new skill. Rule, 2026-10-19.** "Only
   ask for an OK when creating new skills, on init or adoption." A new skill is a
   decision about the cut, which is taste: its layer, its name, and where it stops.
   The same stop applies to a new skill that comes out of a conversation. Everything
   else goes ahead and is reported. In the project it never commits, so the developer
   reviews its work as a diff (8.2).
3. **It proposes; a human approves. Rule, 2026-10-13.** A change reaches the
   marketplace's `main` only through a pull request the author merges, never
   self-approved.
4. **No trio, and no lanes. Rule, 2026-10-19.** "No trio for the package, that would
   make the process too difficult." The steward does its work itself and is the only
   writer. It ships two helpers, read-only by frontmatter: the cartographer, which
   surveys a project, and a checker, which reviews a change before its pull request.
   The checker keeps writer and evaluator apart (section 11) without adding a stop.
   One writer has no lane to keep, so the 2026-10-13 rule that the contributor never
   edits `AGENTS.md` is superseded.
5. **The author is the only contributor for now. Rule, 2026-10-19.** A contribution
   is a branch in the author's repo, with no fork flow.

Growing the knowledge, end to end:

1. Someone working in a project hits a problem and **describes it in conversation**.
   The presentation's example: "Die Zahlen passen nie zum Vormonat" (the numbers never
   match the previous month).
2. The steward places the knowledge with the four moves and the questions of section
   4.3. It either **updates the existing skill** that should have covered it (in the
   example, "formatting the monthly report") or, after the OK, **creates a new skill**
   where nothing fits (in the example, "reconcile with previous month", a new Craft
   skill). It flags a breaking change, such as a rename, a removal or a split: a
   project loses a renamed plugin without any notice.
3. It writes the change on a new branch, in a worktree of its own clone of the
   marketplace, so that the author's checkout is never touched, and registers it in
   all three places (section 11).
4. The checker reviews it: the house standard, how it fits the whole set, and a leak
   check that compares the diff with the identifiers of the project the lesson came
   from.
5. The steward opens the pull request. A breaking change carries its migration in the
   description.
6. If the lesson had a project part, the steward writes it into the project's
   `AGENTS.md`.

**Status: written, not yet tried.** All four jobs exist; the trials and the merge are
the steps left in `package-plan.md`. Do not claim they have been tried.

---

## 10. The cycle

```
        ┌──────────── Marketplace (knowledge, central) ◄───────────┐
        │                                                          │
  installs skills                         updates or creates skills, by PR
        │                                                          │
        ▼                                                          │
     Steward ──► AGENTS.md ──► skills ──► Plan · Do · Check ──► Steward
    (dock on)                                  (work)           (grow)
```

Dock on, work, grow. The same package sits at both ends: the steward that sets a
project up and keeps it current is the one you talk to when the project teaches you
something. **"What one person learns benefits everyone":** what one team learns
lands in the library, and the next team has it on its first day.

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
- **Writer and evaluator stay separate.** This applies to the repo's maintainer
  agents, to the steward and its checker, and, conceptually, to Do and Check.

---

## 12. Applying it to the personal marketplace

Sections 12.1 to 12.3 describe the marketplace as it was before the restructuring that
`plan.md` carried out, which was merged on 2026-10-19. They stay as the record of why
each step was taken. What remains is in `package-plan.md`.

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
5. **There is no contributor.** It became part of the steward (section 9), planned in
   `package-plan.md`.
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
8. **Optionally, scaffold the contributor** as a labelled draft. Replaced by the
   steward (`package-plan.md`).

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
   **Answered, 2026-10-19:** yes, for the steward only, which replaces both plugins. It
   ships two read-only helpers, the cartographer and a checker (section 9).
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
| 2026-10-19 | The steward (`package-plan.md`, D27 to D35): one package to set up, adopt, keep current and grow; the author the only contributor; scope the setup and the knowledge; the four moves for placing a lesson; no trio and no lanes; the one OK is before a new skill; hooks, MCP servers and tool commands stay in the project | 29ce1ea3 |

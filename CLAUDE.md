# personal-claude-plugin-marketplace

A personal Claude Code plugin marketplace: a library of skills, one per plugin, reused
across every project. **The product is prose.** There is no build, no dependencies,
and no runtime. The only executable file in the repo is one zero-dependency Node
script. So changes are judged editorially, and the automation exists only to catch the
mistakes that fail silently.

**Knowledge central, workers local.** The marketplace ships skills. The agents that use
them are generated into each project by the steward, `marketplace-steward`, together
with that project's `AGENTS.md`. The concept is described in
`docs/werkstatt/concept.md`.

**The steward is being built; see `docs/werkstatt/package-plan.md`.** It replaced
`marketplace-init` and this repo's own `.claude/` agents: one package that sets
projects up, adopts and keeps their setups current, and grows the marketplace by pull
request. Its trials and the merge remain. The rules below describe the shape the repo
now has.

## Commands

| Task | Command | Source |
|---|---|---|
| Validate marketplace | `claude plugin validate .` | CI |
| Validate one plugin | `claude plugin validate ./plugins/<name>` | CI |
| Check the plugin lists, layer prefixes and dependencies | `node scripts/check-catalog.mjs` | CI |
| Inventory + projected token cost | `claude plugin details <name>` | — |
| Install locally for testing | `claude plugin marketplace add .` | — |
| Refresh after edits | `claude plugin marketplace update personal-claude-plugin-marketplace` | — |
| Run evals with a baseline arm | `claude plugin eval ./plugins/<name> --ablation with-without` | — |

`claude plugin validate` warns "no version specified" once per plugin. **That warning
is the policy working; see Boundaries.**

## Layout

| Path | Responsibility |
|---|---|
| `.claude-plugin/marketplace.json` | The catalog. Source of truth for the plugin list, and the one home of each plugin's `description` |
| `plugins/<layer>-<topic>/` | One skill plugin: manifest, README, one skill |
| `plugins/marketplace-<name>/` | A plugin that works on the marketplace itself (the steward). The only plugins with agents |
| `.claude/` | This repo's own settings and path-scoped rules. Never published as a plugin |
| `scripts/check-catalog.mjs` | Guards the three mirrored plugin lists |
| `docs/werkstatt/` | The concept, the migration plan, and the audit |

## Conventions

- **A skill is knowledge; a role is a worker's lane.** A skill holds every rule and
  example for one thing. A role (Plan, Do or Check) holds only its lane, its failure
  modes and its report skeleton, as a template in the steward. Its set-up turns each
  template into agents in the project. Knowledge written into a role has two homes, and
  the two will diverge.
- **Every skill sits in one of four layers**, from general to specific: Universal,
  Craft, Language, Framework & Tools. The layer is the plugin's name prefix
  (`universal-`, `craft-`, `language-`, `tools-`) and its `category`. Dependencies
  point only toward the more general layers.
- **A skill does one thing, and every rule has one home.** Other skills name it instead
  of restating it.
- **Not only code.** Every skill here is about code today, but names, categories and
  descriptions must not assume that.
- A `description` in frontmatter is a **trigger list**, not a summary. It is the only
  thing Claude sees when deciding whether to load the skill. Phrase triggers in the
  user's words.
- Hard-wrap prose at **88 columns**. Frontmatter descriptions and table rows are
  exempt, since they cannot wrap.
- Every skill ends by saying when to yield to a more specific layer or to local
  convention. A standard with no stated boundary gets applied mechanically.
- Read `plugins/marketplace-steward/references/author-skills/style.md` before writing
  or editing any skill or role template, and
  `plugins/marketplace-steward/references/place-knowledge.md` before deciding where a
  piece of knowledge goes. They are the canonical guides to the voice and to the cut.

### Plan, Do, Check

A task is solved by three agents in sequence, which the steward generates into the
project for each kind of task:

| Role | Lane | Skills |
|---|---|---|
| Plan | read-only: proposes a plan, then **waits** for the user's OK | Universal, Craft, Language |
| Do | **the only writer**: carries out the accepted plan | whatever the work needs, including all Framework & Tools |
| Check | read-only: compares the result against the accepted plan, and sends it back to Do | Universal, Craft, Language |

The plan is a hard stop. Check checks against the plan, not against the request.
`effort` is set per role and task, with the defaults Plan `high`, Do `medium` and Check
`medium`.

The review trio of `developer`, `code-reviewer` and `refactoring-specialist` was retired
in step 7. Its knowledge lives in the skills and in the role templates; the mapping is
in `docs/werkstatt/audit.md`.

## Boundaries

- **Never put a model reference in agent frontmatter.** No `model: sonnet`, and no
  other vendor's model name. The knowledge has to outlive any one vendor's tool, and
  naming a model hard-codes one runtime into a file that has to stay portable.
- **Generated context goes in `AGENTS.md`, not `CLAUDE.md`.** `CLAUDE.md` is a one-line
  `@AGENTS.md` import beside it. The pairing is required, not stylistic: a nested
  `CLAUDE.md` lazy-loads, while a nested `AGENTS.md` is never discovered.
- **Read-only is frontmatter, never prose.** An agent whose description says read-only
  without `disallowedTools: Write, Edit, NotebookEdit` is not read-only.
- **Skill plugins ship no `agents/`.** Only `marketplace-` plugins do. A shipped worker
  competes with the agents the steward generates, and the knowledge in it has a second
  home.
- **Never add `--strict` to CI.** It promotes "no version specified" to an error, and
  every plugin omits `version` on purpose so that updates resolve by commit SHA. The
  warning is the policy.
- **Never add a `version` to a plugin**, for the same reason. `check-catalog.mjs` fails
  on it.
- **Only `.json` goes in `.claude-plugin/`.** `skills/` or `agents/` placed inside it
  produce a plugin that validates, installs, and is completely empty.
- **Adding a plugin means three registrations**, not one: `marketplace.json`, the root
  `README.md` table, and the steward's `references/set-up/plugin-catalog.md`. Missing
  the third is silent: the plugin installs fine and is never chosen for any project.
  `check-catalog.mjs` is the only thing that catches it.
- **Only `check-catalog.mjs` checks `dependencies`**: that each name exists, and that it
  points toward a more general layer. `claude plugin validate` checks neither. Nothing
  checks that a skill named in prose is declared at all.
- A `skills` key in `plugin.json` *adds to* the default `skills/` directory, but
  `commands` and `agents` keys **replace** theirs. Adding an `agents` key silently hides
  `agents/`.
- Setting a field in both `plugin.json` and the marketplace entry is a trap, because
  the manifest silently wins. Each field gets one home, and `description` lives in the
  marketplace entry.
- **Hooks and MCP servers are not part of the concept.** Add one only when an idea
  cannot work without it.

## Working on this repo

This repo is worked on with the steward, like any project that uses the marketplace.
While the steward is being built, load its working copy for the session, with the
plugin it depends on:

```bash
claude --plugin-dir ./plugins/marketplace-steward --plugin-dir ./plugins/craft-review
```

| To | Use |
|---|---|
| Add or change a skill | The steward's contribute job: "make a skill out of this", "this skill got X wrong". It works in its own clone and opens a pull request, so pull this checkout after you merge |
| Review a skill, a plugin, a change, or the whole set | `evaluate-skills` |
| Write or edit by hand | `references/author-skills/style.md` and `references/place-knowledge.md` in the steward, read first |

Writing a standard is two jobs, and only one of them can be delegated:

- **Deciding what the standard is** is the maintainer's taste: its layer, its home, the
  judgement, the ranking, and what it yields to. The steward asks before a new skill,
  and every change waits for the maintainer's merge.
- **Rendering a decided standard into house form** is mechanical. The writer never
  invents substance, and it reports every judgement it had to assume.

Writer and evaluator stay separate on purpose. The steward writes, and the contribution
checker, read-only in its frontmatter, checks the change before its pull request.
Merging the two would let the same context approve its own output, which is when review
finds least.

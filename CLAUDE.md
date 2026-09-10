# personal-claude-plugin-marketplace

A personal Claude Code plugin marketplace: one catalog and seven plugins, reused across
every project. **The product is prose.** There is no build, no dependencies, and no
runtime — the only executable file in the repo is one zero-dependency Node script. Which
means changes are judged editorially, and the automation exists only to catch the two
mistakes that fail silently.

## Commands

| Task | Command | Source |
|---|---|---|
| Validate marketplace | `claude plugin validate .` | CI |
| Validate one plugin | `claude plugin validate ./plugins/<name>` | CI |
| Check the three plugin lists agree | `node scripts/check-catalog.mjs` | CI |
| Inventory + projected token cost | `claude plugin details <name>` | — |
| Install locally for testing | `claude plugin marketplace add .` | — |
| Refresh after edits | `claude plugin marketplace update personal-claude-plugin-marketplace` | — |
| Run evals with a baseline arm | `claude plugin eval ./plugins/<name> --ablation with-without` | — |

`claude plugin validate` warns "no version specified" once per plugin. **That warning is
the policy working — see Boundaries.**

## Layout

| Path | Responsibility |
|---|---|
| `.claude-plugin/marketplace.json` | The catalog. Source of truth for the plugin list |
| `plugins/<name>/` | One plugin: manifest, README, skills, agents |
| `plugins/toolkit-dev/` | The meta-plugin — how to author plugins for this repo |
| `scripts/check-catalog.mjs` | Guards the three mirrored plugin lists |

## Conventions

- **Skill = the standard. Agent = a worker that reads it.** The skill holds every rule
  and example; the agent holds only its failure mode and its lane. An agent that
  restates its skill has two copies of the standard, and they will diverge.
- A `description` in frontmatter is a **trigger list**, not a summary — it is the only
  thing Claude sees when deciding whether to load the skill. Phrase triggers in the
  user's words.
- Hard-wrap prose at **88 columns**. Frontmatter descriptions and table rows are exempt;
  they cannot wrap.
- Every skill ends by saying when to yield to local convention. A standard with no
  stated boundary gets applied mechanically.
- Read `plugins/toolkit-dev/skills/new-plugin/references/authoring-style.md` before
  writing or editing any skill or agent. It is the canonical voice guide.

## Boundaries

- **Never add `--strict` to CI.** It promotes "no version specified" to an error, and
  every plugin omits `version` on purpose so updates resolve by commit SHA. The warning
  is the policy.
- **Never add a `version` to a plugin.** Same reason. `check-catalog.mjs` fails on it.
- **Only `.json` goes in `.claude-plugin/`.** `skills/` or `agents/` placed inside it
  produce a plugin that validates, installs, and is completely empty.
- **Adding a plugin means three registrations**, not one: `marketplace.json`, the root
  `README.md` table, and
  `plugins/project-init/skills/init-agent-setup/references/plugin-catalog.md`. Missing
  the third is silent — the plugin installs fine and is never recommended to any
  project. `check-catalog.mjs` is the only thing that catches it.
- A `skills` key in `plugin.json` *adds to* the default `skills/` directory, but
  `commands` and `agents` keys **replace** theirs. Adding an `agents` key silently hides
  `agents/`.
- Setting a field in both `plugin.json` and the marketplace entry is a trap — the
  manifest wins silently. Pick one home per field.

## Working on this repo

The agents in `.claude/agents/` are tooling for maintaining this marketplace. They are
**not** plugins and must not be published as such — they are how the repo gets worked
on, not what it ships.

| Agent | Scope | |
|---|---|---|
| `@marketplace-architect` | The whole set — boundaries, coupling, competing triggers | reads |
| `@plugin-evaluator` | One plugin — validates, fires, costs, ablation | reads |
| `@skill-agent-evaluator` | One skill + its agent — the prose craft, as a pair | reads |
| `@mcp-integrator` | Whether a plugin needs a live server, and its config | reads |
| `@skill-agent-writer` | Renders a decided standard into house form | writes |

Writing a standard is two jobs and only one is delegable. Deciding what the standard
*is* — the judgement, the ranking, what to yield on — is a conversation about the
maintainer's taste and stays in the main context. Rendering a decided standard into
house form is mechanical, and that is what the writer does; it never invents substance,
and it reports every judgement it had to assume.

Writer and evaluator stay separate agents on purpose. They have opposite lanes — one
edits, one is frontmatter-locked read-only — and merging them would let the same context
bless its own output, which is the condition under which review finds least.

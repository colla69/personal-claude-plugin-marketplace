# Glossary

Look up any word this marketplace uses, in one line, and follow the link to the file
that holds its rules.

| Term | Meaning | Its rules live in |
|---|---|---|
| **Adopt** | The steward's job for a project that already has a Claude setup of its own: every rule in it gets one home, and a local copy goes only once its home is live | [`adopt.md`](../../plugins/marketplace-steward/references/adopt.md) |
| **Agent** | A subagent: an LLM with a role and a chosen set of skills, in a project's `.claude/agents/`. Skill plugins ship none; the steward ships two helpers | [`style.md`](../../plugins/marketplace-steward/references/author-skills/style.md) |
| `AGENTS.md` | A project's instructions: what reading the project cannot tell. Vendor-neutral, so other tools can read it too | [`context-files.md`](../../plugins/marketplace-steward/references/set-up/context-files.md) |
| **Always-on cost** | The tokens a plugin adds to every session that enables it, which `claude plugin details` estimates | [`SKILL.md`](../../plugins/marketplace-steward/skills/evaluate-skills/SKILL.md) |
| **Brick** | The original word for a skill, from the German *Baustein*: one piece of a modular knowledge base | — |
| **Canary** | A unique string placed in a file to prove, from a session's output, whether that file reached the model's context. It is how the steward's mechanics were tested | — |
| **Cartographer** | `codebase-cartographer`, the steward's read-only agent that surveys a codebase for set-up | [`codebase-cartographer.md`](../../plugins/marketplace-steward/agents/codebase-cartographer.md) |
| **Catalog** | `.claude-plugin/marketplace.json`: the list of every plugin, and the one home of each plugin's `description` | [`plugin-shape.md`](../../plugins/marketplace-steward/references/author-skills/plugin-shape.md) |
| **Category** | A plugin's layer as a field of its marketplace entry, and the prefix of its name; `marketplace` for a plugin that works on the marketplace itself, which sits in no layer | [`plugin-catalog.md`](../../plugins/marketplace-steward/references/set-up/plugin-catalog.md) |
| **Check** | The trio's last role: compares the result with the accepted plan, and sends gaps back to Do. Read-only | [`check.md`](../../plugins/marketplace-steward/references/set-up/roles/check.md) |
| **Checker** | `contribution-checker`, the steward's read-only agent that checks a change before its pull request, the leak check first | [`contribution-checker.md`](../../plugins/marketplace-steward/agents/contribution-checker.md) |
| `CLAUDE.md` import | A one-line `CLAUDE.md` holding `@AGENTS.md`, beside every `AGENTS.md`, because Claude Code discovers nested `CLAUDE.md` files and never a nested `AGENTS.md` | [`context-files.md`](../../plugins/marketplace-steward/references/set-up/context-files.md) |
| **Clone** | The steward's own copy of the marketplace, in `~/.local/share/marketplace-steward/clone/`, which every contribution works from | [`contribute.md`](../../plugins/marketplace-steward/references/contribute.md) |
| **Contribute** | The steward's job that turns a lesson into a change to a skill, or a new skill, by pull request | [`contribute.md`](../../plugins/marketplace-steward/references/contribute.md) |
| **Craft** | The layer of how a kind of work is done, such as reviewing, refactoring or a monthly report | [`place-knowledge.md`](../../plugins/marketplace-steward/references/place-knowledge.md) |
| **Dead key** | An `enabledPlugins` entry for a plugin that no longer exists. It matches nothing, and nothing reports it | [`plugin-catalog.md`](../../plugins/marketplace-steward/references/set-up/plugin-catalog.md) |
| **Dependency** | A plugin a plugin needs, declared in its `plugin.json`: in its own layer or a more general one, never a more specific one, and needed unconditionally | [`place-knowledge.md`](../../plugins/marketplace-steward/references/place-knowledge.md) |
| **Description** | The `description` a skill or agent carries: the only text Claude sees when deciding to load it, so it is a trigger list | [`style.md`](../../plugins/marketplace-steward/references/author-skills/style.md) |
| **Do** | The trio's middle role, and its only writer: carries out the accepted plan | [`do.md`](../../plugins/marketplace-steward/references/set-up/roles/do.md) |
| **Effort** | How hard a role thinks, set per role and task: Plan `high`, Do and Check `medium` by default | [`trios.md`](../../plugins/marketplace-steward/references/set-up/trios.md) |
| **Failure mode** | The thing a kind of worker typically gets wrong, such as an agreeable review. Part of a role, never of a skill | [`style.md`](../../plugins/marketplace-steward/references/author-skills/style.md) |
| **Framework & Tools** | The layer of one concrete product or tool, such as Vue, JUnit or Excel | [`place-knowledge.md`](../../plugins/marketplace-steward/references/place-knowledge.md) |
| **Front door** | `steward`, the skill that routes a request to one of the steward's four jobs | [`SKILL.md`](../../plugins/marketplace-steward/skills/steward/SKILL.md) |
| **Gap-fill** | A plugin from another permitted marketplace, chosen where the toolkit has nothing for a need | [`plugin-sources.md`](../../plugins/marketplace-steward/references/set-up/plugin-sources.md) |
| **Keep current** | The steward's job that finds where a setup has drifted, and fixes it | [`keep-current.md`](../../plugins/marketplace-steward/references/keep-current.md) |
| **Lane** | What a role may and may not touch. Plan and Check are read-only, by frontmatter; Do is the only writer | [`style.md`](../../plugins/marketplace-steward/references/author-skills/style.md) |
| **Language** | The layer of what the work is written in: a programming language, a natural language, a template | [`place-knowledge.md`](../../plugins/marketplace-steward/references/place-knowledge.md) |
| **Layer** | One of four tiers every skill belongs to, from general to specific: Universal, Craft, Language, Framework & Tools | [`place-knowledge.md`](../../plugins/marketplace-steward/references/place-knowledge.md) |
| **Leak check** | The check that nothing identifying the project a lesson came from reaches the public marketplace | [`SKILL.md`](../../plugins/marketplace-steward/skills/evaluate-skills/SKILL.md) |
| **Live home** | A new home that is in force, so the local copy of a rule may go: written, installed and preloaded, or merged | [`adopt.md`](../../plugins/marketplace-steward/references/adopt.md) |
| **Marketplace** | A catalog of plugins that Claude Code installs from. This repo is one | [`plugin-shape.md`](../../plugins/marketplace-steward/references/author-skills/plugin-shape.md) |
| **Marketplace plugin** | A plugin that works on the marketplace itself, named `marketplace-<name>`. The steward is the only one, and the only plugin that ships agents | [`plugin-shape.md`](../../plugins/marketplace-steward/references/author-skills/plugin-shape.md) |
| **Pending** | A rule an adoption left where it was, because its home is a pull request not yet merged | [`record.md`](../../plugins/marketplace-steward/references/record.md) |
| **Plan** | The trio's first role: proposes a plan and waits for the user's OK. Read-only | [`plan.md`](../../plugins/marketplace-steward/references/set-up/roles/plan.md) |
| **Plugin** | The installable unit of a marketplace. A skill plugin holds exactly one skill | [`plugin-shape.md`](../../plugins/marketplace-steward/references/author-skills/plugin-shape.md) |
| **Plugin catalog** | `plugin-catalog.md`: the signal that justifies installing each toolkit plugin, and the Renamed table | [`plugin-catalog.md`](../../plugins/marketplace-steward/references/set-up/plugin-catalog.md) |
| **Project skill** | A skill in a project's own `.claude/skills/`, for a procedure only that project runs | [`context-files.md`](../../plugins/marketplace-steward/references/set-up/context-files.md) |
| **Record** | `.claude/steward.json`: what the steward created in a project, with hashes, so a later run never overwrites the user's edits | [`record.md`](../../plugins/marketplace-steward/references/record.md) |
| **Reference file** | A file a skill reads by path when it needs it, so it costs nothing until then | [`plugin-shape.md`](../../plugins/marketplace-steward/references/author-skills/plugin-shape.md) |
| **Renamed table** | The list in the plugin catalog of old plugin and skill names and their successors, which keep-current applies | [`plugin-catalog.md`](../../plugins/marketplace-steward/references/set-up/plugin-catalog.md) |
| **Role** | What a worker does and must not do: its lane, its failure modes, its report | [`style.md`](../../plugins/marketplace-steward/references/author-skills/style.md) |
| **Role template** | A role written once, with a slot for its skills, from which set-up generates an agent in each project | [`plan.md`](../../plugins/marketplace-steward/references/set-up/roles/plan.md) |
| **Run pattern** | The project skill that runs one trio as `/<task>`: Plan, the user's OK, Do, Check | [`run.md`](../../plugins/marketplace-steward/references/set-up/roles/run.md) |
| **Set up** | The steward's job for a project with no setup of its own | [`procedure.md`](../../plugins/marketplace-steward/references/set-up/procedure.md) |
| **Signal** | What set-up must find in a project before it installs a plugin, such as `vue` in the dependencies | [`plugin-catalog.md`](../../plugins/marketplace-steward/references/set-up/plugin-catalog.md) |
| **Skill** | Knowledge: a prose standard for one thing, which every role that needs it reads | [`style.md`](../../plugins/marketplace-steward/references/author-skills/style.md) |
| **Source policy** | `.claude/plugin-sources.json`: which marketplaces a project may draw plugins from, asked once | [`plugin-sources.md`](../../plugins/marketplace-steward/references/set-up/plugin-sources.md) |
| **Steward** | `marketplace-steward`, the one package that sets projects up, adopts their setups, keeps them current, and grows the marketplace | [`marketplace-steward/README.md`](../../plugins/marketplace-steward/README.md) |
| **Strip test** | Replacing every name, path and value in a lesson by its role, to separate what travels from what stays in the project | [`place-knowledge.md`](../../plugins/marketplace-steward/references/place-knowledge.md) |
| **Toolkit** | This marketplace, from a project's point of view: the house marketplace, whose skills come first | [`plugin-sources.md`](../../plugins/marketplace-steward/references/set-up/plugin-sources.md) |
| **Trio** | Three agents, Plan, Do and Check, that solve one kind of task in a project, and the project skill that runs them | [`trios.md`](../../plugins/marketplace-steward/references/set-up/trios.md) |
| **Universal** | The layer of what holds for everything, whatever the kind of work, such as clean code | [`place-knowledge.md`](../../plugins/marketplace-steward/references/place-knowledge.md) |
| **Worktree** | A working copy of the steward's clone on its own branch, one per contribution, removed after the push | [`contribute.md`](../../plugins/marketplace-steward/references/contribute.md) |

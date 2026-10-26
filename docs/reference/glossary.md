# Glossary

Look up any word this marketplace uses, in one line, and follow the link to the file
that holds its rules.

| Term | Meaning | Its rules live in |
|---|---|---|
| **Agent** | A subagent: a worker with one job and the skills it preloads. Only the `marketplace-` plugins ship agents: the steward's `guide`, the base plugin's `test-runner` and `reviewer`, and the curator's `contribution-checker`. All four are read-only | [`style.md`](../../plugins/marketplace-curator/references/author-skills/style.md) |
| `AGENTS.md` | An instructions file that Claude Code loads only through an import in a `CLAUDE.md`. Earlier setups held their context in it. Where a project has one, the steward asks once whether to keep its `AGENTS.md` files, each behind a `CLAUDE.md` that imports it, or swap them for `CLAUDE.md`. It never creates one | [`context-files.md`](../../plugins/marketplace-steward/references/context-files.md) |
| **Always-on cost** | The tokens a plugin adds to every session that enables it, which `claude plugin details` estimates | [`SKILL.md`](../../plugins/marketplace-curator/skills/evaluate-skills/SKILL.md) |
| **Base** | `marketplace-base`, installed in every docked project: the index, the guard, the collector, and the `test-runner` and `reviewer` agents | [`the base`](the-base.md) |
| **Brick** | The original word for a skill, from the German *Baustein*: one piece of a modular knowledge base | — |
| **Canary** | A unique string placed in a file to prove, from a session's output, whether that file reached the model's context. It is how the steward's mechanics were tested | — |
| **Catalog** | The steward's `catalog.md`: the signal that justifies installing each plugin, the layers, scope, and the Renamed table. Not `marketplace.json`, which is the marketplace's plugin list and the one home of each plugin's `description` | [`catalog.md`](../../plugins/marketplace-steward/references/catalog.md) |
| **Category** | A plugin's layer as a field of its marketplace entry, and the prefix of its name; `marketplace` for a plugin that works on the marketplace itself, which sits in no layer | [`catalog.md`](../../plugins/marketplace-steward/references/catalog.md) |
| **Check command** | `STEWARD_CHECK` in a project's settings: the one command that proves the build and the tests pass, which the guard runs, for the paths in `STEWARD_CHECK_PATHS` when it sets any | [`the base`](the-base.md) |
| **Checker** | `contribution-checker`, the curator's read-only agent that checks a change before its pull request, the leak check first | [`contribution-checker.md`](../../plugins/marketplace-curator/agents/contribution-checker.md) |
| `CLAUDE.md` | A project's instructions: what reading the project cannot tell. Claude Code loads the root one in every session, and a nested one when a file in its folder is read | [`context-files.md`](../../plugins/marketplace-steward/references/context-files.md) |
| **Collector** | The base plugin's hooks that keep a list of the corrections the person makes while a session runs, and file the lists as an issue for the curators at the next session start. It reads only the conversation | [`the base`](the-base.md) |
| **Contribute** | The curator's job that turns a lesson or an issue into a change to a skill, or a new skill, by pull request | [`contribute.md`](../../plugins/marketplace-curator/references/contribute.md) |
| **Correction** | A moment a person told Claude it did something the wrong way, and how it should be done, where the right way looks like a standard | [`the base`](the-base.md) |
| **Craft** | The layer of how a kind of work is done, such as reviewing, refactoring or a monthly report | [`place-knowledge.md`](../../plugins/marketplace-curator/references/place-knowledge.md) |
| **Curator** | A person who decides what the marketplace's standards say, and `marketplace-curator`, the plugin they work with in the marketplace's own repository | [`contribute.md`](../../plugins/marketplace-curator/references/contribute.md) |
| **Dead key** | An `enabledPlugins` entry for a plugin that no longer exists. It matches nothing, and no session reports it; only `claude plugin list` shows it as failed to load | [`catalog.md`](../../plugins/marketplace-steward/references/catalog.md) |
| **Dependency** | A plugin a plugin needs, declared in its `plugin.json`: in its own layer or a more general one, never a more specific one, and needed unconditionally | [`place-knowledge.md`](../../plugins/marketplace-curator/references/place-knowledge.md) |
| **Description** | The `description` a skill or agent carries: the only text Claude sees when deciding to load it, so it is a trigger list | [`style.md`](../../plugins/marketplace-curator/references/author-skills/style.md) |
| **Dock** | The steward's job that brings a project onto the standards: `CLAUDE.md`, the standards and the base plugin, and a tidy of a setup the project already had. Only when someone asks | [`dock.md`](../../plugins/marketplace-steward/references/dock.md) |
| **Failure mode** | The thing a kind of worker typically gets wrong, such as an agreeable review. Part of an agent, never of a skill | [`style.md`](../../plugins/marketplace-curator/references/author-skills/style.md) |
| **Framework & Tools** | The layer of one concrete product or tool, such as Vue, JUnit or Excel | [`place-knowledge.md`](../../plugins/marketplace-curator/references/place-knowledge.md) |
| **Front door** | The skill that routes a request to a job: `steward` for docking and answers, `curate` in the marketplace's repository | [`SKILL.md`](../../plugins/marketplace-steward/skills/steward/SKILL.md) |
| **Gap-fill** | A plugin from another permitted marketplace, chosen where the house marketplace has nothing for a need | [`plugin-sources.md`](../../plugins/marketplace-steward/references/plugin-sources.md) |
| **Guard** | The base plugin's hook that runs the check command when Claude is about to stop after changing a file, and keeps it working while the check fails | [`the base`](the-base.md) |
| **Guide** | The steward's read-only agent, on Sonnet, that answers questions about the standards and the setup | [`guide.md`](../../plugins/marketplace-steward/agents/guide.md) |
| **Index** | The list of every standard in the marketplace that the base plugin gives each session at its start, with the ones enabled in the project marked | [`the base`](the-base.md) |
| **Lane** | What an agent may and may not touch. Every agent the marketplace ships has no edit tools, by frontmatter | [`style.md`](../../plugins/marketplace-curator/references/author-skills/style.md) |
| **Language** | The layer of what the work is written in: a programming language, a natural language, a template | [`place-knowledge.md`](../../plugins/marketplace-curator/references/place-knowledge.md) |
| **Layer** | One of the tiers every skill belongs to, from general to specific: Universal, Craft, Language, Framework & Tools, and Team | [`place-knowledge.md`](../../plugins/marketplace-curator/references/place-knowledge.md) |
| **Leak check** | The check that nothing identifying the project a lesson came from reaches the public marketplace | [`SKILL.md`](../../plugins/marketplace-curator/skills/evaluate-skills/SKILL.md) |
| **Marketplace** | A catalog of plugins that Claude Code installs from. This repo is one | [`plugin-shape.md`](../../plugins/marketplace-curator/references/author-skills/plugin-shape.md) |
| **Marketplace plugin** | A plugin that works on the marketplace itself, named `marketplace-<name>`: the steward, the base and the curator. Only they ship agents, and only the base ships hooks | [`plugin-shape.md`](../../plugins/marketplace-curator/references/author-skills/plugin-shape.md) |
| `opusplan` | The model setting docking writes: Opus in plan mode, Sonnet otherwise | [`settings-template.json`](../../plugins/marketplace-steward/references/assets/settings-template.json) |
| **Plugin** | The installable unit of a marketplace. A skill plugin holds exactly one skill | [`plugin-shape.md`](../../plugins/marketplace-curator/references/author-skills/plugin-shape.md) |
| **Project skill** | A skill in a project's own `.claude/skills/`, for a procedure only that project runs | [`context-files.md`](../../plugins/marketplace-steward/references/context-files.md) |
| **Reference file** | A file a skill reads by path when it needs it, so it costs nothing until then | [`plugin-shape.md`](../../plugins/marketplace-curator/references/author-skills/plugin-shape.md) |
| **Renamed table** | The list in the catalog of old plugin and skill names and their successors, which docking applies | [`catalog.md`](../../plugins/marketplace-steward/references/catalog.md) |
| **Signal** | What docking must find in a project before it installs a plugin, such as `vue` in the dependencies | [`catalog.md`](../../plugins/marketplace-steward/references/catalog.md) |
| **Skill** | Knowledge: a prose standard for one thing, which every session and agent that needs it reads | [`style.md`](../../plugins/marketplace-curator/references/author-skills/style.md) |
| **Source policy** | `.claude/plugin-sources.json`: which marketplaces a project may draw plugins from, asked once | [`plugin-sources.md`](../../plugins/marketplace-steward/references/plugin-sources.md) |
| **Standard** | A company's way of working, written once as a skill: how code is annotated, a template, a quality bar for prose, emails or presentations | [`place-knowledge.md`](../../plugins/marketplace-curator/references/place-knowledge.md) |
| **Steward** | `marketplace-steward`, installed once per machine: docks projects when asked, and answers questions about the standards | [`marketplace-steward/README.md`](../../plugins/marketplace-steward/README.md) |
| **Strip test** | Replacing every name, path and value in a lesson by its role, to separate what travels from what stays in the project | [`place-knowledge.md`](../../plugins/marketplace-curator/references/place-knowledge.md) |
| **Team** | The layer of one team's quirks, shared by its projects and true nowhere else, in a `team-<name>` plugin. A last resort: a quirk lives in the project's `CLAUDE.md` first | [`place-knowledge.md`](../../plugins/marketplace-curator/references/place-knowledge.md) |
| **Tidy** | Docking's step for a project with a setup of its own: removes rules a standard states word for word, keeps quirks, and files rules that would travel | [`tidy.md`](../../plugins/marketplace-steward/references/tidy.md) |
| **Toolkit** | This marketplace, from a project's point of view: the house marketplace, whose skills come first | [`plugin-sources.md`](../../plugins/marketplace-steward/references/plugin-sources.md) |
| **Universal** | The layer of what holds for everything, whatever the kind of work, such as clean code | [`place-knowledge.md`](../../plugins/marketplace-curator/references/place-knowledge.md) |

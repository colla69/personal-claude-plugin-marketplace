# personal-claude-plugin-marketplace

A Claude Code plugin marketplace: a library of standards, one skill per plugin, reused
across every project, and three plugins of its own: the steward, `marketplace-steward`,
which docks projects onto it; the base, `marketplace-base`, which every docked project
runs; and the curator, `marketplace-curator`, which grows it by pull request. **The
product is prose.** There is no build; the only code is the zero-dependency Node
scripts in `scripts/`, the one the steward measures a setup with, and the base plugin's
hooks. So a change is judged by how it is written and cut, and the checks exist only
for the mistakes that fail silently.

The three plugins are written and not yet tried on real projects. The documentation is
mapped in [`docs/README.md`](docs/README.md), and the reason behind every decision is in
[`docs/explanation/decisions.md`](docs/explanation/decisions.md).

## Where the rules live

Read the file before you change what it governs. None of its rules are repeated here.

| Before you | Read |
|---|---|
| Decide where a piece of knowledge goes, or cut a skill | [`place-knowledge.md`](plugins/marketplace-curator/references/place-knowledge.md) |
| Write or edit a skill, an agent or a plugin README | [`style.md`](plugins/marketplace-curator/references/author-skills/style.md) |
| Add, rename or register a plugin, or change a manifest | [`plugin-shape.md`](plugins/marketplace-curator/references/author-skills/plugin-shape.md) |
| Change a `marketplace-` plugin's skills, references, agents or hooks | [`plugin-shape.md`](plugins/marketplace-curator/references/author-skills/plugin-shape.md), then [`work-on-the-steward.md`](docs/guides/work-on-the-steward.md) |
| Write or edit a page in `docs/`, or an entry point | [`writing-docs.md`](docs/contributing/writing-docs.md) |

## Commands

| Task | Command |
|---|---|
| Validate the marketplace and every plugin | `claude plugin validate .` |
| Check the plugin lists, layers and dependencies | `node scripts/check-catalog.mjs` |
| Check the docs' links, map and wrapping | `node scripts/check-docs.mjs` |
| Load the working copy of the steward and the base | `claude --plugin-dir ./plugins/marketplace-steward --plugin-dir ./plugins/marketplace-base --plugin-dir ./plugins/craft-review --plugin-dir ./plugins/language-simple-english` |
| Load the working copy of the curator | `claude --plugin-dir ./plugins/marketplace-curator --plugin-dir ./plugins/craft-review --plugin-dir ./plugins/language-simple-english` |
| See a plugin's inventory and cost | `claude --plugin-dir ./plugins/<name> plugin details <name>` |
| Measure what a project's setup costs | `node plugins/marketplace-steward/scripts/measure-setup.mjs <project>` |
| Run a plugin's evals with a baseline | `claude plugin eval ./plugins/<name> --ablation with-without` |

`claude plugin validate` warns "no version specified" and "no description provided" for
every plugin. Both are the policy, so CI never runs it with `--strict`.

## What breaks silently

The gist of each; the files above hold the rules.

- **A plugin needs three registrations**: `marketplace.json`, both tables in
  `docs/reference/plugins.md`, and the steward's `references/catalog.md`.
  Missing the catalog row, it installs fine and is never chosen for any project.
- **A rename or a removal needs a row in the catalog's Renamed table.** Without it,
  docking removes the old key but installs no successor, and the project runs without
  that skill.
- **A skill named in prose needs its plugin in `dependencies`.** Nothing checks it: an
  undeclared skill that isn't installed is replaced by the model's generic taste.
- **No `version`** in a plugin, and **`description` only in the marketplace entry.**
- **Only `.json` in `.claude-plugin/`**, and no `agents` or `commands` key in
  `plugin.json`.
- **Skill plugins ship no `agents/`, hooks or MCP servers.** Only the `marketplace-`
  plugins ship agents, and only `marketplace-base` ships hooks. A hook there runs in
  every session of every docked project, so it returns fast and can't trap a session.
- **Every agent names its model** as an alias, such as `model: opus`, never a full
  model ID, and **the edit tools go in `disallowedTools`** in the frontmatter, never in
  a sentence.
- **The product never depends on the docs.** No skill, reference or agent may link to a
  page in `docs/`, because the installed plugin doesn't include it.
- **A product change can make a page wrong, and no check sees it.** The map's Sources
  column names the pages each product file feeds; reread them in the same change.
- **No real project name, client or person** in any file or commit message. The repo is
  public; examples are synthetic. The one exception is a credit and license notice that
  a borrowed file's license requires, such as the header of `measure-setup.mjs`.

## Working on this repo

| To | Use |
|---|---|
| Add or change a skill from a lesson or an issue | The curator's `curate` skill, enabled here. It works on a `contrib/` branch of this checkout and opens a pull request |
| Add or change a skill by hand | [`write-a-skill-by-hand.md`](docs/guides/write-a-skill-by-hand.md) |
| Review a change you wrote | The `change-reviewer` agent, so the reviewer isn't the writer |
| Review a skill, a plugin or the whole set | `evaluate-skills`, from the curator enabled here |

Deciding what a standard says, its layer, its home and what it yields to, is the
curators' taste: the curator asks before a new skill, and every change waits for a
curator's merge. Rendering a decided standard into house form is the part that
can be delegated, and whoever writes a change never reviews it.

## This repo's own setup

This repo is set up from the marketplace it holds, so the steward reads the files it is
made of. These lines keep the two apart; the reasons are D55 in `decisions.md`.

- **The setup is this file and `.claude/`, and nothing under `plugins/`.** The steward
  reads the files there as the marketplace, never as this project's rules or as
  evidence of its stack. A run here edits none of them; a change to the product goes the
  way the table above says.
- **No rule in this file travels.** Each one is about this marketplace, so an adoption
  contributes nothing from it. "What breaks silently" repeats the gist of rules in the
  steward's references on purpose: keep it.
- **Enabled here: `universal-work-discipline`, `craft-review`,
  `language-simple-english` and `marketplace-curator`.** The code Craft plugins and
  `language-javascript` are left out on purpose: the only code is a few small scripts,
  they change rarely, and each description would cost every session here. The steward
  and the base are never enabled here: this repo is the marketplace, not a docked
  project.
- **The desktop app runs the copies installed from `main`.** It takes no
  `--plugin-dir`, so a branch's version of a plugin is tested with the working-copy
  commands above.

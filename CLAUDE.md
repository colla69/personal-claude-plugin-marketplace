# personal-claude-plugin-marketplace

A Claude Code plugin marketplace: a library of skills, one per plugin, reused across
every project, and the steward, `marketplace-steward`, which sets projects up from it
and grows it by pull request. **The product is prose.** There is no build and no
runtime; the only code is the zero-dependency Node scripts in `scripts/`. So a change
is judged by how it is written and cut, and the checks exist only for the mistakes
that fail silently.

The steward is written and not yet tried on real projects. The documentation is mapped
in [`docs/README.md`](docs/README.md), and the reason behind every decision is in
[`docs/explanation/decisions.md`](docs/explanation/decisions.md).

## Where the rules live

Read the file before you change what it governs. None of its rules are repeated here.

| Before you | Read |
|---|---|
| Decide where a piece of knowledge goes, or cut a skill | [`place-knowledge.md`](plugins/marketplace-steward/references/place-knowledge.md) |
| Write or edit a skill, a role template or a plugin README | [`style.md`](plugins/marketplace-steward/references/author-skills/style.md) |
| Add, rename or register a plugin, or change a manifest | [`plugin-shape.md`](plugins/marketplace-steward/references/author-skills/plugin-shape.md) |
| Change the steward's own skills, references or agents | [`plugin-shape.md`](plugins/marketplace-steward/references/author-skills/plugin-shape.md), then [`work-on-the-steward.md`](docs/guides/work-on-the-steward.md) |
| Write or edit a page in `docs/`, or an entry point | [`writing-docs.md`](docs/contributing/writing-docs.md) |

## Commands

| Task | Command |
|---|---|
| Validate the marketplace and every plugin | `claude plugin validate .` |
| Check the plugin lists, layers and dependencies | `node scripts/check-catalog.mjs` |
| Check the docs' links, map and wrapping | `node scripts/check-docs.mjs` |
| Load the working copy of the steward | `claude --plugin-dir ./plugins/marketplace-steward --plugin-dir ./plugins/craft-review --plugin-dir ./plugins/language-simple-english` |
| See a plugin's inventory and cost | `claude --plugin-dir ./plugins/<name> plugin details <name>` |
| Run a plugin's evals with a baseline | `claude plugin eval ./plugins/<name> --ablation with-without` |

`claude plugin validate` warns "no version specified" and "no description provided" for
every plugin. Both are the policy, so CI never runs it with `--strict`.

## What breaks silently

The gist of each; the files above hold the rules.

- **A plugin needs three registrations**: `marketplace.json`, both tables in
  `docs/reference/plugins.md`, and the steward's `references/set-up/plugin-catalog.md`.
  Missing the catalog row, it installs fine and is never chosen for any project.
- **A rename or a removal needs a row in the catalog's Renamed table.** Without it,
  keep-current removes the old key but installs no successor, and the project runs
  without that skill.
- **A skill named in prose needs its plugin in `dependencies`.** Nothing checks it: an
  undeclared skill that isn't installed is replaced by the model's generic taste.
- **No `version`** in a plugin, and **`description` only in the marketplace entry.**
- **Only `.json` in `.claude-plugin/`**, and no `agents` or `commands` key in
  `plugin.json`.
- **Skill plugins ship no `agents/`, hooks or MCP servers.** Only the steward ships
  agents, and a hook or a server is added only when an idea can't work without it.
- **Every agent names its model** as an alias, such as `model: opus`, never a full
  model ID, and **the edit tools go in `disallowedTools`** in the frontmatter, never in
  a sentence.
- **The product never depends on the docs.** No skill, reference or agent may link to a
  page in `docs/`, because the installed plugin doesn't include it.
- **A product change can make a page wrong, and no check sees it.** The map's Sources
  column names the pages each product file feeds; reread them in the same change.
- **No real project name, client or person** in any file or commit message. The repo is
  public; examples are synthetic.

## Working on this repo

| To | Use |
|---|---|
| Add or change a skill from a lesson | The steward's contribute job. It works in its own clone and opens a pull request, so pull this checkout after the merge |
| Add or change a skill by hand | [`write-a-skill-by-hand.md`](docs/guides/write-a-skill-by-hand.md) |
| Review a change you wrote | The `change-reviewer` agent, in a session with the steward loaded by the command above, so the reviewer isn't the writer |
| Review a skill, a plugin or the whole set | `evaluate-skills`, in a session with the steward loaded by the command above |

Deciding what a standard says, its layer, its home and what it yields to, is the
maintainer's taste: the steward asks before a new skill, and every change waits for
the maintainer's merge. Rendering a decided standard into house form is the part that
can be delegated, and whoever writes a change never reviews it.

## This repo's own setup

The steward set this repo up from its own source, so it reads the files it is made of.
These lines keep the two apart.

- **The setup is this file and `.claude/`, and nothing under `plugins/`.** The skills,
  references and agents there are the product. Setting this repo up or keeping it
  current takes no rule from them and edits none of them; a change to the product goes
  the way the table above says.
- **No rule in this file travels.** Each one is about this marketplace, so an adoption
  contributes nothing from it. "What breaks silently" repeats the gist of rules in the
  steward's references on purpose: keep it.
- **The enabled plugins are the copies installed from `main`.** `.claude/settings.json`
  enables `universal-work-discipline`, `craft-review` and `language-simple-english`,
  for every session here and in the desktop app. A `--plugin-dir` copy replaces the
  installed one for that session, so the working-copy command tests a branch. The
  desktop app takes no `--plugin-dir`, so it runs what is merged, after
  `claude plugin marketplace update`.
- **`marketplace-steward` is never enabled here**, as in any project: it belongs to the
  machine, and work on it loads the working copy.

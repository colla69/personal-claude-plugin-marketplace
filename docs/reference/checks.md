# Checks

Look up what each check catches, and what no check catches, so you know which mistakes
you have to look for yourself.

## `node scripts/check-catalog.mjs`

The marketplace's own check, with no dependencies. It fails on:

| Mistake | Why nothing else notices |
|---|---|
| An empty plugin list in `marketplace.json`, or an entry without `name`, `source`, `description`, `category` or `tags` | The marketplace parses, and the plugin is half-registered |
| A plugin missing from `marketplace.json`, from either table of `docs/reference/plugins.md` or from the tables of `plugin-catalog.md` together, or a name left in one of them that no longer exists. Only names in a table column headed Plugin or Plugins count | The plugin installs fine; missing from the catalog, it is never chosen for any project |
| An entry whose `source` folder doesn't exist, that has no `.claude-plugin/plugin.json`, or whose `plugin.json` gives another name | The entry points at nothing, or at the wrong plugin |
| A folder under `plugins/` that `marketplace.json` doesn't list | It is simply never loaded |
| A `category` other than `universal`, `craft`, `language`, `tools` or `marketplace`, or a name whose prefix doesn't match it | The layer is read from the name |
| A dependency on a plugin that doesn't exist, or on one in a more specific layer | `claude plugin validate` passes both |
| A `version` in `plugin.json` | Every user would stay on the cached copy until someone bumped it |
| A `description` in `plugin.json` | Set in both places, the manifest silently wins over the marketplace entry |
| A plugin with no `README.md`, or one whose heading isn't `# <plugin-name>` | A copied README with the wrong name |
| `skills/`, `agents/`, `commands/` or `hooks/` inside `.claude-plugin/` | The plugin validates, installs, and is empty |
| An `agents/` folder in any plugin but a `marketplace-` one | A shipped agent competes with the ones the steward generates |

## `node scripts/check-docs.mjs`

The documentation's own check, with no dependencies. It reads the pages in `docs/`,
the three entry points, the repo's own `.claude/` and the plugin READMEs, and fails
on:

| Mistake | Why nothing else notices |
|---|---|
| A relative link to a file that doesn't exist, or to a heading the file doesn't have | GitHub renders it as an ordinary link, and it leads nowhere, or to the top of the page |
| An absolute link, such as `/docs/README.md` | It resolves on one host and not another |
| A link from a page into the working records | It works, and ties the page to history it should stand without |
| A page in `docs/` that `docs/README.md` doesn't link | It exists, and nobody finds it |
| A prose line past 88 columns, outside a table, code or frontmatter, and not one link whose text can't break | It renders fine, and the source drifts from the house format |
| A link into `docs/` from a skill, a reference or an agent | It works in this repo, and fails from the installed plugin, which holds no `docs/` |

A link inside inline code is an example and isn't checked, and neither are
reference-style links or anything in a file's frontmatter, such as an agent's
description.

## `claude plugin validate`

Claude Code's own check of a plugin or the whole marketplace: that each manifest
parses, that every path it names exists inside the plugin, and that its fields have the
right types. It warns "no version specified" and "no description provided" once per
plugin each; here both are the policy, which is why CI runs it without `--strict`.

## CI

`.github/workflows/validate.yml` runs on every push to `main`, every pull request, and
when started by hand:

| Job | Runs |
|---|---|
| `catalog in sync` | `node scripts/check-catalog.mjs` |
| `docs in shape` | `node scripts/check-docs.mjs` |
| `manifests valid` | `claude plugin validate .`, then `claude plugin validate` on each plugin |

## Inside the steward

| Check | Catches |
|---|---|
| Set-up's verify phase | A trio naming a skill that isn't enabled or doesn't load; JSON or frontmatter that doesn't parse; a rule whose `paths:` match nothing; an `AGENTS.md` that doesn't follow the keep-or-swap answer; context files over their budget; a record that doesn't match its files |
| Keep-current | A dead plugin key, a skill name in a trio that doesn't resolve, an `AGENTS.md` from an older setup, a path or a command in `CLAUDE.md` that no longer exists |
| The checker, before each pull request | A change that breaks the house standard or the cut, and anything from the source project in the diff, the commit messages, the branch name or the pull request text |

## What nothing catches

Look for these yourself, or ask `evaluate-skills`:

| Mistake | What you see |
|---|---|
| A skill named in prose but not declared in `dependencies` | The other skill isn't installed, and the agent carries on with generic taste |
| A description that doesn't win the prompts it is for | The skill never loads, and nothing says so |
| A description that wins prompts it isn't for | The skill loads where it doesn't belong |
| A rule stated in two skills | The two drift apart, and the agents that read them disagree |
| A project's name in an example, outside a contribution | It reads like any example. Search for your projects' names before you commit |
| A trio's skill installed but not in a role's `skills:` | The role works without that standard |
| A wrong Skill, Builds on or signal cell in a plugin table | The check compares names only; the other columns are read by people |
| A page made wrong by a product change | It reads as true. The map's Sources column names the pages each product file feeds; reread them in the same change |
| A page that names a working record, without linking it | The check sees only links |
| A copy of the signals in a plugin README's Install section | It drifts from `plugin-catalog.md`, which is the one the steward reads |

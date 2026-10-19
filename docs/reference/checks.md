# Checks

Look up what each check catches, and what no check catches, so you know which mistakes
you have to look for yourself.

## `node scripts/check-catalog.mjs`

The marketplace's own check, with no dependencies. It fails on:

| Mistake | Why nothing else notices |
|---|---|
| A plugin missing from `marketplace.json`, `docs/reference/plugins.md` or `plugin-catalog.md`, or a name left in one of them that no longer exists | The plugin installs fine; missing from the catalog, it is never chosen for any project |
| A folder under `plugins/` that `marketplace.json` doesn't list | It is simply never loaded |
| A `category` other than `universal`, `craft`, `language`, `tools` or `marketplace`, or a name whose prefix doesn't match it | The layer is read from the name |
| A dependency on a plugin that doesn't exist, or on one in a more specific layer | `claude plugin validate` passes both |
| A `version` in `plugin.json` | Every user would stay on the cached copy until someone bumped it |
| A `description` in `plugin.json` | Set in both places, the manifest silently wins over the marketplace entry |
| A plugin with no `README.md`, or one whose heading isn't `# <plugin-name>` | A copied README with the wrong name |
| `skills/`, `agents/`, `commands/` or `hooks/` inside `.claude-plugin/` | The plugin validates, installs, and is empty |
| An `agents/` folder in any plugin but a `marketplace-` one | A shipped agent competes with the ones set-up generates |

## `claude plugin validate`

Claude Code's own check of a plugin or the whole marketplace: that each manifest
parses, that every path it names exists inside the plugin, and that its fields have the
right types. It warns "no version specified" once per plugin; here that is the policy,
which is why CI runs it without `--strict`.

## CI

`.github/workflows/validate.yml` runs on every push to `main` and every pull request:

| Job | Runs |
|---|---|
| `catalog in sync` | `node scripts/check-catalog.mjs` |
| `manifests valid` | `claude plugin validate .`, then `claude plugin validate` on each plugin |

## Inside the steward

| Check | Catches |
|---|---|
| Set-up's verify phase | A trio naming a skill that isn't enabled or doesn't load; JSON or frontmatter that doesn't parse; a rule whose `paths:` match nothing; an `AGENTS.md` with no `CLAUDE.md` import; context files over their budget; a record that doesn't match its files |
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

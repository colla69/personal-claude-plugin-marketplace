# Commands

Look up every command these pages mention: what it does, and when you run it. Run the
marketplace's own commands from the root of a checkout of this repo.

## Using the marketplace

| Command | What it does |
|---|---|
| `claude plugin marketplace add colla69/personal-claude-plugin-marketplace` | Adds this marketplace on a machine |
| `claude plugin install marketplace-steward@personal-claude-plugin-marketplace --scope user` | Installs the steward for your user, so it works in every project |
| `/marketplace-steward:steward` | Starts the steward; saying what you want works as well |
| `/model` | Changes the model for a session, over the `opusplan` docking sets |
| `claude plugin marketplace update` | Refreshes every marketplace, so the next install or update sees the latest versions. A docked project's marketplace updates by itself |
| `claude plugin update <name>@<marketplace> --scope project` | Updates one of a project's plugins to the marketplace's latest. Without `--scope`, it picks a scope by itself |
| `claude plugin install <name>@<marketplace> --scope project` | Installs a plugin for one project, recorded in its `.claude/settings.json`. Without `--scope`, it installs at user scope, for every project on the machine |
| `claude plugin uninstall <name>@<marketplace>` | Removes a plugin, such as one under an old name. It works at user scope unless you add `--scope project` |
| `claude plugin list --json` | Lists what is installed, with each plugin's id and version |
| `claude plugin list --available --json` | Lists the real inventory in two arrays: `installed`, and `available` for what the configured marketplaces offer beyond it. Read both |
| `/context` | Shows what loaded into a session, such as the context files |
| `/reload-plugins` | Loads the plugins, skills and agents you installed or updated, without a new session |

Run `/reload-plugins` after installing: a plugin installed mid-session isn't available
until it has run.

## Working on the marketplace

| Command | What it does |
|---|---|
| `claude plugin validate .` | Validates the marketplace and every plugin. "No version specified" and "No description provided", once per plugin each, are the policy, not failures |
| `claude plugin validate ./plugins/<name>` | Validates one plugin |
| `node scripts/check-catalog.mjs` | Checks the plugin lists, layers, names and dependencies agree; [checks](checks.md) lists what it catches |
| `node scripts/check-docs.mjs` | Checks the docs: links and anchors resolve, every page is on the map, prose wraps at 88, no skill links into `docs/` |
| `claude plugin details <name>` | Shows an installed plugin's inventory and its estimated token cost |
| `node plugins/marketplace-steward/scripts/measure-setup.mjs <project>` | Prints what a project's setup costs per session, and how its sessions used it, from the transcripts Claude Code keeps under `~/.claude/projects/`. It prints names, numbers and the headings of the root context files, and writes nothing. Docking and the guide run it in the project |
| `claude --plugin-dir ./plugins/<name> plugin details <name>` | The same for the files in your checkout, installed or not |
| `claude --plugin-dir ./plugins/marketplace-steward --plugin-dir ./plugins/marketplace-base --plugin-dir ./plugins/craft-review --plugin-dir ./plugins/language-simple-english` | Starts a session with your working copy of the steward and the base plugin. Every plugin they depend on needs its own `--plugin-dir`, or it doesn't load |
| `claude plugin eval ./plugins/<name> --ablation with-without` | Runs a plugin's eval cases with and without it, to show whether it changes the outcome. No plugin here has eval cases yet |
| `claude plugin marketplace add .` | Adds your checkout as a local marketplace, for trying an install. It has the same name as the marketplace from GitHub, which the base plugin reads to find where to file issues, so on a machine that has that one, use `--plugin-dir` instead |

## What the plugins run

The steward runs `claude plugin` and `gh issue create` commands and its measuring
script, and the curator runs `git`, `gh` and the checks in this repo. They are listed,
with what each is for, in [permissions](permissions.md). The base plugin's hooks run
`node`, the project's check command, `claude -p` and `gh`, as [the base](the-base.md)
says.

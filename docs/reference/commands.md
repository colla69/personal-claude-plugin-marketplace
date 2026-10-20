# Commands

Look up every command these pages mention: what it does, and when you run it. Run the
marketplace's own commands from the root of a checkout of this repo.

## Using the marketplace

| Command | What it does |
|---|---|
| `claude plugin marketplace add colla69/personal-claude-plugin-marketplace` | Adds this marketplace on a machine |
| `claude plugin install marketplace-steward@personal-claude-plugin-marketplace --scope user` | Installs the steward for your user, so it works in every project |
| `/marketplace-steward:steward` | Starts the steward; saying what you want works as well |
| `/<task>` | Runs one of a project's trios, such as `/change` |
| `claude plugin marketplace update` | Refreshes every marketplace, so the next install or update sees the latest versions |
| `claude plugin update <name>@<marketplace>` | Updates one installed plugin to the marketplace's latest |
| `claude plugin install <name>@<marketplace> --scope project` | Installs a plugin for one project, recorded in its `.claude/settings.json` |
| `claude plugin uninstall <name>@<marketplace>` | Removes a plugin, such as one under an old name. It works at user scope unless you add `--scope project` |
| `claude plugin list --json` | Lists what is installed, with each plugin's id and version |
| `claude plugin list --available --json` | Lists the real inventory in two arrays: `installed`, and `available` for what the configured marketplaces offer beyond it. Read both |
| `/context` | Shows what loaded into a session, such as the context files |

Restart the session after installing: a plugin installed mid-session isn't available
until the next one.

## Working on the marketplace

| Command | What it does |
|---|---|
| `claude plugin validate .` | Validates the marketplace and every plugin. "No version specified" and "No description provided", once per plugin each, are the policy, not failures |
| `claude plugin validate ./plugins/<name>` | Validates one plugin |
| `node scripts/check-catalog.mjs` | Checks the plugin lists, layers, names and dependencies agree; [checks](checks.md) lists what it catches |
| `claude plugin details <name>` | Shows an installed plugin's inventory and its estimated token cost |
| `claude --plugin-dir ./plugins/<name> plugin details <name>` | The same for the files in your checkout, installed or not |
| `claude --plugin-dir ./plugins/marketplace-steward --plugin-dir ./plugins/craft-review` | Starts a session with your working copy of the steward. Every plugin it depends on needs its own `--plugin-dir`, or it doesn't load |
| `claude plugin eval ./plugins/<name> --ablation with-without` | Runs a plugin's eval cases with and without it, to show whether it changes the outcome. No plugin here has eval cases yet |
| `claude plugin marketplace add .` | Adds your checkout as a local marketplace, for trying an install |

## What the steward runs

The steward runs `git`, `gh` and `claude plugin` commands in its own folder. They are
listed, with what each is for, in [permissions](permissions.md).

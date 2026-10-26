# Project files

Look up every file docking writes, in a project and on your machine: what it is for,
what it holds, and which file in the steward holds its rules. The project's files are
meant to be committed, so the setup travels with the project.

**Not yet tried on real projects.** The shapes here are the ones the steward's files
set out; the first trials will show where what it writes differs.

## In the project

| File | What it is for | Rules |
|---|---|---|
| `CLAUDE.md`, at the root and in each component that earns one | What reading the project cannot tell: non-obvious commands, conventions that differ from the defaults, boundaries, and the reasons behind them. Where the project has `AGENTS.md` files and you chose to keep them, they hold this content instead, each behind a `CLAUDE.md` that imports it | [`context-files.md`](../../plugins/marketplace-steward/references/context-files.md) |
| `.claude/rules/*.md` | A convention that follows a file type, loaded only when a matching file is read | `context-files.md` |
| `.claude/settings.json` | Declares the marketplace, sets the model and the check command, and enables the plugins docking installed. Merged into, never replaced | [`dock.md`](../../plugins/marketplace-steward/references/dock.md), [`catalog.md`](../../plugins/marketplace-steward/references/catalog.md) |
| `.claude/plugin-sources.json` | Which marketplaces this project may draw plugins from | [`plugin-sources.md`](../../plugins/marketplace-steward/references/plugin-sources.md) |
| `.claude/skills/<name>/SKILL.md` | A project skill, for a multi-step procedure only this project runs | `context-files.md` |

Docking writes no agents, no run skills and no record. A project an earlier steward set
up loses its generated agents, its run skills and its `.claude/steward.json` in the
tidy.

### `.claude/settings.json`

The part docking writes. It merges the template into what is there, and `claude plugin
install … --scope project` adds each plugin under `enabledPlugins`:

```json
{
  "extraKnownMarketplaces": {
    "personal-claude-plugin-marketplace": {
      "source": { "source": "github", "repo": "colla69/personal-claude-plugin-marketplace" }
    }
  },
  "model": "opusplan",
  "env": { "STEWARD_CHECK": "npm run build && npm test" },
  "enabledPlugins": {
    "marketplace-base@personal-claude-plugin-marketplace": true,
    "universal-clean-code@personal-claude-plugin-marketplace": true
  }
}
```

| Key | Effect |
|---|---|
| `extraKnownMarketplaces` | Declares the marketplace, so the project's plugins resolve on any machine. Claude Code updates it by itself, so each merged change reaches the project; only your user settings or managed settings can turn that off, never the project's |
| `model` | `opusplan` plans on Opus in plan mode and works on Sonnet. A `model` the project already had is kept. `/model` changes it for a session |
| `env.STEWARD_CHECK` | The command the base plugin's guard runs. Left out when docking couldn't verify one |

The steward itself is never in this file: it is installed once, for your user.

### `.claude/plugin-sources.json`

Written in the first step of docking, from the checklist you ticked. The starting
shape:

```json
{
  "priority": ["personal-claude-plugin-marketplace"],
  "marketplaces": {
    "personal-claude-plugin-marketplace": { "recommend": true },
    "claude-plugins-official": { "recommend": true, "external": false },
    "claude-community": { "recommend": false }
  }
}
```

| Key | Effect |
|---|---|
| `priority` | The marketplaces whose plugins win any overlap, in order; your own comes first |
| `marketplaces.<name>.recommend` | `false` takes that marketplace out of consideration |
| `marketplaces.<name>.external` | `false` allows only plugins whose code lives in that marketplace's own repository |

A `~/.claude/plugin-sources.json` is your standing preference; docking copies it into a
project that has none.

## On your machine

| Path | What it holds |
|---|---|
| `~/.local/share/marketplace-steward/backups/<project>/<date>/` | Copies of your files, taken by the tidy before the first rule is taken out of a file whose working copy differs from git's `HEAD` |
| The base plugin's data folder, `~/.claude/plugins/data/marketplace-base…/` | The guard's state, and the collector's: for each session how far it has read and its list of possible corrections, and its locks |

The backups are not under `~/.claude`, where Claude Code asks before every write.

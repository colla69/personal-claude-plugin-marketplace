# Project files

Look up every file the steward writes, in a project and on your machine: what it is
for, what it holds, and which file in the steward holds its rules. The project's files
are meant to be committed, so the setup travels with the project.

**Not yet tried on real projects.** The shapes here are the ones the steward's files
set out; the first trials will show where what it writes differs.

## In the project

| File | What it is for | Rules |
|---|---|---|
| `CLAUDE.md`, at the root and in each component that earns one | What reading the project cannot tell: non-obvious commands, conventions that differ from the defaults, boundaries, and the reasons behind them. The root lists the trios. Where the project has `AGENTS.md` files and you chose to keep them, they hold this content instead, each behind a `CLAUDE.md` that imports it | [`context-files.md`](../../plugins/marketplace-steward/references/set-up/context-files.md) |
| `.claude/rules/*.md` | A convention that follows a file type, loaded only when a matching file is read | `context-files.md` |
| `.claude/settings.json` | Declares the marketplace, and enables the plugins set-up installed. Merged into, never replaced | [`plugin-catalog.md`](../../plugins/marketplace-steward/references/set-up/plugin-catalog.md) |
| `.claude/plugin-sources.json` | Which marketplaces this project may draw plugins from | [`plugin-sources.md`](../../plugins/marketplace-steward/references/set-up/plugin-sources.md) |
| `.claude/steward.json` | The record of what the steward created and installed | [`record.md`](../../plugins/marketplace-steward/references/record.md) |
| `.claude/agents/<task>-plan.md`, `-do.md`, `-check.md` | One trio's three agents | [`trios.md`](../../plugins/marketplace-steward/references/set-up/trios.md), [`roles/`](../../plugins/marketplace-steward/references/set-up/roles/) |
| `.claude/skills/<task>/SKILL.md` | The run pattern that runs that trio as `/<task>` | [`roles/run.md`](../../plugins/marketplace-steward/references/set-up/roles/run.md) |
| `.claude/skills/<name>/SKILL.md` | A project skill, for a multi-step procedure only this project runs | `context-files.md` |

### `.claude/settings.json`

The part set-up writes. It merges the marketplace entry into what is there, and
`claude plugin install … --scope project` adds each plugin under `enabledPlugins`:

```json
{
  "extraKnownMarketplaces": {
    "personal-claude-plugin-marketplace": {
      "source": { "source": "github", "repo": "colla69/personal-claude-plugin-marketplace" }
    }
  },
  "enabledPlugins": {
    "universal-clean-code@personal-claude-plugin-marketplace": true
  }
}
```

The steward itself is never in this file: it is installed once, for your user.

### `.claude/plugin-sources.json`

Written in set-up's first phase, from the checklist you ticked, and read by every later
phase. The starting shape:

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

A `~/.claude/plugin-sources.json` is your standing preference; set-up copies it into a
project that has none.

### `.claude/steward.json`

```json
{
  "steward": "<the steward's version, for the report>",
  "files": {
    ".claude/agents/change-plan.md": {
      "from": "roles/plan.md",
      "template": "<hash of the template when the file was built>",
      "fill": { "TASK": "change", "skills": ["…"], "model": "opus", "effort": "high" },
      "sha256": "<hash of the file as written>"
    },
    "CLAUDE.md": { "sha256": "<hash of the file as written>" }
  },
  "plugins": ["<every plugin the steward installed>"],
  "context": "<AGENTS.md if you kept your AGENTS.md files, CLAUDE.md if you swapped them; absent if there were none>",
  "declined": ["<every new skill you said no to>"],
  "pending": [
    { "path": "<file>", "rule": "<the rule>", "home": "<plugin:skill>", "pr": "<link; absent for a rule waiting for your word>" }
  ]
}
```

Only files the steward created are listed; a file that existed before it came is never
claimed. A file whose hash no longer matches is yours: it is never rebuilt, though a
check may still fix one line in it, such as a skill name that no longer resolves.

## On your machine

| Path | What it holds |
|---|---|
| `~/.local/share/marketplace-steward/clone/` | The steward's own clone of the marketplace |
| `~/.local/share/marketplace-steward/worktrees/<topic>/` | One working copy per contribution, removed after the push, and kept when a job stops or a command fails |
| `~/.local/share/marketplace-steward/drafts/<topic>/` | A contribution's commit message, title and description, written before the check |
| `~/.local/share/marketplace-steward/backups/<project>/<date>/` | Copies of your files, taken before the first rule is taken out of a file whose working copy differs from git's `HEAD`: in an adoption, or when keep-current clears a pending rule |

None of these are under `~/.claude`, where Claude Code asks before every write.

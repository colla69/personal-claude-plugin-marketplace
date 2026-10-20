# The steward

Look up what each of the steward's jobs starts on, reads, writes, asks and never does.
Why it works this way is in [the steward](../explanation/the-steward.md); each job's
procedure is the file in the Procedure column.

## How a job starts

You talk to it, or run `/marketplace-steward:steward`. The front door picks the job from
what you ask and from what the project already has:

| The project has | "Set this project up" means | "Add a trio" means |
|---|---|---|
| Nothing, or only other tools' files | Set up | Set up |
| A Claude setup of its own, and no `.claude/steward.json` | Adopt | Adopt first |
| `.claude/steward.json` | Keep current | Set up, for that trio |

It stays out of ordinary work: setting up a tool, a service, a dependency, a dev server
or CI, and remembering a preference, which is Claude's memory.

## The jobs

| Job | Starts on | Procedure |
|---|---|---|
| **Set up** | "set this project up", "onboard this repo", "set up agents for this repo", "there's no AGENTS.md or CLAUDE.md here", a folder with no code to set up | [`set-up/procedure.md`](../../plugins/marketplace-steward/references/set-up/procedure.md) |
| **Adopt** | "bring our existing setup onto the marketplace", or set-up asked where a Claude setup already exists | [`adopt.md`](../../plugins/marketplace-steward/references/adopt.md) |
| **Keep current** | "update the setup", a skill or agent in the project's setup not loading, set-up asked where the steward set the project up before | [`keep-current.md`](../../plugins/marketplace-steward/references/keep-current.md) |
| **Contribute** | "a skill got this wrong", "make this a marketplace skill", "add this to my skills for every project", or a placement you changed in a contribution's pull request | [`contribute.md`](../../plugins/marketplace-steward/references/contribute.md) |

### What each reads and writes

| Job | Reads | Writes in the project | Writes elsewhere |
|---|---|---|---|
| Set up | The project, through the cartographer for a codebase; the live inventory of every marketplace; the source policy | `AGENTS.md` and its `CLAUDE.md`, path-scoped rules, project skills, `.claude/settings.json`, `.claude/plugin-sources.json`, the trios, `.claude/steward.json` | — |
| Adopt | Everything set up reads, and every Claude file of the project's own | What set up writes; rules edited out of the project's own files once their home is live | Backups in `~/.local/share/marketplace-steward/backups/`; contributions, as below |
| Keep current | The record, the settings, the source policy, the trios, `AGENTS.md`, the manifests and the top-level tree, the live inventory | Dead keys removed, plugins installed, skill names fixed and skills added to roles, untouched trios rebuilt, new trios built, verifiable `AGENTS.md` lines fixed, pending rules removed after their merge, the record refreshed | Backups, in `~/.local/share/marketplace-steward/backups/`, before a pending rule is removed |
| Contribute | The lesson, the project it came from, the steward's clone | The lesson's project part, in `AGENTS.md`; a declined skill, in the record | A worktree, drafts and a branch in `~/.local/share/marketplace-steward/`, and a pull request |

[Project files](project-files.md) describes every file in the project column.

### What each asks

| Job | Asks |
|---|---|
| Set up | The sources checklist, once, when no policy file exists. An OK for each new skill, together, at the end |
| Adopt | The same as set up |
| Keep current | An OK for a new skill, if the project now needs one |
| Contribute | An OK before a new skill; nothing before a change to an existing one |

Everything else goes ahead and is reported.

### What none of them does

- Touch git in your project: no branch, commit, stage or stash.
- Overwrite a file you changed since the steward wrote it, or bring back a trio or a
  plugin you removed.
- Remove a rule before its new home is live, or change your `CLAUDE.local.md`,
  `.claude/settings.local.json`, or edit a file under `~/.claude` itself; installs and
  refreshes go through Claude Code.
- Write files for any tool but Claude.
- Change a checkout of the marketplace you work in, or push to `main`.

## The rest of the package

| Part | Kind | What it does |
|---|---|---|
| [`steward`](../../plugins/marketplace-steward/skills/steward/SKILL.md) | Skill, visible | The front door: picks the job and holds the rules every job shares |
| [`evaluate-skills`](../../plugins/marketplace-steward/skills/evaluate-skills/SKILL.md) | Skill, visible | Reviews a skill, a role template, a plugin, a change or the whole set; the checker preloads it |
| [`codebase-cartographer`](../../plugins/marketplace-steward/agents/codebase-cartographer.md) | Agent, read-only | Surveys a codebase for set-up |
| [`contribution-checker`](../../plugins/marketplace-steward/agents/contribution-checker.md) | Agent, read-only | Checks a change before its pull request, the leak check first |
| [`place-knowledge.md`](../../plugins/marketplace-steward/references/place-knowledge.md) | Reference | Where a lesson belongs: the diagnosis, the strip test, the layers, the cut |
| [`author-skills/`](../../plugins/marketplace-steward/references/author-skills/) | Reference | The house style, the shape of a plugin, the templates |
| [`record.md`](../../plugins/marketplace-steward/references/record.md) | Reference | The record's shape and rules |
| [`set-up/`](../../plugins/marketplace-steward/references/set-up/) | Reference | Set-up's procedure, the role templates, the plugin catalog, the source rules, the context-file rules, the trio rules, the report, and the assets |

The steward builds on `craft-review`, whose `review-work` its checker preloads.

# Permissions

Look up what the steward and the curator may do without asking, what they ask for, and
the one guard you set up yourself. Every rule here is in a skill's frontmatter, and
holds only while that skill is running.

## The one approval

A skill that pre-allows tools needs permission to run. The first time the steward runs,
Claude Code asks whether it may, and can remember your answer. After that, everything
below runs without a prompt.

**Not yet tried in full.** Probes showed each kind of rule working, and an agent started
from inside a skill reading under its rules. The trials will show whether every rule
reaches such an agent.

## The steward

The rules are in
[`skills/steward/SKILL.md`](../../plugins/marketplace-steward/skills/steward/SKILL.md).

| Rule | Lets it |
|---|---|
| `Read(/${CLAUDE_PLUGIN_ROOT}/**)` | Read its own reference files from the installed plugin. The leading `/` makes the path absolute, as a permission rule needs |
| `Write(~/.local/share/marketplace-steward/backups/**)` | Back up a file before the tidy removes a rule from it |
| `claude plugin list --json`, `claude plugin list --available --json`, `claude plugin marketplace list --json`, `claude plugin marketplace update` | Read the live inventory and the configured marketplaces |
| `claude plugin install * --scope project` | Install a plugin, at project scope only |
| `claude plugin details *` | Check that each plugin loads, and what it costs |
| `node ${CLAUDE_PLUGIN_ROOT}/scripts/measure-setup.mjs` | Measure what the project's setup costs. It reads the project's context files and `.claude/`, and the project's transcripts under `~/.claude/projects/`, prints names, numbers and the headings of the root context files, and writes nothing |
| `gh issue create *` | File the rules a tidy found that would serve other projects |

Everything else is asked for: edits to your project's files, whenever your session's
permission mode asks for them; a command to check that a JSON file parses; `git status`
or `git diff`, which the tidy reads to decide what needs a backup; and the check
command, which docking runs once.

To stop being asked for one, allow it in your own `~/.claude/settings.json`. The steward
never changes that file; it only merges its entries into the project's
`.claude/settings.json`.

## The base plugin

Its hooks are not tools a session calls, so no permission rule applies to them: Claude
Code runs them because the plugin is enabled. [The base](the-base.md) lists what each
runs, and how to turn it off.

## The curator

The rules are in
[`skills/curate/SKILL.md`](../../plugins/marketplace-curator/skills/curate/SKILL.md),
and `evaluate-skills` carries `Read(/${CLAUDE_PLUGIN_ROOT}/**)` of its own.

| Rule | Lets it |
|---|---|
| `Read(/${CLAUDE_PLUGIN_ROOT}/**)` | Read its references |
| `gh issue list *`, `gh issue view *` | Read the queue and one issue |
| `git status --porcelain`, `git fetch origin`, `git switch -c contrib/*` | Start a contribution on a fresh branch |
| `claude plugin validate .`, `node scripts/check-catalog.mjs`, `node scripts/check-docs.mjs` | Run the marketplace's checks |

It asks for the commit, the push, `gh pr create`, and every comment on or closing of an
issue.

## The guard you set up: protect `main`

Turn on branch protection for `main` in the marketplace's GitHub repository, requiring
a pull request. The curator pushes only `contrib/…` branches, but a push written as
`contrib/x:main` is still a push. Branch protection is the guard that holds whatever a
command looks like, and it makes a curator's merge the only way into `main`.

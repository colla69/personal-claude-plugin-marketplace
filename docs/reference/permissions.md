# Permissions

Look up what the steward may do without asking, what it asks for, and the one guard you
set up yourself. Every rule here is in the front door's frontmatter,
[`skills/steward/SKILL.md`](../../plugins/marketplace-steward/skills/steward/SKILL.md),
and holds only while the steward is running a job.

## The one approval

A skill that pre-allows tools needs permission to run. The first time the steward runs,
Claude Code asks whether it may, and can remember your answer. After that, everything
below runs without a prompt. An agent the steward starts, such as the checker, reads
the steward's files under the same rules.

## What it may do without asking

| Rule | Lets it |
|---|---|
| `Read(/${CLAUDE_PLUGIN_ROOT}/**)` | Read its own reference files from the installed plugin. The leading `/` makes the path absolute, as a permission rule needs |
| `Read`, `Write`, `Edit` on `~/.local/share/marketplace-steward/**` | Work in its own folder: the clone, the worktrees, the drafts and the backups |
| `claude plugin list --json`, `claude plugin marketplace list --json` | Find which marketplace is the house one, and where it lives |
| `git -C …/clone worktree list`, `fetch origin`, `worktree add -b contrib/* …/worktrees/* origin/main`, `worktree remove …/worktrees/*`, `branch -D contrib/*` | Manage one worktree per contribution, on a `contrib/` branch off `main` |
| `git -C …/worktrees/* add -A`, `commit -F …/drafts/*`, `diff origin/main*`, `log --format=%B origin/main..HEAD`, `push -u origin contrib/*` | Commit a contribution from its drafted message, show it to the checker, and push its branch |
| `claude plugin validate …/worktrees/*`, `node …/worktrees/*/scripts/check-catalog.mjs`, `claude --plugin-dir …/worktrees/* plugin details *` | Run the marketplace's checks on the worktree |
| `gh pr create *` | Open the pull request |

`…` stands for `~/.local/share/marketplace-steward`. Each git rule names one command in
the exact form the procedure runs it; a wildcard covers only the parts that vary, and
any command the rules don't name is asked for. A rule matches text, not intent, so the
push rule is no guard against a push to `main` on its own.

## What it asks for

Everything the rules don't name. The ones you will meet:

| Command | When |
|---|---|
| `git clone` into `~/.local/share/marketplace-steward/clone` | The first contribution on a machine |
| `claude plugin marketplace update`, `claude plugin list --available --json` | Every set-up and keep-current, to read the live inventory |
| `claude plugin install <name>@<marketplace> --scope project` | Each plugin set-up or keep-current installs |
| `claude plugin details <plugin>` | Set-up's check that every skill a trio names loads |
| `claude plugin update <name>@<marketplace>` | Keep-current, after a contribution is merged |
| `sha256sum <path>` | Writing or reading the record |
| Edits to your project's files | Whenever your session's permission mode asks for them |

To stop being asked for one, allow it in your own `~/.claude/settings.json`; the steward
never changes your settings.

## Why the clone isn't under `~/.claude`

Claude Code treats every file under `~/.claude` as sensitive, and asks before each
write there, whatever a skill allows. A contribution writes several files, so a clone in
the plugin's data folder would ask again and again. `~/.local/share/` has no such
treatment, so the rules above work there.

## The guard you set up: protect `main`

Turn on branch protection for `main` in the marketplace's GitHub repository, requiring
a pull request. The steward pushes only `contrib/…` branches, but a push written as
`contrib/x:main` would still match its rule. Branch protection is the guard that holds
whatever a command looks like, and it makes your merge the only way into `main`.

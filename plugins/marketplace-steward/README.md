# marketplace-steward

What a project teaches should reach the next project. The steward is one package for
the whole cycle: it sets a project up, adopts the setup a project already has, keeps
that setup current, and turns lessons into changes to the marketplace, by pull
request.

**Not tried for real yet.** All four jobs are written; trying them on real projects
comes next.

| | |
|---|---|
| Skills | `steward`, the front door, and `evaluate-skills` |
| Agents | `codebase-cartographer`, which surveys a codebase for set-up, and `contribution-checker`, which checks a change before its pull request. Both read-only |
| References | `set-up/`, `adopt.md`, `keep-current.md`, `contribute.md`, `record.md`, `cost.md`, `place-knowledge.md` and `author-skills/`, read by path |
| Script | `scripts/measure-setup.mjs`, which measures what a project's setup costs per session. Plain Node; it writes nothing |
| Layer | None: it works on the marketplace itself |
| Builds on | `craft-review`, `language-simple-english` |

## Fires when

- "set this project up", "onboard this repo", "set up agents for this repo"
- A trio wanted for one more task
- "bring our existing setup onto the marketplace", or set-up asked in a project that
  already has its own `CLAUDE.md`, rules, skills, agents or hooks
- "update the setup", or a skill or agent in a project's setup not loading
- "this setup costs too many tokens", "make the setup cheaper"
- "a skill got this wrong", "make this a marketplace skill", "add this to my skills for
  every project"
- A folder with no code in it: documents, reports, templates
- `evaluate-skills`: "is this skill well written?", "why isn't this skill triggering?",
  or a change to this skills marketplace before its pull request

## Writes

- `.claude/plugin-sources.json`, the sources skills may come from, asked once as a
  checklist
- `CLAUDE.md`, at the root and in each component that earns one. When the project has
  `AGENTS.md` files, it asks once whether to keep them, each behind a `CLAUDE.md` that
  imports it, or swap them for `CLAUDE.md`
- The skills, installed at project scope into `.claude/settings.json`, merged. Plugin
  keys that no longer exist are removed
- For each trio, `.claude/agents/<task>-plan.md`, `-do.md` and `-check.md`, and
  `.claude/skills/<task>/SKILL.md`, which runs them
- `.claude/steward.json`, the record of what it generated
- For an adoption: each local rule removed once its new home is live, except a rule in a
  context file, which waits for your word. A file that
  differs from git's `HEAD`, untracked or with uncommitted edits, is first copied to
  `~/.local/share/marketplace-steward/backups/`
- For a contribution: a branch and a pull request on the marketplace, from its own
  clone in `~/.local/share/marketplace-steward/`, never from a checkout of yours

It asks three things only: the sources checklist, once; whether to keep or swap the
project's `AGENTS.md` files, once, when it has any; and an OK before it creates a new
skill. Everything else it does and reports. A rule in a context file whose home is a
skill waits for your word, and the report lists it.

## Leaves to you

- **Git.** No branch, commit, stage or stash. Branch before running it; the report
  lists every path it created and changed, and `git diff` does the rest.
- **Your edits.** A file you changed after the steward wrote it is not rebuilt or
  rewritten whole; a check may fix one line in it, such as a renamed skill.
- **The merge.** Every change to the marketplace waits for you in a pull request.
- **What makes a review finding at all.** `craft-review:review-work`.

## Install

```bash
claude plugin install marketplace-steward@personal-claude-plugin-marketplace --scope user
```

User scope: it belongs to the machine and works in every project you open. The first
time it runs, Claude Code asks whether it may, because it pre-allows reading its own
files and the commands of its own folder; Claude Code can remember the answer.

## Credits

`scripts/measure-setup.mjs` adapts parts of
[claude-context-optimizer](https://github.com/egorfedorov/claude-context-optimizer) by
Egor Fedorov, under the MIT License, which the script's header carries.

## More

- Every job, with what it reads, writes and asks:
  [`docs/reference/the-steward.md`](../../docs/reference/the-steward.md)
- Why it works the way it does:
  [`docs/explanation/the-steward.md`](../../docs/explanation/the-steward.md)
- What keeps you in control:
  [`docs/explanation/safety.md`](../../docs/explanation/safety.md)

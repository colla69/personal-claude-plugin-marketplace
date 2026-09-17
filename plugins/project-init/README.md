# project-init

Turns a cold repository into a working agentic setup: context files Claude will actually
load, path-scoped rules, and the right plugins enabled.

| Component | Name | Role |
|---|---|---|
| Skill | `init-agent-setup` | Seven phases: **prepare** (branch, source policy), survey, map, **propose**, write, wire up plugins, verify |
| Agent | `codebase-cartographer` | Surveys a large tree and returns a structured map. Read-only |

Reference files: `context-files.md` (tiers, templates, size limits), `plugin-catalog.md`
(what to recommend from the toolkit, and on what evidence), `plugin-sources.md`
(discovering what exists right now, and the permission file that bounds it).

## Fires when

- A repo has no `AGENTS.md`, `CLAUDE.md`, or `.claude/`
- "set this up", "onboard me to this repo", "which plugins should I use here"
- You want plugins and subagents configured, not just a memory file — prefer this over a
  bare `/init`

## Does not

- **Write a context file before phase 5.** It proposes first; a wrong context file loads
  into every session and quietly misleads, which is worse than no context file. Phase 1
  is preparation and writes its own setup, which is a different thing.
- **Touch git.** No branch, no commit, no stash. You branch before running it and decide
  afterwards what to keep; the report lists every path it created and every path it
  changed, and `git diff` does the rest.
- Produce one giant file. Root stays under 200 lines; per-component detail goes in
  nested `AGENTS.md` files that cost nothing until that subtree is opened.
- **Write Claude-specific config.** Content goes in `AGENTS.md`, the vendor-neutral file
  other agents read; `CLAUDE.md` is a one-line `@AGENTS.md` import beside it.
- **Recommend plugins from memory.** It runs `claude plugin marketplace update` and
  `claude plugin list --available --json` first, so a plugin the toolkit shipped last
  week gets offered and one that was renamed doesn't.
- **Decide for itself what's safe to pull in.** Phase 1 asks which sources this repo may
  draw from — one checklist, before it reads a line of code — and writes the answer to
  `.claude/plugin-sources.json`. Every later phase obeys that file without arguing. A
  repo's procurement and security politics are not knowable from its code, and the
  person who knows them is the one holding the checkboxes.
- Describe what the code plainly shows — but it does map entry points, because "which
  file do I open first" costs a real search every session.
- Replace an existing `AGENTS.md`, `.cursor/rules/`, or
  `.github/copilot-instructions.md` — it reads them and improves on what's there.

## Install

```bash
claude plugin install project-init@personal-claude-plugin-marketplace --scope user
```

User scope — you want it in every repo you open.

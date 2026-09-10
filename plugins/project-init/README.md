# project-init

Turns a cold repository into a working agentic setup: context files Claude will actually
load, path-scoped rules, and the right plugins enabled.

| Component | Name | Role |
|---|---|---|
| Skill | `init-agent-setup` | Six phases: survey, map, **propose**, write, wire up plugins, verify |
| Agent | `codebase-cartographer` | Surveys a large tree and returns a structured map. Read-only |

Reference files: `context-files.md` (tiers, templates, size limits), `plugin-catalog.md`
(what to recommend, and on what evidence).

## Fires when

- A repo has no `AGENTS.md`, `CLAUDE.md`, or `.claude/`
- "set this up", "onboard me to this repo", "which plugins should I use here"
- You want plugins and subagents configured, not just a memory file — prefer this over a
  bare `/init`

## Does not

- **Write anything before phase 4.** It proposes first; a wrong context file loads into
  every session and quietly misleads, which is worse than no context file.
- Produce one giant file. Root stays under 200 lines; per-component detail goes in
  nested `AGENTS.md` files that cost nothing until that subtree is opened.
- **Write Claude-specific config.** Content goes in `AGENTS.md`, the vendor-neutral file
  other agents read; `CLAUDE.md` is a one-line `@AGENTS.md` import beside it.
- Describe what the code plainly shows — but it does map entry points, because "which
  file do I open first" costs a real search every session.
- Replace an existing `AGENTS.md`, `.cursor/rules/`, or
  `.github/copilot-instructions.md` — it reads them and improves on what's there.

## Install

```bash
claude plugin install project-init@personal-claude-plugin-marketplace --scope user
```

User scope — you want it in every repo you open.

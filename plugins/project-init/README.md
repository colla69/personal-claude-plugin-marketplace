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

- A repo has no `CLAUDE.md` or `.claude/`
- "set this up", "onboard me to this repo", "which plugins should I use here"
- You want plugins and subagents configured, not just a memory file — prefer this over a
  bare `/init`

## Does not

- **Write anything before phase 4.** It proposes first; a wrong context file loads into
  every session and quietly misleads, which is worse than no context file.
- Produce one giant file. Root stays under 200 lines; per-component detail goes in
  nested `CLAUDE.md` files that cost nothing until Claude opens that subtree.
- Describe what the code plainly shows. It captures only what Claude can't derive by
  reading.
- Replace an existing `CLAUDE.md` — it improves it. An existing `AGENTS.md` gets
  imported with `@AGENTS.md`, not duplicated.

## Install

```bash
claude plugin install project-init@personal-claude-plugin-marketplace --scope user
```

User scope — you want it in every repo you open.

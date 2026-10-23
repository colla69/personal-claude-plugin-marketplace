# What a setup costs

A setup is paid for before any work starts. Every session loads the root `CLAUDE.md`,
every rule without `paths:`, and the description of every skill and agent, and every
request reads all of it again. So a hundred tokens of always-on context cost more over
a week than most single runs of a trio. Measure first, then cut only what you may cut,
and report the rest with its price.

The record's rules hold throughout: read `record.md`, beside this file, first.

## Measure

Run the measuring script from the project root:

```bash
node <plugin root>/scripts/measure-setup.mjs
```

The plugin root is the folder above this one. The script reads the project's context
files and `.claude/`, and the transcripts Claude Code keeps for the project under
`~/.claude/projects/`. It prints names and numbers only, and writes nothing. When it
cannot run, such as on a machine without Node, say so under Unverified and skip the
rest of this file.

Its tables, in order:

- **Always on:** the part of every session this setup adds, and its share of the
  context at a session's first request. "Measured from session" is the exact text
  Claude Code loaded; "file" is an estimate from the file.
- **On demand:** nested `CLAUDE.md` files and rules with `paths:`. They cost nothing
  until a session opens a matching file, which is why they are the place to move
  detail to.
- **Each root file by section**, largest first.
- **Use:** for each plugin, project skill, project agent and MCP server, whether the
  latest session loaded it, its calls, and the sessions since its file last changed.
- **Agent runs:** each agent's runs, its model, and what a run read and wrote.

Skills and agents from outside the setup, such as user-scope plugins, the steward
among them, and Claude Code's own prompt are one line. They belong to the machine, not
the project, so nothing here acts on them.

## Evidence

A part with no calls is unused only when at least 5 sessions ran since its file last
changed. With fewer, it has no verdict yet: absence of evidence is not evidence. A
skill that an agent preloads shows no call of its own, so a plugin preloaded by an
agent of the setup counts as used.

## Act on it

| The script shows | Do |
|---|---|
| A part that did not load | Check it as step 3 of `keep-current.md` does. It costs nothing, and it does nothing |
| A root file over the budget in `set-up/context-files.md`, or a section about one component or one file type | Move the section to that component's `CLAUDE.md`, or to a rule with `paths:`. Do it only in a file the record lists with a matching hash. In any other file, report the section, its tokens and the home it would move to |
| A rule without `paths:` that is about one file type | Give it `paths:` under the same condition. Otherwise report it |
| A plugin with no calls, preloaded by no agent, after enough sessions | Report it as possibly unneeded, with its tokens. It stays: removing it costs a standard the user may still want |
| A trio whose skill has no calls and whose agents have no runs, after enough sessions | Report it as possibly unneeded, with the tokens of its four descriptions. It stays |
| An MCP server in `.mcp.json` with no calls, after enough sessions | Report it as possibly unneeded. Never edit `.mcp.json`: the project's mechanics are its own |
| Agent runs | Report the roles, the costliest first, with their models. Change no model on the numbers alone: they show what a role costs, not what its work is worth |

When the user then names a role and a cheaper model, change that agent's `model:` line,
and the `model` in its record entry's `fill`, if its hash matches the record. If it
doesn't, tell the user which line to change.

Never report as unneeded a plugin whose signal in `set-up/plugin-catalog.md` is every
project.

## Report

Give the numbers as the script printed them. Don't round a small number up, and don't
turn tokens into money: prices change, and no decision here depends on them.

```
### Cost
**This setup:** ~<tokens> always on, <share> of the context at a session's first
request, read again with each of about <requests> requests. **Sessions read:** <n>

| Part | Always-on tokens | Finding | Done |
|---|---|---|---|
| <part> | <tokens> | <what the script showed> | <moved to <path>; or reported, and why it stays> |
```

Leave out a part with no finding. With no finding at all, give the first two lines and
say that nothing needs to change.

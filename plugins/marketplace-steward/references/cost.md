# What a setup costs

A setup is paid for before any work starts. Every session loads the root `CLAUDE.md`,
every rule without `paths:`, and the description of every skill and agent, and every
request reads all of it again. So a cut there repays in every request of every session.
Measure first, then propose each cut with its price. Nothing here changes a file: the
user says which cuts to make, and the front door makes them.

## Measure

Run the measuring script from the project root:

```bash
node <plugin root>/scripts/measure-setup.mjs
```

The plugin root is the folder above this one. The script reads the project's context
files and `.claude/`, and the transcripts Claude Code keeps for the project under
`~/.claude/projects/`. It prints names, numbers and the headings of the root context
files, and writes nothing. When it cannot run, such as on a machine without Node, say
so under Unverified and skip the rest of this file.

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
  "Not yet" marks a part that changed after the latest session started, such as one
  this run installed: no session could load it yet. A plugin that is not loaded has no
  tokens in the total. For one that is "not yet", take its always-on tokens from
  `claude plugin details <plugin>` and add them to the total you report.
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

| The script shows | Propose |
|---|---|
| A part that did not load, marked **no** | Find out why: a plugin key that names nothing is a dead key, as "Renamed and removed" in `catalog.md` says, and a skill name that moved is in the same table. It costs nothing, and it does nothing |
| A project skill marked **user only** | Nothing: only the user starts it, so it is never in the session's listing, and it costs nothing always on |
| A root file over the budget in `context-files.md`, or a section about one component or one file type | Moving the section to that component's `CLAUDE.md`, or to a rule with `paths:`, with its tokens |
| A rule without `paths:` that is about one file type | Giving it `paths:`, with its tokens |
| A plugin with no calls, preloaded by no agent, after enough sessions | Nothing to remove: name it as possibly unneeded, with its tokens. Removing it costs a standard the user may still want |
| An MCP server in `.mcp.json` with no calls, after enough sessions | Nothing to remove: name it as possibly unneeded. The project's mechanics are its own |
| Agent runs | The agents, the costliest first, with their models. Propose no model change on the numbers alone: they show what a role costs, not what its work is worth |

Never name as unneeded a plugin whose signal in `catalog.md` is every project, or
`marketplace-base`.

## Report

Give the numbers as the script printed them. Don't round a small number up, and don't
turn tokens into money: prices change, and no decision here depends on them.

**Say where the cost is.** A session's context grows with what it reads, so the setup
is a smaller share of an average request than of the first one. When the second share
is small, say so: a cut to the setup reaches only that share of each request, and the
larger part is what the sessions themselves read, which the script does not break
down. Then don't offer the setup as the place to save.

```
### Cost
**This setup:** ~<tokens> always on, <share> of the context at a session's first
request and <share> of an average request, read again with each of about <requests>
requests. **Sessions read:** <n>

| Part | Always-on tokens | Finding | Proposed |
|---|---|---|---|
| <part> | <tokens> | <what the script showed> | <the cut, or why it stays> |
```

Leave out a part with no finding. With no finding at all, give the first two lines and
say that nothing needs to change.

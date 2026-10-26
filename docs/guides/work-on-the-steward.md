# Work on the steward

Change the marketplace's own plugins, the steward, the base and the curator, load your
working copy in a session, and find out how a Claude Code mechanic really behaves before
you build on it. The house style and the plugin shape they follow are in
[`author-skills/`](../../plugins/marketplace-curator/references/author-skills/).

## Load your working copy

```bash
claude --plugin-dir ./plugins/marketplace-steward --plugin-dir ./plugins/marketplace-base --plugin-dir ./plugins/craft-review --plugin-dir ./plugins/language-simple-english
```

Add `--plugin-dir ./plugins/marketplace-curator` to work on the curator.

- **A `--plugin-dir` copy replaces the installed one** of the same name for that
  session, silently. `claude --debug` logs `overrides installed version`.
- **Every dependency needs its own `--plugin-dir`.** The steward depends on
  `language-simple-english`, and the base and the curator on `craft-review` too. A
  plugin whose dependency isn't installed doesn't load at all: not one of its skills
  appears, and none of its hooks runs.
- **Changes need a new session.** A skill and a hook are read at the start of a session.

To see what your copy costs: `claude --plugin-dir ./plugins/marketplace-steward
--plugin-dir ./plugins/language-simple-english plugin details marketplace-steward`.

## Where things live

| Part | Path | Loaded |
|---|---|---|
| The steward's front door | `marketplace-steward/skills/steward/SKILL.md` | Always: its description is in every session |
| The steward's guide | `marketplace-steward/agents/guide.md` | Its description is in every session |
| Docking and its knowledge | `marketplace-steward/references/` | Read by path when a job starts |
| The base plugin's hooks | `marketplace-base/hooks/hooks.json` and `scripts/` | Run by Claude Code, in every session of a docked project |
| The base plugin's agents | `marketplace-base/agents/` | Their descriptions are in every docked session |
| The curator | `marketplace-curator/` | Only in this repository |

Two rules shape every change, and both are in "A `marketplace-` plugin" in
[`plugin-shape.md`](../../plugins/marketplace-curator/references/author-skills/plugin-shape.md):

- **`${CLAUDE_PLUGIN_ROOT}` is filled in only inside a skill, an agent or a hook
  command**, so a reference names the files around it relative to its own folder.
- **A new visible skill costs a description in every session of every project**, so
  knowledge goes in a reference file unless an agent must preload it.
  [Cost](../explanation/cost.md) explains why.

A command the steward runs must match a rule in the front door's `allowed-tools`
exactly, or Claude Code asks for it; [permissions](../reference/permissions.md) lists
them.

## Try a hook script

A hook script reads one JSON object on standard input and is run from the project. Try
one without a session, with the variables Claude Code would set:

```bash
echo '{"cwd": "'"$PWD"'"}' | CLAUDE_PLUGIN_DATA=/tmp/base-data node plugins/marketplace-base/scripts/index.mjs
```

Point `CLAUDE_PLUGIN_DATA` at a scratch folder, so a try never touches the state of
the copy you work with. For the collector, put stand-in `claude` and `gh` scripts first
on your `PATH`, so nothing calls a model or files an issue.

## Find out how a mechanic behaves

The plugins depend on details of Claude Code that the documentation doesn't always
settle: what a skill's `allowed-tools` covers, whether an agent inherits it, where
writes are refused, how long a hook may run. Test them before you build on them, with a
probe:

1. **Make a probe plugin** in a scratch folder, with a skill or an agent shaped like the
   thing you want to test.
2. **Put a canary in it**: a unique string, such as `CANARY-7Q`, in the file whose
   loading you want to prove. Asking a model what is in its context is unreliable; a
   canary in its output isn't.
3. **Run it once, headless, with nothing written to your config:**

   ```bash
   claude -p --plugin-dir ./probe --output-format stream-json --verbose "<the probe's prompt>"
   ```

   A skill with `allowed-tools` needs permission to run, which `-p` can't ask for: add
   `--allowedTools "Skill(<plugin>:<skill>)"`.
4. **Read the tool calls and results** in the JSON stream, not only the final answer.
5. **Remove what it created**, such as a plugin data folder under
   `~/.claude/plugins/data/`.

Probes like these showed, for example, that writes under `~/.claude` are always asked
for, that a wildcard in the middle of a permission rule works, and that an agent started
from a skill reads under that skill's rules.

## Before you commit

Run the checks in [the development loop](../contributing/development-loop.md), then
[review](review-a-skill.md) what you changed, the way the checker would. A change to a
procedure or a hook is a change to what happens in every docked project, so try it on a
copy of a real project before you merge.

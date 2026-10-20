# Work on the steward

Change the steward itself, load your working copy in a session, and find out how a
Claude Code mechanic really behaves before you build on it. The house style and the
plugin shape it follows are in
[`author-skills/`](../../plugins/marketplace-steward/references/author-skills/).

## Load your working copy

```bash
claude --plugin-dir ./plugins/marketplace-steward --plugin-dir ./plugins/craft-review --plugin-dir ./plugins/language-simple-english
```

- **A `--plugin-dir` copy replaces the installed one** of the same name for that
  session, silently. `claude --debug` logs `overrides installed version`.
- **Every dependency needs its own `--plugin-dir`.** The steward depends on
  `craft-review` and `language-simple-english`, and a plugin whose dependency isn't
  installed doesn't load at all: not one of its skills appears.
- **Changes need a new session.** A skill is read at the start of a session.

To see what your copy costs: `claude --plugin-dir ./plugins/marketplace-steward
--plugin-dir ./plugins/craft-review --plugin-dir ./plugins/language-simple-english
plugin details marketplace-steward`.

## Where things live

| Part | Path | Loaded |
|---|---|---|
| The front door | `skills/steward/SKILL.md` | Always: its description is in every session |
| The review | `skills/evaluate-skills/SKILL.md` | Always, and preloaded by the checker |
| The jobs and their knowledge | `references/` | Read by path when a job starts |
| The helpers | `agents/` | Their descriptions are in every session |

Two rules shape every change, and both are in "A `marketplace-` plugin" in
[`plugin-shape.md`](../../plugins/marketplace-steward/references/author-skills/plugin-shape.md):

- **`${CLAUDE_PLUGIN_ROOT}` is filled in only inside a skill or an agent**, so a
  reference names the files around it relative to its own folder.
- **A new visible skill costs a description in every session of every project**, so
  knowledge goes in a reference file unless an agent must preload it.
  [Cost](../explanation/cost.md) explains why.

A command the steward runs must match a rule in the front door's `allowed-tools`
exactly, or Claude Code asks for it; [permissions](../reference/permissions.md) lists
them.

## Find out how a mechanic behaves

The steward depends on details of Claude Code that the documentation doesn't always
settle: what a skill's `allowed-tools` covers, whether an agent inherits it, where
writes are refused. Test them before you build on them, with a probe:

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
[review](review-a-skill.md) what you changed, the way the checker would. A change
to a procedure is a change to what the steward does in every project, so try it on a
copy of a real project before you merge.

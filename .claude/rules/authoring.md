---
paths:
  - "plugins/**/SKILL.md"
  - "plugins/**/agents/*.md"
  - "plugins/**/references/**/*.md"
  - "plugins/**/README.md"
  - ".claude/rules/*.md"
---

# Authoring a skill, role template, or plugin README

The canonical guides are `plugins/marketplace-steward/references/author-skills/style.md`
for the writing and `plugins/marketplace-steward/references/place-knowledge.md` for the
cut. Read them before a substantial edit. These are the constraints you can check at the
moment of writing.

## The cut

- **One skill, one thing, one layer.** The layer is Universal, Craft, Language or
  Framework & Tools. It is also the plugin's name prefix (`universal-`, `craft-`,
  `language-`, `tools-`) and its `category`.
- **One home per rule.** When a rule already lives in another skill, name that skill
  instead of restating the rule. Two copies get edited separately and then disagree.
- **Dependencies point toward the general layers**, and the plugin of every skill you
  name is declared in `plugin.json`. `check-catalog.mjs` checks the declared names
  and their direction; nothing checks that a named skill is declared.
- **A skill holds knowledge only.** A lane, a failure mode, or "you are the agent
  that…" is role text, and belongs in a role template. A fact about one project belongs
  in that project's `AGENTS.md`.
- **Say when to yield.** Every skill ends by naming the more specific layer, or the
  local convention, that overrides it. A standard with no stated boundary gets applied
  mechanically.
- **Don't assume code.** Names, categories and descriptions must not take for granted
  that a skill is about code.

## Roles and lanes

- **Skill plugins ship no `agents/`.** Only `marketplace-` plugins do.
- Plan and Check are read-only, and Do is the only writer.
- **Read-only is a frontmatter fact, never a prose request.** A read-only agent
  carries `disallowedTools: Write, Edit, NotebookEdit`.
- `effort` is set per role and task. The defaults are Plan `high`, Do `medium` and
  Check `medium`.

## Vendor neutrality

- **Never put a model reference in agent frontmatter.** No `model: sonnet`, and no
  other vendor's model name. It hard-codes one runtime into a file that has to stay
  portable.
- Generated agents are Claude-only for now (`.claude/agents/`). They stay portable
  anyway: plain markdown, no model.
- In context files, `AGENTS.md` holds the content and `CLAUDE.md` is a one-line
  `@AGENTS.md` import. Claude Code lazy-loads a nested `CLAUDE.md` but never a nested
  `AGENTS.md`, so a component directory needs both files.

## Mechanics

- Hard-wrap prose at **88 columns**. Frontmatter `description:` lines and markdown
  table rows are exempt, since they cannot wrap.
- A `description` is a trigger list in the user's words, in three parts:
  1. what it is;
  2. "Use whenever <phrasings people type>";
  3. "Also use <the non-obvious second trigger>".

  That last clause is what makes a skill fire when it should.
- A role template must not restate a skill. It names the job, leaves the skill slot,
  and covers only its lane, its failure modes, what to do when there is nothing to
  report, and the report skeleton. A report for one kind of work lives in that kind's
  Craft skill.
- `description` lives in the marketplace entry, not in `plugin.json`.
- Plugin README headings must be exactly `# <plugin-name>`, which
  `scripts/check-catalog.mjs` enforces.
- Attach a cost to every rule. A rule without a reason can only be applied to the
  cases its author anticipated.

## After any change here

Re-read `CLAUDE.md` and this file, and reconcile them with what changed. A stale rule
keeps prescribing the old standard and loads into every session that touches these
paths, so it works against the change rather than merely being out of date.

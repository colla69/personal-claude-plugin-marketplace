---
paths:
  - "plugins/**/SKILL.md"
  - "plugins/**/agents/*.md"
  - "plugins/**/references/*.md"
  - "plugins/**/README.md"
  - ".claude/agents/*.md"
  - ".claude/rules/*.md"
  - ".claude/skills/**/*.md"
---

# Authoring a skill, agent, or plugin README

The canonical guide is
`.claude/skills/new-plugin/references/authoring-style.md`. Read it before a
substantial edit. These are the mechanical constraints, repeated here because they are
checkable at the moment of writing:

- Hard-wrap prose at **88 columns**. Frontmatter `description:` lines and markdown table
  rows are exempt — they cannot wrap.
- Skill frontmatter: `name`, `description`. Agent frontmatter: those plus `model`
  (`sonnet`), `effort` (`medium`, or `high` where thoroughness is the value), and
  `disallowedTools: Write, Edit, NotebookEdit` for read-only agents. Prose is a request;
  frontmatter is a constraint.
- A `description` is a trigger list in the user's words, structured as: what it is →
  "Use whenever <phrasings people type>" → "Also use <the non-obvious second trigger>".
  That last clause is what makes a skill fire when it should.
- An agent must not restate its skill. It names the job, points at the skill, then
  covers only its own failure mode, its lane, and what to do when there is nothing to
  report.
- Plugin README headings must be exactly `# <plugin-name>` — `scripts/check-catalog.mjs`
  enforces it.
- Attach a cost to every rule. A rule without a reason can only be applied to the cases
  its author anticipated.

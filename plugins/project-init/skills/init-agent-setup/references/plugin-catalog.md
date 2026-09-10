# Toolkit plugin catalog

The plugins in the `personal-claude-plugin-marketplace` marketplace, and the
signals that justify recommending each one.

Recommend on evidence from the repo, not on general desirability. Every enabled plugin
adds its skill and agent descriptions to every session, so a plugin that never fires is
pure cost. When in doubt, leave it out and mention it as optional.

| Plugin | Provides | Recommend when the repo shows |
|---|---|---|
| `clean-code` | `clean-code` skill, `clean-code-reviewer` agent | Almost always. Strongest signal: inconsistent style across modules, long functions, or an existing style guide the skill should be aligned to. |
| `code-review` | `review-changes` skill, `code-reviewer` agent | A PR-based workflow: a `.github/PULL_REQUEST_TEMPLATE.md`, CODEOWNERS, protected-branch CI, or more than one contributor in `git log`. |
| `unit-testing` | `write-unit-tests` skill, `unit-tester` agent | A test runner is configured (`vitest`, `jest`, `pytest`, `go test`, …). Recommend *more strongly* when a runner exists but coverage is thin — that's the gap the plugin closes. |
| `refactoring` | `refactor-safely` skill, `refactoring-specialist` agent | Signs of accumulated debt: files over ~500 lines, duplicated modules, `TODO`/`FIXME` density, or the user says they're cleaning something up. Requires a working test suite to be useful — say so if there isn't one. |
| `vue-dev` | `vue-conventions` skill, `vue-developer` agent | `vue` in dependencies. Check the major version and note it: the plugin targets Vue 3 Composition API, so flag a mismatch if the project is on Options API or Vue 2. |
| `project-init` | this skill | Already installed if you're reading this. Leave it enabled for future repos, or note that it can be user-scoped instead of project-scoped. |

## Scope guidance

Two scopes matter here:

- **User scope** (`~/.claude/settings.json`) — plugins you want in every project.
  `project-init` and `clean-code` usually belong here.
- **Project scope** (`.claude/settings.json`, committed) — plugins specific to this
  repo's stack. `vue-dev` belongs here; it's noise in a Go service.

When you write `.claude/settings.json`, only list project-appropriate plugins. Mention
which ones the user might prefer to install at user scope instead, with
`claude plugin install <name>@personal-claude-plugin-marketplace --scope user`.

## Wiring format

```json
{
  "extraKnownMarketplaces": {
    "personal-claude-plugin-marketplace": {
      "source": { "source": "github", "repo": "colla69/personal-claude-plugin-marketplace" }
    }
  },
  "enabledPlugins": {
    "vue-dev@personal-claude-plugin-marketplace": true,
    "unit-testing@personal-claude-plugin-marketplace": true
  }
}
```

Merge into an existing `.claude/settings.json` rather than replacing it — that file often
already holds permissions and hooks.

Enabling a plugin here does not install it. Tell the user to run
`/plugin install <name>@personal-claude-plugin-marketplace` for any plugin not
already on the machine, and `/reload-plugins` if the install summary asks for it.

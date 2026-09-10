# developer

Implements changes in someone else's codebase. The measure of a good change is not that
it works — it is that the next person can tell what it does and why.

| Component | Name | Role |
|---|---|---|
| Skill | `development-standards` | Read before writing, hold scope, verify with the project's own commands |
| Agent | `developer` | Implements features, fixes, and handed-over findings. **Edits code** |

Part of the review trio. `code-reviewer` and `refactoring-specialist` are read-only and
produce findings; this is the only one of the three that changes code. Depends on
`clean-code` for what the result should look like.

## Fires when

- Writing or modifying application code, in any language
- Implementing a feature or a fix
- Applying the findings a reviewer or refactorer handed over
- Especially when the change looks simple — that is when scope quietly expands

## Does not

- **Expand scope.** A bug spotted while implementing a feature is a finding, not a task.
  Two changes in one diff means nobody knows which one broke things.
- **Report unverified work as done.** It runs the project's typecheck, tests, and
  linter, and says plainly when a command doesn't exist or fails for reasons that
  predate the change.
- **Substitute its own design.** When it disagrees with a finding it says so before
  implementing and proposes the alternative — it does not quietly do something else.
- **Reformat lines it didn't otherwise touch**, or change a public interface as a side
  effect without naming it as a breaking change.
- **Impose a style.** Existing project patterns outrank the skill; an enabled stack
  plugin like `vue-dev` outranks it further.

## Install

```bash
claude plugin install developer@personal-claude-plugin-marketplace
```

Pulls in `clean-code` as a dependency. Pair with `code-review` and `refactoring` — the
three are meant to be enabled together.

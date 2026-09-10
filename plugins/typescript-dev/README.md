# typescript-dev

TypeScript language conventions. The type system's only job is to fail the build for
things that would otherwise fail in production; every `any` and every `as` is a place
where it stopped doing that job, silently, for everything downstream.

| Component | Name | Role |
|---|---|---|
| Skill | `typescript-conventions` | Strictness, narrowing, unions, generics, async, modules |
| Agent | — | None by design. See below |

**No agent, deliberately.** `developer` is the trio's writer, and a second agent that
also writes TypeScript would compete with it for the same prompts. This plugin
contributes knowledge; `developer` applies it, along with `clean-code` and any framework
plugin that is enabled.

## Fires when

- Writing or reviewing TypeScript, or working in a `.ts` / `.tsx` file
- Types, `any`, generics, narrowing, or `tsconfig` come up
- Typing an external boundary — where unsound types enter and then spread

## Does not

- **Assume strictness.** It reads `tsconfig` first: `strict`,
  `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes` each change what correct
  code looks like.
- Turn `strict` on as a side effect of unrelated work. It names the gap and writes
  within the project's setting.
- Cover frameworks. `vue-dev` and its equivalents are more specific and outrank this
  where both apply.
- Restate `clean-code`. Naming, function shape, and structure live there.

## Install

```bash
claude plugin install typescript-dev@personal-claude-plugin-marketplace --scope project
```

Project scope. Pulls in `clean-code`.

# language-typescript

The type system's only job is to fail the build for things that would otherwise fail in
production. Every `any` and every `as` is a place where it stopped doing that job,
silently, for everything downstream.

| | |
|---|---|
| Skill | `typescript-conventions` |
| Layer | Language |
| Builds on | `universal-clean-code` |

Strictness comes from `tsconfig`, read first: `strict`, `noUncheckedIndexedAccess` and
`exactOptionalPropertyTypes` each change what correct code looks like.

## Fires when

- Writing or reviewing TypeScript, or working in a `.ts` or `.tsx` file
- Types, `any`, generics, narrowing or `tsconfig` come up
- Typing an external boundary, where unsound types enter and then spread

## Leaves to others

- **Frameworks.** Typing Vue props and emits is `vue-typescript-conventions`, in
  `tools-vue-typescript`. A framework's skill outranks this where both apply.
- Naming, function shape and structure, to `clean-code`.
- Turning `strict` on, which is named as a gap, never done as a side effect.
- The project's existing patterns, which win where they are settled.

## Install

```bash
claude plugin install language-typescript@personal-claude-plugin-marketplace --scope project
```

Project scope. Init installs it when a project has a `tsconfig.json` or `.ts` and `.tsx`
sources.

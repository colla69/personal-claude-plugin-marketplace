---
name: typescript-conventions
description: TypeScript language conventions — reading tsconfig before assuming strictness, narrowing rather than asserting, discriminated unions over optional-field soup, generics only where the type varies, and async discipline. Use whenever writing or reviewing TypeScript, working in a `.ts` or `.tsx` file, or when the user mentions types, `any`, generics, narrowing, or `tsconfig`. Also use when typing an external boundary, since that is where unsound types enter and spread.
---

# TypeScript conventions

The type system's only job is to fail the build for things that would otherwise fail in
production. Every `any`, every `as`, and every disabled check is a place where it
stopped doing that job — silently, and for everything downstream.

## Read tsconfig first

`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, and
`verbatimModuleSyntax` each change what correct code looks like. Code written for a
strict project breaks in a loose one and, more dangerously, code written for a loose
project compiles in a strict one while meaning something different.

If `strict` is off, say so — it is worth naming — but write within the project's setting
rather than turning it on as a side effect of an unrelated change.

## Never `any`; rarely `as`

- `unknown` is the honest type for something you have not checked. Narrow it with a type
  guard, and the compiler follows you.
- `as` is a claim that you are right and the compiler is wrong. Sometimes true. Each one
  should be rare enough to justify in a comment; a file with several has given up.
- `as unknown as X` is not a cleverer cast — it is the same claim with the safety rail
  removed. Fix the type instead.
- Type external input at the boundary and validate it there. A parsed JSON body typed as
  your domain type is a lie the rest of the codebase then trusts.

## Model with unions, not optional fields

Optional fields multiply states that cannot actually occur:

```ts
// invalid states are representable: loading with data, error with data
type State = { loading: boolean; data?: User; error?: Error }

// only the three real states exist, and the compiler enforces the check
type State =
  | { status: 'loading' }
  | { status: 'ready'; data: User }
  | { status: 'failed'; error: Error }
```

A discriminated union turns "remember to check" into "cannot compile without checking".
Reach for one whenever two fields are only ever populated together, or never together.

Prefer a union of string literals to an `enum`. Enums emit runtime code, behave oddly
across module boundaries, and buy nothing a literal union does not give you. A `const`
object with `as const` covers the cases where you want the values enumerable.

## Types

- `type` by default; `interface` when you need declaration merging or you are extending
  a class contract. Consistency within a file beats the general rule.
- `readonly` on anything the callee should not mutate — arrays and properties both. It
  is free at runtime and catches a real class of bug.
- `satisfies` to check a config object against a type without widening it, so you keep
  the literal types and still get the error when a key is wrong.
- Derive rather than restate: `Pick`, `Omit`, `ReturnType`, and indexed access keep
  types in step with the thing they describe. A hand-copied duplicate drifts.

## Generics only where the type varies

A generic parameter used once is a more complicated way to write the concrete type. Add
one when the caller's type genuinely flows through to the result, and constrain it (`<T
extends { id: string }>`) so the error appears at the call site rather than inside your
function body.

## Async

- Never leave a promise floating. `await` it, return it, or explicitly `void` it with a
  comment saying why nothing waits.
- Independent work runs with `Promise.all`. A sequence of `await`s that do not depend on
  each other is latency you chose.
- Type what a rejection is. `catch (e)` gives you `unknown`; narrow it before reading
  `.message`.

## Modules

- Import types with `import type` where the project uses it — it keeps type-only imports
  out of the emitted graph.
- Barrel files (`index.ts` re-exporting a directory) are how import cycles start and how
  build times grow. Import from the defining module unless the project has already
  committed to barrels.

## Where this yields

- **To the project.** Existing patterns win for anything already settled here.
- **To `clean-code`** for naming, function shape, and structure.
- **To a framework plugin** when one is enabled — `vue-dev` and the like are more
  specific than this and outrank it for anything their conventions cover.

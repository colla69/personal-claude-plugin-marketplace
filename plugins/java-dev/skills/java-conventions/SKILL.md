---
name: java-conventions
description: Java language conventions — checking the language level before using a feature, nullability, immutability and records, collections, streams versus loops, exception discipline, and resource handling. Use whenever writing or reviewing Java, working in a `.java` file, a Maven or Gradle build, or when the user mentions Java, the JVM, Optional, streams, or records. Also use before recommending a language feature, since the target version decides whether it exists.
---

# Java conventions

Java spans two decades of dialects that all compile under the same name. The first
question is never "what is the idiomatic way" — it is "idiomatic for which version".

## Check the language level first

**Read the build file before writing a line.** `maven.compiler.source`/`target` or
`<java.version>` in `pom.xml`, `sourceCompatibility` in Gradle. A repo can declare a
version at the root that its modules do not inherit, so check the module you are
actually editing.

| Available from | Feature |
|---|---|
| 8 | Lambdas, streams, `Optional`, default methods |
| 11 | `var`, `List.of`, `String.isBlank`, HTTP client |
| 17 | Records, sealed types, pattern matching for `instanceof`, text blocks |
| 21 | Pattern matching for `switch`, virtual threads, sequenced collections |

Writing a record into an 8 project fails to compile — that is the good case. The bad
case is assuming a modern default that silently differs. When the project is on an older
level, say so and work within it rather than proposing an upgrade mid-task.

## Nullability

- `Optional` is a **return type**. Not a field, not a parameter, not a collection
  element. An `Optional` field costs an allocation and serialises badly; an `Optional`
  parameter means the caller now has two ways to say "nothing".
- Never return `null` for a collection. Return `List.of()` — an empty collection is a
  valid answer, `null` is an unhandled branch at every call site.
- Where the project uses nullability annotations, use them consistently. Half-annotated
  code is worse than none, because absence stops meaning anything.

## Immutability

Prefer immutable by default; make mutability a deliberate choice.

- **Records** (17+) for data carriers. They give you `equals`, `hashCode`, `toString`,
  and a guarantee nobody adds a setter later.
- Below 17, `final` fields set in the constructor. A builder when the constructor
  exceeds a handful of parameters — that is the missing type the `clean-code` standard
  describes.
- Defensively copy collections in and out, or wrap with `List.copyOf`. A constructor
  that stores the caller's list hands them a live handle to your internal state.

## Collections and streams

- Declare interfaces in signatures (`List`, `Map`), not implementations.
- A stream is right when it makes the transformation clearer than the loop. A loop is
  right when it does not. Neither is a house style; `forEach` with a side effect inside
  is a loop wearing a costume, and the loop reads better.
- Never mutate an external collection from inside a stream. Collect into a new one.
- Chains past three or four operations usually want an intermediate named variable more
  than they want to stay a chain.

## Exceptions

- **Never swallow.** An empty `catch` is a bug with a delay fuse. If a failure genuinely
  is ignorable, log it at the level that says so and comment why.
- Do not catch `Exception` or `Throwable` to make a signature simpler. Catch what you
  can actually handle; let the rest travel.
- Wrap with context when crossing a layer: `new StorageException("saving user " + id,
  e)`. The original cause goes in the constructor, always — a swallowed stack trace
  turns a five-minute diagnosis into an afternoon.
- Choose checked or unchecked per layer and hold it. Interleaving both in one API forces
  callers to handle failure two ways.

## Resources and concurrency

- `try`-with-resources for anything `Closeable`. No exceptions to this.
- Shelling out is a resource too: a `Process` you never `waitFor` leaves you unaware
  whether the work happened, and its unread output can fill a pipe buffer and block.
- Prefer an `ExecutorService` to raw `Thread`. Prefer immutable shared state to
  synchronising mutable state.

## Dependency injection

Constructor injection with `final` fields. Field injection hides the dependency graph,
makes the class untestable without a container, and lets a class quietly accumulate
collaborators nobody counted.

## Where this yields

- **To the project.** Existing patterns win for anything already settled here; say the
  mismatch out loud rather than introducing a second style.
- **To `clean-code`** for naming, function shape, and structure. This skill covers what
  is specific to the language.
- **To a framework plugin** when one is enabled. Framework conventions are more specific
  than these and outrank them — Spring's stereotypes, JPA's entity rules, and the like.

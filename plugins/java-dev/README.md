# java-dev

Java language conventions. Java spans two decades of dialects that all compile under the
same name, so the first question is never "what is idiomatic" but "idiomatic for which
version".

| Component | Name | Role |
|---|---|---|
| Skill | `java-conventions` | Language level, nullability, immutability, collections, exceptions, resources |
| Agent | — | None by design. See below |

**No agent, deliberately.** `developer` is the trio's writer, and a second agent that
also writes Java would compete with it for the same prompts. This plugin contributes
knowledge; `developer` applies it, along with `clean-code` and any framework plugin that
is enabled.

## Fires when

- Writing or reviewing Java, or working in a `.java` file, `pom.xml`, or Gradle build
- `Optional`, streams, records, exceptions come up
- Before recommending a language feature — the target version decides whether it exists

## Does not

- **Assume a language level.** It reads the build file first, and checks the *module*
  being edited, since a root `pom.xml` can declare a version its modules don't inherit.
- Propose an upgrade mid-task. On an older level it works within it and says so.
- Cover frameworks. Spring stereotypes, JPA entity rules, and the like belong to a
  framework plugin, which outranks this one where both apply.
- Restate `clean-code`. Naming, function shape, and structure live there; this covers
  what is specific to the language.

## Install

```bash
claude plugin install java-dev@personal-claude-plugin-marketplace --scope project
```

Project scope — it's noise in a repo with no JVM. Pulls in `clean-code`.

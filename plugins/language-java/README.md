# language-java

Java spans two decades of dialects that all compile under the same name, so the first
question is never "what is idiomatic" but "idiomatic for which version".

| | |
|---|---|
| Skill | `java-conventions` |
| Layer | Language |
| Builds on | `universal-clean-code` |

The language level comes from the build file of the module being edited, since a root
`pom.xml` can declare a version its modules don't inherit.

## Fires when

- Writing or reviewing Java, or working in a `.java` file or the Maven or Gradle build
  of a Java project
- `Optional`, streams, records or the JVM come up
- Before recommending a language feature, since the target version decides whether it
  exists

## Leaves to others

- **Frameworks.** Spring's stereotypes, JPA's entity rules and the like belong to a
  Framework & Tools skill, which outranks this where both apply.
- Naming, function shape and structure, to `clean-code`.
- Upgrading the language level, which is its own decision and never a side effect of
  the task at hand.
- The project's existing patterns, which win where they are settled.

## Install

```bash
claude plugin install language-java@personal-claude-plugin-marketplace --scope project
```

Project scope: it's noise in a repo with no JVM. Set-up installs it when a project has a
`pom.xml`, a `build.gradle` or `.java` sources.

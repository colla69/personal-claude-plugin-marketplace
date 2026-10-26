# Layers

Why every skill sits in one of four layers, with a fifth for one team's quirks, how to
tell them apart, and why a skill may build only on its own layer or the ones above it.
Read this before you add a skill, or when you can't decide where a piece of knowledge
belongs. The rules themselves are in
[`place-knowledge.md`](../../plugins/marketplace-curator/references/place-knowledge.md).

## Four layers, from general to specific

| Layer | Prefix | The question it answers | Examples |
|---|---|---|---|
| **Universal** | `universal-` | Does this hold for everything we do? | Company guidelines, clean code, enterprise security guidelines |
| **Craft** | `craft-` | How is this kind of work done? | Reviewing, refactoring, integration tests, formatting the monthly report |
| **Language** | `language-` | What is the work written in? | Java, TypeScript, German, an enterprise template |
| **Framework & Tools** | `tools-` | Which concrete product is it done with? | Vue, Spring Boot, JUnit, Excel, PDF |
| **Team** | `team-` | Is this one team's way, true for its projects and nobody else's? | A team's ticket format, its release checklist |

The layer is part of each plugin's name and its `category`, so you can read a plugin's
place from its name alone. A plugin that works on the marketplace itself, such as the
steward, is named `marketplace-<name>` and sits in no layer.

**Team is the last resort.** "A team may have many projects and want to propagate their
quirk; that would be a plugin with their team name. But it should be in the marketplace
only as a last resort." A quirk lives in the project's `CLAUDE.md` first. Only when a
team's projects keep copies of it that drift apart does it become a `team-<name>`
plugin, which costs a description in every session of every project that enables it.

## Telling them apart

The boundaries, one example each:

- **Universal or Craft?** Clean code holds for every line of code, so it is Universal.
  Integration testing is one kind of work, so it is Craft.
- **Craft or Language?** Formatting the monthly report is how the work is done. German
  and the enterprise template are what it is written in.
- **Language or Framework & Tools?** Java is a language. Spring Boot and JUnit are
  products that use it.
- **Natural languages are Language.** German is a Language skill just as Java is. A
  skill every role shares is often one of them: "they all should speak English".

## Why cut this way

**Because a project installs bricks, and each brick should be one it wants whole.** The
test for a cut is reuse: would a project ever want one part without the other? "Java
testing with JUnit" is three skills, because a Java project on another test framework
would otherwise have to take JUnit along. Two parts that are always installed together
and never change apart are one skill.

**Because every rule should have one home.** When two skills state the same rule, it
gets edited in one and not the other, and the agents that load them disagree with
confidence. A layer gives every rule an obvious place: the most general layer it holds
for.

**Because the specific should win.** A Framework & Tools skill knows more about its
product than a Universal skill knows about anything. So the more specific layer wins
where two apply, and the project's own convention wins over all of them. Every skill
ends by saying when it yields, so it is never applied mechanically.

## Why dependencies point one way

A skill that names another skill depends on it: its plugin is declared in
`plugin.json`, and installing it pulls the other in. A dependency stays in its own
layer or points to a more general one, never to a more specific one.

- **Upward is safe.** A Vue skill may build on clean code, because every Vue project
  wants clean code.
- **Downward is a trap.** If clean code depended on Vue, every Go service that wanted
  clean code would get Vue.
- **Only unconditional needs are dependencies.** A framework doesn't always need one
  particular language: a Node framework runs on plain JavaScript too. Such a pairing is
  decided per project, from what the project shows, not declared in the manifest.

An undeclared dependency fails without a sound. A skill told to follow a skill that
isn't installed carries on with the model's generic taste, and its output looks like a
correct run. `check-catalog.mjs` checks every declared dependency's name and direction;
a skill named in prose and never declared is caught only by a reader, as
[checks](../reference/checks.md) lists.

## One skill, one thing

If saying what a skill covers needs an "and", it is probably two skills. And a skill
holds knowledge only: what a worker does and must not do belongs to an agent, and a
fact about one project belongs in that project's `CLAUDE.md`.
[Skills and agents](skills-and-agents.md) explains that split, and
[placing knowledge](placing-knowledge.md) how a lesson from a project is cut.

---
name: clean-code
description: The house standard for readable, maintainable code — naming, function shape, error handling, comments, and dependency direction. Use whenever writing new code, reviewing existing code, judging whether something is "clean enough", or when the user mentions readability, code quality, maintainability, naming, or asks for code to be tidied up. Also use as the shared reference when another agent needs to justify a quality judgement.
---

# Clean code standard

This is the standard the rest of the toolkit judges code against. Edit this file when your
taste changes — everything downstream picks it up.

Cleanliness is not an end in itself. The test for every rule below is: *does this make the
code cheaper to change next month?* When a rule and that test disagree, the test wins.

## Naming

Names carry most of the readability load, and they're the cheapest thing to get right.

- Name by intent, not implementation. `retryableRequests` over `filteredList`.
- Length should scale with scope. `i` inside a three-line loop is fine; `i` as a module-level
  variable is not.
- Booleans read as predicates: `isExpired`, `hasAccess`, `shouldRetry`.
- Avoid the vocabulary that means nothing: `data`, `info`, `manager`, `helper`, `util`,
  `process`, `handle`. If a name needs one of these, the thing usually needs splitting.
- Keep one word per concept across the codebase. `fetch`, `get`, `retrieve`, and `load`
  should not all mean the same operation.

## Function shape

- One level of abstraction per function. Mixing "charge the card" with "concatenate the
  URL string" in one body is what makes functions hard to skim.
- Extract when a comment is needed to explain the *next block* — the comment is telling you
  where the seam is. Do not extract just to hit a line count.
- Prefer returning values to mutating arguments. Prefer pure functions where the domain
  allows it, but don't contort I/O-bound code to fake purity.
- Guard clauses over nested conditionals. Handle the exceptional cases first and return
  early; the happy path should be the least-indented code in the function.
- More than about three parameters usually means a missing type. Bundle them.

## Error handling

- Fail loudly at the boundary, degrade gracefully in the interior — not the other way
  round.
- Never swallow an error to make a signature simpler. An empty `catch` is a bug with a
  delay fuse.
- Error messages are for whoever is on call at 3am. Include what was attempted, what was
  received, and the identifier needed to find the record.
- Be consistent about the mechanism. Exceptions or result types, one per layer, not both
  interleaved.

## Comments

Write comments that explain **why**, never **what**.

```
// BAD: increment the retry counter
retries += 1

// GOOD: the upstream rate-limiter resets on a 60s window, so backing off
// faster than this just burns quota without ever succeeding
sleep(BACKOFF_SECONDS)
```

Delete commented-out code. Version control already remembers it. A `TODO` without a name
and a reason is a wish, not a task.

## Structure and dependencies

- Dependencies point inward: infrastructure depends on domain, never the reverse. If the
  domain layer imports the database client, the layering is decorative.
- Duplication is cheaper than the wrong abstraction. Wait for the third occurrence, and
  make sure the three cases are the *same* thing, not three things that currently look
  alike.
- Keep files cohesive rather than short. A 400-line file where everything belongs together
  beats four 100-line files with circular imports.

## Applying the standard

When judging existing code, sort findings by cost of leaving them:

1. **Correctness risk** — the unclear thing is also probably wrong
2. **Change cost** — this will make the next feature harder
3. **Reading cost** — it works and it's stable, it's just unpleasant

Only the first two justify changing working code unprompted. The third is worth mentioning
and worth fixing while you're already in the file, but rewriting stable code purely for
tidiness trades real risk for aesthetic gain.

Match the surrounding code when it conflicts with this standard and you're making a small
change. Consistency within a file beats correctness against an external guide — raise the
mismatch separately rather than leaving one function stylistically stranded.

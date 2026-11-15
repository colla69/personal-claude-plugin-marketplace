---
name: clean-code
description: The house standard for clean code, holding only the rules measured to change what the model writes — callers above helpers, no flag arguments, commands apart from queries, no comment noise, no reaching through chains, one reason to change per unit, side tasks kept out of business rules, wrapped third-party libraries, and tests without the real clock. Use whenever writing new code, writing or changing a function, writing tests, fixing a bug in a file, or calling a third-party library, or when the user mentions readability, maintainability or "clean code".
---

# Clean code standard

Cleanliness is not an end in itself. The test for every rule below is: *does this make the
code cheaper to change next month?* When a rule and that test disagree, the test wins.

This standard holds only the rules a measurement showed the model breaks without them.
A rule the model already follows costs every session and changes nothing.

## Functions

- Put a function above the helpers it calls, so the file reads top down, from the
  exported functions to the details.
- No boolean parameter that switches what a function does. Write two functions that
  share helpers, such as `report(orders)` and `emailReport(orders)`.
- A function either changes something or answers a question, never both. An `apply`
  that returns `{ ok }` is two functions: one that checks and one that applies, or an
  apply that throws when it can't.

## Comments

When you change a file, leave its comments cleaner than you found them:

- Remove commented-out code, change-log and author headers, section banners and
  closing-brace comments such as `// end if`. Version control holds all of them.
- Remove a comment that only says what the next line does, and write none. A comment
  says why: a reason, a constraint, a warning.
- Remove a function nothing calls or exports.

## Objects and boundaries

- Don't reach through a chain, such as `order.customer.address.country`. Ask the
  nearest object, through a method such as `order.country()`, or take the value as a
  parameter.
- Give each unit one reason to change: building an email's text, sending it and
  placing an order live in different units.
- Keep logging, retries and error handling for a side task out of the business rule.
  Wrap them around it, in the wiring or a decorator.
- Call a third-party library from one small module of yours, behind functions in your
  own terms, such as `charge(order)`. Turn its errors into your own types there, such as
  `PaymentDeclinedError`, so no caller imports the library or catches its errors.

## Tests

- No test depends on the real clock. Pass the clock in, such as
  `discountPercent(total, now)`, and change the code to allow it.

## Where this yields

- **To the code around it**, for a small change, in style. Consistency within a file
  beats correctness against this standard. The comment rules above are the exception.
- **To the more specific layers** for what is specific to them: a language's idioms and
  a framework's conventions.

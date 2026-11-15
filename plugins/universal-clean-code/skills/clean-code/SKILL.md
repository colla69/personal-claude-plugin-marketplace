---
name: clean-code
description: The house standard for clean code, holding only the rules measured to change what the model writes — callers above helpers, no flag arguments, commands apart from queries, no comment noise, no reaching through chains, one reason to change per unit, side tasks kept out of business rules, wrapped third-party libraries, two designs sketched before a new module, composition over inheritance, no shallow wrappers or accessors, no pass-through variables, a clear stop on a corrupt input, precise names, the reason for a choice in a comment, and tests without the real clock. Use whenever writing new code, designing a module, writing or changing a function, writing tests, fixing a bug in a file, or calling a third-party library, or when the user mentions readability, maintainability or "clean code".
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

## Design

- Before you write a new module, sketch two or more different designs for its
  interface in your reply, and say why the one you chose wins.
- Share code by composition: give each class the shared part as an object or a
  function. Never extend a class to reuse its code.
- No class or function that only wraps one call and adds nothing, and no getter or
  setter that only reads or writes a field.
- Don't thread a value through a layer that only passes it on, such as a trace id
  through a service on its way to the repository. Reach it through a context, such as
  `AsyncLocalStorage`.

## Errors

- If an input is broken past repair, such as a config file that isn't valid JSON, stop
  with an error that names the file and the problem.

## Names

- Name a value for exactly what it holds, such as `cancelledCountByCustomerId`, never
  `count`, `counts`, `data` or `result`.

## Comments

When you change a file, leave its comments cleaner than you found them:

- Remove commented-out code, change-log and author headers, section banners and
  closing-brace comments such as `// end if`. Version control holds all of them.
- Remove a comment that only says what the next line does, and write none. A comment
  says why: a reason, a constraint, a warning.
- When the task gives a reason for a choice, such as a bug a change fixes, put it in a
  comment next to the code, not only in your reply.
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

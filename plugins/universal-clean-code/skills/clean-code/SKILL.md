---
name: clean-code
description: The house standard for clean code, holding only the rules measured to change what the model writes — today, that more than three parameters means a missing type. Use whenever writing new code, writing or changing a function, method or constructor that takes several inputs, or when the user mentions readability, maintainability, "too many parameters" or a long argument list. Also use when adding a parameter to a function that already takes three.
---

# Clean code standard

Cleanliness is not an end in itself. The test for every rule below is: *does this make the
code cheaper to change next month?* When a rule and that test disagree, the test wins.

This standard holds only the rules a measurement showed the model breaks without them.
A rule the model already follows costs every session and changes nothing.

## Function shape

- More than three parameters means a missing type. Bundle them into one object or a
  named type, such as `createInvoice({ customerId, items, currency, taxRate, dueDate })`.
  Five positional arguments are five chances to swap two of the same type, and every
  new input changes every caller.

## Where this yields

- **To the code around it**, for a small change. Consistency within a file beats
  correctness against this standard. Raise the mismatch once, separately, rather than
  leaving one function stylistically stranded.
- **To the more specific layers** for what is specific to them: a language's idioms and
  a framework's conventions.

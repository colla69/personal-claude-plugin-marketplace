---
name: simple-english
description: Write English that a tired reader or a non-native reader cannot misread, following the rules of Simplified Technical English (ASD-STE100) — short sentences, one instruction each, one word per meaning, active voice, and no filler. Use whenever writing or editing text a person will read in English — documentation, a README, a guide, a runbook, a plan, a report, release notes, a commit or PR description, a code comment — or when the user says "make this text readable", "simplify the wording", "plain English", "de-slop", "STE" or "for non-native readers". Also use when writing instructions for an agent or a prompt, since a model that cannot ask back is the reader this standard was made for.
---

# Simple English

Text is good when nobody can read it two ways. Every rule below removes one way to
misread. A long sentence hides which clause a condition belongs to. A synonym makes the
reader ask whether two things differ. Filler takes attention that the facts needed.

These rules adapt Simplified Technical English, ASD-STE100, for everyday technical
writing. They leave out the standard's controlled dictionary: the words of your field
are allowed, as long as each one keeps one meaning.

## What it covers

Any English prose a person reads: documentation, plans, reports, comments, commit
messages, release notes, and instructions for agents.

Never change code, identifiers, commands, file paths, quoted output or error text, or a
product's name. They are exact, and a "clearer" version is a different one. Each counts
as one word in a sentence's length.

## First, procedure or description

Decide what each passage does before writing it, because the rules differ.

| | Procedure | Description |
|---|---|---|
| Tells the reader | what to do | what a thing is, or what happened |
| Verb form | Imperative: "Run the migration." | Simple present, past or future |
| Longest sentence | 20 words | 25 words |
| Unit | One instruction per sentence | One topic per paragraph, at most six sentences |

Two actions in one sentence of a procedure is the step a reader skips. Split them,
unless the two happen at the same time.

## Words

- **One word, one meaning.** Call a thing by the same name every time. When "config"
  becomes "settings" two paragraphs later, the reader looks for a second thing.
- **Say the action with a verb.** "Compress the file", not "perform compression of the
  file". A noun in the verb's place hides who does what.
- **Write the full form.** No contractions, and no Latin abbreviations: "for example"
  and "that is", and name the items instead of "etc.". A non-native reader and a
  translation tool both stumble on the short forms, and "etc." hides the items the
  reader needed.
- **Use `must`, `can` and `will`.** "Should" leaves the reader to decide whether it is
  a rule. Write `must` for a requirement. Mark a recommendation as one, and give its
  reason.
- **Cut the words that carry no fact.** "Simply", "easily", "seamlessly", "robust",
  "leverage", "utilize", "in order to", "it is important to note that". Write "use" and
  "to", and keep the fact if there was one.
- **Keep noun chains to three words.** "The connection pool timeout configuration value"
  becomes "the timeout value for the connection pool". In a long chain the reader must
  guess which noun each word describes.

## Sentences

- **Conditions first.** "If the build fails, delete the cache." A reader who acts on
  the command first reads the condition too late.
- **Active voice.** Name who does it: "The service retries the request", not "The
  request is retried". Use the passive only when nobody knows who acts.
- **Simple tenses.** Simple past, present or future. "Has been completed" becomes "is
  complete", or "completed at 14:02" in a report, where the time is the fact. A perfect
  tense hides when something happened, and a reader often needs to know.
- **Complete grammar.** Keep the articles and the "that". Short sentences are the goal,
  telegraph style is not: "Make sure that the file exists", not "Ensure file exists".
- **No semicolons.** Write two sentences. A semicolon joins two facts into one long
  sentence, and the reader must find where the second one starts.
- **A pronoun needs a clear noun.** Write "this setting", not a bare "this", whenever
  two things could be meant.
- **One new fact per sentence**, and a vertical list when a sentence would hold three.

## Warnings

Put the instruction first and the risk second, and say how bad the risk is.

```
CAUTION: Do not run the cleanup job with --all on the shared database. It deletes the
rows of every tenant.
```

A warning that opens with its explanation is read after the damage is done.

## Reports and records

A report says what happened in the simple past, with times and numbers, and writes
"unknown" for what nobody knows. "We have identified an issue that may have impacted
some users" says nothing a reader can act on. "Between 14:02 and 14:31, 12% of requests
failed" does.

## Check before you deliver

Search the draft, outside code and quotes, for each of these:

- a contraction, a semicolon, "e.g.", "i.e." or "etc."
- "has been", "have been", "is being", or another perfect or progressive tense
- "should", "may", "might" or "could" where a rule or a fact is meant
- a word from the filler list above
- a condition after its command, such as "Restart the service if the port is busy"
- a sentence over the limit for its kind: count the three longest

Then read for the judgment calls: one name per thing across the whole text, and every
passive with a reason.

## Where this yields

- **To the project's own style guide and terms.** Where a project has settled a word
  or a form, it wins. Raise a conflict once instead of rewriting the project's text.
- **To formats with their own rules**: a commit convention, a changelog format, a UI
  label, a legal text. Inside the format, apply these rules where the format leaves
  room.
- **To another language.** Text written in another language follows that language's
  skill, not this one.
- **Never claim compliance.** Full ASD-STE100 conformance needs its controlled
  dictionary and a person's approval. When asked for it, apply the rules strictly and
  say that the final check is the writer's.

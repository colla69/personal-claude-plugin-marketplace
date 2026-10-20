# tools-aws-static-hosting

A static site on AWS fails late or says nothing: a certificate in the wrong region, a
deep link that returns 404, a deploy that "changed nothing". The skill names the
mistakes that cost the most, and what to check once the deploy is out.

| | |
|---|---|
| Skill | `aws-static-hosting` |
| Layer | Framework & Tools |
| Builds on | nothing |

## Fires when

- Setting up, changing or debugging static hosting on S3, CloudFront, ACM or Route 53
- Deep links return 404, a deploy shows no change, or a PDF downloads instead of opening
- Before `aws s3 sync --delete`

## Leaves to others

- **How a resource is declared.** The skill for the infrastructure tool, such as the CDK
  or Terraform. This skill says what the hosting must do.
- **Asking before a change goes live.** That is a worker's lane, set by the project's
  Plan and Do roles, not knowledge.
- The project's existing infrastructure code and its choices, which win where they are
  settled.

## Install

Set-up installs it at project scope when the project's infrastructure code or deploy
scripts put a CloudFront distribution in front of an S3 bucket. By hand:

```bash
claude plugin install tools-aws-static-hosting@personal-claude-plugin-marketplace --scope project
```

Project scope only: it is noise in a project that does not host on AWS.

## More

- The standard itself:
  [`skills/aws-static-hosting/SKILL.md`](skills/aws-static-hosting/SKILL.md)
- Every plugin, with its layer and what it builds on:
  [`docs/reference/plugins.md`](../../docs/reference/plugins.md)
- Why the layers, and why dependencies point the way they do:
  [`docs/explanation/layers.md`](../../docs/explanation/layers.md)

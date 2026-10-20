---
name: aws-static-hosting
description: How to host a static site on AWS — a private S3 bucket behind CloudFront, a certificate, and Route 53 — without the mistakes that fail late or silently: certificate region, single-page-app deep links, cache tiers, bucket access, destructive syncs, and what to check after a deploy. Use whenever setting up, changing or debugging static hosting on S3, CloudFront, ACM or Route 53, or when the user says "deploy the site", "deep links return 404", "the deploy changed nothing" or "my PDF downloads instead of opening". Also use before running `aws s3 sync --delete`.
---

# AWS static hosting

The input is a directory of built files. The output is those files over HTTPS at the
owner's domain, cheaply and safely. Most mistakes here fail late or say nothing, so
this skill lists the ones that cost the most.

## Certificate

A certificate for CloudFront must live in `us-east-1`, whatever the account's default
region. A certificate in another region cannot attach to a distribution, and the error
does not say why. Check the region before you request one.

## Deep links

A single-page app with history-mode routing needs every unknown path to return
`index.html`. Do it with a viewer-request function that rewrites extensionless paths
only. A missing file such as `/img/missing.png` must still fail. Do not use a blanket
403/404 → `/index.html` error response: it turns every missing file into a page with
status 200 and hides broken links.

A multi-page site built by a generator needs the function to map a directory path such
as `/about/` to `/about/index.html` instead. The single-page rewrite would serve the
home page for every page.

## Cache

Use two tiers.

- Content-hashed assets are immutable. Cache them for a year.
- HTML files are not hashed. Never cache them long, or a deploy looks like it did
  nothing. Invalidate them on every deploy that changes them.

Set the content type of every file you upload. A PDF served as
`binary/octet-stream` downloads instead of opening in the browser.

## Access

Keep the bucket private. Give CloudFront access through Origin Access Control. Do not
use a public bucket, the legacy origin access identity, or an S3 website endpoint —
that endpoint speaks only HTTP to the origin and cannot use Origin Access Control.

## Upload

`aws s3 sync --delete` removes every remote file that is missing locally. Before you
run it, check that the build produced what the site needs: the entry file, the assets
folder, and every folder of static data. An empty data folder plus `--delete` removes
files that nothing else can rebuild.

## Cost

A personal site has modest traffic. Choose the cheapest CloudFront price class that
reaches the readers. Add no VPC, NAT gateway, load balancer, health check or web
application firewall unless asked. State the rough monthly cost of a design, and name
anything with a floor price.

## Secrets

Keep tokens out of the repository, code and pipeline files. Store them in Secrets
Manager or Parameter Store and reference them: a token in git history stays readable
after you delete the line.

## After the deploy

A command that exits 0 is not a finished deploy. Fetch the site over HTTPS and check:

- a deep link returns 200 with the page it names: the entry file for a single-page
  app, that page's `index.html` for a multi-page site;
- a PDF returns `application/pdf` and opens;
- the entry file carries the cache header you intended.

Report the real responses.

## Where this yields

- To the project's existing infrastructure code and its choices, where they are settled.
- To the skill for the infrastructure tool, such as the CDK or Terraform, for how a
  resource is written. This skill says what the hosting must do, not how to declare it.

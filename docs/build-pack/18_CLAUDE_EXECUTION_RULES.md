# Delsi Chews --- Claude Execution Rules

## Before coding

1.  Read all documents in this build pack.
2.  Inspect the existing repository.
3.  Inspect existing deployment configuration.
4.  Inspect current Delsi live source.
5.  Do not delete working implementation merely to rebuild it.
6.  Produce a short implementation inventory before major changes.

## While coding

Use small checkpoints.

After each meaningful feature: - typecheck - lint - test - build -
inspect - deploy preview when appropriate

## When source data is uncertain

Do not guess.

Use:

``` text
UNKNOWN
```

or:

``` text
NEEDS_RECONCILIATION
```

## When source data conflicts

Preserve both:

``` text
source_value
normalized_value
status = CONFLICTING
```

Escalate the decision instead of silently choosing.

## When fixing bugs

Find the root cause.

Do not repeatedly patch symptoms without understanding: - parser
structure - data flow - state flow - integration boundary - database
constraint

## Production changes

Never: - delete production data - delete database volumes -
rotate/delete credentials without approval - change DNS without
approval - modify unrelated VPS services - open network exposure without
approval - perform destructive migration without approval

## Final quality bar

The application is ready for production only after: - functional tests -
responsive QA - payment verification - shipping verification - security
checks - SEO checks - analytics checks - backup/restore verification -
monitoring verification - production smoke test

A successful build is necessary, not sufficient.

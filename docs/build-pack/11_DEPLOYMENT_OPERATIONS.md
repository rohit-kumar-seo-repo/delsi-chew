# Delsi Chews --- Deployment and Operations

## Deployment model

``` text
Developer
   |
   v
Git
   |
   +--> Preview
   |
   +--> Staging
   |
   +--> Production
```

Use Vercel for the Next.js application where appropriate.

## Deployment rule

Every meaningful milestone:

``` text
FIX
 ↓
BUILD
 ↓
VERIFY
 ↓
DEPLOY
 ↓
SMOKE TEST
 ↓
CONTINUE
```

Do not wait until the entire application is finished before deploying a
working preview.

## Environment variables

Separate: - development - staging - production

Examples: - DATABASE_URL - REDIS_URL - MEDUSA configuration -
RAZORPAY_KEY_ID - RAZORPAY_KEY_SECRET - RAZORPAY_WEBHOOK_SECRET -
SHIPROCKET credentials - WhatsApp credentials - email credentials -
analytics IDs - SENTRY_DSN

Never commit secrets.

## Database operations

-   migrations must be versioned
-   backups before consequential migrations
-   test migrations in staging
-   no destructive production migration without approval

## Monitoring

Monitor: - uptime - HTTP errors - application exceptions - database
health - Redis health - payment failures - webhook failures - shipping
failures - queue failures

## Backup

At minimum: - automated PostgreSQL backup - tested restore procedure -
documented retention - backup monitoring

## Rollback

Every production deployment needs a rollback strategy.

Application rollback: - previous deployment

Database rollback: - prefer forward-compatible migrations - do not
assume database rollback is safe - backup before destructive changes

## Production safety

Claude must not delete or alter unrelated infrastructure.

Before touching existing infrastructure: - identify service - identify
owner - identify dependencies - document intended change - get approval
for consequential changes

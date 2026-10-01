# Delsi Chews --- Security Architecture

## Authentication

-   secure password hashing if password auth is used
-   secure session management
-   HttpOnly cookies where applicable
-   Secure cookies in production
-   CSRF protection where applicable
-   rate limiting
-   account lockout/abuse controls where appropriate

## Authorization

Authorization must be enforced server-side.

Never rely on: - hidden buttons - client-side role checks - route
visibility - frontend state

## Input validation

Validate all external input: - checkout - addresses - login - search -
review forms - admin forms - webhooks - API payloads

Use schema validation consistently.

## Payments

-   verify Razorpay signatures
-   verify amount/currency/order relationship
-   make payment callbacks idempotent
-   protect secrets
-   audit payment state changes

## Webhooks

Every webhook: 1. authenticate/verify signature 2. parse safely 3.
validate payload 4. check idempotency 5. update state 6. log result 7.
return correct response

## Database

-   least privilege
-   parameterized queries
-   backups
-   migration discipline
-   no secrets in source code
-   no production database dumps in Git

## Frontend

Protect against: - XSS - unsafe HTML - malicious URLs - insecure
third-party scripts - exposed secrets

## Headers

Use appropriate: - Content-Security-Policy - Strict-Transport-Security -
X-Content-Type-Options - Referrer-Policy - frame protections -
permissions policy where appropriate

Tune CSP carefully around payment/analytics providers.

## Secrets

Secrets belong in environment/secret-management systems.

Never commit: - Razorpay keys - database passwords - WhatsApp
credentials - SMTP/API credentials - Vercel tokens - Google OAuth client
secrets

## Audit logs

Log important privileged actions: - admin login - role changes - product
mutations - price changes - inventory adjustments - refund actions -
shipping changes - user-management actions

Avoid logging payment secrets or unnecessary personal data.

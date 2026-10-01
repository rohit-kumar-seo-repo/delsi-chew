# Delsi Chews --- Claude Build Pack

## Purpose

This document set is the implementation blueprint for rebuilding the
Delsi Chews ecommerce platform as a production-grade system.

Claude should treat this folder as the primary architectural
specification and the live Delsi website as the primary source for
current product/content/media facts.

Source website: https://delsichews.com/

Reference ecommerce site used for UX research only:
https://brunoswildessentials.com/

## Non-negotiable rules

1.  Do not copy Bruno's branding, copy, visual design, assets, layout,
    or implementation.
2.  Use the live Delsi site as the source for current product names,
    descriptions, prices, SKUs, product media, videos, FAQs, reviews,
    policies and brand content.
3.  The newly supplied client packaging/label images are the latest
    packaging reference. They override older visual assumptions about
    labels and packaging.
4.  Never invent missing product facts.
5.  Never silently replace an existing Delsi SKU with a newly invented
    SKU.
6.  If a product fact is unavailable, mark it UNKNOWN and continue using
    a configurable field where possible.
7.  Preserve source media where licensing/ownership permits. Do not
    replace real Delsi product media with unrelated generated media.
8.  Build the application first; correction/reconciliation can happen
    incrementally after the working system exists.
9.  Every meaningful milestone follows: Fix → Build → Verify → Deploy.
10. Do not call the system production-ready merely because the
    TypeScript build passes.

## Roles

-   Claude: implementation, infrastructure audit, hardening, deployment,
    operations.
-   Hermes: application builder/orchestrator where it is already being
    used.
-   ChatGPT: architecture, requirements, business operating structure,
    QA gatekeeping and reconciliation.

Claude must not assume that infrastructure outside the Delsi project may
be modified. Existing VPS services, DNS, firewall rules, secrets,
payment credentials, production data, Docker volumes and unrelated
applications require explicit approval before destructive or
consequential changes.

## Target stack

-   Next.js + React + TypeScript
-   Tailwind CSS
-   shadcn/ui where useful
-   Framer Motion
-   Medusa.js v2.21.0
-   PostgreSQL 16
-   Redis 7
-   Razorpay
-   Shiprocket
-   WhatsApp Business API
-   Transactional email
-   GA4
-   Google Search Console
-   Meta Pixel + CAPI
-   Google Ads conversion tracking
-   Sentry / uptime / structured logging
-   Vercel for the web application where appropriate
-   Separate development, staging and production environments

## Primary business principle

PostgreSQL/Medusa is the transactional source of truth.

Google Sheets or other business-operating tools may be used for
reporting, planning, procurement, reconciliation and manual operations,
but should not become the authoritative database for orders, payments or
inventory.

## Delivery target

The final platform must feel like:

**premium natural pet nutrition × playful Indian pet brand × extremely
easy shopping**

It should combine Delsi's personality with strong ecommerce information
architecture and a substantially better customer experience than the
current site.

## Read order

1.  01_MASTER_ARCHITECTURE.md
2.  02_SITE_MAP_AND_ROUTES.md
3.  03_DESIGN_SYSTEM.md
4.  04_PRODUCT_DATA_CONTRACT.md
5.  05_BACKEND_COMMERCE_ARCHITECTURE.md
6.  06_BUSINESS_OPERATIONS_ARCHITECTURE.md
7.  07_INTEGRATIONS.md
8.  08_CONTENT_SEO_ANALYTICS.md
9.  09_SECURITY.md
10. 10_QA_ACCEPTANCE.md
11. 11_DEPLOYMENT_OPERATIONS.md
12. 12_SOURCE_MIGRATION_AND_ASSET_INGESTION.md
13. 13_AI_PRODUCT_ADVISOR.md
14. 14_IMPLEMENTATION_PLAN.md
15. 15_CLIENT_LABEL_AND_BRAND_REFERENCE.md
16. 16_SOURCE_CATALOG_SEED.md

Then inspect the live source before populating production data.

# Delsi Chews --- Implementation Plan

## Stage 0 --- Repository and environment

-   inspect existing repository
-   identify current app structure
-   identify existing Medusa integration
-   inspect environment variables
-   do not delete existing work
-   establish branch/checkpoint

## Stage 1 --- Commerce foundation

-   Medusa
-   PostgreSQL
-   Redis
-   products
-   variants
-   pricing
-   inventory
-   customers
-   carts
-   orders

## Stage 2 --- Source catalog

-   crawl current Delsi site
-   extract product data
-   extract media
-   preserve source URLs
-   reconcile fields
-   seed confirmed catalog
-   flag unknowns

## Stage 3 --- Design system

-   Delsi tokens
-   typography
-   buttons
-   cards
-   forms
-   navigation
-   responsive rules
-   product components

## Stage 4 --- Storefront

-   homepage
-   shop
-   collections
-   search
-   filters
-   product pages
-   content pages
-   blog
-   reviews

## Stage 5 --- Cart and checkout

-   cart
-   checkout
-   addresses
-   shipping
-   Razorpay
-   COD
-   confirmation

## Stage 6 --- Orders and shipping

-   customer orders
-   admin orders
-   Shiprocket
-   tracking
-   fulfillment
-   returns
-   refunds

## Stage 7 --- Customer system

-   account
-   login
-   registration
-   addresses
-   order history
-   support

## Stage 8 --- Admin

-   dashboard
-   product management
-   inventory
-   customers
-   orders
-   shipments
-   payments
-   reviews
-   content
-   RBAC
-   audit log

## Stage 9 --- Marketing and analytics

-   GA4
-   Search Console
-   Meta
-   Google Ads
-   email
-   WhatsApp

## Stage 10 --- SEO/content

-   metadata
-   schema
-   sitemap
-   robots
-   redirects
-   blogs
-   FAQs
-   internal linking

## Stage 11 --- Hardening

-   security
-   rate limits
-   authorization
-   webhook verification
-   performance
-   accessibility
-   tests

## Stage 12 --- Deployment

-   staging
-   production
-   monitoring
-   backups
-   smoke tests
-   rollback plan

## Work rhythm

Do not implement all stages and test only at the end.

For each meaningful unit:

``` text
implement
→ typecheck
→ lint
→ build
→ test
→ inspect UI
→ deploy preview
→ smoke test
→ continue
```

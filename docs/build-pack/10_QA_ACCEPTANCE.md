# Delsi Chews --- QA and Acceptance Criteria

## Build gate

Must pass: - TypeScript - lint - unit tests where present - integration
tests for critical flows - production build

## Storefront tests

### Home

-   loads
-   images load
-   navigation works
-   CTAs work
-   mobile responsive

### Shop

-   products load
-   filters work
-   search works
-   pagination/infinite loading works as designed
-   sorting works
-   empty state works

### Product

-   correct source data
-   correct price
-   correct SKU where confirmed
-   media gallery
-   add to cart
-   quantity
-   variant
-   reviews
-   FAQ
-   mobile layout

### Cart

-   add
-   remove
-   quantity update
-   price recalculation
-   persistence
-   stock constraints

### Checkout

-   address
-   shipping
-   Razorpay
-   COD if enabled
-   order creation
-   success/failure handling

### Orders

-   customer can view order
-   status is correct
-   tracking is visible where available

## Backend tests

-   authorization
-   validation
-   inventory reservation
-   order creation
-   payment verification
-   webhook idempotency
-   refund state
-   shipping state

## Security tests

-   unauthorized admin route
-   privilege escalation
-   invalid webhook
-   invalid payment callback
-   XSS payload
-   injection payload
-   rate limiting
-   session handling

## Responsive QA

At minimum: - 360px-ish mobile - 390/430 mobile - tablet - 1366
desktop - wide desktop

## Performance

Target: - optimized images - lazy loading where appropriate - minimal
client JavaScript - no blocking third-party scripts - fast product
page - good Core Web Vitals

## Launch checklist

-   production env configured
-   domain/HTTPS verified
-   payment live credentials verified
-   shipping credentials verified
-   email verified
-   WhatsApp verified
-   analytics verified
-   sitemap verified
-   robots verified
-   redirects verified
-   backup verified
-   monitoring verified
-   admin RBAC verified
-   order test completed
-   refund test completed
-   shipping test completed

# Delsi Chews --- Master Architecture

## 1. System shape

``` text
Customer
   |
   v
Next.js storefront
   |
   v
Medusa commerce/API
   |
   +--> PostgreSQL 16
   |
   +--> Redis 7
   |
   +--> Razorpay
   +--> Shiprocket
   +--> WhatsApp
   +--> Email
   +--> Analytics
   |
   v
Admin / Operations
   |
   +--> Orders
   +--> Inventory
   +--> Customers
   +--> Products
   +--> Shipping
   +--> Payments
   +--> Returns
   +--> Content
   +--> Reporting
```

## 2. Core domains

### Storefront

Home, shop, collections, product discovery, search, filters, product
pages, cart, checkout, accounts, orders, tracking, brand story, FAQs,
policies, contact and blog.

### Commerce

Products, variants, prices, carts, customers, orders, payments,
discounts, fulfillment, returns and refunds.

### Inventory

Available, reserved, sold, damaged and returned stock. Future-ready
support for batches/lots, expiry and supplier procurement.

### Operations

Order processing, packing, shipment creation, tracking, delivery
exceptions, customer support, returns and refunds.

### Marketing

Coupons, campaigns, analytics, Meta, Google Ads, email, WhatsApp,
retention and customer segmentation.

### Content

Products, collections, blogs, FAQs, reviews, media and SEO metadata.

### AI

Structured product advisor that can only answer from approved product
facts.

## 3. Separation of concerns

The storefront must not contain business-critical product facts
hardcoded in React components.

Product information must come from the commerce/content data layer.

The UI may contain layout copy, navigation labels and design-system
text, but product facts must be data-driven.

## 4. Environment separation

``` text
development
    |
staging
    |
production
```

Each environment needs independent configuration and secrets.

## 5. Architecture boundaries

Green changes: - TypeScript/build/lint fixes - obvious UI defects -
tests - responsive defects - missing imports - non-destructive
validation improvements

Yellow: - database design - payment logic - shipping logic - auth -
security - migrations - architecture changes - data reconciliation

Red: - deleting production data - destructive database migrations -
deleting volumes - changing payment credentials - DNS changes -
firewall/network exposure - modifying unrelated VPS services - deleting
production containers/services

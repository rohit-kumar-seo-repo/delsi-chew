# Delsi Chews --- Backend and Commerce Architecture

## Commerce engine

Use Medusa.js v2.21.0 as the commerce backend unless a documented
project constraint requires a change.

## PostgreSQL

PostgreSQL 16 is the primary transactional datastore.

Core commerce domains: - products - variants - prices - inventory -
carts - customers - addresses - orders - payments - fulfillments -
returns - refunds - promotions

## Redis

Use Redis for appropriate: - caching - queues - background jobs - rate
limiting - transient state

Do not store authoritative business records only in Redis.

## Inventory model

At minimum support:

``` text
on_hand
reserved
available
sold
damaged
returned
```

Recommended invariant:

``` text
available = on_hand - reserved
```

unless the chosen Medusa inventory implementation defines the equivalent
differently.

## Order lifecycle

``` text
pending
payment_pending
paid
processing
packed
fulfilled
shipped
out_for_delivery
delivered
cancelled
return_requested
returned
refund_pending
refunded
```

Use the actual Medusa order/fulfillment primitives and map external
statuses into a normalized Delsi operational status.

## Payment

Razorpay: - create payment/order server-side - verify signature
server-side - never trust browser-only payment success - store gateway
identifiers - reconcile payment state against order state - process
webhooks securely - make webhook handlers idempotent

COD: - configurable - order risk controls should be possible later -
track COD separately in reporting

## Shipping

Shiprocket integration: - create shipment after payment/order
eligibility - capture AWB/tracking identifiers - persist
courier/status - process webhooks - support delivery exceptions - expose
customer tracking

## Admin RBAC

Roles:

### Super Admin

Everything.

### Operations

Orders, shipments, customer support, limited catalog operations.

### Inventory Manager

Inventory, batches, stock adjustments, procurement-facing data.

### Content Manager

Products, content, media, SEO, blogs, reviews.

### Customer Support

Customers, orders, tracking, support actions; no destructive
finance/admin operations.

Every privileged mutation should produce an audit record where
practical.

## API rules

-   validate inputs
-   authorize server-side
-   never trust client-provided price
-   never trust client-provided user ID
-   never trust client-provided payment state
-   use idempotency for payment/shipping/webhook operations
-   return stable error structures

# Delsi Chews --- Integration Architecture

## Razorpay

Responsibilities: - payment order creation - checkout - signature
verification - webhook processing - refund initiation - payment
reconciliation

Security: - secrets only server-side - webhook signature verification -
idempotency - never trust client callback alone

## Shiprocket

Responsibilities: - shipment creation - courier/AWB - tracking - status
updates - delivery exceptions

Normalize Shiprocket statuses into Delsi order/fulfillment statuses.

## WhatsApp Business

Use for transactional/customer communication where approved: - order
confirmation - payment confirmation - shipment updates - delivery
updates - support conversations

Respect consent and platform template requirements.

## Email

Transactional: - order confirmation - payment confirmation - shipment
confirmation - delivery - refund - password/account events

Marketing email must use separate consent/marketing logic.

## Analytics

### GA4

Events: - view_item - view_item_list - search - add_to_cart -
remove_from_cart - view_cart - begin_checkout - add_shipping_info -
add_payment_info - purchase - refund - login - sign_up

### Meta

Pixel + server-side CAPI where configured.

### Google Ads

Track purchase and other approved conversion events.

## Search Console

Maintain: - sitemap - indexing - canonical URLs - structured data -
crawlability

## Sentry / monitoring

Track: - frontend exceptions - backend exceptions - failed payment
events - failed shipment operations - webhook failures - performance
anomalies - deployment regressions

## Integration abstraction

Do not scatter vendor-specific API calls throughout the UI.

Use service modules:

``` text
/services/payments/razorpay
/services/shipping/shiprocket
/services/messaging/whatsapp
/services/email
/services/analytics
```

This keeps vendor changes isolated.

# Delsi Chews --- Site Map and Route Architecture

## Public routes

``` text
/
 /shop
 /shop/[collection]
 /product/[slug]
 /search
 /cart
 /checkout
 /account
 /account/login
 /account/register
 /account/orders
 /account/orders/[id]
 /account/addresses
 /about
 /our-story
 /faq
 /contact
 /shipping
 /returns
 /privacy
 /terms
 /blog
 /blog/[slug]
```

## Recommended discovery routes

``` text
/dog-treats
/cat-treats
/chews
/jerky
/powders
/combos
/best-sellers
```

These should be created only where the underlying catalog supports them.

## Admin routes

``` text
/admin
/admin/orders
/admin/orders/[id]
/admin/products
/admin/products/[id]
/admin/inventory
/admin/inventory/[sku]
/admin/customers
/admin/customers/[id]
/admin/shipments
/admin/payments
/admin/returns
/admin/refunds
/admin/reviews
/admin/content
/admin/coupons
/admin/reports
/admin/settings
/admin/users
/admin/audit-log
```

## Navigation

Primary: - Shop - Dog Treats - Cat Treats - Chews - Powders - Combos -
Best Sellers - About

Utility: - Search - Account - Cart - Order tracking - WhatsApp/support

## Homepage architecture

1.  Announcement bar
2.  Header/navigation
3.  Hero
4.  Primary shop CTA
5.  Product/category discovery
6.  Best sellers
7.  Why Delsi
8.  Brand story
9.  Featured products / powders
10. Product education
11. Reviews
12. Social/media section
13. FAQs
14. Latest content
15. Footer

Do not duplicate sections merely because they exist on the old site.
Improve information hierarchy.

## Product page architecture

1.  Breadcrumb
2.  Product media gallery
3.  Product name
4.  Rating/reviews
5.  Price / sale price
6.  Variant/weight
7.  Availability
8.  Quantity
9.  Add to cart
10. Buy now
11. Trust / shipping information
12. Key features
13. Ingredients
14. Nutrition
15. Suitable pets
16. Feeding instructions
17. Storage
18. Product description
19. Reviews
20. FAQs
21. Related products
22. Recently viewed

## Checkout

Keep checkout short: - Contact - Address - Shipping - Payment - Order
review - Confirmation

Do not force unnecessary account creation before purchase.

## Error and empty states

Every data-driven route needs: - loading state - empty state -
unavailable state - not-found state - recoverable error state - mobile
state

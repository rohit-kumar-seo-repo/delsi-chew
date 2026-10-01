# Delsi Chews --- Content, SEO and Analytics

## SEO architecture

Every indexable page needs: - title - meta description - canonical -
Open Graph data - Twitter/social metadata where appropriate - structured
data where valid - semantic headings - optimized image alt text -
internal links

## Structured data

Use appropriate schema types: - Organization - Product - Offer -
BreadcrumbList - Article - FAQPage only when the page genuinely contains
qualifying FAQ content

Do not generate fake ratings/reviews or structured data unsupported by
visible content.

## Product SEO

Product pages should expose: - product name - species - category -
ingredients - weight - price - availability - approved benefits -
feeding/storage - reviews - related products

## Content

The current Delsi site contains blog content and educational material.
Migrate it where useful, preserving factual meaning while improving
readability and SEO.

Do not manufacture expert/veterinary claims.

## Homepage SEO

The current site positions Delsi around natural/dehydrated pet treats
and food toppers, real ingredients, and pet-parent trust. The new
homepage should preserve the brand truth while improving information
hierarchy.

## Analytics data layer

Define a consistent event schema.

Example:

``` json
{
  "event": "add_to_cart",
  "product_id": "...",
  "variant_id": "...",
  "sku": "...",
  "quantity": 1,
  "value": 249,
  "currency": "INR"
}
```

Do not send unnecessary personal information to analytics providers.

## SEO migration

Before launch: - map old URL -\> new URL - preserve valuable product
slugs where practical - 301 redirect changed URLs - redirect obsolete
/products-type routes appropriately - submit sitemap - verify robots -
check canonical tags - crawl all important pages

# Delsi Chews --- Source Migration and Asset Ingestion

## Source hierarchy

### Priority 1

Current live Delsi website: https://delsichews.com/

### Priority 2

Latest client-supplied packaging/label images in this build pack.

### Priority 3

Other client-provided approved assets/data.

### Not authoritative

Third-party listings, search snippets, marketplaces or inferred product
specifications.

## Live-site extraction

Claude should build a repeatable extraction process for: - product
names - slugs - prices - sale prices - SKUs - weights - categories -
tags - descriptions - ingredients - nutrition - feeding - storage -
FAQs - reviews - image URLs - video URLs - product metadata - SEO
metadata - blog content - policy pages - contact/business details

Store the source URL for each record.

## Asset ingestion

For every image/video: 1. capture original source URL 2. download where
permitted 3. store optimized derivative 4. preserve original where
practical 5. generate appropriate alt text 6. associate asset with
product/content record 7. record source and license/ownership status

Do not scrape or reuse third-party assets without permission.

## Product media roles

``` text
hero
gallery
label
ingredient/nutrition
lifestyle
video
thumbnail
```

## Label images

The newest supplied client images show Delsi packaging and should be
used as a packaging/visual reference.

Important: - do not redraw the label - do not alter ingredient/nutrition
text - do not infer unreadable text - use the original approved assets
when available - product-page copy must remain consistent with the
approved product data

## Migration mapping

Create:

``` text
old_url
new_url
redirect_status
```

Preserve SEO value through 301 redirects where URLs change.

## Migration log

For each product:

``` text
product_id
source_url
retrieved_at
source_status
fields_confirmed
fields_unknown
fields_conflicting
assets_found
assets_downloaded
migration_status
```

## Important

The current live site has changed during this project. Re-fetch it
before final production import.

Example: the homepage currently exposes a "Chicken Training Treats"
product in addition to products identified during earlier audits.

Therefore, never rely only on an older static catalog.

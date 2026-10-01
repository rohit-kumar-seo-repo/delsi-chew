# Delsi Chews --- Product Data Contract

## Principle

The product model must support all current Delsi product information and
future variants without requiring frontend rewrites.

## Product entity

``` text
Product
- id
- slug
- name
- short_description
- description
- brand
- status
- product_type
- category_ids
- tag_ids
- species
- breed_suitability
- age_suitability
- ingredients
- nutrition
- key_features
- benefits
- feeding_instructions
- storage_instructions
- warnings
- faqs
- reviews
- media
- videos
- seo
- source_url
- source_last_checked_at
- source_confidence
- created_at
- updated_at
```

## Variant entity

``` text
Variant
- id
- product_id
- sku
- weight
- unit
- price
- compare_at_price
- sale_price
- currency
- stock
- barcode_if_available
- status
```

## SKU rule

Existing source SKUs must be preserved when confirmed.

Never invent a canonical SKU simply because a naming convention is
convenient.

If a SKU cannot be confirmed:

``` text
sku_status = UNKNOWN
```

## Product fact status

Every imported field should conceptually support:

``` text
CONFIRMED
UNKNOWN
CONFLICTING
INFERRED
```

Only CONFIRMED source facts should be treated as authoritative
customer-facing facts.

## Media

``` text
ProductMedia
- id
- product_id
- type: image | video
- source_url
- local_asset_path
- alt_text
- sort_order
- role: hero | gallery | label | lifestyle | video
- source
- license_status
```

## Product source metadata

Every migrated product should retain: - original source URL - retrieval
timestamp - extraction method - source snapshot/reference where
possible - field-level confidence for uncertain fields

## Current known product seed

The live site has exposed these products during the project:

1.  Dehydrated Chicken Neck
2.  Dehydrate Chicken Feet
3.  Chicken Training Treats
4.  Chicken Protein Sticks
5.  Dehydrated Sardine
6.  Chicken Jerky
7.  Beef Liver Jerky
8.  Beef Jerky
9.  Premium Chicken Powder
10. Sardine Powder / Dehydrated Sardine Powder
11. Dehydrated Quail
12. Delsi Chew Yak Chew

This list is a seed, not permission to invent missing fields.

## Example confirmed source data

The live Sardine Powder page currently exposes: - SKU: SKU-TM-310 -
Weight: 80 g - Price: ₹249 - Dogs and cats positioning - product
features, benefits, ingredients, feeding and storage information

The live site must be re-read before final catalog import because
prices, packaging, products and copy can change.

## Product page UI data groups

Render facts under: - Overview - Key features - Ingredients -
Nutrition - Benefits - Feeding - Storage - Suitable pets - Reviews -
FAQs

Do not create medical claims beyond the approved source data.

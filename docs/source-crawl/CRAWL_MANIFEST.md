# Delsi Chews — Live Site Crawl Manifest

First real Stage 2 crawl (`docs/build-pack/14_IMPLEMENTATION_PLAN.md` Stage 2
/ `docs/build-pack/12_SOURCE_MIGRATION_AND_ASSET_INGESTION.md`). Previously
blocked in this environment by network egress policy; access was opened
2026-10-01 and this crawl ran immediately after, in the same session that
produced the Stage 0/1 commerce foundation.

**Retrieved at: 2026-10-01T10:39:28Z.** Re-crawl before any production
catalog import if meaningfully more time has passed — the build pack
itself notes the live site changed mid-project before.

## Method

Two sources, both the live site itself (Priority 1 per
`docs/build-pack/12_SOURCE_MIGRATION_AND_ASSET_INGESTION.md`):

1. **WooCommerce Store API** — `GET /wp-json/wc/store/v1/products?per_page=50`.
   Public, unauthenticated, returns full structured product data (name,
   slug, SKU, prices in minor units, weight, categories, tags, attributes,
   images, stock status, descriptions) directly from the site's own
   commerce database — not scraped/inferred HTML. Raw response saved at
   `raw/products-store-api.json`.
2. **WordPress REST API** — `GET /wp-json/wp/v2/pages?per_page=50`, then
   each page's `content.rendered`. Used for Home, About, Privacy Policy,
   Terms & Conditions, Shipping Policy, Return & Refund Policy. Raw
   response saved at `raw/pages.json`.

Both are the site's own first-party APIs — no third-party listing or
inferred data was used anywhere in this crawl.

## What this crawl produced

- `catalog.json` — all 12 products currently live, cleaned and structured
  (decimal INR prices, parsed custom attributes, local image references).
  This is the canonical extraction; `raw/products-store-api.json` is the
  unmodified source.
- `assets/products/` — first two images per product, downloaded directly
  from `delsichews.com`.
- `assets/brand/` — logo and homepage hero illustrations.
- This manifest.

## Product catalog — summary

| SKU | Name | Price (current) | Weight | In stock | Categories |
|---|---|---|---|---|---|
| — (none set) | Delsi Chew Yak Chew | ₹125 (was ₹140) | UNKNOWN | yes | Treats for Dogs |
| SKU-TM-311 | Premium Chicken Powder | ₹249 | 100 g | yes | Treats for Cats, Treats for Dogs |
| SKU-TM-310 | Sardine Powder | ₹249 | 80 g | yes | Treats for Cats, Treats for Dogs |
| SKU-TM-312 | Dehydrated Quail | ₹249 | UNKNOWN | yes | Treats for Cats |
| SKU-TM-309 | Treats Trial Combo Pack for Dogs & Cats | ₹499 (was ₹749) | UNKNOWN | **no** | Treats for Cats, Treats for Dogs |
| SKU-TM-308 | Beef Jerky | ₹320 | UNKNOWN | yes | Treats for Cats |
| SKU-TM-307 | Beef Liver Jerky | ₹320 | 50 g | yes | Treats for Cats |
| SKU-TM-306 | Chicken Jerky | ₹320 | 50 g | yes | Treats for Cats, Treats for Dogs |
| SKU-TM-304 | Dehydrated Sardine | ₹250 | UNKNOWN | yes | Treats for Cats, Treats for Dogs |
| SKU-TM-303 | Chicken Protein Sticks | ₹250 | 50 g | yes | Treats for Cats, Treats for Dogs |
| SKU-TM-301 | Dehydrated Chicken Feet | ₹219 (was ₹299) | 150 g | yes | Treats for Cats, Treats for Dogs |
| SKU-TM-302 | Dehydrated Chicken Neck | ₹249 (was ₹300) | 100 g (attribute only — core weight field empty) | **no** | Treats for Dogs |

Notes / reconciliation needed before this becomes the production catalog:

- **Reconciles the build pack's own seed list.** `docs/build-pack/16_SOURCE_CATALOG_SEED.md`
  listed "Chicken Training Treats" as seen on the homepage during earlier
  project discovery. It is **not** in the current live catalog (12
  products returned, this is not one of them). Either removed, renamed, or
  never actually a distinct SKU — flagged `CONFLICTING`, not resolved here.
- "Dehydrated Sardine" (SKU-TM-304, ₹250) and "Sardine Powder"
  (SKU-TM-310, ₹249) are confirmed as two **distinct, real** products
  (whole dehydrated fish vs. ground powder topper) — the build pack
  flagged this pairing as "verify whether duplicate/legacy naming"; it is
  not a duplicate.
- "Delsi Chew Yak Chew" has **no SKU set** on the live site (`sku: ""`).
  Not an extraction failure — the live record genuinely has none. Carried
  through as `sku_status: UNKNOWN`, not invented.
- Two products are currently **out of stock**: Treats Trial Combo Pack,
  Dehydrated Chicken Neck.
- Weight is `UNKNOWN` for 5 of 12 products — the live site's own `weight`
  field is empty for them (not a parsing gap on this end).
- Every product's long description ends in the same boilerplate FAQ block
  ("Who is this product suitable for? ... Does it contain preservatives
  or fillers? ...") — this is template content repeated verbatim across
  all 12 products, not per-product-authored FAQs. Preserved as-is since
  it's genuinely what the live site shows; worth the business flagging
  whether that's intentional.

## Site content — summary

- **Brand tagline**: "Honest. Healthy. Loved."
- **Hero**: "Natural Treats & Food Toppers for Dogs and Cats" — "Explore
  dehydrated treats and meal toppers for dogs and cats. Shop by pet,
  check each product's ingredients, and order online or ask us on
  WhatsApp."
- **Our Story** (verbatim): "Delsi's Chews was created with one simple
  belief: dogs deserve food as honest as the love they give us. We
  started by making small-batch, dehydrated treats using real ingredients
  and transparent methods. Today, Delsi's Chews serves pet parents across
  India who want clean, nutritious, and trustworthy food for their dogs.
  We don't use fillers. We don't use preservatives. We don't compromise
  on quality."
- **Brand claims/badges**: Grain Free, Gluten Free, Preservative Free, All
  Natural, Human Grade, "Clean & Simple Recipes", "Real Ingredients",
  "Made in India, With Care".
- **Trust stats** (confirmed live values, read from the page's own
  counter-widget target attributes, not the "0" pre-animation display
  text): 10+ Years in Industry, 10+ Variety Available, 100% Satisfaction,
  1000+ Package Sold.
- **Testimonials** (3, as displayed on the live homepage, with first
  name + city as given — no surnames/photos shown on source): Amit R.
  (Bengaluru), Neha K. (Chennai), Rahul S. (Mumbai). Full quotes in
  `pages-content` dump; not reproduced here to avoid duplication.
- **Social**: Instagram — "257 followers · 35 posts" — bio: "Nutritious
  Treats for Happy Paws Wholesome ingredients for wag-worthy meals ❤️
  Made with love, approved by pups everywhere" (source truncates
  "everywhere" — reproduced as shown).
- **FAQ page**: no standalone FAQ page exists among the site's 19 WP
  pages. FAQs exist only as the repeated per-product block noted above.
- **Contact / business info** — flagged `CONFLICTING`, both preserved
  rather than one silently chosen:
  - Footer (every page): `delsichew@gmail.com`, `+919840505144`, "Plot
    no 21, Saraswathi Nagar, North, 2nd Main Road, Chennai, Tamil Nadu,
    India 600115", GSTIN `33DGPPS4494Q2Z6`.
  - Privacy Policy page: `support@delsichews.com`, `+91 98405 05114`
    (last two digits transposed vs. the footer number), "Neelankarai,
    Chennai, Tamil Nadu, India" (different locality than the footer
    address).
  - Shipping Policy page (most recently modified of all crawled pages —
    2026-09-30): `support@delsichews.com`, `+91 98405 05144` (matches
    the footer number).
  - Given the shipping policy is the freshest edit and matches the
    footer's phone number, `+919840505144` / `delsichew@gmail.com` (footer)
    or `support@delsichews.com` (policy pages) are the more likely current
    values, and the Privacy Policy's phone number and "Neelankarai"
    address are the more likely stale ones — but this is an inference,
    not a confirmation. Get the business to confirm before using either
    address/phone as the single source of truth anywhere customer-facing.
- Full policy text (Privacy, Terms, Shipping, Returns) captured verbatim
  in `raw/pages.json` — not duplicated in this manifest.

## Not yet done

- Blog post content (`/blogs/` exists; posts not individually crawled
  this pass).
- Reviews beyond the 3 homepage testimonials (no public reviews API
  response was checked for per-product review data this pass).
- Full-resolution/all gallery images per product (only the first 2 of
  each product's image set were downloaded).
- robots.txt / sitemap.xml inspection for SEO migration planning
  (`docs/build-pack/08_CONTENT_SEO_ANALYTICS.md`).

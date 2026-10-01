# Delsi Chews --- Design System

## Brand direction

The visual system should communicate:

-   natural pet nutrition
-   trust
-   warmth
-   Indian brand identity
-   playfulness
-   premium quality
-   clarity

Reference phrase:

**Premium natural pet nutrition × playful Indian pet brand × extremely
easy shopping**

## Existing visual signals

The latest supplied client packaging uses: - dominant Delsi yellow -
black information bands - gold/yellow metallic packaging accents -
black-and-white bulldog mascot - hand-drawn/playful Delsi's Chews
wordmark - strong uppercase product naming - rounded/organic visual
language - product-specific information panels - Indian
vegetarian/non-vegetarian marking visible on packaging where applicable

The supplied packaging images are the latest visual reference. Do not
redesign the packaging itself.

## Color tokens

Create semantic tokens rather than hardcoding colors everywhere.

``` text
--delsi-yellow
--delsi-yellow-soft
--delsi-black
--delsi-cream
--delsi-white
--delsi-gold
--delsi-green-natural
--delsi-brown-natural
--success
--warning
--error
--muted
```

Exact values should be sampled/derived from approved Delsi brand assets
before final production polish.

## Typography

Use a bold expressive display face for major Delsi headings, paired with
a highly legible neutral body font.

Rules: - strong hierarchy - short readable paragraphs - high contrast -
accessible font sizing - avoid excessive decorative type

## Components

Core: - Header - Footer - AnnouncementBar - Button - ProductCard -
ProductGrid - Price - Badge - Rating - ReviewCard - FilterDrawer -
Search - Breadcrumbs - QuantitySelector - CartDrawer - ProductGallery -
Accordion - FAQ - Toast - Modal - FormField - AddressCard -
OrderTimeline - EmptyState - Skeleton

## Motion

Use Framer Motion for: - page transitions where appropriate - product
image transitions - cart interactions - subtle reveal animations -
hover/tap feedback

Motion must not block interaction or hurt performance.

Avoid excessive GSAP. Use it only when a genuinely complex animation
requires it.

## Product photography

Real Delsi product photography is preferred.

The latest client-supplied product/label images must be preserved as
source references.

Do not use generic stock pet-food imagery as a substitute for actual
Delsi products.

## Responsive rules

Design mobile-first.

Breakpoints should support: - small phones - large phones - tablets -
desktop - wide desktop

The product card and checkout experience are especially important on
mobile.

## Accessibility

Minimum: - semantic HTML - keyboard navigation - visible focus states -
alt text - contrast compliance - accessible forms - screen-reader
labels - no interaction dependent only on hover

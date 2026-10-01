# Delsi Chews --- Data Model Overview

## Core entities

``` text
Product
  └── Variant
        ├── Price
        ├── Inventory
        └── Media

Customer
  ├── Address
  ├── Order
  └── SupportInteraction

Order
  ├── OrderItem
  ├── Payment
  ├── Fulfillment
  ├── Shipment
  ├── Return
  └── Refund

Supplier
  └── PurchaseOrder
        └── PurchaseOrderItem

Product
  └── Batch
        └── InventoryMovement

Content
  ├── BlogPost
  ├── FAQ
  ├── Review
  └── SEORecord
```

## IDs

Use stable internal UUID/IDs.

Keep business identifiers separately: - SKU - order number -
shipment/AWB - payment gateway ID - customer-facing slug

## Auditability

Important business records should include: - created_at - updated_at -
created_by where applicable - updated_by where applicable - status -
source/reference when imported

## Product source provenance

For migrated facts, store provenance conceptually as:

``` text
field
source_url
retrieved_at
status
source_value
normalized_value
```

This makes future corrections safe and traceable.

## Soft deletion

Prefer status/archival for business records.

Do not physically delete orders, payments or financial records merely to
hide them from the UI.

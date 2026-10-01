# Delsi Chews --- Business Operations Architecture

## Objective

The website is only one part of the Delsi operating system.

The business layer should support:

``` text
Sales
Products
Inventory
Procurement
Suppliers
Customers
Shipping
Payments
Returns
Marketing
Communication
Reviews
Batches
Expenses
Reporting
```

## Product Master

Fields: - product ID - SKU - product name - product type - category -
species - ingredients - weight - selling price - cost price when
available - supplier - batch linkage - expiry - status - media - source
URL

## Supplier Master

``` text
supplier_id
supplier_name
contact
email
phone
address
GST/tax identifiers where applicable
products supplied
payment terms
lead time
status
notes
```

## Procurement

``` text
Purchase Order
 -> supplier
 -> line items
 -> ordered quantity
 -> received quantity
 -> unit cost
 -> taxes
 -> expected date
 -> receiving status
```

## Batch/Lot

Future-ready model:

``` text
batch_id
product_id
supplier_id
manufactured_at
received_at
expiry_at
quantity_received
quantity_remaining
quality_status
notes
```

## Inventory movements

Every adjustment should have a reason: - sale - reservation - release -
receiving - damage - return - manual adjustment - expiry - correction

## Customer CRM

Track: - customer - addresses - orders - lifetime value - last
purchase - repeat purchase - product preferences - communication
consent - support interactions

Do not infer sensitive personal attributes.

## Finance operations

Track operationally: - gross sales - discounts - refunds - payment
fees - shipping costs - COD - Razorpay - expenses - net operational
revenue

Accounting/tax compliance should be handled with appropriate
professional/accounting systems where required.

## Management dashboard

KPIs: - revenue - orders - AOV - units sold - top products - low-stock
products - cancelled orders - refund value - payment failures - shipping
failures - repeat customer rate - acquisition source - conversion rate

## Operational spreadsheet layer

If Google Sheets is later connected, use it for: - reporting -
procurement planning - reconciliation - manual operations - exports -
business planning

Do not make Sheets the authoritative order/payment/inventory database.

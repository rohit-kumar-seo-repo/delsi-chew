// Seeds the ONE Delsi product this codebase currently has confirmed data
// for: Sardine Powder (Dogs & Cats). This is NOT a catalog import — Stage 2
// (crawl https://delsichews.com/) is required before any real import, per
// docs/build-pack/12_SOURCE_MIGRATION_AND_ASSET_INGESTION.md ("the current
// live site has changed during this project... never rely only on an older
// static catalog"). This script exists solely to prove the Stage 1 commerce
// foundation (product → variant → price → inventory) works end-to-end
// against one real record instead of a framework demo product.
//
// Field provenance (do not add fields beyond what's listed — see
// docs/build-pack/04_PRODUCT_DATA_CONTRACT.md "Never invent missing
// product facts"):
//
//   - name, SKU, weight, price, species: confirmed in
//     docs/build-pack/04_PRODUCT_DATA_CONTRACT.md and
//     docs/build-pack/16_SOURCE_CATALOG_SEED.md from a prior crawl of
//     https://delsichews.com/product/sardine-powder/ (source_url below).
//     That crawl has an unknown/unstated retrieval timestamp and the pack
//     explicitly warns the site has changed since — so this product is
//     created as a DRAFT, not PUBLISHED, and flagged NEEDS_RECONCILIATION.
//   - ingredients, feeding recommendation, storage instructions, label
//     claims: transcribed directly (not paraphrased/invented) from the
//     client-supplied packaging photos in
//     docs/build-pack/client-label-reference/, which
//     docs/build-pack/15_CLIENT_LABEL_AND_BRAND_REFERENCE.md designates as
//     an approved source. "Ingredients (Human Grade): Fish, Turmeric" and
//     the feeding table are legible text on that label.
//   - stock quantity: NOT stated anywhere in the build pack. Seeded as 0
//     rather than guessed; real stock must come from operations before
//     launch.
//
// Re-run safety: this script is idempotent by SKU — it skips creating the
// product if a variant with this SKU already exists.
import { MedusaContainer } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  MedusaError,
} from "@medusajs/framework/utils";
import {
  createInventoryLevelsWorkflow,
  createProductsWorkflow,
} from "@medusajs/medusa/core-flows";

const SKU = "SKU-TM-310";

export default async function seedConfirmedCatalog({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  const { data: existingVariants } = await query.graph({
    entity: "product_variant",
    fields: ["id", "sku"],
    filters: { sku: [SKU] },
  });

  if (existingVariants.length > 0) {
    logger.info(
      `Confirmed-catalog seed skipped: a variant with SKU ${SKU} already exists (id: ${existingVariants[0].id}).`
    );
    return;
  }

  const { data: salesChannels } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  });
  const defaultSalesChannel = salesChannels[0];

  const { data: shippingProfiles } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  });
  const shippingProfile = shippingProfiles[0];

  if (!defaultSalesChannel || !shippingProfile) {
    throw new MedusaError(
      MedusaError.Types.UNEXPECTED_STATE,
      "Expected a default sales channel and shipping profile to already " +
        "exist (created by src/migration-scripts/initial-data-seed.ts). " +
        "Run `medusa db:migrate` before this script."
    );
  }

  logger.info(`Seeding confirmed product: Sardine Powder (Dogs & Cats) [${SKU}]...`);

  const { result: products } = await createProductsWorkflow(container).run({
    input: {
      products: [
        {
          title: "Sardine Powder (Dogs & Cats)",
          handle: "sardine-powder",
          // DRAFT, not PUBLISHED: this record has not been reconciled
          // against a fresh live-site crawl (see file header). It must not
          // be customer-facing until Stage 2 confirms it.
          status: "draft" as any,
          weight: 80,
          shipping_profile_id: shippingProfile.id,
          description:
            "Preservative free, no added flavours. Farm fresh produce, no filler ingredients. Rich in Omega 3.\n\n" +
            "Ingredients (human grade): Fish, Turmeric.\n\n" +
            "Feeding recommendation (per day): Small dogs 1/2 tsp, Medium dogs 1 tsp, Large dogs 2 tsp.\n\n" +
            "Storage: store in a dry place; consume within 15 days of opening; preferably refrigerate, " +
            "else store in a cool, dry place.\n\n" +
            "Suitable for dogs and cats.",
          metadata: {
            species: ["dog", "cat"],
            product_fact_status: "NEEDS_RECONCILIATION",
            source_url: "https://delsichews.com/product/sardine-powder/",
            source_confidence:
              "Name/SKU/weight/price/species confirmed from a prior site " +
              "crawl recorded in the build pack (retrieval timestamp not " +
              "stated — re-crawl required before publish). Ingredients, " +
              "feeding table, and storage instructions transcribed from " +
              "client-supplied label photo " +
              "'WhatsApp Image 2026-09-04 at 11.14.00.jpeg'.",
            nutrition_facts: "UNKNOWN — not legible/provided in source material",
            faqs: "UNKNOWN — not provided in source material",
            reviews: "UNKNOWN — not provided in source material",
            media: "UNKNOWN — no product photo URL provided; do not substitute stock imagery",
          },
          options: [
            {
              title: "Weight",
              values: ["80g"],
            },
          ],
          variants: [
            {
              title: "80g",
              sku: SKU,
              options: { Weight: "80g" },
              manage_inventory: true,
              prices: [
                {
                  amount: 249,
                  currency_code: "inr",
                },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },
      ],
    },
  });

  logger.info(`Created product ${products[0].id}.`);

  const { data: stockLocations } = await query.graph({
    entity: "stock_location",
    fields: ["id"],
  });
  const stockLocation = stockLocations[0];

  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id", "sku"],
    filters: { sku: [SKU] },
  });

  if (stockLocation && inventoryItems.length > 0) {
    await createInventoryLevelsWorkflow(container).run({
      input: {
        inventory_levels: [
          {
            location_id: stockLocation.id,
            inventory_item_id: inventoryItems[0].id,
            // Real stock quantity is UNKNOWN (not in the build pack).
            // Seeded at 0 rather than guessed — update with real
            // operational data before this product can be sold.
            stocked_quantity: 0,
          },
        ],
      },
    });
    logger.info("Created inventory level (stocked_quantity: 0 — UNKNOWN, pending operational input).");
  }

  logger.info(
    "Confirmed-catalog seed complete. Product is DRAFT and will not " +
      "appear in store-facing queries until reconciled against a fresh " +
      "live-site crawl and explicitly published."
  );
}

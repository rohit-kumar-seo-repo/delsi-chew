# Delsi Chews --- Source Catalog Seed

This is a starting index derived from the current live-site crawl and
prior project discovery. It must be revalidated against the live site
before production import.

  -------------------------------------------------------------------------------------------------
  Product                 Known source slug/path                            Notes
  ----------------------- ------------------------------------------------- -----------------------
  Dehydrated Chicken Neck /product/dehydrated-chicken-neck/                 Current homepage
                                                                            product

  Dehydrate Chicken Feet  /product/dehydrate-chicken-feet/                  Current homepage
                                                                            product

  Chicken Training Treats /product/chicken-training-treats/                 Current homepage
                                                                            product

  Chicken Protein Sticks  /product/natural-chicken-protein-sticks/          Current homepage
                                                                            product

  Dehydrated Sardine      /product/dehydrated-sardine/                      Current homepage
                                                                            product

  Chicken Jerky           /product/chicken-jerky/                           Current homepage
                                                                            product

  Beef Liver Jerky        /product/beef-liver-jerky/                        Current homepage
                                                                            product

  Beef Jerky              /product/beef-jerky/                              Current homepage
                                                                            product

  Premium Chicken Powder  /product/chicken-powder-for-dogs/                 Current homepage
                                                                            product

  Sardine Powder          /product/sardine-powder/                          Current live product
                                                                            page

  Dehydrated Sardine      /product/dehydrated-sardine-powder/               Verify whether
  Powder                                                                    duplicate/legacy naming

  Dehydrated Quail        /product/dehydrated-quail/                        Previously identified;
                                                                            revalidate

  Delsi Chew Yak Chew     /product/yakchew/                                 Previously identified;
                                                                            revalidate

  Treats Trial Combo Pack /product/treats-trial-combo-pack-for-dogs-cats/   Previously identified;
                                                                            revalidate
  -------------------------------------------------------------------------------------------------

## Confirmed example

Current live Sardine Powder page exposes: - price: ₹249 - SKU:
SKU-TM-310 - weight: 80 g - dogs and cats - product features -
ingredients - feeding instructions - storage instructions

Source: https://delsichews.com/product/sardine-powder/

## Important reconciliation note

The project has previously encountered incomplete extraction claims.
Therefore:

-   do not mark a field UNKNOWN until the live page/source has actually
    been checked
-   do not overwrite an existing SKU because a proposed naming
    convention looks cleaner
-   distinguish duplicate products from renamed/legacy products
-   retain source URLs and extraction timestamps

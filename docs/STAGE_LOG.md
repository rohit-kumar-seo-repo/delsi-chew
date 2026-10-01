# Delsi Chews — Stage Log

Fix → Build → Verify → Deploy checkpoints, per
`docs/build-pack/11_DEPLOYMENT_OPERATIONS.md` and
`docs/build-pack/14_IMPLEMENTATION_PLAN.md`. "Deploy" at this point in the
project means a verified local boot, not a hosted environment — Stage 12
owns actual staging/production deployment.

## Stage 0 — Repository and environment

**Fix**: n/a — repository was empty (0 commits, 0 files); nothing to fix.

**Build**: created monorepo layout (`apps/backend`, `apps/storefront`
placeholder), versioned the build pack under `docs/build-pack/`, local
Postgres 16 + Redis 7 (both run as native services in this environment,
not Docker — see "Environment note" below), `.env`/`.env.template`
separation, root `README.md`.

**Verify**: `git status` showed the new structure; `psql`/`redis-cli`
connected to both services.

**Deploy**: n/a (no app yet).

## Stage 1 — Commerce foundation

**Fix #1 — fake demo catalog.** `create-medusa-app`'s own
`src/migration-scripts/initial-data-seed.ts` auto-seeds a fake EU/USD
apparel catalog (T-shirts, Copenhagen warehouse) as part of `db:migrate`.
Left in place, that directly violates
`docs/build-pack/00_CLAUDE_START_HERE.md` rule 4 ("never invent missing
product facts") and configures the wrong country/currency for an
India-based brand. Rewrote the script to seed only India/INR platform
infrastructure (store, sales channel, publishable API key, region, tax
region, one placeholder-address fulfillment location) and removed every
fabricated product/category/shipping-price. Reset the local dev DB (my
own, created minutes earlier — not production data) and re-ran.

**Fix #2 — Redis silently unused.** The scaffolded `medusa-config.ts` never
registered Redis-backed cache/event-bus/locking/workflow-engine modules,
so `REDIS_URL` was ignored and Medusa fell back to in-memory/fake
implementations — contradicting
`docs/build-pack/05_BACKEND_COMMERCE_ARCHITECTURE.md`'s explicit Redis
requirement. Added `@medusajs/cache-redis`, `@medusajs/event-bus-redis`,
`@medusajs/locking-redis`, `@medusajs/workflow-engine-redis` as explicit
dependencies and wired them into `medusa-config.ts`. Working out the
correct resolve strings and option shapes (each module's runtime options
differ subtly from its own published type declarations) took three
iterations; final config verified in `apps/backend/medusa-config.ts`.

**Fix #3 — upstream version-pin bug (Yellow-tier deviation, documented
here as required).** With every `@medusajs/*` package pinned to exactly
`2.21.0` (as the build pack specifies), the server could not boot:
`@medusajs/medusa@2.21.0`'s API loader calls `configureStoreSearch` from
`@medusajs/framework/http`, but that function was not actually exported
by `@medusajs/framework@2.21.0` — confirmed by downloading and inspecting
both package tarballs directly (`configure-store-search.js` is absent in
2.21.0, present in 2.21.2). This is an upstream release-consistency bug
between two packages published together, not a configuration mistake, and
it blocks boot entirely regardless of configuration. Bumped every
`@medusajs/*` package from `2.21.0` to `2.21.2` (same minor line, latest
patch) to unblock. If an exact `2.21.0` pin is a hard requirement,
flag that back — the alternative is the application cannot start at all
on that exact version combination.

**Build**: `npx tsc --noEmit` (clean), `npm run lint` (clean, after fixing
one `@medusajs/use-medusa-error-not-generic-error` warning in the seed
script), `npm run build` (backend + admin UI compiled successfully).

**Verify**:
- `npx medusa db:migrate` — clean run against local Postgres, India region
  + INR currency + tax region + placeholder fulfillment location created,
  zero fabricated products.
- `npx medusa user` — admin user created.
- `npx medusa develop` and separately `npm run build && npm run start` —
  both boot cleanly: `Server is ready on port: 9000`, all four Redis
  modules report `Connection to Redis ... established`, search index
  seeded.
- `GET /health` → `200`.
- `GET /app` (admin UI) → `200`.
- `GET /store/products` with a valid publishable key → `200`,
  `{"products":[],"count":0}` (correctly empty — no catalog import has
  happened).
- `GET /store/regions` → India / INR region present.
- `GET /store/products` with an invalid/missing publishable key → `400`
  (confirms store API authorization is enforced server-side, per
  `docs/build-pack/09_SECURITY.md`).
- Ran `src/scripts/seed-confirmed-catalog.ts` (the one CONFIRMED product,
  Sardine Powder / SKU-TM-310 — see `docs/IMPLEMENTATION_INVENTORY.md`
  §3 for its full provenance). Verified via authenticated admin API:
  correct title, SKU, weight (80g), price (₹249 INR), species metadata,
  and an inventory level of `0` (explicitly marked UNKNOWN/pending
  operational input, not guessed). Confirmed it does **not** appear in
  `/store/products` because it is seeded as `status: draft` — it is not
  reconciled against a fresh live-site crawl, so it is not customer-facing.
  Re-ran the script a second time to confirm it is idempotent (skips on
  existing SKU).

**Deploy**: local only. Staging/production deployment is Stage 12 and
depends on infrastructure (VPS/hosting, DNS, secrets) this session has no
access to or instruction to provision.

## Environment note (this session only)

This sandbox could not run Docker (`dockerd` fails to start — `ulimit`
permission error, no systemd). `docker-compose.yml` is still provided for
contributors/environments where Docker works; this session instead used
the natively installed PostgreSQL 16 cluster (`pg_ctlcluster 16 main
start`) and Redis 7 (`redis-server --daemonize yes`) directly. Either path
produces the same `DATABASE_URL`/`REDIS_URL` shape in `.env`.

# Delsi Chews

Ecommerce platform rebuild for Delsi Chews (premium natural pet nutrition).

## Start here

- `docs/build-pack/00_CLAUDE_START_HERE.md` — the architectural
  specification this project is being built against. Read it (and the
  rest of `docs/build-pack/`) before making any architectural change.
- `docs/IMPLEMENTATION_INVENTORY.md` — current build state, what has and
  has not been done, and known blockers (notably: this execution
  environment currently cannot reach `https://delsichews.com/`, which
  Stage 2 needs).
- `docs/STAGE_LOG.md` — Fix → Build → Verify → Deploy checkpoint log per
  stage, per `11_DEPLOYMENT_OPERATIONS.md`.

## Layout

```text
apps/
  backend/     Medusa v2 commerce API (PostgreSQL 16 + Redis 7)
  storefront/  Next.js storefront (Stage 4 — not yet built)
docs/
  build-pack/  Versioned copy of the architectural spec + brand reference
  IMPLEMENTATION_INVENTORY.md
  STAGE_LOG.md
docker-compose.yml   Local Postgres 16 + Redis 7 for development only
```

## Local development

```bash
docker compose up -d                    # starts local Postgres 16 + Redis 7
                                         # (if Docker isn't available — e.g. no
                                         #  dockerd in a restricted sandbox —
                                         #  run native `postgres`/`redis-server`
                                         #  instead and point .env at them)
cp apps/backend/.env.template apps/backend/.env   # fill in local values
npm install                             # from repo root — this is a workspace
cd apps/backend
npx medusa db:migrate                   # also seeds India/INR platform infra
npx medusa user -e you@example.com -p <password>
npx medusa exec ./src/scripts/seed-confirmed-catalog.ts   # the one CONFIRMED product
npm run dev
```

## Rules this project operates under

See `docs/build-pack/18_CLAUDE_EXECUTION_RULES.md` and
`docs/build-pack/00_CLAUDE_START_HERE.md` for the full list. The short
version:

1. Never invent product facts (names, prices, SKUs, ingredients,
   nutrition, stock). Unverified fields are `UNKNOWN` or
   `NEEDS_RECONCILIATION`, not guesses.
2. The live Delsi site is the source of truth for product/content facts;
   the supplied client label photos are the source of truth for current
   packaging/brand visuals. Neither is invented or substituted with stock
   content.
3. PostgreSQL/Medusa is the transactional source of truth — not
   spreadsheets.
4. Every meaningful milestone follows Fix → Build → Verify → Deploy. A
   passing build is necessary, not sufficient, for "done."
5. Destructive or infrastructure-wide changes (DNS, firewall, credential
   rotation, destructive migrations, deleting volumes) require explicit
   approval before being taken.

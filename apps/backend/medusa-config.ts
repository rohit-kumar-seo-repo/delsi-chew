import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// Redis is a documented requirement (docs/build-pack/05_BACKEND_COMMERCE_ARCHITECTURE.md:
// "Use Redis for appropriate: caching, queues, background jobs, rate limiting,
// transient state"). Without explicitly registering these modules, Medusa
// silently falls back to in-memory cache/event-bus/locking regardless of
// REDIS_URL being set — that's a correctness gap for anything beyond a
// single dev process, so they're wired up here whenever REDIS_URL exists.
const redisUrl = process.env.REDIS_URL

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  },
  modules: redisUrl
    ? [
        {
          resolve: '@medusajs/medusa/cache-redis',
          options: { redisUrl },
        },
        {
          resolve: '@medusajs/medusa/event-bus-redis',
          options: { redisUrl },
        },
        {
          resolve: '@medusajs/medusa/locking',
          options: {
            providers: [
              {
                resolve: '@medusajs/locking-redis',
                id: 'locking-redis',
                is_default: true,
                options: { redisUrl },
              },
            ],
          },
        },
        {
          // the loader reads options.redis.redisUrl (nested), unlike the
          // other three modules which take redisUrl at the top level
          resolve: '@medusajs/medusa/workflow-engine-redis',
          options: { redis: { redisUrl } },
        },
      ]
    : [],
})

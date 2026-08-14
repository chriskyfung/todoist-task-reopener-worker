/**
 * Environment bindings for the worker.
 *
 * Extends the global `Cloudflare.Env` interface (from `@cloudflare/workers-types`)
 * with the worker's bindings. In line with the workers-types contract, these are
 * merged into the `Env` type so `env.<BINDING>` is strongly typed.
 *
 * These bindings are configured as secrets/variables: see `.dev.vars` locally and
 * `wrangler secret put` / Cloudflare dashboard for production.
 */
declare namespace Cloudflare {
  interface Env {
    TODOIST_API_TOKEN: string;
    CRON_SECRET_TOKEN: string;
  }
}

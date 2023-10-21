import type { MiddlewareHandler } from 'hono/mod.ts'

export interface Options {
  from?: URL
  to: URL
}

export const hatsuServe = (options: Options): MiddlewareHandler => {
  return async (ctx, next) => {
    // const url = new URL(ctx.req.url)

    await next()
  }
}

export default hatsuServe

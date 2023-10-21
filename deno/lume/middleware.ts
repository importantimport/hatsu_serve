import type { Middleware } from 'lume/core.ts'

export interface Options {
  from?: URL
  to: URL
  // TODO: match?: string[]
}

export default (options: Options): Middleware => {
  return async (req, next) => {
    const url = new URL(req.url)

    if (url.pathname.startsWith('/.well_known')) {
      return new Response(null, {
        status: 308, // permanent
        headers: {
          location: new URL(url.pathname + url.search, options.to).href,
        },
      })
    } else if (
      ['application/activity+json', 'application/ld+json']
        .some((accept) => req.headers.get('accept')?.includes(accept))
    ) {
      return new Response(null, {
        status: 307, // temporary
        headers: {
          // TODO: test
          location: new URL(
            options.from?.host ?? url.host + url.pathname + url.search,
            new URL('/o/', options.to).href,
          ).href,
        },
      })
    }

    return await next(req)
  }
}

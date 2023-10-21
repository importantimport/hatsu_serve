import type { Middleware } from 'lume/core.ts'

export interface Options {
  from?: URL
  to: URL
  // TODO: match?: string[]
}

export const hatsuServe = (options: Options): Middleware => {
  return async (req, next) => {
    const url = new URL(req.url)

    const matchWellKnown = url.pathname.startsWith('/.well-known')
    const matchAccept = ['application/activity+json', 'application/ld+json']
      .some((accept) => req.headers.get('accept')?.includes(accept))

    // pass
    if (!matchWellKnown && !matchAccept) {
      return await next(req)
    } // .well-known
    if (matchWellKnown) {
      return Response.redirect(
        new URL(url.pathname + url.search, options.to).href,
        // 308,
        307,
      )
    } // accept: activity+json / ld+json
    else {
      const dest = new URL(
        options.from?.origin ?? url.origin + url.pathname + url.search,
        new URL('/o/', options.to).href,
      ).href

      // TODO: remove this
      console.log(dest)

      // TODO: test this
      return Response.redirect(dest, 307)
    }
  }
}

export default hatsuServe

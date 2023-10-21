# Hatsu Serve

Server-side middleware for automated request forwarding to [Hatsu](https://github.com/importantimport/hatsu) instance. [WIP]

## Why

Hatsu requires the target site to redirects `.well-known`.

While you can do this by `_redirects`, `netlify.toml`, or `vercel.json`, Hatsu Serve can go further:

> ```ts
> hatsuServe({ from: new URL('https://example.com'), to: new URL('https://hatsu.local') })
> ```

- Automatically redirects `.well-known`
  - `https://example.com/.well-known/webfinger?resource=acct:example.com@example.com` => `https://hatsu.local/.well-known/webfinger?resource=acct:example.com@example.com`
  - `https://example.com/.well-known/host-meta` => `https://hatsu.local/.well-known/host-meta`
- Automatically redirects to Hatsu object when Request Header `Accept` include `application/activity+json` (AS2) or `application/ld+json` (JSON-LD)
  - `https://example.com/hello-world` => `https://hatsu.local/o/https://example.com/hello-world`

## Packages / Modules

### [Deno](/deno/)

#### [Lume](/deno/lume/) [WIP]

```jsonc
// import_map.json
{
  "imports": {
    "hatsu_serve/": "https://deno.land/x/hatsu_serve/",
    "lume/": "https://deno.land/x/lume/"
  }
}
```

```ts
// serve.ts
import Server from 'lume/core/server.ts'
import hatsuServe from 'hatsu_serve/lume/middleware.ts'

const server = new Server({
  port: 8000,
  root: `${Deno.cwd()}/_site`,
})

server.use(hatsuServe({ to: new URL('https://hatsu.local') }))

server.start()
```

#### [Hono](/deno/hono/) [WIP]

```jsonc
// import_map.json
{
  "imports": {
    "hatsu_serve/": "https://deno.land/x/hatsu_serve/",
    "hono/": "https://deno.land/x/hono/"
  }
}
```

```ts
// serve.ts
import { Hono } from 'hono'
import { serveStatic } from 'hono/middleware.ts'
import { hatsuServe } from 'hatsu_serve/hono/middleware.ts'

const app = new Hono()

app.use('*', hatsuServe({ to: new URL('https://hatsu.local') }))
app.get('*', serveStatic({ root: './dist' }))

Deno.serve(app.fetch, { port: 8000 })
```

### Node

#### Hono [WIP]

<!-- ```ts
import { hatsuServe } from '@hatsu-serve/hono'
import { Hono } from 'hono'

const app = new Hono()

// app.get('/.well-known/*', wellKnown())
// app.use('*', hatsuServe({ to: new URL('https://hatsu.local') }))

export default app
``` -->

### Bun

#### Elysia [TODO]

## License

Licensed under [AGPLv3](/LICENSE).

# Hatsu Serve

Server-side middleware for automated request forwarding to Hatsu instance. [WIP]

## Packages / Modules

### Deno

#### Lume [WIP]

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

#### Hono [WIP]

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
import { hatsuServe } from 'hatsu_serve/hono/middleware.ts'
import { Hono } from 'hono'

const app = new Hono()

// app.get('/.well-known/*', wellKnown())
app.use(
  '*',
  hatsuServe({
    from: new URL('https://example.com'),
    to: new URL('https://hatsu.local'),
  })
)

export default app
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

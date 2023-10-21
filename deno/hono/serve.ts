import { Hono } from 'hono/mod.ts'
import { serveStatic } from 'hono/middleware.ts'
import { hatsuServe } from './middleware.ts'

const app = new Hono()

app.use(
  '*',
  hatsuServe({
    from: new URL('https://example.com'),
    to: new URL('https://hatsu.local'),
  }),
)
app.get('*', serveStatic({ root: './' }))

Deno.serve(app.fetch)

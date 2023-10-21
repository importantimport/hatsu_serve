import Server from 'lume/core/server.ts'
import { hatsuServe } from './middleware.ts'

const server = new Server({
  port: 8000,
  root: Deno.cwd(),
})

server.use(hatsuServe({ to: new URL('https://hatsu.local') }))
// server.use(hatsuServe({ to: new URL('https://fosstodon.org') }))

server.start()

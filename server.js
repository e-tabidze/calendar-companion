const HOSTNAME = '127.0.0.1'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {APP_PORT} = require('./src/env')

const PORT = APP_PORT | '3000'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const next = require('next')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const routes = require('./routes')

const app = next({ dev: process.env.NODE_ENV === 'dev' })
const handler = routes.getRequestHandler(app)

;(async () => {
  await app.prepare()
  const server = express()

  server.get('*', (req, res) => handler(req, res))

  await server.listen(PORT, HOSTNAME)
  console.log('> Ready on http://localhost:' + PORT)
})()

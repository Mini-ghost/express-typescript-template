import consola from 'consola'
import express from 'express'
import bodyParser from 'body-parser'

import resolveEnv from './resolveEnv'
import { apiRouter } from './router'

const env = resolveEnv()
Object.assign(process.env, env)

const app = express()
const port = parseInt(process.env.SERVER_PORT as string, 10) || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', apiRouter)

app.listen(port, () => { 
  consola.ready({
    message: `TypeScript Server listening on http://localhost:${port}`,
    badge: true
  })
  consola.success(process.env.NODE_ENV)
})

import { Router } from 'express'
import type { RequestHandler } from 'express'

export interface RoutesConfig {
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
  path: string | RegExp | Array<string | RegExp>;
  middleware?: RequestHandler[]
  action: RequestHandler
}

const router = Router()

export const createRouter = (routes: RoutesConfig[]) => {
  routes.forEach(({ method, path, middleware = [], action }) => {
    router[method](path, ...middleware, action)
  })

  return router
}
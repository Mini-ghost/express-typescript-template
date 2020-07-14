import type { RoutesConfig } from './createRouter'
import { UUID_REGEXP } from './../utils/index'

export const routes: RoutesConfig[] = [
  {
    method: 'get',
    path: '',
    action: (req, res) => {
      res.send(req.headers["user-agent"])
    }
  },
  {
    method: 'get',
    // 用正規表達式篩選數字 id
    path: '/:id(\\d+)?',
    action: (req, res) => res.send(req.params.id)
  },
  {
    method: 'get',
    path: '/list/',
    // 中間件
    middleware: [
      (req, res, next) => {
        req.body.title = 'all lis'
        next()
      },
      (req, res, next) => {
        req.body.content = 'this is middleware'
        next()
      }
    ],
    action: (req, res) => {
      const { title, content } = req.body as {[key: string]: string}
      res.send(title + ', ' + content)
    }
  },
  {
    method: 'get',
    // 用正規表達式篩選 uuid 字串
    // 像是
    // 3b241101-e2bb-4255-8caf-4136c566a962
    // 04060e46-a46c-4165-9afb-0352bc2aabd8
    path: `/list/:uuid(${UUID_REGEXP})`,
    action: (req, res) => res.send(`list of uuid is: ${req.params.uuid}`)
  }
]


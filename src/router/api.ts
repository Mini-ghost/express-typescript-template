import { Router } from 'express'
import { UUID_REGEXP } from './../utils/index'

export const router = Router()

router.get('/', (req, res) => {
  res.send(req.headers["user-agent"])
})

router.get('/:id(\\d+)?', (req, res) => {
  res.send(req.params.id)
})

router.get('/list/',
  // middleware 中間件
  (req, res, next) => {
    req.body.title = 'all lis'
    next()
  },
  (req, res, next) => {
    req.body.content = 'this is middleware'
    next()
  },
  (req, res) => {
    const { title, content } = req.body as {[key: string]: string}
    res.send(title + ', ' + content)
  }
)

// 用正規表達式篩選 uuid 字串
// 像是
// 3b241101-e2bb-4255-8caf-4136c566a962
// 04060e46-a46c-4165-9afb-0352bc2aabd8
router.get(`/list/:uuid(${UUID_REGEXP})`, (req, res) => {
  res.send(`list of uuid is: ${req.params.uuid}`)
})


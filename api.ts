import express from 'express'
const app = express()
if (process.env.NODE_ENV != 'production') require('dotenv').config()
import { middleware } from '@line/bot-sdk'
import { handleEvent } from './src/index'
import { Request, Response } from 'express/index'
import { MiddlewareConfig } from '@line/bot-sdk/lib/types'
import { shareController } from './src/liff/share'
import cors from 'cors'
import { FlexResponse } from './types/flexTemplate'

const { CHANNEL_SECRET, CHANNEL_ACCESS_TOKEN, CONCAT_ID } = process.env
const lineConfig: MiddlewareConfig = {
  channelAccessToken: CHANNEL_ACCESS_TOKEN || '',
  channelSecret: CHANNEL_SECRET || '',
}
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}
// console.log('CORS setting: ', corsOptions)

app.use(cors(corsOptions))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
app.get('/liff', (req: Request, res: Response) => {
  res.json({ liffId: CONCAT_ID })
})
app.get('/liff/share', (req: Request, res: Response) => {
  const data: FlexResponse = shareController(req)
  res.json(data)
})

app.post('/webhooks/line', middleware(lineConfig), (req: Request, res: Response) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err)
      res.status(500).end()
    })
})

export default app

import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import apiRoutes from './routes'
import { sendResponse } from './utils'

const app = express()

// 中间件
app.use(cors())
app.use(bodyParser.json())

// API路由
app.use('/api', apiRoutes)

// 404处理
app.use((req, res) => {
  sendResponse(res, 404, '接口不存在')
})

export default app

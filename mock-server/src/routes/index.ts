import { Router } from 'express'
import authRoutes from './auth'
import chatRoutes from './chat'

const router = Router()

// 挂载路由
router.use('/auth', authRoutes)
router.use('/talklist', chatRoutes)

export default router

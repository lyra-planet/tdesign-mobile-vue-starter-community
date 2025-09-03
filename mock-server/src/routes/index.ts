import { Router } from 'express'
import authRoutes from './auth'
import chatRoutes from './chat'
import datacenterRoutes from './datacenter'
import homeRoutes from './home'
import profileRoutes from './profile'

const router = Router()

// 挂载路由
router.use('/auth', authRoutes)
router.use('/talklist', chatRoutes)
router.use('/datacenter', datacenterRoutes)
router.use('/home', homeRoutes)
router.use('/profile', profileRoutes)

export default router

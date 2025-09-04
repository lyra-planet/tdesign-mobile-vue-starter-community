import { Router } from 'express'
import { ProfileController } from '../controllers/ProfileController'

const router = Router()

// 获取个人页面服务数据
router.get('/services', ProfileController.getProfileServices)

// 获取用户统计数据
router.get('/stats', ProfileController.getUserStats)

// 记录服务点击
router.post('/service-click', ProfileController.trackServiceClick)

export default router

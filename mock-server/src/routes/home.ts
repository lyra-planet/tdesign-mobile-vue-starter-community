import { Router } from 'express'
import { HomeController } from '../controllers/HomeController'

const router = Router()

// 获取首页内容
router.get('/content', HomeController.getHomeContent)

// 获取指定内容详情
router.get('/content/:id', HomeController.getContentDetail)

// 刷新首页内容
router.post('/refresh', HomeController.refreshHomeContent)

export default router

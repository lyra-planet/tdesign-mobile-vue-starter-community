import { Router } from 'express'
import { DataCenterController } from '../controllers/DataCenterController'

const router = Router()

// 获取数据中心统计数据
router.get('/stats', DataCenterController.getDataCenterStats)

export default router

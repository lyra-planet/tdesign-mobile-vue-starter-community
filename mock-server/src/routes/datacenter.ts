import { Router } from 'express'
import { DataCenterController } from '../controllers/DataCenterController'

const router = Router()

// 获取数据中心统计数据
router.get('/stats', DataCenterController.getDataCenterStats)

// 获取指定视频详情
router.get('/video/:id', DataCenterController.getVideoDetail)

export default router

import type { Request, Response } from 'express'
import { regionColumns, videoStatistics } from '../data/datacenter'
import { sendResponse } from '../utils/response'

export class DataCenterController {
  // 获取数据中心统计数据
  static async getDataCenterStats(req: Request, res: Response): Promise<void> {
    try {
      const response = {
        regionData: videoStatistics,
        regionColumns,
      }

      sendResponse(res, 200, '获取数据中心统计数据成功', response)
    }
    catch (error) {
      console.error('获取数据中心统计数据失败:', error)
      sendResponse(res, 500, '获取数据中心统计数据失败')
    }
  }

  // 获取指定视频的详细数据
  static async getVideoDetail(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const videoIndex = Number.parseInt(id, 10)

      const video = videoStatistics.find(v => v.index === videoIndex)

      if (!video) {
        sendResponse(res, 404, '视频不存在')
        return
      }

      sendResponse(res, 200, '获取视频详情成功', video)
    }
    catch (error) {
      console.error('获取视频详情失败:', error)
      sendResponse(res, 500, '获取视频详情失败')
    }
  }
}

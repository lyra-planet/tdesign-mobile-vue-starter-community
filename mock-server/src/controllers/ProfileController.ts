import type { Request, Response } from 'express'
import { menuItems, serviceGroups, userStats } from '../data/profile'
import { sendResponse } from '../utils/response'

export class ProfileController {
  // 获取个人页面服务数据
  static async getProfileServices(req: Request, res: Response): Promise<void> {
    try {
      const response = {
        serviceGroups,
        menuItems,
      }

      sendResponse(res, 200, '获取个人服务数据成功', response)
    }
    catch (error) {
      console.error('获取个人服务数据失败:', error)
      sendResponse(res, 500, '获取个人服务数据失败')
    }
  }

  // 获取用户统计数据
  static async getUserStats(req: Request, res: Response): Promise<void> {
    try {
      // 这里可以根据用户ID获取真实的统计数据
      const { userId } = req.query

      // 模拟根据用户获取不同的统计数据
      let stats = [...userStats]
      if (userId) {
        // 可以根据用户ID返回不同的统计数据
        stats = stats.map(stat => ({
          ...stat,
          count: Math.floor(Math.random() * 20), // 模拟随机数据
        }))
      }

      sendResponse(res, 200, '获取用户统计数据成功', { stats })
    }
    catch (error) {
      console.error('获取用户统计数据失败:', error)
      sendResponse(res, 500, '获取用户统计数据失败')
    }
  }

  // 更新用户统计数据
  static async updateUserStats(req: Request, res: Response): Promise<void> {
    try {
      const { statKey, increment = 1 } = req.body

      // 查找对应的统计项
      const statIndex = userStats.findIndex(stat => stat.key === statKey)

      if (statIndex === -1) {
        sendResponse(res, 404, '统计项不存在')
        return
      }

      // 更新统计数据
      userStats[statIndex].count += increment

      sendResponse(res, 200, '更新统计数据成功', {
        stat: userStats[statIndex],
      })
    }
    catch (error) {
      console.error('更新统计数据失败:', error)
      sendResponse(res, 500, '更新统计数据失败')
    }
  }

  // 点击服务项统计
  static async trackServiceClick(req: Request, res: Response): Promise<void> {
    try {
      const { serviceName, serviceType } = req.body

      // 这里可以记录用户的服务点击行为
      console.log(`用户点击了服务: ${serviceName}, 类型: ${serviceType}`)

      sendResponse(res, 200, '服务点击记录成功', {
        serviceName,
        serviceType,
        timestamp: new Date().toISOString(),
      })
    }
    catch (error) {
      console.error('记录服务点击失败:', error)
      sendResponse(res, 500, '记录服务点击失败')
    }
  }
}

import type { Request, Response } from 'express'
import { homeItems } from '../data/home'
import { sendResponse } from '../utils/response'

export class HomeController {
  // 获取首页内容
  static async getHomeContent(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query
      const pageNum = Number.parseInt(page as string, 10)
      const limitNum = Number.parseInt(limit as string, 10)

      const startIndex = (pageNum - 1) * limitNum
      const endIndex = startIndex + limitNum

      const paginatedItems = homeItems.slice(startIndex, endIndex)

      const response = {
        items: paginatedItems,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: homeItems.length,
          totalPages: Math.ceil(homeItems.length / limitNum),
          hasMore: endIndex < homeItems.length,
        },
      }

      sendResponse(res, 200, '获取首页内容成功', response)
    }
    catch (error) {
      console.error('获取首页内容失败:', error)
      sendResponse(res, 500, '获取首页内容失败')
    }
  }

  // 刷新首页内容（模拟下拉刷新）
  static async refreshHomeContent(req: Request, res: Response): Promise<void> {
    try {
      // 模拟刷新延迟
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 这里可以模拟获取最新的内容
      const refreshedItems = [...homeItems].sort(() => Math.random() - 0.5) // 随机排序模拟新内容

      const response = {
        items: refreshedItems.slice(0, 10), // 返回前10条
        refreshTime: new Date().toISOString(),
      }

      sendResponse(res, 200, '刷新成功', response)
    }
    catch (error) {
      console.error('刷新首页内容失败:', error)
      sendResponse(res, 500, '刷新失败')
    }
  }
}

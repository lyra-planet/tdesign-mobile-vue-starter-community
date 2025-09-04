import type { Request, Response } from 'express'
import { ChatService } from '../services'
import { sendResponse } from '../utils'

export class ChatController {
  // 获取聊天列表
  static getTalkList(req: Request, res: Response): void {
    const talklist = ChatService.getTalkList()
    sendResponse(res, 200, '获取聊天列表成功', talklist)
  }

  // 根据ID获取聊天详情
  static getChatById(req: Request, res: Response): void {
    const { id } = req.params
    const chat = ChatService.getChatById(id)

    if (!chat) {
      return sendResponse(res, 404, '聊天记录不存在')
    }

    sendResponse(res, 200, '获取聊天详情成功', chat)
  }

  // 发送消息到指定聊天
  static sendMessage(req: Request, res: Response): void {
    const { id } = req.params
    const { message } = req.body

    if (!message) {
      return sendResponse(res, 400, '消息内容不能为空')
    }

    const result = ChatService.sendMessage(id, message)

    if (result.success) {
      sendResponse(res, 200, result.message, result.data)
    }
    else {
      const statusCode = result.message === '聊天记录不存在' ? 404 : 400
      sendResponse(res, statusCode, result.message)
    }
  }

  // 标记聊天为已读
  static markAsRead(req: Request, res: Response): void {
    const { id } = req.params
    const result = ChatService.markChatAsRead(id)

    if (result.success) {
      sendResponse(res, 200, result.message, result.data)
    }
    else {
      sendResponse(res, 404, result.message)
    }
  }

  // 获取未读消息总数
  static getUnreadCount(req: Request, res: Response): void {
    const result = ChatService.getUnreadCount()
    sendResponse(res, 200, result.message, result.data)
  }

  // 获取最近消息
  static getRecentMessages(req: Request, res: Response): void {
    const limit = Number.parseInt(req.query.limit as string) || 10
    const result = ChatService.getRecentMessages(limit)
    sendResponse(res, 200, result.message, result.data)
  }

  // 删除消息
  static deleteMessage(req: Request, res: Response): void {
    const { id, messageId } = req.params
    const result = ChatService.deleteMessage(id, messageId)

    if (result.success) {
      sendResponse(res, 200, result.message)
    }
    else {
      const statusCode = result.message === '聊天记录不存在' ? 404 : 400
      sendResponse(res, statusCode, result.message)
    }
  }

  // 清空聊天记录
  static clearChatHistory(req: Request, res: Response): void {
    const { id } = req.params
    const result = ChatService.clearChatHistory(id)

    if (result.success) {
      sendResponse(res, 200, result.message)
    }
    else {
      sendResponse(res, 404, result.message)
    }
  }
}

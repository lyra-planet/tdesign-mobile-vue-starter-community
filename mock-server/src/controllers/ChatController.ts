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
}

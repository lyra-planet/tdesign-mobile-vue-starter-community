import type { Chat, ChatMessage } from '../models'
import { talklist } from '../data'

export class ChatService {
  // 获取聊天列表
  static getTalkList(): Chat[] {
    return talklist
  }

  // 根据ID获取聊天详情
  static getChatById(id: string): Chat | null {
    return talklist.find(item => item.id === id) || null
  }

  // 发送消息到指定聊天
  static sendMessage(chatId: string, message: string): { success: boolean, message: string, data?: ChatMessage } {
    if (!message || !message.trim()) {
      return { success: false, message: '消息内容不能为空' }
    }

    const chat = talklist.find(item => item.id === chatId)
    if (!chat) {
      return { success: false, message: '聊天记录不存在' }
    }

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      tag: 'me',
      value: message.trim(),
    }

    chat.message.push(newMessage)

    return {
      success: true,
      message: '消息发送成功',
      data: newMessage,
    }
  }

  // 标记聊天为已读
  static markChatAsRead(chatId: string): { success: boolean, message: string, data?: { id: string, count: number } } {
    const chat = talklist.find(item => item.id === chatId)

    if (!chat) {
      return { success: false, message: '聊天记录不存在' }
    }

    chat.count = 0

    return {
      success: true,
      message: '标记为已读成功',
      data: { id: chatId, count: 0 },
    }
  }

  // 获取未读消息总数
  static getUnreadCount(): { success: boolean, message: string, data: { count: number } } {
    const totalCount = talklist.reduce((acc, chat) => acc + (chat.count || 0), 0)

    return {
      success: true,
      message: '获取未读消息总数成功',
      data: { count: totalCount },
    }
  }
}

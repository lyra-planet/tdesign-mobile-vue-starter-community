import type { Chat, ChatMessage } from '../models'
import { talklist } from '../data'

export class ChatService {
  // 获取聊天列表
  static getTalkList(): Chat[] {
    // 按照未读消息数量排序，未读多的在前
    return talklist.sort((a, b) => (b.count || 0) - (a.count || 0))
  }

  // 根据ID获取聊天详情
  static getChatById(id: string): Chat | null {
    const chat = talklist.find(item => item.id === id)
    if (!chat) {
      return null
    }

    // 返回聊天详情时，按时间排序消息
    const sortedChat = {
      ...chat,
      message: [...chat.message].sort((a, b) => a.time - b.time),
    }

    return sortedChat
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
      time: Date.now(),
    }

    chat.message.push(newMessage)

    // 模拟对方回复（可选，用于测试）
    setTimeout(() => {
      const autoReply: ChatMessage = {
        id: (Date.now() + Math.random()).toString(),
        tag: 'other',
        value: `收到您的消息："${message.trim()}"，这是自动回复。`,
        time: Date.now(),
      }
      chat.message.push(autoReply)

      // 增加未读消息数
      chat.count = (chat.count || 0) + 1
    }, 1000 + Math.random() * 2000) // 1-3秒后回复

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

    const previousCount = chat.count || 0
    chat.count = 0

    return {
      success: true,
      message: `标记为已读成功，清除了 ${previousCount} 条未读消息`,
      data: { id: chatId, count: 0 },
    }
  }

  // 获取未读消息总数
  static getUnreadCount(): { success: boolean, message: string, data: { count: number, details: Array<{ id: string, name: string, count: number }> } } {
    const totalCount = talklist.reduce((acc, chat) => acc + (chat.count || 0), 0)

    // 获取有未读消息的聊天详情
    const unreadChats = talklist
      .filter(chat => (chat.count || 0) > 0)
      .map(chat => ({
        id: chat.id,
        name: chat.name,
        count: chat.count || 0,
      }))

    return {
      success: true,
      message: `当前共有 ${totalCount} 条未读消息`,
      data: {
        count: totalCount,
        details: unreadChats,
      },
    }
  }

  // 添加新的方法：获取最近消息
  static getRecentMessages(limit: number = 10): { success: boolean, message: string, data: Array<{ chatId: string, chatName: string, lastMessage: ChatMessage }> } {
    const recentMessages = talklist
      .map((chat) => {
        if (chat.message.length === 0) {
          return null
        }

        // 获取最后一条消息
        const lastMessage = chat.message
          .sort((a, b) => b.time - a.time)[0]

        return {
          chatId: chat.id,
          chatName: chat.name,
          lastMessage,
        }
      })
      .filter(item => item !== null)
      .sort((a, b) => b!.lastMessage.time - a!.lastMessage.time)
      .slice(0, limit)

    return {
      success: true,
      message: '获取最近消息成功',
      data: recentMessages as Array<{ chatId: string, chatName: string, lastMessage: ChatMessage }>,
    }
  }

  // 添加新的方法：删除消息
  static deleteMessage(chatId: string, messageId: string): { success: boolean, message: string } {
    const chat = talklist.find(item => item.id === chatId)

    if (!chat) {
      return { success: false, message: '聊天记录不存在' }
    }

    const messageIndex = chat.message.findIndex(msg => msg.id === messageId)

    if (messageIndex === -1) {
      return { success: false, message: '消息不存在' }
    }

    chat.message.splice(messageIndex, 1)

    return {
      success: true,
      message: '消息删除成功',
    }
  }

  // 添加新的方法：清空聊天记录
  static clearChatHistory(chatId: string): { success: boolean, message: string } {
    const chat = talklist.find(item => item.id === chatId)

    if (!chat) {
      return { success: false, message: '聊天记录不存在' }
    }

    const messageCount = chat.message.length
    chat.message = []
    chat.count = 0

    return {
      success: true,
      message: `聊天记录清空成功，删除了 ${messageCount} 条消息`,
    }
  }
}

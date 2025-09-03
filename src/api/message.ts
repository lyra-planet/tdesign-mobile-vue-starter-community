import type { ApiResponse, Chat, MarkAsReadResponse, SendMessageRequest, SendMessageResponse } from './types'
import { get, post, put } from '@/api/request'

// 获取聊天列表
export async function getTalkList(): Promise<ApiResponse<Chat[]>> {
  return get('/talklist')
}

// 根据ID获取聊天详情
export async function getChatById(id: string): Promise<ApiResponse<Chat>> {
  return get(`/talklist/${id}`)
}

// 发送消息到指定聊天
export async function sendMessage(chatId: string, params: SendMessageRequest): Promise<ApiResponse<SendMessageResponse>> {
  return post(`/talklist/${chatId}/message`, params)
}

// 标记聊天为已读
export async function markAsRead(chatId: string): Promise<ApiResponse<MarkAsReadResponse>> {
  return put(`/talklist/${chatId}/read`)
}

// 获取未读消息总数
export async function getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
  return get('/talklist/unread-count')
}

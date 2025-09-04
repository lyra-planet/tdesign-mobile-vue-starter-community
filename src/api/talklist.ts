import { get, post, put } from '@/api/request'

export interface Message {
  id: string
  tag: 'me' | 'other'
  value: string
  time: number
}

export interface TalkItem {
  id: string
  picture: string
  count: number
  name: string
  message: Message[]
}

// 获取聊天列表
export async function getTalkList() {
  return get('/talklist')
}

// 获取聊天详情
export async function getTalkDetail(id: string) {
  return get(`/talklist/${id}`)
}

// 发送消息
export async function sendMessage(id: string, message: string) {
  return post(`/talklist/${id}/message`, { message })
}

// 标记为已读
export async function markAsRead(id: string) {
  return put(`/talklist/${id}/read`)
}

import type { Chat } from '../api/types'
import { reactive, ref } from 'vue'
import { chatApi } from '../api/chat'

export const talklist = reactive<Chat[]>([])
export const isLoading = ref(false)
export const error = ref<string | null>(null)

export async function loadTalkList(): Promise<void> {
  try {
    isLoading.value = true
    error.value = null

    const response = await chatApi.getTalkList()

    if (response.success && response.data) {
      // 清空现有数据并添加新数据
      talklist.splice(0, talklist.length, ...response.data)
    }
    else {
      error.value = response.message || '获取聊天列表失败'
    }
  }
  catch (err) {
    error.value = '网络连接失败'
    console.error('加载聊天列表失败:', err)
  }
  finally {
    isLoading.value = false
  }
}

export async function markChatAsRead(chatId: string): Promise<boolean> {
  try {
    const response = await chatApi.markAsRead(chatId)

    if (response.success && response.data) {
      // 更新本地数据
      const chat = talklist.find(item => item.id === chatId)
      if (chat) {
        chat.count = 0
      }
      return true
    }
    return false
  }
  catch (err) {
    console.error('标记已读失败:', err)
    return false
  }
}

export async function sendMessage(chatId: string, message: string): Promise<boolean> {
  try {
    const response = await chatApi.sendMessage(chatId, message)

    if (response.success && response.data) {
      // 更新本地数据
      const chat = talklist.find(item => item.id === chatId)
      if (chat) {
        chat.message.push({
          id: response.data.id,
          tag: response.data.tag,
          value: response.data.value,
        })
      }
      return true
    }
    return false
  }
  catch (err) {
    console.error('发送消息失败:', err)
    return false
  }
}

export async function getUnreadCount(): Promise<number> {
  try {
    const response = await chatApi.getUnreadCount()

    if (response.success && response.data) {
      return response.data.count
    }
    return 0
  }
  catch (err) {
    console.error('获取未读消息数失败:', err)
    return 0
  }
}

export default talklist

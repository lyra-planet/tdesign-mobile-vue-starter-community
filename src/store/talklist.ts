import type { TalkItem } from '@/api/talklist'
import { reactive } from 'vue'

// 原始数据（作为备用数据）
const initialTalklist: TalkItem[] = [
  {
    id: '1',
    picture: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    count: 4,
    name: 'Pite',
    message: [
      {
        id: '1',
        tag: 'other',
        value: '那明天准时见哦',
        time: new Date('2024-01-01 09:00:00').getTime(),
      },
      {
        id: '2',
        tag: 'me',
        value: '好的，我会记得的',
        time: new Date('2024-01-01 09:02:00').getTime(),
      },
      {
        id: '3',
        tag: 'me',
        value: '在吗？',
        time: new Date('2024-01-01 10:45:00').getTime(),
      },
      {
        id: '5',
        tag: 'other',
        value: '有个问题想咨询一下，关于Tdesign组件库如何更好的使用',
        time: new Date('2024-01-01 10:50:00').getTime(),
      },
      {
        id: '6',
        tag: 'me',
        value: '你请问',
        time: new Date('2024-01-01 10:51:00').getTime(),
      },
    ],
  },
  {
    id: '2',
    picture: 'https://tdesign.gtimg.com/mobile/demos/avatar2.png',
    count: 2,
    name: 'Bob',
    message: [
      {
        id: '1',
        tag: 'other',
        value: '那明天准时见哦',
        time: new Date('2024-01-01 09:00:00').getTime(),
      },
      {
        id: '2',
        tag: 'me',
        value: '好的，我会记得的',
        time: new Date('2024-01-01 09:02:00').getTime(),
      },
      {
        id: '3',
        tag: 'me',
        value: '在吗？',
        time: new Date('2024-01-01 10:45:00').getTime(),
      },
      {
        id: '5',
        tag: 'other',
        value: '有个问题想咨询一下，关于Tdesign组件库如何更好的使用',
        time: new Date('2024-01-01 10:50:00').getTime(),
      },
    ],
  },
  {
    id: '3',
    picture: 'https://tdesign.gtimg.com/mobile/demos/avatar3.png',
    count: 6,
    name: 'Alice',
    message: [
      {
        id: '1',
        tag: 'other',
        value: '那明天准时见哦',
        time: new Date('2024-01-01 09:00:00').getTime(),
      },
      {
        id: '2',
        tag: 'me',
        value: '好的，我会记得的',
        time: new Date('2024-01-01 09:02:00').getTime(),
      },
      {
        id: '3',
        tag: 'me',
        value: '在吗？',
        time: new Date('2024-01-01 10:45:00').getTime(),
      },
      {
        id: '5',
        tag: 'other',
        value: '有个问题想咨询一下，关于Tdesign组件库如何更好的使用',
        time: new Date('2024-01-01 10:50:00').getTime(),
      },
    ],
  },
]

// 时间格式化工具函数
export function formatMessageTime(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  if (messageDate.getTime() === today.getTime()) {
    return `今天 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  else if (messageDate.getTime() === yesterday.getTime()) {
    return `昨天 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  else {
    return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
}

// 判断是否需要显示时间分隔符（超过5分钟显示）
export function shouldShowTimeDivider(currentTime: number, previousTime?: number): boolean {
  if (!previousTime) {
    return true // 第一条消息总是显示时间
  }
  const timeDiff = currentTime - previousTime
  return timeDiff > 5 * 60 * 1000 // 5分钟
}

// 创建响应式的数据
export const talklist = reactive(initialTalklist)

// 从API加载聊天列表数据的函数
export async function loadTalkList() {
  try {
    const { getTalkList } = await import('@/api/talklist')
    const response = await getTalkList()

    if (response.success && response.data) {
      // 清空当前数据并替换为API数据
      talklist.splice(0, talklist.length, ...response.data)
    }
    else {
      console.warn('API返回失败，使用本地数据:', response.message)
    }
  }
  catch (error) {
    console.warn('加载聊天数据失败，使用本地数据:', error)
  }
}

// 根据ID获取聊天详情的函数
export async function loadChatDetail(id: string) {
  try {
    const { getTalkDetail } = await import('@/api/talklist')
    const response = await getTalkDetail(id)

    if (response.success && response.data) {
      // 更新对应的聊天记录
      const index = talklist.findIndex(item => item.id === id)
      if (index !== -1) {
        talklist[index] = response.data
      }
      return response.data
    }
    else {
      console.warn('获取聊天详情失败:', response.message)
      return talklist.find(item => item.id === id) || null
    }
  }
  catch (error) {
    console.warn('获取聊天详情出错:', error)
    return talklist.find(item => item.id === id) || null
  }
}

// 导出默认值（保持兼容性）
export default talklist

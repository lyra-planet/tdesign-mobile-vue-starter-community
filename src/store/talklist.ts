import { reactive } from 'vue'

// 原始数据
const initialTalklist = [
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

// 导出默认值（保持兼容性）
export default talklist

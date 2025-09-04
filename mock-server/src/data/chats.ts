import type { Chat } from '../models'

// 聊天列表数据
export const talklist: Chat[] = [
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

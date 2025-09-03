import type { HomeItem } from '../models/Home'

// 首页内容数据
export const homeItems: HomeItem[] = [
  {
    type: 'card',
    id: 1,
    title: '人工智能艺术作品展示',
    image: 'https://tdesign.gtimg.com/mobile/demos/example1.png',
    tags: [
      { label: 'AI艺术', theme: 'primary' },
      { label: '版权素材', theme: 'success' },
    ],
  },
  {
    type: 'swiper',
    id: 2,
    images: [
      'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
      'https://tdesign.gtimg.com/mobile/demos/swiper2.png',
      'https://tdesign.gtimg.com/mobile/demos/swiper3.png',
      'https://tdesign.gtimg.com/mobile/demos/swiper4.png',
      'https://tdesign.gtimg.com/mobile/demos/swiper5.png',
    ],
  },
  {
    type: 'card',
    id: 3,
    title: '创意设计灵感分享',
    image: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
    tags: [
      { label: 'AI艺术', theme: 'primary' },
      { label: '版权素材', theme: 'success' },
    ],
  },
  {
    type: 'card',
    id: 4,
    title: '数字化艺术创作教程',
    image: 'https://tdesign.gtimg.com/mobile/demos/example3.png',
    tags: [
      { label: 'AI艺术', theme: 'primary' },
      { label: '版权素材', theme: 'success' },
    ],
  },
  {
    type: 'card',
    id: 5,
    title: '视觉设计趋势解析',
    image: 'https://tdesign.gtimg.com/mobile/demos/example4.png',
    tags: [
      { label: 'AI艺术', theme: 'primary' },
      { label: '版权素材', theme: 'success' },
    ],
  },
  {
    type: 'card',
    id: 6,
    title: '创作工具推荐指南',
    image: 'https://tdesign.gtimg.com/mobile/demos/example5.png',
    tags: [
      { label: 'AI艺术', theme: 'primary' },
      { label: '版权素材', theme: 'success' },
    ],
  },
]

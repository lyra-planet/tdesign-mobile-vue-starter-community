import type { HomeItem } from '../models/Home'

// 首页内容数据
export const homeItems: HomeItem[] = [
  {
    type: 'card',
    id: 1,
    title: '少年，星空与梦想',
    image: '/src/assets/images/HomeCard.png',
    tags: [
      { label: 'AI绘画', theme: 'primary' },
      { label: '版权素材', theme: 'success' },
    ],
  },
  {
    type: 'swiper',
    id: 2,
    images: [
      '/src/assets/images/swiper1.png',
      '/src/assets/images/swiper1.png',
      '/src/assets/images/swiper1.png',
      '/src/assets/images/swiper1.png',
      '/src/assets/images/swiper1.png',
    ],
  },
  {
    type: 'card',
    id: 3,
    title: '仰望星空的少女',
    image: '/src/assets/images/HomeCard2.png',
    tags: [
      { label: 'AI绘画', theme: 'primary' },
      { label: '版权素材', theme: 'success' },
    ],
  },
  {
    type: 'card',
    id: 4,
    title: '少年，星空与梦想',
    image: '/src/assets/images/HomeCard3.png',
    tags: [
      { label: 'AI绘画', theme: 'primary' },
      { label: '版权素材', theme: 'success' },
    ],
  },
  {
    type: 'card',
    id: 5,
    title: '少年，星空与梦想',
    image: '/src/assets/images/HomeCard.png',
    tags: [
      { label: 'AI绘画', theme: 'primary' },
      { label: '版权素材', theme: 'success' },
    ],
  },
  {
    type: 'card',
    id: 6,
    title: '少年，星空与梦想',
    image: '/src/assets/images/HomeCard3.png',
    tags: [
      { label: 'AI绘画', theme: 'primary' },
      { label: '版权素材', theme: 'success' },
    ],
  },
]

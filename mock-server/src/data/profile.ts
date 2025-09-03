import type { MenuItem, ServiceItem, StatItem } from '../models/Profile'

// 服务数据 - 分组显示
export const serviceGroups: ServiceItem[][] = [
  // 第一行：推荐服务
  [
    { name: '微信', icon: '/my/wechat.svg', type: 'external', url: 'weixin://' },
    { name: 'QQ', icon: '/my/qq.svg', type: 'external', url: 'tencent://' },
    { name: 'TDoc', icon: '/my/Tdoc.svg', type: 'external' },
    { name: 'TMap', icon: '/my/Tmap.svg', type: 'external' },
  ],
  // 第二行：数据中心服务
  [
    { name: '数据中心', icon: '/my/default.svg', type: 'internal', url: '/datacenter' },
    { name: '数据中心', icon: '/my/default.svg', type: 'internal', url: '/datacenter' },
    { name: '数据中心', icon: '/my/default.svg', type: 'internal', url: '/datacenter' },
    { name: '数据中心', icon: '/my/default.svg', type: 'internal', url: '/datacenter' },
  ],
]

// 统计数据
export const userStats: StatItem[] = [
  { label: '全部', icon: 'form', count: 12, key: 'all_posts' },
  { label: '待审核', icon: 'search', count: 3, key: 'under_review' },
  { label: '已发布', icon: 'upload', count: 8, key: 'published' },
  { label: '草稿箱', icon: 'file-copy', count: 1, key: 'drafts' },
]

// 菜单项配置
export const menuItems: MenuItem[] = [
  {
    name: '联系客服',
    icon: 'service',
    type: 'internal',
  },
  {
    name: '设置',
    icon: 'setting',
    type: 'internal',
    url: '/my/settings',
  },
]

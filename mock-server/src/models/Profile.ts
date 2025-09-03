// 个人页面相关的数据模型

export interface ServiceItem {
  name: string
  icon: string
  url?: string
  type?: 'internal' | 'external'
}

export interface StatItem {
  label: string
  icon: string
  count: number
  key: string
}

export interface MenuItem {
  name: string
  icon: string
  url?: string
  type?: 'internal' | 'external'
}

export interface ProfileServiceResponse {
  serviceGroups: ServiceItem[][]
  stats: StatItem[]
  menuItems: MenuItem[]
}

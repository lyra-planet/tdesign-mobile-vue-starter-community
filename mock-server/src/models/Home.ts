// 首页相关的数据模型

export interface HomeTag {
  label: string
  theme: 'primary' | 'success' | 'default' | 'danger' | 'warning'
}

export interface HomeItem {
  type: 'card' | 'swiper'
  id: number
  title?: string
  image?: string
  images?: string[]
  tags?: HomeTag[]
}

export interface HomeResponse {
  items: HomeItem[]
}

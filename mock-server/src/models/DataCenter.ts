// 数据中心相关的数据模型

export interface VideoStatistics {
  index: number
  title: string
  global: string
  northChina: string
  eastChina: string
  westChina: string
  southChina: string
}

export interface RegionColumn {
  colKey: string
  title: string
  width?: string
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
}

export interface DataCenterResponse {
  regionData: VideoStatistics[]
  regionColumns: RegionColumn[]
}

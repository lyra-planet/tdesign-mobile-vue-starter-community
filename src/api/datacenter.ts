import type { ApiResponse } from './types'
import { request } from './request'

// 数据中心相关的API接口

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

// 获取数据中心统计数据
export function getDataCenterStats(): Promise<ApiResponse<DataCenterResponse>> {
  return request.get('/api/datacenter/stats')
}

// 获取指定视频详情
export function getVideoDetail(id: number): Promise<ApiResponse<VideoStatistics>> {
  return request.get(`/api/datacenter/video/${id}`)
}

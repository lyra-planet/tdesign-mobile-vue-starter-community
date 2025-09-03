import type { ApiResponse } from './types'
import { request } from './request'

// 个人页面相关的API接口

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
  menuItems: MenuItem[]
}

export interface UserStatsResponse {
  stats: StatItem[]
}

// 获取个人页面服务数据
export function getProfileServices(): Promise<ApiResponse<ProfileServiceResponse>> {
  return request.get('/api/profile/services')
}

// 获取用户统计数据
export function getUserStats(userId?: string): Promise<ApiResponse<UserStatsResponse>> {
  return request.get('/api/profile/stats', {
    params: userId ? { userId } : undefined,
  })
}

// 更新用户统计数据
export function updateUserStats(data: {
  statKey: string
  increment?: number
}): Promise<ApiResponse<{ stat: StatItem }>> {
  return request.post('/api/profile/stats', data)
}

// 记录服务点击
export function trackServiceClick(data: {
  serviceName: string
  serviceType: string
}): Promise<ApiResponse<{
  serviceName: string
  serviceType: string
  timestamp: string
}>> {
  return request.post('/api/profile/service-click', data)
}

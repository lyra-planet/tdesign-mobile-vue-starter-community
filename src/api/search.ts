import type { ApiResponse } from './types'
import { get } from './request'

export interface SearchHistoryTagsResponse {
  tags: string[]
}

export interface SearchDiscoveriesResponse {
  items: string[]
}

export function getSearchHistoryTags(): Promise<ApiResponse<SearchHistoryTagsResponse>> {
  return get('/search/history-tags')
}

export function getSearchDiscoveries(): Promise<ApiResponse<SearchDiscoveriesResponse>> {
  return get('/search/discoveries')
}

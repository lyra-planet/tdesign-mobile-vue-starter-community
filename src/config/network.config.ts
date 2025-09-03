export interface NetworkConfig {
  baseURL: string
  requestTimeout: number
  contentType: string
  successCode: number | number[]
  invalidCode: number
  noPermissionCode: number
  tokenName: string
  tokenTableName: string
  storage: 'localStorage' | 'sessionStorage'
  recordRoute: boolean
  debounce: string[]
}

const networkConfig: NetworkConfig = {
  baseURL: 'http://localhost:3001/api',
  requestTimeout: 30000,
  contentType: 'application/json;charset=UTF-8',
  successCode: [200, 0],
  invalidCode: 401,
  noPermissionCode: 403,
  tokenName: 'Authorization',
  tokenTableName: 'tdesign-mobile-token',
  storage: 'localStorage',
  recordRoute: true,
  debounce: ['login', 'register'],
}

export default networkConfig

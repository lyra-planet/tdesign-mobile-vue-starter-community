export interface NetworkConfig {
  baseURL: string
  storage: 'localStorage' | 'sessionStorage'
}

const networkConfig: NetworkConfig = {
  baseURL: 'http://localhost:3001/api',
  storage: 'localStorage',
}

export default networkConfig

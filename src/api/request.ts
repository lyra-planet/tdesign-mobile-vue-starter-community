interface RequestConfig {
  method?: string
  headers?: any
  body?: any
}

class HttpClient {
  private baseURL: string
  private defaultHeaders: any

  constructor(baseURL: string = 'http://localhost:3001/api') {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  // 设置认证token
  setAuthToken(token: string) {
    this.defaultHeaders.Authorization = `Bearer ${token}`
  }

  // 清除认证token
  clearAuthToken() {
    delete this.defaultHeaders.Authorization
  }

  async request(endpoint: string, config: RequestConfig = {}) {
    const url = `${this.baseURL}${endpoint}`
    const { method = 'GET', headers = {}, body } = config

    const requestHeaders = {
      ...this.defaultHeaders,
      ...headers,
    }

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      })

      const data = await response.json()

      return {
        code: response.status,
        message: data.message || (response.ok ? 'Success' : 'Error'),
        data: data.data || data,
        success: response.ok && data.code === 200,
      }
    }
    catch (error) {
      console.error('Request failed:', error)
      return {
        code: 500,
        message: '网络请求失败',
        success: false,
      }
    }
  }

  get(endpoint: string, headers?: any) {
    return this.request(endpoint, { method: 'GET', headers })
  }

  post(endpoint: string, body?: any, headers?: any) {
    return this.request(endpoint, { method: 'POST', body, headers })
  }

  put(endpoint: string, body?: any, headers?: any) {
    return this.request(endpoint, { method: 'PUT', body, headers })
  }

  delete(endpoint: string, headers?: any) {
    return this.request(endpoint, { method: 'DELETE', headers })
  }
}

export const httpClient = new HttpClient()

export function get(endpoint: string, headers?: any) {
  return httpClient.get(endpoint, headers)
}

export function post(endpoint: string, body?: any, headers?: any) {
  return httpClient.post(endpoint, body, headers)
}

export function put(endpoint: string, body?: any, headers?: any) {
  return httpClient.put(endpoint, body, headers)
}

export function del(endpoint: string, headers?: any) {
  return httpClient.delete(endpoint, headers)
}

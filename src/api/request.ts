interface RequestConfig {
  method?: string
  headers?: any
  body?: any
  signal?: AbortSignal
}

class HttpClient {
  private baseURL: string
  private defaultHeaders: any
  private showToastOnError: boolean

  constructor(baseURL: string = import.meta.env.VITE_API_BASE) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
    this.showToastOnError = true
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
    const { method = 'GET', headers = {}, body, signal } = config

    const requestHeaders = {
      ...this.defaultHeaders,
      ...headers,
    }

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal,
      })

      const data = await response.json()

      const result = {
        code: response.status,
        message: data.message || (response.ok ? 'Success' : 'Error'),
        data: data.data || data,
        success: response.ok && data.code === 200,
      }
      if (!result.success && this.showToastOnError) {
        import('@/plugins/message').then(({ message }) => {
          message.error(result.message || '请求失败')
        }).catch(() => {})
      }
      return result
    }
    catch (_error) {
      // 若为主动取消请求，不提示错误
      if ((_error as any)?.name === 'AbortError') {
        return {
          code: 499,
          message: '请求已取消',
          success: false,
        }
      }
      if (this.showToastOnError) {
        // 动态导入，避免循环依赖
        import('@/plugins/message').then(({ message }) => {
          message.error('网络请求失败')
        }).catch(() => {})
      }
      return {
        code: 500,
        message: '网络请求失败',
        success: false,
      }
    }
  }

  get(endpoint: string, headers?: any, signal?: AbortSignal) {
    return this.request(endpoint, { method: 'GET', headers, signal })
  }

  post(endpoint: string, body?: any, headers?: any, signal?: AbortSignal) {
    return this.request(endpoint, { method: 'POST', body, headers, signal })
  }

  put(endpoint: string, body?: any, headers?: any, signal?: AbortSignal) {
    return this.request(endpoint, { method: 'PUT', body, headers, signal })
  }

  delete(endpoint: string, headers?: any, signal?: AbortSignal) {
    return this.request(endpoint, { method: 'DELETE', headers, signal })
  }
}

export const httpClient = new HttpClient()

export function get(endpoint: string, headers?: any, signal?: AbortSignal) {
  return httpClient.get(endpoint, headers, signal)
}

export function post(endpoint: string, body?: any, headers?: any, signal?: AbortSignal) {
  return httpClient.post(endpoint, body, headers, signal)
}

export function put(endpoint: string, body?: any, headers?: any, signal?: AbortSignal) {
  return httpClient.put(endpoint, body, headers, signal)
}

export function del(endpoint: string, headers?: any, signal?: AbortSignal) {
  return httpClient.delete(endpoint, headers, signal)
}

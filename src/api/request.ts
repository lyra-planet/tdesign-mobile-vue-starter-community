interface RequestConfig {
  method?: string
  headers?: any
  body?: any
  signal?: AbortSignal
  timeout?: number
}

class HttpClient {
  private baseURL: string
  private defaultHeaders: any
  private showToastOnError: boolean
  private defaultTimeoutMs: number

  constructor(baseURL: string = import.meta.env.VITE_API_BASE) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
    this.showToastOnError = true
    this.defaultTimeoutMs = 5000
  }

  // 设置认证token
  setAuthToken(token: string) {
    this.defaultHeaders.Authorization = `Bearer ${token}`
  }

  // 清除认证token
  clearAuthToken() {
    delete this.defaultHeaders.Authorization
  }

  // 设置默认超时时间（毫秒）
  setRequestTimeout(timeoutMs: number) {
    const parsed = Number(timeoutMs)
    this.defaultTimeoutMs = Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 0
  }

  async request(endpoint: string, config: RequestConfig = {}) {
    const url = `${this.baseURL}${endpoint}`
    const { method = 'GET', headers = {}, body, signal, timeout } = config

    const requestHeaders = {
      ...this.defaultHeaders,
      ...headers,
    }

    const timeoutMs = Number.isFinite(timeout as number) && (timeout as number) > 0 ? (timeout as number) : this.defaultTimeoutMs

    const controller = new AbortController()
    let didTimeout = false
    let externalAbortHandler: ((this: AbortSignal, ev: Event) => any) | null = null

    if (signal) {
      if (signal.aborted) {
        try {
          // 传递外部取消原因
          controller.abort((signal as any).reason)
        }
        catch {
          controller.abort()
        }
      }
      else {
        externalAbortHandler = () => {
          try {
            controller.abort((signal as any).reason)
          }
          catch {
            controller.abort()
          }
        }
        signal.addEventListener('abort', externalAbortHandler)
      }
    }

    const timeoutId = timeoutMs > 0
      ? setTimeout(() => {
          didTimeout = true
          try {
            // 使用 AbortController 触发超时中断
            controller.abort(new DOMException('Request timeout', 'AbortError'))
          }
          catch {
            controller.abort()
          }
        }, timeoutMs)
      : null

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      })

      let data: any
      try {
        data = await response.json()
      }
      catch {
        data = {}
      }

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
        if (didTimeout) {
          if (this.showToastOnError) {
            import('@/plugins/message').then(({ message }) => {
              message.error('请求超时')
            }).catch(() => {})
          }
          return {
            code: 408,
            message: '请求超时',
            success: false,
          }
        }
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
    finally {
      if (timeoutId)
        clearTimeout(timeoutId as any)
      if (signal && externalAbortHandler)
        signal.removeEventListener('abort', externalAbortHandler)
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

export function setRequestTimeout(timeoutMs: number) {
  httpClient.setRequestTimeout(timeoutMs)
}

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

---
title: HTTP
---

# HTTP

`src/api/request.ts` provides a unified HTTP client with standardized response shape, error hints and request cancelation.

## Client structure (excerpt)

```ts
class HttpClient {
  private baseURL: string
  private defaultHeaders: any
  private showToastOnError: boolean

  constructor(baseURL: string = 'http://localhost:3001/api') {
    this.baseURL = baseURL
    this.defaultHeaders = { 'Content-Type': 'application/json' }
    this.showToastOnError = true
  }

  async request(endpoint: string, config: RequestConfig = {}) {
    const url = `${this.baseURL}${endpoint}`
    const { method = 'GET', headers = {}, body, signal } = config
    const requestHeaders = { ...this.defaultHeaders, ...headers }

    try {
      const response = await fetch(url, { method, headers: requestHeaders, body: body ? JSON.stringify(body) : undefined, signal })
      const data = await response.json()
      const result = { code: response.status, message: data.message || (response.ok ? 'Success' : 'Error'), data: data.data || data, success: response.ok && data.code === 200 }
      if (!result.success && this.showToastOnError) {
        import('@/plugins/message').then(({ message }) => { message.error(result.message || 'Request failed') })
      }
      return result
    } catch (_error) {
      if ((_error as any)?.name === 'AbortError') return { code: 499, message: 'Request aborted', success: false }
      if (this.showToastOnError) import('@/plugins/message').then(({ message }) => { message.error('Network request failed') })
      return { code: 500, message: 'Network request failed', success: false }
    }
  }
}
```

## Suggestions

- Standardize `ApiResponse<T>` to reduce null checks and repetitive error branches
- Prefer using `signal` to cancel in-flight requests in components (e.g., interrupt the previous request during search input):

```ts
const controller = new AbortController()
const res = await get(`/search?q=${q}`, undefined, controller.signal)
controller.abort()
```

- Pass auth info through `defaultHeaders.Authorization`
- Note: current `baseURL` defaults to `http://localhost:3001/api`. To switch by environment, inject after app init:

```ts
// After initGlobalConfig(app) in src/main.ts
import { httpClient } from '@/api/request'
httpClient["baseURL"] = getGlobalConfig('baseURL') // or via a public setter
```

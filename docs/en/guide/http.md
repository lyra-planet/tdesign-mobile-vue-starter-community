# HTTP & Request Encapsulation

This project uses a lightweight client encapsulation based on `fetch` (`src/api/request.ts`), which unifies response structure, error prompts, and request cancellation, avoiding boilerplate code in various business modules.

## Design Goals

- Unified returns: Always return `{ code, message, data, success }`
- Consistent prompts: Centralized prompts by `plugins/message` on failure
- Easy cancellation: Built-in `AbortSignal` support, safe component exit
- Injectable Token: Automatically inject `Authorization` header after login

## Core Implementation

```ts
// src/api/request.ts (core)
class HttpClient {
  private baseURL: string = 'http://localhost:3001/api'
  private defaultHeaders: any = { 'Content-Type': 'application/json' }
  private showToastOnError = true

  setAuthToken(token: string) {
    this.defaultHeaders.Authorization = `Bearer ${token}`
  }
  clearAuthToken() {
    delete this.defaultHeaders.Authorization
  }

  async request(endpoint: string, cfg: RequestConfig = {}) {
    const url = `${this.baseURL}${endpoint}`
    const { method = 'GET', headers = {}, body, signal } = cfg
    try {
      const response = await fetch(url, {
        method,
        headers: { ...this.defaultHeaders, ...headers },
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
        import('@/plugins/message').then(({ message }) => message.error(result.message || 'Request failed'))
      }
      return result
    } catch (e: any) {
      if (e?.name === 'AbortError') {
        return { code: 499, message: 'Request canceled', success: false }
      }
      if (this.showToastOnError) {
        import('@/plugins/message').then(({ message }) => message.error('Network request failed'))
      }
      return { code: 500, message: 'Network request failed', success: false }
    }
  }
}
```

## Quick Usage

```ts
import { get, post } from '@/api/request'

const controller = new AbortController()
const res = await get('/home/list', undefined, controller.signal)
if (res.success) {
  // Use res.data
}
// When leaving page: controller.abort()
```

## Integration with User State

After successful login, inject Token through `useUserStore()`:

```ts
// src/store/user.ts (excerpt)
const setToken = (newToken: string) => {
  token.value = newToken
  if (newToken) httpClient.setAuthToken(newToken)
}
```

## Business API Conventions

- One file per business domain: `src/api/<domain>.ts`
- Functions return `Promise<ApiResponse<T>>`
- API layer does no UI logic, only parameter and type constraints

```ts
// src/api/search.ts (example)
import type { ApiResponse } from './types'
import { get } from './request'

export function search(keyword: string, signal?: AbortSignal): Promise<ApiResponse<{ list: any[] }>> {
  return get(`/search?q=${encodeURIComponent(keyword)}`, undefined, signal)
}
```

## Common Patterns

### Cancel Stale Requests (Input Search)

```ts
let lastController: AbortController | null = null
function onInput(keyword: string) {
  lastController?.abort()
  lastController = new AbortController()
  search(keyword, lastController.signal).then((res) => {
    if (res.success) {
      // Render list
    }
  })
}
```

### Unified Error Prompts

No need to handle prompts at each call site, unified by `HttpClient` trigger. For silent mode, can add switch (future extension for per-request customizable `showToastOnError`).

## Collaboration with Mock

When `DEV` or `VITE_MSW=true`, `src/main.ts` starts MSW before mounting:

```ts
if (import.meta.env.DEV || import.meta.env.VITE_MSW === 'true') {
  const { startMsw } = await import('@/mocks')
  await startMsw()
}
```

Mock response structure stays consistent with real interfaces for seamless switching.
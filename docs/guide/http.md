# HTTP 与请求封装

本项目使用基于 `fetch` 的轻量客户端封装（`src/api/request.ts`），统一了响应结构、错误提示与取消请求，避免在各业务模块重复样板代码。

## 设计目标

- 统一返回：始终返回 `{ code, message, data, success }`
- 一致提示：失败时集中由 `plugins/message` 提示
- 易于取消：内置 `AbortSignal` 支持，组件退出安全
- 可注入 Token：登录后自动注入 `Authorization` 头

## 核心实现

```ts
// src/api/request.ts（核心）
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
        import('@/plugins/message').then(({ message }) => message.error(result.message || '请求失败'))
      }
      return result
    } catch (e: any) {
      if (e?.name === 'AbortError') {
        return { code: 499, message: '请求已取消', success: false }
      }
      if (this.showToastOnError) {
        import('@/plugins/message').then(({ message }) => message.error('网络请求失败'))
      }
      return { code: 500, message: '网络请求失败', success: false }
    }
  }
}
```

## 快速使用

```ts
import { get, post } from '@/api/request'

const controller = new AbortController()
const res = await get('/home/list', undefined, controller.signal)
if (res.success) {
  // 使用 res.data
}
// 离开页面时：controller.abort()
```

## 与用户状态集成

登录成功后通过 `useUserStore()` 注入 Token：

```ts
// src/store/user.ts（节选）
const setToken = (newToken: string) => {
  token.value = newToken
  if (newToken) httpClient.setAuthToken(newToken)
}
```

## 业务 API 约定

- 每个业务域一个文件：`src/api/<domain>.ts`
- 函数返回 `Promise<ApiResponse<T>>`
- API 层不做 UI 逻辑，仅做参数与类型约束

```ts
// src/api/search.ts（示例）
import type { ApiResponse } from './types'
import { get } from './request'

export function search(keyword: string, signal?: AbortSignal): Promise<ApiResponse<{ list: any[] }>> {
  return get(`/search?q=${encodeURIComponent(keyword)}`, undefined, signal)
}
```

## 常见模式

### 取消过时请求（输入搜索）

```ts
let lastController: AbortController | null = null
function onInput(keyword: string) {
  lastController?.abort()
  lastController = new AbortController()
  search(keyword, lastController.signal).then((res) => {
    if (res.success) {
      // 渲染列表
    }
  })
}
```

### 错误统一提示

无需在每个调用点处理提示，统一由 `HttpClient` 触发。需要静默时可加开关（未来扩展为每次请求可自定义 `showToastOnError`）。

## 与 Mock 的协作

当 `DEV` 或 `VITE_MSW=true` 时，`src/main.ts` 在挂载前启动 MSW：

```ts
if (import.meta.env.DEV || import.meta.env.VITE_MSW === 'true') {
  const { startMsw } = await import('@/mocks')
  await startMsw()
}
```

Mock 的响应结构与真实接口保持一致，以便随时切换。
# HTTP 与拦截

`src/api/request.ts` 提供统一的 HTTP 客户端：标准化返回结构、错误提示、取消请求。

## 客户端结构（节选）

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
        import('@/plugins/message').then(({ message }) => { message.error(result.message || '请求失败') })
      }
      return result
    } catch (_error) {
      if ((_error as any)?.name === 'AbortError') return { code: 499, message: '请求已取消', success: false }
      if (this.showToastOnError) import('@/plugins/message').then(({ message }) => { message.error('网络请求失败') })
      return { code: 500, message: '网络请求失败', success: false }
    }
  }
}
```

## 使用建议

- 标准化 `ApiResponse<T>`，减少判空与重复错误分支
- 组件中优先使用 `signal` 取消未完成请求（示例：输入搜索时中断上一次请求）

  ```ts
  const controller = new AbortController()
  const res = await get(`/search?q=${q}`, undefined, controller.signal)
  controller.abort()
  ```

- 将认证信息透传到 `defaultHeaders.Authorization`
- 注意：当前 `baseURL` 默认值写死为 `http://localhost:3001/api`，如需按环境切换，可在应用初始化后进行注入：

  ```ts
  // src/main.ts 中 initGlobalConfig(app) 之后：
  import { httpClient } from '@/api/request'
  httpClient["baseURL"] = getGlobalConfig('baseURL') // 或通过公开方法设置
  ```
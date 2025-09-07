# 错误处理与容错

## HTTP 层

- 统一响应：`{ code, message, data, success }`，由 `src/api/request.ts` 标准化
- 自动提示：当 `success=false` 且开启提示时，触发 `plugins/message.error`
- 取消请求：组件卸载/路由切换使用 `AbortController`，主动取消返回 `code=499`

```ts
// 组件内请求与取消
const controller = new AbortController()
try {
  const res = await get('/search?q=xx', undefined, controller.signal)
  if (res.success) {
    // 处理数据
  }
} finally {
  controller.abort()
}
```

```ts
// src/api/request.ts（节选）
const result = {
  code: response.status,
  message: data.message || (response.ok ? 'Success' : 'Error'),
  data: data.data || data,
  success: response.ok && data.code === 200,
}
if (!result.success && this.showToastOnError) {
  import('@/plugins/message').then(({ message }) => {
    message.error(result.message || '请求失败')
  })
}
```

## Store 层

- 提供 `resetAllStores()` 快速重置状态
- 仅在 Action 中做副作用，确保可预测

```ts
// src/store/index.ts（节选）
export function resetAllStores() {
  registeredStores.forEach((s) => {
    if (typeof s.$reset === 'function') s.$reset()
  })
}
```

## 交互层

- PageHeader 返回逻辑、登录/未登录视图切换均有兜底
- 路由 `/:pathMatch(.*)*` 重定向到 `/error/404`

## 常见场景

### 列表搜索竞态

- 每次输入创建独立 `AbortController`；新请求发起时取消旧请求
- 在渲染前校验 `res.success`，仅在成功时更新 UI

### Token 失效

- 后端返回 `code != 200`，触发统一错误提示
- 业务可在用户模块执行清空 token → 引导登录（示例中未强跳）

### Mock/真实接口切换

- 控制台设置 `window.__MSW_ENABLED__=true` 或 `.env.*` 中 `VITE_MSW=true`
- Mock 与真实接口响应结构保持一致，确保切换无感

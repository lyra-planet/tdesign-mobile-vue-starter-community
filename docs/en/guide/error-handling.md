# Error Handling & Fault Tolerance

## HTTP Layer

- Unified response: `{ code, message, data, success }`, standardized by `src/api/request.ts`
- Auto prompts: When `success=false` and prompts enabled, trigger `plugins/message.error`
- Request cancellation: Use `AbortController` for component unmount/route switching, active cancellation returns `code=499`

```ts
// Request and cancellation in components
const controller = new AbortController()
try {
  const res = await get('/search?q=xx', undefined, controller.signal)
  if (res.success) {
    // Process data
  }
} finally {
  controller.abort()
}
```

```ts
// src/api/request.ts (excerpt)
const result = {
  code: response.status,
  message: data.message || (response.ok ? 'Success' : 'Error'),
  data: data.data || data,
  success: response.ok && data.code === 200,
}
if (!result.success && this.showToastOnError) {
  import('@/plugins/message').then(({ message }) => {
    message.error(result.message || 'Request failed')
  })
}
```

## Store Layer

- Provide `resetAllStores()` for quick state reset
- Only handle side effects in Actions, ensuring predictability

```ts
// src/store/index.ts (excerpt)
export function resetAllStores() {
  registeredStores.forEach((s) => {
    if (typeof s.$reset === 'function') s.$reset()
  })
}
```

## Interaction Layer

- PageHeader return logic, login/logout view switching all have fallbacks
- Route `/:pathMatch(.*)*` redirects to `/error/404`

## Common Scenarios

### List Search Race Conditions

- Create independent `AbortController` for each input; cancel old request when new request is initiated
- Validate `res.success` before rendering, only update UI when successful

### Token Expiration

- Backend returns `code != 200`, triggers unified error prompt
- Business can execute in user module: clear token → guide to login (no forced jump in demo)

### Mock/Real Interface Switching

- Console set `window.__MSW_ENABLED__=true` or `VITE_MSW=true` in `.env.*`
- Keep Mock and real interface response structures consistent, ensuring seamless switching
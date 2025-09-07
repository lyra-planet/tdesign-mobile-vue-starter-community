---
title: Error Handling
---

# Error Handling

## HTTP layer

- Unified response `{ code, message, data, success }`
- Auto error hints: trigger `message.error()` on failure; can be controlled via `showToastOnError`
- Cancelation convention: use `AbortController` on unmount/route change

```ts
const controller = new AbortController()
try {
  const res = await get('/search?q=xx', undefined, controller.signal)
} finally {
  controller.abort()
}
```

## Store layer

- Provide `resetAllStores()` to reset state quickly
- Do side effects only in Actions for predictability

## Interaction layer

- PageHeader back behavior and login/guest view switching have fallbacks
- Route `/:pathMatch(.*)*` redirects to `/error/404`

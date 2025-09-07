---
title: API & Mock
---

# API & Mock

Use the unified `get/post/put/del` exports or `httpClient` from `src/api/request.ts`. Responses follow a standardized shape:

```ts
{
  code: number,
  message: string,
  data?: any,
  success: boolean
}
```

Conventions:

- Only `success === true` means a business success; `code` is HTTP status; `message` is the hint text
- Pagination results should be under `data.pagination` with `page/limit/total/totalPages/hasMore`

## Auth (`src/api/auth.ts`)

- `sendVerifyCode({ phone })`: send verification code
- `verifyCodeLogin(params)`: login by verification code
- `passwordLogin(params)`: password login
- `logout()`: logout
- `refreshToken()`: refresh token
- `updateUserInfo(partialUser)`: update user info

Example:

```ts
import { sendVerifyCode, verifyCodeLogin } from '@/api/auth'

await sendVerifyCode({ phone: '13800138000' })
const res = await verifyCodeLogin({ phone: '13800138000', code: '123456' })
if (res.success) {
  // use res.data
}
```

## Search / Home / Publish / Chat / DataCenter / Profile

See each module: `src/api/search.ts`, `home.ts`, `publish.ts`, `chat.ts`, `datacenter.ts`, `profile.ts`.

### Example: home pagination

```ts
const { success, data } = await getHomeContent({ page: 1, limit: 10 })
if (success && data) {
  const { items, pagination } = data
  // render items, and decide whether to continue loading by pagination.hasMore
}
```

## Cancel requests

```ts
const controller = new AbortController()
const res = await get('/search?q=xx', undefined, controller.signal)
controller.abort()
```

> Cancel in-flight requests on route change/component unmount to avoid noise and waste.

---

## Mock endpoints (from `src/mocks/handlers.ts`)

These endpoints are enabled only in DEV or when `VITE_MSW=true` is explicitly set.

### Auth

- POST `/api/auth/send-code`: send verify code (returns countdown)
- POST `/api/auth/verify-login`: code login (returns token + user)
- POST `/api/auth/password-login`: password login
- POST `/api/auth/logout`: logout
- POST `/api/auth/refresh-token`: refresh token
- PUT `/api/auth/update-user-info`: update user info (Bearer required)

### Home

- GET `/api/home/content?page&limit`: content pagination
- GET `/api/home/content/:id`: content detail
- POST `/api/home/refresh`: random refresh

### Profile

- GET `/api/profile/services`: service groups + menus
- GET `/api/profile/stats`: user stats
- POST `/api/profile/stats`: add a stat item (example)
- POST `/api/profile/service-click`: click report (example)

### Data Center

- GET `/api/datacenter/stats`: returns `overview`, `interaction`, `completion`, `regionData`, `regionColumns`
- GET `/api/datacenter/video/:id`: returns metrics for a video

### Search

- GET `/api/search/history-tags`: history tags
- GET `/api/search/discoveries`: discoveries
- GET `/api/search?q=xxx`: suggestions/results

### Chat

- GET `/api/chat`: conversation list
- POST `/api/chat/:chatId/message`: send message
- PUT `/api/chat/:chatId/read`: mark as read
- GET `/api/chat/unread-count`: unread total

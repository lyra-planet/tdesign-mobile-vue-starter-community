# API 接口规范

基于标准化的 HTTP 客户端，提供类型安全的接口调用与统一的错误处理机制。所有接口遵循 RESTful 设计原则，返回一致的响应格式。

## 📋 响应格式规范

### 统一响应结构
```ts
interface ApiResponse<T = any> {
  code: number       // HTTP 状态码
  message: string    // 响应消息
  data?: T          // 业务数据
  success: boolean  // 业务状态（仅当 code=200 且 HTTP 状态正常时为 true）
}
```

### 分页响应格式
```ts
interface PaginationResponse<T> {
  items: T[]                    // 数据列表
  pagination: {
    page: number               // 当前页码
    limit: number              // 每页条数
    total: number              // 总记录数
    totalPages: number         // 总页数
    hasMore: boolean          // 是否有更多数据
  }
}
```

## 🔐 认证模块 (`src/api/auth.ts`)

### 验证码登录流程
```ts
import { sendVerifyCode, verifyCodeLogin } from '@/api/auth'

// 1. 发送验证码
const codeResult = await sendVerifyCode({ 
  phone: '13800138000',
  countryCode: '+86'
})

if (codeResult.success) {
  console.log(`验证码已发送，${codeResult.data.countdown}秒后可重新发送`)
}

// 2. 验证码登录
const loginResult = await verifyCodeLogin({
  phone: '13800138000',
  code: '123456',
  countryCode: '+86'
})

if (loginResult.success) {
  const { token, user } = loginResult.data
  // 自动触发 useUserStore().handleLoginSuccess(token, user)
}
```

### 密码登录
```ts
import { passwordLogin } from '@/api/auth'

const result = await passwordLogin({
  account: 'username_or_email',
  password: 'user_password'
})

if (result.success) {
  const { token, user } = result.data
  // 处理登录成功逻辑
}
```

### 用户信息管理
```ts
import { updateUserInfo, refreshToken, logout } from '@/api/auth'

// 更新用户信息（需要认证）
const updateResult = await updateUserInfo({
  name: '新用户名',
  avatar: 'https://example.com/avatar.jpg',
  bio: '个人简介'
})

// 刷新 Token
const tokenResult = await refreshToken()

// 退出登录
const logoutResult = await logout()
```

## 🏠 业务接口模块

### 首页内容 (`src/api/home.ts`)
```ts
import { getHomeContent, getHomeContentById, refreshHomeContent } from '@/api/home'

// 分页获取首页内容
const contentResult = await getHomeContent({ 
  page: 1, 
  limit: 10 
})

if (contentResult.success) {
  const { items, pagination } = contentResult.data
  
  // 渲染内容列表
  items.forEach(item => {
    console.log(item.title, item.description)
  })
  
  // 检查是否有更多数据
  if (pagination.hasMore) {
    // 可以加载下一页
  }
}

// 获取单个内容详情
const detailResult = await getHomeContentById('content_id_123')

// 刷新内容（随机获取新内容）
const refreshResult = await refreshHomeContent()
```

### 搜索功能 (`src/api/search.ts`)
```ts
import { searchContent, getSearchHistory, getDiscoveries } from '@/api/search'

// 搜索内容（支持取消请求）
const controller = new AbortController()
const searchResult = await searchContent('搜索关键词', controller.signal)

if (searchResult.success) {
  const { suggestions, results } = searchResult.data
  // 处理搜索建议和结果
}

// 获取搜索历史标签
const historyResult = await getSearchHistory()

// 获取发现内容
const discoveryResult = await getDiscoveries()

// 在组件卸载时取消请求
onUnmounted(() => {
  controller.abort()
})
```

### 发布功能 (`src/api/publish.ts`)
```ts
import { publishContent, uploadImage, getDraftList } from '@/api/publish'

// 上传图片
const uploadResult = await uploadImage(file)
if (uploadResult.success) {
  const imageUrl = uploadResult.data.url
}

// 发布内容
const publishResult = await publishContent({
  title: '内容标题',
  content: '内容正文',
  images: ['image_url_1', 'image_url_2'],
  tags: ['标签1', '标签2']
})

// 获取草稿列表
const draftResult = await getDraftList()
```

### 聊天功能 (`src/api/chat.ts`)
```ts
import { getChatList, sendMessage, markAsRead, getUnreadCount } from '@/api/chat'

// 获取聊天列表
const chatListResult = await getChatList()

if (chatListResult.success) {
  const chats = chatListResult.data
  chats.forEach(chat => {
    console.log(`${chat.name}: ${chat.count} 条未读消息`)
  })
}

// 发送消息
const messageResult = await sendMessage('chat_id_123', {
  message: '你好！'
})

// 标记已读
const readResult = await markAsRead('chat_id_123')

// 获取总未读数
const unreadResult = await getUnreadCount()
```

### 数据中心 (`src/api/datacenter.ts`)
```ts
import { getDataCenterStats, getVideoStats } from '@/api/datacenter'

// 获取数据中心统计
const statsResult = await getDataCenterStats()

if (statsResult.success) {
  const { overview, interaction, completion, regionData, regionColumns } = statsResult.data
  
  // 渲染各种统计图表
  renderOverviewChart(overview)
  renderInteractionChart(interaction)
  renderCompletionChart(completion)
  renderRegionChart(regionData, regionColumns)
}

// 获取特定视频统计
const videoResult = await getVideoStats('video_id_456')
```

### 个人中心 (`src/api/profile.ts`)
```ts
import { getProfileServices, getProfileStats, reportServiceClick } from '@/api/profile'

// 获取服务列表
const servicesResult = await getProfileServices()

if (servicesResult.success) {
  const { serviceGroups, menuItems } = servicesResult.data
  // 渲染服务网格和菜单
}

// 获取用户统计
const statsResult = await getProfileStats()

// 上报服务点击（用于数据分析）
const clickResult = await reportServiceClick({
  serviceId: 'service_123',
  action: 'click',
  timestamp: Date.now()
})
```

## 🚫 请求取消与错误处理

### 请求取消机制
```ts
import { get } from '@/api/request'

// 创建取消控制器
const controller = new AbortController()

try {
  const result = await get('/search?q=keyword', undefined, controller.signal)
  
  if (result.success) {
    // 处理成功响应
  } else {
    // 处理业务错误（自动显示错误提示）
  }
} catch (error) {
  // 处理网络错误或请求被取消
  if (error.name === 'AbortError') {
    console.log('请求已取消')
  }
} finally {
  // 清理资源
}

// 在组件卸载或路由切换时取消请求
onUnmounted(() => {
  controller.abort()
})
```

### 批量请求管理
```ts
class RequestManager {
  private controllers = new Map<string, AbortController>()
  
  async request<T>(key: string, requestFn: (signal: AbortSignal) => Promise<T>): Promise<T> {
    // 取消同 key 的旧请求
    this.cancel(key)
    
    // 创建新的控制器
    const controller = new AbortController()
    this.controllers.set(key, controller)
    
    try {
      return await requestFn(controller.signal)
    } finally {
      this.controllers.delete(key)
    }
  }
  
  cancel(key: string) {
    const controller = this.controllers.get(key)
    if (controller) {
      controller.abort()
      this.controllers.delete(key)
    }
  }
  
  cancelAll() {
    this.controllers.forEach(controller => controller.abort())
    this.controllers.clear()
  }
}

// 使用示例
const requestManager = new RequestManager()

// 搜索时自动取消之前的搜索请求
async function search(keyword: string) {
  return requestManager.request('search', (signal) => 
    get(`/search?q=${keyword}`, undefined, signal)
  )
}
```

## 🎯 最佳实践

### 类型安全
```ts
// 定义具体的响应类型
interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface LoginResponse {
  token: string
  user: User
  expiresIn: number
}

// 使用泛型确保类型安全
const loginResult = await passwordLogin(credentials) as ApiResponse<LoginResponse>

if (loginResult.success) {
  const { token, user, expiresIn } = loginResult.data
  // TypeScript 会提供完整的类型提示
}
```

### 错误处理策略
```ts
// 全局错误处理已在 httpClient 中实现
// 业务层只需关注成功逻辑
const result = await someApiCall()

if (result.success) {
  // 处理成功情况
  processData(result.data)
} else {
  // 错误已被自动提示，这里可以处理特殊逻辑
  if (result.code === 401) {
    // 未授权，跳转登录
    router.push('/login')
  }
}
```

### 性能优化
```ts
// 接口请求防抖
import { debounce } from '@/utils/validators'

const debouncedSearch = debounce(async (keyword: string) => {
  const result = await searchContent(keyword)
  // 处理搜索结果
}, 300)

// 请求缓存
const cache = new Map<string, { data: any; timestamp: number }>()

async function getCachedData(key: string, fetcher: () => Promise<any>, ttl = 60000) {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data
  }
  
  const data = await fetcher()
  cache.set(key, { data, timestamp: Date.now() })
  return data
}
```

## 🧪 Mock 数据开发

在开发环境中，所有接口都提供了对应的 Mock 实现：

```ts
// Mock 数据在以下场景自动启用：
// 1. 开发环境 (import.meta.env.DEV)
// 2. 显式开启 VITE_MSW=true
// 3. 控制台设置 window.__MSW_ENABLED__ = true

// Mock 与真实接口具有相同的响应格式，确保无缝切换
```

### Mock 功能特性
- **零侵入**：与真实接口 URL 完全相同
- **延迟模拟**：模拟真实网络延迟
- **错误注入**：支持模拟各种错误场景
- **数据持久**：Mock 数据在页面刷新后保持
- **混合模式**：部分接口使用 Mock，部分使用真实后端
# 状态管理架构

基于 Pinia 构建的现代状态管理方案，集成持久化、重置机制与类型安全，为移动端应用提供高效的数据流管理。

## 核心架构设计

### 🏗️ Store 工厂与插件系统
```ts
// src/store/index.ts - 核心实例管理
const store = createPinia()

// 1. 持久化插件
store.use(piniaPluginPersistedstate)

// 2. 自动注册插件（收集 store 实例）
const registeredStores = new Set<any>()
store.use((ctx) => {
  registeredStores.add(ctx.store)
})

export function setupStore(app: App) {
  app.use(store)
}
```

### 🔄 全局重置机制
```ts
// 一键重置所有状态（登出、测试等场景）
export function resetAllStores() {
  registeredStores.forEach((storeInstance) => {
    if (typeof storeInstance.$reset === 'function') {
      storeInstance.$reset()
    }
  })
}
```

### 💾 智能持久化配置
```ts
// 统一持久化策略
export function getPersistConfig(key: string) {
  const storagePrefix = getGlobalConfig('storageNS') || 'tdesign-mobile-'
  return {
    key: `${storagePrefix}${key}`,
    storage: getGlobalConfig('storage') === 'sessionStorage' 
      ? sessionStorage 
      : localStorage,
  }
}
```

**设计优势**：
- 🔧 **配置化**：根据全局配置自动选择存储类型
- 🏷️ **命名空间**：避免多应用间的存储冲突
- 🔄 **自动收集**：无需手动注册，支持动态重置

## 实战案例：用户状态管理

### 🔐 用户认证 Store
```ts
// src/store/user.ts - 完整用户状态管理
export const useUserStore = defineStore('user', () => {
  // 响应式状态
  const token = ref<string>('')
  const userInfo = ref<UserInfo | null>(null)
  
  // 计算属性
  const isLoggedIn = computed(() => !!token.value)
  const userName = computed(() => userInfo.value?.name || '')
  const userAvatar = computed(() => userInfo.value?.avatar || '')
  
  // 核心 Actions
  const setToken = (newToken: string) => {
    token.value = newToken
    if (newToken) {
      httpClient.setAuthToken(newToken)  // 副作用：注入请求头
    }
  }
  
  const handleLoginSuccess = (newToken: string, user: UserInfo) => {
    setToken(newToken)
    userInfo.value = user
    return { success: true }
  }
  
  const resetUserState = () => {
    token.value = ''
    userInfo.value = null
    httpClient.clearAuthToken()  // 副作用：清除请求头
  }
  
  // 初始化逻辑
  const initUserData = async () => {
    if (token.value) {
      httpClient.setAuthToken(token.value)
      const success = await fetchUserInfo()
      if (!success) resetUserState()
    }
  }
  
  return {
    // 状态
    token, userInfo,
    // 计算属性
    isLoggedIn, userName, userAvatar,
    // 方法
    setToken, handleLoginSuccess, resetUserState, initUserData
  }
}, {
  // 持久化配置：仅持久化关键数据
  persist: {
    ...getPersistConfig(STORAGE_KEYS.USER_INFO),
    pick: ['token', 'userInfo']  // 选择性持久化
  }
})
```

### 📋 其他业务 Store 示例
```ts
// src/store/talklist.ts - 消息列表状态
export const useTalklistStore = defineStore('talklist', () => {
  const chatList = ref<Chat[]>([])
  const activeChat = ref<string>('')
  
  const addMessage = (chatId: string, message: ChatMessage) => {
    const chat = chatList.value.find(c => c.id === chatId)
    if (chat) {
      chat.message.push(message)
      chat.count += 1
    }
  }
  
  return { chatList, activeChat, addMessage }
}, {
  persist: getPersistConfig('talklist')
})
```

## 最佳实践

### 🎯 Store 设计原则
- **原子化**：每个 Store 负责单一业务域
- **类型安全**：充分利用 TypeScript 类型推导
- **副作用隔离**：仅在 Actions 中处理副作用
- **选择性持久化**：使用 `pick` 避免过度存储

### 🔄 状态生命周期
```
初始化 → 数据加载 → 用户交互 → 状态更新 → 持久化
   ↓                                        ↑
  重置 ← ← ← ← ← ← ← 登出/错误 ← ← ← ← ← ← ← ←
```

### 📊 性能优化策略
- **计算属性缓存**：复杂计算使用 `computed`
- **浅层响应**：大对象使用 `shallowRef`
- **按需持久化**：仅存储关键状态
- **批量更新**：避免频繁的状态变更

## 使用指南

### 📱 在组件中使用
```vue
<template>
  <div v-if="isLoggedIn">
    欢迎，{{ userName }}
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const { isLoggedIn, userName } = storeToRefs(userStore)
</script>
```

### 🔧 全局状态重置
```ts
// 登出时重置所有状态
async function logout() {
  await userStore.resetUserState()
  resetAllStores()  // 清理所有 Store
  router.push('/login')
}
```
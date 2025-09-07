# State Management Architecture

Modern state management solution based on Pinia, integrating persistence, reset mechanisms, and type safety, providing efficient data flow management for mobile applications.

## Core Architecture Design

### 🏗️ Store Factory & Plugin System
```ts
// src/store/index.ts - Core instance management
const store = createPinia()

// 1. Persistence plugin
store.use(piniaPluginPersistedstate)

// 2. Auto-registration plugin (collect store instances)
const registeredStores = new Set<any>()
store.use((ctx) => {
  registeredStores.add(ctx.store)
})

export function setupStore(app: App) {
  app.use(store)
}
```

### 🔄 Global Reset Mechanism
```ts
// One-click reset all states (logout, testing scenarios)
export function resetAllStores() {
  registeredStores.forEach((storeInstance) => {
    if (typeof storeInstance.$reset === 'function') {
      storeInstance.$reset()
    }
  })
}
```

### 💾 Smart Persistence Configuration
```ts
// Unified persistence strategy
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

**Design Advantages**:
- 🔧 **Configurable**: Auto-select storage type based on global configuration
- 🏷️ **Namespaced**: Avoid storage conflicts between multiple applications
- 🔄 **Auto-collection**: No manual registration needed, supports dynamic reset

## Real-world Case: User State Management

### 🔐 User Authentication Store
```ts
// src/store/user.ts - Complete user state management
export const useUserStore = defineStore('user', () => {
  // Reactive state
  const token = ref<string>('')
  const userInfo = ref<UserInfo | null>(null)
  
  // Computed properties
  const isLoggedIn = computed(() => !!token.value)
  const userName = computed(() => userInfo.value?.name || '')
  const userAvatar = computed(() => userInfo.value?.avatar || '')
  
  // Core Actions
  const setToken = (newToken: string) => {
    token.value = newToken
    if (newToken) {
      httpClient.setAuthToken(newToken)  // Side effect: inject request header
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
    httpClient.clearAuthToken()  // Side effect: clear request header
  }
  
  // Initialization logic
  const initUserData = async () => {
    if (token.value) {
      httpClient.setAuthToken(token.value)
      const success = await fetchUserInfo()
      if (!success) resetUserState()
    }
  }
  
  return {
    // State
    token, userInfo,
    // Computed properties
    isLoggedIn, userName, userAvatar,
    // Methods
    setToken, handleLoginSuccess, resetUserState, initUserData
  }
}, {
  // Persistence config: only persist key data
  persist: {
    ...getPersistConfig(STORAGE_KEYS.USER_INFO),
    pick: ['token', 'userInfo']  // Selective persistence
  }
})
```

### 📋 Other Business Store Examples
```ts
// src/store/talklist.ts - Message list state
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

## Best Practices

### 🎯 Store Design Principles
- **Atomic**: Each Store responsible for single business domain
- **Type Safe**: Fully utilize TypeScript type inference
- **Side Effect Isolation**: Only handle side effects in Actions
- **Selective Persistence**: Use `pick` to avoid over-storage

### 🔄 State Lifecycle
```
Initialize → Load Data → User Interaction → State Update → Persist
   ↓                                        ↑
  Reset ← ← ← ← ← ← Logout/Error ← ← ← ← ← ← ← ←
```

### 📊 Performance Optimization Strategies
- **Computed Caching**: Use `computed` for complex calculations
- **Shallow Reactive**: Use `shallowRef` for large objects
- **On-demand Persistence**: Only store critical state
- **Batch Updates**: Avoid frequent state changes

## Usage Guide

### 📱 Using in Components
```vue
<template>
  <div v-if="isLoggedIn">
    Welcome, {{ userName }}
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const { isLoggedIn, userName } = storeToRefs(userStore)
</script>
```

### 🔧 Global State Reset
```ts
// Reset all state on logout
async function logout() {
  await userStore.resetUserState()
  resetAllStores()  // Clean all stores
  router.push('/login')
}
```
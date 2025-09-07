---
title: State Management
---

# State Management

This project uses Pinia. We create the instance in `store/index.ts`, install the persistence plugin, and export reset utilities and a setup entry.

## Initialization (excerpt)

```ts
// src/store/index.ts
const store = createPinia()
store.use(piniaPluginPersistedstate)

export function setupStore(app: App) {
  app.use(store)
}

// Track created store instances to avoid relying on private APIs
const registeredStores = new Set<any>()
store.use((ctx) => {
  registeredStores.add(ctx.store)
})

export function resetAllStores() {
  registeredStores.forEach((storeInstance) => {
    if (typeof storeInstance.$reset === 'function') {
      storeInstance.$reset()
    }
  })
}

export function getPersistConfig(key: string) {
  const storagePrefix = getGlobalConfig('storageNS') || 'tdesign-mobile-'
  return {
    key: `${storagePrefix}${key}`,
    storage: (getGlobalConfig('storage') === 'sessionStorage' ? sessionStorage : localStorage),
  }
}
```

## User module (excerpt)

```ts
// src/store/user.ts
export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const userInfo = ref<UserInfo | null>(null)
  const isLoggedIn = computed(() => !!token.value)

  const setToken = (newToken: string) => {
    token.value = newToken
    if (newToken) httpClient.setAuthToken(newToken)
  }

  const resetUserState = () => {
    token.value = ''
    userInfo.value = null
    httpClient.clearAuthToken()
  }

  return { token, userInfo, isLoggedIn, setToken, resetUserState }
}, { persist: { ...getPersistConfig(STORAGE_KEYS.USER_INFO), pick: ['token', 'userInfo'] } })
```

## Usage

- Install at app startup: `useStore(app)` (see `src/main.ts`)
- Call `resetAllStores()` when you need to reset all modules

## Suggestions

- Keep stores as atomic as possible; avoid “god modules”
- Do side effects only in Actions (e.g., set token to httpClient)
- Use `persist` to keep login state and lightweight preferences

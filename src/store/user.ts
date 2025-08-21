import type { UserInfo } from '@/api/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { httpClient } from '@/api/request'

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(null)
  const userInfo = ref<UserInfo | null>(null)
  const isLoggedIn = computed(() => !!token.value)

  // 设置token
  const setToken = (newToken: string) => {
    token.value = newToken
    httpClient.setAuthToken(newToken)
  }

  // 设置用户信息
  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info
  }

  // 清除用户数据
  const clearUser = () => {
    token.value = null
    userInfo.value = null
    httpClient.clearAuthToken()
  }

  // 初始化用户数据
  const initUser = () => {
    if (token.value) {
      httpClient.setAuthToken(token.value)
    }
  }

  // 登录成功后的处理
  const handleLoginSuccess = (loginToken: string, user: UserInfo) => {
    setToken(loginToken)
    setUserInfo(user)
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    setToken,
    setUserInfo,
    clearUser,
    initUser,
    handleLoginSuccess,
  }
}, {
  persist: {
    key: 'user-store',
    storage: localStorage,
    pick: ['token', 'userInfo'],
  },
})

import type { UserInfo } from '@/api/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { httpClient } from '@/api/request'
import { STORAGE_KEYS } from '@/config/constants'
import { getPersistConfig } from './index'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref<string>('')
  const userInfo = ref<UserInfo | null>(null)

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)
  const userName = computed(() => userInfo.value?.name || '')
  const userAvatar = computed(() => userInfo.value?.avatar || '')
  const userId = computed(() => userInfo.value?.id || '')

  // Actions
  const setToken = (newToken: string) => {
    token.value = newToken
    // 设置HTTP客户端的认证token
    httpClient.setAuthToken(newToken)
  }

  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info
  }

  const fetchUserInfo = async () => {
    try {
      // 假设token有效，直接返回成功
      return true
    }
    catch (error) {
      console.error('获取用户信息失败:', error)
      return false
    }
  }

  const resetUserState = () => {
    token.value = ''
    userInfo.value = null
    // 清除HTTP客户端的认证token
    httpClient.clearAuthToken()
  }

  const initUserData = async () => {
    if (token.value) {
      // 恢复HTTP客户端的认证token
      httpClient.setAuthToken(token.value)
      const success = await fetchUserInfo()
      if (!success) {
        resetUserState()
      }
    }
  }

  const handleLoginSuccess = (newToken: string, user: UserInfo) => {
    setToken(newToken)
    setUserInfo(user)
    return { success: true }
  }

  return {
    // 状态
    token,
    userInfo,

    // 计算属性
    isLoggedIn,
    userName,
    userAvatar,
    userId,

    // Actions
    setToken,
    setUserInfo,
    fetchUserInfo,
    resetUserState,
    initUserData,
    handleLoginSuccess,
  }
}, {
  persist: {
    ...getPersistConfig(STORAGE_KEYS.USER_INFO),
    pick: ['token', 'userInfo'],
  },
})

import type { UserInfo } from '@/api/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { httpClient } from '@/api/request'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref<string | null>(localStorage.getItem('token'))
  const userInfo = ref<UserInfo | null>(null)

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)

  // 设置token
  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
    httpClient.setAuthToken(newToken)
  }

  // 设置用户信息
  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info
    localStorage.setItem('userInfo', JSON.stringify(info))
  }

  // 清除用户数据
  const clearUser = () => {
    token.value = null
    userInfo.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    httpClient.clearAuthToken()
  }

  // 初始化用户数据
  const initUser = () => {
    if (token.value) {
      httpClient.setAuthToken(token.value)
    }

    const savedUserInfo = localStorage.getItem('userInfo')
    if (savedUserInfo) {
      try {
        userInfo.value = JSON.parse(savedUserInfo)
      }
      catch (error) {
        console.error('Failed to parse user info:', error)
        localStorage.removeItem('userInfo')
      }
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
})

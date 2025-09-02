import type { UserInfo } from './types'
import { post, put } from './request'

// 发送验证码
export async function sendVerifyCode(params: { phone: string }) {
  return post('/auth/send-code', params)
}

// 验证码登录
export async function verifyCodeLogin(params: any) {
  return post('/auth/verify-login', params)
}

// 密码登录
export async function passwordLogin(params: any) {
  return post('/auth/password-login', params)
}

// 退出登录
export async function logout() {
  return post('/auth/logout')
}

// 刷新token
export async function refreshToken() {
  return post('/auth/refresh-token')
}

// 更新用户信息
export async function updateUserInfo(params: Partial<UserInfo>) {
  return put('/auth/update-user-info', params)
}

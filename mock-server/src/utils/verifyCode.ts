import type { VerifyCode } from '../models'

// 验证码存储
const verifyCodes = new Map<string, VerifyCode>()

export function generateVerifyCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function storeVerifyCode(phone: string, code: string): void {
  verifyCodes.set(phone, {
    code,
    expires: Date.now() + 5 * 60 * 1000, // 5分钟有效期
  })
}

export function validateVerifyCode(phone: string, code: string): boolean {
  const storedCode = verifyCodes.get(phone)

  if (!storedCode) {
    return false
  }

  if (storedCode.expires < Date.now()) {
    verifyCodes.delete(phone)
    return false
  }

  if (storedCode.code !== code) {
    return false
  }

  // 验证成功后删除验证码
  verifyCodes.delete(phone)
  return true
}

export function hasValidVerifyCode(phone: string): boolean {
  const storedCode = verifyCodes.get(phone)
  return !!(storedCode && storedCode.expires >= Date.now())
}

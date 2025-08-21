// 验证手机号
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

// 验证验证码
export function validateCode(code: string): boolean {
  const codeRegex = /^\d{6}$/
  return codeRegex.test(code)
}

// 清理手机号输入
export function cleanPhoneNumber(value: string): string {
  return value.replace(/\D/g, '')
}

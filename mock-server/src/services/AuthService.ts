import type { AuthToken, LoginResponse, User } from '../models'
import { users } from '../data'
import { UserCreateData } from '../models'
import { generateToken, generateVerifyCode, storeVerifyCode, validateVerifyCode, verifyToken } from '../utils'

export class AuthService {
  // 发送验证码
  static sendVerifyCode(phone: string): { success: boolean, message: string, countdown?: number } {
    if (!phone) {
      return { success: false, message: '手机号不能为空' }
    }

    const code = generateVerifyCode()
    storeVerifyCode(phone, code)

    console.warn(`验证码已发送到 ${phone}: ${code}`)

    return {
      success: true,
      message: '验证码发送成功',
      countdown: 60,
    }
  }

  // 验证码登录
  static verifyLogin(phone: string, code: string): { success: boolean, message: string, data?: LoginResponse } {
    if (!phone || !code) {
      return { success: false, message: '手机号和验证码不能为空' }
    }

    if (!validateVerifyCode(phone, code)) {
      return { success: false, message: '验证码错误或已过期' }
    }

    // 查找或创建用户
    let user = users.find(u => u.phone === phone)
    if (!user) {
      const purePhone = phone.replace(/^\+\d{1,4}/, '') // 去掉区号
      const newUser: User = {
        id: Date.now().toString(),
        name: `企鹅${purePhone.slice(-4)}`,
        phone,
        email: '',
        password: '',
        avatar: 'https://tdesign.gtimg.com/mobile/demos/avatar_default.png',
      }
      users.push(newUser)
      user = newUser
    }

    const token = generateToken(user)

    return {
      success: true,
      message: '登录成功',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
          avatar: user.avatar,
        },
      },
    }
  }

  // 密码登录
  static passwordLogin(account: string, password: string): { success: boolean, message: string, data?: LoginResponse } {
    if (!account || !password) {
      return { success: false, message: '账号和密码不能为空' }
    }

    const user = users.find(u => u.phone === account || u.email === account)

    if (!user) {
      return { success: false, message: '账号不存在' }
    }

    if (user.password !== password) {
      return { success: false, message: '密码错误' }
    }

    const token = generateToken(user)

    return {
      success: true,
      message: '登录成功',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
          avatar: user.avatar,
        },
      },
    }
  }

  // 刷新Token
  static refreshToken(token: string): { success: boolean, message: string, data?: { token: string } } {
    const decoded = verifyToken(token)

    if (!decoded) {
      return { success: false, message: 'Token无效' }
    }

    const user = users.find(u => u.id === decoded.id)
    if (!user) {
      return { success: false, message: '用户不存在' }
    }

    const newToken = generateToken(user)

    return {
      success: true,
      message: 'Token刷新成功',
      data: { token: newToken },
    }
  }

  // 验证Token
  static validateToken(token: string): AuthToken | null {
    return verifyToken(token)
  }
}

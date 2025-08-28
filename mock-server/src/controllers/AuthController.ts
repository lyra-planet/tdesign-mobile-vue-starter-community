import type { Request, Response } from 'express'
import { AuthService } from '../services'
import { sendResponse } from '../utils'

export class AuthController {
  // 发送验证码
  static sendCode(req: Request, res: Response): void {
    const { phone } = req.body
    const result = AuthService.sendVerifyCode(phone)

    if (result.success) {
      sendResponse(res, 200, result.message, { countdown: result.countdown })
    }
    else {
      sendResponse(res, 400, result.message)
    }
  }

  // 验证码登录
  static verifyLogin(req: Request, res: Response): void {
    const { phone, code } = req.body
    const result = AuthService.verifyLogin(phone, code)

    if (result.success) {
      sendResponse(res, 200, result.message, result.data)
    }
    else {
      sendResponse(res, 400, result.message)
    }
  }

  // 密码登录
  static passwordLogin(req: Request, res: Response): void {
    const { account, password } = req.body
    const result = AuthService.passwordLogin(account, password)

    if (result.success) {
      sendResponse(res, 200, result.message, result.data)
    }
    else {
      sendResponse(res, 400, result.message)
    }
  }

  // 退出登录
  static logout(req: Request, res: Response): void {
    sendResponse(res, 200, '退出成功')
  }

  // 刷新Token
  static refreshToken(req: Request, res: Response): void {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return sendResponse(res, 401, '未提供认证信息')
    }

    const token = authHeader.split(' ')[1]
    const result = AuthService.refreshToken(token)

    if (result.success) {
      sendResponse(res, 200, result.message, result.data)
    }
    else {
      sendResponse(res, 401, result.message)
    }
  }
}

import { Router } from 'express'
import { AuthController } from '../controllers'

const router = Router()

// 认证相关路由
router.post('/send-code', AuthController.sendCode)
router.post('/verify-login', AuthController.verifyLogin)
router.post('/password-login', AuthController.passwordLogin)
router.post('/logout', AuthController.logout)
router.post('/refresh-token', AuthController.refreshToken)

export default router

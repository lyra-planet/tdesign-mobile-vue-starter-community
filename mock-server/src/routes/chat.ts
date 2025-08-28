import { Router } from 'express'
import { ChatController } from '../controllers'

const router = Router()

// 聊天相关路由
router.get('/', ChatController.getTalkList)
router.get('/unread-count', ChatController.getUnreadCount)
router.get('/:id', ChatController.getChatById)
router.post('/:id/message', ChatController.sendMessage)
router.put('/:id/read', ChatController.markAsRead)

export default router

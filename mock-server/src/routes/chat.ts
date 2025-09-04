import type { Router as ExpressRouter } from 'express'
import { Router } from 'express'
import { ChatController } from '../controllers'

const router: ExpressRouter = Router()

// 聊天相关路由
router.get('/', ChatController.getTalkList)
router.get('/unread-count', ChatController.getUnreadCount)
router.get('/recent', ChatController.getRecentMessages)
router.get('/:id', ChatController.getChatById)
router.post('/:id/message', ChatController.sendMessage)
router.put('/:id/read', ChatController.markAsRead)
router.delete('/:id/message/:messageId', ChatController.deleteMessage)
router.delete('/:id/clear', ChatController.clearChatHistory)

export default router

import app from './app'

const PORT = 3001

// 启动服务器
app.listen(PORT, () => {
  console.warn(`🚀 Mock server is running on http://localhost:${PORT}`)
  console.warn('📚 Available endpoints:')

  console.warn('\n🔐 认证相关:')
  console.warn('  POST /api/auth/send-code - 发送验证码')
  console.warn('  POST /api/auth/verify-login - 验证码登录')
  console.warn('  POST /api/auth/password-login - 密码登录')
  console.warn('  POST /api/auth/logout - 退出登录')

  console.warn('\n💬 聊天相关:')
  console.warn('  GET  /api/chat - 获取聊天列表')
  console.warn('  POST /api/chat/:id/message - 发送消息')
  console.warn('  PUT  /api/chat/:id/read - 标记为已读')
  console.warn('  GET  /api/chat/unread-count - 获取未读消息总数')

  console.warn('\n🏠 首页相关:')
  console.warn('  GET  /api/home/content - 获取首页内容')
  console.warn('  POST /api/home/refresh - 刷新首页内容')

  console.warn('\n📊 数据中心:')
  console.warn('  GET  /api/datacenter/stats - 获取统计数据')

  console.warn('\n👤 个人页面:')
  console.warn('  GET  /api/profile/services - 获取服务数据')
  console.warn('  GET  /api/profile/stats - 获取统计数据')
  console.warn('  POST /api/profile/service-click - 记录服务点击')

  console.warn('\n📝 测试账号:')
  console.warn('  手机号: 8613812345678, 密码: 123456')
  console.warn('  手机号: 8613987654321, 密码: 123456')

  console.warn('\n💬 聊天列表测试数据:')
  console.warn('  共3个聊天记录: Pite(id:1), Bob(id:2), Alice(id:3)')

  console.warn('\n📊 数据中心测试数据:')
  console.warn('  10个视频统计记录，支持按区域查看')

  console.warn('\n🏠 首页测试数据:')
  console.warn('  6个内容项，支持分页和刷新')
})

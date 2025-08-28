import app from './app'

const PORT = 3001

// 启动服务器
app.listen(PORT, () => {
  console.warn(`🚀 Mock server is running on http://localhost:${PORT}`)
  console.warn('📚 Available endpoints:')
  console.warn('  POST /api/auth/send-code - 发送验证码')
  console.warn('  POST /api/auth/verify-login - 验证码登录')
  console.warn('  POST /api/auth/password-login - 密码登录')
  console.warn('  POST /api/auth/logout - 退出登录')
  console.warn('  POST /api/auth/refresh-token - 刷新Token')
  console.warn('  GET  /api/talklist - 获取聊天列表')
  console.warn('  GET  /api/talklist/:id - 获取聊天详情')
  console.warn('  POST /api/talklist/:id/message - 发送消息')
  console.warn('  PUT  /api/talklist/:id/read - 标记为已读')

  console.warn('\n📝 测试账号:')
  console.warn('  手机号: 13812345678, 密码: 123456')
  console.warn('  手机号: 13987654321, 密码: 123456')

  console.warn('\n💬 聊天列表测试数据:')
  console.warn('  共3个聊天记录: Pite(id:1), Bob(id:2), Alice(id:3)')
})

// ========================================
// 此文件已重构为模块化架构
// 新的入口文件: src/server.ts
// 重构后的代码在 src/ 目录下
// ========================================

import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import jwt from 'jsonwebtoken'

const app = express()
const PORT = 3001
const JWT_SECRET = 'tdesign-mobile-secret-key'

app.use(cors())
app.use(bodyParser.json())

const users = [
  {
    id: '1',
    name: '企鹅一号',
    phone: '+8613812345678',
    email: 'penguin1@example.com',
    password: '123456',
    avatar: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
  },
  {
    id: '2',
    name: '企鹅二号',
    phone: '+8613987654321',
    email: 'penguin2@example.com',
    password: '123456',
    avatar: 'https://tdesign.gtimg.com/mobile/demos/avatar2.png',
  },
]

// 聊天列表数据
const talklist = [
  {
    id: '1',
    picture: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    count: 4,
    name: 'Pite',
    message: [
      { id: '1', tag: 'other', value: '那明天准时见哦' },
      { id: '2', tag: 'me', value: '好的，我会记得的' },
      { id: '3', tag: 'me', value: '在吗？' },
      { id: '4', tag: 'time', value: '今天 10:50' },
      {
        id: '5',
        tag: 'other',
        value: '有个问题想咨询一下，关于Tdesign组件库如何更好的使用',
      },
      { id: '6', tag: 'me', value: '你请问' },
    ],
  },
  {
    id: '2',
    picture: 'https://tdesign.gtimg.com/mobile/demos/avatar2.png',
    count: 2,
    name: 'Bob',
    message: [
      { id: '1', tag: 'other', value: '那明天准时见哦' },
      { id: '2', tag: 'me', value: '好的，我会记得的' },
      { id: '3', tag: 'me', value: '在吗？' },
      { id: '4', tag: 'time', value: '今天 10:50' },
      {
        id: '5',
        tag: 'other',
        value: '有个问题想咨询一下，关于Tdesign组件库如何更好的使用',
      },
    ],
  },
  {
    id: '3',
    picture: 'https://tdesign.gtimg.com/mobile/demos/avatar3.png',
    count: 6,
    name: 'Alice',
    message: [
      { id: '1', tag: 'other', value: '那明天准时见哦' },
      { id: '2', tag: 'me', value: '好的，我会记得的' },
      { id: '3', tag: 'me', value: '在吗？' },
      { id: '4', tag: 'time', value: '今天 10:50' },
      {
        id: '5',
        tag: 'other',
        value: '有个问题想咨询一下，关于Tdesign组件库如何更好的使用',
      },
    ],
  },
]

// 验证码存储
const verifyCodes = new Map()

// 生成验证码
function generateVerifyCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// 生成JWT token
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      phone: user.phone,
    },
    JWT_SECRET,
    { expiresIn: '7d' },
  )
}

// 验证JWT token
function verifyToken(token: string): { id: string, phone: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    if (typeof decoded === 'object' && decoded && 'id' in decoded && 'phone' in decoded) {
      return decoded as { id: string, phone: string }
    }
    return null
  }
  catch {
    return null
  }
}

function sendResponse(res, code = 200, message = 'Success', data?: any) {
  res.status(code).json({
    code,
    message,
    data,
    success: code === 200,
  })
}

// 发送验证码
app.post('/api/auth/send-code', (req, res) => {
  const { phone } = req.body

  if (!phone) {
    return sendResponse(res, 400, '手机号不能为空')
  }

  // 生成验证码
  const code = generateVerifyCode()

  // 存储验证码（5分钟有效期）
  verifyCodes.set(phone, {
    code,
    expires: Date.now() + 5 * 60 * 1000,
  })

  console.warn(`验证码已发送到 ${phone}: ${code}`)

  sendResponse(res, 200, '验证码发送成功', {
    countdown: 60,
  })
})

// 验证码登录
app.post('/api/auth/verify-login', (req, res) => {
  const { phone, code } = req.body

  if (!phone || !code) {
    return sendResponse(res, 400, '手机号和验证码不能为空')
  }

  // 验证验证码
  const storedCode = verifyCodes.get(phone)
  if (!storedCode) {
    return sendResponse(res, 400, '验证码已过期，请重新获取')
  }

  if (storedCode.expires < Date.now()) {
    verifyCodes.delete(phone)
    return sendResponse(res, 400, '验证码已过期，请重新获取')
  }

  if (storedCode.code !== code) {
    return sendResponse(res, 400, '验证码错误')
  }

  // 验证码正确，删除验证码
  verifyCodes.delete(phone)

  // 查找或创建用户
  let user = users.find(u => u.phone === phone)
  if (!user) {
    const purePhone = phone.replace(/^\+\d{1,4}/, '') // 去掉区号
    user = {
      id: Date.now().toString(),
      name: `企鹅${purePhone.slice(-4)}`,
      phone,
      email: '',
      password: '',
      avatar: 'https://tdesign.gtimg.com/mobile/demos/avatar_default.png',
    }
    users.push(user)
  }

  // 生成token
  const token = generateToken(user)

  sendResponse(res, 200, '登录成功', {
    token,
    user: {
      id: user.id,
      name: user.name,
      phone: user.phone,
      avatar: user.avatar,
    },
  })
})

// 密码登录
app.post('/api/auth/password-login', (req, res) => {
  const { account, password } = req.body

  if (!account || !password) {
    return sendResponse(res, 400, '账号和密码不能为空')
  }

  // 查找用户（支持手机号和邮箱）
  const user = users.find(u =>
    u.phone === account
    || u.email === account,
  )

  if (!user) {
    return sendResponse(res, 400, '账号不存在')
  }

  if (user.password !== password) {
    return sendResponse(res, 400, '密码错误')
  }

  // 生成token
  const token = generateToken(user)

  sendResponse(res, 200, '登录成功', {
    token,
    user: {
      id: user.id,
      name: user.name,
      phone: user.phone,
      avatar: user.avatar,
    },
  })
})

// 退出登录
app.post('/api/auth/logout', (req, res) => {
  sendResponse(res, 200, '退出成功')
})

// 刷新token
app.post('/api/auth/refresh-token', (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return sendResponse(res, 401, '未提供认证信息')
  }

  const token = authHeader.split(' ')[1]
  const decoded = verifyToken(token)

  if (!decoded) {
    return sendResponse(res, 401, 'Token无效')
  }

  const user = users.find(u => u.id === decoded.id)
  if (!user) {
    return sendResponse(res, 401, '用户不存在')
  }

  // 生成新token
  const newToken = generateToken(user)

  sendResponse(res, 200, 'Token刷新成功', {
    token: newToken,
  })
})

// 获取聊天列表
app.get('/api/talklist', (req, res) => {
  sendResponse(res, 200, '获取聊天列表成功', talklist)
})

// 根据ID获取聊天详情
app.get('/api/talklist/:id', (req, res) => {
  const { id } = req.params
  const chat = talklist.find(item => item.id === id)

  if (!chat) {
    return sendResponse(res, 404, '聊天记录不存在')
  }

  sendResponse(res, 200, '获取聊天详情成功', chat)
})

// 发送消息到指定聊天
app.post('/api/talklist/:id/message', (req, res) => {
  const { id } = req.params
  const { message } = req.body

  if (!message || !message.trim()) {
    return sendResponse(res, 400, '消息内容不能为空')
  }

  const chat = talklist.find(item => item.id === id)
  if (!chat) {
    return sendResponse(res, 404, '聊天记录不存在')
  }

  // 添加新消息
  const newMessage = {
    id: Date.now().toString(),
    tag: 'me',
    value: message.trim(),
  }

  chat.message.push(newMessage)

  sendResponse(res, 200, '消息发送成功', newMessage)
})

// 清除聊天未读消息数量
app.put('/api/talklist/:id/read', (req, res) => {
  const { id } = req.params
  const chat = talklist.find(item => item.id === id)

  if (!chat) {
    return sendResponse(res, 404, '聊天记录不存在')
  }

  chat.count = 0
  sendResponse(res, 200, '标记为已读成功', { id, count: 0 })
})

// 404处理
app.use((req, res) => {
  sendResponse(res, 404, '接口不存在')
})

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

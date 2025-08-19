const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
const PORT = 3001
const JWT_SECRET = 'tdesign-mobile-secret-key'

app.use(cors())
app.use(bodyParser.json())

const users = [
  {
    id: '1',
    name: '企鹅一号',
    phone: '13812345678',
    password: '123456',
    avatar: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
  },
  {
    id: '2',
    name: '企鹅二号',
    phone: '13987654321',
    password: '123456',
    avatar: 'https://tdesign.gtimg.com/mobile/demos/avatar2.png',
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
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  }
  catch (error) {
    return null
  }
}

function sendResponse(res, code = 200, message = 'Success', data) {
  res.status(code).json({
    code,
    message,
    data,
    success: code === 200,
  })
}

// 发送验证码
app.post('/api/auth/send-code', (req, res) => {
  const { phone, countryCode } = req.body

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

  console.log(`验证码已发送到 ${countryCode} ${phone}: ${code}`)

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
    // 新用户自动注册
    user = {
      id: (users.length + 1).toString(),
      name: `用户${phone.slice(-4)}`,
      phone,
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

// 获取用户信息（需要认证）
app.get('/api/user/info', (req, res) => {
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

  sendResponse(res, 200, '获取用户信息成功', {
    id: user.id,
    name: user.name,
    phone: user.phone,
    avatar: user.avatar,
  })
})

// 404处理
app.use((req, res) => {
  sendResponse(res, 404, '接口不存在')
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 Mock server is running on http://localhost:${PORT}`)
  console.log('📚 Available endpoints:')
  console.log('  POST /api/auth/send-code - 发送验证码')
  console.log('  POST /api/auth/verify-login - 验证码登录')
  console.log('  POST /api/auth/password-login - 密码登录')
  console.log('  POST /api/auth/logout - 退出登录')
  console.log('  POST /api/auth/refresh-token - 刷新Token')
  console.log('  GET  /api/user/info - 获取用户信息')
  console.log('  GET  /api/health - 健康检查')
  console.log('\n📝 测试账号:')
  console.log('  手机号: 13812345678, 密码: 123456')
  console.log('  手机号: 13987654321, 密码: 123456')
})

# TDesign Mobile Vue 模拟后端服务

这是一个简单的 Node.js 模拟后端服务，为 TDesign Mobile Vue 项目提供认证相关的 API 接口。

## 安装依赖

```bash
cd mock-server
npm install
```

## 启动服务

```bash
# 开发模式（自动重启）
npm run dev

# 生产模式
npm start
```

服务将在 `http://localhost:3001` 启动。

## API 接口

### 认证相关

#### 1. 发送验证码

- **URL**: `POST /api/auth/send-code`
- **参数**:
  ```json
  {
    "phone": "13812345678",
    "countryCode": "+86"
  }
  ```
- **响应**:
  ```json
  {
    "code": 200,
    "message": "验证码发送成功",
    "data": {
      "countdown": 60
    },
    "success": true
  }
  ```

#### 2. 验证码登录

- **URL**: `POST /api/auth/verify-login`
- **参数**:
  ```json
  {
    "phone": "13812345678",
    "code": "123456",
    "countryCode": "+86"
  }
  ```
- **响应**:
  ```json
  {
    "code": 200,
    "message": "登录成功",
    "data": {
      "token": "jwt-token-string",
      "user": {
        "id": "1",
        "name": "张三",
        "phone": "13812345678",
        "avatar": "https://example.com/avatar.png"
      }
    },
    "success": true
  }
  ```

#### 3. 密码登录

- **URL**: `POST /api/auth/password-login`
- **参数**:
  ```json
  {
    "account": "13812345678",
    "password": "123456"
  }
  ```

#### 4. 退出登录

- **URL**: `POST /api/auth/logout`

#### 5. 刷新Token

- **URL**: `POST /api/auth/refresh-token`
- **Header**: `Authorization: Bearer <token>`

#### 6. 获取用户信息

- **URL**: `GET /api/user/info`
- **Header**: `Authorization: Bearer <token>`

## 测试账号

- 手机号: `13812345678`, 密码: `123456`
- 手机号: `13987654321`, 密码: `123456`

## 验证码说明

- 发送验证码后，控制台会输出验证码
- 验证码有效期为 5 分钟
- 任何 6 位数字都可以作为验证码（开发模式）

## 注意事项

1. 这是一个模拟服务，不应在生产环境中使用
2. 数据存储在内存中，重启服务后数据会丢失

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
    "phone": "+8613812345678"
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
    "phone": "+8613812345678",
    "code": "123456"
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
        "name": "企鹅一号",
        "phone": "+8613812345678",
        "avatar": "https://tdesign.gtimg.com/mobile/demos/avatar1.png"
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
    "account": "+8613812345678",
    "password": "123456"
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
        "name": "企鹅一号",
        "phone": "+8613812345678",
        "avatar": "https://tdesign.gtimg.com/mobile/demos/avatar1.png"
      }
    },
    "success": true
  }
  ```

#### 4. 退出登录

- **URL**: `POST /api/auth/logout`
- **响应**:
  ```json
  {
    "code": 200,
    "message": "退出成功",
    "success": true
  }
  ```

#### 5. 刷新Token

- **URL**: `POST /api/auth/refresh-token`
- **Header**: `Authorization: Bearer <token>`
- **响应**:
  ```json
  {
    "code": 200,
    "message": "Token刷新成功",
    "data": {
      "token": "new-jwt-token-string"
    },
    "success": true
  }
  ```

### 聊天列表相关

#### 1. 获取聊天列表

- **URL**: `GET /api/talklist`
- **响应**:
  ```json
  {
    "code": 200,
    "message": "获取聊天列表成功",
    "data": [
      {
        "id": "1",
        "picture": "https://tdesign.gtimg.com/mobile/demos/avatar1.png",
        "count": 4,
        "name": "Pite",
        "message": [
          { "id": "1", "tag": "other", "value": "那明天准时见哦" },
          { "id": "2", "tag": "me", "value": "好的，我会记得的" }
        ]
      }
    ],
    "success": true
  }
  ```

#### 2. 获取聊天详情

- **URL**: `GET /api/talklist/:id`
- **参数**: URL 参数 `id` - 聊天记录 ID
- **响应**:
  ```json
  {
    "code": 200,
    "message": "获取聊天详情成功",
    "data": {
      "id": "1",
      "picture": "https://tdesign.gtimg.com/mobile/demos/avatar1.png",
      "count": 4,
      "name": "Pite",
      "message": [
        { "id": "1", "tag": "other", "value": "那明天准时见哦" },
        { "id": "2", "tag": "me", "value": "好的，我会记得的" },
        { "id": "3", "tag": "me", "value": "在吗？" },
        { "id": "4", "tag": "time", "value": "今天 10:50" }
      ]
    },
    "success": true
  }
  ```

#### 3. 发送消息

- **URL**: `POST /api/talklist/:id/message`
- **参数**:
  - URL 参数 `id` - 聊天记录 ID
  - Body:
    ```json
    {
      "message": "这是一条新消息"
    }
    ```
- **响应**:
  ```json
  {
    "code": 200,
    "message": "消息发送成功",
    "data": {
      "id": "1634567890123",
      "tag": "me",
      "value": "这是一条新消息"
    },
    "success": true
  }
  ```

#### 4. 标记为已读

- **URL**: `PUT /api/talklist/:id/read`
- **参数**: URL 参数 `id` - 聊天记录 ID
- **响应**:
  ```json
  {
    "code": 200,
    "message": "标记为已读成功",
    "data": {
      "id": "1",
      "count": 0
    },
    "success": true
  }
  ```

## 数据说明

### 消息类型 (tag)

- `me`: 当前用户发送的消息
- `other`: 对方发送的消息
- `time`: 时间标记

### 聊天列表数据结构

- `id`: 聊天记录唯一标识
- `picture`: 聊天对象头像
- `count`: 未读消息数量
- `name`: 聊天对象名称
- `message`: 消息列表数组

## 测试账号

- 手机号: `8613812345678`, 密码: `123456`, 用户名: `企鹅一号`
- 手机号: `8613987654321`, 密码: `123456`, 用户名: `企鹅二号`

## 测试数据

### 聊天列表

- Pite (id: 1) - 4条未读消息
- Bob (id: 2) - 2条未读消息
- Alice (id: 3) - 6条未读消息

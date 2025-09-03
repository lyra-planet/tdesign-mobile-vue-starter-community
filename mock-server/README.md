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

### 首页相关

#### 1. 获取首页内容

- **URL**: `GET /api/home/content`
- **参数**:
  - `page` (可选): 页码，默认为1
  - `limit` (可选): 每页条数，默认为10
- **响应**:
  ```json
  {
    "code": 200,
    "message": "获取首页内容成功",
    "data": {
      "items": [
        {
          "type": "card",
          "id": 1,
          "title": "人工智能艺术作品展示",
          "image": "https://example.com/image.png",
          "tags": [
            { "label": "AI艺术", "theme": "primary" },
            { "label": "版权素材", "theme": "success" }
          ]
        }
      ],
      "pagination": {
        "page": 1,
        "limit": 10,
        "total": 6,
        "totalPages": 1,
        "hasMore": false
      }
    },
    "success": true
  }
  ```

#### 2. 获取内容详情

- **URL**: `GET /api/home/content/:id`
- **参数**: URL 参数 `id` - 内容ID
- **响应**:
  ```json
  {
    "code": 200,
    "message": "获取内容详情成功",
    "data": {
      "type": "card",
      "id": 1,
      "title": "人工智能艺术作品展示",
      "image": "https://example.com/image.png",
      "tags": [
        { "label": "AI艺术", "theme": "primary" }
      ]
    },
    "success": true
  }
  ```

#### 3. 刷新首页内容

- **URL**: `POST /api/home/refresh`
- **响应**:
  ```json
  {
    "code": 200,
    "message": "刷新成功",
    "data": {
      "items": [
        {
          "type": "card",
          "id": 1,
          "title": "人工智能艺术作品展示",
          "image": "https://example.com/image.png",
          "tags": [
            { "label": "AI艺术", "theme": "primary" }
          ]
        }
      ],
      "refreshTime": "2024-01-01T00:00:00.000Z"
    },
    "success": true
  }
  ```

### 数据中心相关

#### 1. 获取数据中心统计数据

- **URL**: `GET /api/datacenter/stats`
- **响应**:
  ```json
  {
    "code": 200,
    "message": "获取数据中心统计数据成功",
    "data": {
      "regionData": [
        {
          "index": 1,
          "title": "视频A",
          "global": "156",
          "northChina": "89",
          "eastChina": "134",
          "westChina": "67",
          "southChina": "123"
        }
      ],
      "regionColumns": [
        {
          "colKey": "title",
          "title": "视频",
          "fixed": "left",
          "width": "80px"
        }
      ]
    },
    "success": true
  }
  ```

#### 2. 获取视频详情

- **URL**: `GET /api/datacenter/video/:id`
- **参数**: URL 参数 `id` - 视频索引
- **响应**:
  ```json
  {
    "code": 200,
    "message": "获取视频详情成功",
    "data": {
      "index": 1,
      "title": "视频A",
      "global": "156",
      "northChina": "89",
      "eastChina": "134",
      "westChina": "67",
      "southChina": "123"
    },
    "success": true
  }
  ```

### 个人页面相关

#### 1. 获取个人服务数据

- **URL**: `GET /api/profile/services`
- **响应**:
  ```json
  {
    "code": 200,
    "message": "获取个人服务数据成功",
    "data": {
      "serviceGroups": [
        [
          {
            "name": "微信",
            "icon": "/my/wechat.svg",
            "type": "external",
            "url": "weixin://"
          }
        ]
      ],
      "menuItems": [
        {
          "name": "联系客服",
          "icon": "service",
          "type": "internal"
        }
      ]
    },
    "success": true
  }
  ```

#### 2. 获取用户统计数据

- **URL**: `GET /api/profile/stats`
- **参数**:
  - `userId` (可选): 用户ID
- **响应**:
  ```json
  {
    "code": 200,
    "message": "获取用户统计数据成功",
    "data": {
      "stats": [
        {
          "label": "全部",
          "icon": "form",
          "count": 12,
          "key": "all_posts"
        }
      ]
    },
    "success": true
  }
  ```

#### 3. 更新用户统计数据

- **URL**: `POST /api/profile/stats`
- **参数**:
  ```json
  {
    "statKey": "all_posts",
    "increment": 1
  }
  ```
- **响应**:
  ```json
  {
    "code": 200,
    "message": "更新统计数据成功",
    "data": {
      "stat": {
        "label": "全部",
        "icon": "form",
        "count": 13,
        "key": "all_posts"
      }
    },
    "success": true
  }
  ```

#### 4. 记录服务点击

- **URL**: `POST /api/profile/service-click`
- **参数**:
  ```json
  {
    "serviceName": "微信",
    "serviceType": "external"
  }
  ```
- **响应**:
  ```json
  {
    "code": 200,
    "message": "服务点击记录成功",
    "data": {
      "serviceName": "微信",
      "serviceType": "external",
      "timestamp": "2024-01-01T00:00:00.000Z"
    },
    "success": true
  }
  ```

## 测试数据

### 聊天列表

- Pite (id: 1) - 4条未读消息
- Bob (id: 2) - 2条未读消息
- Alice (id: 3) - 6条未读消息

### 数据中心

- 10个视频统计记录（视频A-J）
- 支持按区域查看（全球、华北、华东、华西、华南）

### 首页内容

- 6个内容项（卡片和轮播图）
- 支持分页和刷新功能

### 个人页面

- 4个统计项（全部、待审核、已发布、草稿箱）
- 8个服务项（微信、QQ、TDoc、TMap、数据中心等）
- 2个菜单项（联系客服、设置）

# 聊天服务 API 文档

## 基础路径

所有API请求的基础路径为: `http://localhost:3001/api/talklist`

## API 接口

### 1. 获取聊天列表

- **URL**: `GET /`
- **描述**: 获取所有聊天记录，按未读消息数量排序
- **响应示例**:

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
      "message": []
    }
  ],
  "success": true
}
```

### 2. 获取聊天详情

- **URL**: `GET /:id`
- **描述**: 根据聊天ID获取详细信息，消息按时间排序
- **参数**:
  - `id` (path): 聊天记录ID
- **响应示例**:

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
      {
        "id": "1",
        "tag": "other",
        "value": "那明天准时见哦",
        "time": 1704070800000
      }
    ]
  },
  "success": true
}
```

### 3. 发送消息

- **URL**: `POST /:id/message`
- **描述**: 向指定聊天发送消息，会自动模拟对方回复
- **参数**:
  - `id` (path): 聊天记录ID
  - `message` (body): 消息内容
- **请求体**:

```json
{
  "message": "这是一条新消息"
}
```

- **响应示例**:

```json
{
  "code": 200,
  "message": "消息发送成功",
  "data": {
    "id": "1704070800001",
    "tag": "me",
    "value": "这是一条新消息",
    "time": 1704070800001
  },
  "success": true
}
```

### 4. 标记为已读

- **URL**: `PUT /:id/read`
- **描述**: 将指定聊天的未读消息数清零
- **参数**:
  - `id` (path): 聊天记录ID
- **响应示例**:

```json
{
  "code": 200,
  "message": "标记为已读成功，清除了 4 条未读消息",
  "data": {
    "id": "1",
    "count": 0
  },
  "success": true
}
```

### 5. 获取未读消息总数

- **URL**: `GET /unread-count`
- **描述**: 获取所有聊天的未读消息总数和详情
- **响应示例**:

```json
{
  "code": 200,
  "message": "当前共有 12 条未读消息",
  "data": {
    "count": 12,
    "details": [
      {
        "id": "1",
        "name": "Pite",
        "count": 4
      },
      {
        "id": "2",
        "name": "Bob",
        "count": 2
      }
    ]
  },
  "success": true
}
```

### 6. 获取最近消息

- **URL**: `GET /recent`
- **描述**: 获取最近的消息记录
- **查询参数**:
  - `limit` (query, 可选): 限制返回数量，默认为10
- **响应示例**:

```json
{
  "code": 200,
  "message": "获取最近消息成功",
  "data": [
    {
      "chatId": "1",
      "chatName": "Pite",
      "lastMessage": {
        "id": "6",
        "tag": "me",
        "value": "你请问",
        "time": 1704074460000
      }
    }
  ],
  "success": true
}
```

### 7. 删除消息

- **URL**: `DELETE /:id/message/:messageId`
- **描述**: 删除指定聊天中的指定消息
- **参数**:
  - `id` (path): 聊天记录ID
  - `messageId` (path): 消息ID
- **响应示例**:

```json
{
  "code": 200,
  "message": "消息删除成功",
  "success": true
}
```

### 8. 清空聊天记录

- **URL**: `DELETE /:id/clear`
- **描述**: 清空指定聊天的所有消息记录
- **参数**:
  - `id` (path): 聊天记录ID
- **响应示例**:

```json
{
  "code": 200,
  "message": "聊天记录清空成功，删除了 6 条消息",
  "success": true
}
```

## 特殊功能

### 自动回复

当发送消息时，系统会在1-3秒后自动模拟对方回复，并增加未读消息数。

### 时间戳格式

所有时间戳都是Unix毫秒时间戳格式，可以通过 `new Date(timestamp)` 转换为日期对象。

### 错误处理

所有API都会返回统一的错误格式：

```json
{
  "code": 404,
  "message": "聊天记录不存在",
  "success": false
}
```

## 测试用例

### 使用curl测试发送消息

```bash
curl -X POST http://localhost:3001/api/talklist/1/message \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, this is a test message"}'
```

### 使用curl测试标记已读

```bash
curl -X PUT http://localhost:3001/api/talklist/1/read
```

### 使用curl测试获取未读数

```bash
curl -X GET http://localhost:3001/api/talklist/unread-count
```

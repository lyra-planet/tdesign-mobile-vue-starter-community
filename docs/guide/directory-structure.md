# 目录结构

> 本文档详细说明项目的整体架构和目录组织，帮助开发者快速理解项目结构。

## 项目根目录

```text
tdesign-mobile-vue-starter-community/
├── 📄 配置文件
│   ├── .browserslistrc          # 浏览器兼容性配置
│   ├── .env*                    # 环境变量配置文件
│   ├── .eslintcache            # ESLint 缓存文件
│   ├── .gitignore              # Git 忽略文件配置
│   ├── .lintstagedrc           # Git 提交前代码检查配置
│   ├── .npmrc                  # npm 配置文件
│   ├── .nvmrc                  # Node.js 版本指定
│   ├── commitlint.config.js    # 提交信息规范配置
│   ├── eslint.config.js        # ESLint 代码规范配置
│   ├── postcss.config.js       # PostCSS 配置
│   ├── tsconfig.json           # TypeScript 配置
│   ├── vite.config.ts          # Vite 构建工具配置
│   └── package.json            # 项目依赖与脚本
│
├── 🔧 开发工具
│   ├── .github/                # GitHub Actions 配置
│   ├── .husky/                 # Git Hooks 配置
│   ├── .vscode/                # VS Code 编辑器配置
│   └── build/                  # 构建脚本与工具
│       ├── info.ts             # 项目信息获取
│       ├── plugins.ts          # Vite 插件配置
│       └── utils.ts            # 构建工具函数
│
├── 📚 文档资源
│   ├── docs/                   # 项目文档
│   │   ├── guide/              # 中文开发指南
│   │   ├── en/guide/           # 英文开发指南
│   │   ├── images/             # 文档图片资源
│   │   └── pages/              # 页面说明文档
│   ├── locales/                # 国际化语言包
│   │   ├── zh-cn.yaml          # 中文语言包
│   │   └── en-us.yaml          # 英文语言包
│   └── README.md               # 项目说明文档
│
├── 🌐 静态资源
│   ├── public/                 # 公共静态资源
│   │   ├── config.json         # 运行时配置文件
│   │   ├── favicon.ico         # 网站图标
│   │   └── mockServiceWorker.js # MSW Service Worker
│   └── index.html              # HTML 入口文件
│
├── 🧪 开发与测试
│   ├── mock-server/            # Mock 服务器配置
│   └── types/                  # 全局类型定义
│       ├── assets.d.ts         # 资源文件类型
│       ├── auto-imports.d.ts   # 自动导入类型
│       ├── components.d.ts     # 组件类型
│       ├── global.d.ts         # 全局类型
│       ├── shims-tsx.d.ts      # TSX 支持
│       ├── shims-vue.d.ts      # Vue 文件类型
│       └── vue-router.d.ts     # 路由类型
│
└── 📦 依赖管理
    ├── node_modules/           # 项目依赖包
    └── pnpm-lock.yaml          # pnpm 锁定文件
```

## 核心源码结构

```text
src/                            # 主要源码目录
├── 🚀 应用入口
│   ├── App.vue                 # 根组件
│   └── main.ts                 # 应用启动入口
│
├── 🌐 网络与接口
│   └── api/                    # API 接口层
│       ├── request.ts          # 统一 HTTP 客户端配置
│       ├── types.ts            # 接口类型定义
│       ├── auth.ts             # 认证相关接口
│       ├── chat.ts             # 聊天功能接口
│       ├── datacenter.ts       # 数据中心接口
│       ├── home.ts             # 首页数据接口
│       ├── profile.ts          # 用户资料接口
│       ├── publish.ts          # 发布功能接口
│       └── search.ts           # 搜索功能接口
│
├── 🎨 UI 组件与资源
│   ├── components/             # 通用组件库
│   │   ├── index.ts            # 组件导出入口
│   │   ├── FormContainer.vue   # 表单容器组件
│   │   ├── MenuItem.vue        # 菜单项组件
│   │   ├── ServiceGrid.vue     # 服务网格组件
│   │   ├── StatsSection.vue    # 统计信息组件
│   │   └── VirtualList.vue     # 虚拟列表组件
│   │
│   ├── assets/                 # 静态资源
│   │   ├── images/             # 图片资源（PNG、JPG等）
│   │   └── svgs/               # SVG 矢量图标
│   │
│   └── style/                  # 样式文件
│       ├── index.scss          # 全局样式入口
│       ├── reset.scss          # 样式重置
│       └── tailwind.css        # Tailwind CSS 配置
│
├── 📱 页面与布局
│   ├── layout/                 # 布局框架
│   │   ├── index.vue           # 主布局容器
│   │   ├── components/         # 布局相关组件
│   │   │   ├── BottomNavigation.vue # 底部导航
│   │   │   └── PageHeader.vue  # 页面头部
│   │   └── composables/        # 布局逻辑复用
│   │       ├── useLayoutState.ts   # 布局状态管理
│   │       └── useNavigation.ts    # 导航逻辑
│   │
│   └── views/                  # 页面视图
│       ├── home/               # 🏠 首页
│       │   └── index.vue
│       ├── login/              # 🔐 登录页
│       │   └── index.vue
│       ├── search/             # 🔍 搜索页
│       │   └── index.vue
│       ├── publish/            # ✏️ 发布页
│       │   ├── index.vue
│       │   └── components/     # 发布页专用组件
│       ├── talklist/           # 💬 消息列表页
│       │   └── index.vue
│       ├── my/                 # 👤 个人中心页
│       │   └── index.vue
│       ├── datacenter/         # 📊 数据中心页
│       │   └── index.vue
│       ├── notice/             # 📢 通知页
│       │   └── index.vue
│       └── error/              # ❌ 错误页面
│           └── index.vue
│
├── 🔧 核心功能模块
│   ├── router/                 # 路由配置
│   │   ├── index.ts            # 路由定义与配置
│   │   └── utils.ts            # 路由工具函数
│   │
│   ├── store/                  # 状态管理
│   │   ├── index.ts            # Pinia 实例与持久化配置
│   │   ├── user.ts             # 用户状态管理
│   │   └── talklist.ts         # 消息列表状态管理
│   │
│   ├── composables/            # 组合式函数
│   │   └── useTheme.ts         # 主题切换逻辑
│   │
│   ├── config/                 # 配置管理
│   │   ├── index.ts            # 配置导出入口
│   │   ├── app.config.ts       # 应用配置
│   │   ├── constants.ts        # 常量定义
│   │   └── theme.config.ts     # 主题配置
│   │
│   ├── plugins/                # 插件系统
│   │   ├── i18n.ts             # 国际化插件
│   │   └── message.ts          # 消息提示插件
│   │
│   ├── utils/                  # 工具函数
│   │   ├── index.ts            # 工具函数导出
│   │   ├── global.ts           # 全局工具函数
│   │   └── validators.ts       # 表单验证工具
│   │
│   ├── directives/             # 自定义指令
│   │   └── index.ts            # 指令注册入口
│   │
│   └── mocks/                  # 开发环境模拟数据
│       ├── index.ts            # MSW 启动配置
│       ├── browser.ts          # 浏览器端 Mock 配置
│       ├── handlers.ts         # API Mock 处理器
│       └── data/               # Mock 数据集合
```

## 关键模块职责

### 网络层 (api/)

- **`request.ts`** - 核心 HTTP 客户端
  - 统一请求/响应拦截
  - 错误处理与重试机制
  - 请求取消与超时控制
  - 响应数据标准化

- **业务接口模块** - 按功能域划分
  - `auth.ts` - 用户认证（登录/注册/登出）
  - `home.ts` - 首页数据获取
  - `search.ts` - 搜索功能接口
  - `publish.ts` - 内容发布相关
  - `chat.ts` - 消息聊天功能
  - `datacenter.ts` - 数据统计图表
  - `profile.ts` - 用户资料管理

### 布局系统 (layout/)

- **`index.vue`** - 应用主布局容器
  - 页面头部 (PageHeader)
  - 内容区域 (router-view)
  - 底部导航 (BottomNavigation)
  - 侧边抽屉菜单

- **`components/`** - 布局组件
  - `PageHeader.vue` - 可配置页面头部
  - `BottomNavigation.vue` - 底部标签导航

- **`composables/`** - 布局逻辑
  - `useLayoutState.ts` - 布局状态控制
  - `useNavigation.ts` - 导航逻辑与路由管理

### 路由系统 (router/)

- **`index.ts`** - 路由配置与注册
  - 嵌套路由结构定义
  - 路由守卫与权限控制
  - 页面自动收集机制

- **`utils.ts`** - 路由工具
  - History/Hash 模式切换
  - 路由跳转封装函数

### 状态管理 (store/)

- **`index.ts`** - Pinia 配置中心
  - 状态持久化插件配置
  - Store 重置与初始化
  - 开发工具集成

- **业务状态模块**
  - `user.ts` - 用户信息与登录状态
  - `talklist.ts` - 消息列表状态管理

### 插件系统 (plugins/)

- **`i18n.ts`** - 国际化解决方案
  - 语言包懒加载策略
  - 动态语言切换
  - 本地缓存优化

- **`message.ts`** - 消息通知系统
  - 统一消息提示接口
  - 多种提示类型支持
  - 全局错误处理集成

### 模拟数据 (mocks/)

- **`index.ts`** - MSW 启动配置
  - 开发/生产环境控制
  - Service Worker 注册

- **`handlers.ts`** - API Mock 处理器
  - RESTful API 模拟
  - 真实数据结构匹配

- **`data/`** - 静态数据集
  - 用户信息模拟数据
  - 业务数据模板

### 组件库 (components/)

- **通用组件** - 跨页面复用
  - `FormContainer.vue` - 表单容器封装
  - `ServiceGrid.vue` - 服务入口网格布局
  - `VirtualList.vue` - 高性能虚拟滚动列表
  - `MenuItem.vue` - 统一菜单项组件
  - `StatsSection.vue` - 数据统计展示组件

### 页面视图 (views/)

- **功能页面** - 按业务功能组织
  - `home/` - 首页与服务入口
  - `login/` - 用户认证页面
  - `search/` - 内容搜索功能
  - `publish/` - 内容发布编辑
  - `talklist/` - 消息对话列表
  - `my/` - 个人中心与设置
  - `datacenter/` - 数据可视化图表
  - `notice/` - 系统通知列表
  - `error/` - 错误页面处理

### 样式系统 (style/)

- **`index.scss`** - 全局样式入口
  - TDesign 组件样式覆盖
  - 业务级通用样式类

- **`reset.scss`** - 浏览器样式重置
  - 跨浏览器兼容性处理
  - 基础元素标准化

- **`tailwind.css`** - Tailwind CSS 配置
  - CSS Layers 层级管理
  - 自定义工具类扩展

### 配置管理 (config/)

- **`app.config.ts`** - 应用全局配置
- **`constants.ts`** - 常量定义
- **`theme.config.ts`** - 主题配置选项

### 工具函数 (utils/)

- **`global.ts`** - 全局工具函数
- **`validators.ts`** - 表单验证规则
- **`index.ts`** - 工具函数统一导出

## 模块关系图

```
                    ┌─────────────────────────────────────────┐
                    │              🚀 main.ts                │
                    │           应用启动入口                   │
                    └─────────────┬───────────────────────────┘
                                  │
                    ┌─────────────▼───────────────────────────┐
                    │           ⚙️ config/                   │
                    │      应用配置 & 常量管理                 │
                    └─────────────┬───────────────────────────┘
                                  │
                    ┌─────────────▼───────────────────────────┐
                    │           🔌 plugins/                  │
                    │       i18n & message 插件系统           │
                    └─────────────┬───────────────────────────┘
                                  │
                    ┌─────────────▼───────────────────────────┐
                    │           🏗️ layout/                   │
                    │        主布局 & 导航框架                 │
                    │    ┌─────────┴─────────┐                │
                    │    │   components/     │   composables/ │
                    │    │  布局组件         │    布局逻辑     │
                    └────┼─────────┬─────────┼────────────────┘
                         │         │         │
                ┌────────▼─────┐   │   ┌─────▼─────┐
                │ 🚦 router/   │   │   │ 🗃️ store/  │
                │   路由系统    │   │   │  状态管理  │
                └────────┬─────┘   │   └─────┬─────┘
                         │         │         │
                ┌────────▼─────────▼─────────▼─────┐
                │          📱 views/              │
                │           页面视图               │
                │  ┌─────┬─────┬─────┬─────┬─────┐ │
                │  │home │login│pub..│talk │ my  │ │
                │  └─────┴─────┴─────┴─────┴─────┘ │
                └──────────────┬───────────────────┘
                               │
                ┌──────────────▼───────────────────┐
                │         🧩 components/           │
                │          通用组件库              │
                └──────────────┬───────────────────┘
                               │
                ┌──────────────▼───────────────────┐
                │          🌐 api/                │
                │      接口层 & HTTP 客户端         │
                │  ┌─────────────┴─────────────┐   │
                │  │ request.ts  │ 业务接口模块  │   │
                │  └─────────────┬─────────────┘   │
                └────────────────┼─────────────────┘
                                 │
                ┌────────────────▼─────────────────┐
                │         🎭 mocks/               │
                │       开发环境数据模拟            │
                │      (可选，开发态启用)           │
                └─────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    🔧 支撑系统                           │
├─────────────────┬─────────────────┬─────────────────────┤
│   🎨 style/     │  🛠️ utils/      │  📝 directives/     │
│   样式系统       │   工具函数       │   自定义指令         │
│                │                 │                     │
│ • 全局样式      │ • 通用函数       │ • DOM 操作扩展      │
│ • 主题配置      │ • 验证规则       │ • 功能性指令        │
│ • Tailwind     │ • 格式化工具     │                     │
└─────────────────┴─────────────────┴─────────────────────┘
```

### 数据流向

```
┌─────────────┐    触发    ┌─────────────┐    调用    ┌─────────────┐
│  📱 Page    │ ────────→ │ 🧩 Component│ ────────→ │  🌐 API     │
│   页面      │           │    组件     │           │   接口      │
└─────────────┘           └─────────────┘           └─────────────┘
       │                         │                         │
       │ 更新状态                │ 状态响应                 │ HTTP 请求
       ▼                         ▼                         ▼
┌─────────────┐           ┌─────────────┐           ┌─────────────┐
│ 🗃️ Store    │           │ 🔔 Message  │           │ 🎭 Mocks    │
│   状态管理   │           │   消息通知   │           │  模拟数据    │
└─────────────┘           └─────────────┘           └─────────────┘
```

## 启动与初始化流程

启动顺序详见 `src/main.ts`，关键步骤如下：

```typescript
// 1. 📊 应用配置初始化
await initGlobalConfig(app);
// 合并外部配置文件 public/config.json
// 注入全局配置对象 $config

// 2. 🗃️ 状态管理初始化
useStore(app);
// 安装 Pinia 状态管理
// 配置状态持久化插件
// 注册所有 Store 模块

// 3. 💾 存储配置注入
injectStorageConfig(app);
// 注入本地存储访问器 $storage
// 配置语言偏好等持久化设置

// 4. 🌐 国际化系统启动
useI18n(app);
await initializeI18n();
// 仅加载用户首选语言包（懒加载策略）
// 配置语言切换机制

// 5. 🔌 插件系统安装
app.use(MessagePlugin); // 消息提示插件
app.use(router); // 路由系统

// 6. 🎭 开发环境Mock启动
if (import.meta.env.DEV || import.meta.env.VITE_MSW === "true") {
  await startMsw(); // 启动 MSW Service Worker
}

// 7. 🎯 应用挂载
app.mount("#app");
```

### 初始化时序图

```
时间轴  │  模块           │  操作说明
────────┼─────────────────┼──────────────────────────
  T1    │  🏗️ 构建配置     │  读取 public/config.json
        │                │  合并环境变量配置
────────┼─────────────────┼──────────────────────────
  T2    │  🗃️ Pinia       │  初始化状态管理系统
        │                │  配置持久化插件
────────┼─────────────────┼──────────────────────────
  T3    │  💾 Storage     │  注入本地存储访问器
        │                │  恢复用户偏好设置
────────┼─────────────────┼──────────────────────────
  T4    │  🌐 i18n        │  检测用户语言偏好
        │                │  懒加载对应语言包
────────┼─────────────────┼──────────────────────────
  T5    │  🔌 Plugins     │  安装消息提示插件
        │  🚦 Router      │  注册路由系统
────────┼─────────────────┼──────────────────────────
  T6    │  🎭 MSW         │  (可选) 启动API模拟
        │                │  注册Service Worker
────────┼─────────────────┼──────────────────────────
  T7    │  🎯 Mount       │  挂载Vue应用实例
        │                │  渲染初始页面
```

## 命名与约定规范

### 文件与目录命名

- **页面文件** - `src/views/<feature>/index.vue`

  ```
  src/views/home/index.vue          ✅ 正确
  src/views/userProfile/index.vue   ❌ 驼峰命名
  src/views/user-profile/index.vue  ✅ 正确
  ```

- **组合式函数** - `src/**/composables/useXxx.ts`

  ```
  useLayoutState.ts     ✅ 状态管理类
  useNavigation.ts      ✅ 功能逻辑类
  useTheme.ts          ✅ 主题控制类
  ```

- **Store 模块** - `useXxxStore` 命名 + `persist` 持久化

  ```typescript
  // store/user.ts
  export const useUserStore = defineStore('user', {
    state: () => ({ ... }),
    persist: true  // 启用持久化
  })
  ```

- **API 接口** - `src/api/<domain>.ts` 返回 `ApiResponse<T>`

  ```typescript
  // api/auth.ts
  export const login = (data: LoginData): ApiResponse<UserInfo> => {
    return httpClient.post("/auth/login", data);
  };
  ```

- **静态资源** - 按类型分目录存放
  ```
  src/assets/images/    # 位图资源 (.png, .jpg, .webp)
  src/assets/svgs/      # 矢量图标 (.svg)
  public/               # 不需要构建处理的静态文件
  ```

### 组件与变量命名

- **组件命名** - PascalCase 大驼峰

  ```vue
  FormContainer.vue ✅ 容器类组件 ServiceGrid.vue ✅ 功能性组件 VirtualList.vue
  ✅ 工具类组件
  ```

- **变量命名** - camelCase 小驼峰

  ```typescript
  const currentUser = ref()      ✅ 普通变量
  const isLoading = ref(false)   ✅ 布尔类型
  const userList = ref([])       ✅ 数组类型
  ```

- **常量命名** - SCREAMING_SNAKE_CASE
  ```typescript
  const API_BASE_URL = 'https://api.example.com'  ✅
  const MAX_UPLOAD_SIZE = 1024 * 1024 * 5        ✅
  ```

## 典型调用链路

### 用户操作流程

```
1. 用户操作
   └── views/search/index.vue (页面组件)
       └── 触发搜索事件

2. 接口调用
   └── api/search.ts (接口封装)
       └── httpClient.get('/search', { params, signal })

3. 网络请求
   └── api/request.ts (HTTP客户端)
       └── 请求拦截 → 发送请求 → 响应拦截

4. 数据处理
   └── 标准化响应 { code, message, data, success }
       ├── 成功: 返回业务数据
       └── 失败: plugins/message 统一错误提示

5. 状态更新
   └── Store/组件状态更新
       └── 触发 UI 重新渲染
```

### 错误处理流程

```
API 请求错误
├── 网络错误 (Network Error)
│   └── request.ts 拦截器处理
│       └── 显示 "网络连接失败" 提示
│
├── HTTP 状态错误 (4xx/5xx)
│   └── 根据状态码显示对应错误信息
│       ├── 401: 跳转登录页
│       ├── 403: 显示权限不足
│       └── 500: 显示服务器错误
│
└── 业务逻辑错误 (code !== 0)
    └── 显示后端返回的 message 字段
        └── plugins/message.ts 统一提示
```

## 新增页面接入指南

### 创建新页面的标准步骤

1. **创建页面文件**

   ```bash
   # 在 views 目录下创建新的功能模块
   mkdir src/views/example
   touch src/views/example/index.vue

   # 如需专用组件，创建 components 子目录
   mkdir src/views/example/components
   ```

2. **路由自动收集**

   ```typescript
   // 页面会被自动收集到路由系统
   // 路径: /example
   // 嵌套在 Layout 组件下

   // 如需自定义路由配置，在 router/index.ts 中手动添加
   ```

3. **导航菜单配置**

   ```typescript
   // layout/composables/useNavigation.ts
   const tabList = [
     // 底部导航配置
     { value: "example", label: "Example", icon: IconExample },
   ];

   const baseSidebar = [
     // 侧边栏菜单配置
     { value: "example", label: "Example页面" },
   ];
   ```

4. **接口层开发**

   ```typescript
   // 创建对应的接口文件
   // src/api/example.ts

   export interface ExampleData {
     id: string;
     name: string;
   }

   export const getExampleList = (): ApiResponse<ExampleData[]> => {
     return httpClient.get("/api/example/list");
   };
   ```

5. **状态管理 (可选)**

   ```typescript
   // 如需全局状态，创建对应的 Store
   // src/store/example.ts

   export const useExampleStore = defineStore("example", {
     state: () => ({
       list: [] as ExampleData[],
       loading: false,
     }),
     persist: true, // 启用持久化
   });
   ```

6. **Mock 数据 (开发环境)**
   ```typescript
   // mocks/handlers.ts 添加对应的 Mock 处理
   rest.get("/api/example/list", (req, res, ctx) => {
     return res(
       ctx.json({
         code: 0,
         data: mockExampleData,
         message: "获取成功",
       })
     );
   });
   ```

### 代码质量检查清单

- [ ] 页面组件使用 `<script setup>` 语法
- [ ] 接口调用使用统一的 `ApiResponse<T>` 类型
- [ ] 错误处理通过 `plugins/message` 统一提示
- [ ] 需要持久化的状态使用 Pinia + `persist` 配置
- [ ] 静态资源放置在正确的目录下
- [ ] 组件命名遵循 PascalCase 规范
- [ ] 添加必要的 TypeScript 类型定义

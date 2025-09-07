# 目录结构

> 仅列出与开发最相关的目录，完整结构以项目为准。

```text
src/
  api/
    request.ts        # 统一 HTTP 客户端
    *.ts              # 业务接口封装
  layout/
    index.vue         # 根布局：Header + Content + BottomNav
    components/       # 头部、底部导航等
    composables/      # useLayoutState、useNavigation
  router/
    index.ts          # 路由注册与 Layout 嵌套路由
    utils.ts          # 路由模式切换（history/hash）
  store/
    index.ts          # Pinia 实例、持久化与重置
    user.ts           # 用户信息与登录状态
  plugins/
    i18n.ts           # 国际化懒加载与切换
    message.ts        # 统一消息提示接口
  mocks/
    index.ts          # MSW 启动入口，按环境启用
    handlers.ts       # Mock 路由处理（登录/搜索/聊天等）
    data/             # Mock 数据集
  views/
    home/ ...         # 首页
    publish/ ...      # 发布页
    search/ ...       # 搜索页
    talklist/ ...     # 消息列表页
    my/ ...           # 个人信息页
    login/ ...        # 登录页
    datacenter/ ...   # 数据图表页
  components/
    FormContainer.vue # 表单容器
    ServiceGrid.vue   # 服务入口网格
    VirtualList.vue   # 高性能列表
```

## 关键职责

- `api/request.ts`：标准化响应结构、统一错误提示、取消请求等
- `layout/*`：统一页面容器与导航交互，页面只关注内容
- `plugins/i18n.ts`：懒加载多语言、缓存与切换策略
- `mocks/*`：开发态可开启的 Mock 能力，不干扰真实接口
- `store/*`：Pinia + 持久化，提供重置与统一初始化入口

## 模块关系图

```
┌─────────────────┐
│   views/* 页面   │ ──┐
└─────────────────┘   │
                     │
┌─────────────────┐   │    ┌─────────────────┐
│ components/*    │ ←─┼────│   api/* 接口     │
│   通用组件      │   │    │     封装        │
└─────────────────┘   │    └─────────────────┘
                     │              │
┌─────────────────┐   │              ▼
│ layout/* 布局    │ ←─┤    ┌─────────────────┐
│   与导航框架    │   │    │  httpClient     │
└─────────────────┘   │    │   请求层        │
                     │    └─────────────────┘
┌─────────────────┐   │              │
│ store/* 全局     │ ←─┤              │
│    状态管理     │   │              ▼
└─────────────────┘   │    ┌─────────────────┐
                     │    │  mocks/* 开发    │
┌─────────────────┐   │    │     态模拟      │
│ router/* 路由    │ ←─┤    │    (可选)       │
│   与权限控制    │   │    └─────────────────┘
└─────────────────┘   │
                     │
┌─────────────────┐   │
│ plugins/*       │ ←─┘
│ i18n/Message    │
└─────────────────┘
       │
       ├── i18n 懒加载
       └── Message 统一提示
```

## 启动与初始化流程（节选）

启动顺序见 `src/main.ts`：

1. `initGlobalConfig(app)`：合并外部 `public/config.json` → 注入 `$config`
2. `useStore(app)`：安装 Pinia 与持久化插件
3. `injectStorageConfig(app)`：注入 `$storage`（如 `locale`）
4. `useI18n(app)` + `initializeI18n()`：仅加载首选语言包
5. 安装 `MessagePlugin`、`router`
6. 如果 `DEV` 或 `VITE_MSW=true` → `startMsw()`
7. `app.mount('#app')`

## 命名与约定

- 视图：`src/views/<feature>/index.vue`
- 组合式：`src/**/composables/useXxx.ts`
- Store：`useXxxStore`（模块化 + `persist`）
- 接口：`src/api/<domain>.ts`，返回 `ApiResponse<T>`
- 资源：图片放 `src/assets/images`，SVG 放 `src/assets/svgs`

## 典型调用链

页面 `views/search/index.vue` → 触发接口 `api/search.ts` → `httpClient.get('/search', { signal })` →
标准化响应 `{ code,message,data,success }` → Store/组件消费数据 → `plugins/message` 统一提示错误。

## 新增页面接入指引

1. 在 `src/views/<feature>/index.vue` 实现页面；必要时创建 `components/` 子目录
2. 页面默认会被自动路由收集，位于 `Layout` 子路由下
3. 如需在底部 Tab/侧边目录展示，更新 `useNavigation()` 的 `tabList/baseSidebar`
4. 编写接口于 `src/api/<feature>.ts`，禁止在组件内直接拼接 URL
5. 需要持久化的状态请使用 Pinia 并配置 `persist`
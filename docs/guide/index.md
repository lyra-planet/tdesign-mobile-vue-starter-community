# 介绍

## 简介

`tdesign-mobile-vue-starter-community` 是一个基于 `TDesign Mobie Vue` 移动端组件库，使用 `Vue3`、`Vite`、`TypeScript` 开发，包含首页、消息中心、个人中心、设置中心、登陆注册等五大功能模块，可进行个性化主题配置的纯前端页面模版。

- **首页**：该模块是用户进入应用的第一印象，需要展示核心功能和信息，引导用户进行下一步操作；
- **消息中心**：该模块负责集中展示各类消息通知，方便用户及时了解动态；
- **个人中心**：该模块是用户管理个人信息、查看历史发布记录、设置偏好等的集中区域；
- **设置中心**：该模块允许用户对应用的各项功能进行个性化配置，如通知设置、主题切换等；
- **登陆注册**：该模块是用户进入应用的入口，需要提供便捷、安全的登录注册方式，如验证码登陆、账号密码登录、第三方账号授权等。

## 视觉稿地址

移动端通用场景页面模版：https://codesign.qq.com/s/567449555703953

访问密码：`F2FO`

## 安装使用

- 🍖 系统环境
  - `Windows` 或 `macOS`

  - 推荐 IDE：`VSCode`

  - `Node.js` 版本在 `20` 或以上，如果没有，请到 [官网](https://nodejs.org/en) 下载安装或更新

  - `pnpm` 包管理器，如果没有，请运行以下命令来进行安装

    ```bash
    npm install -g pnpm
    ```

- 📥 安装依赖

  ```bash
  pnpm install
  ```

  如果遇到 `pnpm :无法加载文件xxx，因为在此系统上禁止运行脚本...` 问题，请**以管理员的身份**打开 `PowerShell` 并输入以下命令

  ```bash
  set-ExecutionPolicy RemoteSigned
  ```

  输入 `Y` 后确定即可

- 🚀 运行

  ```bash
  pnpm dev
  ```

- 📦 打包

  ```bash
  pnpm build
  # 打包 & 分析
  pnpm report
  ```

- 👀 预览

  ```bash
  pnpm preview
  # 打包 & 预览
  pnpm preview:build
  ```

## 开发指南

### 技术栈

- [Vue](https://vuejs.org/): 版本为 `3.5+`

- [Vue Router](https://router.vuejs.org/)

- [Vue I18n](https://vue-i18n.intlify.dev/): 国际化配置

- [Tdesign Mobile Vue](https://tdesign.tencent.com/mobile-vue/overview): 腾讯 UI 组件库

- [Vite](https://vite.dev/): 新一代前端构建工具

  > 值得一提的是，`Vite 7` 不再支持 `node 18` [详情>>](https://github.com/vitejs/vite/pull/19972)

- [ESLint](https://eslint.org/): 项目采用了[@antfu/eslint-config](https://github.com/antfu/eslint-config)，统一代码风格和质量

- [TailwindCSS](https://tailwindcss.com/): 原子化 CSS 框架，极大提升开发效率和样式复用性，项目采用了 `TailwindCSS v4`

### 目录结构

```
├── .github/                # 工作流相关
├── .husky/                 # git 的一些 commit 前校验
├── .vscode/                # vscode 的一些个性化配置项
│   ├── extensions.json       # vscode 插件相关配置
│   ├── launch.json           # 调试配置
│   ├── setting.json          # 个性化配置
│   └── vue.code-snippets     # 快速代码片段
├── build/                  # 构建相关配置项
│   ├── info.ts               # 构建信息相关
│   ├── plugins.ts            # vite 插件相关处理
│   └── utils.ts              # 构建相关工具库
├── locales/                # 国际化文件目录
├── public/                 # 公共文件目录
│   ├── config.json           # 项目全局配置项
│   └── favicon.ico
├── src/                    # 业务代码目录
│   ├── config/               # 处理全局配置
│   ├── directives/           # 自定义指令
│   │   └── ...
│   ├── layout/               # 布局相关
│   │   └── ...
│   ├── plugins/              # 插件相关
│   │   └── i18n.ts             # 国际化配置插件
│   ├── router/               # 路由配置
│   │   └── ...
│   ├── store/                # 状态管理相关配置
│   │   └── ...
│   ├── style/                # 公共样式目录
│   │   ├── index.scss          # 全局样式
│   │   ├── reset.scss          # 重置样式
│   │   └── tailwind.css        # TailwindCSS 相关配置
│   ├── utils/                # 工具函数相关
│   │   └── ...
│   ├── views/                # 业务页面
│   │   └── ...
│   ├── App.vue
│   ├── main.ts
├── types/                  # 全局类型相关
│   ├── auto-imports.d.ts     # unplugin-auto-import 自动生成
│   ├── components.d.ts       # unplugin-vue-components 自动生成
│   ├── global.d.ts           # 全局样式
│   ├── shims-tsx.d.ts        # ts 默认不认 tsx，在此补充
│   ├── shims-vue.d.ts        # ts 默认不认 vue、scss，在此补充
│   └── vue-router.d.ts       # unplugin-vue-router 自动生成
├── .browserslistrc         # 浏览器环境限制
├── .cnb.yml                # 工作流相关
├── .env                    # 全局环境变量
├── .env.development        # 开发环境有效
├── .env.production         # 打包环境有效
├── .gitignore              # git 忽略文件配置
├── .lintstagedrc           # git commit 前的校验配置
├── .npmrc                  # 包管理器相关配置
├── .nvmrc                  # nvm 相关配置
├── commitlint.config.js    # git commit 校验配置
├── eslint.config.js        # 语法检查配置
├── index.html              # 页面主入口
├── package.json            # 依赖包版本及启动配置
├── pnpm-lock.yaml          # 依赖包版本锁文件
├── postcss.config.js       # postcss 相关配置
├── README.md               # 自述文件
├── tsconfig.json           # ts 配置
├── vite.config.ts          # vite 配置
```

### 特色功能

- `unplugin-vue-components`: 自动导入第三方组件，无需手动 `import`

- `unplugin-vue-router`: 自动检测 `src/views` 目录下的结构，生成路由

- `unplugin-auto-import`: 自动导入第三方函数，无需手动 `import`

- `code-inspector-plugin`: 浏览器内按住 `Alt` + `Shift` 可以定位组件代码位置，非常方便调试（Mac 则为 `Option` + `Shift`）

- `jsx` 语法支持

- 国际化支持

- 目录下的 `.env*` 文件可对各环境进行个性化配置

- 可通过 `public/config.json` 来对平台进行外部配置

- 在 `.vue` 空文件里输入 `vue` 可弹出代码片段，快速搭建基础文件结构（仅限 `vscode`）

### 前端 Mock（MSW）

项目内置 [MSW](https://mswjs.io) 用于在浏览器端拦截 `fetch`/XHR 请求并返回模拟数据。

- 开启：
  - 开发：在 `.env.local` 设置 `VITE_MSW=true`，或在控制台执行 `window.__MSW_ENABLED__=true` 后刷新。
  - 生产：同样设置 `VITE_MSW=true` 并确保 `public/mockServiceWorker.js` 已随站点发布。
- 关闭：将开关设为 `false` 或移除，刷新页面。
- 约定：
  - handlers 位于 `src/mocks/handlers.ts`，已覆盖 `/api` 开头接口（使用 `*/api/...` 通配）。
  - 启动逻辑在 `src/mocks/index.ts`，于 `src/main.ts` 初始化阶段调用。

## Git 提交规范

- `feat` 业务新功能开发
- `fix` bug 修复
- `polish` 微调、润色代码或 UI，不影响逻辑（如命名优化、视觉细节调整）
- `docs` 文档、注释相关
- `style` 修改代码风格（格式化、空格、分号等相关，**非 CSS**）
- `refactor` 重构相关（函数拆分、hook 调整等等）
- `perf` 业务代码优化（涉及到逻辑变更，**非构建**相关）
- `test` 测试相关
- `workflow` 工作流相关
- `ci` 持续集成相关
- `chore` 杂项变更，不影响代码逻辑（如依赖更新、构建脚本修改）
- `types` 类型相关
- `revert` 撤销修改

- `build` 构建相关变更，例如 webpack/vite 配置修改
- `release` 版本发布相关
- `wip` 开发中

## 浏览器兼容性

推荐使用内核为 `chrome 100+` 的浏览器开发

**不支持 IE 🤡**

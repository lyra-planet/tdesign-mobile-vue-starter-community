# 主题与样式系统

基于 Tailwind CSS 4 + TDesign Token 的现代样式解决方案，支持暗色模式、响应式设计与高分屏适配。

## 🎨 Tailwind CSS 集成

### 核心配置
```ts
// tailwind.config.js - Tailwind v4 配置
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 与 TDesign 设计 Token 保持一致
      colors: {
        primary: 'var(--td-brand-color)',
        success: 'var(--td-success-color)',
        warning: 'var(--td-warning-color)',
        error: 'var(--td-error-color)',
      }
    }
  }
}
```

### 原子化开发
```vue
<template>
  <!-- 基础样式 -->
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-lg font-semibold text-gray-900">标题</h2>
    <p class="mt-2 text-sm text-gray-600">描述内容</p>
  </div>
  
  <!-- 自定义工具类 -->
  <div class="flex-center">
    <button class="btn-primary">主按钮</button>
    <button class="btn-secondary">次按钮</button>
  </div>
</template>
```

### 自定义工具类
```css
/* src/style/tailwind.css */
@import 'tailwindcss/theme';
@import 'tailwindcss/utilities';

/* 业务级工具类 */
@utility flex-center {
  @apply flex items-center justify-center;
}

@utility btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors;
}

@utility btn-secondary {
  @apply px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors;
}
```

## 🌓 暗色模式实现

### 系统级主题切换
```vue
<!-- src/App.vue -->
<template>
  <t-config-provider :global-config="currentLocale">
    <div class="app-container" :class="themeClass">
      <router-view />
    </div>
  </t-config-provider>
</template>

<script setup>
const themeClass = computed(() => ({
  'theme-dark': isDarkMode.value,
  'theme-light': !isDarkMode.value
}))
</script>
```

### CSS 变量驱动
```scss
// src/style/index.scss
:root {
  --app-bg-primary: #ffffff;
  --app-text-primary: #1f2937;
  --app-border-color: #e5e7eb;
}

:root[theme-mode='dark'] {
  --app-bg-primary: #111827;
  --app-text-primary: #f9fafb;
  --app-border-color: #374151;
}

.app-container {
  background-color: var(--app-bg-primary);
  color: var(--app-text-primary);
}
```

### 布局特殊处理
```scss
// 登录页面暗色模式适配
:root[theme-mode='dark'] .layout-container.login-layout {
  background-color: var(--td-bg-color-page);
}
```

## 📱 响应式与高分屏

### 图片资源优化
```scss
/* 1x/2x 图片适配 */
.hero-background {
  background: image-set(
    url('@/assets/images/bg.png') 1x,
    url('@/assets/images/bg@2x.png') 2x
  ) no-repeat;
  background-size: cover;
  background-position: center;
}

/* WebP 格式优先 */
.optimized-image {
  background: image-set(
    url('@/assets/images/hero.webp') type('image/webp') 1x,
    url('@/assets/images/hero@2x.webp') type('image/webp') 2x,
    url('@/assets/images/hero.png') 1x,
    url('@/assets/images/hero@2x.png') 2x
  );
}
```

### 移动端适配
```css
/* 安全区域适配 */
.mobile-safe-area {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

/* 触摸优化 */
.touch-optimized {
  min-height: 44px;  /* iOS 推荐最小触摸目标 */
  touch-action: manipulation;  /* 快速点击响应 */
}
```

## 🎯 设计 Token 体系

### TDesign Token 集成
```scss
/* 使用 TDesign 设计变量 */
.custom-component {
  /* 颜色 */
  color: var(--td-text-color-primary);
  background: var(--td-bg-color-container);
  border: 1px solid var(--td-border-level-1-color);
  
  /* 尺寸 */
  padding: var(--td-comp-paddingTB-xs) var(--td-comp-paddingLR-s);
  border-radius: var(--td-radius-default);
  
  /* 阴影 */
  box-shadow: var(--td-shadow-1);
}
```

### 一致性规范
- **字号系统**：12px, 14px, 16px, 18px, 20px, 24px
- **间距系统**：4px, 8px, 12px, 16px, 20px, 24px, 32px
- **圆角系统**：2px, 4px, 6px, 8px, 12px
- **色彩系统**：主色、成功、警告、错误 + 灰度阶梯

## 🔧 开发工具

### VS Code 插件推荐
- `bradlc.vscode-tailwindcss` - Tailwind 智能提示
- `stylelint.vscode-stylelint` - CSS 代码规范
- `ms-vscode.vscode-css-peek` - CSS 定义跳转

### 调试工具
```js
// 开发环境显示设计稿网格
if (import.meta.env.DEV) {
  document.body.style.backgroundImage = `
    linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)
  `
  document.body.style.backgroundSize = '8px 8px'
}
```

## 📋 最佳实践

### 样式组织
```
src/style/
├── index.scss      # 主入口，全局样式
├── reset.scss      # 样式重置
├── tailwind.css    # Tailwind 配置与扩展
├── variables.scss  # CSS 变量定义
└── components/     # 组件级样式
    ├── button.scss
    └── card.scss
```

### 性能优化
- **按需加载**：仅引入使用的 Tailwind 类
- **样式隔离**：独立引入避免 HMR 变慢
- **CSS 层级**：合理使用 CSS Layers 控制优先级
- **压缩优化**：生产环境自动压缩与去重

### 维护建议
- 优先使用 TDesign Token，避免硬编码色值
- 统一设计系统，确保视觉一致性
- 定期审查未使用的样式，保持代码清洁
- 建立样式规范文档，团队协作标准化
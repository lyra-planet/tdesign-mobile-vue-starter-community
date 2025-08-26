# 布局系统

本项目采用移动端优先的布局设计，提供完整的移动端应用框架。

## 整体架构

布局系统由三个主要部分组成：

- **状态栏模拟**：模拟iOS状态栏显示
- **主内容区域**：路由视图容器
- **底部导航栏**：Tab导航组件
- **Home指示器**：iOS风格的底部指示器

## 核心特性

### 状态栏模拟

```vue
<div class="status-bar">
  <div class="status-left">
    <span class="time">{{ currentTime }}</span>
  </div>

  <div class="status-right">
    <div class="signal-icons">
      <!-- 信号、WiFi、电量图标 -->
    </div>
  </div>
</div>
```

**功能特点：**

- 实时时间显示
- iOS风格的信号、WiFi、电量图标
- 响应式布局适配

### 底部导航栏

```vue
<div class="bottom-navigation">
  <div class="tab-bar">
    <div v-for="tab in tabList" :key="tab.value" class="tab-item">
      <!-- Tab内容 -->
    </div>
  </div>
</div>
```

**导航配置：**

- 首页：主要功能入口
- 消息：消息中心，支持徽章显示
- 我的：个人中心入口

### 路由集成

布局组件与Vue Router深度集成：

```typescript
// 监听路由变化更新激活状态
watch(() => route.path, (newPath) => {
  const tab = tabList.value.find(item => newPath.startsWith(item.path))
  if (tab) {
    activeTab.value = tab.value
  }
}, { immediate: true })
```

## 样式设计

### 移动端适配

- 使用viewport单位实现响应式
- 支持安全区域适配
- iOS风格的视觉设计

### 主题系统

- 基于TDesign设计规范
- 支持深色模式适配
- 统一的颜色和字体规范

# 首页 Home

- 组件：`HomeSwiper`、`HomeTabs`/卡片列表、`HomeFab`
- 行为：轮播切换、卡片跳转、下拉刷新；顶部搜索联动

## 数据接口（Mock）

- `GET /api/home/content?page&limit`：分页列表，返回 `items` 与 `pagination`
- `GET /api/home/content/:id`：内容详情
- `POST /api/home/refresh`：刷新推荐内容

## 交互

- 下拉刷新触发 `refreshHomeContent()`，局部替换前若干项
- 点击搜索框调用 `changeToSearch()` 跳转 `/search`

## 实现亮点

- HomeSwiper：虚拟化与懒加载，首屏秒开并减少内存占用
- 卡片列表：分片渲染 + 占位骨架，提升滚动与加载流畅度
- 搜索联动：输入框与列表状态解耦，支持跨组件事件总线
- FAB：吸附阈值与防误触策略，保障手势准确

## UI 预览

<div style="display: flex; gap: 12px; align-items: flex-start;">
  <img src="../images/home.png" alt="Login Placeholder" style="flex: 1 1 0; max-width: 30%; height: auto;" />
</div>
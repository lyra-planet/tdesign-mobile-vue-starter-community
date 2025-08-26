# 个人中心模块

个人中心是用户管理个人信息和查看个人数据的核心模块，包含用户信息展示、个人信息编辑、服务推荐等功能。

## 模块结构

个人中心模块包含两个主要页面：

- **个人中心首页** (`/my/index.vue`)：用户信息展示和功能入口
- **个人信息编辑** (`/my/edit.vue`)：用户信息编辑表单

## 个人中心首页

### 功能特性

#### 用户信息展示

```vue
<div class="user-section" @click="handleLogin">
  <div class="user-avatar">
    <!-- 头像显示逻辑 -->
  </div>

  <div class="user-info">
    <div class="user-name">{{ isLoggedIn ? userInfo.nickname : guestInfo.nickname }}
</div>

    <div v-if="isLoggedIn" class="user-details">
      <!-- 用户标签和位置信息 -->
    </div>
  </div>
</div>
```

**核心功能：**

- 登录状态检测
- 用户头像展示
- 个人标签管理（星座、地理位置等）
- 快速编辑入口

#### 数据统计展示

```vue
<div class="stats-section">
  <div v-for="(stat, index) in stats" :key="index" class="stat-item">
    <div class="stat-icon">
      <t-icon :name="stat.icon" size="24" />
    </div>

    <div class="stat-label">
{{ stat.label }}
</div>
  </div>
</div>
```

**统计项目：**

- 全部发布：用户发布的所有内容
- 审核中：待审核的内容数量
- 已发布：已通过审核的内容
- 草稿箱：保存的草稿数量

#### 服务推荐

```vue
<div class="service-card">
  <div class="service-content">
    <div class="service-row">
      <div v-for="service in services" class="service-item">
        <!-- 服务图标和名称 -->
      </div>
    </div>
  </div>
</div>
```

**推荐服务：**

- 微信、QQ等社交应用
- 腾讯文档、腾讯地图等办公工具
- 数据中心等业务服务

### 交互设计

- **点击头像区域**：未登录时触发登录，已登录时跳转到个人信息页
- **编辑按钮**：快速进入个人信息编辑页面
- **服务图标**：点击跳转到对应服务
- **菜单项**：联系客服、设置等功能入口

## 个人信息编辑页

### 表单组件

#### 基础信息编辑

```vue
<div class="form-item">
  <div class="form-label">用户名
</div>

  <t-input v-model="formData.username" placeholder="请输入用户名" />
</div>

<div class="form-item">
  <div class="form-label">性别
</div>

  <t-radio-group v-model="formData.gender">
    <t-radio v-for="option in genderOptions" :key="option.value" :value="option.value">
      {{ option.label }}
    </t-radio>
  </t-radio-group>
</div>
```

#### 选择器组件

**日期选择器：**

```vue
<div class="form-item clickable" @click="handleDatePickerOpen">
  <div class="form-label">生日
</div>

  <div class="form-value">
    <span class="form-text">{{ formData.birthday || '请选择生日' }}</span>
    <t-icon name="chevron-right" />
  </div>
</div>
```

**地址选择器：**

```vue
<t-picker v-model="addressValue" :columns="addressColumns" />
```

**特性：**

- 省市联动选择
- 动态列数据更新
- 数据格式标准化

#### 高级功能

**个人简介：**

```vue
<t-textarea
  v-model="formData.bio"
  placeholder="请输入个人简介"
  :maxlength="50"
  indicator
/>
```

**相片墙：**

```vue
<div class="photo-wall">
  <div v-for="(photo, index) in formData.photos" class="photo-container">
    <img :src="photo" class="photo-image">
    <div class="photo-remove" @click="removePhoto(index)">
      <t-icon name="close" />
    </div>

  </div>
  <div class="upload-container">
    <input type="file" accept="image/*" @change="handlePhotoUpload">
  </div>
</div>
```

**功能特点：**

- 支持最多9张照片上传
- 纯前端文件处理
- 照片预览和删除
- 文件类型限制

### 数据处理

#### 日期格式化

```typescript
// 日期格式化函数示例
function _formatDate(input: string): string {
  if (!input)
    return ''
  const d = new Date(input)
  if (Number.isNaN(d.getTime())) {
    // 兜底处理如 1994-9-27 -> 1994-09-27
    const [y, m, day] = input.split('-')
    const mm = String(m).padStart(2, '0')
    const dd = String(day).padStart(2, '0')
    return `${y}-${mm}-${dd}`
  }
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
```

#### 地址数据管理

```typescript
// 地址选择器数据管理示例
const _addressColumns = computed(() => {
  const selectedProvince = addressValue.value[0] || provincesOptions.value[0]?.value || ''
  const cities = selectedProvince ? getCitiesByProvince(selectedProvince) : []
  return [provincesOptions.value, cities]
})

// 监听省份变化，自动更新城市
watch(() => addressValue.value[0], (newProvince, oldProvince) => {
  if (newProvince && newProvince !== oldProvince) {
    const cities = getCitiesByProvince(newProvince)
    if (cities.length > 0) {
      addressValue.value = [newProvince, cities[0].value]
    }
  }
})
```

## 技术实现

### 组件架构

- **Vue 3 Composition API**：使用最新的组合式API
- **TypeScript**：完整的类型支持
- **TDesign Mobile Vue**：UI组件库
- **响应式设计**：适配不同屏幕尺寸

### 状态管理

- 本地状态管理使用ref和reactive
- 表单数据双向绑定
- 组件间通信使用props和emit

### 样式设计

- **SCSS预处理器**：模块化样式管理
- **移动端适配**：使用viewport单位和媒体查询
- **iOS风格设计**：遵循iOS设计规范
- **安全区域适配**：支持刘海屏等特殊屏幕

### 性能优化

- **按需加载**：路由懒加载
- **图片优化**：本地图片资源管理
- **内存管理**：及时清理定时器和事件监听

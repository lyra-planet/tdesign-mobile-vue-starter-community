<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'My',
})
const checked = ref(true)

function onChange(val: any) {
  checked.value = val
  if (val) {
    enableDarkMode()
  }
  else {
    disableDarkMode()
  }
}
function enableDarkMode() {
  document.documentElement.setAttribute('theme-mode', 'dark')
}
function disableDarkMode() {
  document.documentElement.setAttribute('theme-mode', 'light')
}
const router = useRouter()
const isLoggedIn = ref(false)

// 模拟用户信息
const userInfo = ref({
  avatar: '/my/Avatar.svg',
  nickname: '张三',
  tags: [
    { label: '双子座', icon: 'tag', type: 'constellation' },
    { label: '深圳', icon: 'location', type: 'location' },
  ],
})

// 未登录状态的用户信息
const guestInfo = ref({
  nickname: '请先登录/注册',
})

// 统计数据 - 使用TDesign图标
const stats = ref([
  { label: '全部发布', icon: 'form', count: 0 },
  { label: '审核中', icon: 'search', count: 0 },
  { label: '已发布', icon: 'upload', count: 0 },
  { label: '草稿箱', icon: 'file-copy', count: 0 },
])

// 推荐服务 - 使用SVG图标
const services = ref([
  { name: '微信', icon: '/my/wechat.svg' },
  { name: 'QQ', icon: '/my/qq.svg' },
  { name: '腾讯文档', icon: '/my/Tdoc.svg' },
  { name: '腾讯地图', icon: '/my/Tmap.svg' },
])

// 数据中心服务
const dataServices = ref([
  { name: '数据中心', icon: '/my/default.svg' },
  { name: '数据中心', icon: '/my/default.svg' },
  { name: '数据中心', icon: '/my/default.svg' },
  { name: '数据中心', icon: '/my/default.svg' },
])

// 处理登录
function handleLogin() {
  if (!isLoggedIn.value) {
    // 模拟登录
    isLoggedIn.value = true
  }
  else {
    router.push('/login')
  }
}

// 处理编辑
function handleEdit() {
  router.push('/my/edit')
}

// 处理联系客服
function handleContact() {
  console.log('联系客服')
}

// 处理设置
function handleSettings() {
  router.push('/my/settings')
}

// 处理服务点击
function handleServiceClick(service: any) {
  console.log('点击服务:', service.name)
}
</script>

<template>
  <div class="my-page">
    <!-- 用户信息和统计数据合并卡片 -->
    <div class="user-stats-card">
      <!-- 用户信息区域 -->
      <div class="user-section" @click="handleLogin">
        <div class="user-avatar">
          <div class="avatar-container">
            <div class="avatar-bg">
              <div class="avatar-inner">
                <img v-if="isLoggedIn" :src="userInfo.avatar" :alt="userInfo.nickname" class="avatar-image">
                <t-icon v-else name="user" size="32" color="#0052D9" />
              </div>
            </div>
          </div>
        </div>

        <div class="user-info">
          <div class="user-name" :class="{ 'guest-name': !isLoggedIn }">
            {{ isLoggedIn ? userInfo.nickname : guestInfo.nickname }}
          </div>

          <!-- 登录状态下的标签和定位 -->
          <div v-if="isLoggedIn" class="user-details">
            <!-- 标签区域 -->
            <div class="user-tags">
              <t-tag v-for="(tag, index) in userInfo.tags" :key="index" size="small" variant="light" class="user-tag">
                <template #icon>
                  <t-icon :name="tag.icon" size="12" />
                </template>
                {{ tag.label }}
              </t-tag>
            </div>
          </div>
        </div>

        <!-- 编辑按钮 -->
        <div v-if="isLoggedIn" class="edit-button" @click.stop="handleEdit">
          <t-icon name="edit" size="20" color="var(--td-text-color-primary)" />
        </div>
      </div>

      <!-- 虚线分隔 -->
      <div class="divider" />

      <!-- 统计数据 -->
      <div class="stats-section">
        <div v-for="(stat, index) in stats" :key="index" class="stat-item" :class="{ 'has-divider': index > 0 }">
          <div class="stat-icon">
            <t-icon :name="stat.icon" size="24" color="var(--td-text-color-primary)" />
          </div>
          <div class="stat-label">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- 推荐服务卡片 -->
    <div class="service-card">
      <div class="service-header">
        <div class="service-title">
          推荐服务
        </div>
      </div>
      <div class="service-content">
        <!-- 第一行服务 -->
        <div class="service-row">
          <div
            v-for="(service, index) in services" :key="index" class="service-item"
            @click="handleServiceClick(service)"
          >
            <div class="service-icon-wrapper">
              <img :src="service.icon" :alt="service.name" class="service-icon-wrapper">
            </div>
            <div class="service-name">
              {{ service.name }}
            </div>
          </div>
        </div>

        <!-- 第二行服务 -->
        <div class="service-row">
          <div
            v-for="(service, index) in dataServices" :key="index" class="service-item"
            @click="handleServiceClick(service)"
          >
            <div class="service-icon-wrapper">
              <img :src="service.icon" :alt="service.name" class="service-icon-wrapper">
            </div>
            <div class="service-name">
              {{ service.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 菜单项 -->
    <div class="menu-section">
      <div class="menu-item" @click="handleContact">
        <div class="menu-content">
          <div class="menu-left">
            <t-icon name="service" size="24" color="var(--td-text-color-primary)" class="menu-icon" />
            <span class="menu-title">联系客服</span>
          </div>
          <t-icon name="chevron-right" size="24" color="rgba(0, 0, 0, 0.4)" />
        </div>
      </div>

      <div class="menu-item" @click="handleSettings">
        <div class="menu-content">
          <div class="menu-left">
            <t-icon name="setting" size="24" color="var(--td-text-color-primary)" class="menu-icon" />
            <span class="menu-title">设置</span>
          </div>
          <t-icon name="chevron-right" size="24" color="rgba(0, 0, 0, 0.4)" />
        </div>
      </div>
      <t-cell title="深色模式">
        <template #rightIcon>
          <t-switch :value="checked" @change="onChange" />
        </template>
      </t-cell>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.my-page {
  min-height: 100vh;
  background-color: var(--td-bg-color-page);
  padding-bottom: 62px;
  color: var(--td-text-color-primary);
}

// 合并的用户信息和统计数据卡片
.user-stats-card {
  background-color: var(--td-bg-color-container);
  margin: 0px 16px 16px 16px;
  border-radius: 12px;
  overflow: hidden;
}

.user-section {
  padding: 16px 16px;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  transition: background-color 0.2s ease;
  position: relative;

  &:active {
    background-color: var(--td-bg-color-container);
  }

  .user-avatar {
    margin-right: 16px;
    flex-shrink: 0;

    .avatar-container {
      width: 64px;
      height: 64px;

      .avatar-bg {
        width: 100%;
        height: 100%;
        background-color: var(--td-bg-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .avatar-inner {
          width: 64px;
          height: 64px;
          background-color: #dbe1fd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;

          .avatar-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
        }
      }
    }
  }

  .user-info {
    flex: 1;
    display: flex;
    flex-direction: column;

    .user-name {
      font-size: 16px;
      color: var(--td-text-color-primary);
      font-weight: 600;
      height: 24px;
      line-height: 24px;
      margin-top: 6px;
      white-space: nowrap; // 防止文字换行

      &.guest-name {
        display: flex;
        align-items: center;
        height: 64px;
        margin-top: 0;
      }
    }

    .user-details {
      display: flex;
      flex-direction: row; // 改为水平排列
      align-items: center; // 垂直居中对齐
      gap: 12px; // 增加间距
      margin-top: 8px;
      flex-wrap: nowrap; // 防止换行

      .user-tags {
        display: flex;
        gap: 8px;
        flex-wrap: nowrap; // 防止标签换行
        flex-shrink: 0; // 防止压缩

        .user-tag {
          height: 20px;
          font-size: 10px;
          border-radius: 3px; // 降低圆角值
          padding: 0 6px;
          display: flex;
          align-items: center;
          gap: 2px;
          white-space: nowrap; // 防止文字换行
        }
      }

      .user-location {
        display: flex;
        align-items: center;
        gap: 4px;
        height: 20px;
        flex-shrink: 0; // 防止压缩

        .location-text {
          font-size: 12px;
          color: #666;
          line-height: 20px;
          white-space: nowrap; // 防止文字换行
        }
      }
    }
  }

  .edit-button {
    position: absolute;
    top: 50%; // 改为50%，相对于容器中心
    transform: translateY(-50%); // 垂直居中
    right: 16px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: background-color 0.2s ease;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }

    &:active {
      background-color: #e0e0e0;
    }
  }
}

// 实线分隔
.divider {
  height: 1px;
  background: #f3f3f3;
  margin: 0;
}

.stats-section {
  padding: 20px 16px;
  display: flex;
  justify-content: space-around;
  position: relative;

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: background-color 0.2s ease;
    position: relative;

    &:hover {
      background-color: var(--td-bg-color-page);
    }

    // 只在第二个item前添加分割线
    &:nth-child(2)::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 68px;
      background-color: #e7e7e7;
    }

    .stat-icon {
      margin-bottom: 8px;
      padding: 8px;
      background-color: var(--td-bg-color-page);
      border-radius: 6px;
    }

    .stat-label {
      font-size: 12px;
      color: var(--td-text-color-primary);
      font-weight: 400;
    }
  }
}

.service-card {
  background: var(--td-mask-background);
  border-radius: 12px;
  margin: 16px 16px 18px 16px;
  min-height: 200px;

  .service-header {
    padding: 16px 20px 0;

    .service-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--td-text-color-primary);
    }
  }

  .service-content {
    // padding: 16px 20px 20px;

    .service-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      // gap: 16px;

      &:last-child {
        margin-bottom: 0;
      }

      .service-item {
        padding: 16px 0 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.2s ease;
        min-height: 80px;
        justify-content: flex-start;

        &:active {
          background-color: #f5f5f5;
          transform: scale(0.98);
        }

        .service-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .service-name {
          font-size: 12px;
          width: calc(100% - 16px); // 总宽度减去左右各8px
          height: 20px;
          color: var(--td-text-color-primary);
          font-weight: 400;
          text-align: center;
          /* 使用flex布局实现文字垂直居中 */
          display: flex;
          align-items: center;
          justify-content: center;
          /* 文字超出显示省略号 */
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 8px 8px; // 上下8px，左右8px
        }
      }
    }
  }
}

.menu-section {
  background-color: var(--td-mask-background);
  margin: 0 16px;
  border-radius: 12px;
  overflow: hidden;

  .menu-item {
    height: 56px;
    border-bottom: 0.5px solid var(--td-mask-background);
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:last-child {
      border-bottom: none;
    }

    &:active {
      background-color: #f5f5f5;
    }

    .menu-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      height: 100%;

      .menu-left {
        display: flex;
        align-items: center;

        .menu-icon {
          margin-right: 12px;
        }

        .menu-title {
          font-size: 16px;
          color: var(--td-text-color-primary);
          font-weight: 400;
        }
      }
    }
  }
}

// 移动端适配
@media (max-width: 414px) {
  .service-card {
    // margin: 0 8px 8px;

    .service-header {
      padding: 16px 16px 0;
    }

    .service-content {
      // padding: 16px 16px 20px;

      .service-row {
        // gap: 12px;

        .service-item {
          min-height: 75px;

          .service-icon-wrapper {
            width: 36px;
            height: 36px;

            .service-icon {
              width: 20px;
              height: 20px;
            }
          }

          .service-name {
            font-size: 10px;
          }
        }
      }
    }
  }
}

@media (max-width: 375px) {
  .service-card {
    .service-content {
      .service-row {
        // gap: 8px;

        .service-item {
          min-height: 80px;
          .service-icon-wrapper {
            width: 40px;
            height: 40px;

            .service-icon {
              width: 18px;
              height: 18px;
            }
          }
          .service-name {
            font-size: 12px;
          }
        }
      }
    }
  }
}

// 适配安全区域
@supports (padding: max(0px)) {
  .my-page {
    padding-bottom: max(20px, env(safe-area-inset-bottom));
  }
}
</style>

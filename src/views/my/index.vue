<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'My',
})

const router = useRouter()
const isLoggedIn = ref(false)

// 模拟用户信息
const userInfo = ref({
  avatar: '',
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
  router.push('/login')
}

// 处理联系客服
function handleContact() {
  console.log('联系客服')
}

// 处理设置
function handleSettings() {
  console.log('设置')
}

// 处理服务点击
function handleServiceClick(service: any) {
  console.log('点击服务:', service.name)
}
</script>

<template>
  <div class="my-page">
    <!-- 头部 -->
    <div class="header">
      <div class="header-left">
        <t-icon name="menu" size="20" color="#333" />
      </div>
      <div class="header-title">
        我的
      </div>
      <div class="header-right">
        <t-icon name="ellipsis" size="20" color="#333" class="mr-3" />
        <t-icon name="help-circle" size="20" color="#333" />
      </div>
    </div>

    <!-- 用户信息和统计数据合并卡片 -->
    <div class="user-stats-card">
      <!-- 用户信息区域 -->
      <div class="user-section" @click="handleLogin">
        <div class="user-avatar">
          <div class="avatar-container">
            <div class="avatar-bg">
              <div class="avatar-inner">
                <t-icon name="user" size="32" color="#0052D9" />
              </div>
            </div>
          </div>
        </div>
        <div class="user-info">
          <div class="user-name">
            {{ userInfo.nickname }}
          </div>
        </div>
      </div>

      <!-- 虚线分隔 -->
      <div class="divider" />

      <!-- 统计数据 -->
      <div class="stats-section">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="stat-item"
          :class="{ 'has-divider': index > 0 }"
        >
          <div class="stat-icon">
            <t-icon :name="stat.icon" size="24" color="#666" />
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
            v-for="(service, index) in services"
            :key="index"
            class="service-item"
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
            v-for="(service, index) in dataServices"
            :key="index"
            class="service-item"
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
            <t-icon name="service" size="24" color="#0052D9" class="menu-icon" />
            <span class="menu-title">联系客服</span>
          </div>
          <t-icon name="chevron-right" size="24" color="rgba(0, 0, 0, 0.4)" />
        </div>
      </div>

      <div class="menu-item" @click="handleSettings">
        <div class="menu-content">
          <div class="menu-left">
            <t-icon name="setting" size="24" color="#0052D9" class="menu-icon" />
            <span class="menu-title">设置</span>
          </div>
          <t-icon name="chevron-right" size="24" color="rgba(0, 0, 0, 0.4)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.my-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: white;
  border-bottom: 0.5px solid #e7e7e7;
  height: 44px;

  .header-title {
    font-size: 17px;
    font-weight: 600;
    color: #333;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

// 合并的用户信息和统计数据卡片
.user-stats-card {
  background-color: white;
  margin: 8px 12px;
  border-radius: 12px;
  overflow: hidden;
}

.user-section {
  padding: 20px 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:active {
    background-color: #f8f9fa;
  }

  .user-avatar {
    margin-right: 16px;

    .avatar-container {
      width: 64px;
      height: 64px;

      .avatar-bg {
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        // 去掉外部虚线

        .avatar-inner {
          width: 64px;
          height: 64px;
          background-color: #dbe1fd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

  .user-info {
    flex: 1;

    .user-name {
      font-size: 16px;
      color: #333;
      font-weight: 500;
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
      background-color: #f8f9fa;
    }

    // 添加分割线（除了第一个）
    &.has-divider::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 24px;
      background-color: #e7e7e7;
    }

    .stat-icon {
      margin-bottom: 8px;
      padding: 8px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }

    .stat-label {
      font-size: 12px;
      color: #666;
      font-weight: 400;
    }
  }
}

.service-card {
  background: #ffffff;
  border-radius: 12px;
  margin: 0 12px 8px;
  min-height: 200px;

  .service-header {
    padding: 16px 20px 0;

    .service-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }
  }

  .service-content {
    padding: 16px 20px 20px;

    .service-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }

      .service-item {
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
          font-size: 11px;
          color: #333;
          text-align: center;
          font-weight: 400;
          line-height: 1.3;
          word-break: break-all;
        }
      }
    }
  }
}

.menu-section {
  background-color: white;
  margin: 0 12px;
  border-radius: 12px;
  overflow: hidden;

  .menu-item {
    height: 56px;
    border-bottom: 0.5px solid #e7e7e7;
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
          color: #000000;
          font-weight: 400;
        }
      }
    }
  }
}

// 移动端适配
@media (max-width: 414px) {
  .service-card {
    margin: 0 8px 8px;

    .service-header {
      padding: 16px 16px 0;
    }

    .service-content {
      padding: 16px 16px 20px;

      .service-row {
        gap: 12px;

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

  .user-stats-card,
  .menu-section {
    margin-left: 8px;
    margin-right: 8px;
  }
}

@media (max-width: 375px) {
  .service-card {
    .service-content {
      .service-row {
        gap: 8px;

        .service-item {
          min-height: 70px;

          .service-icon-wrapper {
            width: 32px;
            height: 32px;

            .service-icon {
              width: 18px;
              height: 18px;
            }
          }

          .service-name {
            font-size: 9px;
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

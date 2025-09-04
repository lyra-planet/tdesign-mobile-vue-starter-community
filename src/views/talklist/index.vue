<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getTalkList } from '@/api/talklist'
import { useUserStore } from '@/store/user'
import { talklist } from '../../store/talklist'

defineOptions({
  name: 'Talklist',
})

const userStore = useUserStore()
const mytalklist = ref(talklist.sort((a, b) => b.count - a.count))
const loading = ref(false)
const router = useRouter()

// 获取聊天列表数据
async function fetchTalkList() {
  if (!userStore.isLoggedIn) {
    return
  }

  try {
    loading.value = true
    const result = await getTalkList()
    if (result.success && result.data) {
      mytalklist.value = result.data.sort((a, b) => b.count - a.count)
    }
  }
  catch (error) {
    console.error('获取聊天列表失败:', error)
    // 如果API失败，使用本地数据
    mytalklist.value = talklist.sort((a, b) => b.count - a.count)
  }
  finally {
    loading.value = false
  }
}

// 检查登录状态
onMounted(() => {
  if (!userStore.isLoggedIn) {
    // 如果未登录，路由守卫会自动重定向到登录页
  }
  // 获取聊天列表数据
  fetchTalkList()
})

function goToDetail(id) {
  const item = mytalklist.value.find(item => item.id === id)
  if (item) {
    item.count = 0
  }
  router.push(`/notice/${id}`)
}
function truncateMessage(message, maxLength = 22) {
  if (message.length > maxLength) {
    return `${message.substring(0, maxLength)}...`
  }
  return message
}
</script>

<template>
  <div class="messege h-full" style="background-color: var(--td-bg-color-page);">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <t-loading size="32px" text="加载中..." />
    </div>

    <!-- 聊天列表 -->
    <div v-else class="list-container">
      <t-cell
        v-for="item in mytalklist" :key="item.name" class="list-item"
        style="background-color: var(--td-bg-color-container);"
      >
        <t-avatar size="48px" :image="item.picture" class="avatar" />

        <t-badge :count="item.count" :offset="[16, 17]" class="flex-auto ml-4 badge" size="medium" shape="circle">
          <div class="detail" style="background-color: var(--td-bg-color-container);" @click="goToDetail(item.id)">
            <span class="upper" style="color: var(--td-text-color-secondary);">{{ item.name }}</span>
            <span class="down" style="color: var(--td-text-color-placeholder);">
              {{ truncateMessage(item.message[item.message.length - 1].value) }}
            </span>
          </div>
        </t-badge>
      </t-cell>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: var(--td-bg-color-container);
}

.custom-divider {
  margin: 0px 0;
  --td-divider-color: #ff0000;
  --td-divider-content-line-style: none;
}
.list-container {
  background-color: var(--td-bg-color-container);
  width: 100%;
  border-top: 0.5px solid #e7e7e7;
}
.list-item {
  width: 100%;
  height: 82px;
  opacity: 1;
  padding: 17px 17px 16px 0px;
  border-bottom: 0.5px solid #e7e7e7;
  .avatar {
    margin-left: 16px;
  }
}
.detail {
  width: calc(100%);
  height: 50px;
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
}
.detail .upper {
  width: 100%;
  height: 24px;
  opacity: 1;
  color: var(--td-text-color-primary);
  font-size: 16px;
  font-weight: 400;
  font-family: 'PingFang SC';
  text-align: left;
  line-height: 24px;
}
.detail .down {
  width: 100%;
  height: 22px;
  opacity: 1;
  color: var(--td-text-color-placeholder);
  font-size: 14px;
  font-weight: 400;
  font-family: 'PingFang SC';
  text-align: left;
  line-height: 22px;
  margin-top: 4p;
}
</style>

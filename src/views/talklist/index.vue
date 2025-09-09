<script setup lang='ts'>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import VirtualList from '@/components/VirtualList.vue'
import { error, isLoading, loadTalkList, markChatAsRead, talklist } from '../../store/talklist'

defineOptions({
  name: 'Talklist',
})

// 按消息数量排序，未读多的在前
const mytalklist = computed(() =>
  [...talklist].sort((a, b) => b.count - a.count),
)

const router = useRouter()

// 虚拟滚动 - 新主导 API
const itemSize = 82
const bufferPx = 400

// 跳转到聊天详情页
async function goToDetail(id: string) {
  // 标记为已读
  await markChatAsRead(id)
  router.push({ path: `/notice/${id}` })
}

// 截断消息内容
function truncateMessage(message: string, maxLength = 22) {
  if (message.length > maxLength) {
    return `${message.substring(0, maxLength)}...`
  }
  return message
}

// 获取最后一条消息
function getLastMessage(messages: any[]) {
  if (!messages || messages.length === 0) {
    return '暂无消息'
  }
  return messages[messages.length - 1].value
}

// 刷新聊天列表
async function refreshTalkList() {
  await loadTalkList()
}

// 页面加载时获取聊天列表
onMounted(async () => {
  await loadTalkList()
  await nextTick()
})

onUnmounted(() => {})
</script>

<template>
  <div class="messege h-full" style="background-color: var(--td-bg-color-page);">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading-container">
      <t-loading text="加载中..." size="32px" />
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="error-container">
      <t-result theme="error" title="加载失败" :description="error">
        <template #action>
          <t-button theme="primary" @click="refreshTalkList">
            重试
          </t-button>
        </template>
      </t-result>
    </div>

    <!-- 聊天列表（虚拟滚动） -->
    <div v-else class="list-container">
      <!-- 空状态 -->
      <div v-if="mytalklist.length === 0" class="empty-container">
        <t-result theme="default" title="暂无聊天记录" description="开始和朋友聊天吧">
          <template #action>
            <t-button theme="primary" @click="refreshTalkList">
              刷新
            </t-button>
          </template>
        </t-result>
      </div>

      <VirtualList
        v-else
        :items="mytalklist"
        :item-size="itemSize"
        :buffer-px="bufferPx"
        key-field="id"
        class="list-container-inner"
        @update="() => {}"
      >
        <template #default="{ item }">
          <t-cell
            :key="item.id"
            class="list-item"
            style="background-color: var(--td-bg-color-container);"
          >
            <t-avatar size="48px" :image="item.picture" class="avatar" />

            <div class="flex-auto ml-4 content">
              <div class="detail" style="background-color: var(--td-bg-color-container);" @click="goToDetail(item.id)">
                <span class="upper" style="color: var(--td-text-color-secondary);">{{ item.name }}</span>
                <span class="down" style="color: var(--td-text-color-placeholder);">
                  {{ truncateMessage(getLastMessage(item.message)) }}
                </span>
              </div>
            </div>
            <div v-if="item?.count" class="count-wrap">
              <t-badge :count="item?.count ?? 0" />
            </div>
          </t-cell>
        </template>
      </VirtualList>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.messege {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.loading-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
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
  height: 100%;
  overflow-y: auto;
  flex: 1 1 auto;
}
.list-item {
  width: 100%;
  height: 82px;
  opacity: 1;
  padding: 17px 17px 16px 0px;
  border-bottom: 0.5px solid #e7e7e7;
  position: relative;
  .avatar {
    margin-left: 16px;
  }
}
.content {
  display: flex;
  align-items: center;
  padding-right: 36px; /* 给右侧角标留出空间 */
}
.detail {
  height: 50px;
  width: 90%;
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
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.count-wrap {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.count-badge {
  background-color: #ff3b30;
  color: #ffffff;
  border-radius: 999px;
  padding: 0 6px;
  min-width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  text-align: center;
}
</style>

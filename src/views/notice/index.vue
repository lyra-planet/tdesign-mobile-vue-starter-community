<script setup lang='ts'>
import { computed, nextTick, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { loadTalkList, sendMessage, talklist } from '../../store/talklist'

defineOptions({
  name: 'Notice',
})

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const message = ref('')
const sending = ref(false)
const currentId = (route.params as { id: string }).id

// 当前聊天对象
const current = computed(() => talklist.find(item => item.id === currentId))

// 聊天内容
const talk_content = computed(() => current.value?.message || [])

// 发送消息
async function handleSendMessage() {
  if (message.value.trim() === '' || sending.value) {
    return
  }

  try {
    sending.value = true
    const messageContent = message.value.trim()
    message.value = ''

    // 调用API发送消息
    const success = await sendMessage(currentId, messageContent)

    if (success) {
      // 滚动到底部
      await nextTick()
      scrollToBottom()

      // 模拟对方回复（可选）
      setTimeout(async () => {
        // 这里可以添加自动回复逻辑
        console.log('消息发送成功')
      }, 1000)
    }
    else {
      // 发送失败，恢复消息内容
      message.value = messageContent
      // 这里可以添加错误提示
      console.error('消息发送失败')
    }
  }
  catch (error) {
    console.error('发送消息出错:', error)
  }
  finally {
    sending.value = false
  }
}

// 滚动到底部
function scrollToBottom() {
  const messagesArea = document.querySelector('.messages-area')
  if (messagesArea) {
    messagesArea.scrollTop = messagesArea.scrollHeight
  }
}

// 页面加载时确保有聊天数据
onMounted(async () => {
  // 如果没有找到当前聊天，尝试重新加载
  if (!current.value) {
    await loadTalkList()

    // 重新加载后仍然没有找到，返回列表页
    if (!current.value) {
      router.replace('/talklist')
      return
    }
  }

  // 滚动到底部
  await nextTick()
  scrollToBottom()
})
</script>

<template>
  <div class="chat-container">
    <!-- 消息列表区域 -->
    <div class="messages-area">
      <div class="time-badge">
        {{ t('pages.notice.today_time') }}
      </div>
      <div v-for="item in talk_content" :key="item.id">
        <div v-if="item.tag === 'me'" class="msg-row right">
          <div class="msg-bubble self">
            {{ item.value }}
          </div>
          <t-avatar size="40px" image="https://tdesign.gtimg.com/mobile/demos/avatar2.png" />
        </div>
        <div v-if="item.tag === 'other'" class="msg-row left">
          <t-avatar size="40px" :image="current?.picture" />
          <div class="msg-bubble other">
            {{ item.value }}
          </div>
        </div>
        <div v-if="item.tag === 'time'" class="time-badge">
          {{ item.value }}
        </div>
      </div>
    </div>
    <!-- 底部输入框 -->
    <div class="input-area">
      <div class="input-wrapper flex items-center ">
        <input
          v-model="message"
          :placeholder="t('pages.notice.input_placeholder')"
          class="msg-input w-full"
          :borderless="false"
          :disabled="sending"
          @keypress.enter="handleSendMessage"
        >
        <t-button
          size="medium"
          theme="primary"
          shape="round"
          class="send-btn"
          :disabled="message.trim() === '' || sending"
          :loading="sending"
          @click="handleSendMessage"
        >
          {{ sending ? '发送中...' : t('pages.notice.send') }}
        </t-button>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.chat-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--td-bg-color-page);
  position: relative;
  overflow: hidden;
}

.header {
  height: 50px;
  background: var(--td-bg-color-container);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 5px solid var(--td-border-level-2-color);
  position: relative;
  z-index: 100;
  flex-shrink: 0;
}

.title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.back-btn,
.more-btn {
  font-size: 20px;
  color: #666;
  cursor: pointer;
}
.messages-area {
  flex: 1;
  border-top: 0.5px solid #e7e7e7;
  padding: 8px 12px 80px 12px;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--td-bg-color-container);
  min-height: 0;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
  }
}

.time-badge {
  text-align: center;
  margin: 12px 0;
  color: #999;
  font-size: 12px;
}

.msg-row {
  display: flex;
  margin-top: 16px;

  align-items: flex-start;
  gap: 8px;
}

.msg-row.left {
  justify-content: flex-start;
}

.msg-row.right {
  justify-content: flex-end;
}

.msg-bubble {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 400;
  font-family: 'PingFang SC';
  text-align: left;
  line-height: 22px;
  opacity: 1;
  background: #f3f3f3;
  // word-wrap: break-word;
  // word-break: break-word;
  position: relative;
  padding: 12px;
}

.msg-bubble.other {
  background: var(--td-bg-color-page);
  color: var(--td-text-color-primary);
  border-radius: 0 12px 12px 12px;
}

.msg-bubble.self {
  background: #d9e1ff;
  color: var(--td-text-color-primary);
  border-radius: 12px 0 12px 12px;
}

.input-area {
  background: var(--td-bg-color-container);
  border-top: 1px solid var(--td-border-level-2-color);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 5px;
  z-index: 100;
  width: 100%;

  opacity: 1;
  border-top: 0.5px solid #e7e7e7;
}

.msg-input {
  background-color: var(--td-bg-color-component);
  margin: 12px;
  width: 100%;
  height: 40px;
  border-radius: 99px;
  border: 1px solid #dcdcdc;
  background: #f3f3f3;
  font-size: 14px;
  color: var(--td-text-color-primary);
  padding: 8px 16px;
  height: 24px;
  border-radius: 99px;
  opacity: 1;
  border: 1px solid #dcdcdc;
  &:focus {
    border-color: var(--td-brand-color);
  }
}
.send-btn {
  width: 64px;
  height: 40px;
  margin: 12px 12px 12px 0;
  border-radius: 100px;
}

.current-chat-info {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #fff;
  border-top: 1px solid #eee;
  position: relative;
  z-index: 10;
}
</style>

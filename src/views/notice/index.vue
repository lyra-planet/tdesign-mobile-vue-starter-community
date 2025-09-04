<script setup lang='ts'>
import type { Message } from '@/api/talklist'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { markAsRead, sendMessage as sendMessageApi } from '@/api/talklist'
import { formatMessageTime, loadChatDetail, shouldShowTimeDivider, talklist } from '../../store/talklist'

defineOptions({
  name: 'Notice',
})

const route = useRoute()
const { t } = useI18n()

const message = ref('')
const currentId = (route.params as { id: string }).id
const current = ref(talklist.find(item => item.id === currentId))
const foundItem = talklist.find(item => item.id === currentId)
const talk_content = ref(foundItem ? foundItem.message : [])

// 计算需要显示的消息列表（包含时间分隔符的信息）
const messagesWithTimeInfo = computed(() => {
  return talk_content.value.map((msg, index) => {
    const previousMsg = index > 0 ? talk_content.value[index - 1] : undefined
    return {
      ...msg,
      showTimeDivider: shouldShowTimeDivider(msg.time, previousMsg?.time),
      timeText: formatMessageTime(msg.time),
    }
  })
})

// 页面挂载时标记为已读并加载最新聊天数据
onMounted(async () => {
  if (currentId) {
    try {
      // 先加载最新的聊天详情
      await loadChatDetail(currentId)

      // 更新本地引用
      const updatedItem = talklist.find(item => item.id === currentId)
      if (updatedItem) {
        current.value = updatedItem
        talk_content.value = updatedItem.message
      }

      // 标记为已读
      await markAsRead(currentId)
      if (current.value) {
        current.value.count = 0
      }
    }
    catch (error) {
      console.error('加载聊天数据或标记已读失败:', error)
    }
  }
})

async function handleSendMessage() {
  if (message.value.trim() === '') {
    return
  }

  try {
    // 调用API发送消息
    const result = await sendMessageApi(currentId, message.value)

    if (result.success && result.data) {
      // API成功，使用返回的消息数据
      const targetItem = talklist.find(item => item.id === currentId)
      if (targetItem) {
        targetItem.message.push(result.data)
        // 同步更新本地引用
        talk_content.value = targetItem.message
      }
    }
    else {
      // API失败，使用本地逻辑
      const newMessage: Message = {
        id: Date.now().toString(),
        tag: 'me',
        value: message.value,
        time: Date.now(),
      }

      const targetItem = talklist.find(item => item.id === currentId)
      if (targetItem) {
        targetItem.message.push(newMessage)
        talk_content.value = targetItem.message
      }
    }
  }
  catch (error) {
    console.error('发送消息失败:', error)
    // 发送失败时使用本地逻辑作为备用
    const newMessage: Message = {
      id: Date.now().toString(),
      tag: 'me',
      value: message.value,
      time: Date.now(),
    }

    const targetItem = talklist.find(item => item.id === currentId)
    if (targetItem) {
      targetItem.message.push(newMessage)
      talk_content.value = targetItem.message
    }
  }

  message.value = ''
}
</script>

<template>
  <div class="chat-container">
    <!-- 消息列表区域 -->
    <div class="messages-area">
      <div v-for="item in messagesWithTimeInfo" :key="item.id">
        <!-- 时间分隔符 -->
        <div v-if="item.showTimeDivider" class="time-badge">
          {{ item.timeText }}
        </div>

        <!-- 自己发送的消息 -->
        <div v-if="item.tag === 'me'" class="msg-row right">
          <div class="msg-bubble self">
            {{ item.value }}
          </div>
          <t-avatar size="40px" image="https://tdesign.gtimg.com/mobile/demos/avatar2.png" />
        </div>

        <!-- 对方发送的消息 -->
        <div v-if="item.tag === 'other'" class="msg-row left">
          <t-avatar size="40px" :image="current?.picture" />
          <div class="msg-bubble other">
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>

    <!-- 底部输入框 -->
    <div class="input-area">
      <div class="input-wrapper flex items-center ">
        <input v-model="message" :placeholder="t('pages.notice.input_placeholder')" class="msg-input w-full" :borderless="false">
        <t-button size="medium" theme="primary" shape="round" class="send-btn" :disabled="message.trim() === ''" @click="handleSendMessage()">
          {{ t('pages.notice.send') }}
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

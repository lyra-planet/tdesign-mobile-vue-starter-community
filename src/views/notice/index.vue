<script setup lang='ts'>
import { categories } from '@vueuse/core/metadata.mjs'
import { Input } from 'tdesign-mobile-vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { talklist } from '../../store/talklist'

defineOptions({
  name: 'Notice',
})
const router = useRouter()
const route = useRoute()
const { t } = useI18n()
// const talklist = [
//   { id: '1', picture: 'https://tdesign.gtimg.com/mobile/demos/avatar2.png', name: 'Pite', newmessge: 'hello' },
//   { id: '2', picture: 'https://tdesign.gtimg.com/mobile/demos/avatar2.png', name: 'Bob', newmessge: 'hello' },
//   { id: '3', picture: 'https://tdesign.gtimg.com/mobile/demos/avatar2.png', name: 'Alice', newmessge: 'hello' },
// ]
// const current = talklist.find(item => item.id === route.params.id)
// console.log(current)
const message = ref('')
const currentId = (route.params as { id: string }).id
const current = ref(talklist.find(item => item.id === currentId))
const foundItem = talklist.find(item => item.id === currentId)
const talk_content = ref(foundItem ? foundItem.message : [])
console.log(talk_content.value)
function handleClick() {
  router.push('/talklist')
}
function handleSendMessage() {
  if (message.value.trim() === '') {
    return
  }
  const targetItem = talklist.find(item => item.id === currentId)
  if (targetItem) {
    targetItem.message.push({
      id: Date.now().toString(),
      tag: 'me',
      value: message.value,
    })
  }
  // 若以后扩展可以在这里修改为对数据库的操作
  message.value = ''
  // 模拟对方回复
  setTimeout(() => {
    talk_content.value.push({
      id: (Date.now() + 1).toString(),
      tag: 'other',
      value: '这是自动回复的消息',
    })
  }, 1000)
  console.log(talklist)
}
// 后续可以通过添加一个时间的属性然后比较两个时间之间的间隔来优化时间的显示，实现自动添加时间标签
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
          <t-avatar size="32px" :image="current.picture" />
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

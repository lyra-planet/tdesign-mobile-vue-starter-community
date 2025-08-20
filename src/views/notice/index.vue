<script setup lang='ts'>
import { categories } from '@vueuse/core/metadata.mjs'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'Notice',
})
const router = useRouter()
const route = useRoute()
const talklist = [
  { id: '1', picture: 'https://tdesign.gtimg.com/mobile/demos/avatar2.png', name: 'Pite', newmessge: 'hello' },
  { id: '2', picture: 'https://tdesign.gtimg.com/mobile/demos/avatar2.png', name: 'Bob', newmessge: 'hello' },
  { id: '3', picture: 'https://tdesign.gtimg.com/mobile/demos/avatar2.png', name: 'Alice', newmessge: 'hello' },
]
const current = talklist.find(item => item.id === route.params.id)
console.log(current)
const talk_content = [
  { id: '1', tag: 'other', value: '那明天准时见哦' },
  { id: '2', tag: 'me', value: '好的，我会记得的' },
  { id: '3', tag: 'me', value: '在吗？' },
  { id: '4', tag: 'time', value: '今天 10:50' },
  { id: '5', tag: 'other', value: '有个问题想咨询一下，关于Tdesign组件库如何更好的使用' },
  { id: '6', tag: 'me', value: '你请问' },
]
function handleClick() {
  router.push('/talklist')
}
</script>

<template>
  <div class="chat-container">
    <!-- 顶部标题栏 -->
    <!-- <div class="header">
      <t-icon name="chevron-left" class="back-btn" />
      <span class="title">聊天</span>
      <t-icon name="more" class="more-btn" />
    </div> -->
    <t-navbar :title="current.name" :fixed="false" left-arrow @left-click="handleClick" />
    <!-- 消息列表区域 -->
    <div class="messages-area">
      <div class="time-badge">
        今天 10:00
      </div>
      <div v-for="item in talk_content" :key="item.id">
        <div v-if="item.tag === 'me'" class="msg-row right">
          <div class="msg-bubble self">
            {{ item.value }}
          </div>
          <t-avatar size="32px" image="https://tdesign.gtimg.com/mobile/demos/avatar2.png" />
        </div>
        <div v-if="item.tag === 'other'" class="msg-row left">
          <t-avatar size="32px" image="https://tdesign.gtimg.com/mobile/demos/avatar2.png" />
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
      <div class="input-wrapper flex items-center justify-between">
        <t-input placeholder="输入消息..." class="msg-input w-full" :borderless="true" />
        <t-button size="small" theme="primary" class="send-btn">
          发送
        </t-button>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.chat-container {
  height: calc(100vh);
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  position: relative;
  overflow: hidden;
}

.header {
  height: 50px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
  position: relative;
  /* 改为相对定位 */
  z-index: 100;
  flex-shrink: 0;
  /* 防止被压缩 */
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

/* 消息区域 - 改进滚动 */
.messages-area {
  flex: 1;
  padding: 8px 12px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f8f9fa;
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
  margin-bottom: 12px;
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
  max-width: 60%;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
  word-break: break-word;
  position: relative;
}

.msg-bubble.other {
  background: #f3f3f3;
  color: #333;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.msg-bubble.self {
  background: #dbe0fd;
  color: #000000;
  box-shadow: 0 1px 2px rgba(0, 123, 255, 0.3);
}

.input-area {
  background: #fff;
  border-top: 1px solid #eee;
  padding: 4px 4px;
  flex-shrink: 0;
  position: relative;
}

.mes-input {
  border-radius: 10px;
  background-color: #f5f5f5;
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

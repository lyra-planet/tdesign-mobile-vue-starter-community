<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { talklist } from '../../store/talklist'

defineOptions({
  name: 'Talklist',
})

const mytalklist = ref(talklist.sort((a, b) => b.count - a.count))
// 按消息数量排序，未读多的在前
const router = useRouter()
function goToDetail(id) {
  talklist.find(item => item.id === id).count = 0
  console.log(talklist)
  router.push({ name: 'Notice', params: { id } })
}
function truncateMessage(message, maxLength = 22) {
  if (message.length > maxLength) {
    return `${message.substring(0, maxLength)}...`
  }
  return message
}
</script>

<template>
  <!-- <div>Ciallo~(∠・ω&lt; )⌒★!</div>
  <t-row>
    <t-col span="8" class="dark">
      first
    </t-col>
    <t-col span="8" class="light">
      second
    </t-col>
    <t-col span="8" class="dark">
      third
    </t-col>
  </t-row> -->

  <div class="messege h-full" style="background-color: var(--td-bg-color-page);">
    <div class="list-container">
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

    <!-- <div class="w-full h-20 bg-white  flex items-center mb-1">
      <t-avatar size="64px" image="https://tdesign.gtimg.com/mobile/demos/avatar2.png" />
      <t-badge count="8" :offset="[20, 30]" class="flex-auto">
        <div class="w-full bg-white h-16 flex flex-col justify-center p-0">
          <span class="text-sm text-gray-600">用户昵称</span>
          <span class="text-base " style="color:#bababa">这是一条消息内容</span>
        </div>
      </t-badge>
    </div>
    <div class="w-full h-20 bg-white  flex items-center mb-1">
      <t-avatar size="64px" image="https://tdesign.gtimg.com/mobile/demos/avatar2.png" />
      <t-badge count="8" :offset="[20, 30]" class="flex-auto">
        <div class="w-full bg-white h-16 flex flex-col justify-center p-0">
          <span class="text-sm text-gray-600">用户昵称</span>
          <span class="text-base " style="color:#bababa">这是一条消息内容</span>
        </div>
      </t-badge>
    </div> -->
  </div>
</template>

<style lang='scss' scoped>
.custom-divider {
  margin: 0px 0;
  --td-divider-color: #ff0000;
  --td-divider-content-line-style: none;
}
.list-container {
  background-color: var(--td-bg-color-container);
  width: 100%;
}
.list-item {
  width: calc(100% - 16px);
  height: 82px;
  opacity: 1;
  padding: 17px 17px 16px 0px;
  border-bottom: 0.5px solid #e7e7e7;
  margin-left: 16px;
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

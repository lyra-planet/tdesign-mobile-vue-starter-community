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

  <div class="messege bg-gray-100 h-full ">
    <div v-for="item in mytalklist" :key="item.name" class="w-full h-20 bg-white  flex items-center mb-0.5">
      <t-avatar size="64px" :image="item.picture" class="ml-2" />
      <t-badge :count="item.count" :offset="[20, 30]" class="flex-auto ml-2">
        <div class="w-full bg-white h-16 flex flex-col justify-center p-0" @click="goToDetail(item.id)">
          <span class="text-sm text-gray-600">{{ item.name }}</span>
          <span class="text-base" style="color:#bababa">
            {{ truncateMessage(item.message[item.message.length - 1].value) }}
          </span>
        </div>
      </t-badge>
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
</style>

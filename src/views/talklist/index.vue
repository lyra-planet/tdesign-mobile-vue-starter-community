<script setup lang='ts'>
defineOptions({
  name: 'Talklist',
})
const talklist = ref([
  { picture: 'https://tdesign.gtimg.com/mobile/demos/avatar2.png', count: '0', name: 'Pite', newmessge: 'hello' },
  { picture: 'https://tdesign.gtimg.com/mobile/demos/avatar2.png', count: '0', name: 'Bob', newmessge: 'hello' },
  { picture: 'https://tdesign.gtimg.com/mobile/demos/avatar2.png', count: '0', name: 'Alice', newmessge: 'hello' },
])
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
  <div class="header">
    <t-icon name="chevron-left" class="back-btn" />
    <span class="title ">聊天</span>
    <t-icon name="more" class="more-btn" />
  </div>
  <div class="messege bg-gray-100 h-full">
    <div v-for="item in talklist" :key="item.name" class="w-full h-20 bg-white  flex items-center mb-1">
      <t-avatar size="64px" :image="item.picture" />
      <t-badge :count="item.count" :offset="[20, 30]" class="flex-auto">
        <div class="w-full bg-white h-16 flex flex-col justify-center p-0">
          <span class="text-sm text-gray-600">{{ item.name }}</span>
          <span class="text-base " style="color:#bababa">{{ item.newmessge }}</span>
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
}
</style>

<script setup lang="ts">
import { Icon as TIcon } from 'tdesign-icons-vue-next'
import { ref } from 'vue'

const value = ref('label_1')
const list = ref([
  { value: 'label_1', label: '首页', icon: 'home' },
  { value: 'label_3', label: '消息', icon: 'chat' },
  { value: 'label_4', label: '我的', icon: 'user' },
])
</script>

<template>
  <t-tab-bar v-model="value" theme="tag" :split="false">
    <t-tab-bar-item v-for="item in list" :key="item.value" :value="item.value">
      {{ item.label }}
      <template #icon>
        <TIcon :name="item.icon" />
      </template>
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<style lang='scss' scoped></style>

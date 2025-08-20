<script setup lang='ts'>
import { Icon as TIcon } from 'tdesign-icons-vue-next'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useLayoutHook } from './hooks'

defineOptions({
  name: 'Layout',
})
const router = useRouter()
const value = ref('label_1')
const list = ref([
  { value: 'label_1', label: '首页', icon: 'home', num: 0, path: '/home' },
  { value: 'label_3', label: '聊天', icon: 'chat', num: 8, path: '/talklist' },
  { value: 'label_4', label: '我的', icon: 'user', num: 0, path: '/notice' },
])
watch(value, (val) => {
  const target = list.value.find(item => item.value === val)
  if (target && target.path) {
    router.push(target.path)
  }
})
const { locale, layoutStore, localeState, localeOptions, t, add, onConfirm } = useLayoutHook()
</script>

<template>
  <div class="layout-wrapper p-4">
    <!-- <h3 class="!mb-4">
      layout
    </h3>
    <div class="mb-2">
      Current Language: {{ locale }}
    </div>
    <div class="mb-2">
      {{ t('global.title') }}
    </div> -->
    <!-- <t-cell class="mb-2 rounded-md" arrow title="Select Language" @click="localeState.show = true" />
    <t-popup v-model="localeState.show" placement="bottom">
      <t-picker
        v-model="localeState.locale"
        :columns="localeOptions"
        @confirm="onConfirm"
        @cancel="localeState.show = false"
      >
        <template #option="item">
          {{ item.label }}
        </template>
</t-picker>
</t-popup> -->
    <!-- <t-button theme="primary" size="small" @click="add">
      Count: {{ layoutStore.count }}
    </t-button> -->
    <!-- <t-divider content="华丽的分割线 -- 以下是二级路由的内容" align="left" /> -->
    <router-view />
    <t-tab-bar v-model="value" theme="tag" :split="false">
      <t-tab-bar-item
        v-for="item in list" :key="item.value" :value="item.value"
        :badge-props="{ count: item.num, offset: [-8, 3] }"
      >
        {{ item.label }}
        <template #icon>
          <TIcon :name="item.icon" />
        </template>
      </t-tab-bar-item>
    </t-tab-bar>
  </div>
</template>

<style lang='scss' scoped>
.layout-wrapper {
  background-color: white;
  padding: 5px;
  height: 90%;
}
</style>

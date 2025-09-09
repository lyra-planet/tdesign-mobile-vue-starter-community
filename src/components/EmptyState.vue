<script setup lang='ts'>
const props = defineProps<{ title?: string, description?: string, actionText?: string }>()
const emit = defineEmits<{ (e: 'action'): void }>()
</script>

<template>
  <div class="empty-container">
    <t-result theme="default" :title="props.title || '暂无数据'" :description="props.description || '去看看别的吧'">
      <template #action>
        <t-button theme="primary" @click="emit('action')">
          {{ props.actionText || '刷新' }}
        </t-button>
      </template>
    </t-result>
  </div>
</template>

<style lang='scss' scoped>
.empty-container {
  padding-top: 40px;
}
</style>

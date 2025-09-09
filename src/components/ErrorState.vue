<script setup lang='ts'>
const props = defineProps<{ title?: string, description?: string }>()
const emit = defineEmits<{ (e: 'retry'): void }>()
</script>

<template>
  <div class="error-container">
    <t-result theme="error" :title="props.title || '加载失败'" :description="props.description || '加载失败，请稍后重试'">
      <template #action>
        <t-button theme="primary" @click="emit('retry')">
          重试
        </t-button>
      </template>
    </t-result>
  </div>
</template>

<style lang='scss' scoped>
.error-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}
</style>

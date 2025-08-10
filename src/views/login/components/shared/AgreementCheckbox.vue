<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: boolean
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  text: '同意《协议条款》',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const agreed = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})
</script>

<template>
  <div class="agreement-section auth-flex-center">
    <t-checkbox v-model="agreed" borderless />
    <span class="agreement-text">{{ text }}</span>
  </div>
</template>

<style lang="scss" scoped>
.agreement-section {
  :deep(.t-checkbox) {
    --td-checkbox-icon-size: 14px;
    margin: 1px 0 0 16px !important;
    padding: 0 !important;
  }
}

.agreement-text {
  font-family: 'PingFang SC';
  text-align: left;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  color: #000000e6;
}
</style>

<script setup lang="ts">
interface Props {
  title: string
  showBackButton?: boolean
  showMiniProgramButtons?: boolean
}

withDefaults(defineProps<Props>(), {
  showBackButton: true,
  showMiniProgramButtons: false,
})

defineEmits<{
  backClick: []
}>()
</script>

<template>
  <div class="header">
    <!-- 返回按钮 -->
    <div v-if="showBackButton" class="header-left" @click="$emit('backClick')">
      <t-icon name="chevron-left" size="24" color="var(--td-text-color-primary)" />
    </div>
    <div v-else class="header-left" />

    <!-- 标题 -->
    <div class="header-title">
      {{ title }}
    </div>

    <!-- 右侧按钮 -->
    <div class="header-right">
      <div v-if="showMiniProgramButtons" class="mini-program-buttons">
        <img src="/my/MiniProgramMoreOutlined.svg" class="mini-program-icon">
        <div class="divider-line" />
        <img src="/my/MiniProgramCloseOutlined.svg" class="mini-program-icon">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  background-color: var(--td-bg-color-container);
  height: 48px;
  position: relative;

  .header-left {
    cursor: pointer;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 17px;
    font-weight: 600;
    color: var(--td-text-color-primary);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .header-right {
    cursor: pointer;
    display: flex;
    align-items: center;

    .mini-program-buttons {
      display: flex;
      align-items: center;
      height: 32px;
      border-radius: 16px;
      opacity: 1;
      border: 0.5px solid #e7e7e7;
      background-color: transparent;
      padding: 0 13px;

      .mini-program-icon {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .divider-line {
        width: 1px;
        height: 20px;
        background-color: #e7e7e7;
        opacity: 1;
        margin: 0 8px;
      }
    }
  }
}
</style>

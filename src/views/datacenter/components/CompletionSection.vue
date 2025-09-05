<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="completion-section">
    <div class="completion-header">
      <div class="completion-title">
        {{ t('pages.datacenter.completion.title') }}
      </div>
    </div>
    <div class="completion-content">
      <div class="completion-item">
        <div class="completion-time">
          12:00
        </div>
        <div class="completion-progress">
          <t-progress :percentage="80" />
        </div>
      </div>
      <div class="completion-item">
        <div class="completion-time">
          14:00
        </div>
        <div class="completion-progress">
          <t-progress :percentage="60" />
        </div>
      </div>
      <div class="completion-item">
        <div class="completion-time">
          16:00
        </div>
        <div class="completion-progress">
          <t-progress :percentage="85" />
        </div>
      </div>
      <div class="completion-item">
        <div class="completion-time">
          18:00
        </div>
        <div class="completion-progress">
          <t-progress :percentage="43" />
        </div>
      </div>
      <div class="completion-item">
        <div class="completion-time">
          20:00
        </div>
        <div class="completion-progress">
          <t-progress :percentage="60" />
        </div>
      </div>
      <div class="completion-item">
        <div class="completion-time">
          22:00
        </div>
        <div class="completion-progress">
          <t-progress :percentage="95" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.completion-section {
  background-color: #fff;
  border-radius: 9px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin: 0 16px 16px;

  .completion-header {
    margin-bottom: 16px;
  }

  .completion-title {
    font-size: 16px;
    font-weight: 600;
    color: #000000e6;
  }

  .completion-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .completion-item {
    display: flex;
    align-items: center;
    gap: 16px;

    .completion-time {
      font-size: 14px;
      color: #666;
      min-width: 50px;
    }

    .completion-progress {
      flex: 1;
    }
  }
}
</style>

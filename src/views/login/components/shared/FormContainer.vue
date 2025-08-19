<script setup lang="ts">
import LoginButtons from './LoginButtons.vue'

interface Props {
  title: string
  subtitle?: string
  footerType?: 'empty' | 'login-bottom' | 'verify-login'
}

defineProps<Props>()
</script>

<template>
  <div class="form-container">
    <div class="auth-header">
      <h1 class="title">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="subtitle">
        {{ subtitle }}
      </p>
    </div>

    <div class="form-content">
      <slot />
    </div>

    <div class="auth-footer">
      <!-- 使用登录按钮组件 -->
      <LoginButtons
        v-if="footerType === 'login-bottom'"
        type="phone"
      />

      <!-- 使用登录按钮组件 -->
      <LoginButtons
        v-else-if="footerType === 'verify-login'"
        type="password"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-container {
  margin-top: 4px;
}

.auth-header {
  text-align: left;
}

.title {
  height: 36px;
  color: #000000e6;
  font-size: 28px;
  font-weight: 600;
  font-family: 'PingFang SC';
  text-align: left;
  line-height: 36px;
  margin: 0 24px 0 20px;
}

.subtitle {
  margin: 16px 0 0 16px !important;
  font-size: 14px;
  color: #00000066;
  font-family: 'PingFang SC';
  margin: 0;
}

.switch-options {
  text-align: center;
  padding: 20px 0;

  :deep(.t-button) {
    font-size: 14px;
    color: #000000e6;
    font-family: 'PingFang SC';
  }
}
</style>

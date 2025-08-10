<script setup lang="ts">
import { computed, ref } from 'vue'
import AgreementCheckbox from './shared/AgreementCheckbox.vue'
import FormContainer from './shared/FormContainer.vue'

const emit = defineEmits<{
  switchTo: [type: string]
  login: [data: { account: string, password: string }]
}>()

const account = ref('')
const password = ref('')
const agreedToTerms = ref(false)

const canLogin = computed(() => {
  return account.value.trim() && password.value.trim() && agreedToTerms.value
})

// 处理登录
function handleLogin() {
  if (canLogin.value) {
    emit('login', { account: account.value, password: password.value })
  }
}
</script>

<template>
  <FormContainer title="欢迎登录 TDesign" footer-type="verify-login" @switch-to="$emit('switchTo', $event)">
    <!-- 账号输入 -->
    <div class="input-section">
      <div class="input-wrapper auth-input-container">
        <t-input
          v-model="account"
          label="账号"
          placeholder="请输入手机号/邮箱"
          class="account-input"
          borderless
        />
      </div>
      <!-- 密码输入 -->
      <div class="input-wrapper auth-input-container">
        <t-input
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          class="password-input"
          borderless
        />
      </div>
    </div>
    <AgreementCheckbox v-model="agreedToTerms" />
    <t-button
      size="large"
      theme="primary"
      class="login-button auth-primary-button"
      :disabled="!canLogin"
      @click="handleLogin"
    >
      登录
    </t-button>
    <div class="forgot-password auth-flex-center">
      <span class="forgot-text">忘记密码？</span>
      <span class="recovery-button">
        找回密码
      </span>
    </div>
  </FormContainer>
</template>

<style lang="scss" scoped>
.input-section {
  margin: 24px 0 24px 0;
}
.item-text {
  height: 24px;
  width: 81px;
}
.input-wrapper {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 16px;
    right: 0;
    height: 0.5px;
    background-color: var(--td-component-border, var(--td-gray-color-4, #dcdcdc));
  }

  .account-input,
  .password-input {
    flex: 1;
    --td-spacer-2: 49px;
    background-color: transparent !important;
    :deep(.t-input__label) {
      padding-top: 3px;
    }
    :deep(.t-input__control) {
      font-family: 'PingFang SC';
      text-align: left;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
    }
  }
}

.forgot-password {
  margin-left: 16px;

  .forgot-text {
    font-family: 'PingFang SC';
    text-align: left;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    color: #000000e6;
  }

  .recovery-button {
    font-family: 'PingFang SC';
    text-align: left;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    color: #0052d9;
  }
}
</style>

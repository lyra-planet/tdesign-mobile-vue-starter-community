<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import FormContainer from './shared/FormContainer.vue'

defineEmits<{
  switchTo: [type: string]
  verify: [code: string]
}>()

const countdown = ref(60)
let countdownTimer: ReturnType<typeof setInterval> | null = null

const isCodeComplete = ref(false)

// 处理验证
function handleVerify() {
  if (isCodeComplete.value) {
    // 验证码验证成功
  }
}

// 重新发送验证码
function handleResend() {
  countdown.value = 60
  startCountdown()
  // 重新发送验证码
}

// 启动倒计时
function startCountdown() {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }

  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(countdownTimer!)
      countdownTimer = null
    }
  }, 1000)
}

onMounted(() => {
  startCountdown()
})

onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>

<template>
  <FormContainer title="请输入验证码" subtitle="验证码已通过短信发送至 +86 138****8888">
    <div class="verify-section">
      <t-input placeholder="请输入验证码">
        <template #suffix>
          <div class="suffix auth-flex-center">
            <div class="auth-divider auth-divider--24" />
            <div class="verify" aria-role="button" @click="handleResend">
              发送验证码
            </div>
          </div>
        </template>
      </t-input>
    </div>

    <t-button
      size="large"
      theme="primary"
      class="verify-button auth-primary-button"
      :disabled="!isCodeComplete"
      @click="handleVerify"
    >
      登录
    </t-button>
  </FormContainer>
</template>

<style lang="scss" scoped>
.verify {
  text-align: center;
  margin-left: 16px;
  font-family: 'PingFang SC';
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #0052d9;
}
.verify-section {
  text-align: center;
  padding: 20px 0;
  margin-top: 24px;
}
</style>

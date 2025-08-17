<script setup lang="ts">
import countries from 'countries-phone-masks'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AgreementCheckbox from './shared/AgreementCheckbox.vue'
import FormContainer from './shared/FormContainer.vue'

const router = useRouter()

// 手机号相关状态
const selectedCountry = ref('CN')
const phoneNumber = ref('')
const phoneValid = ref(false)
const phoneInputTouched = ref(false)

// 协议同意状态
const agreedToTerms = ref(false)

const countryOptions = computed(() => {
  return countries.map(country => ({
    label: `${country.name} ${country.code}`,
    value: country.iso,
    code: country.code,
    name: country.name,
    flag: country.flag,
    disabled: false,
  }))
})

const selectedCountryCode = computed(() => {
  const selected = countries.find(
    country => country.iso === selectedCountry.value,
  )
  return selected ? selected.code : '+86'
})

// 处理国家选择变化
function handleCountryChange(value: string) {
  selectedCountry.value = value
}

const phoneValidationTips = computed(() => {
  // 只有在用户开始输入且输入不为空时才显示错误提示
  if (!phoneInputTouched.value || phoneNumber.value === '') {
    return ''
  }
  return phoneValid.value ? '' : '请输入正确的手机号格式'
})

// 验证手机号格式
function validatePhoneNumber(value: string) {
  phoneInputTouched.value = true // 标记用户已经开始输入
  const phoneRegex = /^1[3-9]\d{9}$/
  phoneValid.value = phoneRegex.test(value)
}

// 监听手机号变化并验证
watch(phoneNumber, (newValue) => {
  if (newValue) {
    // 只保留数字
    const cleanValue = newValue.replace(/\D/g, '')
    if (cleanValue !== newValue) {
      phoneNumber.value = cleanValue
      return // 避免重复触发
    }
    validatePhoneNumber(cleanValue)
  }
  else {
    phoneValid.value = false
  }
}, { immediate: true })

function handleNext() {
  if (phoneValid.value && agreedToTerms.value) {
    // 获取验证码后跳转到验证码页面
    router.push('/login/verify')
  }
}
</script>

<template>
  <FormContainer title="欢迎登录 TDesign" footer-type="login-bottom">
    <div class="phone-input auth-input-container">
      <t-dropdown-menu class="country-selector">
        <t-dropdown-item
          :options="countryOptions"
          :value="selectedCountry"
          :label="selectedCountryCode"
          @change="handleCountryChange"
        />
      </t-dropdown-menu>
      <div class="auth-divider auth-divider--24" />
      <t-input
        v-model="phoneNumber"
        placeholder="请输入手机号"
        class="phone-number-input"
        borderless
        maxlength="11"
        status="error"
        :tips="phoneValidationTips"
      />
    </div>

    <div class="register-hint">
      未注册的手机号验证通过后将自动注册
    </div>

    <AgreementCheckbox v-model="agreedToTerms" class="agreement-checkbox" />

    <t-button
      size="large"
      theme="primary"
      variant="base"
      shape="rectangle"
      :disabled="!agreedToTerms || !phoneValid"
      class="login-button auth-primary-button"
      @click="handleNext"
    >
      验证并登录
    </t-button>
  </FormContainer>
</template>

<style lang="scss" scoped>
.phone-input {
  margin-top: 24px;
  margin-left: 16px;
  border-bottom: 0.5px solid var(--td-component-border, var(--td-gray-color-4, #dcdcdc));
}

.agreement-checkbox {
  margin-top: 32px;
}

.country-selector {
  height: 56px;
  flex-shrink: 0;
  --design-font-family: 'PingFang SC';
  --design-font-size: 16px;
  --design-font-weight: 400;
  --design-line-height: 24px;
  --design-color: rgba(0, 0, 0, 0.9);
  :deep(.t-dropdown-menu),
  :deep(.t-dropdown-item),
  :deep(*) {
    font-family: var(--design-font-family) !important;
    font-size: var(--design-font-size) !important;
    font-weight: var(--design-font-weight) !important;
    line-height: var(--design-line-height) !important;
    color: var(--design-color) !important;
  }
}

.phone-number-input {
  flex: 1;
}

.register-hint {
  margin: 12px 155px 0 16px;
  width: 204px;
  height: 20px;
  font-family: 'PingFang SC';
  text-align: left;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  color: #00000066;
}
</style>

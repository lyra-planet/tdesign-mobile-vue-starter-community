<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getAllProvinces, getCitiesByProvince } from '@/components/AddressData'

defineOptions({
  name: 'MyEdit',
})

const router = useRouter()

// 实时时间
const currentTime = ref('')
let timeInterval: NodeJS.Timeout | null = null

// 更新时间函数
function updateTime() {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  currentTime.value = `${hours}:${minutes}`
}

// 组件挂载时开始更新时间
onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
    timeInterval = null
  }
})

// 表单数据
const formData = ref({
  username: '',
  gender: '',
  birthday: '',
  address: [] as string[],
  bio: '',
  photos: [] as string[],
})

// 性别选项
const genderOptions = [
  { label: '男', value: '男' },
  { label: '女', value: '女' },
  { label: '保密', value: '保密' },
] as const

// 选择器状态
const showDatePicker = ref(false)
const showAddressPicker = ref(false)

// 规范化日期为 YYYY-MM-DD
function formatDate(input: string): string {
  if (!input)
    return ''
  const d = new Date(input)
  if (Number.isNaN(d.getTime())) {
    // 兜底处理如 1994-9-27 -> 1994-09-27
    const [y, m, day] = input.split('-')
    const mm = String(m).padStart(2, '0')
    const dd = String(day).padStart(2, '0')
    return `${y}-${mm}-${dd}`
  }
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// 将任意日期类型归一化为 YYYY-MM-DD（兼容 string/Date/数组）
function normalizeDateValue(v: unknown): string {
  if (!v)
    return ''
  if (typeof v === 'string')
    return formatDate(v)
  if (v instanceof Date) {
    const y = v.getFullYear()
    const m = String(v.getMonth() + 1).padStart(2, '0')
    const d = String(v.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }
  if (Array.isArray(v)) {
    const [y, m, d] = v as Array<number | string>
    const yy = String(y ?? '').trim()
    const mm = String(m ?? '').padStart(2, '0')
    const dd = String(d ?? '').padStart(2, '0')
    if (yy)
      return `${yy}-${mm}-${dd}`
  }
  return ''
}

const dateValue = ref<string>('') // 始终使用字符串，配合 format 输出
const addressValue = ref<string[]>([])

// 动态计算地址选择器的列数据
const provincesOptions = computed(() => getAllProvinces())
const addressColumns = computed(() => {
  const selectedProvince
    = addressValue.value[0] || provincesOptions.value[0]?.value || ''
  const cities = selectedProvince ? getCitiesByProvince(selectedProvince) : []
  return [provincesOptions.value, cities]
})

// 监听省份变化，自动更新城市
watch(
  () => addressValue.value[0],
  (newProvince, oldProvince) => {
    if (newProvince && newProvince !== oldProvince) {
      const cities = getCitiesByProvince(newProvince)
      if (cities.length > 0) {
        addressValue.value = [newProvince, cities[0].value]
      }
      else {
        addressValue.value = [newProvince]
      }
    }
  },
)

// 事件处理函数
const handleBack = () => router.back()

function handleSave() {
  console.log('保存个人信息:', formData.value)
  router.back()
}

// 修复：不再通过参数传递（避免传入 ref 对象），直接使用当前的 dateValue
function handleDateConfirm() {
  const normalized = normalizeDateValue(dateValue.value)
  if (normalized) {
    formData.value.birthday = normalized
  }
  showDatePicker.value = false
}

// 修复：不再通过参数传递（避免传入 ref 对象），直接使用当前的 addressValue
function handleAddressConfirm() {
  if (Array.isArray(addressValue.value) && addressValue.value.length) {
    formData.value.address = [...addressValue.value]
  }
  showAddressPicker.value = false
}

// 打开日期选择器时进行初始化，避免未同步问题
function handleDatePickerOpen() {
  dateValue.value = formData.value.birthday || ''
  showDatePicker.value = true
}

// 打开地址选择器时根据当前表单或默认进行兜底初始化
function handleAddressPickerOpen() {
  const provinces = provincesOptions.value
  const firstProvince = provinces[0]?.value || ''
  const province = formData.value.address[0] || firstProvince
  const cities = province ? getCitiesByProvince(province) : []
  const firstCity = cities[0]?.value || ''

  let city = ''
  if (formData.value.address[1] && cities.some(c => c.value === formData.value.address[1])) {
    city = formData.value.address[1]
  }
  else {
    city = firstCity
  }

  addressValue.value = city ? [province, city] : [province]
  showAddressPicker.value = true
}

function handlePhotoUpload(e: any) {
  let file: File | null = null

  // 兼容原 t-upload 的 files 数组形式
  if (Array.isArray(e)) {
    const f = e[0]
    file = f?.raw instanceof File ? f.raw : null
  }
  // 兼容 t-upload 的事件对象 { files: [...] }
  else if (Array.isArray(e?.files)) {
    const f = e.files[0]
    file = f?.raw instanceof File ? f.raw : null
  }
  // 原生 input[type=file]
  else if (e?.target?.files?.length) {
    file = e.target.files[0] as File
  }

  if (!file)
    return

  const url = URL.createObjectURL(file)
  formData.value.photos.push(url)

  // 重置 input，允许选择相同文件再次触发
  if (e?.target) {
    e.target.value = ''
  }
}

function removePhoto(index: number) {
  formData.value.photos.splice(index, 1)
}
</script>

<template>
  <div class="edit-page">
    <!-- 状态栏模拟 -->
    <div class="status-bar">
      <div class="status-left">
        <span class="time">{{ currentTime }}</span>
      </div>
      <div class="status-right">
        <div class="signal-icons">
          <div class="signal-icon">
            <img src="/my/ios-signal.svg" alt="信号" class="icon-svg">
          </div>
          <div class="wifi-icon">
            <img src="/my/ios-wifi.svg" alt="WiFi" class="icon-svg">
          </div>
          <div class="battery-icon">
            <img src="/my/ios-battery.svg" alt="电量" class="icon-svg">
          </div>
        </div>
      </div>
    </div>

    <!-- 头部 -->
    <div class="header">
      <div class="header-left" @click="handleBack">
        <t-icon name="chevron-left" size="24" color="var(--td-text-color-primary)" />
      </div>
      <div class="header-title">
        个人信息
      </div>
      <div class="header-right">
        <div class="mini-program-buttons">
          <img src="/my/MiniProgramMoreOutlined.svg" class="mini-program-icon">
          <div class="divider-line" />
          <img src="/my/MiniProgramCloseOutlined.svg" class="mini-program-icon">
        </div>
      </div>
    </div>

    <!-- 表单内容 -->
    <div class="form-content">
      <!-- 用户名 -->
      <div class="form-item">
        <div class="form-label">
          用户名
        </div>
        <t-input
          v-model="formData.username"
          placeholder="请输入用户名"
          :borderless="true"
          class="form-input"
        />
      </div>

      <!-- 性别 -->
      <div class="form-item">
        <div class="form-label">
          性别
        </div>
        <t-radio-group v-model="formData.gender" class="gender-group">
          <t-radio
            v-for="option in genderOptions"
            :key="option.value"
            :value="option.value"
            class="gender-radio"
          >
            {{ option.label }}
          </t-radio>
        </t-radio-group>
      </div>

      <!-- 生日 -->
      <div class="form-item clickable" @click="handleDatePickerOpen">
        <div class="form-label">
          生日
        </div>
        <div class="form-value">
          <span class="form-text">{{ formData.birthday || '请选择生日' }}</span>
          <t-icon name="chevron-right" size="24" color="rgba(0, 0, 0, 0.4)" />
        </div>
      </div>

      <!-- 地址 -->
      <div class="form-item clickable" @click="handleAddressPickerOpen">
        <div class="form-label">
          地址
        </div>
        <div class="form-value">
          <span class="form-text">{{ formData.address.join(' ') || '请选择地址' }}</span>
          <t-icon name="chevron-right" size="24" color="rgba(0, 0, 0, 0.4)" />
        </div>
      </div>

      <!-- 个人简介 -->
      <div class="form-item bio-item">
        <div class="form-label">
          个人简介
        </div>
        <t-textarea
          v-model="formData.bio"
          placeholder="请输入个人简介"
          :maxlength="50"
          indicator
          class="bio-textarea"
          :borderless="true"
        />
      </div>

      <!-- 相片墙 -->
      <div class="form-item photo-item">
        <div class="form-label">
          相片墙
        </div>
        <div class="photo-wall">
          <div
            v-for="(photo, index) in formData.photos"
            :key="index"
            class="photo-container"
          >
            <img :src="photo" alt="照片" class="photo-image">
            <div class="photo-remove" @click.stop="removePhoto(index)">
              <t-icon name="close" size="12" color="#fff" />
            </div>
          </div>

          <div
            v-if="formData.photos.length < 9"
            class="photo-container upload-container"
          >
            <!-- 改为原生 input，实现纯前端上传 -->
            <label class="photo-upload">
              <input
                type="file"
                accept="image/*"
                class="file-input"
                @change="handlePhotoUpload"
              >
              <div class="upload-trigger">
                <t-icon name="add" size="26.91" color="#00000066" />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- 保存按钮 -->
    <div class="save-button-container">
      <button class="save-button" @click="handleSave">
        保存
      </button>
    </div>

    <!-- 苹果Home指示器 -->
    <div class="home-indicator">
      <div class="indicator-bar" />
    </div>

    <!-- 日期选择器弹窗 -->
    <div v-if="showDatePicker" class="picker-overlay" @click="showDatePicker = false">
      <div class="picker-container date-picker-container" @click.stop>
        <div class="picker-header">
          <button class="picker-cancel" @click="showDatePicker = false">
            取消
          </button>
          <span class="picker-title">选择生日</span>
          <button class="picker-confirm" @click="handleDateConfirm">
            确定
          </button>
        </div>
        <div class="picker-content">
          <t-date-time-picker
            v-model="dateValue"
            mode="date"
            format="YYYY-MM-DD"
            :steps="[1, 1, 1]"
            class="date-picker"
          />
        </div>
      </div>
    </div>

    <!-- 地址选择器弹窗 -->
    <div v-if="showAddressPicker" class="picker-overlay" @click="showAddressPicker = false">
      <div class="picker-container address-picker-container" @click.stop>
        <div class="picker-header">
          <button class="picker-cancel" @click="showAddressPicker = false">
            取消
          </button>
          <span class="picker-title">选择地址</span>
          <button class="picker-confirm" @click="handleAddressConfirm">
            确定
          </button>
        </div>
        <div class="picker-content">
          <t-picker
            v-model="addressValue"
            :columns="addressColumns"
            class="address-picker"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use './edit.scss' as *;
</style>

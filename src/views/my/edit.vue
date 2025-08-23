<script setup lang='ts'>
import {
  BrowseIcon,
  MoreIcon,
} from 'tdesign-icons-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'MyEdit',
})

const router = useRouter()

// 表单数据
const formData = ref({
  username: '小小轩',
  gender: '男',
  birthday: '1994-9-27',
  address: ['广东省', '深圳市'],
  bio: '在你身边，为你设计',
  photos: [
    'https://tdesign.gtimg.com/demo/demo-image-1.png',
    'https://tdesign.gtimg.com/demo/demo-image-1.png',
  ],
})

// 性别选项
const genderOptions = [
  { label: '男', value: '男' },
  { label: '女', value: '女' },
  { label: '保密', value: '保密' },
]

// 日期选择器显示状态和值
const showDatePicker = ref(false)
const dateValue = ref(formData.value.birthday)
const showAddressPicker = ref(false)

// 地址选择器的值和选项
const addressValue = ref(formData.value.address)
const addressColumns = ref([
  [
    { label: '广东省', value: '广东省' },
    { label: '湖南省', value: '湖南省' },
  ],
  [
    { label: '深圳市', value: '深圳市' },
    { label: '广州市', value: '广州市' },
    { label: '长沙市', value: '长沙市' },
    { label: '岳阳市', value: '岳阳市' },
  ],
])

// 处理返回
function handleBack() {
  router.back()
}

// 处理保存
function handleSave() {
  console.log('保存个人信息:', formData.value)
  router.back()
}

// 处理日期确认
function handleDateConfirm(value: string) {
  formData.value.birthday = value
  dateValue.value = value
  showDatePicker.value = false
}

// 处理地址确认
function handleAddressConfirm(value: string[]) {
  formData.value.address = value
  addressValue.value = value
  showAddressPicker.value = false
}

// 处理照片上传
function handlePhotoUpload(files: any) {
  // 模拟上传逻辑
  const file = files[0]
  if (file) {
    const url = URL.createObjectURL(file.raw)
    formData.value.photos.push(url)
  }
}

// 删除照片
function removePhoto(index: number) {
  formData.value.photos.splice(index, 1)
}
</script>

<template>
  <div class="edit-page">
    <!-- 头部 -->
    <div class="header">
      <div class="header-left" @click="handleBack">
        <t-icon name="chevron-left" size="24" color="#000" />
      </div>
      <div class="header-title">
        个人信息
      </div>
      <div class="header-right">
        <t-icon :icon="MoreIcon" size="24" />
        <t-icon :icon="BrowseIcon" size="24" />
      </div>
    </div>

    <!-- 表单内容 -->
    <div class="form-content">
      <!-- 用户名 -->
      <div class="form-item">
        <div class="form-label">
          用户名
        </div>
        <t-input v-model="formData.username" placeholder="请输入用户名" :borderless="true" class="form-input" />
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
      <div class="form-item clickable" @click="showDatePicker = true">
        <div class="form-label">
          生日
        </div>
        <div class="form-value">
          <span class="form-text">{{ formData.birthday || '请选择生日' }}</span>
          <t-icon name="chevron-right" size="24" color="rgba(0, 0, 0, 0.4)" />
        </div>
      </div>

      <!-- 地址 -->
      <div class="form-item clickable" @click="showAddressPicker = true">
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

          <!-- 将上传按钮包进与图片相同的容器，确保同一尺寸与对齐 -->
          <div
            v-if="formData.photos.length < 9"
            class="photo-container upload-container"
          >
            <t-upload
              :before-upload="() => false"
              class="photo-upload"
              @change="handlePhotoUpload"
            >
              <div class="upload-trigger">
                <t-icon name="add" size="26.91" color="#00000066" />
              </div>
            </t-upload>
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
          <button class="picker-confirm" @click="handleDateConfirm(dateValue)">
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
          <button class="picker-confirm" @click="handleAddressConfirm(addressValue)">
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

<style lang='scss' scoped>
.edit-page {
  min-height: 100vh;
  background-color: white;
  padding-bottom: calc(6.4vw + 80px);
  overflow-x: hidden;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: white;
  height: 48px;
  border-bottom: 0.5px solid #e7e7e7;
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
    color: #333;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .header-right {
    cursor: pointer;
    display: flex;
    gap: 16px;
  }
}

.form-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  border-bottom: 0.5px solid #e7e7e7;

  .form-label {
    font-size: 16px;
    color: #333;
    font-weight: 400;
    flex-shrink: 0;
    margin-right: 16px;
  }

  .form-input {
    text-align: right;
    font-size: 16px;
  }

  .form-value {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    color: #666;
  }

  &.clickable {
    cursor: pointer;
  }
}

// 性别行：精确控制总宽度246px
.gender-group {
  display: flex;
  align-items: center;
  width: 246px;
  justify-content: flex-start;

  :deep(.t-radio) {
    margin: 0;
  }

  .gender-radio {
    display: flex;
    align-items: center;

    &:last-child {
      margin-right: 0;
    }

    :deep(.t-radio__icon) {
      width: 24px;
      height: 24px;
      min-width: 24px;
      min-height: 24px;
    }

    :deep(.t-radio__content),
    :deep(.t-radio__label) {
      margin-left: 2px;
      font-size: 16px;
      line-height: 1;
      white-space: nowrap;
    }
  }
}

// 个人简介块：固定整块高度132px
.bio-item {
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  height: 132px;
  padding: 12px 16px;
  .form-label {
    line-height: 24px;
  }
}
.bio-textarea {
  width: 100%;
  font-size: 16px;
  padding: 0;
  flex: 1;
  :deep(textarea) {
    padding: 0;
  }
}

// 相片墙：使用固定列宽，保证每个项与添加按钮完全对齐
.photo-item {
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  height: auto;
  padding: 14px 16px;
  border-bottom: 0;
}

.photo-wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, 76.88px);
  gap: 8px;
  width: 100%;
  justify-content: start;
  align-items: start;

  .photo-container {
    position: relative;
    width: 76.88px;
    height: 76.88px;
    border-radius: 5.77px;
    overflow: hidden;

    .photo-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* 删除按钮按你给的规格：高度 15.13px，背景 #00000066 */
    .photo-remove {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 15.13px;
      height: 15.13px;
      background-color: #00000066;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      :deep(svg) {
        width: 10px;
        height: 10px;
      }
    }
  }

  .upload-container {
    width: 76.88px;
    height: 76.88px;

    .photo-upload {
      width: 100%;
      height: 100%;
      display: block; /* 防止基线偏移 */
    }

    .upload-trigger {
      width: 100%;
      height: 100%;
      background: #f3f3f3;
      border-radius: 5.77px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 1;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #e8e8e8;
      }
    }
  }
}

// 保存按钮与底部Home指示器保持不变
.save-button-container {
  position: fixed;
  bottom: 6.4vw;
  left: 0;
  right: 0;
  padding: 16px;
  background-color: white;
  opacity: 1;
  z-index: 10;
}
.save-button {
  width: 100%;
  height: 48px;
  border-radius: 6px;
  background: #0052d9;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  opacity: 1;
}

// 苹果手机底部滑动指示器
.home-indicator {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 6.4vw;
  background-color: #ffffff;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 5;

  .indicator-bar {
    width: 35.73vw;
    height: 1.33vw;
    border-radius: 100px;
    background-color: #000000e6;
    opacity: 1;
  }
}

// 选择器弹窗样式
.picker-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.picker-container {
  width: 100%;
  /* 去掉强限制，让容器按内容自适应高度，保留必要上限避免过高 */
  max-height: unset;
  background-color: white;
  border-radius: 16px 16px 0 0;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease-out;

  .picker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* 再贴近一点，缩小标题区内边距 */
    padding: 12px 16px;
    border-bottom: 0.5px solid #e7e7e7;
    background-color: white;
    border-radius: 16px 16px 0 0;
    flex-shrink: 0;

    .picker-cancel,
    .picker-confirm {
      background: none;
      border: none;
      font-size: 16px;
      cursor: pointer;
      padding: 0;
    }

    .picker-cancel {
      color: #666;
    }

    .picker-confirm {
      color: #0052d9;
      font-weight: 500;
    }

    .picker-title {
      font-size: 17px;
      font-weight: 600;
      color: #333;
    }
  }

  .picker-content {
    /* 关键：不再填充剩余空间，按内容自适应，彻底消除下方大空白 */
    flex: 0 0 auto;
    overflow: hidden;
    padding: 0;

    .date-picker,
    .address-picker {
      /* 关键：不拉伸到父容器 100% 高度 */
      height: auto;
      padding: 0;

      /* 隐藏内部的标题/工具栏（防止预留占位造成上方空隙） */
      :deep(.t-picker__confirm),
      :deep(.t-picker__cancel),
      :deep(.t-picker__title),
      :deep(.t-picker__header),
      :deep(.t-picker__toolbar),
      :deep(.t-picker__footer),
      :deep(.t-date-time-picker__confirm),
      :deep(.t-date-time-picker__cancel),
      :deep(.t-date-time-picker__title),
      :deep(.t-date-time-picker__header),
      :deep(.t-date-time-picker__toolbar),
      :deep(.t-date-time-picker__footer),
      :deep(.t-date-time-picker__actions) {
        display: none !important;
        height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
      }

      /* 清除内容区可能的顶部间距（再往上贴一点） */
      :deep(.t-picker__content),
      :deep(.t-date-time-picker__content),
      :deep(.t-picker__group) {
        margin: 0 !important;
        padding: 0 !important;
      }

      /* 不强行占满父容器，保持自然高度 */
      :deep(.t-picker),
      :deep(.t-date-time-picker) {
        height: auto !important;
        max-height: none !important;
      }
    }
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

// 适配安全区域
@supports (padding: max(0px)) {
  .edit-page {
    padding-bottom: max(calc(6.4vw + 80px), calc(6.4vw + 80px + env(safe-area-inset-bottom)));
  }
  .home-indicator {
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }
}

// 响应式适配
@media (max-width: 375px) {
  .picker-container {
    /* 小屏幕仍可限制上限，但不强制填充 */
    max-height: 60vh;
  }
}

@media (min-width: 768px) {
  .picker-container {
    max-height: 50vh;
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>

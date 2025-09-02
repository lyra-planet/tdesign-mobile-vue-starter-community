<script setup lang="ts">
import dayjs from 'dayjs'

import { useEditHook } from './edit/hooks'

defineOptions({
  name: 'MyEdit',
})

const {
  formRef,
  formData,
  formVisible,
  addressLabel,
  addressColumns,
  birthdayValue,
  handleSave,
  handleAddressConfirm,
  onAddressColumnChange,
  handleDatePickerOpen,
  handleAddressPickerOpen,
  handlePicChange,
} = useEditHook()
</script>

<template>
  <div class="edit-page">
    <!-- 表单内容 - 使用 t-form 布局 -->
    <div class="form-content">
      <t-form
        ref="formRef"
        :data="formData"
        reset-type="initial"
        scroll-to-first-error="auto"
        label-align="left"
        class="edit-form"
      >
        <!-- 用户名 -->
        <t-form-item label="用户名" name="username">
          <t-input
            v-model="formData.username"
            borderless
            placeholder="请输入用户名"
            :maxlength="30"
          />
        </t-form-item>

        <!-- 性别 -->
        <t-form-item label="性别" name="gender">
          <t-radio-group v-model="formData.gender" class="w-full flex justify-between" borderless>
            <t-radio :block="false" name="gender" value="男" label="男" />
            <t-radio :block="false" name="gender" value="女" label="女" />
            <t-radio :block="false" name="gender" value="保密" label="保密" />
          </t-radio-group>
        </t-form-item>

        <!-- 生日 -->
        <t-form-item arrow label="生日" name="birthday" content-align="right">
          <t-input
            v-model="formData.birthday"
            borderless
            align="right"
            placeholder="请选择生日"
            readonly
            class="picker-input"
            @click="handleDatePickerOpen"
          />
        </t-form-item>

        <!-- 地址 -->
        <t-form-item arrow label="地址" name="address" content-align="right">
          <t-input
            v-model="addressLabel"
            borderless
            align="right"
            placeholder="请选择地址"
            readonly
            class="picker-input"
            @click="handleAddressPickerOpen"
          />
        </t-form-item>

        <!-- 个人简介 -->
        <t-form-item label="个人简介" name="bio">
          <t-textarea
            v-model="formData.bio"
            class="w-full h-[100px]"
            indicator
            :maxlength="50"
            placeholder="请输入个人简介"
          />
        </t-form-item>

        <!-- 相片墙 -->
        <t-form-item label="相片墙" name="photo">
          <t-upload
            v-model="formData.photos"
            class="upload-pic"
            multiple
            theme="image"
            :max="9"
            action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
            @change="handlePicChange"
          />
        </t-form-item>
      </t-form>
    </div>

    <!-- 保存按钮 -->
    <div class="save-button-container">
      <button class="save-button" @click="handleSave">
        保存
      </button>
    </div>

    <!-- 日期选择器弹窗 -->
    <t-popup v-model="formVisible.birthday" placement="bottom">
      <t-date-time-picker
        v-model="birthdayValue"
        :mode="['date']"
        title="选择日期"
        format="YYYY-MM-DD"
        :start="dayjs().subtract(100, 'year').format('YYYY-MM-DD')"
        :end="dayjs().format('YYYY-MM-DD')"
        @confirm="formVisible.birthday = false"
        @cancel="formVisible.birthday = false"
      />
    </t-popup>

    <!-- 地址选择器弹窗 -->
    <t-popup v-model="formVisible.address" placement="bottom">
      <t-picker
        title="选择地址"
        :columns="addressColumns"
        @confirm="handleAddressConfirm"
        @cancel="formVisible.address = false"
        @pick="onAddressColumnChange"
      />
    </t-popup>
  </div>
</template>

<style lang="scss" scoped>
@use './edit.scss' as *;

// t-form 样式优化
.edit-form {
  background-color: var(--td-bg-color-container);

  :deep(.t-form-item) {
    border-bottom: 0.5px solid var(--td-border-level-1-color);
    padding: 16px;
    margin: 0;

    &:last-child {
      border-bottom: none;
    }
  }

  :deep(.t-form-item__label) {
    color: var(--td-text-color-primary);
    font-size: 16px;
    font-weight: 400;
    width: 80px;
    flex-shrink: 0;
  }

  :deep(.t-form-item__content) {
    flex: 1;
  }

  // 输入框样式
  :deep(.t-input) {
    --td-input-default-text-color: var(--td-text-color-primary);
  }

  :deep(.t-input__inner) {
    color: var(--td-text-color-primary) !important;
    font-size: 16px;
  }

  :deep(input) {
    color: var(--td-text-color-primary) !important;
  }

  // 文本域样式
  :deep(.t-textarea__inner) {
    color: var(--td-text-color-primary) !important;
    font-size: 16px;
    line-height: 1.5;
  }

  :deep(textarea) {
    color: var(--td-text-color-primary) !important;
  }
}

// 选择器输入框样式
.picker-input {
  --td-input-default-text-color: #00000066;

  :deep(.t-input__inner) {
    color: #00000066 !important;
  }

  :deep(input) {
    color: #00000066 !important;
  }
}

// 相片墙样式
.upload-pic {
  --td-upload-grid-columns: 3;

  :deep(.t-upload__delete-btn path) {
    transform: scale(0.725);
    transform-origin: center;
  }

  :deep(.t-upload__wrapper) {
    gap: 8px;
  }
}
</style>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const variants = ['light', 'dark', 'outline', 'light-outline']
</script>

<template>
  <div class="flex flex-row h-[52px] items-center flex-nowrap">
    <div class="summary text-[16px] px-[16px] flex-shrink-0 text-[var(--td-text-color-primary)]">
      {{ t('pages.publish.add_tags') }}
    </div>
    <div class="tag-demo overflow-hidden">
      <div class="overflow-x-scroll scrollbar-hidden scroll-smooth flex flex-row flex-nowrap">
        <t-check-tag class="mx-[6px]" variant="dark" size="medium" :content="t('pages.publish.tags.ai_art')" />
        <t-check-tag class="mx-[6px]" variant="dark" size="medium" :content="t('pages.publish.tags.copyright_material')" />
        <t-check-tag class="mx-[6px]" variant="dark" size="medium" :content="t('pages.publish.tags.original')" />
        <t-check-tag class="mx-[6px]" variant="dark" size="medium" :content="t('pages.publish.tags.style_inspiration')" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.check-tag-block {
  display: flex;
  align-items: center;

  &__title {
    color: var(--td-text-color-disabled, rgba(0, 0, 0, 0.4));
    font-size: 14px;
    width: 80px;
    margin-right: 16px;
  }
}
.scrollbar-hidden {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}
</style>

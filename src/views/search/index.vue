<script setup>
import { Icon as TIcon } from 'tdesign-icons-vue-next'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'Searchpage',
})

const { t } = useI18n()

const taglist = computed(() => [
  t('pages.search.tags.ai_art'),
  t('pages.search.tags.stable_diffusion'),
  t('pages.search.tags.copyright_material'),
  t('pages.search.tags.starry_sky'),
  t('pages.search.tags.illustration'),
  t('pages.search.tags.ai_art'),
])

const findlist = computed(() => [
  t('pages.search.discoveries.exam_advice'),
  t('pages.search.discoveries.protein_choice'),
  t('pages.search.discoveries.online_shopping'),
  t('pages.search.discoveries.travel_with_kids'),
  t('pages.search.discoveries.chinese_cars'),
  t('pages.search.discoveries.hr_question'),
])

const searchQuery = ref('')
</script>

<template>
  <div class="page">
    <div class="search-container">
      <t-search v-model="searchQuery" :clearable="true" shape="round" class="search" :placeholder="t('common.search.placeholder')">
        <template #left-icon>
          <TIcon name="search" size="18px" />
        </template>
      </t-search>
      <div class="cancel" @click="() => { searchQuery.value = ''; }">
        {{ t('pages.search.cancel') }}
      </div>
    </div>
    <div class="recode">
      <div class="recode-title">
        {{ t('pages.search.history') }}
      </div>
      <div class="recode-detail">
        <t-tag v-for="(tag, index) in taglist" :key="index" variant="light" class="tag">
          {{ tag }}
        </t-tag>
      </div>
    </div>
    <div class="find">
      {{ t('pages.search.discoveries.title') }}
    </div>
    <div class="find-detail">
      <t-tag v-for="(find, index) in findlist" :key="index" variant="light" class="find-content">
        {{ find }}
      </t-tag>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  width: 100%;
  background-color: var(--td-bg-color-container);
  height: 100%;
  display: flex;
  flex-direction: column;
  .search-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    opacity: 1;
    background: var(--td-bg-color-container);
    .search {
      flex: 1;
      height: 40px;
      padding: 8px 16px;
      opacity: 1;

      background: var(--td-bg-color-container);
    }
    .cancel {
      min-width: 40px;
      height: 24px;
      opacity: 1;
      color: #0052d9;
      font-size: 16px;
      font-weight: 400;
      font-family: 'PingFang SC';
      text-align: center;
      line-height: 24px;
      margin: 16px;
      white-space: nowrap;
    }
  }
  .recode {
    .recode-title {
      opacity: 1;
      font-size: 18px;
      font-weight: 600;
      font-family: 'PingFang SC';
      text-align: left;
      line-height: 26px;
      color: var(--td-text-color-primary);
      margin: 16px auto 16px 16px;
    }
    .recode-detail {
      font-size: 14px;
      color: var(--td-text-color-primary);
      margin: 16px;
      .tag {
        margin: 10px 8px 0 0;
      }
    }
  }
  .find {
    opacity: 1;
    font-size: 18px;
    font-weight: 600;
    font-family: 'PingFang SC';
    text-align: left;
    line-height: 26px;
    color: var(--td-text-color-primary);
    margin: 24px auto 16px 16px;
  }
  .find-detail {
    display: flex;
    flex-wrap: wrap;

    .find-content {
      margin: 10px 8px 0 16px;
    }
  }
}
</style>

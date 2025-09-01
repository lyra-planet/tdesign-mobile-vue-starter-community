<script setup>
import { Icon as TIcon } from 'tdesign-icons-vue-next'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'Searchpage',
})
const taglist = ['AI绘画', 'Stable Diffusion', '版权素材', '星空', 'illustration', 'AI绘画']
const findlist = ['考研考编同时上岸应该怎么选？有哪些参考建议 ', '日常饮食中，如何选择优质蛋白', '你有没有网购维权成功的经历？求分享经验', '夏季带孩子旅游，你的必备物品有哪些', '在海外越卖越贵，中国汽车做对了什么', '当HR问你离职原因，怎么回答最能被接受']
const { t } = useI18n()
const searchQuery = ref('')
</script>

<template>
  <div class="page">
    <div class="search-container">
      <t-search v-model="searchQuery" :clearable="true" shape="round" class="search" placeholder="请搜索你想要的内容">
        <template #left-icon>
          <TIcon name="search" size="18px" />
        </template>
      </t-search>
      <div class="cancel" @click="() => { searchQuery.value = ''; }">
        取消
      </div>
    </div>
    <div class="recode">
      <div class="recode-title">
        历史记录
      </div>
      <div class="recode-detail">
        <t-tag v-for="(tag, index) in taglist" :key="index" variant="light" class="tag">
          {{ tag }}
        </t-tag>
      </div>
    </div>
    <div class="find">
      搜索发现
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
    background: #ffffff;
    .search {
      flex: 1;
      height: 40px;
      padding: 8px 16px;
      opacity: 1;

      background: #ffffff;
    }
    .cancel {
      width: 32px;
      height: 24px;
      opacity: 1;
      color: #0052d9;
      font-size: 16px;
      font-weight: 400;
      font-family: 'PingFang SC';
      text-align: left;
      line-height: 24px;
      margin: 16px;
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
      color: var(--td-text-color);
      margin: 16px auto 16px 16px;
    }
    .recode-detail {
      font-size: 14px;
      color: var(--td-text-color);
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
    color: var(--td-text-color);
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

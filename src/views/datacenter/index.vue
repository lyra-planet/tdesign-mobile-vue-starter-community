<script setup lang="ts">
import type { RegionColumn, VideoStatistics } from '@/api/datacenter'
import { Message } from 'tdesign-mobile-vue'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getDataCenterStats } from '@/api/datacenter'

defineOptions({
  name: 'DataCenter',
})

const { t } = useI18n()

// 按区域统计数据
const regionData = ref<VideoStatistics[]>([])
const regionColumns = ref<RegionColumn[]>([])
const loading = ref(false)

// 加载数据中心统计数据
async function loadDataCenterStats() {
  try {
    loading.value = true
    const response = await getDataCenterStats()
    if (response.success) {
      regionData.value = response.data.regionData
      // 合并翻译的列配置
      regionColumns.value = response.data.regionColumns.map(col => ({
        ...col,
        title: getColumnTitle(col.colKey),
      }))
    }
    else {
      Message.error(response.message || '获取数据失败')
    }
  }
  catch (error) {
    console.error('加载数据中心统计失败:', error)
    Message.error('加载数据失败，请重试')
  }
  finally {
    loading.value = false
  }
}

// 获取列标题翻译
function getColumnTitle(colKey: string): string {
  const titleMap: Record<string, string> = {
    title: t('pages.datacenter.region.columns.title'),
    global: t('pages.datacenter.region.columns.global'),
    northChina: t('pages.datacenter.region.columns.north_china'),
    eastChina: t('pages.datacenter.region.columns.east_china'),
    westChina: t('pages.datacenter.region.columns.west_china'),
    southChina: t('pages.datacenter.region.columns.south_china'),
    index: '排名',
  }
  return titleMap[colKey] || colKey
}

// 组件挂载时加载数据
onMounted(() => {
  loadDataCenterStats()
})

// 表格事件处理
function handleRowClick(e: any) {
  console.warn('[row-click]', e)
}

function handleCellClick(e: any) {
  console.warn('[cell-click]', e)
}

function handleScroll(e: any) {
  console.warn('[scroll]', e)
}
</script>

<template>
  <div class="datacenter-container">
    <!-- 整体情况栏 -->
    <div class="overview-section">
      <div class="overview-header">
        <div class="overview-title">
          {{ t('pages.datacenter.overview.title') }}
        </div>
        <div class="overview-note">
          {{ t('pages.datacenter.overview.note') }}
        </div>
      </div>
      <div class="overview-content">
        <div class="overview-item">
          <div class="overview-label">
            {{ t('pages.datacenter.overview.views') }}
          </div>
          <div class="overview-number views-number">
            202W
          </div>
        </div>
        <div class="overview-item">
          <div class="overview-label">
            {{ t('pages.datacenter.overview.pv') }}
          </div>
          <div class="overview-number">
            233W
          </div>
        </div>
        <div class="overview-item">
          <div class="overview-label">
            {{ t('pages.datacenter.overview.uv') }}
          </div>
          <div class="overview-number">
            102W
          </div>
        </div>
      </div>
    </div>

    <!-- 互动情况栏 -->
    <div class="interaction-section">
      <div class="interaction-header">
        <div class="interaction-title">
          {{ t('pages.datacenter.interaction.title') }}
        </div>
      </div>
      <div class="interaction-content">
        <div class="interaction-item">
          <div class="interaction-label">
            {{ t('pages.datacenter.interaction.views') }}
          </div>
          <div class="interaction-number">
            <span class="number">919</span>
            <span class="unit">{{ t('pages.datacenter.interaction.unit') }}</span>
          </div>
        </div>
        <div class="interaction-item">
          <div class="interaction-label">
            {{ t('pages.datacenter.interaction.likes') }}
          </div>
          <div class="interaction-number">
            <span class="number">887</span>
            <span class="unit">{{ t('pages.datacenter.interaction.unit') }}</span>
          </div>
        </div>
        <div class="interaction-item">
          <div class="interaction-label">
            {{ t('pages.datacenter.interaction.shares') }}
          </div>
          <div class="interaction-number">
            <span class="number">104</span>
            <span class="unit">{{ t('pages.datacenter.interaction.unit') }}</span>
          </div>
        </div>
        <div class="interaction-item">
          <div class="interaction-label">
            {{ t('pages.datacenter.interaction.favorites') }}
          </div>
          <div class="interaction-number">
            <span class="number">47</span>
            <span class="unit">{{ t('pages.datacenter.interaction.unit') }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 完播率栏 -->
    <div class="completion-section">
      <div class="completion-header">
        <div class="completion-title">
          {{ t('pages.datacenter.completion.title') }}
        </div>
      </div>
      <div class="completion-content">
        <div class="completion-item">
          <div class="completion-time">
            12:00
          </div>
          <div class="completion-progress">
            <t-progress :percentage="80" />
          </div>
        </div>
        <div class="completion-item">
          <div class="completion-time">
            14:00
          </div>
          <div class="completion-progress">
            <t-progress :percentage="60" />
          </div>
        </div>
        <div class="completion-item">
          <div class="completion-time">
            16:00
          </div>
          <div class="completion-progress">
            <t-progress :percentage="85" />
          </div>
        </div>
        <div class="completion-item">
          <div class="completion-time">
            18:00
          </div>
          <div class="completion-progress">
            <t-progress :percentage="43" />
          </div>
        </div>
        <div class="completion-item">
          <div class="completion-time">
            20:00
          </div>
          <div class="completion-progress">
            <t-progress :percentage="60" />
          </div>
        </div>
        <div class="completion-item">
          <div class="completion-time">
            22:00
          </div>
          <div class="completion-progress">
            <t-progress :percentage="95" />
          </div>
        </div>
      </div>
    </div>

    <!-- 按区域统计栏 -->
    <div class="region-section">
      <div class="region-header">
        <div class="region-title">
          {{ t('pages.datacenter.region.title') }}
        </div>
      </div>
      <div class="region-content">
        <t-table
          :fixed-rows="[1, 2]"
          row-key="index"
          :data="regionData"
          :columns="regionColumns"
          :stripe="true"
          :show-header="true"
          cell-empty-content="-"
          class="region-table"
          @row-click="handleRowClick"
          @cell-click="handleCellClick"
          @scroll="handleScroll"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.datacenter-container {
  background-color: #f5f5f5;
}

.overview-section {
  background-color: #fff;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 16px;

  .overview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .overview-title {
    font-size: 16px;
    font-weight: 600;
    color: #000000e6;
  }

  .overview-content {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }

  .overview-item {
    text-align: left;
    flex: 1 1 0;
    min-width: 0;

    .overview-label {
      font-size: 12px;
      color: #999;
      margin-bottom: 4px;
    }

    .overview-number {
      font-size: 24px;
      font-weight: 700;
      color: #000000e6;
    }

    .overview-number.views-number {
      color: #0052d9;
    }
  }

  .overview-note {
    font-size: 12px;
    color: #999;
    line-height: 1.2;
  }
}

.interaction-section {
  background-color: #fff;
  border-radius: 9px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin: 0 16px 16px;

  .interaction-header {
    margin-bottom: 16px;
  }

  .interaction-title {
    font-size: 16px;
    font-weight: 600;
    color: #000000e6;
  }

  .interaction-content {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }

  .interaction-item {
    text-align: left;
    flex: 1 1 0;
    min-width: 0;

    .interaction-label {
      font-size: 12px;
      color: #999;
      margin-bottom: 4px;
    }

    .interaction-number {
      .number {
        font-size: 24px;
        font-weight: 700;
        color: #000000e6;
      }

      .unit {
        font-size: 12px;
        color: #999;
        margin-left: 2px;
      }
    }
  }
}

.completion-section {
  background-color: #fff;
  border-radius: 9px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin: 0 16px 16px;

  .completion-header {
    margin-bottom: 16px;
  }

  .completion-title {
    font-size: 16px;
    font-weight: 600;
    color: #000000e6;
  }

  .completion-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .completion-item {
    display: flex;
    align-items: center;
    gap: 16px;

    .completion-time {
      font-size: 14px;
      color: #666;
      min-width: 50px;
    }

    .completion-progress {
      flex: 1;
    }
  }
}

.region-section {
  background-color: #fff;
  border-radius: 9px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin: 0 16px 16px;

  .region-header {
    margin-bottom: 16px;
  }

  .region-title {
    font-size: 16px;
    font-weight: 600;
    color: #000000e6;
  }

  .region-content {
    overflow-x: auto;

    .region-table {
      border: 1px solid #e7e7e7;
      border-radius: 6px;
    }
  }
}
</style>

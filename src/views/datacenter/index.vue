<script setup lang="ts">
import { Icon as TIcon } from 'tdesign-icons-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'DataCenter',
})

const router = useRouter()

// 按区域统计数据
const regionData = ref([
  { index: 1, title: '视频A', global: '156', northChina: '89', eastChina: '134', westChina: '67', southChina: '123' },
  { index: 2, title: '视频B', global: '234', northChina: '156', eastChina: '189', westChina: '98', southChina: '167' },
  { index: 3, title: '视频C', global: '189', northChina: '123', eastChina: '145', westChina: '78', southChina: '134' },
  { index: 4, title: '视频D', global: '267', northChina: '178', eastChina: '234', westChina: '123', southChina: '189' },
  { index: 5, title: '视频E', global: '145', northChina: '89', eastChina: '123', westChina: '67', southChina: '98' },
  { index: 6, title: '视频F', global: '198', northChina: '134', eastChina: '167', westChina: '89', southChina: '145' },
  { index: 7, title: '视频G', global: '223', northChina: '145', eastChina: '189', westChina: '112', southChina: '167' },
  { index: 8, title: '视频H', global: '178', northChina: '112', eastChina: '145', westChina: '78', southChina: '123' },
  { index: 9, title: '视频I', global: '245', northChina: '167', eastChina: '198', westChina: '123', southChina: '178' },
  { index: 10, title: '视频J', global: '167', northChina: '98', eastChina: '134', westChina: '67', southChina: '112' },
])

// 表格列配置
const regionColumns = [
  { colKey: 'title', title: '标题', fixed: 'left' as const, width: 80 },
  { colKey: 'global', title: '全球', width: 80 },
  { colKey: 'northChina', title: '华北', width: 80 },
  { colKey: 'eastChina', title: '华东', width: 80 },
  { colKey: 'westChina', title: '华西', width: 80 },
  { colKey: 'southChina', title: '华南', width: 80 },
]

// 表格事件处理
function handleRowClick(e: any) {
  console.log('[row-click]', e)
}

function handleCellClick(e: any) {
  console.log('[cell-click]', e)
}

function handleScroll(e: any) {
  console.log('[scroll]', e)
}
</script>

<template>
  <div class="datacenter-container">
    <!-- 整体情况栏 -->
    <div class="overview-section">
      <div class="overview-header">
        <div class="overview-title">
          整体情况
        </div>
        <div class="overview-note">
          截止12-00累计数值
        </div>
      </div>
      <div class="overview-content">
        <div class="overview-item">
          <div class="overview-label">
            浏览量
          </div>
          <div class="overview-number views-number">
            202W
          </div>
        </div>
        <div class="overview-item">
          <div class="overview-label">
            PV
          </div>
          <div class="overview-number">
            233W
          </div>
        </div>
        <div class="overview-item">
          <div class="overview-label">
            UV
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
          互动情况
        </div>
      </div>
      <div class="interaction-content">
        <div class="interaction-item">
          <div class="interaction-label">
            浏览量
          </div>
          <div class="interaction-number">
            <span class="number">919</span>
            <span class="unit">次</span>
          </div>
        </div>
        <div class="interaction-item">
          <div class="interaction-label">
            点赞量
          </div>
          <div class="interaction-number">
            <span class="number">887</span>
            <span class="unit">次</span>
          </div>
        </div>
        <div class="interaction-item">
          <div class="interaction-label">
            分享量
          </div>
          <div class="interaction-number">
            <span class="number">104</span>
            <span class="unit">次</span>
          </div>
        </div>
        <div class="interaction-item">
          <div class="interaction-label">
            收藏
          </div>
          <div class="interaction-number">
            <span class="number">47</span>
            <span class="unit">次</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 完播率栏 -->
    <div class="completion-section">
      <div class="completion-header">
        <div class="completion-title">
          完播率
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
          按区域统计
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
  min-height: 100vh;
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

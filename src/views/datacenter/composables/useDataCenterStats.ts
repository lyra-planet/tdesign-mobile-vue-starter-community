import type { RegionColumn, VideoStatistics } from '@/api/datacenter'
import { Message } from 'tdesign-mobile-vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getDataCenterStats } from '@/api/datacenter'

export function useDataCenterStats() {
  const { t } = useI18n()

  // 按区域统计数据
  const regionData = ref<VideoStatistics[]>([])
  const regionColumns = ref<RegionColumn[]>([])
  const loading = ref(false)

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

  return {
    regionData,
    regionColumns,
    loading,
    loadDataCenterStats,
  }
}

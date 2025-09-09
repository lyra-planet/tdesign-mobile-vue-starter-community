import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { getSearchDiscoveries, getSearchHistoryTags, search as searchApi } from '@/api/search'

export function useSearch() {
  const { t } = useI18n()
  const router = useRouter()

  const taglist = ref<string[]>([])
  const findlist = ref<string[]>([])

  const searchQuery = ref('')
  let searchTimer: number | null = null
  let currentSearchController: AbortController | null = null

  onMounted(async () => {
    const [tagsRes, discRes] = await Promise.all([
      getSearchHistoryTags(),
      getSearchDiscoveries(),
    ])
    if (tagsRes.success && tagsRes.data)
      taglist.value = tagsRes.data.tags || []
    if (discRes.success && discRes.data)
      findlist.value = discRes.data.items || []
  })

  watch(searchQuery, (q) => {
    if (searchTimer)
      clearTimeout(searchTimer)
    const text = q?.trim() || ''
    if (!text) {
      if (currentSearchController)
        currentSearchController.abort()
      currentSearchController = null
      return
    }
    searchTimer = window.setTimeout(async () => {
      if (currentSearchController)
        currentSearchController.abort()
      const controller = new AbortController()
      currentSearchController = controller
      await searchApi(text, controller.signal)
      // 如果后续需要使用搜索结果，可在此扩展返回值
    }, 300)
  })

  onBeforeUnmount(() => {
    if (searchTimer)
      clearTimeout(searchTimer)
    if (currentSearchController)
      currentSearchController.abort()
  })

  function handleCancelClick() {
    router.push('/home')
  }

  return {
    t,
    taglist,
    findlist,
    searchQuery,
    handleCancelClick,
  }
}

export type UseSearchReturn = ReturnType<typeof useSearch>

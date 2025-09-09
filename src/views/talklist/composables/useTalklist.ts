import { computed, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { error, isLoading, loadTalkList, markChatAsRead, talklist } from '@/store/talklist'

export function useTalklist() {
  const router = useRouter()

  // 按消息数量排序，未读多的在前
  const mytalklist = computed(() => [...talklist].sort((a, b) => b.count - a.count))

  // 虚拟滚动 - 新主导 API
  const itemSize = 82
  const bufferPx = 400

  async function goToDetail(id: string) {
    await markChatAsRead(id)
    router.push({ path: `/notice/${id}` })
  }

  function truncateMessage(message: string, maxLength = 22) {
    if (message.length > maxLength)
      return `${message.substring(0, maxLength)}...`
    return message
  }

  function getLastMessage(messages: any[]) {
    if (!messages || messages.length === 0)
      return '暂无消息'
    return messages[messages.length - 1].value
  }

  async function refreshTalkList() {
    await loadTalkList()
  }

  onMounted(async () => {
    await loadTalkList()
    await nextTick()
  })

  return {
    // loading & error
    isLoading,
    error,
    // list
    mytalklist,
    itemSize,
    bufferPx,
    // actions
    goToDetail,
    truncateMessage,
    getLastMessage,
    refreshTalkList,
  }
}

export type UseTalklistReturn = ReturnType<typeof useTalklist>

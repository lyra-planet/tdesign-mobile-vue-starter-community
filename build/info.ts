import type { Plugin, ResolvedConfig } from 'vite'
import dayjs from 'dayjs'
import { formatSize, getDirSize, logger } from './utils'

export function buildInfo(): Plugin {
  let mode: ResolvedConfig['command'] = null
  let start: number // 开始时间
  let end: number // 结束时间
  let dist: string // 打包目录

  return {
    name: 'buildInfo',
    // https://vite.dev/guide/api-plugin.html#configresolved
    configResolved(config: ResolvedConfig) {
      mode = config.command // 'build' | 'serve'
      dist = config.build?.outDir ?? 'dist'
    },
    // https://rollupjs.org/plugin-development/#buildstart
    buildStart() {
      if (mode === 'build') {
        logger.log('\n-------------------')
        logger.log('📦 项目开始打包...')
        logger.log('-------------------\n')
        start = new Date().getTime()
      }
      else {
        logger.log('\n-------------------')
        logger.log('🚀 项目开始启动...')
        logger.log('-------------------\n')
      }
    },
    // https://rollupjs.org/plugin-development/#closebundle
    closeBundle() {
      if (mode === 'build') {
        end = new Date().getTime()
        // 计算打包大小（压缩前）
        // 此后所有存储单位全部以 `字节` 为基准来计算（此字节非彼 ByteDance）
        const size = getDirSize(dist, /\.(map|gz|br)$/)
        logger.log('\n-----------------------------------')
        logger.log(`🎈 项目打包完成，总耗时：${dayjs(end - start).format('mm:ss.SSS')}`)
        logger.log(`📦 打包大小：${formatSize(size)}, ${getSizeInfo(size)}`)
        logger.log('-----------------------------------\n')
      }
    },
  }
}

/**
 * 打包评价
 *
 * - 该标准结合自身多个项目、以及多个开源 admin 项目总结，**不可作为业内通用标准**
 * - 考虑到项目中存在 `图表`、`WebGL` 等比较重的依赖
 */
function getSizeInfo(size: number): string {
  // 该函数仅用于 info plugin
  // formatSize、getDirSize 这两个函数可能会被其他·构·建·模·块·用到，故放 utils
  if (size < 1024) {
    // < 1KB
    return 'Are you serious? 你打包了甚么！😳'
  }

  if (size < 1024 * 800) {
    // < 800KB
    return '极致的优化，完美的代码！🚀'
  }

  if (size < 1024 * 1024 * 1.5) {
    // < 1.5MB
    return '哎哟~不错哦！👍'
  }

  if (size < 1024 * 1024 * 2.5) {
    // < 2.5MB
    return '平平无奇，试试看还能不能再优化？🤔'
  }

  if (size < 1024 * 1024 * 4) {
    // < 4MB
    return '有点大了哦，考虑优化下吧~ ⚠️'
  }

  if (size >= 1024 * 1024 * 4) {
    // >= 4MB
    return '太大啦！赶快优化你的代码吧！💥'
  }
}

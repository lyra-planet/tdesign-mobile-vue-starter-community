import type { PluginOption } from 'vite'

import process from 'node:process'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import Tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
// https://tdesign.tencent.com/mobile-vue/getting-started#vite
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { compression, defineAlgorithm } from 'vite-plugin-compression2'
import vsharp from 'vite-plugin-vsharp'
import svgLoader from 'vite-svg-loader'

import { buildInfo } from './info'
import { processPath } from './utils'

/**
 * 统一化处理 plugin
 */
export function usePlugins(): PluginOption[] {
  const lifecycle = process.env.npm_lifecycle_event

  return [
    AutoImport({
      imports: ['vue', VueRouterAutoImports],
      resolvers: [TDesignResolver({
        library: 'mobile-vue',
      })],
      dts: './types/auto-imports.d.ts',
    }),
    Components({
      resolvers: [TDesignResolver({
        library: 'mobile-vue',
      })],
      dts: './types/components.d.ts',
    }),
    VueRouter({
      dts: './types/vue-router.d.ts',
      routesFolder: ['src/views'],
      exclude: [
        '**/components/**/*',
        '**/composables/**/*',
        '**/hooks/**/*',
        '**/shared/**/*',
      ],
    }),
    // i18n 支持
    VueI18nPlugin({
      include: [processPath('../locales/**')],
      compositionOnly: true,
    }),
    vue(),
    // 支持 JSX 语法
    vueJsx(),
    // 处理 SVG 图标
    svgLoader({
      defaultImport: 'url',
      svgo: true,
      svgoConfig: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeDimensions', active: true },
        ],
      },
      include: [/\.svg\?component$/],
      exclude: [/\/public\//],
    } as any),
    // 图片压缩（JPG/PNG/WebP/GIF）
    vsharp(),
    // TailwindCSS 4 新增
    Tailwindcss(),
    // 代码定位工具（仅开发启用，生产禁用）
    process.env.NODE_ENV !== 'production'
      ? codeInspectorPlugin({
          bundler: 'vite',
          hideConsole: true,
        })
      : null,
    // 手搓 vite 构建信息 plugin 😎
    buildInfo(),
    // 预压缩静态资源（仅生产环境）
    process.env.NODE_ENV === 'production'
      ? compression({
          algorithms: [
            defineAlgorithm('brotliCompress'), // 优先使用brotli算法
            defineAlgorithm('gzip'), // gzip兜底
          ],
          include: /\.(js|mjs|css|html|svg|json|txt|xml|wasm)$/i,
          threshold: 1024,
          skipIfLargerOrEqual: true,
        })
      : null,
    // 打包分析，看看哪个老六最占打包体积 😠
    lifecycle === 'report'
      ? visualizer({ brotliSize: true, open: true, filename: 'report.html' })
      : null,
  ]
}

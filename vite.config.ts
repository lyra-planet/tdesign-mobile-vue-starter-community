import type { ConfigEnv, UserConfigExport } from 'vite'

import process from 'node:process'
import { loadEnv } from 'vite'

import { usePlugins } from './build/plugins'
import { alias, processEnv, root } from './build/utils'

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { VITE_PORT, VITE_BASE_PATH } = processEnv(loadEnv(mode, root))

  return {
    base: VITE_BASE_PATH,
    root,
    resolve: {
      alias,
    },
    server: {
      port: VITE_PORT,
      host: '0.0.0.0',
      proxy: {},
    },
    plugins: usePlugins(),
    // 通过 esbuild 丢弃 console/debugger（仅生产）
    esbuild: process.env.NODE_ENV === 'production'
      ? {
          drop: ['console', 'debugger'],
          pure: ['console.log'],
        }
      : undefined,
    build: {
      // 最大兼容，👀 参考 https://vite.dev/guide/build.html#browser-compatibility
      target: 'es2015',
      sourcemap: true,
      // 去除打包过大警告
      chunkSizeWarningLimit: 4000,
      // 打包分类 😎
      minify: 'esbuild',
      terserOptions: undefined,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  }
}

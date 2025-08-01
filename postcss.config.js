// @ts-check

import process from 'node:process'

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    // 打包环境压缩 css
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}

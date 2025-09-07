---
title: Performance
---

# Performance

## What’s already optimized in this project

- Code-splitting with vendor grouping: `manualChunks` splits `vue-vendor/tdesign/i18n/dayjs/vueuse/vendor` to improve browser cache hits.

```48:61:tdesign-mobile-vue-starter-community/vite.config.ts
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('/vue') || id.includes('vue-router') || id.includes('pinia'))
                return 'vue-vendor'
              if (id.includes('tdesign-mobile-vue') || id.includes('tdesign-icons-vue-next'))
                return 'tdesign'
              if (id.includes('vue-i18n'))
                return 'i18n'
              if (id.includes('dayjs'))
                return 'dayjs'
              if (id.includes('@vueuse'))
                return 'vueuse'
              return 'vendor'
            }
          },
```

- Leaner production output: drop `console/debugger` with esbuild, disable sourcemaps by default.

```24:36:tdesign-mobile-vue-starter-community/vite.config.ts
// Drop console/debugger in production
esbuild: process.env.NODE_ENV === 'production'
  ? {
      drop: ['console', 'debugger'],
      pure: ['console.log'],
    }
  : undefined,
// Enable sourcemap only in `report` mode (disabled by default in prod)
sourcemap: mode === 'report',
```

- i18n lazy loading + cache: only load the default locale on first screen; other locales are loaded on demand and cached.

```7:20:tdesign-mobile-vue-starter-community/src/plugins/i18n.ts
// Lazy-load locale files
const localeFiles = import.meta.glob('../../locales/*.y(a)?ml', { eager: false })
...
// Only load Chinese by default
const defaultLocale = 'zh-cn'
```

- Request cancelation + debounce: search input debounced and the previous request aborted to avoid race and waste.

```31:51:tdesign-mobile-vue-starter-community/src/views/search/index.vue
// Debounce + abort previous request to avoid race
searchTimer = window.setTimeout(async () => {
  if (currentSearchController)
    currentSearchController.abort()
  const controller = new AbortController()
  currentSearchController = controller
  await searchApi(text, controller.signal)
}, 300)
```

- Image lazy loading: use `<t-image :lazy="true">` in several components.

```13:13:tdesign-mobile-vue-starter-community/src/views/home/components/HomeSwiper.vue
<t-image :src="item" :lazy="index !== 0" fit="cover" class="w-[170px] h-[244px]" />
```

- State persistence: Pinia integrates `pinia-plugin-persistedstate` with unified persist config.

```1:11:tdesign-mobile-vue-starter-community/src/store/index.ts
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
...
store.use(piniaPluginPersistedstate)
```

- Large-list virtualization: `Talklist` uses a reusable `VirtualList` component for virtual scrolling.

```90:116:tdesign-mobile-vue-starter-community/src/views/talklist/index.vue
<VirtualList
  :items="items"
  :item-size="72"
  :overscan="6"
>
  <!-- item slot -->
</VirtualList>
```

## High-priority checklist (do these first)

1. Ensure all views are dynamically imported (route/page lazy-load everywhere).
2. Enable cancelation and retries in the network layer to avoid piling requests on rapid input or route changes.
3. Load only the default locale package on first screen; lazy-load others.
4. Use `image-set(1x/2x)` + compression + lazy-loading for images.
5. Configure `manualChunks` for heavy deps to improve caching.
6. Use virtualization or pagination for long lists; debounce or throttle scroll/input handlers.
7. Strip `console/debugger` in production; disable `sourcemap` by default.
8. Set LCP/TTI/CLS goals and run Lighthouse regularly in preview/prod.
9. Add browser/CDN caching for stable APIs; dedupe repeated requests.
10. Keep bundle reports up-to-date and trim unused/heavy deps.

## First screen

- i18n lazy loading: only load the default locale
- Lazy load Layout/pages
- Use 1x/2x images with `image-set` to avoid waste
- Skeleton and placeholders (see `/docs/public/placeholder-*.svg`)

## Measurement and baseline

- Use Lighthouse thresholds: LCP < 2.5s, CLS < 0.1, TTI < 3.5s
- Measure in preview/prod with network and CPU throttling
- Set performance budgets for key pages: bundle size, API latency, image size

## Requests

- Cancel in-flight requests on component unmount/route change
- Pagination + throttle/debounce for lists and search inputs
- Encapsulate cancelation logic for search/scroll-loading interactions

Example (interrupt previous search):

```ts
let controller: AbortController | null = null

async function runSearch(q: string) {
  controller?.abort()
  controller = new AbortController()
  const res = await search(q, controller.signal)
  if (res.success) {
    // render
  }
}
```

## Rendering

- Use `VirtualList` for large lists (virtual scrolling)
- Push computations into `computed`/memoization; use `watchEffect` when suitable
- Use `v-once` for static content; `v-memo([key])` for repeated static blocks (Vue 3.5+)
- For frequently changing large objects use `shallowRef`/`markRaw`

## Assets and build

- On-demand/dynamic imports for third-party libraries
- Put Tailwind into a separate file to improve HMR (see `main.ts`)
- Use `manualChunks` to split by dependency families to improve cache hits
- `pnpm report` outputs `report.html` for bundle analysis

## Code splitting and lazy loading

- Lazy-load pages (via route config with dynamic `import()`)
- Lazy-load heavy components/charts on entrance

Example:

```ts
const HeavyChart = defineAsyncComponent(() => import('@/components/HeavyChart.vue'))
```

Idle-time prefetch for the next route:

```ts
// preload-next.ts
const pages = import.meta.glob('@/views/**/index.vue')

export function preload(path: string) {
  const match = Object.keys(pages).find((p) => p.endsWith(path))
  if (match) {
    // @ts-ignore
    pages[match]()
  }
}

router.afterEach((to) => {
  requestIdleCallback?.(() => {
    if (to.path === '/pages/search') preload('pages/talklist/index.vue')
  })
})
```

## Images and media

- Use `image-set` for 1x/2x; restrict background area to avoid oversize waste
- Prefer WebP/AVIF; keep PNG/JPEG fallback when necessary
- Lazy-load images via `loading="lazy"` or render on intersection

## Caching (browser/CDN)

- Output filenames include hashes (configured); set strong cache on CDN
- API caching: short-term cache at the gateway for stable data

## Vite/build optimization

- Drop `console`/`debugger` in prod (configured)
- Disable prod `sourcemap` by default; enable only in `report` mode
- Mind large modules, and increase `chunkSizeWarningLimit` only when reasonable

## Component usage tips (TDesign)

- Split pages reasonably; avoid too many complex components on a single route
- Use virtualization or pagination for list components; mount overlays on demand

## Runtime memory and leak prevention

- Remove listeners and timers before unmount; use `onUnmounted`
- Stop long connections/polling on route changes

## Monitoring and improvement (suggested)

- Introduce a frontend APM (e.g., Sentry/ARMS) for error and performance telemetry
- Record LCP/TTI/API latency for continuous optimization and regression comparison

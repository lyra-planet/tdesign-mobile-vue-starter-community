---
title: App Config
---

# App Config

The project manages configuration with “built-in defaults + external overrides”: on startup it reads `public/config.json`, merges it into the built-in config, then injects it globally.

## Environment variables

- `VITE_ROUTER_MODE`: `history | hash`
- `VITE_MSW`: `true | false`
- `VITE_BASE_PATH`: site base path (affects routes and static assets)
- `VITE_PORT`: dev server port

## Sources and merging

Built-in configs:

- `src/config/app.config.ts`: app title, default `locale`, storage namespace `storageNS`
- `src/config/network.config.ts`: `baseURL`, `storage` (`localStorage | sessionStorage`)
- `src/config/theme.config.ts`: default theme `defaultTheme`

On startup, `initGlobalConfig(app)` fetches `public/config.json` and merges it. The final config is exposed globally as `$config`:

```ts
// src/config/index.ts (excerpt)
const config = { ...appConfig, ...networkConfig, ...themeConfig }
export async function initGlobalConfig(app: App) {
  const res = await fetch(`${VITE_BASE_PATH}config.json`)
  if (res.ok) Object.assign(config, await res.json())
  app.config.globalProperties.$config = config
}
```

## Personalized storage `$storage`

Depending on the `storage` option, choose `localStorage` or `sessionStorage`, and persist with namespace `${storageNS}config`. After injection, expose it as a reactive object:

```ts
// src/config/index.ts (excerpt)
;(app.config.globalProperties as any).$storage = toReactive({ locale: getGlobalConfig('locale') })
```

- Usage: save preferences like language; used with i18n/TDesign Provider
- Read: `const { $storage } = useGlobal()`
- Update: `$storage.locale = 'en-us'` and also `useStorage().setItem(`${storagePrefix()}config`, $storage)`

## Example `public/config.json`

```json
{
  "version": "0.0.1",
  "locale": "zh-cn",
  "storageNS": "tmv-"
}
```

## VitePress site config

See `docs/.vitepress/config.ts`: navigation, sidebar, social links, footer, outline, doc footer.

## Theme & styles

- Based on TDesign tokens, extend in `src/style/index.scss`
- Home and Profile backgrounds use 1x/2x assets for clarity

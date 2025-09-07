---
title: Architecture & Modules
---

# Architecture & Modules

The project adopts a layered design where pages are modules and components are building blocks:

- View layer (`views/*`): pages and business logic
- Layout layer (`layout/*`): unified shell (Header, Drawer, BottomNav)
- State layer (`store/*`): Pinia + persistence
- Data layer (`api/*`, `mocks/*`): HTTP client and MSW endpoints
- Utility layer (`utils/*`, `config/*`, `plugins/*`): utilities, runtime config, i18n, message

## Layer responsibilities and collaboration

- View layer: renders pages by routes, composes components and business logic
- Layout layer: unified navigation and global interaction container (Header/Drawer/BottomNav)
- State layer: cross-page shared state, provides side-effect entry (e.g. injecting token to httpClient)
- Data layer: standardized request, aligned response semantics, centralized endpoints
- Utility layer: inject runtime config (`$config`/`$storage`), i18n, global message

## Data flow

1. Components call APIs (`api/*`)
2. Requests go through `httpClient` for normalized result/error
3. Persisted state is written into `store/*` if needed
4. Pages drive UI via `useNavigation()` and `useLayoutState()`

## Key design points

- Routing: convention-based + hand-written enhancements for both flexibility and consistency
- i18n: lazy loading with caching to reduce first-screen pressure
- Mock: enabled on demand, isolated from real APIs
- Config: `initGlobalConfig()` allows injecting external `config.json`

## Bundle structure and code splitting

- Split core dependencies into multiple chunks at build time: `vue-vendor`, `tdesign`, `i18n`, `dayjs`, `vueuse`, `vendor`
- Improve browser cache hit rate and on-demand loading speed (see `vite.config.ts` `manualChunks`)

> Build plugins & engineering enhancements:
- Auto-import (APIs/components), auto route generation, i18n compiling, SVG component loading, Tailwind 4, production precompression and bundle analysis are configured centrally

## Typical interaction flows (example)

1. First launch: inject `$config/$storage` → install i18n/Router/Store → initialize i18n → start Mock (optional) → `mount`
2. Login: submit form → call `auth.ts` → on success `useUserStore.handleLoginSuccess()` writes token/user → Authorization header injected for requests
3. Search: input changes → fire request with `AbortSignal` → navigating away or next input aborts the previous request

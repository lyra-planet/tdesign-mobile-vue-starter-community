# Directory Structure

> Only the most development-relevant directories are listed. See the project for the complete structure.

```text
src/
  api/
    request.ts        # Unified HTTP client
    *.ts              # Business interface encapsulation
  layout/
    index.vue         # Root layout: Header + Content + BottomNav
    components/       # Header, bottom navigation, etc.
    composables/      # useLayoutState, useNavigation
  router/
    index.ts          # Route registration and Layout nested routes
    utils.ts          # Route mode switching (history/hash)
  store/
    index.ts          # Pinia instance, persistence and reset
    user.ts           # User info and login state
  plugins/
    i18n.ts           # i18n lazy loading and switching
    message.ts        # Unified message notification interface
  mocks/
    index.ts          # MSW startup entry, enabled by environment
    handlers.ts       # Mock route handlers (login/search/chat, etc.)
    data/             # Mock data sets
  views/
    home/ ...         # Home page
    publish/ ...      # Publish page
    search/ ...       # Search page
    talklist/ ...     # Message list page
    my/ ...           # Profile page
    login/ ...        # Login page
    datacenter/ ...   # Data chart page
  components/
    FormContainer.vue # Form container
    ServiceGrid.vue   # Service entry grid
    VirtualList.vue   # High-performance list
```

## Key Responsibilities

- `api/request.ts`: Standardize response structure, unified error prompts, request cancellation, etc.
- `layout/*`: Unified page containers and navigation interactions, pages only focus on content
- `plugins/i18n.ts`: Lazy load multilingual, caching and switching strategies
- `mocks/*`: Development-enabled Mock capabilities without interfering with real interfaces
- `store/*`: Pinia + persistence, providing reset and unified initialization entry

## Module Relationship Diagram

```
┌─────────────────┐
│   views/* Pages │ ──┐
└─────────────────┘   │
                     │
┌─────────────────┐   │    ┌─────────────────┐
│ components/*    │ ←─┼────│   api/* Interface│
│   Components    │   │    │   Encapsulation │
└─────────────────┘   │    └─────────────────┘
                     │              │
┌─────────────────┐   │              ▼
│ layout/* Layout │ ←─┤    ┌─────────────────┐
│ & Navigation    │   │    │  httpClient     │
└─────────────────┘   │    │  Request Layer  │
                     │    └─────────────────┘
┌─────────────────┐   │              │
│ store/* Global  │ ←─┤              │
│ State Management│   │              ▼
└─────────────────┘   │    ┌─────────────────┐
                     │    │  mocks/* Dev    │
┌─────────────────┐   │    │  Mock Simulation│
│ router/* Routes │ ←─┤    │    (Optional)   │
│ & Auth Control  │   │    └─────────────────┘
└─────────────────┘   │
                     │
┌─────────────────┐   │
│ plugins/*       │ ←─┘
│ i18n/Message    │
└─────────────────┘
       │
       ├── i18n lazy loading
       └── Message unified prompts
```

## Startup & Initialization Flow (Excerpt)

Startup sequence from `src/main.ts`:

1. `initGlobalConfig(app)`: Merge external `public/config.json` → Inject `$config`
2. `useStore(app)`: Install Pinia and persistence plugins
3. `injectStorageConfig(app)`: Inject `$storage` (like `locale`)
4. `useI18n(app)` + `initializeI18n()`: Only load preferred language pack
5. Install `MessagePlugin`, `router`
6. If `DEV` or `VITE_MSW=true` → `startMsw()`
7. `app.mount('#app')`

## Naming & Conventions

- Views: `src/views/<feature>/index.vue`
- Composables: `src/**/composables/useXxx.ts`
- Store: `useXxxStore` (modular + `persist`)
- Interfaces: `src/api/<domain>.ts`, return `ApiResponse<T>`
- Resources: Images in `src/assets/images`, SVGs in `src/assets/svgs`

## Typical Call Chain

Page `views/search/index.vue` → Trigger interface `api/search.ts` → `httpClient.get('/search', { signal })` →
Standardized response `{ code,message,data,success }` → Store/component consumes data → `plugins/message` unified error prompts.

## New Page Integration Guide

1. Implement page in `src/views/<feature>/index.vue`; create `components/` subdirectory if necessary
2. Page will be automatically collected by routing and placed under `Layout` child routes
3. To display in bottom Tab/sidebar directory, update `useNavigation()` `tabList/baseSidebar`
4. Write interfaces in `src/api/<feature>.ts`, prohibit direct URL concatenation in components
5. For state that needs persistence, use Pinia with `persist` configuration
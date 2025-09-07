---
title: Directory Structure
---

# Directory Structure

> Only the directories most relevant to development are listed. Refer to the project for the full structure.

```text
src/
  api/
    request.ts        # Unified HTTP client
    *.ts              # Business API wrappers
  layout/
    index.vue         # Root layout: Header + Content + BottomNav
    components/       # Header, bottom navigation, etc.
    composables/      # useLayoutState, useNavigation
  router/
    index.ts          # Router registration and nested routes under Layout
    utils.ts          # Switch router mode (history/hash)
  store/
    index.ts          # Pinia instance, persistence and reset
    user.ts           # User info and login state
  plugins/
    i18n.ts           # i18n lazy loading and switching
    message.ts        # Unified message interface
  mocks/
    index.ts          # MSW entry, enabled by environment
    handlers.ts       # Mock handlers (login/search/chat, etc.)
    data/             # Mock datasets
  views/
    home/ ...         # Home
    publish/ ...      # Publish
    search/ ...       # Search
    talklist/ ...     # Talklist
    my/ ...           # My & profile editing
    login/ ...        # Login flow
    datacenter/ ...   # DataCenter
  components/
    FormContainer.vue # Form container
    ServiceGrid.vue   # Service entry grid
    VirtualList.vue   # High-performance list
```

## Key responsibilities

- `api/request.ts`: standardized response shape, unified error hints, request cancelation
- `layout/*`: unified page container and navigation interactions; pages focus on content only
- `plugins/i18n.ts`: lazy-loaded i18n, caching and switching strategy
- `mocks/*`: Mock capability enabled in dev without interfering with real APIs
- `store/*`: Pinia + persistence, with reset and unified initialization entry

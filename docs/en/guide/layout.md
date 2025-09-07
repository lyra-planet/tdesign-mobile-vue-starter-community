---
title: Layout
---

# Layout

The layout hosts the core interactions of a mobile app: top bar, side menu, bottom navigation and the content container. All business routes are rendered as children of `Layout`.

## Structure

- `src/layout/index.vue`: page shell (Header + Content + BottomNav + Drawer)
- `src/layout/components/PageHeader.vue`: page header (back, title, search entry)
- `src/layout/components/BottomNavigation.vue`: bottom tabs
- `src/layout/composables/useLayoutState.ts`: compute display state based on the current route
- `src/layout/composables/useNavigation.ts`: side menu items, bottom tabs, page title logic

## Key points

- Header visibility logic: decide back button, title, and bottom nav by route
- Side menu: generated dynamically to guide core page entries
- Bottom navigation: three tabs Home/Message/My, supports unread badge

## Behaviors and strategies

- Search entry: only visible on `/home` top; clicking triggers `changeToSearch()` to navigate to `/search`
- Title strategy: `useNavigation().getPageTitle()` parses titles from path (including dynamic `'/notice/:id'`)
- Login state demo: the side menu provides “logged-in / logged-out” preview using `simulateLogin/Logout`

## Example: control visibility by route (excerpt)

```ts
// src/layout/composables/useLayoutState.ts
const showBackButton = computed(() => {
  const path = route.path
  return path === '/publish'
    || path.includes('/login')
    || path.startsWith('/notice')
    || path.includes('/my')
    || path.includes('search')
    || path.includes('datacenter')
})
```

## Suggestions

- Title strategy: manage centrally in `PAGE_TITLES` within `useNavigation()`
- Animations: add transitions for Drawer and tab switching to keep immersive UX
- Skeleton: provide skeleton for the main content area to avoid first-screen jank

> Placeholder image suggestion: `/public/placeholder-layout.png` to illustrate the overall layout.

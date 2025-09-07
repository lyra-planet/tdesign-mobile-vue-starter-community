---
title: Home
---

# Home

- Components: `HomeSwiper`, `HomeTabs`/card list, `HomeFab`
- Behaviors: carousel switching, card navigation, pull-to-refresh; top search linkage

## APIs (Mock)

- `GET /api/home/content?page&limit`: paginated list, returns `items` and `pagination`
- `GET /api/home/content/:id`: content details
- `POST /api/home/refresh`: refresh recommended content

## Interactions

- Pull-to-refresh triggers `refreshHomeContent()`, which replaces the first few items
- Clicking the search input calls `changeToSearch()` to navigate to `/search`

## Implementation Highlights

- HomeSwiper: virtualization and lazy loading for instant first-screen and reduced memory usage
- Card list: chunked rendering + skeleton placeholders to improve scroll and load smoothness
- Search linkage: input decoupled from list state, supports cross-component event bus
- FAB: sticky threshold and mis-tap protection to ensure gesture accuracy

## UI Preview

<div style="display: flex; gap: 12px; align-items: flex-start;">
  <img src="../../images/home.png" alt="Home Preview" style="flex: 1 1 0; max-width: 30%; height: auto;" />
</div>

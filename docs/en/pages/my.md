---
title: My
---

# My

- Composition: user card, service grid, settings/profile edit

## APIs (Mock)

- `GET /api/profile/services`: service grid and menu items
- `GET /api/profile/stats`: counters (All/Reviewing/Published/Drafts)
- `POST /api/profile/stats`: update a specific counter
- `POST /api/profile/service-click`: record service click

## Auth State Demo

- The sidebar provides a quick toggle for "Logged-in / Logged-out" (UI preview only). It simulates `token` and `userInfo` via internal methods in `useNavigation()`

## Implementation Highlights

- User state switching: login state simulated via store; components react automatically on toggle
- Service grid: responsive grid and accessibility optimizations (touch target and readability)
- Settings entry: async route lazy-loading and route-splitting to reduce unrelated overhead

## UI Preview

<div style="display: flex; gap: 12px; align-items: flex-start;">
  <img src="../../images/user1.png" alt="My Preview 1" style="flex: 1 1 0; max-width: 30%; height: auto;" />
  <img src="../../images/user2.png" alt="My Preview 2" style="flex: 1 1 0; max-width: 30%; height: auto;" />
  <img src="../../images/edit.png" alt="My Edit Preview" style="flex: 1 1 0; max-width: 30%; height: auto;" />
</div>

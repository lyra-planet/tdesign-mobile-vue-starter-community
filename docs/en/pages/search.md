---
title: Search
---

# Search

- Data: history tags, discoveries, `q` query suggestions/results
- Behaviors: input throttle/debounce; click history/suggestion to fill and trigger search

## APIs (Mock)

- `GET /api/search/history-tags`
- `GET /api/search/discoveries`
- `GET /api/search?q=keyword` (supports `AbortSignal` cancel)

## Interactions

- Input change triggers search; cancel the previous request on unmount or before the next input to avoid race conditions

## Implementation Highlights

- Debounce + request cancellation: throttle input with `AbortController` to reduce service pressure
- Smart suggestions: merge and sort by weights of history/discoveries, prioritizing highly relevant items
- Empty and error states: unified placeholders and retry button for consistent experience

## UI Preview

<div style="display: flex; gap: 12px; align-items: flex-start;">
  <img src="../../images/search.png" alt="Search Preview" style="flex: 1 1 0; max-width: 30%; height: auto;" />
</div>

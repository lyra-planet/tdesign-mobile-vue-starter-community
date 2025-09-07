---
title: Pages Overview
---

# Pages Overview

- Home (`/home`): content distribution and service entry; carousel, cards, quick entries
- Publish (`/publish`): title/body/tags/upload; draft/publish
- Search (`/search`): history/discovery/suggestions; input suggestions and navigation
- Talklist (`/talklist`): conversation list and unread badge aggregation
- DataCenter (`/datacenter`): overview, interaction, completion, region
- My (`/my`): user card, service grid, settings entry
- Login (`/login/*`): phone, verification code, password login

## General Highlights

- Component decoupling: each page is composed of a "container + business components" pattern for reuse and substitution
- Data-driven: unified request wrapper and state management keep page state and side effects under control
- UX optimizations: skeleton/placeholder, progressive loading, friendly error and empty states
- Maintainability: strong typing and single-responsibility hooks/composables for easier testing and extension

## UI Preview

<div style="display: flex; gap: 12px; align-items: flex-start;">
  <img src="../../images/index.png" alt="Pages Overview Preview" style="flex: 1 1 0; max-width: 30%; height: auto;" />
</div>

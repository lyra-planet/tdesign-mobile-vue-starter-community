---
title: Theme & Styles
---

# Theme & Styles

## Tailwind CSS

This project integrates Tailwind CSS to improve the efficiency and consistency of atomic CSS development.

### Usage

- Entry file: `src/style/tailwind.css`, already imported globally in `src/main.ts`
- Use atomic classes directly in the component `class` attribute

Example:

```vue
<template>
  <div class="p-4 bg-white rounded shadow">
    <span class="text-lg font-bold text-gray-800">Ciallo~</span>
  </div>
  
  <!-- Reusable example: define custom utilities via @utility -->
  <div class="flex-c">
    <span class="mx-2 bg-gray-400">Ciallo~</span>
    <span class="mx-2 bg-gray-400">Ciallo~</span>
    <span class="mx-2 bg-gray-400">Ciallo~</span>
  </div>
</template>
```

Define reusable utilities in `src/style/tailwind.css`:

```css
@utility flex-c {
  @apply flex items-center justify-between;
}
```

### Tips

- Install VS Code extension `bradlc.vscode-tailwindcss` for completion and class highlighting
- Tailwind v4 uses CSS Layers by default, which may change some global styles' priority
  - Consider splitting custom styles into `reset.scss`, `index.scss`, and adjust import order accordingly

## Dark mode

- The layout differentiates between light and dark on the login page for consistency
- Restore original background color when using `theme-mode='dark'` on the root

```scss
// Scoped style excerpt from src/layout/index.vue
:root[theme-mode='dark'] .layout-container.login-layout {
  background-color: var(--td-bg-color-page);
}
```

## Images and 2x assets

```scss
.show-background {
  background: image-set(url('@/assets/images/bg.png') 1x, url('@/assets/images/bg@2x.png') 2x) no-repeat;
  background-size: contain;
}
```

## Token suggestions

- Prefer overriding TDesign tokens instead of hardcoding colors
- Unify font sizes / spacing / border radius to keep consistent visuals

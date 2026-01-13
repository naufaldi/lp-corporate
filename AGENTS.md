# AGENTS.md

This document provides guidelines for AI agents working on this Nuxt 3 corporate landing page project.

## Project Overview

Nusantara Palm Industries corporate website - a single-page Nuxt 3 application with Vue 3, TypeScript, Tailwind CSS v4, and GSAP animations. The site displays multiple sections (Hero, Stats, Sustainability, Mission, Geographic, Product, Contact) in a single-page scroll layout.

## Build Commands

```bash
# Development server with hot reload
bun run dev

# Production build
bun run build

# Generate static site
bun run generate

# Preview production build locally
bun run preview

# Run type checking
bun run typecheck

# Run linting
bun run lint
```

## Project Structure

```
├── app.vue              # Root app component
├── pages/
│   └── index.vue        # Main landing page
├── components/
│   ├── sections/        # Page sections (Hero, Stats, etc.)
│   ├── ui/              # UI components (Logo, etc.)
│   └── AppNavigation.vue
├── layouts/
│   └── default.vue      # Default layout
├── plugins/
│   └── gsap.client.ts   # GSAP plugin
├── assets/
│   ├── css/main.css     # Tailwind + global styles
│   └── images/          # Image assets
├── public/images/       # Static images
├── nuxt.config.ts       # Nuxt configuration
└── package.json
```

## Code Style Guidelines

### Vue Components

- Use `<script setup lang="ts">` for all components
- Prefer Composition API with `script setup` syntax
- Define TypeScript interfaces for complex props and data structures
- Use meaningful component names (PascalCase)
- Use BEM-style class naming for scoped CSS (e.g., `.app-nav__item`, `.hero-section`)

```vue
<script setup lang="ts">
interface Props {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'light',
  size: 'md'
})
</script>
```

### TypeScript

- Enable strict type checking
- Use interfaces for object shapes, types for unions/primitives
- Avoid `any` - use `unknown` with proper type guards when needed
- Use proper event typing for DOM events

```ts
const onImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
}
```

### Imports

- Use Nuxt auto-imports for Vue APIs (`ref`, `onMounted`, `computed`, etc.)
- Use `~/` alias for project root imports
- Group imports: Vue/auto-imports first, then third-party, then local components

```ts
import { onMounted } from 'vue'
import { useNuxtApp } from '#app'
import HeroSection from '~/components/sections/HeroSection.vue'
```

### CSS & Styling

- Use Tailwind CSS v4 utility classes for layout and styling
- Define custom theme colors in `assets/css/main.css` using CSS variables
- Use `scoped` styles for component-specific overrides
- Follow design system colors: `--color-primary`, `--color-secondary`, `--color-accent`, `--color-background`, `--color-dark`
- Use `clamp()` for responsive font sizes
- Use `rem` for spacing and sizing

```css
.hero-headline {
  font-size: clamp(2rem, 6vw, 4rem);
  color: #ffffff;
}
```

### Component Organization

- Page sections in `components/sections/`
- Reusable UI components in `components/ui/`
- Use consistent section structure: `<section id="section-name" class="section-name">`
- Add anchor links for navigation (`#stats`, `#sustainability`, etc.)

### Animations

- GSAP is available via Nuxt plugin as `$gsap`
- Use `onMounted` for animation initialization
- Clean up animations in `onUnmounted` if needed
- Use GSAP timelines for complex sequences

```ts
const { $gsap } = useNuxtApp()

onMounted(() => {
  $gsap.from('.hero-content', {
    y: 60,
    opacity: 0,
    duration: 1
  })
})
```

### Accessibility

- Add `aria-label` to buttons and interactive elements
- Include descriptive `alt` text for images
- Use semantic HTML elements (`<nav>`, `<section>`, `<main>`, etc.)
- Ensure keyboard navigation works

### Error Handling

- Handle image load errors gracefully with `@error` handlers
- Use proper TypeScript types for event handlers
- Log errors appropriately in development

### Responsive Design

- Mobile-first approach
- Use Tailwind responsive prefixes (`md:`, `lg:`)
- Test at breakpoints: mobile (< 768px), tablet (768px+), desktop (1024px+)
- Hide non-essential elements on mobile (e.g., scroll indicator)

## Tailwind CSS v4

This project uses Tailwind CSS v4 with the Vite plugin. Theme configuration is done in CSS:

```css
@theme {
  --color-primary: #c45b28;
  --color-secondary: #2a5c55;
  --color-accent: #d4a24c;
  --color-background: #f5f0e8;
  --color-dark: #2c2416;
  --font-sans: 'Jakarta Sans', sans-serif;
}
```

## Nuxt 3 Conventions

- Use `defineNuxtConfig` for configuration
- Pages auto-routed from `pages/` directory
- Components auto-imported from `components/` directory
- Plugins run on client/server as specified (`.client.ts` suffix)
- Use `compatibilityDate` for version compatibility

## Best Practices

1. Keep components focused and single-responsibility
2. Use proper TypeScript types for all props and data
3. Follow existing naming conventions and patterns
4. Test responsive behavior at multiple breakpoints
5. Use semantic HTML for accessibility
6. Keep animations performant (use `will-change` sparingly)
7. Handle loading and error states gracefully
8. Use CSS variables for consistent theming

## General Rules

1. Always use `bun` as the package manager (bun install, bun run, bunx)
2. After completing any task, run `bun run lint` and `bun run build` to verify no errors
3. When generating or obtaining images, use the MiniMax MCP tool

# Nusantara Palm Industries Landing Page — RFC

**Request for Comments**
**Document Version:** 1.0
**Last Updated:** January 2026
**Status:** Draft — Open for Review

---

## Overview

Single-page corporate landing page for Nusantara Palm Industries (NPI), Indonesia's leading sustainable palm oil exporter. Designed for portfolio demonstration with modern industrial aesthetic, full-viewport sections, and asymmetric split layouts.

---

## Project Goals

1. Showcase company profile, sustainability credentials, and geographic presence
2. Demonstrate modern web development skills (Nuxt.js, Tailwind CSS, animations)
3. Create portfolio-worthy piece with clean code and smooth interactions
4. Apply UX laws for optimal user experience

---

## Tech Stack Plan

### Core Framework: Nuxt 3

**Version:** v3.17.7 (latest stable as of January 2026)
**Source:** /websites/nuxt_3_x
**Benchmark Score:** 88.6 (High Source Reputation)

**Why Nuxt 3:**
- Type-safe, performant full-stack framework
- Server-side rendering (SSR) for SEO and performance
- Auto-imports reduce boilerplate
- File-based routing (though single page, useful for organization)
- Excellent TypeScript support
- Large ecosystem and active community

**Installation:**
```bash
npx nuxi@latest init npi-landing-page
cd npi-landing-page
```

**Nuxt Configuration:**
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Nusantara Palm Industries — Sustainable Palm Oil for a meta: [
        Growing Asia',
      { name: 'description', content: 'Indonesia leading sustainable palm oil exporter delivering quality CPO to Asian markets' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ]
})
```

---

### Styling: Tailwind CSS v4

**Version:** v4.0.x (latest stable)
**Source:** /websites/tailwindcss
**Benchmark Score:** 59.3 (High Source Reputation)

**Why Tailwind CSS v4:**
- CSS-first configuration (no tailwind.config.js required)
- Native Vite plugin support for better DX
- Uses modern CSS features (@property, color-mix())
- Automatic content detection (no content array needed)
- Better performance and smaller bundle size
- Portfolio-worthy: demonstrates latest Tailwind knowledge

**Browser Requirements:** Safari 16.4+, Chrome 111+, Firefox 128+

**Installation with Nuxt (Vite-based):**
```bash
npm install -D @tailwindcss/vite
```

**Vite Configuration:**
```typescript
// nuxt.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  app: {
    head: {
      title: 'Nusantara Palm Industries — Sustainable Palm Oil for a Growing Asia',
      meta: [
        { name: 'description', content: 'Indonesia leading sustainable palm oil exporter delivering quality CPO to Asian markets' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  }
})
```

**Global CSS (CSS-first theme configuration):**
```css
/* assets/css/main.css */
@import "tailwindcss";

@theme {
  /* Nusantara Earth Color Palette */
  --color-primary: #c45b28;      /* Burnt Sienna */
  --color-secondary: #2a5c55;    /* Deep Teal */
  --color-accent: #d4a24c;       /* Harvest Gold */
  --color-background: #f5f0e8;   /* Warm Cream */
  --color-dark: #2c2416;         /* Dark Coffee */

  /* Typography */
  --font-sans: 'Inter', sans-serif;

  /* Custom Heights */
  --height-screen-80: 80vh;
  --height-screen-100: 100vh;
}

/* Global Styles */
@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    background-color: var(--color-background);
    color: var(--color-dark);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
```

**Note:** Tailwind v4 uses `@import "tailwindcss"` instead of `@tailwind` directives, and theme configuration is done via `@theme` CSS block, making the configuration more intuitive and maintainable.

---

### Animations: GSAP (GreenSock Animation Platform)

**Version:** v3.13.0 (latest stable)
**Source:** /greensock/gsap
**Benchmark Score:** 90.6 (High Source Reputation)
**Code Snippets:** 1888

**Why GSAP:**
- Industry-standard animation library (used by Apple, Nike, Microsoft)
- Framework-agnostic (works with any framework including Vue/Nuxt)
- ScrollTrigger plugin for powerful scroll-linked animations
- Smooth performance (GPU-accelerated)
- Portfolio-worthy: demonstrates professional animation skills
- Well-documented with extensive examples

**Installation:**
```bash
npm install gsap
```

**Nuxt Plugin Setup:**
```typescript
// plugins/gsap.client.ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger)

  return {
    provide: {
      gsap,
      ScrollTrigger
    }
  }
})
```

**Usage in Components:**
```vue
<script setup lang="ts">
const { $gsap, $ScrollTrigger } = useNuxtApp()

onMounted(() => {
  // Animate stat numbers on scroll
  $gsap.from('.stat-number', {
    $ScrollTrigger: {
      trigger: '.stats-section',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    textContent: 0,
    duration: 2,
    snap: { textContent: 1 },
    ease: 'power2.out'
  })

  // Section reveal animation
  $gsap.from('.section-content', {
    scrollTrigger: {
      trigger: '.section-container',
      start: 'top 75%',
      toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.1
  })
})
</script>
```

**ScrollTrigger Features for This Project:**
1. **Section Reveals** — Fade/slide in as sections enter viewport
2. **Stat Counter Animation** — Numbers count up when visible
3. **Progress Indicator** — Sticky dots showing scroll progress via scroll position
4. **Parallax Effects** — Subtle image movement on scroll
5. **Value Icons** — Staggered animation of 5 core values
6. **Diagonal Clip Animations** — Animate asymmetric section transitions

**Example: Stat Counter with ScrollTrigger:**
```javascript
const stats = [
  { element: '.stat-exports', target: 380000, suffix: '+' },
  { element: '.stat-hectares', target: 85000, suffix: '' },
  { element: '.stat-employees', target: 2800, suffix: '+' },
  { element: '.stat-revenue', target: 280, suffix: 'M+' }
]

stats.forEach(stat => {
  gsap.to(stat.element, {
    scrollTrigger: {
      trigger: stat.element,
      start: 'top 80%'
    },
    textContent: stat.target,
    duration: 2,
    snap: { textContent: 1 },
    ease: 'power2.out',
    onUpdate: function() {
      this.targets()[0].textContent = Math.ceil(this.targets()[0].textContent) + stat.suffix
    }
  })
})
```

---

### Additional Dependencies

**@vueuse/nuxt** — Vue composables (useScroll, useWindowSize, etc.)
```bash
npm install @vueuse/nuxt @vueuse/core
```

**@nuxtjs/google-fonts** — Optimized font loading
```bash
npm install @nuxtjs/google-fonts
```

**Configuration:**
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt'
  ],
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700]
    }
  }
})
```

---

## Project Structure

```
npi-landing-page/
├── app.vue                 # Root component
├── assets/
│   ├── css/
│   │   └── main.css       # Tailwind imports + custom styles
│   └── images/            # Optimized images (webp)
├── components/
│   ├── sections/
│   │   ├── HeroSection.vue
│   │   ├── StatsSection.vue
│   │   ├── SustainabilitySection.vue
│   │   ├── MissionSection.vue
│   │   ├── GeographicSection.vue
│   │   ├── ProductSection.vue
│   │   └── ContactSection.vue
│   ├── ui/
│   │   ├── ProgressIndicator.vue
│   │   ├── SectionTitle.vue
│   │   └── StatCard.vue
│   └── AppNavigation.vue
├── layouts/
│   └── default.vue
├── pages/
│   └── index.vue
├── composables/
│   ├── useScrollProgress.ts
│   └── useSectionObserver.ts
├── public/
│   └── favicon.ico
├── nuxt.config.ts
├── tailwind.config.js
└── package.json
```

---

## Animation Strategy

### Scroll-Linked Animations

Use GSAP ScrollTrigger or @vueuse/motion for:

1. **Section Reveals** — Fade/slide in as sections enter viewport
2. **Stat Counter Animation** — Numbers count up when visible
3. **Progress Indicator** — Sticky dots showing scroll progress
4. **Parallax Effects** — Subtle image movement on scroll
5. **Value Icons** — Staggered animation of 5 core values

### Transition System

**Page Transition:**
```css
/* assets/css/main.css */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
```

**Section Hover Effects:**
- CTA buttons: Scale 1.02, shadow increase
- Stat cards: Border color change
- Navigation dots: Size and opacity change on active

### Performance Optimization

- CSS transforms for animations (GPU-accelerated)
- will-change property for complex animations
- Lazy-load images with placeholder
- Minimal JavaScript on initial load
- Sub-400ms interactions (Doherty Threshold)

---

## Responsive Design

**Breakpoints:**
- Mobile: < 768px (1 column)
- Tablet: 768-1023px (2 columns)
- Desktop: ≥ 1024px (asymmetric splits)

**Mobile Considerations:**
- All split sections stack vertically
- CTA buttons remain large (48px minimum)
- Hamburger menu for navigation
- Touch-friendly scroll indicators
- Font sizes adjust (H1: 32px, Body: 16px)

---

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Arrow keys)
- Focus indicators on all buttons/links
- Color contrast WCAG AA compliant
- Reduced motion preference support
- Semantic HTML structure

---

## Development Workflow

**Scripts:**
```json
{
  "dev": "nuxt dev",
  "build": "nuxt build",
  "preview": "nuxt preview",
  "generate": "nuxt generate",
  "lint": "eslint .",
  "typecheck": "nuxt typecheck"
}
```

**Development:**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
npm run preview
```

---

## Version Compatibility Matrix

| Package | Version | Source |
|---------|---------|--------|
| Nuxt | v3.17.7 | /websites/nuxt_3_x |
| Tailwind CSS | v4.0.x | /websites/tailwindcss |
| GSAP | v3.13.0 | /greensock/gsap |
| TypeScript | v5.x | Nuxt built-in |

---

## Image Assets Strategy

### Unsplash for Placeholder Images

**Source:** https://unsplash.com
**Benefits:**
- High-quality, professional photography
- Free for commercial use (Unsplash License)
- Wide variety of relevant imagery (plantations, palms, industrial, maps)
- Easy to source and replace with final assets later

**Recommended Unsplash Categories:**
- Palm oil / plantation imagery
- Industrial / port / logistics
- Sustainability / nature / forests
- Maps / geographic visuals
- Corporate / business contexts

**Image Sourcing Strategy:**
```bash
# Download placeholder images for each section
# Hero: Aerial plantation view
# Stats: Industrial/port imagery
# Sustainability: Nature/conservation
# Mission: Community/team
# Geographic: Map/Southeast Asia
# Product: Palm oil/storage tanks
# Contact: Office/corporate
```

**Image Optimization:**
- Use WebP format for production
- Lazy-load all images below fold
- Include srcset for responsive images
- Target < 100KB per image

### SVG for Logos, Icons, and Animations

**Why SVG:**
- Scalable without quality loss (perfect for retina displays)
- Lightweight file size
- Fully animatable with CSS and GSAP
- Accessible (can add ARIA labels)
- No external dependencies

**SVG Assets Required:**
1. **Company Logo** — NPI wordmark in SVG
2. **Section Icons** — Custom SVG icons for:
   - Sustainability (leaf/eco)
   - Scale (chart/growth)
   - Innovation (lightbulb/tech)
   - Indonesian Pride (map/flag)
   - Trade Excellence (globe/handshake)
3. **Certification Badges** — RSPO, ISCC logos as SVG
4. **Map Markers** — Custom location pins for geographic section
5. **UI Elements** — Progress indicators, decorative shapes
6. **Animated Elements** — SVG paths for scroll-triggered animations

**SVG Animation with GSAP:**
```typescript
// Animate SVG path on scroll
$gsap.from('.icon-path', {
  scrollTrigger: {
    trigger: '.icon-container',
    start: 'top 80%'
  },
  drawSVG: '0%', // Requires DrawSVGPlugin (Club GSAP)
  duration: 1.5,
  ease: 'power2.out'
})

// Alternative: CSS-based SVG animation
.icon-path {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  transition: stroke-dashoffset 1s ease-out;
}

.icon-path.animate {
  stroke-dashoffset: 0;
}
```

**SVG Best Practices:**
- Use inline SVGs where possible for animation access
- Optimize SVGs with SVGO before production
- Group elements logically for targeted animations
- Add title/desc for accessibility
- Use currentColor for flexible styling

**Example: Custom SVG Icon Component:**
```vue
<!-- components/ui/Icon.vue -->
<script setup lang="ts">
defineProps<{
  name: string
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}>()
</script>

<template>
  <svg
    :class="['icon', `icon-${name}`, { animated }]"
    :width="sizeMap[size || 'md']"
    :height="sizeMap[size || 'md']"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <slot />
  </svg>
</template>
```

---

## Deployment Options

1. **Image Assets:** Unsplash for placeholder images ✓ (confirmed)
2. **Deployment:** Vercel, Netlify, or GitHub Pages?
3. **Performance Budget:** Target Lighthouse score of 90+?
4. **GSAP Licensing:** Should we use ScrollSmoother (requires Club GSAP) or stick with core ScrollTrigger?

---

## References

- **Nuxt 3 Docs:** /websites/nuxt_3_x
- **Tailwind CSS v4:** /websites/tailwindcss
- **GSAP v3:** /websites/gsap_v3, /greensock/gsap
- **Nuxt Transitions:** /nuxt/nuxt
- **Project Specs:** docs/profile.md, docs/design-brief.md, docs/color-schema.md, docs/layout.md

---

## Next Steps

1. Initialize Nuxt 3 project
2. Set up Tailwind CSS v4 with Nusantara Earth palette (CSS-first config)
3. Install and configure GSAP with ScrollTrigger plugin
4. Create component structure per project structure
5. Source Unsplash placeholder images for each section
6. Create custom SVG icons and logo for NPI
7. Implement sections per layout.md specs
8. Add scroll-linked animations with GSAP

---

**Feedback Requested:**
- Are the tech choices appropriate for a portfolio project?
- Should we consider any additional dependencies?
- Is the project structure clear and maintainable?

---

*Comments and suggestions welcome. RFC open for discussion until consensus reached.*

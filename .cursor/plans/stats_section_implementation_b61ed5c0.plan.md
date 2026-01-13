---
name: Stats Section Implementation
overview: Implement StatsSection.vue with asymmetric 60/40 split layout, 4 animated stat cards with SVG icons, context panel, and GSAP ScrollTrigger counter animations following UX/UI design laws.
todos:
  - id: stats_layout
    content: Update StatsSection.vue with asymmetric 60/40 split structure
    status: completed
  - id: stats_icons
    content: Create 4 SVG stat icons (exports, hectares, employees, revenue)
    status: completed
  - id: stats_animation
    content: Implement 4 stat cards with GSAP counter animations
    status: completed
  - id: stats_responsive
    content: Add responsive design for mobile breakpoints
    status: completed
  - id: stats_tracker
    content: Update docs/task.md with completed tasks
    status: completed
---

# Stats Section Implementation Plan

## Overview

Implement the Stats Section component with asymmetric 60/40 split layout following the **Asymmetric Dynamic** design from [docs/layout.md](docs/layout.md) and **Nusantara Earth** color palette from [docs/color-schema.md](docs/color-schema.md).

Design follows **UX/UI Laws** from `.cursor/skills/`:

- **Aesthetic-Usability Effect**: Clean spacing, visual hierarchy, visual cues
- **Law of Proximity**: Grouped stat cards with clear visual separation
- **Law of Similarity**: Consistent icon sizing and card styling
- **Doherty Threshold**: Smooth 60fps animations under 400ms
- **Visual Hierarchy**: One focal point (stat numbers) per card
- **Whitespace**: Consistent spacing scale (gap-8, p-16)
- **Contrast**: Accent color sparingly for emphasis only

## Layout Structure

```
┌─────────────────────────────────────────┐
│         Stats Section (100vh min)        │
├───────────────────┬─────────────────────┤
│                   │                     │
│   Left Panel      │   Right Panel       │
│   (60%)           │   (40%)             │
│                   │                     │
│   Dark Coffee     │   Warm Cream        │
│   #2c2416         │   #f5f0e8           │
│                   │                     │
│   2x2 Grid        │   Context Text      │
│   4 Stat Cards    │   + SVG Accent      │
│   + SVG Icons     │                     │
│                   │                     │
└───────────────────┴─────────────────────┘
```

## SVG Icon Generation

Create 4 inline SVG icons for stat cards at `components/ui/StatIcons.ts`:

```typescript
// Export icon - shipping/trade symbol
export const IconExports = {
  template: `
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 40h40M4 40a4 4 0 0 0 4-4V16l12-8 12 8v20a4 4 0 0 1-4 4M4 40l8-6M12 34v-4M20 30v-8M28 34v-6" />
    </svg>
  `
}

// Hectares icon - plantation/land symbol
export const IconHectares = {
  template: `
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 4v40M4 24h40M12 12l24 24M36 12L12 36M4 12l10 10M34 26l10 10" />
      <circle cx="24" cy="24" r="8" />
    </svg>
  `
}

// Employees icon - people/team symbol
export const IconEmployees = {
  template: `
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="12" r="6" />
      <path d="M36 44v-6a6 6 0 0 0-6-6h-12a6 6 0 0 0-6 6v6M8 44v-4a8 8 0 0 1 8-8h16a8 8 0 0 1 8 8v4" />
    </svg>
  `
}

// Revenue icon - chart/growth symbol
export const IconRevenue = {
  template: `
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 36h40M12 36V20l8-8 8 8 8-12 8 12" />
      <circle cx="20" cy="12" r="3" />
      <circle cx="28" cy="28" r="3" />
      <circle cx="36" cy="16" r="3" />
    </svg>
  `
}

// Context panel decorative SVG
export const ContextAccent = {
  template: `
    <svg viewBox="0 0 120 120" fill="none" opacity="0.15">
      <circle cx="60" cy="60" r="50" stroke="#2c2416" stroke-width="1" />
      <path d="M30 60h60M60 30v60" stroke="#2c2416" stroke-width="1" />
      <circle cx="60" cy="60" r="20" stroke="#2c2416" stroke-width="1" />
    </svg>
  `
}
```

**Icon Design Principles:**

- 48x48 viewBox for consistent sizing
- Stroke-based design matching Nusantara Earth palette
- Simple, recognizable symbols for quick comprehension (Hick's Law)
- Same visual weight across all icons (Law of Similarity)

## Implementation Tasks

### Task 6.1: Update StatsSection.vue Structure

**File:** `components/sections/StatsSection.vue`

Replace placeholder with full asymmetric layout:

```vue
<script setup lang="ts">
import { useNuxtApp } from '#app'

interface StatItem {
  id: string
  value: number
  suffix: string
  label: string
  description: string
  icon: string
}

const stats: StatItem[] = [
  { id: 'exports', value: 380000, suffix: '+', label: 'Annual Exports', description: 'Metric tons of CPO', icon: 'exports' },
  { id: 'hectares', value: 85000, suffix: '', label: 'Total Area', description: 'Hectares managed', icon: 'hectares' },
  { id: 'employees', value: 2800, suffix: '+', label: 'Workforce', description: 'Employees across ops', icon: 'employees' },
  { id: 'revenue', value: 280, suffix: 'M+', label: 'Export Revenue', description: 'USD million annually', icon: 'revenue' }
]

const contextText = 'Nusantara Palm Industries is Indonesia\'s leading sustainable palm oil exporter, operating a large-scale integrated enterprise focused on delivering high-quality crude palm oil to Asian markets.'

const { $gsap } = useNuxtApp()

onMounted(() => {
  // Animate stat numbers on scroll
  const statNumbers = document.querySelectorAll('.stat-number')

  statNumbers.forEach((el) => {
    const target = parseInt(el.getAttribute('data-target') || '0')

    $gsap.fromTo(el,
      { textContent: 0 },
      {
        textContent: target,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        },
        onUpdate: function() {
          el.textContent = Math.ceil(this.targets()[0].textContent).toLocaleString()
        }
      }
    )
  })

  // Stagger reveal for stat cards with icons
  $gsap.from('.stat-card', {
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.stats-panel',
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    }
  })

  // Icon fade in
  $gsap.from('.stat-icon', {
    scale: 0.5,
    opacity: 0,
    duration: 0.5,
    stagger: 0.12,
    delay: 0.2,
    scrollTrigger: {
      trigger: '.stats-panel',
      start: 'top 70%'
    }
  })

  // Context panel slide in
  $gsap.from('.context-content', {
    x: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.context-panel',
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    }
  })

  // Decorative accent animation
  $gsap.from('.context-accent', {
    rotation: -90,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.context-panel',
      start: 'top 60%'
    }
  })
})
</script>

<template>
  <section id="stats" class="stats-section min-h-screen-100 flex">
    <!-- Left Panel: 60% - Stats Grid -->
    <div class="stats-panel w-3/5 bg-[#2c2416] flex items-center justify-center px-16 py-20">
      <div class="stats-grid grid grid-cols-2 gap-x-12 gap-y-10 w-full max-w-2xl">
        <div
          v-for="(stat, index) in stats"
          :key="stat.id"
          class="stat-card border-l-4 border-[#d4a24c] pl-6 py-2"
        >
          <div class="stat-icon w-12 h-12 text-[#d4a24c] mb-3">
            <component :is="'Icon' + capitalize(stat.icon)" />
          </div>
          <div
            class="stat-number text-5xl md:text-6xl font-bold text-[#d4a24c]"
            :data-target="stat.value"
          >
            0{{ stat.suffix }}
          </div>
          <div class="stat-label text-lg text-[#f5f0e8] mt-2 font-medium">{{ stat.label }}</div>
          <div class="stat-desc text-sm text-[#f5f0e8]/60 mt-1">{{ stat.description }}</div>
        </div>
      </div>
    </div>

    <!-- Right Panel: 40% - Context -->
    <div class="context-panel w-2/5 bg-[#f5f0e8] flex items-center justify-center px-16 py-20 relative overflow-hidden">
      <!-- Decorative SVG accent -->
      <div class="context-accent absolute top-8 right-8 w-24 h-24 pointer-events-none">
        <ContextAccent />
      </div>

      <div class="context-content relative z-10 max-w-md">
        <h3 class="text-3xl md:text-4xl font-bold text-[#2c2416] mb-6 leading-tight">
          Scale for<br/><span class="text-[#c45b28]">Sustainable Growth</span>
        </h3>
        <p class="text-lg text-[#2c2416]/80 leading-relaxed">{{ contextText }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-grid {
  /* Consistent spacing scale - UI Law: Whitespace */
  gap: 2.5rem 3rem;
}

.stat-card {
  /* Visual hierarchy - UI Law: Visual Hierarchy */
  /* Visual cue - UX Law: Aesthetic-Usability Effect */
}

@media (max-width: 768px) {
  .stats-section {
    flex-direction: column;
  }

  .stats-panel,
  .context-panel {
    width: 100%;
    min-height: auto;
    padding: 3rem 1.5rem;
  }

  .stats-grid {
    gap: 2rem 1.5rem;
  }

  .stat-number {
    font-size: 2.5rem;
  }

  .stat-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>
```

### Task 6.2: Create SVG Icon Component File

**File:** `components/ui/StatIcons.vue`

```vue
<script setup lang="ts">
// Import icon components
import IconExports from './icons/IconExports.vue'
import IconHectares from './icons/IconHectares.vue'
import IconEmployees from './icons/IconEmployees.vue'
import IconRevenue from './icons/IconRevenue.vue'
import IconAccent from './icons/IconAccent.vue'

defineOptions({
  components: {
    IconExports,
    IconHectares,
    IconEmployees,
    IconRevenue,
    IconAccent
  }
})
</script>
```

**Create individual icon files:**

**File:** `components/ui/icons/IconExports.vue`

```vue
<template>
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
    <path d="M4 40h40M4 40a4 4 0 0 0 4-4V16l12-8 12 8v20a4 4 0 0 1-4 4M4 40l8-6M12 34v-4M20 30v-8M28 34v-6" />
  </svg>
</template>
```

**File:** `components/ui/icons/IconHectares.vue`

```vue
<template>
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
    <path d="M24 4v40M4 24h40M12 12l24 24M36 12L12 36M4 12l10 10M34 26l10 10" />
    <circle cx="24" cy="24" r="8" />
  </svg>
</template>
```

**File:** `components/ui/icons/IconEmployees.vue`

```vue
<template>
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
    <circle cx="24" cy="12" r="6" />
    <path d="M36 44v-6a6 6 0 0 0-6-6h-12a6 6 0 0 0-6 6v6M8 44v-4a8 8 0 0 1 8-8h16a8 8 0 0 1 8 8v4" />
  </svg>
</template>
```

**File:** `components/ui/icons/IconRevenue.vue`

```vue
<template>
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
    <path d="M4 36h40M12 36V20l8-8 8 8 8-12 8 12" />
    <circle cx="20" cy="12" r="3" />
    <circle cx="28" cy="28" r="3" />
    <circle cx="36" cy="16" r="3" />
  </svg>
</template>
```

**File:** `components/ui/icons/IconAccent.vue`

```vue
<template>
  <svg viewBox="0 0 120 120" fill="none" class="w-full h-full">
    <circle cx="60" cy="60" r="50" stroke="currentColor" stroke-width="1" />
    <path d="M30 60h60M60 30v60" stroke="currentColor" stroke-width="1" />
    <circle cx="60" cy="60" r="20" stroke="currentColor" stroke-width="1" />
  </svg>
</template>
```

### Task 6.3: Add Responsive Design

**File:** `components/sections/StatsSection.vue`

Add mobile-responsive classes following spacing scale.

### Task 6.4: Update Task Tracker

**File:** `docs/task.md`

Add completed tasks to Phase 6 section with status markers.

## Design Principles Applied

### UX Laws ([.cursor/skills/ux-law/SKILL.md](.cursor/skills/ux-law/SKILL.md))

| Law | Application |

|-----|-------------|

| **Aesthetic-Usability Effect** | Clean 2rem/2.5rem spacing, consistent typography hierarchy, gold border accent as visual cue |

| **Law of Proximity** | Stat cards grouped in 2x2 grid with consistent gap, label/description vertically stacked |

| **Law of Similarity** | All 4 stat cards same size, icon dimensions, border treatment |

| **Doherty Threshold** | Smooth GSAP animations at 60fps, instant hover states (<100ms) |

### UI Laws ([.cursor/skills/ui-law/SKILL.md](.cursor/skills/ui-law/SKILL.md))

| Principle | Application |

|-----------|-------------|

| **Visual Hierarchy** | Stat number = largest (text-5xl), gold accent; label = secondary (text-lg); description = tertiary (text-sm) |

| **Whitespace** | Consistent spacing scale: gap-x-12, gap-y-10, px-16, py-20 |

| **Typography Scale** | 3 text sizes: 5xl (number), lg (label), sm (description) |

| **Contrast** | Gold accent only on numbers and icons; rest uses cream/dark coffee |

| **Performance Budget** | Inline SVGs (no HTTP requests), minimal JS animations |

## Reference Specifications

### Color Usage ([docs/color-schema.md](docs/color-schema.md))

| Element | Color | Hex |

|---------|-------|-----|

| Left Panel Background | Dark Coffee | #2c2416 |

| Right Panel Background | Warm Cream | #f5f0e8 |

| Stat Number/Icon/Accent | Harvest Gold | #d4a24c |

| Stat Label | Warm Cream | #f5f0e8 |

| Stat Description | Warm Cream 60% | #f5f0e8/60 |

| Context Heading | Dark Coffee | #2c2416 |

| Context Accent | Dark Coffee 15% | #2c2416/15 |

### Layout Specifications ([docs/layout.md](docs/layout.md))

- **Section Height**: 100vh minimum
- **Left Panel**: 60% width, Dark Coffee background
- **Right Panel**: 40% width, Warm Cream background
- **Stat Grid**: 2 columns x 2 rows
- **Stat Block**: Large number (64-80px), label (16-18px)
- **Border**: 4px left border in Gold (#d4a24c)
- **Icon Size**: 48x48px (12 = 3rem)

### Animation Requirements ([docs/rfc.md](docs/rfc.md))

- **Counter Duration**: 2 seconds
- **Easing**: power2.out
- **Trigger**: Section at 60% viewport
- **Toggle**: play none none reverse
- **Stagger Delay**: 0.12s between cards
- **Icon Animation**: scale + opacity, delay 0.2s

## Verification Steps

After implementation:

1. Run `bun run dev` to start development server
2. Navigate to Stats section
3. Verify 4 SVG icons render correctly
4. Verify counter animation triggers on scroll
5. Test responsive layout at mobile breakpoint (<768px)
6. Confirm colors match Nusantara Earth palette
7. Check animation smoothness (no jank)
8. Verify all icons have same visual weight
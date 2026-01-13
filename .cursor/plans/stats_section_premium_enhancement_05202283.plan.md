---
name: Stats Section Premium Enhancement
overview: Transform StatsSection.vue into a premium company showcase that emphasizes NPI's scale and credibility through refined typography, Indonesian heritage elements, and sustainability credentials - all following strict UI laws.
todos:
  - id: stats_icons_premium
    content: Create premium stat icons (exports, hectares, employees, revenue)
    status: in_progress
  - id: stats_badges
    content: Create certification badges (RSPO, ISCC)
    status: pending
  - id: stats_map
    content: Create Asian markets map visualization
    status: pending
  - id: stats_batik
    content: Create Indonesian batik pattern accent
    status: pending
  - id: stats_update
    content: Update StatsSection.vue with premium design
    status: pending
  - id: stats_verify
    content: Run build and verify no errors
    status: pending
---

# Stats Section Premium Enhancement

## Design Philosophy

Act as senior designer to make NPI's stats "show off" the company's impressive scale:

- Numbers are the hero - maximize visual impact
- Indonesian identity through subtle pattern, not decoration
- Sustainability credentials build trust with B2B buyers
- Each element earns its place (no arbitrary additions)

## Layout Structure

```
┌─────────────────────────────────────────────────────┐
│                    Stats Section                     │
├─────────────────────────────┬───────────────────────┤
│                             │                       │
│   Left Panel (60%)          │   Right Panel (40%)   │
│   Dark Coffee #2c2416       │   Warm Cream #f5f0e8  │
│                             │                       │
│   ┌───────────────────┐     │   "From Indonesia     │
│   │ RSPO  ISCC        │     │    to Asia"           │
│   │ [mini badges]     │     │                       │
│   └───────────────────┘     │   Brief context       │
│                             │   + export markets    │
│   ┌─────┐ ┌─────┐          │   + small map         │
│   │380k+│ │85Kha │          │                       │
│   └─────┘ └─────┘          │                       │
│   ┌─────┐ ┌─────┐          │                       │
│   │2.8k+│ │$280M│          │                       │
│   └─────┘ └─────┘          │                       │
│                             │                       │
└─────────────────────────────┴───────────────────────┘
```

## UI Laws Applied

| Law | Application |

|-----|-------------|

| **Visual Hierarchy** | Stat numbers = largest element (text-6xl), gold accent |

| **Whitespace** | Generous padding, consistent gap scale (gap-10, gap-12) |

| **Typography Scale** | 4 sizes: text-6xl (number), text-xl (label), text-lg (headline), text-base (description) |

| **Contrast** | Dark/light panels create natural separation, gold used sparingly |

| **Performance Budget** | Inline SVGs, no heavy assets, CSS-only hover states |

## Implementation Tasks

### Task 1: Create Premium Icon Set

**File:** `components/ui/icons/IconExportsPremium.vue`

```vue
<template>
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
    <path d="M4 40h40M4 40a4 4 0 0 0 4-4V16l12-8 12 8v20a4 4 0 0 1-4 4M4 40l8-6M12 34v-4M20 30v-8M28 34v-6" />
  </svg>
</template>
```

**File:** `components/ui/icons/IconHectaresPremium.vue`

```vue
<template>
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
    <path d="M24 4v40M4 24h40M12 12l24 24M36 12L12 36M4 12l10 10M34 26l10 10" />
    <circle cx="24" cy="24" r="8" />
  </svg>
</template>
```

**File:** `components/ui/icons/IconEmployeesPremium.vue`

```vue
<template>
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
    <circle cx="24" cy="12" r="6" />
    <path d="M36 44v-6a6 6 0 0 0-6-6h-12a6 6 0 0 0-6 6v6M8 44v-4a8 8 0 0 1 8-8h16a8 8 0 0 1 8 8v4" />
  </svg>
</template>
```

**File:** `components/ui/icons/IconRevenuePremium.vue`

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

### Task 2: Create Certification Badges

**File:** `components/ui/icons/IconRspoSmall.vue`

```vue
<template>
  <svg viewBox="0 0 48 48" fill="none" class="w-full h-full">
    <circle cx="24" cy="24" r="22" stroke="#d4a24c" stroke-width="1.5"/>
    <circle cx="24" cy="24" r="16" stroke="#d4a24c" stroke-width="1"/>
    <text x="24" y="20" text-anchor="middle" fill="#d4a24c" font-size="7" font-weight="bold">RSPO</text>
    <text x="24" y="28" text-anchor="middle" fill="#d4a24c" font-size="4">CERTIFIED</text>
  </svg>
</template>
```

**File:** `components/ui/icons/IconIsccSmall.vue`

```vue
<template>
  <svg viewBox="0 0 48 48" fill="none" class="w-full h-full">
    <circle cx="24" cy="24" r="22" stroke="#d4a24c" stroke-width="1.5"/>
    <text x="24" y="20" text-anchor="middle" fill="#d4a24c" font-size="7" font-weight="bold">ISCC</text>
    <text x="24" y="28" text-anchor="middle" fill="#d4a24c" font-size="4">EU</text>
    <path d="M18 34 L24 28 L30 34" stroke="#d4a24c" stroke-width="1"/>
  </svg>
</template>
```

### Task 3: Create Asian Markets Map

**File:** `components/ui/icons/IconAsiaSimple.vue`

```vue
<template>
  <svg viewBox="0 0 160 100" fill="none" class="w-full h-full">
    <!-- Simplified Asia silhouette -->
    <path d="M20 20 Q50 10 90 15 T150 25 L145 70 Q120 95 80 90 T20 75 Z" 
          stroke="#2c2416" stroke-width="0.5" fill="none" opacity="0.2"/>
    <!-- Jakarta marker -->
    <circle cx="85" cy="65" r="5" fill="#c45b28"/>
    <circle cx="85" cy="65" r="2" fill="#d4a24c"/>
    <!-- Market dots -->
    <circle cx="110" cy="30" r="3" fill="#2a5c55"/>
    <circle cx="100" cy="38" r="3" fill="#2a5c55"/>
    <circle cx="120" cy="45" r="3" fill="#2a5c55"/>
    <!-- Connection lines -->
    <path d="M85 65 L110 30" stroke="#d4a24c" stroke-width="0.5" stroke-dasharray="2,2"/>
    <path d="M85 65 L100 38" stroke="#d4a24c" stroke-width="0.5" stroke-dasharray="2,2"/>
    <path d="M85 65 L120 45" stroke="#d4a24c" stroke-width="0.5" stroke-dasharray="2,2"/>
  </svg>
</template>
```

### Task 4: Create Indonesian Pattern Accent

**File:** `components/ui/icons/IconBatikSubtle.vue`

```vue
<template>
  <svg viewBox="0 0 100 100" fill="none" class="w-full h-full opacity-0.06">
    <pattern id="batikSubtle" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M10 2 L18 10 L10 18 L2 10 Z" fill="#c45b28"/>
      <circle cx="10" cy="10" r="2" fill="#d4a24c"/>
    </pattern>
    <rect width="100" height="100" fill="url(#batikSubtle)"/>
  </svg>
</template>
```

### Task 5: Update StatsSection.vue

```vue
<script setup lang="ts">
import { useNuxtApp } from '#app'
import IconExportsPremium from '../ui/icons/IconExportsPremium.vue'
import IconHectaresPremium from '../ui/icons/IconHectaresPremium.vue'
import IconEmployeesPremium from '../ui/icons/IconEmployeesPremium.vue'
import IconRevenuePremium from '../ui/icons/IconRevenuePremium.vue'
import IconRspoSmall from '../ui/icons/IconRspoSmall.vue'
import IconIsccSmall from '../ui/icons/IconIsccSmall.vue'
import IconAsiaSimple from '../ui/icons/IconAsiaSimple.vue'
import IconBatikSubtle from '../ui/icons/IconBatikSubtle.vue'

interface StatItem {
  id: string
  value: number
  suffix: string
  label: string
  description: string
  icon: object
}

const stats: StatItem[] = [
  { id: 'exports', value: 380000, suffix: '+', label: 'Annual Exports', description: 'Metric tons of CPO', icon: IconExportsPremium },
  { id: 'hectares', value: 85000, suffix: '', label: 'Total Area', description: 'Hectares managed', icon: IconHectaresPremium },
  { id: 'employees', value: 2800, suffix: '+', label: 'Workforce', description: 'Employees across ops', icon: IconEmployeesPremium },
  { id: 'revenue', value: 280, suffix: 'M+', label: 'Export Revenue', description: 'USD million annually', icon: IconRevenuePremium }
]

const contextText = 'From our plantations in Kalimantan to ports across Asia, NPI delivers sustainable palm oil that powers industries and communities.'

const { $gsap } = useNuxtApp()

onMounted(() => {
  // Counter animation
  document.querySelectorAll('.stat-number').forEach((el) => {
    const target = parseInt(el.getAttribute('data-target') || '0')
    $gsap.fromTo(el, { textContent: 0 }, {
      textContent: target, duration: 2, ease: 'power2.out', snap: { textContent: 1 },
      scrollTrigger: { trigger: '.stats-section', start: 'top 60%' },
      onUpdate() { el.textContent = Math.ceil(this.targets()[0].textContent).toLocaleString() }
    })
  })

  // Stagger reveal
  $gsap.from('.stat-card', {
    y: 50, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '.stats-panel', start: 'top 70%' }
  })

  // Icon reveal
  $gsap.from('.stat-icon', {
    scale: 0.6, opacity: 0, duration: 0.5, stagger: 0.1, delay: 0.2,
    scrollTrigger: { trigger: '.stats-panel', start: 'top 70%' }
  })

  // Context panel
  $gsap.from('.context-content', {
    x: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.context-panel', start: 'top 70%' }
  })

  // Map reveal
  $gsap.from('.asia-map', {
    scale: 0.9, opacity: 0, duration: 0.8, delay: 0.3,
    scrollTrigger: { trigger: '.context-panel', start: 'top 70%' }
  })
})
</script>

<template>
  <section id="stats" class="stats-section min-h-screen-100 flex relative">
    <!-- Indonesian pattern overlay (subtle) -->
    <div class="absolute inset-0 pointer-events-none opacity-0.05">
      <IconBatikSubtle />
    </div>

    <!-- Left Panel: Stats (60%) -->
    <div class="stats-panel w-3/5 bg-[#2c2416] flex items-center justify-center px-16 py-20 relative z-10">
      <!-- Certification badges row -->
      <div class="cert-row flex items-center gap-4 mb-12">
        <div class="w-12 h-12 flex items-center justify-center">
          <IconRspoSmall />
        </div>
        <div class="w-12 h-12 flex items-center justify-center">
          <IconIsccSmall />
        </div>
        <span class="text-[#f5f0e8]/60 text-sm ml-2">
          RSPO Certified 2019 | ISCC EU
        </span>
      </div>

      <!-- Stats grid -->
      <div class="stats-grid grid grid-cols-2 gap-x-16 gap-y-12 w-full max-w-2xl">
        <div v-for="stat in stats" :key="stat.id"
             class="stat-card border-l-4 border-[#d4a24c] pl-6 py-2">
          <div class="stat-icon w-12 h-12 text-[#d4a24c] mb-4">
            <component :is="stat.icon" />
          </div>
          <div class="stat-number text-5xl md:text-6xl font-bold text-[#d4a24c]" :data-target="stat.value">
            0{{ stat.suffix }}
          </div>
          <div class="stat-label text-xl text-[#f5f0e8] mt-3 font-medium">{{ stat.label }}</div>
          <div class="stat-desc text-sm text-[#f5f0e8]/60 mt-1">{{ stat.description }}</div>
        </div>
      </div>
    </div>

    <!-- Right Panel: Context (40%) -->
    <div class="context-panel w-2/5 bg-[#f5f0e8] flex items-center justify-center px-16 py-20 relative overflow-hidden">
      <div class="context-content relative z-10 max-w-md">
        <!-- Headline -->
        <h3 class="text-3xl md:text-4xl font-bold text-[#2c2416] mb-6 leading-tight">
          From Indonesia to Asia
        </h3>

        <!-- Context text -->
        <p class="text-lg text-[#2c2416]/80 leading-relaxed mb-8">
          {{ contextText }}
        </p>

        <!-- Small map visualization -->
        <div class="asia-map w-full h-24 mb-6">
          <IconAsiaSimple />
        </div>

        <!-- Market labels -->
        <div class="flex flex-wrap gap-4 text-sm">
          <span class="text-[#2c2416]/60">Exporting to:</span>
          <span class="text-[#2a5c55] font-medium">China, India, Singapore</span>
          <span class="text-[#2c2416]/40">+ 5 more</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-grid {
  gap: 3rem 4rem;
}

.stat-card {
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateX(8px);
  background: rgba(212, 162, 76, 0.08);
}

.stat-number {
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}

.cert-row {
  position: absolute;
  top: 3rem;
  left: 4rem;
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

  .cert-row {
    position: static;
    margin-bottom: 2rem;
    justify-content: center;
  }

  .stats-grid {
    gap: 2rem 1.5rem;
  }

  .stat-number {
    font-size: 2.5rem;
  }

  .asia-map {
    height: 120px;
  }
}
</style>
```

## Design Decisions

### Why This Works

1. **Certification Badges at Top** - First thing visitors see, builds credibility immediately
2. **Large Numbers with Icons** - Stats are the hero, gold accent guides attention
3. **"From Indonesia to Asia" Headline** - Clear positioning statement
4. **Small Map + Market Labels** - Geographic presence without overwhelming
5. **Indonesian Pattern (6% opacity)** - Heritage element, barely noticeable but present
6. **Hover Effects** - Subtle slide + background tint for interactivity

### Typography Hierarchy

| Element | Size | Weight | Color |

|---------|------|--------|-------|

| Stat Number | text-5xl | Bold | Gold #d4a24c |

| Stat Label | text-xl | Medium | Cream #f5f0e8 |

| Headline | text-3xl | Bold | Dark #2c2416 |

| Body | text-lg | Normal | Dark/60% #2c2416 |

| Caption | text-sm | Normal | Cream/60% #f5f0e8 |

## Reference Documents

- [docs/profile.md](docs/profile.md) - NPI company content and statistics
- [docs/design-brief.md](docs/design-brief.md) - UX principles and section structure
- [docs/layout.md](docs/layout.md) - Asymmetric 60/40 split specification
- [docs/color-schema.md](docs/color-schema.md) - Nusantara Earth color palette

## Verification Steps

1. Run `bun run dev` to preview
2. Verify counter animation triggers on scroll
3. Check certification badges are visible and aligned
4. Test hover states on stat cards
5. Confirm map renders correctly on all screen sizes
6. Run `bun run build` to verify no errors
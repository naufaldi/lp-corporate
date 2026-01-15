# GSAP Animation Standardization & Enhancement Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Standardize and enhance GSAP animations across the landing page with viewport reveal animations, staggered lists, hover micro-interactions, and parallax effects using the existing GSAP plugin infrastructure.

**Architecture:** Extend the existing `gsap.client.ts` plugin with standardized animation composables and add consistent animations to all sections. All animations will use the existing plugin utilities for reduced motion support and consistent easing.

**Tech Stack:** Nuxt 3, GSAP + ScrollTrigger, existing `$animation` plugin utilities

---

## Tasks

### Task 1: Extend GSAP Plugin with Standardized Animation Utilities

**Files:**
- Modify: `plugins/gsap.client.ts:1-601`

**Step 1: Add new standardized animation composables**

```typescript
// Add to the animations object in gsap.client.ts

// Standard fade-in-up animation for section headers
fadeInUp(
  target: string | HTMLElement | Element[],
  options: {
    delay?: number
    duration?: number
    stagger?: number
    yStart?: number
  } = {}
) {
  const shouldReduce = utils.shouldReduceMotion()
  const { delay = 0, duration = 0.6, stagger = 0, yStart = 30 } = options

  if (shouldReduce) {
    return gsap.set(target, { opacity: 1 })
  }

  return gsap.fromTo(target,
    { opacity: 0, y: yStart },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: target,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  )
},

// Stagger reveal for list items
staggerReveal(
  target: string | HTMLElement | Element[],
  options: {
    delay?: number
    duration?: number
    stagger?: number
    from?: 'start' | 'end' | 'center' | 'random'
  } = {}
) {
  const shouldReduce = utils.shouldReduceMotion()
  const { delay = 0, duration = 0.5, stagger = 0.1, from = 'start' } = options

  if (shouldReduce) {
    return gsap.set(target, { opacity: 1, y: 0 })
  }

  return gsap.fromTo(target,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: target,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    }
  )
},

// Background parallax effect
bgParallax(
  target: string | HTMLElement,
  options: {
    speed?: number
    direction?: 'up' | 'down'
    scrub?: boolean
  } = {}
) {
  const shouldReduce = utils.shouldReduceMotion()
  const { speed = 0.15, direction = 'up', scrub = true } = options

  if (shouldReduce) return

  const yPercent = direction === 'up' ? -speed * 100 : speed * 100

  return gsap.to(target, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: target,
      start: 'top bottom',
      end: 'bottom top',
      scrub: scrub ? 1 : false
    }
  })
},

// Scale on hover with return
hoverScale(
  target: string | HTMLElement,
  options: {
    scale?: number
    duration?: number
  } = {}
) {
  const { scale = 1.03, duration = 0.3 } = options
  const el = utils.getElement(target)
  if (!el) return

  const onEnter = () => {
    if (utils.shouldReduceMotion()) return
    gsap.to(el, { scale, duration, ease: 'power2.out' })
  }
  const onLeave = () => {
    gsap.to(el, { scale: 1, duration, ease: 'power2.out' })
  }

  el.addEventListener('mouseenter', onEnter)
  el.addEventListener('mouseleave', onLeave)

  return () => {
    el.removeEventListener('mouseenter', onEnter)
    el.removeEventListener('mouseleave', onLeave)
  }
},

// Color transition on hover
hoverColor(
  target: string | HTMLElement,
  options: {
    color?: string
    duration?: number
  } = {}
) {
  const { color, duration = 0.3 } = options
  const el = utils.getElement(target)
  if (!el) return

  const onEnter = () => {
    if (utils.shouldReduceMotion() || !color) return
    gsap.to(el, { color, duration, ease: 'power2.out' })
  }
  const onLeave = () => {
    gsap.to(el, { color: '', duration, ease: 'power2.out' })
  }

  el.addEventListener('mouseenter', onEnter)
  el.addEventListener('mouseleave', onLeave)

  return () => {
    el.removeEventListener('mouseenter', onEnter)
    el.removeEventListener('mouseleave', onLeave)
  }
},

// Underline expansion animation
underlineExpand(
  target: string | HTMLElement,
  options: {
    duration?: number
    color?: string
  } = {}
) {
  const { duration = 0.3, color = '#d4a24c' } = options
  const el = utils.getElement(target)
  if (!el) return

  const onEnter = () => {
    if (utils.shouldReduceMotion()) return
    gsap.to(el, { width: '100%', duration, ease: 'power2.out' })
  }
  const onLeave = () => {
    gsap.to(el, { width: '0%', duration, ease: 'power2.out' })
  }

  el.style.position = 'relative'
  el.style.overflow = 'hidden'

  el.addEventListener('mouseenter', onEnter)
  el.addEventListener('mouseleave', onLeave)

  return () => {
    el.removeEventListener('mouseenter', onEnter)
    el.removeEventListener('mouseleave', onLeave)
  }
}
```

**Step 2: Run build to verify**

Run: `bun run build`
Expected: No errors

**Step 3: Commit**

```bash
git add plugins/gsap.client.ts
git commit -m "feat: extend GSAP plugin with standardized animation utilities"
```

---

### Task 2: Add Animations to AppNavigation

**Files:**
- Modify: `components/AppNavigation.vue:1-322`

**Step 1: Add navigation link hover animations**

```typescript
// Add to script
import { onMounted, onUnmounted } from 'vue'
import { useNuxtApp } from '#app'

const { $gsap } = useNuxtApp()
let cleanupFns: Array<() => void> = []

onMounted(() => {
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (!shouldReduceMotion) {
    const cleanupHover = $gsap.utils?.hoverScale?.('.app-nav__link', { scale: 1.05, duration: 0.2 })
    const cleanupUnderline = $gsap.utils?.underlineExpand?.('.app-nav__link::after', { duration: 0.25 })
    
    if (cleanupHover) cleanupFns.push(cleanupHover)
    if (cleanupUnderline) cleanupFns.push(cleanupUnderline)
  }
})

onUnmounted(() => {
  cleanupFns.forEach(fn => fn && typeof fn === 'function' && fn())
})
```

**Step 2: Update CSS for underline animation**

```css
.app-nav__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #d4a24c;
  transition: none; /* Remove CSS transition, use GSAP */
}
```

**Step 3: Run build**

Run: `bun run build`
Expected: No errors

**Step 4: Commit**

```bash
git add components/AppNavigation.vue
git commit -m "feat: add hover animations to navigation links"
```

---

### Task 3: Enhance HeroSection with Standardized Animations

**Files:**
- Modify: `components/sections/HeroSection.vue:1-593`

**Step 1: Simplify and standardize hero animations**

```typescript
// Replace onMounted animation logic with standardized utilities
onMounted(() => {
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    $gsap.set(['.hero-bg', '.hero-overlay', '.hero-content', '.hero-cta-group', '.scroll-indicator'], { opacity: 1 })
    return
  }

  // Use standardized reveal animation
  $animation?.revealUp?.('.hero-content', { delay: 0.2, duration: 1 })
  $animation?.revealUp?.('.hero-cta-group', { delay: 0.4, duration: 0.6 })
  $animation?.revealUp?.('.scroll-indicator', { delay: 0.6, duration: 0.5 })

  // Parallax on background
  $animation?.parallaxFlow?.('.hero-bg', { speed: 0.15, direction: 'left', scrub: true })

  // Hover effects
  const cleanupHover = $animation?.hoverScale?.('.hero-cta', { scale: 1.03, duration: 0.3 })
  const cleanupMagnetic = $animation?.magneticButton?.('.hero-cta', { strength: 20, duration: 0.25 })
  
  if (cleanupHover) cleanupFns.push(cleanupHover)
  if (cleanupMagnetic) cleanupFns.push(cleanupMagnetic)
})
```

**Step 2: Add CSS hover transition for CTA button**

```css
.hero-cta {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hero-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(196, 91, 40, 0.4);
}
```

**Step 3: Run build**

Run: `bun run build`
Expected: No errors

**Step 4: Commit**

```bash
git add components/sections/HeroSection.vue
git commit -m "feat: standardize hero section animations"
```

---

### Task 4: Enhance StatsSection with Staggered Animations

**Files:**
- Modify: `components/sections/StatsSection.vue:1-329`

**Step 1: Add staggered reveal to stats**

```typescript
onMounted(() => {
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    $gsap.set(['.hero-content', '.stat-row', '.cert-row'], { opacity: 1 })
    return
  }

  // Standardized reveal sequence
  $animation?.revealUp?.('.hero-content', { duration: 0.8 })
  
  // Staggered reveal for stat rows
  $animation?.staggerReveal?.('.stat-row', { 
    stagger: 0.12, 
    from: 'start' 
  })
  
  $animation?.revealUp?.('.cert-row', { delay: 0.3, duration: 0.5 })

  // Add hover scale to stat rows
  document.querySelectorAll('.stat-row').forEach((row) => {
    const cleanup = $animation?.hoverScale?.(row as HTMLElement, { scale: 1.02, duration: 0.3 })
    if (cleanup) cleanupFns.push(cleanup)
  })
})
```

**Step 2: Run build**

Run: `bun run build`
Expected: No errors

**Step 3: Commit**

```bash
git add components/sections/StatsSection.vue
git commit -m "feat: add staggered animations to stats section"
```

---

### Task 5: Enhance SustainabilitySection

**Files:**
- Modify: `components/sections/SustainabilitySection.vue:1-883`

**Step 1: Add parallax and staggered animations**

```typescript
onMounted(() => {
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    $gsap.set(['.journey-intro', '.milestone-node', '.stat-item'], { opacity: 1, y: 0 })
    return
  }

  // Parallax on background image
  $animation?.bgParallax?.('.bg-image', { speed: 0.2, scrub: true })

  // Staggered reveal for intro elements
  $animation?.staggerReveal?.('.journey-intro > *', { stagger: 0.1 })
  
  // Staggered reveal for milestone nodes
  $animation?.staggerReveal?.('.milestone-node', { 
    stagger: 0.15,
    from: 'random'
  })

  // Hover effects on milestone nodes
  document.querySelectorAll('.milestone-node').forEach((node) => {
    const cleanup = $animation?.hoverScale?.(node as HTMLElement, { scale: 1.05, duration: 0.3 })
    if (cleanup) cleanupFns.push(cleanup)
  })
})
```

**Step 2: Run build**

Run: `bun run build`
Expected: No errors

**Step 3: Commit**

```bash
git add components/sections/SustainabilitySection.vue
git commit -m "feat: add parallax and staggered animations to sustainability section"
```

---

### Task 6: Enhance MissionSection

**Files:**
- Modify: `components/sections/MissionSection.vue:1-227`

**Step 1: Add animations**

```typescript
onMounted(() => {
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    $gsap.set(['.left-content', '.right-inner', '.value-card'], { opacity: 1, y: 0 })
    return
  }

  // Parallax on background
  $animation?.bgParallax?.('.bg-parallax', { speed: 0.15, scrub: true })

  // Staggered reveal
  $animation?.revealUp?.('.left-content', { duration: 0.8 })
  $animation?.revealUp?.('.right-inner', { delay: 0.2, duration: 0.8 })
  $animation?.staggerReveal?.('.value-card', { stagger: 0.1, delay: 0.3 })

  // Hover effects on value cards
  document.querySelectorAll('.value-card').forEach((card) => {
    const cleanup = $animation?.hoverScale?.(card as HTMLElement, { scale: 1.03, duration: 0.3 })
    if (cleanup) cleanupFns.push(cleanup)
  })
})
```

**Step 2: Run build**

Run: `bun run build`
Expected: No errors

**Step 3: Commit**

```bash
git add components/sections/MissionSection.vue
git commit -m "feat: enhance mission section with parallax and hover animations"
```

---

### Task 7: Enhance GeographicSection

**Files:**
- Modify: `components/sections/GeographicSection.vue:1-665`

**Step 1: Add animations**

```typescript
onMounted(() => {
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    $gsap.set(['.geo-label', '.geo-title', '.geo-card', '.market-item', '.singapore-card'], { opacity: 1, y: 0, x: 0 })
    return
  }

  // Parallax on map (subtle)
  gsap.to('.map-layer', {
    scrollTrigger: {
      trigger: '#geographic',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    },
    xPercent: -3,
    ease: 'none'
  })

  // Staggered reveal
  $animation?.revealUp?.('.geo-label', { duration: 0.6 })
  $animation?.revealUp?.('.geo-title', { delay: 0.1, duration: 0.8 })
  $animation?.staggerReveal?.('.geo-card', { stagger: 0.12 })
  $animation?.staggerReveal?.('.market-item', { stagger: 0.06 })
  $animation?.revealUp?.('.singapore-card', { delay: 0.2, duration: 0.8 })

  // Hover effects on geo cards
  document.querySelectorAll('.geo-card').forEach((card) => {
    const cleanup = $animation?.hoverScale?.(card as HTMLElement, { scale: 1.02, duration: 0.3 })
    if (cleanup) cleanupFns.push(cleanup)
  })
})
```

**Step 2: Run build**

Run: `bun run build`
Expected: No errors

**Step 3: Commit**

```bash
git add components/sections/GeographicSection.vue
git commit -m "feat: add staggered reveal and hover animations to geographic section"
```

---

### Task 8: Enhance ProductSection

**Files:**
- Modify: `components/sections/ProductSection.vue:1-855`

**Step 1: Add animations**

```typescript
onMounted(() => {
  if (!import.meta.client) return

  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    $gsap.set(['.product-left', '.product-right', '.spec-card', '.feature-card'], { opacity: 1, y: 0 })
    return
  }

  // Staggered reveal for left content
  $animation?.staggerReveal?.('.product-left > *', { stagger: 0.1 })

  // Staggered reveal for right content
  $animation?.revealUp?.('.product-right', { duration: 0.8 })
  $animation?.staggerReveal?.('.spec-card', { stagger: 0.08 })
  $animation?.staggerReveal?.('.feature-card', { stagger: 0.1 })

  // Hover effects
  document.querySelectorAll('.spec-card').forEach((card) => {
    const cleanup = $animation?.hoverScale?.(card as HTMLElement, { scale: 1.02, duration: 0.3 })
    if (cleanup) cleanupFns.push(cleanup)
  })

  document.querySelectorAll('.feature-card').forEach((card) => {
    const cleanup = $animation?.hoverScale?.(card as HTMLElement, { scale: 1.03, duration: 0.3 })
    if (cleanup) cleanupFns.push(cleanup)
  })
})
```

**Step 2: Run build**

Run: `bun run build`
Expected: No errors

**Step 3: Commit**

```bash
git add components/sections/ProductSection.vue
git commit -m "feat: add staggered animations to product section"
```

---

### Task 9: Enhance ContactSection

**Files:**
- Modify: `components/sections/ContactSection.vue:1-1037`

**Step 1: Add animations**

```typescript
onMounted(() => {
  if (!import.meta.client) return

  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    $gsap.set(['.contact-hero', '.hero-stat', '.contact-content', '.info-card', '.office-card', '.form-group'], { opacity: 1, y: 0 })
    return
  }

  // Staggered reveal
  $animation?.revealUp?.('.contact-hero', { duration: 1 })
  $animation?.staggerReveal?.('.hero-stat', { stagger: 0.12 })
  $animation?.revealUp?.('.contact-content', { duration: 0.8 })
  $animation?.staggerReveal?.('.info-card', { stagger: 0.1 })
  $animation?.staggerReveal?.('.office-card', { stagger: 0.15 })
  $animation?.staggerReveal?.('.form-group', { stagger: 0.08 })

  // Hover effects
  document.querySelectorAll('.info-card').forEach((card) => {
    const cleanup = $animation?.hoverScale?.(card as HTMLElement, { scale: 1.02, duration: 0.3 })
    if (cleanup) cleanupFns.push(cleanup)
  })

  document.querySelectorAll('.office-card').forEach((card) => {
    const cleanup = $animation?.hoverScale?.(card as HTMLElement, { scale: 1.02, duration: 0.3 })
    if (cleanup) cleanupFns.push(cleanup)
  })
})
```

**Step 2: Run build**

Run: `bun run build`
Expected: No errors

**Step 3: Commit**

```bash
git add components/sections/ContactSection.vue
git commit -m "feat: add staggered animations to contact section"
```

---

### Task 10: Verify and Lint

**Files:**
- Run: `bun run lint`
- Run: `bun run typecheck`
- Run: `bun run build`

**Expected:**
- Lint: No errors
- Typecheck: No errors
- Build: Success

**Step 1: Run verification**

```bash
bun run lint && bun run typecheck && bun run build
```

**Step 2: Commit verification**

```bash
git commit -m "chore: verify animations with lint and build"
```

---

## Summary

**Total Tasks:** 10

**Animation Standards Applied:**
1. Viewport reveal animations (`revealUp`, `staggerReveal`)
2. Staggered list animations with configurable stagger values
3. Parallax background effects (`parallaxFlow`, `bgParallax`)
4. Hover micro-interactions (`hoverScale`, `hoverColor`)
5. Underline expansion animations for links
6. Consistent easing (`power3.out` for reveals, `power2.out` for hovers)
7. Reduced motion support via `shouldReduceMotion()` checks
8. ScrollTrigger integration for viewport detection

**Deliverables:**
- Extended GSAP plugin with standardized animation utilities
- Consistent animations across all 7 sections
- Navigation hover effects
- No CSS transitions (all GSAP-based for consistency)

**Plan complete and saved to `docs/plans/2026-01-15-gsap-animation-standardization.md`. Two execution options:**

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

**Which approach?**

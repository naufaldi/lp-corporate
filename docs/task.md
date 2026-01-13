# Nusantara Palm Industries Landing Page — Task List

**Project:** NPI Corporate Landing Page
**Working Directory:** `/Users/mac/WebApps/projects/lp-corporate`
**Tech Stack:** Nuxt 3 + Tailwind CSS v4 + GSAP + Jakarta Sans
**Last Updated:** January 2026

---

## Task Overview — Incremental Section Implementation

| Phase | Section | Tasks | Status |
|-------|---------|-------|--------|
| Phase 1-4 | Setup Complete | — | ✅ Done |
| Phase 5 | Hero Section | 6 tasks | ⏳ Pending |
| Phase 6 | Stats Section | 5 tasks | ⏳ Pending |
| Phase 7 | Sustainability Section | 5 tasks | ⏳ Pending |
| Phase 8 | Mission Section | 6 tasks | ⏳ Pending |
| Phase 9 | Geographic Section | 5 tasks | ⏳ Pending |
| Phase 10 | Product Section | 5 tasks | ⏳ Pending |
| Phase 11 | Contact Section | 5 tasks | ⏳ Pending |
| Phase 12 | Progress Indicator | 4 tasks | ⏳ Pending |
| Phase 13 | Image Assets | 5 tasks | ⏳ Pending |
| Phase 14 | Final Verification | 4 tasks | ⏳ Pending |
| **Total** | **14 Phases** | **~50 tasks** | |

---

## Phase 1-4: Setup Complete ✅

| Task | Status | Result |
|------|--------|--------|
| Initialize Nuxt 3 | ✅ | v3.20.2 with Bun v1.3.4 |
| Install Dependencies | ✅ | GSAP, VueUse, Tailwind v4, Google Fonts |
| Configuration | ✅ | nuxt.config.ts, main.css, GSAP plugin |
| Project Structure | ✅ | All directories + 7 section components |
| Jakarta Sans Font | ✅ | Configured via Google Fonts CDN |
| Tailwind v4 | ✅ | Verified with Nusantara Earth colors |
| Test Page | ✅ | Created at `/test` |
| .gitignore | ✅ | Created |

---

## Phase 5: Hero Section — Image-First Design

**Chosen Design:** Option 2 — Image-First Hero
**Background:** Unsplash plantation image with dark overlay
**Layout:** Full viewport, content overlay on left side
**Brand:** Nusantara Earth palette

---

### Task 5.1: Create NPI Logo SVG ✅ DONE
**File:** `components/ui/NpiLogo.vue`

**Logo Features:**
- Bold "NPI" geometric typography
- Subtle palm leaf accent (sienna + gold)
- Three size variants: sm (80px), md (120px), lg (200px)
- Two color variants: light (white), dark (Dark Coffee)
- Smooth hover animation on palm element
- Optional full name "NUSANTARA PALM OIL" for large size

**Usage:**
```vue
<!-- Light variant (white) -->
<NpiLogo variant="light" size="md" />

<!-- Dark variant -->
<NpiLogo variant="dark" size="lg" />
```

---

### Task 5.2: Create Navigation Component ✅ DONE
**File:** `components/AppNavigation.vue`

**Features:**
- Fixed position, sticky navigation
- Logo on left (clickable, scrolls to hero)
- Hamburger menu on right (mobile)
- Desktop: Horizontal menu with 6 nav items
- Mobile: Full-screen drawer menu
- Scroll-based background transition:
  - Transparent at top
  - Dark Coffee (#2c2416) with blur after 50px scroll
- Smooth hover effects on nav links
- Smooth scroll to section on click
- Aria labels for accessibility

**Navigation Items:**
- Stats → #stats
- Sustainability → #sustainability
- Mission → #mission
- Geographic → #geographic
- Product → #product
- Contact → #contact

---

### Task 5.3: Add Hero Background ✅ DONE
**File:** `components/sections/HeroSection.vue`

**Features:**
- Full viewport height (100vh), min 600px
- Background image with object-fit: cover
- Dark gradient overlay (linear-gradient)
- Parallax effect on scroll (GSAP)
- Responsive design (mobile adjustments)

---

### Task 5.4: Implement Hero Content ✅ DONE
**File:** `components/sections/HeroSection.vue`

**Content (from docs/profile.md):**
- Headline: "Sustainable Palm Oil for a Growing Asia" (split across 2 lines)
- Tagline: Full company overview paragraph (84 words)
- Typography: Jakarta Sans, responsive sizing (clamp())

---

### Task 5.5: Add CTA Button ✅ DONE
**Style:**
- Solid accent color (#d4a24c gold)
- Padding: 1rem 2rem
- Font: Jakarta Sans 600, 1.1rem
- Border radius: 4px (industrial feel)
- Hover: translateY(-2px), box-shadow
- Arrow icon SVG

**Behavior:**
- Scrolls to #stats section
- Smooth scroll behavior

---

### Task 5.6: Add Hero Animation ✅ DONE
**GSAP Entrance Animation Sequence:**
1. Background fade in (0.8s)
2. Overlay fade in (0.6s, delay -0.4s)
3. Content slide up (1s, delay -0.3s)

**Animation Classes:**
- `.hero-bg` - opacity fade
- `.hero-overlay` - opacity fade
- `.hero-content` - y translation + opacity

**Parallax:**
- Background moves at 30% speed on scroll
- Scrub enabled

---

### Task 5.7: Add Scroll Behavior ✅ DONE
**Navigation Transition:**
- Transparent at top
- Dark Coffee (#2c2416) + blur after 50px scroll
- Smooth transition (0.3s ease)

**Scroll Indicator:**
- Animated line at bottom
- Pulsing animation
- Hidden on mobile

---

## Phase 5: Hero Section — COMPLETE ✅

**Design:** Image-First Hero with Unsplash plantation image
**Status:** All tasks completed

---

### Completed Deliverables

| Task | Status | File |
|------|--------|------|
| 5.1 NPI Logo SVG | ✅ Done | `components/ui/NpiLogo.vue` |
| 5.2 Navigation Component | ✅ Done | `components/AppNavigation.vue` |
| 5.3 Hero Background | ✅ Done | `components/sections/HeroSection.vue` |
| 5.4 Hero Content | ✅ Done | `components/sections/HeroSection.vue` |
| 5.5 CTA Button | ✅ Done | `components/sections/HeroSection.vue` |
| 5.6 Hero Animation | ✅ Done | `components/sections/HeroSection.vue` |
| 5.7 Scroll Behavior | ✅ Done | `components/sections/HeroSection.vue` |
| 5.8 Placeholder Image | ✅ Done | `public/images/hero-plantation.svg` |

---

### What Was Created

**1. NPI Logo (`components/ui/NpiLogo.vue`)**
- Geometric "NPI" typography
- Palm leaf accent (sienna + gold)
- 3 sizes: sm (80px), md (120px), lg (200px)
- 2 variants: light (white), dark (Dark Coffee)
- Hover animation on palm element

**2. Navigation (`components/AppNavigation.vue`)**
- Fixed sticky header
- Logo on left (scrolls to hero)
- Desktop: Horizontal menu (6 items)
- Mobile: Hamburger + full-screen drawer
- Background transition on scroll (transparent → Dark Coffee)
- Smooth scroll to sections

**3. Hero Section (`components/sections/HeroSection.vue`)**
- Full viewport height (100vh)
- Background SVG placeholder (palm plantation scene)
- Dark gradient overlay for text readability
- Headline: "Sustainable Palm Oil for a Growing Asia"
- Tagline: Full company overview from profile.md
- CTA: "Explore Our Story" with arrow icon
- GSAP entrance animations (staggered reveal)
- Parallax effect on scroll
- Animated scroll indicator

**4. Placeholder Image (`public/images/hero-plantation.svg`)**
- SVG illustration of palm plantation
- Golden hour sky, plantation rows, palm silhouettes
- Ready to replace with Unsplash image later

**5. Updated Index Page (`pages/index.vue`)**
- Added AppNavigation component
- Section IDs for navigation linking

---

### Build Status

```
✅ Build: 1.88 MB (468 kB gzip)
✅ Nuxt 3.20.2
✅ All components compiling
✅ No errors
```

---

### Next Steps

**Phase 6: Stats Section**
- Asymmetric 60/40 split layout
- 4 stat cards with counter animations
- GSAP ScrollTrigger

**To test:**
```bash
bun run dev    # Development server
bun run build  # Production build
```

**Preview:** http://localhost:3000

---

### Hero Image

The placeholder SVG can be replaced with a real Unsplash image:

**Unsplash Search:**
- Keywords: "palm oil plantation aerial view Indonesia"
- Location: `public/images/hero-plantation.svg` (replace with .jpg and update component)

**Update Component:**
```vue
<!-- Change in HeroSection.vue -->
<img src="/images/hero-plantation.jpg" ... />
```

## Navigation Menu Items

1. Hero (current)
2. Stats
3. Sustainability
4. Mission
5. Geographic
6. Product
7. Contact

Each links to corresponding section with smooth scroll.

---

## Phase 5 Checklist

- [ ] 5.1 Create NPI Logo SVG
- [ ] 5.2 Create Navigation Component
- [ ] 5.3 Add Hero Background (Unsplash image + overlay)
- [ ] 5.4 Implement Hero Content (headline + tagline)
- [ ] 5.5 Add CTA Button ("Explore Our Story")
- [ ] 5.6 Add Hero Animation (GSAP entrance)
- [ ] 5.7 Add Scroll Behavior (parallax + nav transition)
- [ ] 5.8 Download Hero Image (Phase 13)

---

**Phase 5 Complete Criteria:**
- [ ] Logo renders correctly in navigation
- [ ] Hero section full viewport (100vh)
- [ ] Background image loads without artifacts
- [ ] Text readable against background
- [ ] CTA button prominent and clickable
- [ ] GSAP animation plays on page load
- [ ] Navigation transitions on scroll
- [ ] Mobile responsive (hamburger menu works)

---

## Phase 6: Stats Section

### Task 6.1: Layout Structure
- Asymmetric 60/40 split
- Left: Dark Coffee panel (stats)
- Right: Warm Cream panel (context)

### Task 6.2: Add 4 Stat Cards
From `docs/profile.md`:
- 380,000+ MT Annual Exports
- 85,000 Hectares
- 2,800+ Employees
- $280M+ Revenue

### Task 6.3: Add Stat Counter Animation
GSAP ScrollTrigger:
- Numbers count up when section visible
- Duration: 2 seconds
- Easing: power2.out

### Task 6.4: Add Context Text
From `docs/profile.md`:
- Brief company description paragraph

### Task 6.5: Add Section Animation
- Slide in from bottom on scroll
- Staggered stat reveal

---

## Phase 7: Sustainability Section

### Task 7.1: Layout Structure
- Asymmetric 40/60 split
- Left: Deep Teal (text)
- Right: Image (sustainability)

### Task 7.2: Add Certification Badges
Create SVG badges for:
- RSPO Certified (2019)
- ISCC EU Certified

**Style:** Consistent size, inline SVGs

### Task 7.3: Add Sustainability Content
From `docs/profile.md`:
- Zero-deforestation commitment
- 100% traceable supply chain
- 40% from certified sustainable sources
- Carbon footprint monitoring

### Task 7.4: Add Sustainability Image
Placeholder from Unsplash (to be replaced in Phase 13)

### Task 7.5: Add Section Animation
- Fade in on scroll
- Staggered badge reveal

---

## Phase 8: Mission Section

### Task 8.1: Layout Structure
- Diagonal split layout
- Left: Image (community/plantation)
- Right: Warm Cream (text)

### Task 8.2: Add Mission Statement
From `docs/profile.md`:
- Mission: "To secure Asia's palm oil supply..."

### Task 8.3: Add Vision Statement
From `docs/profile.md`:
- Vision: "To be Asia's most trusted sustainable palm oil partner..."

### Task 8.4: Add 5 Core Value Icons
Create inline SVG icons:
- Sustainability First
- Reliable Scale
- Innovation Driven
- Indonesian Pride
- Trade Excellence

### Task 8.5: Add Value Descriptions
From `docs/profile.md`:
- Each value with icon + description

### Task 8.6: Add Staggered Animation
GSAP animation:
- Values animate in sequence
- 0.1s stagger between each

---

## Phase 9: Geographic Section

### Task 9.1: Layout Structure
- Asymmetric 55/45 split
- Left: Deep Teal (locations)
- Right: Warm Cream (map)

### Task 9.2: Add Headquarters Info
From `docs/profile.md`:
- Jakarta, Indonesia (HQ)
- Singapore (Regional Office)

### Task 9.3: Add Plantation Regions
- Central Kalimantan
- Riau Province
- West Kalimantan

### Task 9.4: Add Export Markets
From `docs/profile.md`:
- Primary: China, India, Malaysia, Singapore
- Secondary: Vietnam, Thailand, Philippines

### Task 9.5: Add Map Visual
- Styled map or placeholder
- Map markers SVG

---

## Phase 10: Product Section

### Task 10.1: Layout Structure
- Asymmetric 45/55 split
- Left: Image (CPO)
- Right: Warm Cream (specs)

### Task 10.2: Add Product Name
From `docs/profile.md`:
- Crude Palm Oil (CPO)

### Task 10.3: Add Product Specs
From `docs/profile.md`:
- FFA: 2.5% max
- Quality details

### Task 10.4: Add Quality Badges
- Laboratory tested
- Export-grade

### Task 10.5: Add Product Image
Placeholder from Unsplash (to be replaced in Phase 13)

---

## Phase 11: Contact Section

### Task 11.1: Layout Structure
- Full-width
- Dark Coffee background

### Task 11.2: Add Contact Info
- Email, phone, address
- Jakarta HQ
- Singapore office

### Task 11.3: Add CTA Button
- "Partner With Us"
- Large, prominent

### Task 11.4: Add Footer
- Copyright
- Social links
- Certification badges

### Task 11.5: Add Final Animation
- Fade in on scroll

---

## Phase 12: Progress Indicator

### Task 12.1: Create Progress Component
Sticky dots on side:
- 7 dots (one per section)
- Active state highlighting

### Task 12.2: Implement Scroll Tracking
GSAP ScrollTrigger:
- Update active dot on scroll
- Smooth transitions

### Task 12.3: Add Click Navigation
- Click dot to scroll to section
- Smooth scroll behavior

### Task 12.4: Add Hide/Show Logic
- Hide on scroll up
- Show on scroll down

---

## Phase 13: Image Assets

### Task 13.1: Download Hero Image
**Keywords:** palm oil plantation, aerial view
**Location:** `public/images/hero-plantation.jpg`

### Task 13.2: Download Stats Image
**Keywords:** industrial, port, logistics
**Location:** `public/images/stats-industrial.jpg`

### Task 13.3: Download Sustainability Image
**Keywords:** forest, nature, sustainability
**Location:** `public/images/sustainability-nature.jpg`

### Task 13.4: Download Mission Image
**Keywords:** team, community, corporate
**Location:** `public/images/mission-community.jpg`

### Task 13.5: Download Product Image
**Keywords:** oil refinery, storage tanks
**Location:** `public/images/product-oil.jpg`

---

## Phase 14: Final Verification

### Task 14.1: Run Development Server
```bash
bun run dev
```
**Check:** All sections render correctly

### Task 14.2: Test All Animations
- Section reveals
- Stat counters
- Progress indicator
- Hover effects

### Task 14.3: Responsive Testing
- Mobile (< 768px)
- Tablet (768-1023px)
- Desktop (≥ 1024px)

### Task 14.4: Production Build
```bash
bun run build
```
**Check:** Build successful, no errors

---

## Quick Start Commands

```bash
# Development
bun run dev

# Build
bun run build

# Preview
bun run preview

# Type check
bun run typecheck

# Lint
bun run lint
```

---

## Current Progress

| Phase | Section | Status |
|-------|---------|--------|
| 1-4 | Setup Complete | ✅ |
| 5 | Hero Section | ✅ Complete |
| 6 | Stats Section | ⏳ Next |
| 7 | Sustainability Section | ⏳ Pending |
| 8 | Mission Section | ⏳ Pending |
| 9 | Geographic Section | ⏳ Pending |
| 10 | Product Section | ⏳ Pending |
| 11 | Contact Section | ⏳ Pending |
| 12 | Progress Indicator | ⏳ Pending |
| 13 | Image Assets | ⏳ Pending |
| 14 | Final Verification | ⏳ Pending |

---

## Reference Documents

| Document | Purpose |
|----------|---------|
| `docs/profile.md` | Company content and statistics |
| `docs/design-brief.md` | UX principles and section structure |
| `docs/color-schema.md` | Nusantara Earth color palette |
| `docs/layout.md` | Final layout specifications |
| `docs/rfc.md` | Technical stack and configuration |

---

*Next: Phase 5 — Hero Section*

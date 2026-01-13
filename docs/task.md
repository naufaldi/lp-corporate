# Nusantara Palm Industries Landing Page — Task List

**Project:** NPI Corporate Landing Page
**Working Directory:** `/Users/mac/WebApps/projects/lp-corporate`
**Tech Stack:** Nuxt 3 + Tailwind CSS v4 + GSAP + Jakarta Sans
**Last Updated:** January 2026

---

## Task Overview

| Phase | Tasks | Status |
|-------|-------|--------|
| Phase 1: Initialize | 5 tasks | ⏳ Pending |
| Phase 2: Dependencies | 4 tasks | ⏳ Pending |
| Phase 3: Configuration | 3 tasks | ⏳ Pending |
| Phase 4: Structure | 6 tasks | ⏳ Pending |
| Phase 5: Components | 8 tasks | ⏳ Pending |
| Phase 6: Assets | 5 tasks | ⏳ Pending |
| Phase 7: Implementation | 7 tasks | ⏳ Pending |
| Phase 8: Verification | 4 tasks | ⏳ Pending |
| **Total** | **42 tasks** | |

---

## Phase 1: Initialize Nuxt 3 Project

### Task 1.1: Initialize Nuxt in Current Directory
```bash
cd /Users/mac/WebApps/projects/lp-corporate
npx nuxi@latest init . --force --packageManager npm --gitInit false
```
**Verify:** `nuxt.config.ts` and `package.json` created

### Task 1.2: Verify Node.js Version
```bash
node --version
```
**Requirement:** v18.0.0 or higher (v20+ recommended)

### Task 1.3: Verify Nuxt Installation
```bash
npx nuxi --version
```
**Expected:** 3.17.7 or similar

### Task 1.4: Check Created Files
List files in directory:
```bash
ls -la
```
**Expected:** `.nuxt/`, `node_modules/`, `public/`, `app.vue`, `nuxt.config.ts`, `package.json`

### Task 1.5: Clean Up Default Files (Optional)
Remove or update default `app.vue` and `README.md` if needed

---

## Phase 2: Install Dependencies

### Task 2.1: Install GSAP
```bash
npm install gsap
```
**Verify:** `gsap` in package.json dependencies

### Task 2.2: Install VueUse
```bash
npm install @vueuse/nuxt @vueuse/core
```
**Verify:** `@vueuse/nuxt` and `@vueuse/core` in package.json

### Task 2.3: Install Google Fonts Module
```bash
npm install @nuxtjs/google-fonts
```
**Verify:** `@nuxtjs/google-fonts` in package.json

### Task 2.4: Install Tailwind CSS v4 Vite Plugin
```bash
npm install -D @tailwindcss/vite
```
**Verify:** `@tailwindcss/vite` in package.json devDependencies

---

## Phase 3: Configure Nuxt 3

### Task 3.1: Update nuxt.config.ts
Replace contents with configuration for:
- Tailwind CSS v4 via Vite plugin
- Jakarta Sans font via Google Fonts
- GSAP client plugin
- SEO meta tags
- Page transitions

**File:** `nuxt.config.ts`

### Task 3.2: Create Global CSS File
Create `assets/css/main.css` with:
- Tailwind CSS v4 import
- Nusantara Earth color palette
- Jakarta Sans font family
- Base styles and transitions

**File:** `assets/css/main.css`

### Task 3.3: Create GSAP Plugin
Create `plugins/gsap.client.ts` to:
- Import gsap and ScrollTrigger
- Register ScrollTrigger plugin
- Provide gsap and ScrollTrigger to app

**File:** `plugins/gsap.client.ts`

---

## Phase 4: Create Project Structure

### Task 4.1: Create Assets Directories
```bash
mkdir -p assets/css assets/images
```

### Task 4.2: Create Plugins Directory
```bash
mkdir -p plugins
```

### Task 4.3: Create Components Directories
```bash
mkdir -p components/sections components/ui
```

### Task 4.4: Create Layouts Directory
```bash
mkdir -p layouts
```

### Task 4.5: Create Pages Directory
```bash
mkdir -p pages
```

### Task 4.6: Create Supporting Directories
```bash
mkdir -p composables public/images types
```

---

## Phase 5: Create Base Components

### Task 5.1: Update app.vue
Replace with NuxtPage component

**File:** `app.vue`

### Task 5.2: Create layouts/default.vue
Create default layout wrapper with basic structure

**File:** `layouts/default.vue`

### Task 5.3: Create pages/index.vue
Create main single-page entry point

**File:** `pages/index.vue`

### Task 5.4: Create HeroSection.vue
Create placeholder Hero section component

**File:** `components/sections/HeroSection.vue`

### Task 5.5: Create StatsSection.vue
Create placeholder Stats section component

**File:** `components/sections/StatsSection.vue`

### Task 5.6: Create SustainabilitySection.vue
Create placeholder Sustainability section component

**File:** `components/sections/SustainabilitySection.vue`

### Task 5.7: Create MissionSection.vue
Create placeholder Mission section component

**File:** `components/sections/MissionSection.vue`

### Task 5.8: Create Remaining Section Components
Create placeholders for:
- `GeographicSection.vue`
- `ProductSection.vue`
- `ContactSection.vue`

**Files:** `components/sections/{Geographic,Product,Contact}Section.vue`

---

## Phase 6: Create SVG Assets

### Task 6.1: Create Icon Component
Create reusable Icon.vue component with Jakarta Sans integration

**File:** `components/ui/Icon.vue`

### Task 6.2: Create Core Value Icons
Create SVG icons for 5 core values:
- Sustainability (leaf/eco icon)
- Reliable Scale (chart/growth icon)
- Innovation Driven (lightbulb/tech icon)
- Indonesian Pride (map/Indonesia icon)
- Trade Excellence (globe/handshake icon)

**Icons:** Inline in components or separate SVG files

### Task 6.3: Create Certification Badges
Create SVG representations for:
- RSPO Certified badge
- ISCC EU Certified badge

**Style:** Consistent size, clean design

### Task 6.4: Create Company Logo (NPI)
Create NPI wordmark SVG for:
- Navigation header
- Footer
- Favicon

**Style:** Modern, industrial, using Nusantara Earth colors

### Task 6.5: Create Map Markers
Create custom map marker icons for geographic section

**Style:** Consistent with brand, using accent color

---

## Phase 7: Implement Sections

### Task 7.1: Implement Hero Section
- Full-width background
- Jakarta Sans headlines
- CTA button with hover animation
- Navigation menu

**Content:** Tagline from docs/profile.md

### Task 7.2: Implement Stats Section
- Asymmetric 60/40 split
- 4 stat cards with counter animations (GSAP)
- Background colors (Dark Coffee panel)
- Jakarta Sans typography

**Stats:** 380,000+ MT, 85,000 ha, 2,800+ employees, $280M+

### Task 7.3: Implement Sustainability Section
- Asymmetric 40/60 split
- Certification badges (RSPO, ISCC)
- Sustainability claims
- Scroll reveal animation (GSAP)

### Task 7.4: Implement Mission Section
- Diagonal split layout
- Mission and Vision statements
- 5 core values with icons
- Staggered icon animation (GSAP)

### Task 7.5: Implement Geographic Section
- Asymmetric 55/45 split
- Location groups (HQ, Plantations, Markets)
- Interactive map markers or styled map
- Scroll-triggered reveal

### Task 7.6: Implement Product Section
- Asymmetric 45/55 split
- Product specs (CPO, FFA 2.5% max)
- Quality details
- Product image

### Task 7.7: Implement Contact Section
- Full-width with 70/30 internal split
- Contact information
- CTA button
- Footer with copyright

---

## Phase 8: Add Image Assets

### Task 8.1: Source Hero Image
**Keywords:** palm oil plantation, aerial view
**Source:** Unsplash
**Location:** `public/images/hero-plantation.jpg`

### Task 8.2: Source Stats Image
**Keywords:** industrial, port, logistics
**Source:** Unsplash
**Location:** `public/images/stats-industrial.jpg`

### Task 8.3: Source Sustainability Image
**Keywords:** forest, nature, sustainability
**Source:** Unsplash
**Location:** `public/images/sustainability-nature.jpg`

### Task 8.4: Source Mission Image
**Keywords:** team, community, corporate
**Source:** Unsplash
**Location:** `public/images/mission-community.jpg`

### Task 8.5: Source Product Image
**Keywords:** oil refinery, storage tanks
**Source:** Unsplash
**Location:** `public/images/product-oil.jpg`

---

## Phase 9: Add Interactions & Animations

### Task 9.1: Implement Progress Indicator
- Sticky dots on side
- Highlights current section
- Updates on scroll (GSAP ScrollTrigger)

### Task 9.2: Implement Section Reveals
- Fade/slide in as sections enter viewport
- Staggered animations for multiple elements
- GSAP ScrollTrigger integration

### Task 9.3: Implement Stat Counter Animations
- Numbers count up when visible
- 380,000+, 85,000, 2,800+, $280M+
- GSAP text animation

### Task 9.4: Implement Parallax Effects
- Subtle image movement on scroll
- Apply to hero and section backgrounds
- GSAP ScrollTrigger

### Task 9.5: Implement Value Icons Animation
- Staggered animation of 5 core values
- Icons animate in sequence
- GSAP stagger effect

### Task 9.6: Implement Diagonal Clip Animation
- Animate asymmetric section transitions
- Diagonal clip paths
- GSAP animation

### Task 9.7: Implement Hover Effects
- CTA buttons: scale, shadow
- Navigation dots: size, opacity
- Cards: border, shadow

---

## Phase 10: Verification & Testing

### Task 10.1: Run Development Server
```bash
npm run dev
```
**Check:** Server starts at http://localhost:3000 without errors

### Task 10.2: Verify Tailwind CSS
- Check color palette applies correctly
- Check Jakarta Sans loads properly
- Check responsive breakpoints work

### Task 10.3: Verify GSAP Animations
- Check scroll-triggered animations work
- Check stat counters animate correctly
- Check hover effects respond

### Task 10.4: Run TypeScript Check
```bash
npm run typecheck
```
**Check:** No TypeScript errors

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

## Quick Start Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview

# Type check
npm run typecheck

# Lint
npm run lint
```

---

## Task Tracking

Use this table to mark progress:

| Task | Status | Notes |
|------|--------|-------|
| 1.1 Initialize Nuxt | ⬜ | |
| 1.2 Check Node.js | ⬜ | |
| 1.3 Verify Nuxt | ⬜ | |
| 1.4 Check Files | ⬜ | |
| 1.5 Clean Up | ⬜ | |
| 2.1 Install GSAP | ⬜ | |
| 2.2 Install VueUse | ⬜ | |
| 2.3 Install Fonts | ⬜ | |
| 2.4 Install Tailwind | ⬜ | |
| 3.1 Config Nuxt | ⬜ | |
| 3.2 Create CSS | ⬜ | |
| 3.3 Create GSAP Plugin | ⬜ | |
| 4.1 Assets Dirs | ⬜ | |
| 4.2 Plugins Dir | ⬜ | |
| 4.3 Components Dirs | ⬜ | |
| 4.4 Layouts Dir | ⬜ | |
| 4.5 Pages Dir | ⬜ | |
| 4.6 Support Dirs | ⬜ | |
| 5.1 Update app.vue | ⬜ | |
| 5.2 Create Layout | ⬜ | |
| 5.3 Create Index | ⬜ | |
| 5.4-5.8 Sections | ⬜ | |
| 6.1 Icon Component | ⬜ | |
| 6.2-6.5 SVG Assets | ⬜ | |
| 7.1-7.7 Implement Sections | ⬜ | |
| 8.1-8.5 Image Assets | ⬜ | |
| 9.1-9.7 Animations | ⬜ | |
| 10.1-10.4 Verification | ⬜ | |

---

*Ready to execute. Start with Phase 1.*

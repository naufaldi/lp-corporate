# Nusantara Palm Industries — Landing Page Design Brief

**Document Version:** 1.1 (UX-Enhanced)
**Last Updated:** January 2026
**Project Type:** Single-page corporate portfolio site

---

## Overview

Single-page landing page showcasing Nusantara Palm Industries (NPI), Indonesia's leading sustainable palm oil exporter. Focus on scale, sustainability, and Asian market presence. Designed for portfolio demonstration with modern industrial aesthetic.

---

## Brand Identity

- **Company Name:** Nusantara Palm Industries (NPI)
- **Tagline:** "Sustainable Palm Oil for a Growing Asia"
- **Visual Style:** Modern Industrial
- **Color Palette:** Dark industrial (#1a1a2e), metallic accents (copper/gold), green sustainability tones, industrial grays
- **Typography:** Bold sans-serif (Inter or Roboto)

---

## UX Principles Applied

### Aesthetic-Usability Effect
- Clean, consistent spacing throughout (consistent gap, padding values)
- Clear typography hierarchy (headings larger/semibold, body readable)
- Visual cues: subtle shadows, border separators between sections
- Professional appearance increases perceived usability

### Hick's Law
- Reduce visible options at each scroll point
- Simple navigation (hamburger menu, single CTA per section)
- Complex content chunked into digestible panels

### Fitts's Law
- CTA buttons: large, prominent, easy to tap/click
- No tiny icon-only targets without spacing
- Primary actions visually distinct from secondary

### Law of Proximity
- Related content grouped within sections
- Numbers and labels grouped in Statistics section
- Values with icons visually bundled
- Geographic elements (HQ, regions, markets) in logical clusters

### Zeigarnik Effect
- Sticky scroll progress indicator showing current section
- Users see how much content remains, encouraging completion
- Visual feedback on section transitions

### Goal-Gradient Effect
- Primary CTA "Explore Our Story" guides to next section
- Section indicator emphasizes scroll progress
- Clear final CTA in Contact section

### Law of Similarity
- Consistent button styling across all sections
- Uniform icon sizing and spacing
- Repeated split-layout pattern creates visual rhythm
- Certification badges same size/style throughout

### Miller's Law
- Content chunked into 8 distinct sections
- Each section presents focused, manageable information
- No overwhelming content density per section

### Doherty Threshold
- CSS-only smooth scroll for sub-400ms response
- Lazy-load images with placeholder
- No blocking JavaScript on initial load
- Immediate visual feedback on scroll

### Jakob's Law (Adapted)
- Familiar vertical scroll pattern
- Standard navigation placement (logo left, menu right)
- Expected content order (hero → stats → details → contact)

---

## UX Requirements

- Single-page scroll with full-viewport sections
- Keyboard navigation support (arrow keys, tab)
- Sticky scroll progress indicator (Zeigarnik Effect)
- Smooth CSS transitions between sections
- Large, prominent CTA buttons (Fitts's Law)
- Mobile-responsive (split layouts stack, CTAs remain large)
- Performance-optimized (lazy-load, CSS transitions)
- Loading states for any dynamic content
- Sufficient color contrast (WCAG AA minimum)

---

## Section Structure

### 1. Hero
- **Layout:** Full-width immersive background
- **Content:** Logo (top-left), Headline, Tagline, CTA Button, Hamburger Menu (top-right)
- **UX Notes:** Large CTA button, immediate visual hierarchy, familiar placement
- **Action:** "Explore Our Story" scrolls to Section 2

### 2. Key Statistics
- **Layout:** Split (50/50), viewport-height
- **Left Panel (Dark):** Bold typographic numbers with clear labels
  - 380,000+ MT Annual Exports
  - 85,000 Hectares
  - 2,800+ Employees
  - $280M+ Revenue
- **Right Panel:** Brief context paragraph
- **UX Notes:** Chunked numbers (Miller's Law), large contrast for attention

### 3. Sustainability
- **Layout:** Split (50/50), viewport-height
- **Content:** Certification badges (RSPO, ISCC), key sustainability claims
- **UX Notes:** Visual grouping of certifications, consistent badge sizing

### 4. Mission & Vision
- **Layout:** Split (50/50), viewport-height
- **Content:** Mission statement, Vision statement, 5 Core Values with icons
- **UX Notes:** icons (Law of Values grouped with Proximity), similar styling

### 5. Geographic Presence
- **Layout:** Split (50/50), viewport-height
- **Content:** HQ location, Regional Office, Plantation Regions, Export Markets
- **UX Notes:** Related locations grouped, markets clearly separated into Primary/Secondary

### 6. Product Overview
- **Layout:** Split (50/50), viewport-height
- **Content:** Product specs (CPO, FFA 2.5% max), quality details
- **UX Notes:** Specs chunked, easy to scan

### 7. Contact
- **Layout:** Full-width, viewport-height
- **Content:** Contact info, CTA button, footer
- **UX Notes:** Final CTA prominent, easy to locate contact options

---

## Navigation & Interactions

### Progress Indicator
- Sticky bar or dots on side showing current section
- Visual feedback as user scrolls
- Encourages completion (Zeigarnik Effect)

### Scroll Behavior
- CSS smooth scroll for anchor links
- No jarring transitions
- Subtle parallax on hero background

### CTA Buttons
- Primary: Solid accent color, large padding, prominent placement
- Secondary: Outlined or subtle, smaller but clickable
- Hover states with visual feedback

### Mobile Considerations
- Split layouts stack vertically
- CTAs remain large and thumb-accessible
- Navigation collapses to hamburger menu
- Touch-friendly scroll indicators

---

## Content Summary

- **Established:** 2015
- **Annual Exports:** 380,000+ MT
- **Plantation Area:** 85,000 hectares
- **Workforce:** 2,800+
- **Revenue:** USD 280+ million
- **Certifications:** RSPO (2019), ISCC EU
- **Markets:** China, India, Malaysia, Singapore, Vietnam, Thailand, Philippines

---

## Technical Implementation

- **Stack:** Plain HTML/CSS/JS (content-first)
- **CSS Approach:** CSS variables for consistent spacing, colors, typography
- **Scroll:** CSS scroll-behavior: smooth
- **Loading:** Lazy-load images, skeleton placeholders if needed
- **Accessibility:** ARIA labels, keyboard navigation, focus states, contrast ratios
- **Responsive:** Mobile-first breakpoints, stacked layouts on < 768px

---

## Deliverables

- Single HTML file with embedded or linked CSS/JS
- Optimized imagery assets
- Responsive, accessible, performant code
- Compliance with all UX laws above

---

## UX Law Reference

| Law | Application |
|-----|-------------|
| Aesthetic-Usability Effect | Clean spacing, typography hierarchy, visual polish |
| Hick's Law | Minimal options, simple navigation |
| Fitts's Law | Large CTAs, clickable targets |
| Law of Proximity | Grouped content sections |
| Zeigarnik Effect | Scroll progress indicator |
| Goal-Gradient Effect | Clear CTAs, progress visualization |
| Law of Similarity | Consistent button/icon styles |
| Miller's Law | Chunked sections (8 total) |
| Doherty Threshold | CSS-only smooth scroll, fast load |
| Jakob's Law | Familiar scroll pattern, standard placement |

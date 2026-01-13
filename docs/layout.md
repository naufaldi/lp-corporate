# Nusantara Palm Industries — Final Layout Specification

**Document Version:** 1.0
**Chosen Layout:** Layout 2 — Asymmetric Dynamic
**Last Updated:** January 2026

---

## Overview

Final confirmed layout for NPI landing page: **Asymmetric Dynamic** with **full-viewport height sections**.

Combines creative visual interest with portfolio-worthy design while maintaining professional credibility.

---

## Section Height Standard

| Section | Height |
|---------|--------|
| Hero | 100vh (full viewport) |
| Key Statistics | 100vh (minimum, scrollable if content exceeds) |
| Sustainability | 100vh (minimum, scrollable if content exceeds) |
| Mission & Vision | 100vh (minimum, scrollable if content exceeds) |
| Geographic Presence | 100vh (minimum, scrollable if content exceeds) |
| Product Overview | 100vh (minimum, scrollable if content exceeds) |
| Contact | 80vh minimum |

**Key Principle:** Each section fills the viewport for the "full-screen" experience. Content exceeding viewport scrolls within the section.

---

## Asymmetric Split Ratios

| Section | Left Panel | Right Panel |
|---------|------------|-------------|
| Hero | Full-width (not split) | Full-width (not split) |
| Key Statistics | 60% | 40% |
| Sustainability | 40% | 60% |
| Mission & Vision | 50% (diagonal split) | 50% (diagonal split) |
| Geographic Presence | 55% | 45% |
| Product Overview | 45% | 55% |
| Contact | Full-width with 70/30 internal | Full-width with 70/30 internal |

**Design Note:** Ratios alternate to create visual rhythm — never use the same split twice.

---

## Section Specifications Summary

### 1. Hero Section
- **Height:** 100vh
- **Background:** Diagonal split — 70% Burnt Sienna (#c45b28), 30% Deep Teal (#2a5c55)
- **Content:** Left-aligned, 80px left padding
- **Elements:** Logo (top-left), Hamburger nav (top-right), H1 headline, Tagline, CTA button

### 2. Key Statistics Section
- **Height:** 100vh (minimum)
- **Left Panel (60%):** Dark Coffee background, 4 stats in 2x2 grid
- **Right Panel (40%):** Warm Cream background, extended context + small image
- **Key Stats:** 380,000+ MT exports, 85,000 hectares, 2,800+ employees, $280M+ revenue

### 3. Sustainability Section
- **Height:** 100vh (minimum)
- **Left Panel (40%):** Deep Teal background, title + body + certification row
- **Right Panel (60%):** Image with 30% teal overlay
- **Certifications:** RSPO, ISCC, Traceable, Carbon Monitor

### 4. Mission & Vision Section
- **Height:** 100vh (minimum)
- **Split:** 50/50 with diagonal clip path on left panel
- **Left Panel:** Image with 30% Dark Coffee overlay
- **Right Panel:** Warm Cream, Mission block, Vision block, 5 values with icons

### 5. Geographic Presence Section
- **Height:** 100vh (minimum)
- **Left Panel (55%):** Deep Teal background, larger stylized map with interactive markers
- **Right Panel (45%):** Warm Cream, location details in card format (HQ, Plantations, Markets)

### 6. Product Overview Section
- **Height:** 100vh (minimum)
- **Left Panel (45%):** Product imagery edge-to-edge
- **Right Panel (55%):** Warm Cream, product name, specs table (2x2 grid), quality notes

### 7. Contact Section
- **Height:** 80vh minimum
- **Layout:** Left 70% content, Right 30% Deep Teal accent
- **Content:** Headline, subhead, contact grid (email, phone, address), CTA button, footer

---

## Visual Interest Elements

- **Diagonal Cuts:** 15-30 degree angles on section transitions
- **Alternating Ratios:** 60/40 → 40/60 → 55/45 → 45/55
- **Hover Effects:** Scale 1.02, shadow increase on interactive elements
- **Parallax:** Subtle (10-20% scroll speed difference on images)
- **Micro-animations:** Fade-in on scroll, icon animations

---

## Color Application (Nusantara Earth)

| Element | Color | Hex |
|---------|-------|-----|
| Hero Background Left | Burnt Sienna | #c45b28 |
| Hero Background Right | Deep Teal | #2a5c55 |
| Primary Headers | Burnt Sienna | #c45b28 |
| Secondary Sections | Deep Teal | #2a5c55 |
| CTA Buttons | Burnt Sienna | #c45b28 |
| Accents/Icons | Harvest Gold | #d4a24c |
| Dark Panels | Dark Coffee | #2c2416 |
| Backgrounds | Warm Cream | #f5f0e8 |
| Text | Dark Coffee | #2c2416 |

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Desktop (≥1024px) | Full asymmetric splits |
| Tablet (768-1023px) | 2-column grid, reduced gaps |
| Mobile (<768px) | Single column, stacked sections |

**Mobile Notes:**
- All split sections become stacked (content above image or vice versa)
- Diagonal cuts flatten to straight edges
- Card-based layouts for geographic and product sections
- CTA buttons remain large (minimum 48px height)

---

## Navigation & Interactions

- **Progress Indicator:** Sticky side dots showing current section
- **Scroll:** CSS scroll-behavior: smooth
- **Transitions:** 0.3s ease on hover states
- **Keyboard:** Arrow keys, Tab navigation supported

---

## Implementation Order

1. HTML skeleton with all 7 sections
2. CSS variables for colors, spacing, typography
3. Full-viewport height sections with min-height
4. Asymmetric split layouts using CSS Grid/Flexbox
5. Responsive breakpoints
6. Scroll progress indicator
7. Hover states and micro-interactions
8. Accessibility (ARIA, focus states, contrast)

---

## Reference Documents

- **Content:** docs/profile.md
- **UX Principles:** docs/design-brief.md
- **Color Palette:** docs/color-schema.md
- **Full Specifications:** docs/layout-spec.md

---

*Ready for implementation.*

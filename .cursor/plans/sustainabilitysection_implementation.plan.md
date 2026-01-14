# SustainabilitySection Implementation Plan

**Document Version:** 1.0  
**Created:** January 2026  
**Status:** Ready for Execution

---

## Overview

Create a professional sustainability section for Nusantara Palm Industries following the IOI Group reference, company profile, UI/UX laws, and Nusantara Earth color palette with full-viewport height layout.

---

## Layout Specifications (from docs/layout.md)

### Section Height Standard
- **Height:** 100vh (minimum), scrollable if content exceeds
- **Split Ratio:** 40% Left Panel / 60% Right Panel

### Panel Details
- **Left Panel (40%):** Deep Teal background (#2a5c55), title + body + certification row
- **Right Panel (60%):** Image with 30% teal overlay
- **Certifications:** RSPO, ISCC, Traceable, Carbon Monitor

### Visual Interest Elements
- Diagonal cuts on section transitions
- Alternating ratios (40/60 for this section)
- Subtle parallax on image panel (10-20% scroll speed difference)
- Fade-in animations on scroll
- Hover effects: Scale 1.02, shadow increase

---

## Content Strategy (from Profile)

### Headline
**"Sustainability is Core to Our Mission"**

### Subheader
**"FOR THE PEOPLE, PLANET, PROSPERITY & PARTNERSHIP"**

### Body Text
Company mission statement about sustainable operations, zero-deforestation commitment, and impact on employees, communities, and environment.

### Credentials to Highlight
- RSPO Certified (since 2019)
- ISCC EU Certified
- 100% Traceable Supply Chain
- 40% Production from Certified Sustainable Sources
- Carbon Footprint Monitoring

### CTAs
- "Define Our Sustainability"
- "Our Journey to Net Zero by 2040"

---

## Color Palette (Nusantara Earth)

| Element | Color | Hex |
|---------|-------|-----|
| Left Panel Background | Deep Teal | #2a5c55 |
| Image Overlay | Deep Teal (30% opacity) | rgba(42, 92, 85, 0.3) |
| Primary Headers | Burnt Sienna | #c45b28 |
| CTA Buttons | Burnt Sienna | #c45b28 |
| Accents/Icons | Harvest Gold | #d4a24c |
| Body Text | Dark Coffee | #2c2416 |
| Panel Text | White | #ffffff |

---

## Visual Design (UI/UX Laws)

### Visual Hierarchy
1. Headline (largest, primary)
2. Image panel (right, visual impact)
3. Body text (readable, max-width constrained)
4. Credentials row (icons + labels)
5. Secondary CTAs (clear but secondary treatment)

### Key UX Principles Applied
- **Aesthetic-Usability Effect:** Clean spacing, typography hierarchy, subtle shadows
- **Hick's Law:** Reduced options, clear primary CTA
- **Fitts's Law:** Large, accessible buttons (min 48px touch targets)
- **Law of Proximity:** Grouped content (text, credentials, CTAs)
- **Contrast:** Strong text readability, clear visual hierarchy

### Typography Scale
- Hero/Headline: text-2xl to text-3xl, font-bold
- Subheader: text-xs to text-sm, uppercase, tracking-wide
- Body: text-base, readable line-height (1.7)
- Credentials Labels: text-sm, medium weight

### Spacing
- Section padding: py-0 (full viewport height)
- Panel padding: p-12 to p-16
- Content gap: gap-8
- Card padding: p-6 to p-8

---

## Component Architecture

### File to Create
- `components/sections/SustainabilitySection.vue`

### Template Structure

```vue
<section id="sustainability" class="sustainability-section">
  <div class="sustainability-container">
    <!-- Left Panel (40%) -->
    <div class="sustainability-panel sustainability-panel--left">
      <div class="sustainability-content">
        <span class="sustainability-subheader">EESG Framework</span>
        <h2 class="sustainability-headline">Sustainability is Core to Our Mission</h2>
        <p class="sustainability-body">
          We drive innovation across our operations by adopting best agricultural practices 
          and integrating strong sustainability measures that create impactful benefits 
          for our employees, communities and the environment.
        </p>
        
        <!-- Credentials Row -->
        <div class="sustainability-credentials">
          <!-- RSPO -->
          <div class="sustainability-credential">
            <div class="sustainability-credential__icon">R</div>
            <span>RSPO Certified</span>
          </div>
          <!-- ISCC -->
          <div class="sustainability-credential">
            <div class="sustainability-credential__icon">I</div>
            <span>ISCC EU Certified</span>
          </div>
          <!-- Traceable -->
          <div class="sustainability-credential">
            <div class="sustainability-credential__icon">T</div>
            <span>100% Traceable</span>
          </div>
          <!-- Carbon -->
          <div class="sustainability-credential">
            <div class="sustainability-credential__icon">C</div>
            <span>Carbon Monitor</span>
          </div>
        </div>
        
        <!-- CTAs -->
        <div class="sustainability-ctas">
          <button class="sustainability-cta sustainability-cta--primary">
            Define Our Sustainability
          </button>
          <button class="sustainability-cta sustainability-cta--secondary">
            Our Journey to Net Zero by 2040
          </button>
        </div>
      </div>
    </div>
    
    <!-- Right Panel (60%) -->
    <div class="sustainability-panel sustainability-panel--right">
      <div class="sustainability-image-wrapper">
        <img 
          src="/images/oil-palm.jpg" 
          alt="Sustainable palm oil plantation in Indonesia"
          class="sustainability-image"
          @error="onImageError"
        />
        <div class="sustainability-image__overlay"></div>
      </div>
    </div>
  </div>
</section>
```

### Script Features
- GSAP entrance animations (fade in, slide up)
- Parallax scrolling on image panel
- Image error handling
- Smooth scroll navigation to next section

### Styling
- Scoped CSS following BEM naming
- Responsive design (mobile: stacked, desktop: 40/60 split)
- Hover states for CTAs
- Performance-optimized animations
- Full viewport height with overflow handling

---

## Implementation Tasks

### Task 1: Create Section Structure
- [ ] Set up 100vh section container
- [ ] Create 40/60 split layout using CSS Grid
- [ ] Implement left panel with Deep Teal background
- [ ] Implement right panel with image and overlay

### Task 2: Implement Content
- [ ] Add subheader "EESG Framework"
- [ ] Add headline "Sustainability is Core to Our Mission"
- [ ] Add body text from company profile
- [ ] Create credentials row with 4 certifications
- [ ] Add CTA buttons with proper styling

### Task 3: Add Animations
- [ ] Implement GSAP entrance animations
- [ ] Add parallax effect on image panel
- [ ] Add hover effects on CTAs and credentials
- [ ] Ensure smooth scrolling behavior

### Task 4: Apply Styles
- [ ] Apply Nusantara Earth color palette
- [ ] Implement responsive breakpoints
- [ ] Add hover states and micro-interactions
- [ ] Ensure accessibility (contrast, focus states)

### Task 5: Verify Implementation
- [ ] Run `bun run lint` to check for errors
- [ ] Run `bun run build` to verify build success
- [ ] Test responsive behavior at all breakpoints
- [ ] Verify accessibility compliance

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Desktop (≥1024px) | 40/60 asymmetric split |
| Tablet (768-1023px) | 2-column grid, reduced gaps |
| Mobile (<768px) | Stacked, content above image |

**Mobile Notes:**
- Left panel (content) appears above right panel (image)
- CTA buttons remain large (minimum 48px height)
- Diagonal cuts flatten to straight edges
- Credentials may wrap to 2x2 grid

---

## Reference Documents

- Content: `docs/profile.md`
- Color Palette: `docs/color-schema.md`
- Layout: `docs/layout.md`
- UI Laws: `.cursor/skills/ui-law/SKILL.md`
- UX Laws: `.cursor/skills/ux-law/SKILL.md`
- Reference Image: `assets/images/suistanability.png`

---

*Ready for implementation.*

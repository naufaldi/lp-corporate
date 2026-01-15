<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useNuxtApp } from '#app'
import FlowParticles from '~/components/ui/FlowParticles.vue'

const { $gsap, $animation } = useNuxtApp()

const scrollToStats = () => {
  const statsSection = document.querySelector('#stats')
  if (statsSection) {
    statsSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const onImageLoad = () => {
  $gsap.to('.hero-bg', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    yPercent: 20,
    ease: 'none'
  })
}

const onImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
}

let cleanupFns: Array<() => void> = []

onMounted(() => {
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    $gsap.set(['.hero-bg', '.hero-overlay', '.hero-content', '.hero-cta-group', '.scroll-indicator'], { opacity: 1 })
    return
  }

  const tl = $gsap.timeline()

  tl.set('.hero-bg', { opacity: 0 })
  tl.set('.hero-overlay', { opacity: 0 })
  tl.set('.hero-content', { opacity: 0, y: 40 })
  tl.set('.hero-cta-group', { opacity: 0, y: 20 })
  tl.set('.scroll-indicator', { opacity: 0 })

  tl.to('.hero-bg', {
    opacity: 1,
    duration: 1.2,
    ease: 'power2.out'
  })
  .to('.hero-overlay', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.6')

  tl.from('.hero-line', {
    scaleX: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.4')

  tl.to('.hero-content', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.3')

  tl.to('.hero-cta-group', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.5')

  tl.to('.scroll-indicator', {
    opacity: 1,
    duration: 0.5,
    ease: 'power2.out'
  }, '-=0.2')

  const cleanupHover = $animation?.hoverScale?.('.hero-cta', { scale: 1.03, duration: 0.3 })
  const cleanupMagnetic = $animation?.magneticButton?.('.hero-cta', { strength: 20, duration: 0.25 })
  
  if (cleanupHover) cleanupFns.push(cleanupHover)
  if (cleanupMagnetic) cleanupFns.push(cleanupMagnetic)

  $animation?.parallaxFlow?.('.hero-bg', { speed: 0.15, direction: 'left', scrub: true })

  $gsap.to('.floating-particle', {
    y: -40,
    rotation: 360,
    duration: 12,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: {
      each: 1.5,
      from: 'random'
    }
  })
})

onUnmounted(() => {
  cleanupFns.forEach(fn => fn && typeof fn === 'function' && fn())
})
</script>

<template>
  <section id="hero" class="hero-section">
    <div class="hero-bg">
      <img
        src="/images/oil-palm.jpg"
        alt="Palm oil plantation in Indonesia - aerial view"
        class="hero-bg__image"
        @load="onImageLoad"
        @error="onImageError"
      />
    </div>

    <div class="hero-overlay">
      <div class="overlay-noise"></div>
      <div class="overlay-gradient"></div>
      <div class="overlay-vignette"></div>
      <FlowParticles 
        :count="6" 
        color="#e6b84d" 
        speed="medium" 
        direction="right"
        size="small"
        :opacity="0.3"
      />
      <div class="floating-particles">
        <div class="particle particle-1 floating-particle"></div>
        <div class="particle particle-2 floating-particle"></div>
        <div class="particle particle-3 floating-particle"></div>
        <div class="particle particle-4 floating-particle"></div>
      </div>
    </div>

    <div class="hero-content">
      <div class="content-wrapper">
        <div class="hero-line"></div>

        <span class="hero-badge">
          <span class="badge-dot"></span>
          Indonesia's Leading Sustainable Palm Oil Exporter
        </span>

        <h1 class="hero-headline">
          Sustainable Palm Oil
          <span class="headline-accent">for a Growing Asia</span>
        </h1>

        <p class="hero-tagline">
          Nusantara Palm Industries operates an integrated enterprise delivering high-quality 
          crude palm oil to Asian markets. We combine sustainability with scale and reliability, 
          establishing a complete supply chain from plantation to port.
        </p>

        <div class="hero-cta-group">
          <button class="hero-cta" @click="scrollToStats">
            <span>Explore Our Story</span>
            <svg class="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

          <div class="hero-stats-mini">
            <div class="mini-stat">
              <span class="mini-value">450K</span>
              <span class="mini-label">MT Capacity</span>
            </div>
            <div class="mini-divider"></div>
            <div class="mini-stat">
              <span class="mini-value">15+</span>
              <span class="mini-label">Years</span>
            </div>
            <div class="mini-divider"></div>
            <div class="mini-stat">
              <span class="mini-value">4</span>
              <span class="mini-label">Markets</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="scroll-indicator">
      <div class="scroll-line">
        <div class="scroll-progress"></div>
      </div>
      <span class="scroll-text">Scroll</span>
    </div>

    <div class="hero-accent-corner"></div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-bg__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 60%;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
}

.overlay-noise {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.035;
}

.overlay-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(44, 36, 22, 0.92) 0%,
    rgba(44, 36, 22, 0.75) 40%,
    rgba(42, 92, 85, 0.4) 100%
  );
}

.overlay-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 30% 50%,
    transparent 0%,
    transparent 40%,
    rgba(44, 36, 22, 0.3) 100%
  );
}

.floating-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(212, 162, 76, 0.4);
  border-radius: 50%;
}

.particle-1 { top: 20%; left: 15%; }
.particle-2 { top: 35%; left: 8%; width: 6px; height: 6px; }
.particle-3 { top: 55%; left: 20%; width: 3px; height: 3px; }
.particle-4 { top: 70%; left: 12%; }

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 5rem;
}

.content-wrapper {
  max-width: 720px;
}

.hero-line {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #c45b28, #e6b84d);
  margin-bottom: 2rem;
  border-radius: 2px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  background: rgba(196, 91, 40, 0.15);
  border: 1px solid rgba(230, 184, 77, 0.25);
  border-radius: 100px;
  margin-bottom: 1.5rem;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #e6b84d;
  border-radius: 50%;
  animation: badgePulse 2s ease-in-out infinite;
}

@keyframes badgePulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.2); }
}

.hero-badge {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #e6b84d;
}

.hero-headline {
  font-family: 'Jakarta Sans', sans-serif;
  font-size: clamp(2.5rem, 5.5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.05;
  color: #ffffff;
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.02em;
}

.headline-accent {
  display: block;
  color: #c45b28;
}

.hero-tagline {
  font-family: 'Jakarta Sans', sans-serif;
  font-size: clamp(1rem, 1.1vw, 1.2rem);
  font-weight: 400;
  line-height: 1.75;
  color: rgba(245, 240, 232, 0.85);
  margin: 0 0 2.5rem 0;
  max-width: 580px;
}

.hero-cta-group {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.125rem 2rem;
  background: linear-gradient(135deg, #c45b28 0%, #d4852a 100%);
  color: #ffffff;
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.hero-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(196, 91, 40, 0.4);
}

.hero-cta:active {
  transform: translateY(-1px);
}

.cta-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.hero-cta:hover .cta-icon {
  transform: translateX(4px);
}

.hero-stats-mini {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.mini-stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mini-value {
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #e6b84d;
  line-height: 1;
}

.mini-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(245, 240, 232, 0.5);
}

.mini-divider {
  width: 1px;
  height: 36px;
  background: rgba(245, 240, 232, 0.15);
}

.scroll-indicator {
  position: absolute;
  bottom: 2.5rem;
  left: 5rem;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.scroll-line {
  width: 1px;
  height: 60px;
  background: rgba(245, 240, 232, 0.1);
  overflow: hidden;
  border-radius: 1px;
}

.scroll-progress {
  width: 100%;
  height: 40%;
  background: linear-gradient(to bottom, #e6b84d, transparent);
  animation: scrollFlow 2s ease-in-out infinite;
}

@keyframes scrollFlow {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(150%); }
}

.scroll-text {
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.5);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
}

.hero-accent-corner {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 300px;
  height: 300px;
  background: linear-gradient(
    135deg,
    transparent 50%,
    rgba(196, 91, 40, 0.08) 100%
  );
  pointer-events: none;
  z-index: 1;
}

@media (max-width: 1200px) {
  .hero-content {
    padding: 2rem 3rem;
  }

  .scroll-indicator {
    left: 3rem;
  }
}

@media (max-width: 1024px) {
  .hero-cta-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .hero-stats-mini {
    padding-left: 0.25rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 600px;
  }

  .hero-content {
    padding: 2rem 1.5rem;
  }

  .hero-line {
    width: 40px;
    margin-bottom: 1.5rem;
  }

  .hero-headline {
    font-size: 2.25rem;
  }

  .hero-tagline {
    font-size: 1rem;
    line-height: 1.6;
  }

  .hero-cta-group {
    gap: 1.25rem;
  }

  .hero-cta {
    width: 100%;
    justify-content: center;
    padding: 1rem 1.5rem;
  }

  .hero-stats-mini {
    width: 100%;
    justify-content: center;
    padding-left: 0.5rem;
  }

  .scroll-indicator {
    display: none;
  }

  .hero-accent-corner {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 480px) {
  .hero-badge {
    padding: 0.4rem 0.75rem 0.4rem 0.4rem;
    font-size: 0.65rem;
  }

  .hero-headline {
    font-size: 1.875rem;
  }

  .hero-stats-mini {
    gap: 1rem;
  }

  .mini-value {
    font-size: 1.25rem;
  }

  .mini-divider {
    height: 28px;
  }
}
</style>

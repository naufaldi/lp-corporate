<script setup lang="ts">
import { onMounted } from 'vue'
import { useNuxtApp } from '#app'

const { $gsap } = useNuxtApp()

const scrollToStats = () => {
  const statsSection = document.querySelector('#stats')
  if (statsSection) {
    statsSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const onImageLoad = () => {
  // Enable parallax when image loads
  $gsap.to('.hero-bg', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    yPercent: 30,
    ease: 'none'
  })
}

const onImageError = (e: Event) => {
  console.error('Hero image failed to load:', e)
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
}

onMounted(() => {
  // Hero entrance animation
  const tl = $gsap.timeline()

  tl.from('.hero-bg', {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  })
  .from('.hero-overlay', {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.4')
  .from('.hero-content', {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.3')

  // Check if image already loaded
  const heroImage = document.querySelector('.hero-bg__image') as HTMLImageElement
  if (heroImage && heroImage.complete) {
    onImageLoad()
  }
})
</script>

<template>
  <section id="hero" class="hero-section">
    <!-- Background Image -->
    <div class="hero-bg">
      <img
        src="/images/oil-palm.jpg"
        alt="Palm oil plantation in Indonesia - aerial view"
        class="hero-bg__image"
        @load="onImageLoad"
        @error="onImageError"
      />
    </div>

    <!-- Dark Overlay -->
    <div class="hero-overlay"></div>

    <!-- Content -->
    <div class="hero-content">
      <h1 class="hero-headline">
        Sustainable Palm Oil
        <br />
        for a Growing Asia
      </h1>

      <p class="hero-tagline">
        Nusantara Palm Industries is Indonesia's leading sustainable palm oil exporter,
        operating a large-scale integrated enterprise focused on delivering high-quality
        crude palm oil to Asian markets. As an industry innovator, NPI combines its
        commitment to sustainability with scale and reliability, establishing an
        integrated supply chain. 
      </p>

      <button class="hero-cta" @click="scrollToStats">
        Explore Our Story
        <svg
          class="hero-cta__arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M7 13L12 18L17 13" />
          <path d="M12 18V6" />
        </svg>
      </button>
    </div>

    <!-- Scroll Indicator -->
    <div class="hero-scroll">
      <span class="hero-scroll__text">Scroll</span>
      <div class="hero-scroll__line"></div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* Background */
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-bg__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(44, 36, 22, 0.85) 0%,
    rgba(44, 36, 22, 0.65) 50%,
    rgba(42, 92, 85, 0.5) 100%
  );
  z-index: 1;
}

/* Content */
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  padding: 2rem;
  padding-top: 80px;
}

@media (min-width: 768px) {
  .hero-content {
    padding: 3rem;
    padding-left: 5%;
  }
}

/* Headline */
.hero-headline {
  font-family: 'Jakarta Sans', sans-serif;
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  color: #ffffff;
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.02em;
}

/* Tagline */
.hero-tagline {
  font-family: 'Jakarta Sans', sans-serif;
  font-size: clamp(1rem, 1.25vw, 1.25rem);
  font-weight: 400;
  line-height: 1.7;
  color: rgba(245, 240, 232, 0.9);
  margin: 0 0 2.5rem 0;
  max-width: 600px;
}

/* CTA Button */
.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: #d4a24c;
  color: #2c2416;
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(212, 162, 76, 0.4);
}

.hero-cta:active {
  transform: translateY(0);
}

.hero-cta__arrow {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.hero-cta:hover .hero-cta__arrow {
  transform: translateY(3px);
}

/* Scroll Indicator */
.hero-scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.hero-scroll__text {
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.hero-scroll__line {
  width: 1px;
  height: 50px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.6),
    transparent
  );
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% {
    opacity: 0.4;
    transform: scaleY(0.8);
  }
  50% {
    opacity: 1;
    transform: scaleY(1);
  }
}

@media (max-width: 767px) {
  .hero-scroll {
    display: none;
  }

  .hero-cta {
    width: 100%;
    justify-content: center;
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
}
</style>

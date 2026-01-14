<script setup lang="ts">
import { onMounted } from 'vue'
import { useNuxtApp } from '#app'

interface ProductFeature {
  id: string
  title: string
  description: string
  icon: string
}

interface Specification {
  parameter: string
  value: string
  unit: string
}

const { $gsap, $ScrollTrigger } = useNuxtApp()

const features: ProductFeature[] = [
  {
    id: 'quality',
    title: 'Premium Quality',
    description: 'Consistently high-grade Crude Palm Oil meeting international standards',
    icon: 'quality'
  },
  {
    id: 'traceability',
    title: 'Full Traceability',
    description: '100% traceable supply chain from plantation to port',
    icon: 'traceability'
  },
  {
    id: 'capacity',
    title: 'Scale & Reliability',
    description: '450,000 MT annual production capacity with consistent supply',
    icon: 'capacity'
  },
  {
    id: 'certification',
    title: 'Internationally Certified',
    description: 'RSPO and ISCC EU certified sustainable production',
    icon: 'certification'
  }
]

const specifications: Specification[] = [
  { parameter: 'Free Fatty Acids (FFA)', value: '2.5', unit: '% max' },
  { parameter: 'Moisture & Impurities', value: '0.5', unit: '% max' },
  { parameter: 'Iodine Value', value: '50-55', unit: 'Wijs' },
  { parameter: 'Melting Point', value: '33-39', unit: '°C' },
  { parameter: 'Peroxide Value', value: '2', unit: 'meq/kg max' },
  { parameter: 'Cloud Point', value: '10-15', unit: '°C' }
]

const onImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
}

onMounted(() => {
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    $gsap.set(['.product-intro', '.product-specs', '.product-features'], { opacity: 1 })
    return
  }

  $gsap.fromTo('.product-intro',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#product',
        start: 'top 60%'
      }
    }
  )

  $gsap.fromTo('.product-specs',
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.specs-container',
        start: 'top 70%'
      }
    }
  )

  $gsap.fromTo('.feature-card',
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.features-grid',
        start: 'top 75%'
      }
    }
  )

  $gsap.fromTo('.spec-item',
    { opacity: 0, scale: 0.9 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      stagger: 0.05,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.specs-grid',
        start: 'top 80%'
      }
    }
  )
})
</script>

<template>
  <section id="product" class="product-section h-screen min-h-[800px] flex flex-col lg:flex-row overflow-hidden">
    <div class="product-intro w-full lg:w-5/12 bg-[#2c2416] flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-0 relative">
      <div class="product-background">
        <div class="bg-gradient-radial"></div>
        <div class="bg-accent-glow"></div>
      </div>

      <div class="intro-content relative z-10">
        <span class="section-label text-sm uppercase tracking-[0.3em] text-[#d4a24c] mb-6 block">
          Our Product
        </span>

        <h2 class="product-title text-4xl lg:text-6xl font-bold text-[#f5f0e8] leading-tight mb-8">
          Crude Palm Oil
          <span class="text-[#c45b28]">Excellence</span>
        </h2>

        <p class="product-description text-lg lg:text-xl text-[#f5f0e8]/70 leading-relaxed mb-10">
          NPI produces premium Crude Palm Oil (CPO) at our integrated plantation-to-port operations in Kalimantan. Our 450,000 MT annual capacity ensures reliable supply to Asian markets year-round.
        </p>

        <div class="certification-badges flex flex-wrap items-center gap-6">
          <div class="cert-badge">
            <div class="cert-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div class="cert-text">
              <span class="cert-label">RSPO Certified</span>
              <span class="cert-year">Since 2019</span>
            </div>
          </div>

          <div class="cert-badge">
            <div class="cert-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <div class="cert-text">
              <span class="cert-label">ISCC EU</span>
              <span class="cert-year">Certified</span>
            </div>
          </div>
        </div>

        <div class="supply-indicator mt-12 pt-8 border-t border-[#f5f0e8]/10">
          <div class="supply-stat flex items-center gap-4">
            <div class="supply-value">
              <span class="value-number text-4xl font-bold text-[#c45b28]">450K</span>
              <span class="value-unit text-lg text-[#d4a24c]">MT</span>
            </div>
            <div class="supply-details">
              <span class="supply-label text-sm text-[#f5f0e8]/50 uppercase tracking-wider">Annual Capacity</span>
              <span class="supply-desc text-base text-[#f5f0e8]/80">Consistent year-round production</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="product-specs w-full lg:w-7/12 bg-[#f5f0e8] flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-0 relative">
      <div class="specs-container">
        <div class="specs-header mb-10">
          <span class="specs-label text-sm uppercase tracking-[0.2em] text-[#2c2416]/40 mb-4 block">
            Technical Specifications
          </span>
          <h3 class="specs-title text-2xl lg:text-3xl font-bold text-[#2c2416]">
            CPO Grade Quality
          </h3>
        </div>

        <div class="specs-grid grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12">
          <div
            v-for="spec in specifications"
            :key="spec.parameter"
            class="spec-item bg-white rounded-xl p-5 shadow-sm border border-[#2c2416]/5 hover:border-[#c45b28]/20 transition-all duration-300"
          >
            <div class="spec-parameter text-xs text-[#2c2416]/50 uppercase tracking-wider mb-2">
              {{ spec.parameter }}
            </div>
            <div class="spec-value flex items-baseline gap-1">
              <span class="value text-2xl lg:text-3xl font-bold text-[#2c2416]">{{ spec.value }}</span>
              <span class="unit text-sm text-[#c45b28]">{{ spec.unit }}</span>
            </div>
          </div>
        </div>

        <div class="features-grid grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div
            v-for="feature in features"
            :key="feature.id"
            class="feature-card bg-[#2c2416] rounded-xl p-6 hover:bg-[#2c2416]/90 transition-all duration-300 group"
          >
            <div class="feature-icon w-12 h-12 rounded-lg bg-[#c45b28]/20 flex items-center justify-center mb-4 group-hover:bg-[#c45b28] transition-colors duration-300">
              <svg v-if="feature.icon === 'quality'" class="w-6 h-6 text-[#d4a24c] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <svg v-else-if="feature.icon === 'traceability'" class="w-6 h-6 text-[#d4a24c] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <svg v-else-if="feature.icon === 'capacity'" class="w-6 h-6 text-[#d4a24c] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18"/>
                <path d="M9 21V9"/>
              </svg>
              <svg v-else class="w-6 h-6 text-[#d4a24c] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h4 class="feature-title text-lg font-semibold text-[#f5f0e8] mb-2">
              {{ feature.title }}
            </h4>
            <p class="feature-desc text-sm text-[#f5f0e8]/60 leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.product-section {
  min-height: 100vh;
}

.product-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.bg-gradient-radial {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, rgba(196, 91, 40, 0.1) 0%, transparent 60%);
}

.bg-accent-glow {
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 60%;
  height: 60%;
  background: radial-gradient(circle, rgba(212, 162, 76, 0.08) 0%, transparent 50%);
}

.section-label {
  font-size: 0.875rem;
  letter-spacing: 0.3em;
}

.product-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  line-height: 1.1;
}

.product-description {
  font-size: 1.125rem;
  line-height: 1.7;
}

.certification-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.cert-badge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(245, 240, 232, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(245, 240, 232, 0.1);
}

.cert-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(212, 162, 76, 0.15);
  border-radius: 8px;
  color: #d4a24c;
}

.cert-icon svg {
  width: 18px;
  height: 18px;
}

.cert-text {
  display: flex;
  flex-direction: column;
}

.cert-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #f5f0e8;
}

.cert-year {
  font-size: 0.75rem;
  color: rgba(245, 240, 232, 0.5);
}

.supply-stat {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.supply-value {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.value-number {
  font-size: 2.5rem;
  line-height: 1;
}

.value-unit {
  font-size: 1rem;
  color: #d4a24c;
}

.supply-details {
  display: flex;
  flex-direction: column;
}

.supply-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(245, 240, 232, 0.5);
}

.supply-desc {
  font-size: 0.95rem;
  color: rgba(245, 240, 232, 0.8);
}

.specs-label {
  font-size: 0.875rem;
  letter-spacing: 0.2em;
}

.specs-title {
  font-size: 1.75rem;
  font-weight: 700;
}

.spec-item {
  padding: 1.25rem;
}

.spec-parameter {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.spec-value {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.spec-value .value {
  font-size: 1.5rem;
  font-weight: 700;
}

.spec-value .unit {
  font-size: 0.875rem;
  color: #c45b28;
}

.feature-card {
  padding: 1.5rem;
}

.feature-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #f5f0e8;
  margin-bottom: 0.5rem;
}

.feature-desc {
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgba(245, 240, 232, 0.7);
}

@media (max-width: 1024px) {
  .product-section {
    flex-direction: column;
    height: auto;
  }

  .product-intro,
  .product-specs {
    width: 100%;
    padding: 4rem 2rem;
  }

  .certification-badges {
    flex-direction: column;
    align-items: flex-start;
  }

  .cert-badge {
    width: 100%;
  }

  .specs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .product-intro,
  .product-specs {
    padding: 3rem 1.5rem;
  }

  .product-title {
    font-size: 2rem;
  }

  .product-description {
    font-size: 1rem;
  }

  .specs-grid {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .supply-stat {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>

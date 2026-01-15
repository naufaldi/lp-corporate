<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useNuxtApp } from '#app'
import IconRspoSmall from '../ui/icons/IconRspoSmall.vue'
import IconIsccSmall from '../ui/icons/IconIsccSmall.vue'
import IconHectaresPremium from '../ui/icons/IconHectaresPremium.vue'
import IconExportsPremium from '../ui/icons/IconExportsPremium.vue'
import IconEmployeesPremium from '../ui/icons/IconEmployeesPremium.vue'

interface StatItem {
  id: string
  value: number
  displayValue: string
  suffix: string
  label: string
  icon: object
  accentColor: string
}

const stats: StatItem[] = [
  { id: 'hectares', value: 85000, displayValue: '85,000', suffix: 'ha', label: 'Total Plantation Area', icon: IconHectaresPremium, accentColor: '#d4a24c' },
  { id: 'exports', value: 380000, displayValue: '380K', suffix: '+', label: 'Metric Tons Annual Exports', icon: IconExportsPremium, accentColor: '#c45b28' },
  { id: 'employees', value: 2800, displayValue: '2,800', suffix: '+', label: 'Employees Across Operations', icon: IconEmployeesPremium, accentColor: '#2a5c55' }
]

const narrativeText = `From our plantations in Kalimantan, NPI produces over 380,000 metric tons of premium crude palm oil, employing over 2,800 people across our operations.`

const { $gsap, $animation } = useNuxtApp()
let cleanupFns: Array<() => void> = []

onMounted(() => {
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    $gsap.set(['.hero-content', '.stat-row', '.cert-row'], { opacity: 1 })
    return
  }

  const tl = $gsap.timeline()

  tl.set('.hero-content', { opacity: 0, y: 30 })
  tl.set('.stat-row', { opacity: 0, y: 40 })
  tl.set('.cert-row', { opacity: 0, y: 20 })

  tl.to('.hero-content', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#stats',
      start: 'top 70%'
    }
  })

  tl.to('.stat-row', {
    opacity: 1,
    x: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.stats-column',
      start: 'top 60%'
    }
  }, '+=0.1')

  tl.to('.cert-row', {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.cert-row',
      start: 'top 80%'
    }
  }, '+=0.1')

  document.querySelectorAll('.stat-row').forEach((row) => {
    const cleanup = $animation?.hoverScale?.(row as HTMLElement, { scale: 1.02, duration: 0.3 })
    if (cleanup) cleanupFns.push(cleanup)
  })

  document.querySelectorAll('.stat-row').forEach((row) => {
    $gsap.to(row, {
      scrollTrigger: {
        trigger: row,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 0.5
      },
      y: -10,
      ease: 'none'
    })
  })
})

onUnmounted(() => {
  cleanupFns.forEach(fn => fn && typeof fn === 'function' && fn())
})
</script>

<template>
  <section id="stats" class="stats-section h-screen flex flex-col lg:flex-row overflow-hidden">
    <div class="hero-statement w-full lg:w-1/2 bg-[#f5f0e8] flex flex-col justify-center px-8 lg:px-24 py-16 lg:py-0 relative">
      <div class="hero-content max-w-xl">
        <span class="section-label text-sm uppercase tracking-[0.3em] text-[#c45b28] mb-8 block">
          By The Numbers
        </span>

        <div class="revenue-hero mb-10">
          <span class="revenue-currency text-4xl lg:text-6xl font-light text-[#2c2416]">$</span>
          <span class="revenue-value text-7xl lg:text-[10rem] leading-[0.9] font-bold text-[#2c2416] tabular-nums">280M</span>
          <span class="revenue-suffix text-2xl lg:text-3xl text-[#d4a24c]">+</span>
          <div class="revenue-label mt-6 text-lg lg:text-xl text-[#2c2416]/60">
            Export Revenue Annually
          </div>
        </div>

        <p class="narrative-text text-xl lg:text-2xl text-[#2c2416]/80 leading-relaxed mb-12">
          From our <span class="text-[#c45b28] font-semibold">85,000 hectares</span> of sustainable plantations in Kalimantan, NPI produces over <span class="text-[#c45b28] font-semibold">380,000 metric tons</span> of premium crude palm oil, employing <span class="text-[#2a5c55] font-semibold">2,800+ people</span> across our operations.
        </p>

        <div class="cert-row flex flex-wrap items-center gap-6 lg:gap-8">
          <span class="text-xs uppercase tracking-widest text-[#2c2416]/40">Certifications</span>
          <div class="w-px h-8 bg-[#2c2416]/10"></div>
          <div class="flex items-center gap-4">
            <IconRspoSmall class="w-10 h-10 lg:w-12 lg:h-12" />
            <IconIsccSmall class="w-10 h-10 lg:w-12 lg:h-12" />
          </div>
          <span class="text-sm lg:text-base text-[#2c2416]/60 hidden sm:block">RSPO Certified 2019 | ISCC EU</span>
        </div>
      </div>
    </div>

    <div class="stats-column w-full lg:w-1/2 bg-[#2c2416] flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-0 overflow-y-auto">
      <div
          class="stat-row flex items-center gap-6 lg:gap-10 mb-10 lg:mb-16 pb-10 lg:pb-16 border-b border-[#f5f0e8]/10"
          v-for="(stat, index) in stats"
          :key="stat.id"
          :class="{ 'border-b-0': index === stats.length - 1 }"
        >
          <div class="stat-icon w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0" :style="{ color: stat.accentColor }">
            <component :is="stat.icon" />
          </div>
          <div>
            <div class="stat-value flex items-baseline gap-2 lg:gap-3">
              <span class="text-5xl lg:text-7xl font-bold text-[#f5f0e8] tabular-nums tracking-tight">{{ stat.displayValue }}</span>
              <span class="text-xl lg:text-2xl" :style="{ color: stat.accentColor }">{{ stat.suffix }}</span>
            </div>
            <div class="stat-label text-xs lg:text-sm uppercase tracking-widest text-[#f5f0e8]/40 mt-3 lg:mt-4">
              {{ stat.label }}
            </div>
          </div>
        </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section {
  min-height: 100vh;
}

.section-label {
  font-size: 0.875rem;
  letter-spacing: 0.3em;
}

.revenue-currency {
  font-size: 1.5rem;
}

.revenue-value {
  font-size: 7rem;
  line-height: 0.9;
  letter-spacing: -0.02em;
}

.revenue-suffix {
  font-size: 1.25rem;
}

.revenue-label {
  font-size: 1.125rem;
  margin-top: 1.5rem;
}

.stat-value {
  line-height: 1;
}

.stat-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

@media (max-width: 1024px) {
  .revenue-value {
    font-size: 6rem;
  }

  .stat-icon {
    width: 4rem;
    height: 4rem;
  }

  .stat-value span:first-child {
    font-size: 3.5rem;
  }
}

@media (max-width: 768px) {
  .stats-section {
    height: auto;
    min-height: 100vh;
  }

  .hero-statement {
    padding: 4rem 2rem;
  }

  .stats-column {
    padding: 4rem 2rem;
  }

  .revenue-hero {
    margin-bottom: 3rem;
  }

  .revenue-currency {
    font-size: 1.25rem;
  }

  .revenue-value {
    font-size: 4.5rem;
  }

  .revenue-suffix {
    font-size: 1.125rem;
  }

  .revenue-label {
    font-size: 1rem;
    margin-top: 1rem;
  }

  .narrative-text {
    font-size: 1.125rem;
    margin-bottom: 3rem;
  }

  .stat-row {
    gap: 1.5rem;
    margin-bottom: 2.5rem;
    padding-bottom: 2.5rem;
  }

  .stat-icon {
    width: 3.5rem;
    height: 3.5rem;
  }

  .stat-value span:first-child {
    font-size: 2.5rem;
  }

  .stat-icon :deep(svg) {
    width: 100%;
    height: 100%;
  }
}

@media (max-width: 480px) {
  .hero-statement {
    padding: 3rem 1.5rem;
  }

  .stats-column {
    padding: 3rem 1.5rem;
  }

  .revenue-value {
    font-size: 3.5rem;
  }

  .cert-row {
    gap: 1rem;
  }

  .cert-row .w-px {
    display: none;
  }

  .stat-row {
    gap: 1rem;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }

  .stat-icon {
    width: 3rem;
    height: 3rem;
  }

  .stat-value span:first-child {
    font-size: 2rem;
  }
}
</style>

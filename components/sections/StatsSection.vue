<script setup lang="ts">
import { useNuxtApp } from '#app'
import IconExportsPremium from '../ui/icons/IconExportsPremium.vue'
import IconHectaresPremium from '../ui/icons/IconHectaresPremium.vue'
import IconEmployeesPremium from '../ui/icons/IconEmployeesPremium.vue'
import IconRevenuePremium from '../ui/icons/IconRevenuePremium.vue'
import IconRspoSmall from '../ui/icons/IconRspoSmall.vue'
import IconIsccSmall from '../ui/icons/IconIsccSmall.vue'
import IconAsiaSimple from '../ui/icons/IconAsiaSimple.vue'

interface StatItem {
  id: string
  value: number
  suffix: string
  label: string
  description: string
  iconName: string
}

const stats: StatItem[] = [
  { id: 'exports', value: 380000, suffix: '+', label: 'Annual Exports', description: 'Metric tons of CPO', iconName: 'exports' },
  { id: 'hectares', value: 85000, suffix: '', label: 'Total Area', description: 'Hectares managed', iconName: 'hectares' },
  { id: 'employees', value: 2800, suffix: '+', label: 'Workforce', description: 'Employees across ops', iconName: 'employees' },
  { id: 'revenue', value: 280, suffix: 'M+', label: 'Export Revenue', description: 'USD million annually', iconName: 'revenue' }
]

const iconMap: Record<string, object> = {
  exports: IconExportsPremium,
  hectares: IconHectaresPremium,
  employees: IconEmployeesPremium,
  revenue: IconRevenuePremium
}

function getIcon(name: string) {
  return iconMap[name]
}

const contextText = 'From our plantations in Kalimantan to ports across Asia, NPI delivers sustainable palm oil that powers industries and communities.'

const { $gsap } = useNuxtApp()

onMounted(() => {
  // Counter animation
  const statNumbers = document.querySelectorAll('.stat-number')

  statNumbers.forEach((el) => {
    const target = parseInt(el.getAttribute('data-target') || '0')

    $gsap.fromTo(el,
      { textContent: 0 },
      {
        textContent: target,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        },
        onUpdate: function() {
          el.textContent = Math.ceil(this.targets()[0].textContent).toLocaleString()
        }
      }
    )
  })

  // Stat cards reveal
  $gsap.fromTo('.stat-card',
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.stats-panel',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    }
  )

  // Icons reveal
  $gsap.fromTo('.stat-icon svg',
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
      delay: 0.1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.stats-panel',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    }
  )

  // Context content reveal
  $gsap.fromTo('.context-content',
    { x: 20, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.context-panel',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    }
  )

  // Map reveal
  $gsap.fromTo('.asia-map svg',
    { scale: 0.9, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      delay: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.context-panel',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    }
  )
})
</script>

<template>
  <section id="stats" class="stats-section min-h-screen-100 flex">
    <div class="stats-panel w-3/5 bg-[#2c2416] flex items-center justify-center px-16 py-20 relative z-10">
      <div class="cert-row flex items-center gap-4 mb-12">
        <div class="w-12 h-12 flex items-center justify-center">
          <IconRspoSmall />
        </div>
        <div class="w-12 h-12 flex items-center justify-center">
          <IconIsccSmall />
        </div>
        <span class="text-[#f5f0e8]/60 text-sm ml-2">
          RSPO Certified 2019 | ISCC EU
        </span>
      </div>

      <div class="stats-grid grid grid-cols-2 gap-x-16 gap-y-12 w-full max-w-2xl">
        <div v-for="stat in stats" :key="stat.id" class="stat-card border-l-4 border-[#d4a24c] pl-6 py-2">
          <div class="stat-icon w-12 h-12 text-[#d4a24c] mb-4">
            <component :is="getIcon(stat.iconName)" />
          </div>
          <div class="stat-number text-5xl md:text-6xl font-bold text-[#d4a24c]" :data-target="stat.value">
            0{{ stat.suffix }}
          </div>
          <div class="stat-label text-xl text-[#f5f0e8] mt-3 font-medium">{{ stat.label }}</div>
          <div class="stat-desc text-sm text-[#f5f0e8]/60 mt-1">{{ stat.description }}</div>
        </div>
      </div>
    </div>

    <div class="context-panel w-2/5 bg-[#f5f0e8] flex items-center justify-center px-16 py-20 relative overflow-hidden">
      <div class="context-content relative z-10 max-w-md">
        <h3 class="text-3xl md:text-4xl font-bold text-[#2c2416] mb-6 leading-tight">
          From Indonesia to Asia
        </h3>

        <p class="text-lg text-[#2c2416]/80 leading-relaxed mb-8">
          {{ contextText }}
        </p>

        <div class="asia-map w-full h-24 mb-6">
          <IconAsiaSimple />
        </div>

        <div class="flex flex-wrap gap-4 text-sm">
          <span class="text-[#2c2416]/60">Exporting to:</span>
          <span class="text-[#2a5c55] font-medium">China, India, Singapore</span>
          <span class="text-[#2c2416]/40">+ 5 more</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-grid {
  gap: 3rem 4rem;
}

.stat-card {
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateX(8px);
  background: rgba(212, 162, 76, 0.08);
}

.stat-number {
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}

.cert-row {
  position: absolute;
  top: 3rem;
  left: 4rem;
}

.stat-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.asia-map :deep(svg) {
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .stats-section {
    flex-direction: column;
  }

  .stats-panel,
  .context-panel {
    width: 100%;
    min-height: auto;
    padding: 3rem 1.5rem;
  }

  .cert-row {
    position: static;
    margin-bottom: 2rem;
    justify-content: center;
  }

  .stats-grid {
    gap: 2rem 1.5rem;
  }

  .stat-number {
    font-size: 2.5rem;
  }

  .asia-map {
    height: 120px;
  }
}
</style>

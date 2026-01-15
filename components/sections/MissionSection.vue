<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useNuxtApp } from '#app'

const { $gsap, $animation } = useNuxtApp()
let cleanupFns: Array<() => void> = []

onMounted(() => {
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    $gsap.set(['.left-content', '.right-inner', '.value-card'], { opacity: 1, y: 0 })
    return
  }

  $animation?.batchReveal?.('.left-content', {
    trigger: '#mission',
    duration: 0.8,
    y: 50
  })

  $animation?.batchReveal?.('.right-inner', {
    trigger: '#mission',
    duration: 0.8,
    y: 50
  })

  $animation?.batchReveal?.('.value-card', {
    trigger: '#mission',
    duration: 0.5,
    stagger: 0.1,
    y: 30
  })

  $animation?.bgParallax?.('.bg-parallax', { speed: 0.15, scrub: true })

  document.querySelectorAll('.value-card').forEach((card) => {
    const cleanup = $animation?.hoverScale?.(card as HTMLElement, { scale: 1.03, duration: 0.3 })
    if (cleanup) cleanupFns.push(cleanup)
  })
})

onUnmounted(() => {
  cleanupFns.forEach(fn => fn && typeof fn === 'function' && fn())
})

const missionText = "To secure Asia's palm oil supply through sustainable, scalable operations that deliver consistent quality while protecting Indonesia's forests and communities for future generations."

const visionText = "To be Asia's most trusted sustainable palm oil partner, setting the industry benchmark for environmental stewardship, operational excellence, and transparent trade."

const values = [
  {
    id: 'sustainability',
    label: 'Sustainability First',
    desc: 'Zero-deforestation, RSPO-certified'
  },
  {
    id: 'scale',
    label: 'Reliable Scale',
    desc: '500K+ MT annual exports'
  },
  {
    id: 'innovation',
    label: 'Innovation Driven',
    desc: 'Precision agritech, R&D'
  },
  {
    id: 'pride',
    label: 'Indonesian Pride',
    desc: 'Community empowerment'
  },
  {
    id: 'excellence',
    label: 'Trade Excellence',
    desc: 'Trusted partnerships'
  }
]
</script>

<template>
  <section id="mission" class="relative h-screen min-h-[700px] overflow-hidden bg-[#0d0b08]">
    <div class="absolute inset-0 z-0">
      <div class="bg-parallax absolute inset-0 bg-cover bg-center bg-no-repeat"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-[#0d0b08]/98 via-[#0d0b08]/90 to-[#0d0b08]/85"></div>
      <div class="absolute inset-0 opacity-[0.035] pointer-events-none" :style="{ backgroundImage: 'url(data:image/svg+xml,%3Csvg viewBox=%220 0 600 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E)' }"></div>
      <div class="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#c45b28]/10 via-transparent to-transparent"></div>
      <div class="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#d4a24c]/8 via-transparent to-transparent"></div>
    </div>

    <div class="relative z-10 h-full flex flex-col lg:flex-row">
      <div class="left-content flex-1 flex flex-col justify-center px-10 lg:px-16 xl:px-20 py-12 opacity-100 visible">
        <span class="section-label font-sans text-xs font-semibold tracking-[0.35em] uppercase text-[#d4a24c] mb-6">Mission</span>
        <h2 class="font-sans font-bold text-[clamp(24px,4vw,42px)] leading-[1.35] tracking-[-0.01em] text-white mb-6">
          {{ missionText }}
        </h2>
      </div>

      <div class="right-content w-full lg:w-[45%] xl:w-[42%] bg-[#12100c]/60 backdrop-blur-sm border-l border-[rgba(212,162,76,0.1)] flex flex-col justify-center px-10 lg:px-14 xl:px-16 py-12">
        <div class="right-inner opacity-100 visible">
          <span class="section-label font-sans text-xs font-semibold tracking-[0.35em] uppercase text-[#d4a24c] mb-6 block">Vision</span>
          <p class="font-sans text-[clamp(16px,2.2vw,22px)] text-[#f5f0e8]/85 leading-[1.7] mb-10">{{ visionText }}</p>

          <div class="space-y-5">
            <div class="flex items-center gap-4">
              <span class="w-12 h-px bg-gradient-to-r from-[#d4a24c] to-transparent"></span>
              <span class="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-[#d4a24c]">Core Values</span>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="value in values" :key="value.id" class="value-card group bg-[rgba(212,162,76,0.05)] border border-[rgba(212,162,76,0.12)] p-4 transition-all duration-400 hover:bg-[rgba(212,162,76,0.1)] hover:border-[rgba(212,162,76,0.3)] cursor-default rounded-sm opacity-100 visible">
                <span class="font-sans text-sm font-bold text-[#f5f0e8] block mb-1.5 group-hover:text-[#d4a24c] transition-colors duration-300">{{ value.label }}</span>
                <span class="font-sans text-xs text-[#f5f0e8]/50 leading-relaxed">{{ value.desc }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-10 left-10 lg:left-16 z-20 flex items-center gap-4">
      <div class="w-12 h-12 rounded-full border border-[rgba(212,162,76,0.3)] flex items-center justify-center bg-[#0d0b08]/50 backdrop-blur-sm">
        <div class="w-3 h-3 rounded-full bg-[#d4a24c] shadow-[0_0_15px_rgba(212,162,76,0.5)]"></div>
      </div>
      <div>
        <span class="font-sans text-sm font-semibold tracking-widest text-[#f5f0e8]/80 uppercase block leading-none mb-1">Nusantara Palm Industries</span>
        <span class="font-sans text-[10px] tracking-widest text-[#f5f0e8]/40 uppercase">Sustainable Palm Oil for Asia</span>
      </div>
    </div>

    <div class="absolute top-1/2 right-6 lg:right-10 z-20 hidden lg:flex flex-col items-center gap-3">
      <span class="writing-vertical font-sans text-[10px] font-medium tracking-[0.25em] text-[#f5f0e8]/15 uppercase rotate-180">Mission & Vision</span>
      <div class="w-px h-16 bg-gradient-to-b from-[#d4a24c]/20 to-transparent"></div>
    </div>
  </section>
</template>

<style scoped>
.bg-parallax {
  background-image: url('@/assets/images/suistanability-oil.jpg');
}

.writing-vertical {
  writing-mode: vertical-rl;
}

.value-card {
  will-change: transform, opacity;
}

@media (max-width: 1024px) {
  .section-label {
    font-size: 11px;
    letter-spacing: 0.3em !important;
  }
}

@media (max-width: 768px) {
  .absolute.bottom-10 {
    bottom: 1.5rem;
    left: 1.5rem;
  }

  .font-sans.text-sm {
    font-size: 0.875rem;
  }

  .font-sans.text-\[10px\] {
    font-size: 9px;
  }
}
</style>

<script setup lang="ts">
import { onMounted, onUnmounted, provide } from 'vue'
import { useNuxtApp } from '#app'
import HeroSection from '~/components/sections/HeroSection.vue'
import StatsSection from '~/components/sections/StatsSection.vue'
import SustainabilitySection from '~/components/sections/SustainabilitySection.vue'
import MissionSection from '~/components/sections/MissionSection.vue'
import GeographicSection from '~/components/sections/GeographicSection.vue'
import ProductSection from '~/components/sections/ProductSection.vue'
import ContactSection from '~/components/sections/ContactSection.vue'
import AppNavigation from '~/components/AppNavigation.vue'

const { $gsap, $ScrollTrigger } = useNuxtApp()

let panels: HTMLElement[] = []
let scrollTween: gsap.core.Tween | null = null
let normalizeObserver: { disable: () => void; enable: () => void; kill?: () => void } | null = null
let snapTriggers: Array<{ kill: () => void }> = []

const onTouchStart = (e: TouchEvent) => {
  if (!scrollTween) return
  e.preventDefault()
  e.stopImmediatePropagation()
}

const goToSection = (index: number) => {
  const panel = panels[index]
  if (!panel) return
  if (scrollTween) return

  scrollTween = $gsap.to(window, {
    scrollTo: { y: panel, autoKill: false },
    duration: 1,
    overwrite: true,
    onStart: () => {
      if (!normalizeObserver) return
      normalizeObserver.disable()
      normalizeObserver.enable()
    },
    onComplete: () => {
      // Keep scrollTween truthy through refresh so triggers can't cascade.
      $ScrollTrigger.refresh()
      $gsap.delayedCall(0, () => {
        scrollTween = null
      })
    }
  })
}

const scrollToSection = (target: string) => {
  const el = document.querySelector(target) as HTMLElement | null
  if (!el) return
  $gsap.to(window, {
    scrollTo: {
      y: el,
      autoKill: false
    },
    duration: 0.8,
    ease: 'power2.out'
  })
}

provide('scrollToSection', scrollToSection)

onMounted(() => {
  panels = $gsap.utils.toArray('.panel') as HTMLElement[]
  if (!panels.length) return

  if ($ScrollTrigger.isTouch === 1) {
    normalizeObserver = $ScrollTrigger.normalizeScroll(true) as typeof normalizeObserver
  }

  document.addEventListener('touchstart', onTouchStart, { capture: true, passive: false })

  panels.forEach((panel, i) => {
    const trigger = $ScrollTrigger.create({
      trigger: panel,
      start: 'top bottom',
      end: '+=199%',
      onToggle: (self) => {
        if (self.isActive && !scrollTween) goToSection(i)
      }
    })
    snapTriggers.push(trigger)
  })

  const snap = $ScrollTrigger.create({
    start: 0,
    end: () => {
      const last = panels[panels.length - 1]
      if (!last) return 'max'
      return last.offsetTop
    },
    snap: panels.length > 1 ? 1 / (panels.length - 1) : 1
  })
  snapTriggers.push(snap)
})

onUnmounted(() => {
  snapTriggers.forEach((t) => t.kill())
  snapTriggers = []

  normalizeObserver?.kill?.()
  normalizeObserver = null

  document.removeEventListener('touchstart', onTouchStart, true)
})
</script>

<template>
  <div class="main-container">
    <AppNavigation />
    <main>
      <HeroSection />
      <StatsSection />
      <SustainabilitySection />
      <MissionSection />
      <GeographicSection />
      <ProductSection />
      <ContactSection />
    </main>
  </div>
</template>

<style scoped>
.main-container {
  min-height: 100vh;
}

main {
  overflow-x: hidden;
}
</style>

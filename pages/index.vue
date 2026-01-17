<script setup lang="ts">
import { onMounted, nextTick, provide } from 'vue'
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

const scrollToSection = (target: string) => {
  nextTick(() => {
    const el = document.querySelector(target) as HTMLElement | null
    if (!el) {
      console.warn(`Element not found: ${target}`)
      return
    }
    
    const navHeight = 80
    const rect = el.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const targetPosition = rect.top + scrollTop - navHeight
    
    if (target === '#main-content') {
      el.setAttribute('tabindex', '-1')
      $gsap.to(window, {
        duration: 0.8,
        ease: 'power2.out',
        scrollTo: {
          y: targetPosition,
          autoKill: true
        },
        onComplete: () => {
          setTimeout(() => {
            el.focus()
            el.addEventListener('blur', () => {
              el.removeAttribute('tabindex')
            }, { once: true })
          }, 100)
        }
      })
    } else {
      $gsap.to(window, {
        duration: 0.8,
        ease: 'power2.out',
        scrollTo: {
          y: targetPosition,
          autoKill: true
        }
      })
    }
  })
}

provide('scrollToSection', scrollToSection)

onMounted(() => {
  nextTick(() => {
    $ScrollTrigger.refresh()
  })
})
</script>

<template>
  <div class="main-container">
    <AppNavigation />
    <main id="main-content" role="main">
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

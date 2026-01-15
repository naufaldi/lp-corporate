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

const { $gsap, $ScrollTrigger, $Observer, $animationUtils } = useNuxtApp()

const snapSectionIds = ['#hero', '#stats', '#sustainability', '#mission', '#geographic', '#product']
const contactId = '#contact'

let observer: { kill: () => void } | null = null
let isAnimating = false

const getSections = (): HTMLElement[] => {
  return snapSectionIds
    .map((id) => document.querySelector(id))
    .filter(Boolean) as HTMLElement[]
}

const getContactTop = (): number => {
  const contact = document.querySelector(contactId) as HTMLElement | null
  return contact ? contact.offsetTop : Number.POSITIVE_INFINITY
}

const getCurrentIndex = (sections: HTMLElement[]): number => {
  const scrollY = window.scrollY
  let currentIndex = 0
  sections.forEach((section, index) => {
    if (scrollY >= section.offsetTop - window.innerHeight / 2) {
      currentIndex = index
    }
  })
  return currentIndex
}

const scrollToSection = (target: string) => {
  const el = document.querySelector(target) as HTMLElement | null
  if (!el) return
  if ($animationUtils?.shouldReduceMotion?.()) {
    el.scrollIntoView({ behavior: 'auto' })
    return
  }

  $gsap.to(window, {
    scrollTo: { y: el, autoKill: false },
    duration: 0.8,
    ease: 'power2.out'
  })
}

provide('scrollToSection', scrollToSection)

const enableSnap = () => {
  if (observer || !$Observer) return
  const sections = getSections()
  observer = $Observer.create({
    type: 'wheel,touch,pointer',
    tolerance: 12,
    preventDefault: true,
    onDown: () => {
      if (isAnimating) return
      const index = getCurrentIndex(sections)
      const nextIndex = Math.min(index + 1, sections.length - 1)
      if (nextIndex === index) return
      isAnimating = true
      $gsap.to(window, {
        scrollTo: { y: sections[nextIndex], autoKill: false },
        duration: 0.85,
        ease: 'power2.out',
        onComplete: () => {
          isAnimating = false
        }
      })
    },
    onUp: () => {
      if (isAnimating) return
      const index = getCurrentIndex(sections)
      const prevIndex = Math.max(index - 1, 0)
      if (prevIndex === index) return
      isAnimating = true
      $gsap.to(window, {
        scrollTo: { y: sections[prevIndex], autoKill: false },
        duration: 0.85,
        ease: 'power2.out',
        onComplete: () => {
          isAnimating = false
        }
      })
    }
  })
}

const disableSnap = () => {
  if (!observer) return
  observer.kill()
  observer = null
}

const updateSnapState = () => {
  const contactTop = getContactTop()
  const shouldSnap = window.scrollY < contactTop - 2
  if (shouldSnap) {
    enableSnap()
  } else {
    disableSnap()
  }
}

const onResize = () => {
  $ScrollTrigger?.refresh()
  updateSnapState()
}

onMounted(() => {
  if ($animationUtils?.shouldReduceMotion?.()) return
  updateSnapState()
  window.addEventListener('scroll', updateSnapState, { passive: true })
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  disableSnap()
  window.removeEventListener('scroll', updateSnapState)
  window.removeEventListener('resize', onResize)
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

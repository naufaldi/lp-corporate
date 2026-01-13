<script setup lang="ts">
// Single page application - all sections on one page
import HeroSection from '~/components/sections/HeroSection.vue'
import StatsSection from '~/components/sections/StatsSection.vue'
import SustainabilitySection from '~/components/sections/SustainabilitySection.vue'
import MissionSection from '~/components/sections/MissionSection.vue'
import GeographicSection from '~/components/sections/GeographicSection.vue'
import ProductSection from '~/components/sections/ProductSection.vue'
import ContactSection from '~/components/sections/ContactSection.vue'
import AppNavigation from '~/components/AppNavigation.vue'
</script>

<template>
  <div class="main-container">
    <AppNavigation />
    <main>
      <HeroSection />
      <div id="stats">
        <StatsSection />
      </div>
      <div id="sustainability">
        <SustainabilitySection />
      </div>
      <div id="mission">
        <MissionSection />
      </div>
      <div id="geographic">
        <GeographicSection />
      </div>
      <div id="product">
        <ProductSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
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

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNuxtApp } from '#app'

interface Props {
  variant?: 'wave' | 'curve' | 'slant'
  color?: string
  flip?: boolean
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'wave',
  color: '#f5f0e8',
  flip: false,
  height: 80
})

const { $gsap } = useNuxtApp()
const dividerRef = ref<SVGSVGElement | null>(null)

onMounted(() => {
  const divider = dividerRef.value
  if (!divider) return

  $gsap.fromTo(divider,
    { clipPath: 'inset(0 0 100% 0)' },
    {
      clipPath: 'inset(0 0 0% 0)',
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: divider,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  )
})

const clipPath = computed(() => {
  const h = props.height
  
  switch (props.variant) {
    case 'wave':
      return props.flip
        ? `path('M0,0 L100%,0 L100%,${h} L80%,${h - 15} L60%,${h} L40%,${h - 15} L20%,${h} L0,${h - 15} Z')`
        : `path('M0,${h} L0,15 L20%,${h} L40%,15 L60%,${h} L80%,15 L100%,${h} L100%,0 L0,0 Z')`
    case 'curve':
      return props.flip
        ? `path('M0,0 Q50%,${h * 0.3} 100%,${h} L100%,0 Z')`
        : `path('M0,${h} Q50%,${h * 0.7} 100%,0 L100%,${h} L0,${h} Z')`
    case 'slant':
      return props.flip
        ? `path('M0,0 L100%,${h * 0.4} L100%,${h} L0,${h} Z')`
        : `path('M0,${h * 0.4} L100%,0 L100%,${h} L0,${h} Z')`
    default:
      return 'none'
  }
})
</script>

<template>
  <div 
    class="section-divider-wrapper"
    :style="{ height: `${height}px` }"
  >
    <svg 
      ref="dividerRef"
      class="section-divider" 
      :viewBox="`0 0 1440 ${height}`" 
      preserveAspectRatio="none"
      :style="{ 
        clipPath,
        backgroundColor: color 
      }"
    >
      <title>Section Divider - Oil Flow Pattern</title>
    </svg>
  </div>
</template>

<style scoped>
.section-divider-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.section-divider {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

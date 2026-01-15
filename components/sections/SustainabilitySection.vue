<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useNuxtApp } from '#app'

interface Milestone {
  year: string
  title: string
  description: string
  details: string[]
}

const { $gsap, $ScrollTrigger, $animation } = useNuxtApp()

const activeNode = ref<number | null>(null)
const expandedNodes = ref<number[]>([])
const visibleNodes = ref<number[]>([])

const milestones: Milestone[] = [
  {
    year: '2015',
    title: 'Foundation & Commitment',
    description: 'Company established with sustainability as core pillar',
    details: [
      'Zero-deforestation pledge from day one',
      'Integrated plantation-to-port operations',
      'Initial RSPO application process began'
    ]
  },
  {
    year: '2019',
    title: 'RSPO Certification',
    description: 'Achieved Roundtable on Sustainable Palm Oil certification',
    details: [
      'First Indonesian palm oil exporter in region',
      'Independent audit passed with distinction',
      'Commitment to sustainable practices verified'
    ]
  },
  {
    year: '2020',
    title: 'ISCC EU Certification',
    description: 'International Sustainability and Carbon Certification achieved',
    details: [
      'EU market access secured',
      'Carbon footprint tracking implemented',
      'European sustainability standards met'
    ]
  },
  {
    year: '2023',
    title: '40% Certified Production',
    description: 'Major milestone in sustainable sourcing reached',
    details: [
      '2,800+ employees across operations',
      '85,000 hectares under sustainable management',
      'Community programs expanded'
    ]
  },
  {
    year: '2030',
    title: 'Interim Target',
    description: '75% certified sustainable production target',
    details: [
      'Advanced agritech integration',
      'Precision farming at scale',
      'Community partnership growth'
    ]
  },
  {
    year: '2040',
    title: 'Net Zero by 2040',
    description: 'Complete carbon neutrality across all operations',
    details: [
      'Full carbon footprint elimination',
      'Regenerative agriculture practices',
      'Industry benchmark for sustainability'
    ]
  }
]

const getNodeStyle = (index: number): Record<string, string> => {
  const styles: Record<number, Record<string, string>> = {
    0: { top: '5%', right: '10%' },
    1: { top: '22%', right: '25%' },
    2: { top: '39%', right: '15%' },
    3: { top: '56%', right: '28%' },
    4: { top: '73%', right: '12%' },
    5: { top: '90%', right: '24%' }
  }
  return styles[index] || {}
}

const toggleMilestone = (index: number) => {
  if (expandedNodes.value.includes(index)) {
    expandedNodes.value = expandedNodes.value.filter(i => i !== index)
  } else {
    expandedNodes.value.push(index)
  }
  activeNode.value = activeNode.value === index ? null : index
}

const scrollToMission = () => {
  const missionSection = document.querySelector('#mission')
  if (missionSection) {
    missionSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const onImageError = (e: Event) => {
  console.error('Sustainability image failed to load:', e)
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
}

onMounted(() => {
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    $gsap.set(['.sustainability-background', '.bg-image', '.journey-intro', '.journey-timeline', '.milestone-node'], { opacity: 1 })
    return
  }

  const tl = $gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from('.sustainability-background', {
    opacity: 0,
    duration: 0.8
  })
  .from('.bg-image', {
    scale: 1.2,
    duration: 1.5,
    ease: 'power2.out'
  }, '-=0.4')

  $animation?.staggerReveal?.('.journey-intro > *', { stagger: 0.1 })

  $gsap.from('.timeline-track', {
    scaleX: 0,
    duration: 0.8,
    ease: 'power2.inOut'
  })

  $animation?.staggerReveal?.('.milestone-node', { stagger: 0.15, from: 'random' })

  $gsap.from('.floating-particles', {
    opacity: 0,
    duration: 0.5
  })

  $gsap.from('.corner-accent', {
    scale: 0,
    opacity: 0,
    duration: 0.4,
    stagger: 0.1,
    ease: 'back.out(2)'
  })

  $animation?.bgParallax?.('.bg-image', { speed: 0.2, scrub: true })

  $gsap.to('.bg-gradient-mesh', {
    scrollTrigger: {
      trigger: '.sustainability-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2
    },
    xPercent: -10,
    ease: 'none'
  })

  milestones.forEach((_, index) => {
    $ScrollTrigger.create({
      trigger: `.node-${index}`,
      start: 'top 80%',
      onEnter: () => visibleNodes.value.push(index),
      onLeaveBack: () => {
        const idx = visibleNodes.value.indexOf(index)
        if (idx > -1) visibleNodes.value.splice(idx, 1)
      }
    })
  })

  $gsap.to('.floating-particles', {
    scrollTrigger: {
      trigger: '.sustainability-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    },
    y: -100,
    ease: 'none'
  })

  document.querySelectorAll('.milestone-node').forEach((node) => {
    const cleanup = $animation?.hoverScale?.(node as HTMLElement, { scale: 1.05, duration: 0.3 })
    if (cleanup) cleanupFns.push(cleanup)
  })

  const progressTl = $gsap.timeline({
    scrollTrigger: {
      trigger: '.journey-timeline',
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: true
    }
  })
  progressTl.to('.timeline-progress', {
    height: '100%',
    duration: 1
  })
})

onUnmounted(() => {
  $ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <section id="sustainability" class="sustainability-section">
    <div class="sustainability-background">
      <div class="bg-image-wrapper">
        <img
          src="/images/oil-palm.jpg"
          alt="Sustainable palm oil plantation"
          class="bg-image"
        />
      </div>
      <div class="bg-overlay"></div>
      <div class="bg-texture"></div>
      <div class="bg-gradient-mesh"></div>
    </div>

    <div class="sustainability-content">
      <div class="journey-intro">
        <div class="intro-badge">EESG Framework</div>
        <h2 class="journey-headline">
          Our Sustainability Journey
        </h2>
        <p class="journey-description">
          From our founding in 2015 to our commitment to net zero by 2040,
          discover how Nusantara Palm Industries leads the industry in
          responsible palm oil production.
        </p>

        <div class="journey-stats">
          <div class="stat-item">
            <span class="stat-number">6+</span>
            <span class="stat-label">Years of Commitment</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">40%</span>
            <span class="stat-label">Certified Production</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">2040</span>
            <span class="stat-label">Net Zero Target</span>
          </div>
        </div>

        <div class="journey-ctas">
          <button class="cta-primary" @click="scrollToMission">
            Define Our Sustainability
            <svg class="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div class="scroll-indicator">
          <span class="scroll-text">Scroll to explore</span>
          <div class="scroll-line"></div>
        </div>
      </div>

      <div class="journey-timeline">
        <div class="timeline-track">
          <div class="timeline-progress"></div>
        </div>

        <div
          v-for="(milestone, index) in milestones"
          :key="milestone.year"
          class="milestone-node"
          :class="[
            `node-${index}`,
            { 'is-visible': visibleNodes.includes(index) },
            { 'is-active': activeNode === index }
          ]"
          :style="getNodeStyle(index)"
          @click="toggleMilestone(index)"
        >
          <div class="node-marker">
            <div class="marker-ring"></div>
            <div class="marker-core"></div>
          </div>

          <div class="node-content">
            <div class="node-year">{{ milestone.year }}</div>
            <h3 class="node-title">{{ milestone.title }}</h3>
            <p class="node-description">{{ milestone.description }}</p>

            <transition name="expand">
              <div v-if="expandedNodes.includes(index)" class="node-details">
                <ul class="details-list">
                  <li v-for="detail in milestone.details" :key="detail">
                    <svg class="check-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    {{ detail }}
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <div class="floating-particles">
      <div class="particle" style="top: 15%; left: 20%; animation-delay: 0s;"></div>
      <div class="particle" style="top: 35%; left: 75%; animation-delay: 1s;"></div>
      <div class="particle" style="top: 55%; left: 30%; animation-delay: 2s;"></div>
      <div class="particle" style="top: 75%; left: 80%; animation-delay: 3s;"></div>
      <div class="particle" style="top: 25%; left: 55%; animation-delay: 4s;"></div>
      <div class="particle" style="top: 65%; left: 15%; animation-delay: 5s;"></div>
      <div class="particle" style="top: 85%; left: 45%; animation-delay: 6s;"></div>
      <div class="particle" style="top: 45%; left: 90%; animation-delay: 7s;"></div>
    </div>
    <div class="corner-accent top-left"></div>
    <div class="corner-accent bottom-right"></div>
  </section>
</template>

<style scoped>
.sustainability-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: #2a5c55;
}

.sustainability-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.bg-image-wrapper {
  position: absolute;
  inset: 0;
}

.bg-image {
  width: 100%;
  height: 120%;
  object-fit: cover;
  position: absolute;
  top: -10%;
}

.bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(42, 92, 85, 0.95) 0%,
    rgba(42, 92, 85, 0.8) 50%,
    rgba(42, 92, 85, 0.7) 100%
  );
}

.bg-texture {
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  pointer-events: none;
}

.bg-gradient-mesh {
  position: absolute;
  width: 150%;
  height: 150%;
  top: -25%;
  left: -25%;
  background: radial-gradient(
    circle at 30% 20%,
    rgba(196, 91, 40, 0.15) 0%,
    transparent 40%
  ),
  radial-gradient(
    circle at 70% 80%,
    rgba(212, 162, 76, 0.1) 0%,
    transparent 40%
  );
  pointer-events: none;
}

.sustainability-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 35% 65%;
  min-height: 100vh;
  padding: 4rem 6rem;
}

.journey-intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 4rem;
}

.intro-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  color: #d4a24c;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  background: rgba(212, 162, 76, 0.15);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  width: fit-content;
  margin-bottom: 1.5rem;
}

.journey-headline {
  font-family: 'Jakarta Sans', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  color: #ffffff;
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.02em;
}

.journey-description {
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 2.5rem 0;
}

.journey-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: #d4a24c;
  line-height: 1;
}

.stat-label {
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.25rem;
}

.journey-ctas {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: #c45b28;
  color: #ffffff;
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-primary:hover {
  background: #d4a24c;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(196, 91, 40, 0.35);
}

.cta-arrow {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.cta-primary:hover .cta-arrow {
  transform: translateX(4px);
}

.scroll-indicator {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.scroll-text {
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.scroll-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.3), transparent);
  position: relative;
  overflow: hidden;
}

.scroll-line::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
  background: #d4a24c;
  animation: scrollFlow 2s ease-in-out infinite;
}

@keyframes scrollFlow {
  0%, 100% { transform: translateX(-100%); opacity: 0; }
  50% { transform: translateX(100%); opacity: 1; }
}

.journey-timeline {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-track {
  position: absolute;
  width: 4px;
  height: 80%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  transform: rotate(-25deg);
}

.timeline-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0%;
  background: linear-gradient(180deg, #c45b28, #d4a24c);
  border-radius: 2px;
  transition: height 0.1s linear;
}

.milestone-node {
  position: absolute;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.milestone-node:hover {
  transform: scale(1.05) translateY(-5px);
}

.node-marker {
  position: relative;
  width: 48px;
  height: 48px;
}

.marker-core {
  width: 16px;
  height: 16px;
  background: #ffffff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.node-marker:hover .marker-core,
.milestone-node.is-active .marker-core {
  width: 20px;
  height: 20px;
  background: #d4a24c;
  box-shadow: 0 0 30px rgba(212, 162, 76, 0.6);
}

.marker-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.node-marker:hover .marker-ring,
.milestone-node.is-active .marker-ring {
  width: 56px;
  height: 56px;
  border-color: #d4a24c;
  opacity: 0.5;
}

.node-content {
  position: absolute;
  left: 70px;
  top: 50%;
  transform: translateY(-50%);
  width: 280px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.25rem;
  opacity: 0;
  transition: all 0.4s ease;
  pointer-events: none;
}

.milestone-node.is-visible .node-content {
  opacity: 1;
  pointer-events: auto;
}

.milestone-node:hover .node-content,
.milestone-node.is-active .node-content {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(212, 162, 76, 0.5);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.node-year {
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff, #d4a24c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.node-title {
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
}

.node-description {
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.5;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 200px;
}

.details-list {
  list-style: none;
  padding: 0.75rem 0 0 0;
  margin: 0.75rem 0 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.details-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.9);
  padding: 0.35rem 0;
}

.check-icon {
  width: 16px;
  height: 16px;
  color: #d4a24c;
  flex-shrink: 0;
  margin-top: 2px;
}

.floating-particles {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(212, 162, 76, 0.3);
  border-radius: 50%;
  animation: float 8s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
  50% { transform: translateY(-30px) rotate(180deg); opacity: 0.6; }
}

.corner-accent {
  position: absolute;
  width: 200px;
  height: 200px;
  z-index: 1;
  pointer-events: none;
}

.corner-accent.top-left {
  top: -50px;
  left: -50px;
  background: radial-gradient(circle, rgba(196, 91, 40, 0.1) 0%, transparent 70%);
}

.corner-accent.bottom-right {
  bottom: -80px;
  right: -80px;
  background: radial-gradient(circle, rgba(212, 162, 76, 0.08) 0%, transparent 70%);
}

@media (max-width: 1024px) {
  .sustainability-content {
    grid-template-columns: 1fr;
    padding: 3rem 2rem;
  }

  .journey-intro {
    padding-right: 0;
    padding-bottom: 3rem;
    text-align: center;
    align-items: center;
  }

  .journey-stats {
    justify-content: center;
  }

  .journey-ctas {
    justify-content: center;
  }

  .journey-timeline {
    min-height: 600px;
  }

  .timeline-track {
    transform: rotate(0deg);
    height: 100%;
    width: 3px;
  }

  .milestone-node {
    position: relative !important;
    top: auto !important;
    right: auto !important;
    left: auto !important;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .node-content {
    position: static;
    transform: none;
    width: 100%;
    max-width: 400px;
  }
}

@media (max-width: 767px) {
  .sustainability-content {
    padding: 2rem 1.5rem;
  }

  .journey-stats {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }

  .journey-ctas {
    width: 100%;
  }

  .cta-primary {
    width: 100%;
    justify-content: center;
  }

  .journey-timeline {
    min-height: 800px;
  }

  .node-content {
    padding: 1rem;
  }
}
</style>

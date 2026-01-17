<script setup lang="ts">
import { inject, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useNuxtApp } from '#app'
import SkipLink from '~/components/ui/SkipLink.vue'
import { useFocusManagement } from '~/composables/useFocusManagement'
import { useKeyboardNavigation } from '~/composables/useKeyboardNavigation'

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'Stats', href: '#stats' },
  { label: 'Sustainability', href: '#sustainability' },
  { label: 'Mission', href: '#mission' },
  { label: 'Geographic', href: '#geographic' },
  { label: 'Product', href: '#product' },
  { label: 'Contact', href: '#contact' }
]

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isMobile = ref(false)

const { $animation } = useNuxtApp()
const injectedScrollToSection = inject<((href: string) => void) | null>('scrollToSection', null)
let cleanupFns: Array<() => void> = []

const { trapFocus, restoreFocus } = useFocusManagement()
const { handleEscape } = useKeyboardNavigation()
let focusTrapCleanup: (() => void) | null = null

const checkScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
    const mobileMenu = document.querySelector('.app-nav__mobile') as HTMLElement
    if (mobileMenu) {
      focusTrapCleanup = trapFocus(mobileMenu)
    }
  } else {
    document.body.style.overflow = ''
    if (focusTrapCleanup) {
      focusTrapCleanup()
      focusTrapCleanup = null
    }
    restoreFocus()
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
  if (focusTrapCleanup) {
    focusTrapCleanup()
    focusTrapCleanup = null
  }
  restoreFocus()
}

const scrollToSection = (e: Event, href: string) => {
  e.preventDefault()
  closeMobileMenu()
  
  if (injectedScrollToSection) {
    injectedScrollToSection(href)
    return
  }
  
  nextTick(() => {
    const element = document.querySelector(href) as HTMLElement | null
    if (!element) {
      console.warn(`Element not found: ${href}`)
      return
    }
    
    const navHeight = 80
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - navHeight
    
    if (href === '#main-content') {
      element.setAttribute('tabindex', '-1')
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setTimeout(() => {
        element.focus()
        element.addEventListener('blur', () => {
          element.removeAttribute('tabindex')
        }, { once: true })
      }, 100)
    } else {
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  })
}

onMounted(() => {
  checkScroll()
  checkMobile()
  window.addEventListener('scroll', checkScroll)
  window.addEventListener('resize', checkMobile)

  const escapeCleanup = handleEscape(() => {
    if (isMobileMenuOpen.value) {
      closeMobileMenu()
    }
  })
  cleanupFns.push(escapeCleanup)

  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!shouldReduceMotion) {
    document.querySelectorAll('.app-nav__link').forEach((link) => {
      const cleanupHover = $animation?.hoverScale?.(link as HTMLElement, { scale: 1.05, duration: 0.2 })
      if (cleanupHover) cleanupFns.push(cleanupHover)
      const underline = (link as HTMLElement).querySelector('.app-nav__underline')
      if (underline) {
        const cleanupUnderline = $animation?.underlineExpand?.(underline as HTMLElement, {
          duration: 0.25,
          trigger: link as HTMLElement
        })
        if (cleanupUnderline) cleanupFns.push(cleanupUnderline)
      }
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
  window.removeEventListener('resize', checkMobile)
  cleanupFns.forEach(fn => fn && typeof fn === 'function' && fn())
  if (focusTrapCleanup) {
    focusTrapCleanup()
  }
  document.body.style.overflow = ''
})
</script>

<template>
  <nav
    :class="[
      'app-nav',
      { 'app-nav--scrolled': isScrolled },
      { 'app-nav--mobile-open': isMobileMenuOpen }
    ]"
    role="navigation"
    aria-label="Main navigation"
  >
    <SkipLink />
    <div class="app-nav__container">
      <!-- Logo -->
      <button
        class="app-nav__logo"
        @click="(e) => scrollToSection(e, '#hero')"
        aria-label="Go to homepage"
      >
        <NpiLogo variant="light" size="sm" />
      </button>

      <!-- Desktop Navigation -->
      <div class="app-nav__desktop">
        <ul class="app-nav__list">
          <li
            v-for="item in navItems"
            :key="item.href"
            class="app-nav__item"
          >
            <a
              :href="item.href"
              class="app-nav__link"
              @click="scrollToSection($event, item.href)"
              :aria-label="`Navigate to ${item.label} section`"
            >
              <span class="app-nav__label">{{ item.label }}</span>
              <span class="app-nav__underline" aria-hidden="true"></span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="app-nav__mobile-toggle"
        @click="toggleMobileMenu"
        :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="isMobileMenuOpen"
        aria-controls="mobile-menu"
      >
        <span :class="['hamburger', { 'hamburger--open': isMobileMenuOpen }]">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>

    <!-- Backdrop Overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="app-nav__backdrop"
      @click="closeMobileMenu"
      aria-hidden="true"
    ></div>

    <!-- Mobile Menu -->
    <div
      id="mobile-menu"
      class="app-nav__mobile"
      v-if="isMobileMenuOpen"
      role="menu"
      aria-label="Mobile navigation menu"
    >
      <ul class="app-nav__mobile-list">
        <li
          v-for="item in navItems"
          :key="item.href"
          class="app-nav__mobile-item"
        >
          <a
            :href="item.href"
            class="app-nav__mobile-link"
            @click="scrollToSection($event, item.href)"
            role="menuitem"
            :aria-label="`Navigate to ${item.label} section`"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.app-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  transition: all 0.3s ease;
  background: transparent;
}

.app-nav--scrolled {
  background: rgba(44, 36, 22, 0.95);
  backdrop-filter: blur(10px);
  padding: 0.75rem 2rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
}

.app-nav__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.app-nav__logo {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.app-nav__logo:hover {
  transform: scale(1.05);
}

.app-nav__logo:focus-visible {
  outline: 3px solid #d4a24c;
  outline-offset: 4px;
  border-radius: 4px;
}

/* Desktop Navigation */
.app-nav__desktop {
  display: none;
}

@media (min-width: 768px) {
  .app-nav__desktop {
    display: block;
  }
}

.app-nav__list {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.app-nav__item {
  margin: 0;
  padding: 0;
}

.app-nav__link {
  background: none;
  border: none;
  color: #ffffff;
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.app-nav__link:focus-visible {
  outline: 3px solid #d4a24c;
  outline-offset: 4px;
  border-radius: 2px;
}

.app-nav__underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #d4a24c;
}

.app-nav__link:hover {
  color: #d4a24c;
}

/* Mobile Toggle */
.app-nav__mobile-toggle {
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

@media (max-width: 767px) {
  .app-nav__mobile-toggle {
    background: rgba(44, 36, 22, 0.7);
    border-radius: 8px;
    padding: 0.75rem;
    transition: background 0.3s ease;
  }

  .app-nav--scrolled .app-nav__mobile-toggle {
    background: none;
  }
}

.app-nav__mobile-toggle:focus-visible {
  outline: 3px solid #d4a24c;
  outline-offset: 4px;
  border-radius: 4px;
}

@media (min-width: 768px) {
  .app-nav__mobile-toggle {
    display: none;
  }
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 24px;
  height: 18px;
  justify-content: center;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: #ffffff;
  transition: all 0.3s ease;
}

.hamburger--open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger--open span:nth-child(2) {
  opacity: 0;
}

.hamburger--open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Backdrop Overlay */
.app-nav__backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(44, 36, 22, 0.9);
  z-index: 999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Mobile Menu */
.app-nav__mobile {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #2c2416;
  padding-top: 80px;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 2rem;
  z-index: 1000;
  animation: slideIn 0.3s ease;
  overflow-y: auto;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.app-nav__mobile-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.app-nav__mobile-item {
  margin: 0;
  padding: 0;
}

.app-nav__mobile-link {
  display: block;
  width: 100%;
  background: none;
  border: none;
  color: #ffffff;
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
  text-decoration: none;
}

.app-nav__mobile-link:focus-visible {
  outline: 3px solid #d4a24c;
  outline-offset: 4px;
  border-radius: 2px;
}

.app-nav__mobile-link:hover {
  color: #d4a24c;
}

/* Hide mobile menu when on hero section */
.app-nav--mobile-open .app-nav__mobile {
  display: block;
}
</style>

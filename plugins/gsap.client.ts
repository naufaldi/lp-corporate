import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger)
  }

  const config = {
    flowEase: 'power2.inOut',
    revealEase: 'power3.out',
    elasticEase: 'elastic.out(1, 0.5)',
    staggerBase: 0.08,
    durationShort: 0.4,
    durationMedium: 0.6,
    durationLong: 0.8,
    parallaxSpeed: 0.3,
    scrubFactor: 0.5,
    magneticStrength: 25,
    magneticDuration: 0.3
  }

  const utils = {
    shouldReduceMotion(): boolean {
      if (import.meta.client) {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches
      }
      return false
    },

    getStaggeredDuration(count: number, baseStagger: number = config.staggerBase): number {
      return count * baseStagger
    },

    createTimeline(onComplete?: () => void): gsap.core.Timeline {
      const shouldReduce = this.shouldReduceMotion()
      
      const tl = gsap.timeline({
        onComplete,
        defaults: shouldReduce ? { duration: 0, ease: 'none' } : undefined
      })
      
      return tl
    },

    getElement(target: string | HTMLElement | Element): HTMLElement | null {
      if (typeof target === 'string') {
        return document.querySelector(target) as HTMLElement
      }
      return target as HTMLElement
    }
  }

  const animations = {
    revealFlow(
      target: string | HTMLElement | Element[],
      options: {
        delay?: number
        duration?: number
        stagger?: number
        ease?: string
        startAt?: Record<string, unknown>
      } = {}
    ) {
      const shouldReduce = utils.shouldReduceMotion()
      const {
        delay = 0,
        duration = config.durationMedium,
        stagger = config.staggerBase,
        ease = config.flowEase,
        startAt = { opacity: 0, x: -50 }
      } = options

      if (shouldReduce) {
        return gsap.set(target, { opacity: 1 })
      }

      return gsap.fromTo(target, 
        startAt,
        {
          opacity: 1,
          x: 0,
          duration,
          stagger,
          delay,
          ease,
          scrollTrigger: {
            trigger: target,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    },

    slideInLeft(
      target: string | HTMLElement | Element[],
      options: {
        delay?: number
        duration?: number
        stagger?: number
      } = {}
    ) {
      const shouldReduce = utils.shouldReduceMotion()
      const { delay = 0, duration = config.durationMedium, stagger = config.staggerBase } = options

      if (shouldReduce) {
        return gsap.set(target, { opacity: 1, x: 0 })
      }

      return gsap.fromTo(target,
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration,
          stagger,
          delay,
          ease: config.flowEase,
          scrollTrigger: {
            trigger: target,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    },

    slideInRight(
      target: string | HTMLElement | Element[],
      options: {
        delay?: number
        duration?: number
        stagger?: number
      } = {}
    ) {
      const shouldReduce = utils.shouldReduceMotion()
      const { delay = 0, duration = config.durationMedium, stagger = config.staggerBase } = options

      if (shouldReduce) {
        return gsap.set(target, { opacity: 1, x: 0 })
      }

      return gsap.fromTo(target,
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration,
          stagger,
          delay,
          ease: config.flowEase,
          scrollTrigger: {
            trigger: target,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    },

    revealUp(
      target: string | HTMLElement | Element[],
      options: {
        delay?: number
        duration?: number
        stagger?: number
        yStart?: number
      } = {}
    ) {
      const shouldReduce = utils.shouldReduceMotion()
      const { 
        delay = 0, 
        duration = config.durationMedium, 
        stagger = config.staggerBase,
        yStart = 40 
      } = options

      if (shouldReduce) {
        return gsap.set(target, { opacity: 1, y: 0 })
      }

      return gsap.fromTo(target,
        { opacity: 0, y: yStart },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          delay,
          ease: config.revealEase,
          scrollTrigger: {
            trigger: target,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    },

    convergeScale(
      target: string | HTMLElement | Element[],
      options: {
        delay?: number
        duration?: number
        stagger?: number
        scaleStart?: number
      } = {}
    ) {
      const shouldReduce = utils.shouldReduceMotion()
      const { 
        delay = 0, 
        duration = config.durationLong, 
        stagger = config.staggerBase,
        scaleStart = 0.9 
      } = options

      if (shouldReduce) {
        return gsap.set(target, { opacity: 1, scale: 1 })
      }

      return gsap.fromTo(target,
        { opacity: 0, scale: scaleStart },
        {
          opacity: 1,
          scale: 1,
          duration,
          stagger,
          delay,
          ease: config.elasticEase,
          scrollTrigger: {
            trigger: target,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    },

    parallaxFlow(
      target: string | HTMLElement,
      options: {
        speed?: number
        direction?: 'left' | 'right'
        scrub?: boolean
      } = {}
    ) {
      const shouldReduce = utils.shouldReduceMotion()
      const { speed = config.parallaxSpeed, direction = 'left', scrub = true } = options

      if (shouldReduce) return

      const xPercent = direction === 'left' ? -speed * 100 : speed * 100

      return gsap.to(target, {
        xPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: target,
          start: 'top bottom',
          end: 'bottom top',
          scrub: scrub ? config.scrubFactor : false
        }
      })
    },

    parallaxVertical(
      target: string | HTMLElement,
      options: {
        speed?: number
        scrub?: boolean
      } = {}
    ) {
      const shouldReduce = utils.shouldReduceMotion()
      const { speed = config.parallaxSpeed, scrub = true } = options

      if (shouldReduce) return

      return gsap.to(target, {
        yPercent: speed * 50,
        ease: 'none',
        scrollTrigger: {
          trigger: target,
          start: 'top bottom',
          end: 'bottom top',
          scrub: scrub ? config.scrubFactor : false
        }
      })
    },

    pipelineProgress(
      target: string | HTMLElement,
      options: {
        delay?: number
        duration?: number
      } = {}
    ) {
      const shouldReduce = utils.shouldReduceMotion()
      const { delay = 0, duration = 1.2 } = options

      if (shouldReduce) {
        return gsap.set(target, { width: '100%' })
      }

      return gsap.fromTo(target as HTMLElement,
        { width: '0%' },
        {
          width: '100%',
          duration,
          delay,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: target,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    },

    countUp(
      target: string | HTMLElement,
      options: {
        start?: number
        end?: number
        duration?: number
        prefix?: string
        suffix?: string
      } = {}
    ) {
      const shouldReduce = utils.shouldReduceMotion()
      const { start = 0, end = 100, duration = 1.5, prefix = '', suffix = '' } = options

      if (shouldReduce) {
        const el = utils.getElement(target)
        if (el) el.textContent = `${prefix}${end}${suffix}`
        return
      }

      const obj = { value: start }
      const el = utils.getElement(target)
      
      if (!el) return

      return gsap.to(obj, {
        value: end,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.value)}${suffix}`
        },
        scrollTrigger: {
          trigger: target,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })
    },

    pulse(
      target: string | HTMLElement,
      options: {
        scale?: number
        duration?: number
        repeat?: number
      } = {}
    ) {
      const shouldReduce = utils.shouldReduceMotion()
      const { scale = 1.05, duration = 0.4, repeat = -1 } = options

      if (shouldReduce) return

      return gsap.to(target, {
        scale,
        duration,
        repeat,
        yoyo: true,
        ease: 'power1.inOut'
      })
    },

    hoverScale(
      target: string | HTMLElement,
      options: {
        scale?: number
        duration?: number
      } = {}
    ) {
      const { scale = 1.02, duration = 0.3 } = options

      const el = utils.getElement(target)
      if (!el) return

      const onEnter = () => {
        if (utils.shouldReduceMotion()) return
        gsap.to(el, { scale, duration, ease: 'power2.out' })
      }

      const onLeave = () => {
        gsap.to(el, { scale: 1, duration, ease: 'power2.out' })
      }

      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)

      return () => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      }
    },

    magneticButton(
      target: string | HTMLElement,
      options: {
        strength?: number
        duration?: number
      } = {}
    ) {
      const shouldReduce = utils.shouldReduceMotion()
      const { strength = config.magneticStrength, duration = config.magneticDuration } = options

      if (shouldReduce) return

      const el = utils.getElement(target)
      if (!el) return

      const onMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const mouseX = e.clientX
        const mouseY = e.clientY
        
        const distX = mouseX - centerX
        const distY = mouseY - centerY
        
        const distance = Math.sqrt(distX * distX + distY * distY)
        const maxDistance = strength * 2
        
        if (distance < maxDistance) {
          const factor = 1 - distance / maxDistance
          const moveX = distX * factor * 0.3
          const moveY = distY * factor * 0.3
          
          gsap.to(el, {
            x: moveX,
            y: moveY,
            duration,
            ease: 'power2.out'
          })
        }
      }

      const onMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration,
          ease: 'power2.out'
        })
      }

      el.addEventListener('mousemove', onMouseMove as EventListener)
      el.addEventListener('mouseleave', onMouseLeave as EventListener)

      return () => {
        el.removeEventListener('mousemove', onMouseMove as EventListener)
        el.removeEventListener('mouseleave', onMouseLeave as EventListener)
      }
    },

    flowCascade(
      target: string | HTMLElement | Element[],
      options: {
        delay?: number
        duration?: number
        stagger?: number
        direction?: 'left' | 'right' | 'center'
      } = {}
    ) {
      const shouldReduce = utils.shouldReduceMotion()
      const { 
        delay = 0, 
        duration = config.durationMedium, 
        stagger = config.staggerBase,
        direction = 'left'
      } = options

      if (shouldReduce) {
        return gsap.set(target, { opacity: 1, x: 0, y: 0 })
      }

      const startAt: Record<string, unknown> = { opacity: 0 }
      
      switch (direction) {
        case 'left':
          startAt.x = -60
          break
        case 'right':
          startAt.x = 60
          break
        case 'center':
          startAt.y = 30
          break
      }

      return gsap.fromTo(target,
        startAt,
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          stagger,
          delay,
          ease: config.flowEase,
          scrollTrigger: {
            trigger: target,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    },

    // Underline animation for links
    linkUnderline(
      target: string | HTMLElement,
      options: {
        duration?: number
      } = {}
    ) {
      const shouldReduce = utils.shouldReduceMotion()
      const { duration = 0.25 } = options

      const el = utils.getElement(target)
      if (!el) return

      const onEnter = () => {
        if (utils.shouldReduceMotion()) return
        gsap.to(el, { width: '100%', duration, ease: 'power2.out' })
      }

      const onLeave = () => {
        gsap.to(el, { width: '0%', duration, ease: 'power2.out' })
      }

      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)

      return () => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      }
    },

    // Focus ring animation for form fields
    focusRing(
      target: string | HTMLElement,
      options: {
        scale?: number
        duration?: number
      } = {}
    ) {
      const shouldReduce = utils.shouldReduceMotion()
      const { scale = 1.02, duration = 0.2 } = options

      const el = utils.getElement(target)
      if (!el) return

      const onFocus = () => {
        if (utils.shouldReduceMotion()) return
        gsap.to(el, { scale, duration, ease: 'power2.out' })
      }

      const onBlur = () => {
        gsap.to(el, { scale: 1, duration, ease: 'power2.out' })
      }

      el.addEventListener('focus', onFocus)
      el.addEventListener('blur', onBlur)

      return () => {
        el.removeEventListener('focus', onFocus)
        el.removeEventListener('blur', onBlur)
      }
    }
  }

  return {
    provide: {
      gsap,
      ScrollTrigger,
      $animation: animations,
      $animationConfig: config,
      $animationUtils: utils
    }
  }
})

export function useFlowAnimation() {
  const nuxtApp = useNuxtApp()
  const { $gsap, $animation, $animationUtils } = nuxtApp as any

  const shouldReduceMotion = (): boolean => {
    return $animationUtils?.shouldReduceMotion() ?? false
  }

  const revealFlow = (selector: string, options: any = {}) => {
    $animation?.revealFlow?.(selector, options)
  }

  const slideInLeft = (selector: string, options: any = {}) => {
    $animation?.slideInLeft?.(selector, options)
  }

  const slideInRight = (selector: string, options: any = {}) => {
    $animation?.slideInRight?.(selector, options)
  }

  const revealUp = (selector: string, options: any = {}) => {
    $animation?.revealUp?.(selector, options)
  }

  const convergeScale = (selector: string, options: any = {}) => {
    $animation?.convergeScale?.(selector, options)
  }

  const parallaxFlow = (selector: string, options: any = {}) => {
    $animation?.parallaxFlow?.(selector, options)
  }

  const parallaxVertical = (selector: string, options: any = {}) => {
    $animation?.parallaxVertical?.(selector, options)
  }

  const pipelineProgress = (selector: string, options: any = {}) => {
    $animation?.pipelineProgress?.(selector, options)
  }

  const countUp = (selector: string, options: any = {}) => {
    $animation?.countUp?.(selector, options)
  }

  const pulse = (selector: string, options: any = {}) => {
    return $animation?.pulse?.(selector, options)
  }

  const hoverScale = (selector: string, options: any = {}) => {
    return $animation?.hoverScale?.(selector, options)
  }

  const magneticButton = (selector: string, options: any = {}) => {
    return $animation?.magneticButton?.(selector, options)
  }

  const flowCascade = (selector: string, options: any = {}) => {
    $animation?.flowCascade?.(selector, options)
  }

  const linkUnderline = (selector: string, options: any = {}) => {
    return $animation?.linkUnderline?.(selector, options)
  }

  const focusRing = (selector: string, options: any = {}) => {
    return $animation?.focusRing?.(selector, options)
  }

  return {
    shouldReduceMotion,
    revealFlow,
    slideInLeft,
    slideInRight,
    revealUp,
    convergeScale,
    parallaxFlow,
    parallaxVertical,
    pipelineProgress,
    countUp,
    pulse,
    hoverScale,
    magneticButton,
    flowCascade,
    linkUnderline,
    focusRing
  }
}

export default useFlowAnimation

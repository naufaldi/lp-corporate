<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useNuxtApp } from '#app'

interface ContactInfo {
  id: string
  type: string
  label: string
  value: string
  icon: string
  link?: string
}

interface Office {
  id: string
  name: string
  address: string
  role: string
  isHq: boolean
}

const { $gsap, $animation } = useNuxtApp()
let cleanupFns: Array<() => void> = []

const contactInfo: ContactInfo[] = [
  {
    id: 'email',
    type: 'Email',
    label: 'General Inquiries',
    value: 'info@nusantarapalm.id',
    icon: 'email',
    link: 'mailto:info@nusantarapalm.id'
  },
  {
    id: 'phone',
    type: 'Phone',
    label: 'Phone Number',
    value: '+62 21 555 0123',
    icon: 'phone',
    link: 'tel:+62215550123'
  },
  {
    id: 'trade',
    type: 'Trade',
    label: 'Trade Inquiries',
    value: 'trade@nusantarapalm.id',
    icon: 'trade',
    link: 'mailto:trade@nusantarapalm.id'
  }
]

const offices: Office[] = [
  {
    id: 'hq',
    name: 'Jakarta Headquarters',
    address: 'Strategic hub for Southeast Asian trade operations',
    role: 'Corporate HQ & Sales',
    isHq: true
  },
  {
    id: 'singapore',
    name: 'Singapore Office',
    address: 'Regional office handling Asia-Pacific trade coordination',
    role: 'Regional Trade Hub',
    isHq: false
  }
]

const formData = ref({
  name: '',
  email: '',
  company: '',
  message: ''
})

const submitted = ref(false)
const submitting = ref(false)

const submitForm = async () => {
  submitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  submitted.value = true
  submitting.value = false
}

onMounted(() => {
  if (!import.meta.client) return

  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    $gsap.set(['.contact-hero', '.hero-stat', '.contact-content', '.info-card', '.office-card', '.form-group'], { opacity: 1, y: 0 })
    return
  }

  $animation?.batchReveal?.('.contact-hero', {
    trigger: '#contact',
    duration: 1,
    y: 40
  })

  $animation?.batchReveal?.('.hero-stat', {
    trigger: '#contact',
    duration: 0.5,
    stagger: 0.12,
    y: 20
  })

  $animation?.batchReveal?.('.contact-content', {
    trigger: '#contact',
    duration: 0.8,
    y: 60
  })

  $animation?.batchReveal?.('.info-card', {
    trigger: '#contact',
    duration: 0.5,
    stagger: 0.1,
    y: 30
  })

  $animation?.batchReveal?.('.office-card', {
    trigger: '#contact',
    duration: 0.5,
    stagger: 0.15,
    y: 20
  })

  $animation?.batchReveal?.('.form-group', {
    trigger: '#contact',
    duration: 0.4,
    stagger: 0.08,
    y: 20
  })

  document.querySelectorAll('.info-card').forEach((card) => {
    const cleanup = $animation?.hoverScale?.(card as HTMLElement, { scale: 1.02, duration: 0.3 })
    if (cleanup) cleanupFns.push(cleanup)
  })

  document.querySelectorAll('.office-card').forEach((card) => {
    const cleanup = $animation?.hoverScale?.(card as HTMLElement, { scale: 1.02, duration: 0.3 })
    if (cleanup) cleanupFns.push(cleanup)
  })

  document.querySelectorAll('.form-input, .form-textarea').forEach((input) => {
    const cleanup = $animation?.focusRing?.(input as HTMLElement, { scale: 1.01, duration: 0.2 })
    if (cleanup) cleanupFns.push(cleanup)
  })
})

onUnmounted(() => {
  cleanupFns.forEach(fn => fn && typeof fn === 'function' && fn())
})
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="contact-hero">
      <div class="hero-background">
        <div class="bg-noise"></div>
        <div class="bg-gradient-sweep"></div>
        <div class="bg-pattern-overlay"></div>
        <div class="hero-accent-bar"></div>
      </div>

      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </span>
          <span class="badge-text">Contact Our Team</span>
        </div>

        <h2 class="hero-title">
          Ready to Secure Your
          <span class="title-accent">Palm Oil Supply?</span>
        </h2>

        <p class="hero-description">
          Partner with Indonesia's leading sustainable CPO exporter. 
          Reliable supply, full traceability, and trusted trade relationships across Asia.
        </p>

        <div class="hero-stats">
          <div class="hero-stat">
            <span class="stat-value">15+</span>
            <span class="stat-label">Years Experience</span>
          </div>
          <div class="hero-stat">
            <span class="stat-value">380K</span>
            <span class="stat-label">Metric Tons Exported</span>
          </div>
          <div class="hero-stat">
            <span class="stat-value">2</span>
            <span class="stat-label">Global Offices</span>
          </div>
        </div>
      </div>
    </div>

    <div class="contact-content">
      <div class="content-grid">
        <div class="info-column">
          <div class="info-section">
            <h3 class="section-title">Get in Touch</h3>
            <p class="section-description">
              Our trade team is ready to support your business requirements across Asian markets.
            </p>

            <div class="info-grid">
              <a
                v-for="info in contactInfo"
                :key="info.id"
                :href="info.link"
                class="info-card"
              >
                <div class="info-icon">
                  <svg v-if="info.icon === 'email'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 6L12 13 2 6" />
                  </svg>
                  <svg v-else-if="info.icon === 'phone'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <div class="info-details">
                  <span class="info-label">{{ info.label }}</span>
                  <span class="info-value">{{ info.value }}</span>
                </div>
                <div class="info-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>
          </div>

          <div class="offices-section">
            <h3 class="section-title">Global Presence</h3>
            <div class="offices-grid">
              <div
                v-for="office in offices"
                :key="office.id"
                class="office-card"
              >
                <div class="office-header">
                  <span class="office-badge" :class="office.isHq ? 'badge-hq' : 'badge-regional'">
                    {{ office.isHq ? 'HQ' : 'Regional' }}
                  </span>
                  <span class="office-role">{{ office.role }}</span>
                </div>
                <span class="office-name">{{ office.name }}</span>
                <span class="office-address">{{ office.address }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="form-column">
          <div class="contact-form">
            <div class="form-header">
              <span class="form-label">Send Inquiry</span>
              <h3 class="form-title">Start Your <span class="title-highlight">Supply Partnership</span></h3>
            </div>

            <div v-if="!submitted" class="form-fields">
              <div class="form-row">
                <div class="form-group">
                  <label for="name" class="form-label-input">Your Name *</label>
                  <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    placeholder="Full name"
                    class="form-input"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="email" class="form-label-input">Email Address *</label>
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    placeholder="Email"
                    class="form-input"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="company" class="form-label-input">Company</label>
                <input
                  id="company"
                  v-model="formData.company"
                  type="text"
                  placeholder="Company name"
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label for="message" class="form-label-input">Requirements *</label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  rows="4"
                  placeholder="Describe your palm oil requirements..."
                  class="form-textarea"
                  required
                ></textarea>
              </div>

              <button
                class="submit-btn"
                :disabled="!formData.name || !formData.email || !formData.message || submitting"
                @click="submitForm"
              >
                <span v-if="!submitting">Request Callback</span>
                <span v-else class="submitting">
                  <svg class="spinner" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="30 70"/>
                  </svg>
                  Processing...
                </span>
              </button>
            </div>

            <div v-else class="success-message">
              <div class="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h4 class="success-title">Inquiry Submitted</h4>
              <p class="success-desc">
                Thank you. Our trade team will contact you within 24-48 hours to discuss your palm oil requirements.
              </p>
              <button class="reset-btn" @click="submitted = false">Submit Another</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  width: 100%;
  min-height: 100vh;
  background: #f5f0e8;
}

.contact-hero {
  position: relative;
  width: 100%;
  padding: 5rem 5rem 4rem;
  background: #2c2416;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.bg-noise {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.02;
}

.bg-gradient-sweep {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 80%;
  height: 150%;
  background: conic-gradient(
    from 180deg at 50% 50%,
    rgba(196, 91, 40, 0.12) 0deg,
    rgba(42, 92, 85, 0.08) 120deg,
    rgba(196, 91, 40, 0.05) 240deg,
    transparent 360deg
  );
}

.bg-pattern-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f5f0e8' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.hero-accent-bar {
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #c45b28 0%, #e6b84d 50%, #c45b28 100%);
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 800px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: rgba(196, 91, 40, 0.15);
  border: 1px solid rgba(230, 184, 77, 0.3);
  border-radius: 100px;
  margin-bottom: 1.5rem;
}

.badge-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e6b84d;
}

.badge-icon svg {
  width: 100%;
  height: 100%;
}

.badge-text {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #e6b84d;
}

.hero-title {
  font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  font-weight: 700;
  color: #f5f0e8;
  line-height: 1.15;
  margin-bottom: 1.25rem;
  font-family: 'Jakarta Sans', sans-serif;
}

.title-accent {
  display: block;
  color: #c45b28;
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.7;
  color: rgba(245, 240, 232, 0.7);
  margin-bottom: 2.5rem;
  max-width: 600px;
}

.hero-stats {
  display: flex;
  gap: 3rem;
}

.hero-stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #e6b84d;
  line-height: 1;
  font-family: 'Jakarta Sans', sans-serif;
}

.stat-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(245, 240, 232, 0.5);
}

.contact-content {
  padding: 4rem 5rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
}

.info-column {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c2416;
  margin-bottom: 0.75rem;
  font-family: 'Jakarta Sans', sans-serif;
}

.section-description {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(44, 36, 22, 0.7);
  margin-bottom: 1.5rem;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: #ffffff;
  border: 1px solid rgba(44, 36, 22, 0.08);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.info-card:hover {
  border-color: rgba(196, 91, 40, 0.3);
  box-shadow: 0 8px 24px rgba(44, 36, 22, 0.08);
}

.info-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(196, 91, 40, 0.1);
  border-radius: 10px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.info-card:hover .info-icon {
  background: #c45b28;
}

.info-icon svg {
  width: 22px;
  height: 22px;
  color: #c45b28;
  transition: all 0.3s ease;
}

.info-card:hover .info-icon svg {
  color: #ffffff;
}

.info-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(44, 36, 22, 0.5);
}

.info-value {
  font-size: 0.95rem;
  font-weight: 500;
  color: #2c2416;
}

.info-arrow {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(44, 36, 22, 0.3);
  transition: all 0.3s ease;
}

.info-card:hover .info-arrow {
  color: #c45b28;
  transform: translateX(4px);
}

.info-arrow svg {
  width: 100%;
  height: 100%;
}

.offices-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.office-card {
  padding: 1.25rem;
  background: #2c2416;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.office-card:hover {
  box-shadow: 0 12px 32px rgba(44, 36, 22, 0.2);
}

.office-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.office-badge {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.badge-hq {
  background: rgba(196, 91, 40, 0.25);
  color: #e6b84d;
}

.badge-regional {
  background: rgba(212, 162, 76, 0.2);
  color: #d4a24c;
}

.office-role {
  font-size: 0.7rem;
  color: rgba(245, 240, 232, 0.5);
}

.office-name {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: #f5f0e8;
  margin-bottom: 0.375rem;
}

.office-address {
  font-size: 0.8rem;
  color: rgba(245, 240, 232, 0.6);
  line-height: 1.4;
}

.form-column {
  display: flex;
  justify-content: end;
}

.contact-form {
  width: 100%;
  max-width: 480px;
  padding: 2.5rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(44, 36, 22, 0.08);
}

.form-header {
  margin-bottom: 2rem;
}

.form-label {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #c45b28;
  margin-bottom: 0.5rem;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c2416;
  font-family: 'Jakarta Sans', sans-serif;
}

.title-highlight {
  color: #c45b28;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-label-input {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(44, 36, 22, 0.6);
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  background: #faf7f2;
  border: 1px solid rgba(44, 36, 22, 0.1);
  border-radius: 8px;
  font-size: 0.95rem;
  color: #2c2416;
  transition: all 0.3s ease;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(44, 36, 22, 0.3);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #c45b28;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(196, 91, 40, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-btn {
  width: 100%;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #c45b28 0%, #b54a1e 100%);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(196, 91, 40, 0.35);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submitting {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.spinner {
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.success-message {
  text-align: center;
  padding: 1.5rem 0;
}

.success-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(42, 92, 85, 0.1);
  border-radius: 50%;
}

.success-icon svg {
  width: 32px;
  height: 32px;
  color: #2a5c55;
}

.success-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2c2416;
  margin-bottom: 0.5rem;
  font-family: 'Jakarta Sans', sans-serif;
}

.success-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(44, 36, 22, 0.7);
  margin-bottom: 1.5rem;
}

.reset-btn {
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: #c45b28;
  font-size: 0.9rem;
  font-weight: 600;
  border: 2px solid #c45b28;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background: #c45b28;
  color: #ffffff;
}

@media (max-width: 1200px) {
  .contact-hero {
    padding: 4rem 3rem 3rem;
  }

  .contact-content {
    padding: 3rem 3rem;
  }

  .content-grid {
    gap: 3rem;
  }
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .form-column {
    justify-content: start;
  }

  .contact-form {
    max-width: 100%;
  }

  .offices-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .contact-hero {
    padding: 3rem 2rem 2.5rem;
  }

  .contact-content {
    padding: 2.5rem 1.5rem;
  }

  .hero-stats {
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .stat-value {
    font-size: 2rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .info-card {
    padding: 1rem;
  }

  .office-card {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.75rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .contact-form {
    padding: 1.5rem;
  }

  .form-title {
    font-size: 1.25rem;
  }
}
</style>

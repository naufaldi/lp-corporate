<script setup lang="ts">
import { onMounted, ref } from 'vue'
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

const { $gsap, $ScrollTrigger } = useNuxtApp()

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
    value: '+62 21 XXX XXXX',
    icon: 'phone',
    link: 'tel:+6221XXXXXXXX'
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
    address: 'Jakarta, Indonesia — Strategic hub for Southeast Asian trade operations',
    role: 'Corporate HQ & Sales',
    isHq: true
  },
  {
    id: 'singapore',
    name: 'Singapore Office',
    address: 'Singapore — Regional office handling Asia-Pacific trade coordination',
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
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    $gsap.set(['.contact-header', '.contact-offices', '.contact-form'], { opacity: 1 })
    return
  }

  $gsap.fromTo('.contact-header',
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 65%'
      }
    }
  )

  $gsap.fromTo('.contact-offices',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.offices-container',
        start: 'top 70%'
      }
    }
  )

  $gsap.fromTo('.office-card',
    { opacity: 0, x: -20 },
    {
      opacity: 1,
      x: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.offices-grid',
        start: 'top 75%'
      }
    }
  )

  $gsap.fromTo('.contact-form',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.form-container',
        start: 'top 70%'
      }
    }
  )

  $gsap.fromTo('.form-group',
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.form-fields',
        start: 'top 75%'
      }
    }
  )

  $gsap.fromTo('.contact-info-item',
    { opacity: 0, scale: 0.95 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.contact-info-list',
        start: 'top 80%'
      }
    }
  )
})
</script>

<template>
  <section id="contact" class="contact-section h-screen min-h-[900px] flex flex-col lg:flex-row overflow-hidden">
    <div class="contact-header w-full lg:w-5/12 bg-[#2c2416] flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-0 relative">
      <div class="header-background">
        <div class="bg-accent-gradient"></div>
        <div class="bg-pattern"></div>
      </div>

      <div class="header-content relative z-10">
        <span class="section-label text-sm uppercase tracking-[0.3em] text-[#d4a24c] mb-6 block">
          Get </span>

        In Touch
        <h2 class="contact-title text-4xl lg:text-5xl font-bold text-[#f5f0e8] leading-tight mb-6">
          Partner With Us
        </h2>

        <p class="contact-description text-lg text-[#f5f0e8]/70 leading-relaxed mb-10">
          Ready to secure your palm oil supply from a trusted Indonesian producer? Our team is here to support your business needs across Asian markets.
        </p>

        <div class="contact-info-list flex flex-col gap-4 mb-10">
          <div
            v-for="info in contactInfo"
            :key="info.id"
            class="contact-info-item"
          >
            <a
              v-if="info.link"
              :href="info.link"
              class="info-link flex items-center gap-4 p-4 rounded-lg bg-[#f5f0e8]/5 hover:bg-[#f5f0e8]/10 transition-all duration-300 group"
            >
              <div class="info-icon w-10 h-10 rounded-lg bg-[#c45b28]/20 flex items-center justify-center group-hover:bg-[#c45b28] transition-colors duration-300">
                <svg v-if="info.icon === 'email'" class="w-5 h-5 text-[#d4a24c] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <svg v-else-if="info.icon === 'phone'" class="w-5 h-5 text-[#d4a24c] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <svg v-else class="w-5 h-5 text-[#d4a24c] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div class="info-content">
                <span class="info-label text-xs text-[#f5f0e8]/50 uppercase tracking-wider">{{ info.label }}</span>
                <span class="info-value text-base text-[#f5f0e8] font-medium">{{ info.value }}</span>
              </div>
            </a>
          </div>
        </div>

        <div class="offices-container">
          <span class="offices-label text-sm text-[#f5f0e8]/40 uppercase tracking-wider mb-4 block">
            Our Offices
          </span>
          <div class="offices-grid flex flex-col gap-3">
            <div
              v-for="office in offices"
              :key="office.id"
              class="office-card"
            >
              <div class="office-item flex items-start gap-3 p-3 rounded-lg border border-[#f5f0e8]/10">
                <div class="office-indicator w-2 h-2 rounded-full mt-2" :class="office.isHq ? 'bg-[#c45b28]' : 'bg-[#d4a24c]'"></div>
                <div class="office-content">
                  <span class="office-badge text-xs uppercase tracking-wider px-2 py-0.5 rounded" :class="office.isHq ? 'bg-[#c45b28]/20 text-[#c45b28]' : 'bg-[#d4a24c]/20 text-[#d4a24c]'">
                    {{ office.isHq ? 'HQ' : 'Regional' }}
                  </span>
                  <span class="office-name block text-sm font-medium text-[#f5f0e8] mt-2">{{ office.name }}</span>
                  <span class="office-address block text-xs text-[#f5f0e8]/60">{{ office.address }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="contact-form w-full lg:w-7/12 bg-[#f5f0e8] flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-0 relative">
      <div class="form-container max-w-lg">
        <div class="form-header mb-8">
          <span class="form-label text-sm uppercase tracking-[0.2em] text-[#2c2416]/40 mb-3 block">
            Send Us a Message
          </span>
          <h3 class="form-title text-2xl lg:text-3xl font-bold text-[#2c2416]">
            Let's Start a Conversation
          </h3>
        </div>

        <div v-if="!submitted" class="form-fields flex flex-col gap-5">
          <div class="form-group">
            <label for="name" class="form-label-input text-sm text-[#2c2416]/60 mb-2 block">
              Your Name *
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              placeholder="Enter your full name"
              class="form-input w-full px-4 py-3 bg-white border border-[#2c2416]/10 rounded-lg text-[#2c2416] placeholder-[#2c2416]/30 focus:outline-none focus:border-[#c45b28] focus:ring-2 focus:ring-[#c45b28]/20 transition-all duration-300"
              required
            />
          </div>

          <div class="form-group">
            <label for="email" class="form-label-input text-sm text-[#2c2416]/60 mb-2 block">
              Email Address *
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="Enter your email address"
              class="form-input w-full px-4 py-3 bg-white border border-[#2c2416]/10 rounded-lg text-[#2c2416] placeholder-[#2c2416]/30 focus:outline-none focus:border-[#c45b28] focus:ring-2 focus:ring-[#c45b28]/20 transition-all duration-300"
              required
            />
          </div>

          <div class="form-group">
            <label for="company" class="form-label-input text-sm text-[#2c2416]/60 mb-2 block">
              Company
            </label>
            <input
              id="company"
              v-model="formData.company"
              type="text"
              placeholder="Enter your company name"
              class="form-input w-full px-4 py-3 bg-white border border-[#2c2416]/10 rounded-lg text-[#2c2416] placeholder-[#2c2416]/30 focus:outline-none focus:border-[#c45b28] focus:ring-2 focus:ring-[#c45b28]/20 transition-all duration-300"
            />
          </div>

          <div class="form-group">
            <label for="message" class="form-label-input text-sm text-[#2c2416]/60 mb-2 block">
              Message *
            </label>
            <textarea
              id="message"
              v-model="formData.message"
              rows="4"
              placeholder="Tell us about your palm oil requirements..."
              class="form-textarea w-full px-4 py-3 bg-white border border-[#2c2416]/10 rounded-lg text-[#2c2416] placeholder-[#2c2416]/30 focus:outline-none focus:border-[#c45b28] focus:ring-2 focus:ring-[#c45b28]/20 transition-all duration-300 resize-none"
              required
            ></textarea>
          </div>

          <button
            class="submit-btn w-full py-4 bg-[#c45b28] text-white font-semibold rounded-lg hover:bg-[#d4a24c] transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!formData.name || !formData.email || !formData.message || submitting"
            @click="submitForm"
          >
            <span v-if="!submitting">Send Message</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Sending...
            </span>
          </button>
        </div>

        <div v-else class="success-message text-center py-12">
          <div class="success-icon w-20 h-20 mx-auto mb-6 rounded-full bg-[#2a5c55]/10 flex items-center justify-center">
            <svg class="w-10 h-10 text-[#2a5c55]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h4 class="success-title text-2xl font-bold text-[#2c2416] mb-3">
            Message Sent Successfully
          </h4>
          <p class="success-desc text-[#2c2416]/70 leading-relaxed mb-6">
            Thank you for reaching out. Our team will review your inquiry and respond within 24-48 hours.
          </p>
          <button
            class="reset-btn px-6 py-3 border border-[#c45b28] text-[#c45b28] font-medium rounded-lg hover:bg-[#c45b28] hover:text-white transition-all duration-300"
            @click="submitted = false"
          >
            Send Another Message
          </button>
        </div>
      </div>

      <div class="form-footer mt-12 pt-8 border-t border-[#2c2416]/10">
        <p class="footer-text text-sm text-[#2c2416]/50 text-center">
          By submitting this form, you agree to our privacy policy and consent to being contacted regarding your inquiry.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  min-height: 100vh;
}

.header-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.bg-accent-gradient {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, rgba(196, 91, 40, 0.12) 0%, transparent 60%);
}

.bg-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f5f0e8' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.section-label {
  font-size: 0.875rem;
  letter-spacing: 0.3em;
}

.contact-title {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  line-height: 1.1;
}

.contact-description {
  font-size: 1.125rem;
  line-height: 1.7;
}

.info-link {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-content {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(245, 240, 232, 0.5);
}

.info-value {
  font-size: 1rem;
  font-weight: 500;
  color: #f5f0e8;
}

.office-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(245, 240, 232, 0.03);
  border: 1px solid rgba(245, 240, 232, 0.08);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.office-item:hover {
  background: rgba(245, 240, 232, 0.08);
  border-color: rgba(196, 91, 40, 0.3);
}

.office-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 6px;
}

.office-badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.office-content {
  display: flex;
  flex-direction: column;
}

.office-name {
  font-size: 1rem;
  font-weight: 600;
  color: #f5f0e8;
  margin-top: 0.5rem;
}

.office-address {
  font-size: 0.85rem;
  color: rgba(245, 240, 232, 0.6);
}

.form-label {
  font-size: 0.875rem;
  letter-spacing: 0.2em;
}

.form-title {
  font-size: 1.75rem;
  font-weight: 700;
}

.form-label-input {
  font-size: 0.875rem;
  font-weight: 500;
}

.form-input,
.form-textarea {
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
}

.submit-btn {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.success-message {
  padding: 2rem;
}

.success-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.success-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.success-desc {
  font-size: 1rem;
  line-height: 1.6;
  max-width: 400px;
  margin: 0 auto 2rem;
}

.reset-btn {
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.875rem 1.5rem;
  border: 2px solid #c45b28;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background: #c45b28;
  color: #ffffff;
}

.footer-text {
  font-size: 0.85rem;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .contact-section {
    flex-direction: column;
    height: auto;
  }

  .contact-header,
  .contact-form {
    width: 100%;
    padding: 4rem 2rem;
  }

  .contact-form {
    padding-bottom: 4rem;
  }
}

@media (max-width: 640px) {
  .contact-header,
  .contact-form {
    padding: 3rem 1.5rem;
  }

  .contact-title {
    font-size: 2rem;
  }

  .contact-description {
    font-size: 1rem;
  }

  .contact-info-list {
    gap: 0.75rem;
  }

  .info-link {
    padding: 0.75rem;
  }

  .offices-container {
    margin-top: 2rem;
  }

  .form-container {
    max-width: 100%;
  }

  .success-desc {
    padding: 0 1rem;
  }
}
</style>

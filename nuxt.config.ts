// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: true },

  compatibilityDate: '2025-01-01',

  future: {
    compatibilityVersion: 4
  },

  vite: {
    plugins: [tailwindcss()]
  },

  app: {
    head: {
      title: 'Nusantara Palm Industries — Sustainable Palm Oil for a Growing Asia',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Indonesia leading sustainable palm oil exporter delivering quality CPO to Asian markets' },
        { name: 'theme-color', content: '#c45b28' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    families: {
      'Jakarta Sans': [400, 500, 600, 700, 800]
    },
    display: 'swap',
    preload: true,
    download: false // Use CDN instead to avoid download issues
  },

  css: ['~/assets/css/main.css']
})

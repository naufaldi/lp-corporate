<script setup lang="ts">
// Test page to verify Tailwind CSS and Jakarta Sans are working

const testStats = [
  { label: 'Annual Exports', value: '380,000+', unit: 'MT' },
  { label: 'Plantation Area', value: '85,000', unit: 'hectares' },
  { label: 'Workforce', value: '2,800+', unit: 'employees' },
  { label: 'Export Revenue', value: '$280M+', unit: '' }
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Header Test -->
    <header class="bg-primary text-white py-4 px-8">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">NPI Test Page</h1>
        <nav class="space-x-4">
          <span class="text-accent">Test Mode</span>
        </nav>
      </div>
    </header>

    <!-- Color Palette Test -->
    <section class="py-16 px-8">
      <h2 class="text-3xl font-bold mb-8 text-center">Nusantara Earth Color Palette</h2>
      <div class="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
        <div class="text-center">
          <div class="h-20 w-full rounded-lg bg-primary mb-2"></div>
          <p class="text-sm font-medium">Primary</p>
          <p class="text-xs text-gray-500">#c45b28</p>
        </div>
        <div class="text-center">
          <div class="h-20 w-full rounded-lg bg-secondary mb-2"></div>
          <p class="text-sm font-medium">Secondary</p>
          <p class="text-xs text-gray-500">#2a5c55</p>
        </div>
        <div class="text-center">
          <div class="h-20 w-full rounded-lg bg-accent mb-2"></div>
          <p class="text-sm font-medium">Accent</p>
          <p class="text-xs text-gray-500">#d4a24c</p>
        </div>
        <div class="text-center">
          <div class="h-20 w-full rounded-lg bg-background mb-2 border"></div>
          <p class="text-sm font-medium">Background</p>
          <p class="text-xs text-gray-500">#f5f0e8</p>
        </div>
        <div class="text-center">
          <div class="h-20 w-full rounded-lg bg-dark mb-2"></div>
          <p class="text-sm font-medium">Dark</p>
          <p class="text-xs text-gray-500">#2c2416</p>
        </div>
      </div>
    </section>

    <!-- Typography Test -->
    <section class="py-16 px-8 bg-background">
      <h2 class="text-3xl font-bold mb-8 text-center">Jakarta Sans Typography</h2>
      <div class="max-w-2xl mx-auto space-y-6">
        <div>
          <p class="text-xs text-gray-500 mb-1">Heading 1 — 48px — 700</p>
          <h1 class="text-5xl font-bold text-primary">Sustainable Palm Oil</h1>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">Heading 2 — 36px — 600</p>
          <h2 class="text-4xl font-semibold text-secondary">For a Growing Asia</h2>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">Heading 3 — 24px — 600</p>
          <h3 class="text-2xl font-semibold text-dark">Industry Innovator</h3>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">Body — 16px — 400</p>
          <p class="text-base text-dark leading-relaxed">
            Nusantara Palm Industries is Indonesia's leading sustainable palm oil exporter,
            operating a large-scale integrated enterprise focused on delivering high-quality
            crude palm oil to Asian markets.
          </p>
        </div>
      </div>
    </section>

    <!-- Stats Grid Test -->
    <section class="py-16 px-8 bg-dark text-background">
      <h2 class="text-3xl font-bold mb-8 text-center">Stats Grid Test</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        <div v-for="stat in testStats" :key="stat.label" class="text-center">
          <div class="text-4xl md:text-5xl font-bold text-accent mb-2">
            {{ stat.value }}
          </div>
          <p class="text-sm text-gray-300">{{ stat.label }}</p>
          <p class="text-xs text-gray-400">{{ stat.unit }}</p>
        </div>
      </div>
    </section>

    <!-- Buttons Test -->
    <section class="py-16 px-8">
      <h2 class="text-3xl font-bold mb-8 text-center">Button Styles</h2>
      <div class="flex justify-center gap-4 flex-wrap">
        <button class="bg-primary text-white px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition">
          Primary CTA
        </button>
        <button class="bg-secondary text-white px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition">
          Secondary
        </button>
        <button class="bg-accent text-dark px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition">
          Accent Button
        </button>
        <button class="border-2 border-primary text-primary px-8 py-3 rounded font-semibold hover:bg-primary hover:text-white transition">
          Outlined
        </button>
      </div>
    </section>

    <!-- Utility Classes Test -->
    <section class="py-16 px-8 bg-secondary text-white">
      <h2 class="text-3xl font-bold mb-8 text-center">Utility Classes Test</h2>
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-background text-dark p-4 rounded">
            <p class="font-bold mb-2">Card 1</p>
            <p class="text-sm">Background color applied</p>
          </div>
          <div class="bg-dark text-background p-4 rounded">
            <p class="font-bold mb-2">Card 2</p>
            <p class="text-sm">Dark color applied</p>
          </div>
          <div class="border-2 border-accent p-4 rounded">
            <p class="font-bold mb-2">Card 3</p>
            <p class="text-sm">Accent border applied</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-8 text-center">
      <p class="text-sm">If all sections render correctly, Tailwind CSS is working! ✅</p>
    </footer>
  </div>
</template>

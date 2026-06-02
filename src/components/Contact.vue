<template>
  <section class="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden min-h-screen flex flex-col justify-between" id="contact">

    <!-- Background radial glow -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(99,102,241,0.07),transparent)] pointer-events-none"></div>

    <div class="max-w-5xl mx-auto w-full relative z-10 flex-1">

      <!-- Section header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 border border-cyan-500/20 bg-cyan-950/20 rounded-full px-4 py-1.5 mb-5">
          <i class="fa-solid fa-satellite-dish text-cyan-400 text-[10px]"></i>
          <span class="font-mono text-[10.5px] text-cyan-300 tracking-wide font-semibold uppercase">Open Signal</span>
        </div>
        <h1 class="font-mono text-4xl md:text-5xl font-black text-white mb-3 tracking-tight leading-none">
          Get In <span class="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Touch</span>
        </h1>
        <p class="font-mono text-[11px] text-emerald-400/90 max-w-sm mx-auto leading-relaxed font-semibold">
          // Let's build something amazing — I respond within 24h
        </p>
      </div>

      <!-- Availability notice -->
      <div class="flex justify-center mb-12">
        <div class="flex items-center gap-3 bg-emerald-950/30 border border-emerald-500/25 rounded-xl px-6 py-3.5">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-emerald-400 rounded-full animate-ping shadow-[0_0_8px_#4ade80]"></span>
            <span class="font-mono text-xs text-emerald-400 font-bold tracking-wide">AVAILABLE FOR WORK</span>
          </div>
          <div class="w-px h-4 bg-emerald-500/30"></div>
          <span class="font-sans text-[13px] text-neutral-300 font-medium">Remote · Full-time · Freelance</span>
        </div>
      </div>

      <!-- Contact grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-16">
        <a
          v-for="contact in contacts"
          :key="contact.text"
          :href="contact.link"
          :target="contact.link.startsWith('http') ? '_blank' : '_self'"
          :rel="contact.link.startsWith('http') ? 'noopener noreferrer' : ''"
          class="contact-card group relative flex flex-col items-center justify-center gap-3 p-6 bg-neutral-950/60 border border-white/6 rounded-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          :style="{
            '--c': contact.color,
            'border-color': hoveredCard === contact.text ? contact.color + '30' : ''
          }"
          @mouseenter="hoveredCard = contact.text"
          @mouseleave="hoveredCard = null"
        >
          <!-- Hover glow bg -->
          <div
            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
            :style="{ background: `radial-gradient(circle at 50% 80%, ${contact.color}12, transparent 70%)` }"
          ></div>

          <div
            class="relative w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
            :style="{
              'background': hoveredCard === contact.text ? contact.color + '18' : 'rgba(255,255,255,0.03)',
              'border-color': hoveredCard === contact.text ? contact.color + '40' : 'rgba(255,255,255,0.08)',
              'box-shadow': hoveredCard === contact.text ? `0 0 20px ${contact.color}25` : 'none',
            }"
          >
            <i
              :class="contact.icon"
              class="text-lg transition-colors duration-300"
              :style="{ color: hoveredCard === contact.text ? contact.color : '#555' }"
            ></i>
          </div>

          <div class="text-center relative z-10">
            <p class="font-mono text-xs font-extrabold text-neutral-200 group-hover:text-white transition-colors">{{ contact.text }}</p>
            <p class="font-mono text-[9.5px] text-neutral-500 mt-0.5 tracking-wide font-semibold">{{ contact.handle }}</p>
          </div>
        </a>
      </div>

      <!-- Email CTA box -->
      <div class="max-w-xl mx-auto text-center bg-neutral-950/60 border border-white/6 rounded-2xl p-6 sm:p-8 hover:border-indigo-500/20 transition-all duration-400">
        <i class="fa-solid fa-envelope-open-text text-indigo-400 text-2xl mb-4 block"></i>
        <h3 class="font-mono text-lg font-black text-white mb-2 tracking-tight">Drop me an email</h3>
        <p class="font-sans text-sm text-neutral-400 mb-5 leading-relaxed max-w-sm mx-auto">
          Whether it's a project idea, a job opportunity, or just a hello — my inbox is always open.
        </p>
        <a
          href="mailto:athulkrishna.cpd@gmail.com"
          class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-mono text-xs font-bold tracking-wider uppercase rounded-lg hover:shadow-[0_0_25px_rgba(99,102,241,0.45)] hover:-translate-y-0.5 transition-all duration-300"
        >
          <i class="fa-solid fa-paper-plane"></i>
          athulkrishna.cpd@gmail.com
        </a>
      </div>
    </div>

    <!-- VS Code status bar -->
    <div class="w-full bg-[#0e0e14] border-t border-white/5 py-1.5 px-5 flex items-center justify-between font-mono text-[10px] text-[#6b6b80] select-none mt-16 relative z-10">
      <div class="flex items-center gap-4">
        <span class="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
          <i class="fa-solid fa-code-branch text-[#4ec9b0]"></i> main
        </span>
        <span class="flex items-center gap-1.5">
          <i class="fa-solid fa-circle-xmark text-red-500/70"></i> 0
          <i class="fa-solid fa-triangle-exclamation text-yellow-500/70 ml-1"></i> 0
        </span>
      </div>
      <span class="hidden sm:block">© 2025 Athul Krishna K · Trawbit Technologies</span>
      <div class="flex items-center gap-3">
        <span>UTF-8</span>
        <span class="flex items-center gap-1">
          <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_4px_#4ade80]"></span>
          Vue 3 · Vite
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const hoveredCard = ref(null);

const contacts = [
  { icon: 'fa-solid fa-envelope', text: 'Email', handle: 'athulkrishna.cpd@gmail.com', link: 'mailto:athulkrishna.cpd@gmail.com', color: '#e87d79' },
  { icon: 'fa-brands fa-github', text: 'GitHub', handle: '@Athulprgm', link: 'https://github.com/Athulprgm', color: '#e2e8f0' },
  { icon: 'fa-brands fa-linkedin', text: 'LinkedIn', handle: 'athul-krishna-k', link: 'https://www.linkedin.com/in/athul-krishna-k-1a7195361/', color: '#0A66C2' },
  { icon: 'fa-solid fa-phone', text: 'Phone', handle: '+91 8590595077', link: 'tel:8590595077', color: '#25D366' },
  { icon: 'fa-brands fa-instagram', text: 'Instagram', handle: '@_athul_krishnaa', link: 'https://www.instagram.com/_athul_krishnaa/', color: '#e1306c' },
  { icon: 'fa-brands fa-whatsapp', text: 'WhatsApp', handle: 'Message me', link: 'https://wa.me/8590595077', color: '#25D366' },
];
</script>

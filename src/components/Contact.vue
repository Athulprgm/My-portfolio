<template>
  <section class="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden min-h-screen flex flex-col justify-between" id="contact">

    <!-- Background radial glow -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(255, 255, 255,0.07),transparent)] pointer-events-none"></div>

    <div class="max-w-5xl mx-auto w-full relative z-10 flex-1">

      <!-- Section header -->
      <div class="text-center mb-16 scroll-reveal" ref="headerRef">
        <div class="inline-flex items-center gap-2 border border-cyan-500/20 bg-cyan-950/20 rounded-none px-4 py-1.5 mb-5">
          <i class="fa-solid fa-satellite-dish text-[#A1A1AA] text-[10px]"></i>
          <span class="font-mono text-[10.5px] text-[#A1A1AA] tracking-wide font-semibold uppercase">Open Signal</span>
        </div>
        <h1 class="font-mono text-xl md:text-2xl lg:text-3xl font-black text-white mb-4 tracking-tight leading-loose">
          Let's Build Something <span class="bg-gradient-to-r from-neutral-200 to-[#ffffff] bg-clip-text text-transparent">Exceptional</span>
        </h1>
        <p class="font-mono text-[11px] text-emerald-400/90 max-w-sm mx-auto leading-relaxed font-semibold">
          // Available Worldwide — Let's connect
        </p>
      </div>

      <!-- Availability notice -->
      <div class="flex justify-center mb-12 scroll-reveal" ref="availRef">
        <div class="flex items-center gap-3 bg-emerald-950/30 border border-emerald-500/25 rounded-none px-6 py-3.5">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-emerald-400 rounded-none animate-ping shadow-[0_0_8px_#4ade80]"></span>
            <span class="font-mono text-xs text-emerald-400 font-bold tracking-wide">AVAILABLE WORLDWIDE</span>
          </div>
          <div class="w-px h-4 bg-emerald-500/30"></div>
          <span class="font-sans text-[13px] text-[#A1A1AA] font-medium">Remote · Kerala, India</span>
        </div>
      </div>

      <!-- Contact grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-16 scroll-reveal" ref="gridRef">
        <a
          v-for="contact in contacts"
          :key="contact.text"
          :href="contact.link"
          :target="contact.link.startsWith('http') ? '_blank' : '_self'"
          :rel="contact.link.startsWith('http') ? 'noopener noreferrer' : ''"
          class="contact-card group relative flex flex-col items-center justify-center gap-3 p-6 bg-[#0A0A0A] border border-[#2A2A2A] rounded-none hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          :style="{
            '--c': contact.color,
            'border-color': hoveredCard === contact.text ? contact.color + '30' : ''
          }"
          @mouseenter="hoveredCard = contact.text"
          @mouseleave="hoveredCard = null"
        >
          <!-- Hover glow bg -->
          <div
            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-none pointer-events-none"
            :style="{ background: `radial-gradient(circle at 50% 80%, ${contact.color}12, transparent 70%)` }"
          ></div>

          <div
            class="relative w-12 h-12 rounded-none flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
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
            <p class="font-mono text-[9.5px] text-[#A1A1AA] mt-0.5 tracking-wide font-semibold">{{ contact.handle }}</p>
          </div>
        </a>
      </div>

      <!-- Email CTA box -->
      <div class="max-w-xl mx-auto text-center bg-[#0A0A0A] border border-[#2A2A2A] rounded-none p-6 sm:p-8 hover:border-[#ffffff]/20 transition-all duration-400 scroll-reveal" ref="ctaRef">
        <i class="fa-solid fa-envelope-open-text text-[#ffffff] text-2xl mb-4 block"></i>
        <h3 class="font-mono text-lg font-black text-white mb-2 tracking-tight">Drop me an email</h3>
        <p class="font-sans text-sm text-[#A1A1AA] mb-5 leading-relaxed max-w-sm mx-auto">
          Whether it's a project idea, a job opportunity, or just a hello — my inbox is always open.
        </p>
        <a
          href="mailto:athul@trawbit.com"
          class="inline-flex items-center gap-3 px-8 py-4 bg-[#2A2A2A] text-black font-mono text-xs font-black tracking-widest uppercase rounded-none border-b-4 border-r-4 border-[#2A2A2A] active:border-b-0 active:border-r-0 active:translate-y-1 active:translate-x-1 hover:bg-neutral-200 transition-all"
        >
          <i class="fa-solid fa-paper-plane"></i>
          SEND EMAIL
        </a>
      </div>
    </div>

    <!-- VS Code status bar -->
    <div class="w-full bg-[#0e0e14] border-t border-[#2A2A2A] py-1.5 px-5 flex items-center justify-between font-mono text-[10px] text-[#6b6b80] select-none mt-16 relative z-10">
      <div class="flex items-center gap-4">
        <span class="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
          <i class="fa-solid fa-code-branch text-[#4ec9b0]"></i> main
        </span>
        <span class="flex items-center gap-1.5 hidden sm:flex">
          <i class="fa-solid fa-location-dot text-[#ffffff]/70"></i> Kasaragod, Kerala
        </span>
      </div>
      <span class="hidden sm:block">© 2026 Athul Krishna K · Trawbit Technologies</span>
      <div class="flex items-center gap-3">
        <span class="hidden md:inline">UTF-8</span>
        <span class="flex items-center gap-1">
          <span class="w-1.5 h-1.5 bg-emerald-400 rounded-none shadow-[0_0_4px_#4ade80]"></span>
          Vue 3 · Vite
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const hoveredCard = ref(null);
const headerRef = ref(null);
const availRef = ref(null);
const gridRef = ref(null);
const ctaRef = ref(null);

const contacts = [
  { icon: 'fa-solid fa-envelope', text: 'Email', handle: 'athul@trawbit.com', link: 'mailto:athul@trawbit.com', color: '#e87d79' },
  { icon: 'fa-brands fa-github', text: 'GitHub', handle: '@Athulprgm', link: 'https://github.com/Athulprgm', color: '#e2e8f0' },
  { icon: 'fa-brands fa-linkedin', text: 'LinkedIn', handle: 'athul-krishna-k', link: 'https://www.linkedin.com/in/athul-krishna-k/', color: '#0A66C2' },
  { icon: 'fa-solid fa-phone', text: 'Phone', handle: '+91 8590595077', link: 'tel:8590595077', color: '#25D366' },
  { icon: 'fa-brands fa-instagram', text: 'Instagram', handle: '@_athul_krishnaa', link: 'https://www.instagram.com/_athul_krishnaa/', color: '#e1306c' },
];

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  [headerRef, availRef, gridRef, ctaRef].forEach(ref => {
    if (ref.value) observer.observe(ref.value);
  });
});

onUnmounted(() => observer?.disconnect());
</script>

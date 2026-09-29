<template>
  <div
    class="h-full min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 sm:px-8 max-w-6xl mx-auto select-none relative"
  >
    <!-- Ethereal Emerald Ambient Aura Glow -->
    <div
      class="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div
        class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[850px] h-[350px] sm:h-[450px] rounded-full blur-[130px] pointer-events-none"
        :style="{ backgroundColor: 'var(--hero-glow-1)' }"
      ></div>
      <div
        class="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none"
        :style="{ backgroundColor: 'var(--hero-glow-2)' }"
      ></div>
    </div>

    <!-- Cinematic Receding Content Wrapper -->
    <div
      class="max-w-4xl my-auto transition-transform duration-75 ease-out will-change-transform"
      :style="{
        transform: `translate3d(0, ${heroTranslateY}px, 0) scale(${heroScale})`,
        opacity: heroOpacity,
      }"
    >
      <!-- Minimalist Eyebrow -->
      <div class="flex items-center gap-2 mb-8 text-xs font-mono-clean uppercase tracking-widest text-[var(--text-muted)]">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>FULL-STACK DEVELOPER · CO-FOUNDER</span>
      </div>

      <!-- Simplified Grand Headline -->
      <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-sans-clean font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.05] mb-8">
        Building digital products
        <span class="font-editorial font-normal italic text-[var(--text-primary)] underline decoration-[var(--border-color)] decoration-1 underline-offset-8">
          from idea to reality.
        </span>
      </h1>

      <!-- Simplified Single-Sentence Bio -->
      <p class="text-lg sm:text-xl text-[var(--text-secondary)] font-normal leading-relaxed max-w-xl mb-10 font-sans-clean">
        I build modern web, mobile, and software products across the full stack — from intuitive interfaces and APIs to databases, authentication, and deployment.
      </p>

      <!-- Minimal Actions -->
      <div class="flex flex-wrap items-center gap-4">
        <button
          @click="scrollToSection('works')"
          class="btn-worth cursor-pointer group"
        >
          <span>VIEW WORK</span>
          <span class="group-hover:translate-y-0.5 transition-transform">↓</span>
        </button>

        <button
          @click="copyEmail"
          class="btn-worth-outline cursor-pointer"
        >
          <i :class="copied ? 'fa-solid fa-check text-emerald-500' : 'fa-regular fa-envelope'"></i>
          <span>{{ copied ? 'COPIED TO CLIPBOARD' : 'GET IN TOUCH' }}</span>
        </button>

        <a
          href="https://www.instagram.com/_athul_krishnaa?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          class="btn-worth-outline cursor-pointer flex items-center gap-2 hover:border-[#E1306C] hover:text-[#E1306C] transition-all"
        >
          <svg class="w-3.5 h-3.5 fill-current text-[#E1306C]" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>INSTAGRAM</span>
          <span>↗</span>
        </a>
      </div>
    </div>

    <!-- Subtle Editorial Scroll Cue with Dynamic Hairline & Bounce -->
    <div
      @click="scrollToSection('about')"
      class="flex items-center justify-between pt-6 border-t border-[var(--border-color)] text-xs font-mono-clean text-[var(--text-muted)] tracking-wider cursor-pointer group hover:text-[var(--text-primary)] transition-colors"
      :style="{ opacity: cueOpacity }"
    >
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500/70"></span>
        <span class="text-[11px] uppercase text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">KERALA, INDIA</span>
      </div>
      <div class="flex items-center gap-2 text-xs text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
        <span>SCROLL TO EXPLORE</span>
        <span class="inline-block animate-bounce text-sm">↓</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useSmoothScroll } from '../composables/useSmoothScroll';

const { scrollTo: smoothScrollTo, registerScrollCallback } = useSmoothScroll();

const copied = ref(false);
const heroScale = ref(1);
const heroOpacity = ref(1);
const heroTranslateY = ref(0);
const cueOpacity = ref(1);

let unregisterScroll = null;

const onScroll = () => {
  const scrollY = window.scrollY;
  const vh = window.innerHeight;

  if (scrollY <= vh * 1.2) {
    const progress = Math.min(1, Math.max(0, scrollY / (vh * 0.9)));
    heroScale.value = (1 - progress * 0.05).toFixed(3);
    heroOpacity.value = (1 - progress * 0.35).toFixed(3);
    heroTranslateY.value = Math.round(progress * 18);
    cueOpacity.value = Math.max(0, 1 - progress * 2.5);
  }
};

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('athul@trawbit.com');
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2500);
  } catch (err) {
    console.error('Copy failed:', err);
  }
};

const scrollToSection = (id) => {
  smoothScrollTo('#' + id, { offset: -75, duration: 1.0 });
};

onMounted(() => {
  unregisterScroll = registerScrollCallback(onScroll);
  window.addEventListener('scroll', onScroll, { passive: true });
});

onUnmounted(() => {
  if (unregisterScroll) unregisterScroll();
  window.removeEventListener('scroll', onScroll);
});
</script>

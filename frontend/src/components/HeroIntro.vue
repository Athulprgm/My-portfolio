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

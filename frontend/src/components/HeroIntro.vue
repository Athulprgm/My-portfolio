<template>
  <div
    class="min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 sm:px-8 max-w-6xl mx-auto select-none relative"
  >
    <div class="max-w-4xl my-auto">
      <!-- Minimalist Eyebrow -->
      <div class="flex items-center gap-2 mb-8 text-xs font-mono-clean uppercase tracking-widest text-[var(--text-muted)]">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>01 // ATHUL KRISHNA · CO-FOUNDER @ TRAWBIT</span>
      </div>

      <!-- Simplified Grand Headline -->
      <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-sans-clean font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.05] mb-8">
        Engineering software with
        <span class="font-editorial font-normal italic text-[var(--text-primary)] underline decoration-[var(--border-color)] decoration-1 underline-offset-8">
          taste &amp; precision.
        </span>
      </h1>

      <!-- Simplified Single-Sentence Bio -->
      <p class="text-lg sm:text-xl text-[var(--text-secondary)] font-normal leading-relaxed max-w-xl mb-10 font-sans-clean">
        Full-stack engineer building resilient web platforms, distributed APIs, and responsive interfaces.
      </p>

      <!-- Minimal Actions -->
      <div class="flex flex-wrap items-center gap-4">
        <button
          @click="scrollToSection('works')"
          class="btn-worth cursor-pointer group"
        >
          <span>VIEW WORKS</span>
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
import { ref } from 'vue';
import { useSmoothScroll } from '../composables/useSmoothScroll';

const { scrollTo: smoothScrollTo } = useSmoothScroll();

const copied = ref(false);

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
</script>

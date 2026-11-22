<template>
  <div
    class="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 transition-all duration-500 select-none"
    :class="isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'"
  >
    <button
      @click="scrollToTop"
      class="group relative w-12 h-12 rounded-full bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-primary)] cursor-pointer"
      aria-label="Return to top of page"
      title="Back to top"
    >
      <svg class="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="23" fill="none" stroke="var(--border-color)" stroke-width="1" />
        <circle
          cx="24"
          cy="24"
          r="23"
          fill="none"
          stroke="var(--accent)"
          stroke-width="1.5"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
        />
      </svg>
      <span class="relative font-mono-clean text-sm overflow-hidden h-[1.2em] leading-[1.2em]">
        <span class="flex flex-col transition-transform duration-500 group-hover:-translate-y-1/2">
          <span>↑</span><span>↑</span>
        </span>
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useSmoothScroll } from '../composables/useSmoothScroll';

const { scrollTo: smoothScrollTo, registerScrollCallback } = useSmoothScroll();
const isVisible = ref(false);
const scrollRatio = ref(0);

const circumference = 2 * Math.PI * 23;
const dashOffset = computed(() => circumference * (1 - scrollRatio.value));

let unregister = null;
let raf = null;

const updateState = () => {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    const y = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    isVisible.value = y > 600;
    scrollRatio.value = docHeight > 0 ? Math.min(1, Math.max(0, y / docHeight)) : 0;
    raf = null;
  });
};

const scrollToTop = () => {
  smoothScrollTo(0, { offset: 0, duration: 1.2 });
};

onMounted(() => {
  unregister = registerScrollCallback(updateState);
  window.addEventListener('scroll', updateState, { passive: true });
  updateState();
});

onUnmounted(() => {
  if (unregister) unregister();
  window.removeEventListener('scroll', updateState);
  if (raf) cancelAnimationFrame(raf);
});
</script>

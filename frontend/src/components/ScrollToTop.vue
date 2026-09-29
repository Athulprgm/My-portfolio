<template>
  <div
    class="fixed bottom-6 right-6 z-40 transition-all duration-300 pointer-events-none select-none"
    :class="isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4'"
  >
    <button
      @click="scrollToTop"
      class="group flex items-center gap-2 px-3.5 py-2.5 bg-[var(--bg-card)]/90 hover:bg-[var(--bg-card)] backdrop-blur-md border border-[var(--border-color)] hover:border-[var(--text-primary)] rounded-sm text-xs font-mono-clean text-[var(--text-primary)] shadow-lg hover:shadow-xl transition-all cursor-pointer"
      aria-label="Return to top of page"
    >
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></span>
      <span class="text-[10px] tracking-widest uppercase font-bold">TOP</span>
      <span class="text-xs group-hover:-translate-y-0.5 transition-transform">↑</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useSmoothScroll } from '../composables/useSmoothScroll';

const { scrollTo: smoothScrollTo, registerScrollCallback } = useSmoothScroll();
const isVisible = ref(false);

let unregister = null;
let raf = null;

const toggleVisibility = () => {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    isVisible.value = window.scrollY > 400;
    raf = null;
  });
};

const scrollToTop = () => {
  smoothScrollTo(0, { offset: 0, duration: 1.1 });
};

onMounted(() => {
  unregister = registerScrollCallback(toggleVisibility);
  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();
});

onUnmounted(() => {
  if (unregister) unregister();
  window.removeEventListener('scroll', toggleVisibility);
  if (raf) cancelAnimationFrame(raf);
});
</script>

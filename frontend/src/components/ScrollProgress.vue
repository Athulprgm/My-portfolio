<template>
  <div class="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none" aria-hidden="true">
    <div class="h-full bg-[var(--accent)] origin-left" :style="{ transform: `scaleX(${progress / 100})` }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useSmoothScroll } from '../composables/useSmoothScroll';

const { registerScrollCallback } = useSmoothScroll();

const progress = ref(0);
let unregisterScroll = null;
let ticking = false;

const updateProgress = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress.value = docHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)) : 0;
    ticking = false;
  });
};

onMounted(() => {
  unregisterScroll = registerScrollCallback(updateProgress);
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
});

onUnmounted(() => {
  if (unregisterScroll) unregisterScroll();
  window.removeEventListener('scroll', updateProgress);
  window.removeEventListener('resize', updateProgress);
});
</script>

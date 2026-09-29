<template>
  <!-- ── Top Hairline Progress Track ── -->
  <div
    class="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none bg-transparent"
  >
    <div
      class="h-full bg-[var(--text-primary)] relative transition-all duration-75 ease-out"
      :style="{ width: progress + '%' }"
    >
      <!-- Glowing Emerald Pip Tip -->
      <div
        v-if="progress > 1"
        class="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]"
      ></div>
    </div>
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
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    progress.value = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;
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

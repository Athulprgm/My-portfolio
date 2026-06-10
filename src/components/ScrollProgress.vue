<template>
  <div
    class="fixed top-0 left-0 z-[200] h-[2px] pointer-events-none"
    :style="{ width: progress + '%', background: 'linear-gradient(to right, #FF3B30, #ff6b35)' }"
  >
    <!-- Glow tip -->
    <div
      class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
      :style="{ background: '#FF3B30', boxShadow: '0 0 8px 2px rgba(255,59,48,0.8)', opacity: progress > 1 ? 1 : 0 }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const progress = ref(0);

const updateProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
};

onMounted(() => window.addEventListener('scroll', updateProgress, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', updateProgress));
</script>

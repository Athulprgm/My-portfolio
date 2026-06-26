<template>
  <div class="fixed inset-0 w-screen h-screen bg-[#050505] flex flex-col items-center justify-center z-[9999] overflow-hidden transition-all duration-500" :class="{ 'opacity-0 pointer-events-none': isComplete }">
    <div class="flex flex-col items-center">
      <!-- Profile Image with Pulse and Spinning Rings -->
      <div class="relative w-[130px] h-[130px] flex items-center justify-center mb-6">
        <div class="absolute w-[110px] h-[110px] border border-[#2A2A2A] rounded-full border-t-[#ffffff] border-r-[#ffffff] animate-[spin_2s_linear_infinite]"></div>
        <div class="absolute w-[125px] h-[125px] border border-[#121212] rounded-full border-t-[#A1A1AA] border-r-[#A1A1AA] animate-[spin_3s_linear_infinite_reverse]"></div>
        <video src="/New folder/create_animation_vedio __scene.mp4" autoplay loop muted playsinline class="w-[90px] h-[90px] rounded-full object-cover border-2 border-[#2A2A2A] z-10 animate-pulse"></video>
      </div>

      <!-- Minimal Code Element -->
      <div class="font-mono text-[10px] text-[#A1A1AA] flex items-center gap-2 mb-8 uppercase tracking-widest font-semibold">
        <span class="text-white font-bold text-sm animate-pulse">[</span>
        <span>SYSTEM_BOOTING</span>
        <span class="text-white font-bold text-sm animate-pulse">]</span>
      </div>

      <!-- Progress Bar -->
      <div class="flex flex-col items-center gap-2.5 w-[240px]">
        <div class="w-full h-0.5 bg-[#2A2A2A] rounded-full overflow-hidden">
          <div
            class="h-full bg-white rounded-full transition-all duration-100 shadow-[0_0_10px_rgba(255,255,255,0.4)]"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
        <span class="font-mono text-[10px] text-white font-bold tracking-widest">{{ Math.floor(progress) }}%</span>
      </div>

      <!-- Simple Loading Indicator -->
      <div class="flex gap-1.5 items-center mt-6">
        <span class="w-1 h-1 bg-white/70 rounded-full animate-bounce [animation-delay:0s]"></span>
        <span class="w-1 h-1 bg-white/70 rounded-full animate-bounce [animation-delay:0.2s]"></span>
        <span class="w-1 h-1 bg-white/70 rounded-full animate-bounce [animation-delay:0.4s]"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['loading-complete']);

const progress = ref(0);
const isComplete = ref(false);
let timer = null;

onMounted(() => {
  const duration = 2500;
  const interval = 15;
  const increment = 100 / (duration / interval);

  let pageLoaded = false;
  if (document.readyState === 'complete') {
    pageLoaded = true;
  } else {
    window.addEventListener('load', () => {
      pageLoaded = true;
    });
  }

  timer = setInterval(() => {
    const next = progress.value + increment;
    
    if (next >= 90 && !pageLoaded) {
      progress.value = 90;
    } else if (next >= 100) {
      progress.value = 100;
      clearInterval(timer);
      setTimeout(() => {
        isComplete.value = true;
        setTimeout(() => {
          emit('loading-complete');
        }, 300);
      }, 100);
    } else {
      progress.value = next;
    }
  }, interval);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

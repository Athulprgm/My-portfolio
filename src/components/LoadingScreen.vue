<template>
  <div class="fixed inset-0 w-screen h-screen bg-[#050505] flex flex-col items-center justify-center z-[9999] overflow-hidden transition-all duration-500" :class="{ 'opacity-0 pointer-events-none': isComplete }">
    <div class="flex flex-col items-center">
      <!-- Profile Image with Pulse and Spinning Rings -->
      <div class="relative w-[130px] h-[130px] flex items-center justify-center mb-6">
        <div class="absolute w-[110px] h-[110px] border border-indigo-500/20 rounded-full border-t-indigo-500 border-r-indigo-500 animate-[spin_2s_linear_infinite]"></div>
        <div class="absolute w-[125px] h-[125px] border border-pink-500/10 rounded-full border-t-pink-500 border-r-pink-500 animate-[spin_3s_linear_infinite_reverse]"></div>
        <img src="/profile.png" alt="Loading" class="w-[90px] h-[90px] rounded-full object-cover border-2 border-indigo-500/15 z-10 animate-pulse" />
      </div>

      <!-- Minimal Code Element -->
      <div class="font-mono text-sm text-neutral-400 flex items-center gap-1.5 mb-8">
        <span class="text-indigo-500 font-bold text-base animate-pulse">{</span>
        <span class="tracking-wide">initializing secure console</span>
        <span class="text-indigo-500 font-bold text-base animate-pulse">}</span>
      </div>

      <!-- Progress Bar -->
      <div class="flex flex-col items-center gap-2.5 w-[240px]">
        <div class="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-100 shadow-[0_0_10px_rgba(99,102,241,0.4)]"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
        <span class="font-mono text-xs text-indigo-400 font-semibold tracking-widest">{{ Math.floor(progress) }}%</span>
      </div>

      <!-- Simple Loading Indicator -->
      <div class="flex gap-1.5 items-center mt-6">
        <span class="w-1.5 h-1.5 bg-indigo-500/70 rounded-full animate-bounce [animation-delay:0s]"></span>
        <span class="w-1.5 h-1.5 bg-indigo-500/70 rounded-full animate-bounce [animation-delay:0.2s]"></span>
        <span class="w-1.5 h-1.5 bg-indigo-500/70 rounded-full animate-bounce [animation-delay:0.4s]"></span>
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
  const duration = 1800;
  const interval = 20;
  const increment = 100 / (duration / interval);

  timer = setInterval(() => {
    const next = progress.value + increment;
    if (next >= 100) {
      progress.value = 100;
      clearInterval(timer);
      setTimeout(() => {
        isComplete.value = true;
        setTimeout(() => {
          emit('loading-complete');
        }, 400);
      }, 200);
    } else {
      progress.value = next;
    }
  }, interval);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

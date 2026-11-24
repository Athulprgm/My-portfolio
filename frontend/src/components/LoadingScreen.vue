<template>
  <div
    class="loader fixed inset-0 w-screen h-[100svh] bg-[var(--bg-primary)] text-[var(--text-primary)] z-[9999] overflow-hidden flex flex-col select-none cursor-pointer"
    :class="{ 'loader-exit': isExiting }"
    @click="triggerExit"
    @wheel.prevent.stop
    @touchmove.prevent.stop
    role="status"
    aria-label="Loading portfolio"
  >
    <!-- Column guides (match site background) -->
    <div class="absolute inset-0 sw-container h-full pointer-events-none" aria-hidden="true">
      <div class="sw-grid h-full">
        <div
          v-for="n in 12"
          :key="n"
          class="h-full border-l border-[var(--grid-line)]"
          :class="[n > 4 ? 'hidden md:block' : '', n === 4 ? 'border-r md:border-r-0' : '', n === 12 ? 'md:border-r' : '']"
        ></div>
      </div>
    </div>

    <div class="loader-inner relative z-10 flex flex-col h-full sw-container pt-safe pb-safe justify-between" :class="{ 'inner-exit': isExiting }">
      <!-- Top meta row -->
      <div class="sw-grid gap-y-2 pt-3 sm:pt-6 sw-fade sw-d1">
        <span class="col-span-2 md:col-span-3 font-heading font-medium text-[15px] tracking-[-0.02em]">
          Athul Krishna<sup class="text-[9px] text-[var(--text-muted)] font-mono-clean">©26</sup>
        </span>
        <span class="hidden md:block md:col-span-3 sw-label">Portfolio — 2026</span>
        <span class="hidden md:block md:col-span-3 sw-label">Kerala, India</span>
        <span class="col-span-2 md:col-span-3 sw-label flex justify-end items-center gap-2">
          <span class="sw-dot animate-pulse"></span>
          <span class="!text-[var(--text-primary)]">{{ progress < 100 ? 'Loading' : 'Ready' }}</span>
        </span>
      </div>

      <!-- Center statement -->
      <div class="my-auto py-4">
        <div class="sw-grid w-full">
          <p class="col-span-4 md:col-span-6 md:col-start-4 font-heading text-[clamp(1.35rem,3.4vw,3rem)] leading-[1.1] sm:leading-[1.05] tracking-[-0.035em]">
            <span class="sw-mask"><span class="sw-d2">Full-stack engineer</span></span>
            <span class="sw-mask"><span class="sw-d3 text-[var(--text-muted)]">&amp; co-founder,</span></span>
            <span class="sw-mask">
              <span class="sw-d4 font-serif-editorial text-[1.1em] text-[var(--accent)]">building calm software.</span>
            </span>
          </p>
        </div>
      </div>

      <!-- Bottom: giant counter + progress rule -->
      <div class="pb-3 sm:pb-6">
        <div class="sw-grid items-end gap-y-2 sm:gap-y-4">
          <div class="col-span-4 md:col-span-8 flex items-start leading-none">
            <span
              class="sw-display tabular-nums text-[clamp(4.25rem,22vw,22rem)]"
              aria-live="polite"
            >{{ displayNum }}</span>
            <span class="font-mono-clean text-[clamp(0.85rem,1.6vw,1.4rem)] text-[var(--accent)] mt-[0.6em] ml-2">%</span>
          </div>
          <div class="col-span-4 md:col-span-4 flex md:justify-end items-end sw-label pb-2 sm:pb-4">
            <span class="hidden sm:inline">Tap, click or press Enter to skip</span>
            <span class="sm:hidden">Tap to enter</span>
          </div>
        </div>

        <div class="relative h-px w-full bg-[var(--border-color)] mt-3 overflow-hidden">
          <div
            class="absolute inset-0 bg-[var(--accent)] origin-left"
            :style="{ transform: `scaleX(${progress / 100})` }"
          ></div>
        </div>
        <div class="flex justify-between sw-label mt-2">
          <span>000</span>
          <span>100</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { stopSmoothScroll, startSmoothScroll } from '../composables/useSmoothScroll';

const emit = defineEmits(['loading-complete']);

const progress = ref(0);
const isExiting = ref(false);
const displayNum = computed(() => String(Math.round(progress.value)).padStart(3, '0'));

const DURATION = 2100;
const timers = new Set();
let rafId = null;

const scheduleTimer = (fn, delay) => {
  const id = setTimeout(() => {
    timers.delete(id);
    fn();
  }, delay);
  timers.add(id);
  return id;
};

const clearAllTimers = () => {
  timers.forEach((id) => clearTimeout(id));
  timers.clear();
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
};

const lockScroll = () => {
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  stopSmoothScroll();
};

const unlockScroll = () => {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  startSmoothScroll();
};

const triggerExit = () => {
  if (isExiting.value) return;
  isExiting.value = true;
  clearAllTimers();
  progress.value = 100;
  unlockScroll();
  scheduleTimer(() => emit('loading-complete'), 1000);
};

const handleKeyDown = (e) => {
  if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') triggerExit();
};

// Stepped ease: quick start, a few "thinking" pauses, smooth finish
const ease = (t) => {
  const base = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  return Math.min(1, base);
};

onMounted(() => {
  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    emit('loading-complete');
    return;
  }

  lockScroll();
  window.addEventListener('keydown', handleKeyDown);

  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / DURATION);
    progress.value = ease(t) * 100;
    if (t < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      rafId = null;
      scheduleTimer(triggerExit, 350);
    }
  };
  scheduleTimer(() => {
    rafId = requestAnimationFrame(step);
  }, 250);

  // Guaranteed fallback cap
  scheduleTimer(triggerExit, 4000);
});

onUnmounted(() => {
  clearAllTimers();
  unlockScroll();
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.loader {
  font-family: var(--font-body);
  will-change: clip-path;
  clip-path: inset(0 0 0 0);
}

/* Curtain wipe upward, content lifts slightly faster for depth */
.loader-exit {
  clip-path: inset(0 0 100% 0);
  transition: clip-path 0.95s cubic-bezier(0.76, 0, 0.24, 1);
  pointer-events: none !important;
}

.loader-inner {
  transition: transform 0.95s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.6s ease;
}

.inner-exit {
  transform: translateY(-12vh);
  opacity: 0.4;
}
</style>

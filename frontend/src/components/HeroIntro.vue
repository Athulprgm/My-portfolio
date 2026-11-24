<template>
  <div class="sw-container min-h-[100svh] flex flex-col pt-24 sm:pt-28 pb-6 sm:pb-8">
    <!-- Meta row: Minimal & focused -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sw-fade sw-d1 pb-2">
      <div class="sw-label !text-[var(--text-primary)]">
        Full-stack engineer<span class="text-[var(--text-muted)]"> · </span>Co-founder, Trawbit
      </div>
      <div class="sw-label flex items-center gap-2">
        <span class="sw-dot animate-pulse"></span>
        <span class="!text-[var(--text-primary)]">Available for work — 2026</span>
      </div>
    </div>

    <!-- Main hero body: Monumental name + profile portrait -->
    <div
      class="flex-1 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 pt-6 sm:pt-14 pb-0"
      @mousemove="onHeroMouseMove"
      @mouseleave="onHeroMouseLeave"
    >
      <!-- Left: Monumental name (name size ++) -->
      <div class="flex-1 flex flex-col justify-end min-w-0 pb-1 md:pb-2">
        <h1
          class="sw-display text-[var(--text-primary)] leading-[0.88] select-none"
          :style="{ fontSize: 'clamp(2.85rem, 13vw, 16.5rem)', transform: `translate3d(0, ${shift}px, 0)` }"
        >
          <span class="sw-mask block"><span class="sw-d2">Athul</span></span>
          <span class="sw-mask block">
            <span class="sw-d3">
              Krishna<span class="text-[var(--accent)]">.</span>
            </span>
          </span>
        </h1>
      </div>

      <!-- Right: Profile portrait — grounded cleanly on baseline rule -->
      <div class="shrink-0 self-center sm:self-start md:self-end sw-fade sw-d3">
        <div
          @click="scrollToSection('about')"
          role="button"
          tabindex="0"
          @keydown.enter="scrollToSection('about')"
          aria-label="About Athul Krishna — Full-stack engineer"
          class="group relative block cursor-pointer select-none w-[min(220px,58vw)] sm:w-[240px] md:w-[260px] lg:w-[320px] xl:w-[360px]"
        >
          <!-- Portrait Cutout Canvas (Frameless, grounded seamlessly on baseline) -->
          <div
            class="relative w-full flex items-end justify-center transition-transform duration-500 ease-out"
            :style="parallaxStyle"
          >
            <picture class="relative z-10 w-full block">
              <source srcset="/avatar.webp?v=5" type="image/webp" />
              <img
                src="/avatar.png?v=5"
                alt="Athul Krishna — Full-stack engineer"
                width="380"
                height="380"
                class="w-full h-auto object-contain object-bottom transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.03] select-none pointer-events-none"
                style="mask-image: linear-gradient(to bottom, black 80%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom row rule: directly under hero body and grounded portrait -->
    <div class="sw-rule sw-fade sw-d4"></div>
    <div class="sw-grid gap-y-7 pt-5 sm:pt-6 sw-fade sw-d5">
      <p class="col-span-4 md:col-span-5 text-[16px] sm:text-[21px] leading-[1.35] sm:leading-[1.3] tracking-[-0.015em] text-[var(--text-primary)] max-w-[34ch]">
        I design and engineer web platforms, mobile apps and commercial software —
        <span class="font-serif-editorial text-[1.12em] text-[var(--text-secondary)]">calm on the surface, rigorous underneath.</span>
      </p>

      <div class="col-span-4 md:col-span-4 md:col-start-7 flex flex-col">
        <button
          @click="scrollToSection('works')"
          class="group flex items-center justify-between py-3 sm:py-2.5 min-h-[44px] border-b border-[var(--border-color)] hover:border-[var(--text-primary)] text-[13px] text-[var(--text-primary)] cursor-pointer transition-colors"
        >
          <span class="sw-roll"><span><span>Selected work</span><span>Selected work</span></span></span>
          <span class="font-mono-clean text-[11px] text-[var(--text-muted)] group-hover:text-[var(--accent)]">↓</span>
        </button>
        <button
          @click="copyEmail"
          class="group flex items-center justify-between py-3 sm:py-2.5 min-h-[44px] border-b border-[var(--border-color)] hover:border-[var(--text-primary)] text-[13px] text-[var(--text-primary)] cursor-pointer transition-colors"
        >
          <span class="sw-roll">
            <span>
              <span>{{ copied ? 'Copied to clipboard' : 'athul@trawbit.com' }}</span>
              <span>{{ copied ? 'Copied to clipboard' : 'Copy email' }}</span>
            </span>
          </span>
          <span class="font-mono-clean text-[11px] text-[var(--text-muted)] group-hover:text-[var(--accent)]">{{ copied ? '✓' : '⧉' }}</span>
        </button>
      </div>

      <div class="hidden md:flex md:col-span-2 md:col-start-11 justify-end items-start">
        <button @click="scrollToSection('about')" class="sw-label hover:!text-[var(--text-primary)] flex items-center gap-2 cursor-pointer">
          Scroll
          <span class="inline-block animate-bounce">↓</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useSmoothScroll } from '../composables/useSmoothScroll';

const { scrollTo: smoothScrollTo, registerScrollCallback } = useSmoothScroll();

const copied = ref(false);
const shift = ref(0);
const parallaxX = ref(0);
const parallaxY = ref(0);

// Subtle parallax tilt on the portrait image
const parallaxStyle = computed(() => ({
  transform: `translate3d(${parallaxX.value * 0.6}px, ${parallaxY.value * 0.4}px, 0)`,
  transition: parallaxX.value === 0 ? 'transform 0.9s cubic-bezier(0.19, 1, 0.22, 1)' : 'transform 0.12s linear',
}));

const onHeroMouseMove = (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  parallaxX.value = Number(((e.clientX - cx) / cx * 7).toFixed(2));
  parallaxY.value = Number(((e.clientY - cy) / cy * 4).toFixed(2));
};

const onHeroMouseLeave = () => {
  parallaxX.value = 0;
  parallaxY.value = 0;
};

let unregisterScroll = null;

// Subtle parallax: the name drifts down as you leave the hero
const onScroll = () => {
  const y = window.scrollY;
  const vh = window.innerHeight || 800;
  if (y <= vh * 1.2) shift.value = Math.round(y * 0.18);
};

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('athul@trawbit.com');
    copied.value = true;
    setTimeout(() => (copied.value = false), 2400);
  } catch {
    window.location.href = 'mailto:athul@trawbit.com';
  }
};

const scrollToSection = (id) => {
  smoothScrollTo('#' + id, { offset: 0, duration: 1.2 });
};

onMounted(() => {
  unregisterScroll = registerScrollCallback(onScroll);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

onUnmounted(() => {
  if (unregisterScroll) unregisterScroll();
  window.removeEventListener('scroll', onScroll);
});
</script>

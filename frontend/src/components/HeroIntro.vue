<template>
  <div
    class="sw-container min-h-[100svh] flex flex-col pt-20 sm:pt-22 pb-5 sm:pb-6"
    :class="{ 'is-entered': heroEntered }"
  >
    <!-- Meta row: Minimal & focused -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 hero-reveal hero-d1 pb-2">
      <div class="sw-label !text-[var(--text-primary)]">
        {{ roleTitle }}<template v-if="!includesCoFounder"><span class="text-[var(--text-muted)]"> · </span>Co-founder, Trawbit</template>
      </div>
      <div class="sw-label flex items-center gap-2">
        <span class="sw-dot animate-pulse"></span>
        <span class="!text-[var(--text-primary)]">Available for work — 2026</span>
      </div>
    </div>

    <!-- Main hero body: Background monumental name + centered oversized portrait overlay -->
    <div
      class="relative flex-1 flex items-end justify-center pt-4 sm:pt-6 pb-0 overflow-hidden"
      @mousemove="onHeroMouseMove"
      @mouseleave="onHeroMouseLeave"
    >
      <!-- Background layer: Monumental display name behind the centered portrait -->
      <div
        class="pointer-events-none select-none absolute inset-x-0 bottom-[clamp(4rem,12svh,7.5rem)] sm:bottom-[clamp(2rem,6svh,4.5rem)] lg:bottom-[clamp(0.5rem,1.25svh,1.5rem)] z-0 flex justify-center"
        :style="nameScrollStyle"
      >
        <div class="w-full" :class="{ 'hero-name-float': heroEntered }">
          <h1
            class="sw-display !font-semibold text-[var(--text-primary)] leading-[0.80] text-center w-full"
            :style="nameParallaxStyle"
          >
            <span class="hero-mask block whitespace-nowrap pt-[0.02em] pb-[0.04em]">
              <span class="hero-mask-span hero-d2">Athul</span>
            </span>
            <span class="hero-mask block whitespace-nowrap pt-[0.02em] pb-[0.04em]">
              <span class="hero-mask-span hero-d3">
                Krishna<span class="hero-accent-dot inline-block text-[var(--accent)]">.</span>
              </span>
            </span>
          </h1>
        </div>
      </div>

      <!-- Foreground layer: Centered oversized profile portrait grounded on baseline rule -->
      <div class="relative z-10 shrink-0 self-end" :style="portraitScrollStyle">
        <div class="hero-portrait-enter">
          <div
            @click="scrollToSection('about')"
            role="button"
            tabindex="0"
            @keydown.enter="scrollToSection('about')"
            @keydown.space.prevent="scrollToSection('about')"
            :aria-label="`About Athul Krishna — ${roleTitle}`"
            class="group relative block cursor-pointer select-none w-[min(84vw,46svh)] sm:w-[min(430px,52svh)] md:w-[min(490px,55svh)] lg:w-[min(540px,57svh)] xl:w-[min(620px,60svh)] aspect-square"
          >
            <!-- Portrait Cutout Canvas (Frameless, grounded seamlessly on baseline) -->
            <div
              class="relative w-full h-full flex items-end justify-center"
              :style="parallaxStyle"
            >
              <div class="w-full h-full origin-bottom" :class="{ 'hero-portrait-breathe': heroEntered }">
                <picture class="relative z-10 w-full h-full block drop-shadow-[0_18px_36px_rgba(0,0,0,0.22)] dark:drop-shadow-[0_22px_44px_rgba(0,0,0,0.72)] transition-[filter] duration-500 group-hover:drop-shadow-[0_24px_46px_rgba(0,0,0,0.3)] dark:group-hover:drop-shadow-[0_26px_54px_rgba(0,0,0,0.85)]">
                  <source srcset="/avatar.webp?v=5" type="image/webp" />
                  <img
                    src="/avatar.png?v=5"
                    :alt="`Athul Krishna — ${roleTitle}`"
                    width="620"
                    height="620"
                    class="w-full h-full object-contain object-bottom origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.035] select-none pointer-events-none"
                    style="mask-image: linear-gradient(to bottom, black 82%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 82%, transparent 100%);"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom row rule: directly under hero body and grounded portrait -->
    <div class="sw-rule hero-rule-enter"></div>
    <div class="sw-grid gap-y-7 pt-5 sm:pt-6 hero-reveal hero-d5">
      <p class="col-span-4 md:col-span-5 text-[16px] sm:text-[21px] leading-[1.35] sm:leading-[1.3] tracking-[-0.015em] text-[var(--text-primary)] max-w-[34ch]">
        I design and engineer AI-powered software, web platforms and commercial systems —
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
import { ref, computed, watch, inject, onMounted, onUnmounted } from 'vue';
import { useSmoothScroll } from '../composables/useSmoothScroll';
import { DEFAULT_ROLE_TITLE, useSettings } from '../composables/useSettings';

const { scrollTo: smoothScrollTo, registerScrollCallback } = useSmoothScroll();
const { roleTitle, includesCoFounder, fetchSettings } = useSettings();
const heroRevealReady = inject('heroRevealReady', ref(true));
const heroEntered = ref(false);

watch(
  roleTitle,
  (title) => {
    if (title === DEFAULT_ROLE_TITLE) {
      document.title = 'Athul Krishna — AI Software Engineer & Co-Founder';
      return;
    }
    document.title = includesCoFounder.value
      ? `Athul Krishna — ${title}`
      : `Athul Krishna — ${title} & Co-Founder`;
  },
  { immediate: true }
);

const copied = ref(false);
const shift = ref(0);
const portraitShift = ref(0);
const nameScrollOpacity = ref(1);
const parallaxX = ref(0);
const parallaxY = ref(0);
const isHoveringHero = ref(false);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let enterTimer = null;
let enterRaf = null;
let fallbackTimer = null;

const triggerHeroEnter = () => {
  if (heroEntered.value) return;
  if (prefersReducedMotion()) {
    heroEntered.value = true;
    return;
  }
  enterRaf = requestAnimationFrame(() => {
    enterRaf = null;
    enterTimer = setTimeout(() => {
      heroEntered.value = true;
    }, 90);
  });
};

watch(
  heroRevealReady,
  (ready) => {
    if (ready) triggerHeroEnter();
  },
  { immediate: true }
);

// Scroll parallax: the background name sinks behind the baseline as you scroll down
const nameScrollStyle = computed(() => ({
  transform: `translate3d(0, ${shift.value}px, 0)`,
  opacity: nameScrollOpacity.value,
}));

// Scroll depth on the foreground portrait for subtle layer separation
const portraitScrollStyle = computed(() => ({
  transform: `translate3d(0, ${portraitShift.value}px, 0)`,
}));

// Inverse mouse depth on background name so portrait and name separate smoothly
const nameParallaxStyle = computed(() => ({
  fontSize: 'clamp(4.75rem, min(28vw, 36.5svh), 26rem)',
  transform: `translate3d(${(-parallaxX.value * 0.75).toFixed(2)}px, ${(-parallaxY.value * 0.5).toFixed(2)}px, 0)`,
  transition: isHoveringHero.value ? 'transform 0.14s ease-out' : 'transform 0.9s cubic-bezier(0.19, 1, 0.22, 1)',
}));

// Subtle 3D tilt + parallax on the centered foreground portrait
const parallaxStyle = computed(() => {
  const tx = (parallaxX.value * 1.05).toFixed(2);
  const ty = (parallaxY.value * 0.55).toFixed(2);
  const rotY = (parallaxX.value * 0.32).toFixed(2);
  const rotX = (-parallaxY.value * 0.3).toFixed(2);
  return {
    transform: `perspective(1100px) rotateY(${rotY}deg) rotateX(${rotX}deg) translate3d(${tx}px, ${ty}px, 0)`,
    transition: isHoveringHero.value ? 'transform 0.14s ease-out' : 'transform 0.9s cubic-bezier(0.19, 1, 0.22, 1)',
  };
});

const onHeroMouseMove = (e) => {
  if (prefersReducedMotion()) return;
  isHoveringHero.value = true;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  parallaxX.value = Number((((e.clientX - cx) / cx) * 8).toFixed(2));
  parallaxY.value = Number((((e.clientY - cy) / cy) * 5).toFixed(2));
};

const onHeroMouseLeave = () => {
  isHoveringHero.value = false;
  parallaxX.value = 0;
  parallaxY.value = 0;
};

let unregisterScroll = null;

// Scroll parallax: background name & foreground portrait move at different speeds
const onScroll = () => {
  if (prefersReducedMotion()) {
    shift.value = 0;
    portraitShift.value = 0;
    nameScrollOpacity.value = 1;
    return;
  }
  const y = window.scrollY;
  const vh = window.innerHeight || 800;
  if (y <= vh * 1.2) {
    shift.value = Math.round(y * 0.22);
    portraitShift.value = Math.round(y * 0.07);
    nameScrollOpacity.value = Number(Math.max(0.25, 1 - Math.min(1, y / (vh * 0.85)) * 0.75).toFixed(3));
  }
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
  fetchSettings();
  unregisterScroll = registerScrollCallback(onScroll);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  fallbackTimer = setTimeout(() => {
    heroEntered.value = true;
  }, 4200);
});

onUnmounted(() => {
  if (enterRaf) cancelAnimationFrame(enterRaf);
  if (enterTimer) clearTimeout(enterTimer);
  if (fallbackTimer) clearTimeout(fallbackTimer);
  if (unregisterScroll) unregisterScroll();
  window.removeEventListener('scroll', onScroll);
});
</script>

<style scoped>
.hero-reveal {
  opacity: 0;
  transform: translate3d(0, 18px, 0);
  transition: opacity 0.9s cubic-bezier(0.19, 1, 0.22, 1), transform 1s cubic-bezier(0.19, 1, 0.22, 1);
}

.is-entered .hero-reveal {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.hero-mask {
  display: block;
  overflow: hidden;
}

.hero-mask-span {
  display: block;
  transform: translate3d(0, 108%, 0);
  transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
  will-change: transform;
}

.is-entered .hero-mask-span {
  transform: translate3d(0, 0, 0);
}

.hero-accent-dot {
  transform: scale(0.35);
  opacity: 0;
  transition: transform 0.75s cubic-bezier(0.22, 1.4, 0.36, 1) 0.52s, opacity 0.5s ease 0.52s;
}

.is-entered .hero-accent-dot {
  transform: scale(1);
  opacity: 1;
}

.hero-portrait-enter {
  opacity: 0;
  transform: translate3d(0, 52px, 0) scale(0.93);
  transition: opacity 1.05s cubic-bezier(0.19, 1, 0.22, 1) 0.2s, transform 1.3s cubic-bezier(0.19, 1, 0.22, 1) 0.2s;
  will-change: transform, opacity;
}

.is-entered .hero-portrait-enter {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
}

.hero-rule-enter {
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1.15s cubic-bezier(0.65, 0, 0.35, 1) 0.34s;
}

.is-entered .hero-rule-enter {
  transform: scaleX(1);
}

.hero-d1 {
  transition-delay: 0.06s;
}

.hero-d2 {
  transition-delay: 0.14s;
}

.hero-d3 {
  transition-delay: 0.24s;
}

.hero-d5 {
  transition-delay: 0.46s;
}

@keyframes heroNameFloat {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -6px, 0);
  }
}

@keyframes heroPortraitBreathe {
  0%,
  100% {
    transform: scale(1) translate3d(0, 0, 0);
  }
  50% {
    transform: scale(1.018) translate3d(0, -3px, 0);
  }
}

.hero-name-float {
  animation: heroNameFloat 8s ease-in-out 1.4s infinite;
  will-change: transform;
}

.hero-portrait-breathe {
  animation: heroPortraitBreathe 6.5s ease-in-out 1.5s infinite;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .hero-reveal,
  .hero-mask-span,
  .hero-accent-dot,
  .hero-portrait-enter,
  .hero-rule-enter {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }

  .hero-name-float,
  .hero-portrait-breathe {
    animation: none !important;
  }
}
</style>

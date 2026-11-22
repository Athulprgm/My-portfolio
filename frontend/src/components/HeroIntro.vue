<template>
  <div class="sw-container min-h-[100svh] flex flex-col pt-24 sm:pt-28 pb-6 sm:pb-8">
    <!-- Meta row -->
    <div class="sw-grid gap-y-3 sw-fade sw-d1">
      <div class="col-span-2 md:col-span-3 sw-label">(01) — Index</div>
      <div class="col-span-2 md:col-span-3 sw-label !text-[var(--text-primary)]">
        Full-stack engineer<br />Co-founder, Trawbit
      </div>
      <div class="hidden md:block md:col-span-3 sw-label">
        Kerala, India<br />{{ istTime }} IST
      </div>
      <div class="col-span-4 md:col-span-3 sw-label flex md:justify-end items-center gap-2">
        <span class="sw-dot animate-pulse"></span>
        <span class="!text-[var(--text-primary)]">Available for work — 2026</span>
      </div>
    </div>

    <!-- Monumental name -->
    <div class="flex-1 flex flex-col justify-end pt-16 sm:pt-24">
      <h1
        class="sw-display relative text-[var(--text-primary)]"
        :style="{ fontSize: 'clamp(4.2rem, 19.5vw, 21rem)', transform: `translate3d(0, ${shift}px, 0)` }"
      >
        <span class="sw-mask"><span class="sw-d2">Athul</span></span>
        <span class="sw-mask text-right">
          <span class="sw-d3">Krishna<span class="text-[var(--accent)]">.</span></span>
        </span>

        <!-- Rotating availability badge -->
        <button
          @click="scrollToSection('contact')"
          class="group hidden md:flex absolute right-[1%] top-[4%] w-[clamp(108px,10vw,150px)] aspect-square items-center justify-center text-[var(--text-primary)] cursor-pointer sw-fade sw-d6"
          aria-label="Start a project"
        >
          <svg viewBox="0 0 120 120" class="absolute inset-0 w-full h-full sw-spin" aria-hidden="true">
            <defs>
              <path id="hero-badge-circle" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
            </defs>
            <text
              font-family="JetBrains Mono, monospace"
              font-size="8.4"
              fill="currentColor"
              textLength="292"
              lengthAdjust="spacing"
            >
              <textPath href="#hero-badge-circle">AVAILABLE FOR NEW PROJECTS · LET'S TALK · </textPath>
            </text>
          </svg>
          <span
            class="relative w-[42%] aspect-square rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-[22px] tracking-normal leading-none transition-transform duration-500 group-hover:scale-110"
          >
            <span class="transition-transform duration-500 group-hover:rotate-45">↗</span>
          </span>
        </button>
      </h1>
    </div>

    <!-- Bottom row -->
    <div class="sw-rule mt-8 sm:mt-10 sw-fade sw-d4"></div>
    <div class="sw-grid gap-y-7 pt-5 sm:pt-6 sw-fade sw-d5">
      <div class="col-span-4 md:col-span-6 flex items-start sm:items-center gap-4 sm:gap-5">
        <button
          @click="scrollToSection('about')"
          class="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] hover:border-[var(--accent)] shrink-0 cursor-pointer transition-colors duration-300"
          aria-label="About Athul Krishna"
        >
          <span class="block w-full h-full rounded-full overflow-hidden">
            <picture>
              <source srcset="/avatar.webp" type="image/webp" />
              <img
                src="/avatar.png"
                alt="Athul Krishna illustrated portrait"
                width="128"
                height="128"
                class="w-full h-full object-cover object-top scale-110 translate-y-1 transition-transform duration-500 group-hover:scale-125"
              />
            </picture>
          </span>
          <span
            class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[var(--accent)] ring-2 ring-[var(--bg-primary)]"
            aria-hidden="true"
          ></span>
        </button>

        <p class="text-[17px] sm:text-[21px] leading-[1.3] tracking-[-0.015em] text-[var(--text-primary)] max-w-[34ch]">
          I design and engineer web platforms, mobile apps and commercial software —
          <span class="font-serif-editorial text-[1.12em] text-[var(--text-secondary)]">calm on the surface, rigorous underneath.</span>
        </p>
      </div>

      <div class="col-span-4 md:col-span-4 md:col-start-7 flex flex-col">
        <button
          @click="scrollToSection('works')"
          class="group flex items-center justify-between py-2.5 border-b border-[var(--border-color)] hover:border-[var(--text-primary)] text-[13px] text-[var(--text-primary)] cursor-pointer transition-colors"
        >
          <span class="sw-roll"><span><span>Selected work</span><span>Selected work</span></span></span>
          <span class="font-mono-clean text-[11px] text-[var(--text-muted)] group-hover:text-[var(--accent)]">(04) ↓</span>
        </button>
        <button
          @click="copyEmail"
          class="group flex items-center justify-between py-2.5 border-b border-[var(--border-color)] hover:border-[var(--text-primary)] text-[13px] text-[var(--text-primary)] cursor-pointer transition-colors"
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
import { ref, onMounted, onUnmounted } from 'vue';
import { useSmoothScroll } from '../composables/useSmoothScroll';

const { scrollTo: smoothScrollTo, registerScrollCallback } = useSmoothScroll();

const copied = ref(false);
const istTime = ref('');
const shift = ref(0);

let clockTimer = null;
let unregisterScroll = null;

const updateClock = () => {
  try {
    istTime.value = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    istTime.value = '--:--';
  }
};

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
  updateClock();
  clockTimer = setInterval(updateClock, 30000);
  unregisterScroll = registerScrollCallback(onScroll);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

onUnmounted(() => {
  if (clockTimer) clearInterval(clockTimer);
  if (unregisterScroll) unregisterScroll();
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <div
    ref="scrollSectionRef"
    class="relative w-full h-[320vh] bg-black text-white selection:bg-white selection:text-black"
    id="home"
  >
    <!-- ══════════════════ STICKY FULLSCREEN VIEWPORT ══════════════════ -->
    <div class="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-black px-6 sm:px-12 py-6 select-none z-10">

      <!-- AMBIENT COLOR GLOW ORBS (Provides glassmorphism its frosted refraction) -->
      <div class="absolute -top-32 -right-32 w-96 h-96 bg-[#10B981]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div class="absolute -bottom-32 -left-32 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <!-- TOP EDITORIAL METADATA STRIP -->
      <div class="w-full flex items-center justify-between border-b border-white/10 pb-3 text-[11px] font-mono text-[#888888] relative z-10">
        <div class="flex items-center gap-2.5">
          <span class="w-1.5 h-1.5 bg-[#10B981] animate-pulse"></span>
          <span class="tracking-wider uppercase">KERALA, INDIA · AVAILABLE FOR PROJECTS WORLDWIDE</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="hidden sm:inline text-[#666666]">CO-FOUNDER @ TRAWBIT TECHNOLOGIES</span>
          <span class="px-2.5 py-0.5 glass-panel text-[#10B981] font-bold border-white/15">
            STAGE 0{{ activeSlide + 1 }} / 03
          </span>
        </div>
      </div>

      <!-- MAIN SLIDE DECK (TRANSITIONS CONTENT AS YOU SCROLL) -->
      <div class="relative w-full max-w-6xl mx-auto flex-1 flex items-center my-auto py-4 z-10">

        <!-- ── SLIDE 01: THE VISION & FOUNDER ───────────────────────── -->
        <div
          class="w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          :class="activeSlide === 0
            ? 'opacity-100 translate-y-0 pointer-events-auto relative z-10'
            : 'opacity-0 -translate-y-10 pointer-events-none absolute inset-0 flex flex-col justify-center z-0'"
        >
          <div class="max-w-4xl flex flex-col items-start w-full">

            <!-- Eyebrow -->
            <div class="text-[11px] font-mono tracking-[0.2em] text-[#10B981] font-bold mb-3 uppercase flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-[#10B981]"></span>
              <span>DIGITAL STUDIO // WEBSITES, APPS &amp; SYSTEMS</span>
            </div>

            <!-- Kinetic Headline with Masked Word Slide -->
            <h1 class="text-4xl sm:text-6xl lg:text-[4.75rem] font-extrabold text-white tracking-tight leading-[1.06] mb-6">
              <span class="mask-line">
                <span class="slide-up-masked block">
                  Distinctive software
                </span>
              </span>
              <span class="mask-line mt-1">
                <span class="slide-up-masked delay-mask-1 flex flex-wrap items-baseline gap-x-2 sm:gap-x-3">
                  <span>for brands</span>
                  <span class="inline-block relative overflow-hidden h-[1.12em] align-bottom px-2.5 sm:px-3 bg-black/60 backdrop-blur-md border border-white/15 min-w-[210px] sm:min-w-[340px]">
                    <span
                      class="flex flex-col"
                      :class="isWordTransitioning ? 'transition-transform duration-650 ease-[cubic-bezier(0.16,1,0.3,1)]' : 'transition-none'"
                      :style="{ transform: `translateY(-${currentWordIndex * 100}%)` }"
                    >
                      <span
                        v-for="(word, idx) in wordList"
                        :key="idx"
                        class="h-[1.12em] flex items-center text-[#10B981] font-extrabold tracking-tight"
                      >
                        {{ word }}
                      </span>
                    </span>
                  </span>
                  <span>remembering.</span>
                </span>
              </span>
            </h1>

            <!-- Supporting Paragraph with Worth Agency Voice -->
            <p class="text-lg sm:text-2xl text-[#888888] leading-relaxed max-w-2xl mb-8 font-normal">
              Built with clarity, taste, and purpose. Full-stack developer and startup co-founder creating web platforms, mobile apps, and digital systems.
            </p>

            <!-- Value Metrics (Glassmorphic Sharp Boxes) -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-6 border-t border-white/10">
              <div class="p-4 sm:p-5 glass-panel box-hover-slide">
                <div class="text-2xl sm:text-3xl font-extrabold font-mono text-white mb-1">15+</div>
                <div class="text-[11px] font-mono text-[#888888] uppercase">Products Shipped</div>
              </div>
              <div class="p-4 sm:p-5 glass-panel box-hover-slide border-[#10B981]/30">
                <div class="text-2xl sm:text-3xl font-extrabold font-mono text-[#10B981] mb-1">100%</div>
                <div class="text-[11px] font-mono text-[#888888] uppercase">On-Time Delivery</div>
              </div>
              <div class="p-4 sm:p-5 glass-panel box-hover-slide border-[#06B6D4]/30">
                <div class="text-2xl sm:text-3xl font-extrabold font-mono text-[#06B6D4] mb-1">Idea → Scale</div>
                <div class="text-[11px] font-mono text-[#888888] uppercase">End-to-End Ownership</div>
              </div>
            </div>

          </div>
        </div>

        <!-- ── SLIDE 02: THE PROCESS & METHODOLOGY ───────────────────── -->
        <div
          class="w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          :class="activeSlide === 1
            ? 'opacity-100 translate-y-0 pointer-events-auto relative z-10'
            : (activeSlide < 1 ? 'opacity-0 translate-y-10' : 'opacity-0 -translate-y-10') + ' pointer-events-none absolute inset-0 flex flex-col justify-center z-0'"
        >
          <div class="max-w-5xl flex flex-col items-start w-full">

            <!-- Eyebrow -->
            <div class="text-[11px] font-mono tracking-[0.2em] text-[#10B981] font-bold mb-3 uppercase flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-[#10B981]"></span>
              <span>02 / THE METHODOLOGY</span>
            </div>

            <!-- Big Statement -->
            <h2 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-8">
              <span class="mask-line">
                <span class="block">Built with clarity,</span>
              </span>
              <span class="mask-line mt-1">
                <span class="block text-[#888888]">taste, and purpose.</span>
              </span>
            </h2>

            <!-- 3-Phase Interactive Process Cards (Frosted Glass Panels) -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mb-6">

              <!-- Phase 01 -->
              <div class="p-6 glass-panel hover:border-[#10B981]/50 transition-colors flex flex-col">
                <div class="flex items-center justify-between mb-3 text-xs font-mono text-[#888888]">
                  <span>PHASE 01</span>
                  <span class="w-2 h-2 bg-[#10B981]"></span>
                </div>
                <div class="text-xl font-extrabold text-white mb-2 uppercase">IDEA &amp; STRATEGY</div>
                <p class="text-xs sm:text-sm text-[#888888] leading-relaxed">
                  Clarifying customer needs, designing intuitive user wireframes, and setting a predictable roadmap before writing code.
                </p>
                <div class="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-[#10B981]">
                  Clear Timeline &amp; Scoping →
                </div>
              </div>

              <!-- Phase 02 (Active Glass Panel) -->
              <div class="p-6 glass-panel-emerald flex flex-col">
                <div class="flex items-center justify-between mb-3 text-xs font-mono text-[#10B981]">
                  <span>PHASE 02</span>
                  <span class="w-2 h-2 bg-[#10B981]"></span>
                </div>
                <div class="text-xl font-extrabold text-white mb-2 uppercase">DESIGN &amp; BUILD</div>
                <p class="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
                  Crafting modern user experiences and engineering fast, reliable software with weekly interactive demo updates.
                </p>
                <div class="mt-4 pt-3 border-t border-[#10B981]/30 text-[11px] font-mono text-[#10B981]">
                  Weekly Working Demos →
                </div>
              </div>

              <!-- Phase 03 -->
              <div class="p-6 glass-panel hover:border-[#06B6D4]/50 transition-colors flex flex-col">
                <div class="flex items-center justify-between mb-3 text-xs font-mono text-[#06B6D4]">
                  <span>PHASE 03</span>
                  <span class="w-2 h-2 bg-[#06B6D4]"></span>
                </div>
                <div class="text-xl font-extrabold text-white mb-2 uppercase">LAUNCH &amp; SCALE</div>
                <p class="text-xs sm:text-sm text-[#888888] leading-relaxed">
                  Smooth cloud deployment, automated data backups, uptime monitoring, and continuous product improvements.
                </p>
                <div class="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-[#06B6D4]">
                  Zero Downtime &amp; Support →
                </div>
              </div>

            </div>

            <!-- Client Quote Strip (Frosted Glass Bar) -->
            <div class="w-full p-4 glass-panel border-l-2 border-[#10B981] text-xs font-mono text-[#888888]">
              “From understanding your business challenge to designing, launching, and improving a product your customers love.”
            </div>

          </div>
        </div>

        <!-- ── SLIDE 03: CLIENT DELIVERABLES & ACTION ─────────────────── -->
        <div
          class="w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          :class="activeSlide === 2
            ? 'opacity-100 translate-y-0 pointer-events-auto relative z-10'
            : 'opacity-0 translate-y-10 pointer-events-none absolute inset-0 flex flex-col justify-center z-0'"
        >
          <div class="max-w-5xl flex flex-col items-start w-full">

            <!-- Eyebrow -->
            <div class="text-[11px] font-mono tracking-[0.2em] text-[#06B6D4] font-bold mb-3 uppercase flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-[#06B6D4]"></span>
              <span>03 / WHAT YOU GET &amp; NEXT STEPS</span>
            </div>

            <!-- Big Statement -->
            <h2 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-8">
              <span class="mask-line">
                <span class="block">Fast, reliable software.</span>
              </span>
              <span class="mask-line mt-1">
                <span class="block text-[#06B6D4]">Ready for market growth.</span>
              </span>
            </h2>

            <!-- 3 Deliverable Pillars (Frosted Glass Panels) -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full mb-8">
              <div class="p-5 glass-panel box-hover-slide">
                <div class="text-[#10B981] font-mono text-xs mb-1 font-bold">[01] WEB APPS &amp; SAAS</div>
                <div class="text-white font-extrabold text-base mb-2">Modern Web Platforms</div>
                <p class="text-xs text-[#888888] leading-relaxed">
                  Fast responsive client dashboards, customer portals, payment gateways, and business administration tools.
                </p>
              </div>

              <div class="p-5 glass-panel box-hover-slide border-[#06B6D4]/30">
                <div class="text-[#06B6D4] font-mono text-xs mb-1 font-bold">[02] MOBILE APPS</div>
                <div class="text-white font-extrabold text-base mb-2">iOS &amp; Android Apps</div>
                <p class="text-xs text-[#888888] leading-relaxed">
                  Smooth mobile applications published directly to the Apple App Store and Google Play Store.
                </p>
              </div>

              <div class="p-5 glass-panel box-hover-slide">
                <div class="text-white font-mono text-xs mb-1 font-bold">[03] AUTOMATION &amp; POS</div>
                <div class="text-white font-extrabold text-base mb-2">Business Management</div>
                <p class="text-xs text-[#888888] leading-relaxed">
                  Custom inventory tracking, billing, point-of-sale, and automated operational workflows.
                </p>
              </div>
            </div>

            <!-- Action Buttons with Rolling Text Slide -->
            <div class="flex flex-wrap items-center gap-5">
              <button
                @click="scrollTo('work')"
                class="btn-slide-fill btn-roll px-8 py-4 text-xs font-bold tracking-wider uppercase flex items-center gap-3 group cursor-pointer"
              >
                <span class="roll-track">
                  <span>VIEW RECENT WORK</span>
                  <span class="text-black font-extrabold">VIEW RECENT WORK</span>
                </span>
                <span class="arrow-slide">→</span>
              </button>

              <button
                @click="scrollTo('contact')"
                class="btn-slide-color btn-roll px-8 py-4 text-xs font-bold tracking-wider uppercase flex items-center gap-3 group cursor-pointer"
              >
                <span class="roll-track">
                  <span>START A CONVERSATION</span>
                  <span class="text-[#10B981] font-extrabold">START A CONVERSATION</span>
                </span>
                <span class="arrow-slide">→</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      <!-- RIGHT-HAND STICKY STAGE STEPPER (CLICKABLE OR SCROLL-DRIVEN) -->
      <div class="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col items-end gap-4 p-4 glass-panel border-white/10 text-xs font-mono z-30 select-none shadow-2xl">
        <button
          v-for="(slide, idx) in slideList"
          :key="slide.num"
          @click="goToSlide(idx)"
          class="flex items-center gap-3 group text-right transition-colors cursor-pointer"
          :class="activeSlide === idx ? 'text-white' : 'text-[#555555] hover:text-[#999999]'"
        >
          <span class="tracking-widest uppercase text-[10px]">{{ slide.title }}</span>
          <span
            class="h-[2px] transition-all duration-300"
            :class="activeSlide === idx ? 'w-8 bg-[#10B981]' : 'w-3 bg-white/20 group-hover:bg-white/40'"
          ></span>
          <span class="font-bold">{{ slide.num }}</span>
        </button>
      </div>

      <!-- BOTTOM CONTROL & SCROLL CUE STRIP -->
      <div class="w-full flex items-center justify-between border-t border-white/10 pt-3 text-xs font-mono text-[#888888] relative z-10">
        <!-- Scroll Progress Bar -->
        <div class="flex items-center gap-3">
          <div class="w-24 sm:w-36 h-1 bg-[#1A1A1A] relative overflow-hidden">
            <div
              class="h-full bg-[#10B981] transition-all duration-150 ease-out"
              :style="{ width: `${Math.round(scrollProgress * 100)}%` }"
            ></div>
          </div>
          <span class="text-[10px] text-[#666666] uppercase">
            {{ Math.round(scrollProgress * 100) }}% SCROLLED
          </span>
        </div>

        <!-- Animated Scroll Instruction -->
        <div class="flex items-center gap-2 text-[11px] text-[#CCCCCC]">
          <span v-if="activeSlide < 2" class="flex items-center gap-2">
            <span>SCROLL TO ADVANCE TO STAGE 0{{ activeSlide + 2 }}</span>
            <span class="text-[#10B981] animate-bounce">↓</span>
          </span>
          <span v-else class="flex items-center gap-2 text-[#10B981]">
            <span>SCROLL DOWN TO VIEW PROJECTS</span>
            <span class="animate-bounce">↓</span>
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// ── 1. Scroll-Driven Slide State ───────────────────────────────────────────
const scrollSectionRef = ref(null);
const activeSlide = ref(0);
const scrollProgress = ref(0);

const slideList = [
  { num: '01', title: 'VISION' },
  { num: '02', title: 'PROCESS' },
  { num: '03', title: 'DELIVERABLES' },
];

const handleScroll = () => {
  if (!scrollSectionRef.value) return;
  const rect = scrollSectionRef.value.getBoundingClientRect();
  const maxScroll = rect.height - window.innerHeight;
  if (maxScroll <= 0) return;

  const currentScroll = -rect.top;
  const progress = Math.max(0, Math.min(1, currentScroll / maxScroll));
  scrollProgress.value = progress;

  // Change content based on scroll position
  if (progress < 0.33) {
    activeSlide.value = 0;
  } else if (progress < 0.68) {
    activeSlide.value = 1;
  } else {
    activeSlide.value = 2;
  }
};

const goToSlide = (slideIndex) => {
  if (!scrollSectionRef.value) return;
  const rect = scrollSectionRef.value.getBoundingClientRect();
  const currentY = window.scrollY;
  const sectionTop = currentY + rect.top;
  const maxScroll = rect.height - window.innerHeight;

  const targetProgresses = [0.05, 0.48, 0.92];
  const targetY = sectionTop + (maxScroll * targetProgresses[slideIndex]);

  window.scrollTo({
    top: targetY,
    behavior: 'smooth',
  });
};

// ── 2. Headline Infinite Word Slide (Slot machine) ─────────────────────────
const baseWords = ['worth', 'brands', 'founders', 'startups', 'products'];
const wordList = [...baseWords, baseWords[0]];
const currentWordIndex = ref(0);
const isWordTransitioning = ref(true);
let wordTimer = null;

const advanceWord = () => {
  isWordTransitioning.value = true;
  currentWordIndex.value++;

  if (currentWordIndex.value === wordList.length - 1) {
    setTimeout(() => {
      isWordTransitioning.value = false;
      currentWordIndex.value = 0;
    }, 650);
  }
};

// ── 3. Smooth Navigation ───────────────────────────────────────────────────
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = 70;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
  wordTimer = setInterval(advanceWord, 2400);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (wordTimer) clearInterval(wordTimer);
});
</script>

<style scoped>
/* Scoped transitions are handled via Tailwind and index.css */
</style>

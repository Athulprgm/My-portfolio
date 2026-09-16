<template>
  <section class="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden" id="journey">

    <!-- Background glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#ffffff]/4 rounded-none blur-[120px] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto relative z-10">

      <!-- Section header -->
      <div class="text-center mb-16 scroll-reveal" ref="headerRef">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#2A2A2A] text-xs font-mono text-[#A1A1AA] mb-4">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>My Journey</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Education & Experience
        </h2>
        <p class="text-base text-[#A1A1AA] max-w-xl mx-auto leading-relaxed font-sans">
          A timeline of my academic background, technical training, and building products at Trawbit.
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Central vertical line -->
        <div class="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#ffffff]/30 via-cyan-500/20 to-transparent hidden md:block"></div>

        <div class="flex flex-col gap-12 md:gap-16">
          <div
            v-for="(item, i) in timeline"
            :key="i"
            :ref="el => { if (el) itemRefs[i] = el }"
            class="relative flex items-center gap-8"
            :class="i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
          >

            <!-- Content card -->
            <div
              class="w-full md:w-[calc(50%-40px)] timeline-card group"
              :class="[
                i % 2 === 0 ? 'scroll-reveal-left' : 'scroll-reveal-right',
                item.revealed ? 'revealed' : ''
              ]"
              :style="{ transitionDelay: `${i * 0.1}s` }"
            >
              <div
                class="relative p-6 sm:p-7 rounded-none border bg-[#0A0A0A] backdrop-blur hover:bg-[#121212] transition-all duration-300 group-hover:-translate-y-1"
                :style="{ borderColor: item.color + '20' }"
                @mouseenter="hoveredItem = i"
                @mouseleave="hoveredItem = null"
              >
                <!-- Hover glow -->
                <div
                  class="absolute inset-0 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  :style="{ background: `radial-gradient(circle at 30% 50%, ${item.color}08, transparent 70%)` }"
                ></div>

                <!-- Year tag -->
                <div
                  class="inline-flex items-center gap-2 rounded-none px-3 py-1 text-[10px] font-mono font-bold tracking-[0.15em] mb-4 border"
                  :style="{ background: item.color + '10', borderColor: item.color + '30', color: item.color }"
                >
                  <i :class="item.icon" class="text-[9px]"></i>
                  {{ item.year }}
                </div>

                <h3 class="font-sans text-lg font-bold text-white mb-1.5 leading-tight">{{ item.title }}</h3>
                <p class="font-mono text-xs font-semibold tracking-wide mb-3" :style="{ color: item.color }">
                  {{ item.institution }}
                </p>
                <p class="font-sans text-sm text-[#A1A1AA] leading-relaxed">{{ item.description }}</p>

                <!-- Status chip -->
                <div
                  v-if="item.status"
                  class="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none border font-mono text-[9px] font-bold tracking-wider"
                  :style="{ background: item.color + '10', borderColor: item.color + '30', color: item.color }"
                >
                  <span class="w-1.5 h-1.5 rounded-none animate-pulse" :style="{ background: item.color }"></span>
                  {{ item.status }}
                </div>
              </div>
            </div>

            <!-- Center node (desktop) -->
            <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-none items-center justify-center border-2 bg-[#0A0A0A] transition-all duration-400"
              :style="{
                borderColor: hoveredItem === i ? item.color : 'rgba(255,255,255,0.1)',
                boxShadow: hoveredItem === i ? `0 0 20px ${item.color}40` : 'none'
              }"
            >
              <span class="font-mono text-[10px] font-black" :style="{ color: hoveredItem === i ? item.color : '#555' }">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>

            <!-- Spacer for the other side -->
            <div class="hidden md:block w-[calc(50%-40px)]"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';

const headerRef = ref(null);
const itemRefs  = reactive([]);
const hoveredItem = ref(null);

const timeline = reactive([
  {
    year: '2021',
    title: 'Higher Secondary in Science',
    institution: 'State Board Higher Secondary',
    description: 'Completed higher secondary education in Mathematics and Physical Sciences, developing strong logical reasoning and problem-solving fundamentals.',
    icon: 'fa-solid fa-graduation-cap',
    color: '#4FC08D',
    status: 'Completed',
    revealed: false,
  },
  {
    year: '2023',
    title: 'BSc Computer Science',
    institution: 'Kannur University Affiliate (IHRD)',
    description: 'Earned a Bachelor of Science in Computer Science, building core expertise in algorithms, data structures, relational database design, and software engineering.',
    icon: 'fa-solid fa-university',
    color: '#00FFFF',
    status: 'Graduated',
    revealed: false,
  },
  {
    year: '2024',
    title: 'Full-Stack Web & Mobile Specialization',
    institution: 'Full-Stack Engineering Training',
    description: 'Intensive practical development with Laravel backends, modern JS frameworks (React & Vue), Flutter mobile development, and production database modeling.',
    icon: 'fa-solid fa-laptop-code',
    color: '#008F11',
    status: 'Certified',
    revealed: false,
  },
  {
    year: '2025 - PRESENT',
    title: 'Co-Founder & Full-Stack Lead',
    institution: 'Trawbit Technologies',
    description: 'Co-founded Trawbit Technologies—architecting and delivering production web applications, custom APIs, and mobile apps for clients.',
    icon: 'fa-solid fa-rocket',
    color: '#ffffff',
    status: 'Active',
    revealed: false,
  },
]);

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Header
          if (entry.target === headerRef.value) {
            entry.target.classList.add('revealed');
          }
          // Timeline items
          const idx = itemRefs.findIndex(r => r === entry.target);
          if (idx !== -1) timeline[idx].revealed = true;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  if (headerRef.value) observer.observe(headerRef.value);
  setTimeout(() => {
    itemRefs.forEach((el) => { if (el) observer.observe(el); });
  }, 100);
});

onUnmounted(() => observer?.disconnect());
</script>

<style scoped>
.timeline-card {
  will-change: transform, opacity;
}
</style>

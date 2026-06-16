<template>
  <section class="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden" id="journey">

    <!-- Background glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#ffffff]/4 rounded-none blur-[120px] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto relative z-10">

      <!-- Section header -->
      <div class="text-center mb-20 scroll-reveal" ref="headerRef">
        <div class="inline-flex items-center gap-2 border border-[#ffffff]/20 bg-green-950/20 rounded-none px-4 py-1.5 mb-5">
          <span class="w-1.5 h-1.5 bg-[#ffffff] rounded-none animate-pulse"></span>
          <span class="font-mono text-[10.5px] text-[#ffffff] tracking-wide font-semibold uppercase">My Path</span>
        </div>
        <h2 class="font-mono text-xl md:text-2xl lg:text-3xl font-black text-white mb-4 tracking-tight leading-loose">
          The <span class="bg-gradient-to-r from-[#ffffff] via-neutral-300 to-neutral-500 bg-clip-text text-transparent">Journey</span>
        </h2>
        <p class="font-mono text-[11px] text-emerald-400/90 max-w-md mx-auto leading-relaxed font-semibold">
          // Every milestone that shaped the builder
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
                class="relative p-6 rounded-none border bg-[#0A0A0A] backdrop-blur hover:bg-[#0A0A0A] transition-all duration-500 group-hover:-translate-y-1"
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
                  class="inline-flex items-center gap-2 rounded-none px-3 py-1 text-[9.5px] font-mono font-black tracking-[0.2em] mb-4 border"
                  :style="{ background: item.color + '10', borderColor: item.color + '30', color: item.color }"
                >
                  <i :class="item.icon" class="text-[9px]"></i>
                  {{ item.year }}
                </div>

                <h3 class="font-mono text-lg font-black text-white mb-1.5 leading-tight">{{ item.title }}</h3>
                <p class="font-mono text-[11px] font-semibold tracking-wide mb-3" :style="{ color: item.color }">
                  {{ item.institution }}
                </p>
                <p class="font-sans text-[13px] text-[#A1A1AA] leading-relaxed">{{ item.description }}</p>

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
import { ref, reactive, onMounted, onUnmounted } from 'vue'; // reactive kept for `timeline`

const headerRef = ref(null);
const itemRefs  = ref([]);
const hoveredItem = ref(null);

const timeline = reactive([
  {
    year: '2021',
    title: 'Science Education',
    institution: 'KMVHSE Kodakkad, Kasaragod',
    description: 'Completed Higher Secondary with a focus in Science, building a strong analytical foundation and discovering a passion for technology.',
    icon: 'fa-solid fa-graduation-cap',
    color: '#4FC08D',
    status: 'Completed',
    revealed: false,
  },
  {
    year: '2023',
    title: 'BSc Computer Science',
    institution: 'IHRD CAS Cheemeni, Kasaragod',
    description: 'Pursued a Bachelor of Science in Computer Science — deep-diving into algorithms, data structures, databases, and software engineering principles.',
    icon: 'fa-solid fa-university',
    color: '#00FFFF',
    status: 'Completed',
    revealed: false,
  },
  {
    year: '2024',
    title: 'Full Stack Development',
    institution: 'Techmindz, Kochi, Kerala',
    description: 'Intensive MERN stack training at one of Kerala\'s premier tech academies — shipping real-world projects and mastering modern development workflows.',
    icon: 'fa-solid fa-laptop-code',
    color: '#008F11',
    status: 'Certified',
    revealed: false,
  },
  {
    year: '2025',
    title: 'Co-Founder',
    institution: 'Trawbit Technologies',
    description: 'Co-founded Trawbit Technologies — building SaaS platforms, enterprise systems, and AI-powered products. Leading product, architecture, and engineering.',
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
          const idx = itemRefs.value.findIndex(r => r === entry.target);
          if (idx !== -1) timeline[idx].revealed = true;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  if (headerRef.value) observer.observe(headerRef.value);
  setTimeout(() => {
    itemRefs.value.forEach((el) => { if (el) observer.observe(el); });
  }, 100);
});

onUnmounted(() => observer?.disconnect());
</script>

<style scoped>
.timeline-card {
  will-change: transform, opacity;
}
</style>

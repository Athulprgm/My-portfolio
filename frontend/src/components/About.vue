<template>
  <section class="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden bg-[#0A0A0A] border-b border-[#2A2A2A]" id="about">

    <!-- Subtle ambient lighting -->
    <div class="absolute top-1/4 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-1/4 left-0 w-96 h-96 bg-emerald-500/[0.02] rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto relative z-10">

      <!-- ================= SECTION HEADER ================= -->
      <div class="max-w-3xl mb-14 sm:mb-16 scroll-reveal" ref="headerRef">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#2A2A2A] text-xs font-mono text-[#A1A1AA] mb-4">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>About Athul</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          A pragmatic engineer focused on building products that truly work.
        </h2>
        <p class="text-base sm:text-lg text-[#A1A1AA] leading-relaxed font-sans">
          I'm a full-stack engineer and co-founder based in Kerala, India. I care about solid fundamentals, thoughtful architecture, and shipping clean software that solves real problems.
        </p>
      </div>

      <!-- ================= STORY & SHOWCASE ================= -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch scroll-reveal" ref="bioRef">
        
        <!-- Left: Story & Values (7 cols) -->
        <div class="lg:col-span-7 bg-[#111111] border border-[#222222] p-7 sm:p-9 flex flex-col justify-between hover:border-[#3A3A3A] transition-colors">
          <div>
            <div class="flex items-center justify-between pb-4 mb-6 border-b border-[#222222]">
              <span class="text-xs font-mono font-semibold uppercase tracking-wider text-white flex items-center gap-2">
                <i class="fa-solid fa-user text-emerald-400 text-xs"></i>
                Background & Approach
              </span>
              <span class="text-xs font-mono text-[#71717A]">Trawbit Technologies</span>
            </div>

            <div class="space-y-4 text-[#A1A1AA] text-sm sm:text-[15px] leading-relaxed font-sans">
              <p>
                Hi, I'm <strong class="text-white font-semibold">Athul Krishna</strong>. As a Co-Founder at <strong class="text-white font-medium">Trawbit Technologies</strong>, I lead full-stack product development—from designing relational database models and architecting secure APIs to creating intuitive web and mobile interfaces.
              </p>
              <p>
                My daily toolkit centers around <strong class="text-white font-medium">PHP & Laravel</strong> for robust server-side architecture, <strong class="text-white font-medium">React, Next.js, and Vue.js</strong> with <strong class="text-white font-medium">Tailwind CSS</strong> for responsive frontends, <strong class="text-white font-medium">Flutter</strong> for native-feel cross-platform mobile apps, and <strong class="text-white font-medium">SQL & Node.js</strong> for efficient data management.
              </p>
              <p>
                I believe great software is built on straightforward communication, clean code standards, and relentless attention to detail. I love taking complex client requirements and turning them into simple, dependable digital solutions.
              </p>
            </div>
          </div>

          <!-- Key Metrics -->
          <div class="grid grid-cols-3 gap-3 pt-6 mt-8 border-t border-[#222222]">
            <div 
              v-for="stat in stats" 
              :key="stat.label" 
              class="p-4 bg-[#0A0A0A] border border-[#222222] text-center hover:border-[#444] transition-all"
            >
              <span class="block font-mono text-xl sm:text-2xl font-bold text-white mb-1">
                {{ stat.value }}
              </span>
              <span class="block text-[11px] font-mono text-[#A1A1AA] uppercase leading-tight font-medium">
                {{ stat.label }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right: Creative Visual Feature (5 cols) -->
        <div class="lg:col-span-5 bg-[#111111] border border-[#222222] p-6 sm:p-7 flex flex-col justify-between hover:border-[#3A3A3A] transition-colors">
          <div class="flex items-center justify-between pb-3 mb-4 border-b border-[#222222]">
            <span class="text-xs font-mono font-semibold uppercase tracking-wider text-white flex items-center gap-2">
              <i class="fa-solid fa-play text-cyan-400 text-xs"></i>
              Motion & Visuals
            </span>
            <button 
              @click="toggleVideoColor"
              class="text-[11px] font-mono px-2.5 py-1 bg-[#1a1a1a] border border-[#333] hover:border-white text-[#A1A1AA] hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Color mode:</span>
              <span :class="videoColorOn ? 'text-emerald-400 font-bold' : 'text-neutral-400'">{{ videoColorOn ? 'Active' : 'Muted' }}</span>
            </button>
          </div>

          <!-- Video Display -->
          <div class="w-full h-full min-h-[250px] relative overflow-hidden bg-black flex items-center justify-center border border-[#222222] my-auto">
            <video 
              ref="secondaryVideoRef"
              src="/secondary-anim.mp4" 
              autoplay 
              loop 
              muted 
              playsinline 
              preload="metadata"
              class="w-full h-full object-cover transition-all duration-500"
              :class="videoColorOn ? 'grayscale-0' : 'grayscale opacity-85'"
            ></video>
          </div>

          <div class="pt-3 mt-4 border-t border-[#222222] flex items-center justify-between text-xs text-[#71717A]">
            <span class="font-sans">Crafting digital experiences</span>
            <span class="text-white font-mono text-xs">Kerala, India</span>
          </div>
        </div>

      </div>

      <!-- ================= EXPERTISE DOMAINS ================= -->
      <div class="mb-10 scroll-reveal" ref="expertiseTitleRef">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#2A2A2A] text-xs font-mono text-[#A1A1AA] mb-3">
          <i class="fa-solid fa-code text-xs text-emerald-400"></i>
          <span>What I Do</span>
        </div>
        <h3 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Areas of Expertise
        </h3>
      </div>
      
      <!-- Grid: 6 Clean Expertise Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        <div
          v-for="(section, i) in expertiseSections"
          :key="section.title"
          class="bg-[#111111] border border-[#222222] p-6 hover:border-[#444] hover:bg-[#141414] transition-all duration-200 scroll-reveal flex flex-col justify-between"
          :ref="el => { if(el) sectionRefs[i] = el }"
          :style="{ transitionDelay: `${i * 0.05}s` }"
        >
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-white">
                <i :class="section.icon" class="text-sm"></i>
              </div>
              <div>
                <h4 class="text-base font-bold text-white tracking-tight">
                  {{ section.title }}
                </h4>
                <p class="text-xs text-[#71717A] font-sans mt-0.5">
                  {{ section.subtitle }}
                </p>
              </div>
            </div>

            <div class="w-full h-px bg-[#222222] mb-4"></div>
          </div>

          <!-- Skills Chips -->
          <div class="flex flex-wrap gap-2 pt-1">
            <span
              v-for="skill in section.skills"
              :key="skill"
              class="px-2.5 py-1 bg-[#0A0A0A] border border-[#262626] text-xs font-mono text-[#A1A1AA] hover:text-white hover:border-[#555] transition-colors"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>

      <!-- ================= TECH STACK MARQUEE ================= -->
      <div class="border border-[#222222] p-6 sm:p-8 bg-[#111111] scroll-reveal" ref="marqueeRef">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
          <div>
            <h4 class="text-sm font-bold text-white uppercase tracking-wider font-mono">Tools & Technologies</h4>
            <p class="text-xs text-[#71717A] font-sans mt-0.5">Core technologies and libraries I work with on a regular basis</p>
          </div>
          <span class="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1">
            Always Learning & Evolving
          </span>
        </div>

        <div class="flex overflow-hidden relative w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div class="flex gap-3 animate-marquee w-max hover:[animation-play-state:paused]">
            <div
              v-for="(tech, idx) in [...technologies, ...technologies]"
              :key="idx"
              class="flex items-center gap-2.5 px-4 py-2.5 bg-[#0A0A0A] border border-[#222222] text-xs font-mono text-[#A1A1AA] hover:text-white hover:border-white transition-all duration-200 cursor-default whitespace-nowrap"
            >
              <i :class="tech.icon" class="text-sm" :style="{ color: tech.color }"></i>
              <span class="font-medium text-white/90">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useProjects } from '../composables/useProjects';
import { useSettings } from '../composables/useSettings';

const { projects } = useProjects();
const { settings, fetchSettings } = useSettings();

const headerRef = ref(null);
const bioRef = ref(null);
const expertiseTitleRef = ref(null);
const sectionRefs = ref([]);
const marqueeRef = ref(null);
const secondaryVideoRef = ref(null);

const videoColorOn = ref(false);
const toggleVideoColor = () => {
  videoColorOn.value = !videoColorOn.value;
};

const stats = computed(() => [
  { value: settings.value?.quests_cleared || '15+', label: 'Projects Shipped' },
  { value: settings.value?.time_played || '3+ Yrs', label: 'Experience' },
  { value: settings.value?.uptime_focus || '100%', label: 'Commitment' },
]);

const expertiseSections = [
  {
    title: 'Full-Stack Web',
    subtitle: 'End-to-end web applications',
    icon: 'fa-solid fa-laptop-code',
    skills: ['Laravel & PHP', 'React & Next.js', 'Vue.js', 'Node.js', 'Tailwind CSS', 'JavaScript (ES6+)']
  },
  {
    title: 'Backend & APIs',
    subtitle: 'Clean server-side architecture',
    icon: 'fa-solid fa-server',
    skills: ['RESTful APIs', 'Authentication & JWT', 'Microservices', 'Clean Architecture', 'API Security']
  },
  {
    title: 'Mobile Applications',
    subtitle: 'Cross-platform iOS & Android',
    icon: 'fa-solid fa-mobile-screen',
    skills: ['Flutter', 'Firebase', 'State Management', 'Mobile UI / UX', 'App Architecture']
  },
  {
    title: 'Database Architecture',
    subtitle: 'Relational & cloud data modeling',
    icon: 'fa-solid fa-database',
    skills: ['SQL / MySQL', 'PostgreSQL', 'Schema Design', 'Query Optimization', 'Database Indexing']
  },
  {
    title: 'UI / UX & Frontend Craft',
    subtitle: 'Responsive, accessible design',
    icon: 'fa-solid fa-wand-magic-sparkles',
    skills: ['Responsive Layouts', 'Tailwind CSS', 'Component Systems', 'User Empathy', 'Performance']
  },
  {
    title: 'DevOps & Tooling',
    subtitle: 'Deployment & version control',
    icon: 'fa-solid fa-cloud',
    skills: ['Git & GitHub', 'Docker', 'Linux & Nginx', 'Postman / API Docs', 'Cloud Hosting']
  }
];

const technologies = [
  { name: 'PHP', color: '#777BB4', icon: 'fa-brands fa-php' },
  { name: 'Laravel', color: '#FF2D20', icon: 'fa-brands fa-laravel' },
  { name: 'React', color: '#61DAFB', icon: 'fa-brands fa-react' },
  { name: 'Next.js', color: '#FFFFFF', icon: 'fa-solid fa-bolt' },
  { name: 'Vue.js', color: '#4FC08D', icon: 'fa-brands fa-vuejs' },
  { name: 'Node.js', color: '#68A063', icon: 'fa-brands fa-node-js' },
  { name: 'Tailwind CSS', color: '#38B2AC', icon: 'fa-solid fa-wind' },
  { name: 'Flutter', color: '#02569B', icon: 'fa-solid fa-mobile-screen' },
  { name: 'SQL / MySQL', color: '#4479A1', icon: 'fa-solid fa-database' },
  { name: 'PostgreSQL', color: '#336791', icon: 'fa-solid fa-database' },
  { name: 'Firebase', color: '#FFCA28', icon: 'fa-solid fa-fire' },
  { name: 'Docker', color: '#2496ED', icon: 'fa-brands fa-docker' },
  { name: 'JavaScript', color: '#F7DF1E', icon: 'fa-brands fa-js' },
  { name: 'Git', color: '#F05032', icon: 'fa-brands fa-git-alt' },
];

let observer = null;
let videoObserver = null;

onMounted(() => {
  fetchSettings();
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  [headerRef, bioRef, expertiseTitleRef, marqueeRef].forEach(ref => {
    if (ref.value) observer.observe(ref.value);
  });
  sectionRefs.value.forEach(el => observer.observe(el));

  if (secondaryVideoRef.value) {
    videoObserver = new IntersectionObserver((entries) => {
      const vid = secondaryVideoRef.value;
      if (!vid) return;
      if (entries[0].isIntersecting) {
        if (vid.paused) vid.play().catch(() => {});
      } else {
        if (!vid.paused) vid.pause();
      }
    }, { threshold: 0.05 });
    videoObserver.observe(secondaryVideoRef.value);
  }
});

onUnmounted(() => {
  observer?.disconnect();
  videoObserver?.disconnect();
});
</script>

<style scoped>
.animate-marquee {
  animation: marquee 30s linear infinite;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
</style>


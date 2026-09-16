<template>
  <section class="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden" id="about">

    <!-- Decorative background orbs -->
    <div class="absolute top-1/3 right-0 w-80 h-80 bg-[#ffffff]/5 rounded-none blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-1/4 left-0 w-64 h-64 bg-[#00FFFF]/4 rounded-none blur-[100px] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto relative z-10">

      <!-- Section header -->
      <div class="text-center mb-16 scroll-reveal" ref="headerRef">
        <div class="inline-flex items-center gap-2 border border-[#ffffff]/20 bg-green-950/20 rounded-none px-4 py-1.5 mb-5">
          <i class="fa-solid fa-user-tie text-[#ffffff] text-[10px]"></i>
          <span class="font-mono text-[10.5px] text-[#ffffff] tracking-wide font-semibold uppercase">Profile & Philosophy</span>
        </div>
        <h1 class="font-mono text-xl md:text-2xl lg:text-3xl font-black text-white mb-4 tracking-tight leading-loose">
          Engineering Leadership &<br><span class="bg-gradient-to-r from-[#ffffff] to-neutral-500 bg-clip-text text-transparent">Core Expertise</span>
        </h1>
        <p class="font-mono text-[11px] text-emerald-400/90 max-w-md mx-auto leading-relaxed font-semibold">
          // Co-Founder & Principal Full-Stack Architect delivering scalable digital products
        </p>
      </div>

      <!-- Bio Card & Animation -->
      <div class="max-w-6xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 scroll-reveal items-stretch" ref="bioRef">
        
        <!-- Bio text -->
        <div class="bg-[#0A0A0A] border border-[#2A2A2A] rounded-none p-6 sm:p-8 flex flex-col justify-between gap-6 text-left hover:border-white transition-colors duration-400 h-full">
          <h3 class="font-mono text-xs font-semibold text-white tracking-wider flex items-center gap-2">
            <span class="text-white font-bold">//</span> Executive Summary
          </h3>
          <p class="font-sans text-[12px] leading-loose text-[#A1A1AA] flex-1">
            Co-Founder and AI-Assisted Full-Stack Architect leveraging modern AI workflows alongside deep production mastery in <span class="text-white font-semibold">PHP & Laravel</span>, <span class="text-white font-semibold">React & Tailwind CSS</span>, <span class="text-white font-semibold">Flutter</span> for cross-platform mobile, and <span class="text-white font-semibold">SQL / Relational Databases</span> (with Firebase for cloud real-time data). Delivering high-impact digital platforms with rapid delivery velocity, architectural precision, and rock-solid scalability.
          </p>
          <div class="grid grid-cols-3 gap-3 mt-auto">
            <div v-for="stat in stats" :key="stat.label" class="py-4 px-2 border border-[#2A2A2A] rounded-none text-center hover:border-white hover:bg-[#2A2A2A] transition-all group relative overflow-hidden flex flex-col items-center justify-center">
              <div class="absolute inset-0 bg-[#A1A1AA]/10 -translate-x-full group-hover:animate-[shimmer_0.5s_fast-forwards]"></div>
              <span class="block font-mono text-sm sm:text-base font-extrabold text-white mb-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-75">{{ stat.value }}</span>
              <span class="block font-mono text-[7px] text-[#A1A1AA] tracking-widest uppercase font-semibold leading-tight">{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <!-- Animated Image / Video -->
        <div class="bg-[#0A0A0A] border border-[#2A2A2A] rounded-none p-6 flex flex-col items-center justify-center hover:border-white transition-colors duration-400 group relative h-full">
          
          <!-- Hanging Pull Cord Switch -->
          <div class="absolute top-0 right-6 flex flex-col items-center z-20 cursor-pointer" @click="toggleVideoColor" title="Toggle Visual Accent">
            <!-- The Cord -->
            <div 
              class="w-[2px] bg-[#A1A1AA] transition-all duration-300 origin-top hover:bg-white"
              :class="videoColorOn ? 'h-16' : 'h-8'"
            ></div>
            <!-- The Handle -->
            <div 
              class="w-4 h-6 border-2 border-[#A1A1AA] bg-[#121212] transition-all duration-300 hover:border-white flex flex-col items-center justify-end pb-0.5"
              :class="videoColorOn ? 'translate-y-2 border-white' : ''"
            >
              <div class="w-2 h-[2px] bg-[#A1A1AA] mb-[2px]" :class="videoColorOn ? 'bg-white' : ''"></div>
              <div class="w-2 h-[2px] bg-[#A1A1AA]" :class="videoColorOn ? 'bg-white' : ''"></div>
            </div>
            <!-- Status Text -->
            <span class="font-mono text-[8px] mt-2 font-bold tracking-widest transition-colors duration-300" :class="videoColorOn ? 'text-white' : 'text-[#A1A1AA]'">FX</span>
          </div>

          <!-- Corner decorations -->
          <div class="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#A1A1AA] group-hover:border-white transition-colors pointer-events-none"></div>
          <div class="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#A1A1AA] group-hover:border-white transition-colors pointer-events-none"></div>
          
          <div class="w-full h-full relative overflow-hidden bg-black flex items-center justify-center border border-[#2A2A2A]">
            <video 
              src="/secondary-anim.mp4" 
              autoplay 
              loop 
              muted 
              playsinline 
              class="w-full h-full object-cover filter transition-all duration-700 opacity-90 group-hover:opacity-100"
              :class="videoColorOn ? 'grayscale-0' : 'grayscale'"
            ></video>
          </div>
        </div>
      </div>

      <!-- Section Header: Core Expertise -->
      <div class="text-center mb-16 scroll-reveal" ref="expertiseTitleRef">
        <div class="inline-flex items-center gap-2 border border-[#ffffff]/20 bg-green-950/20 rounded-none px-4 py-1.5 mb-5">
          <i class="fa-solid fa-microchip text-[#ffffff] text-[10px]"></i>
          <span class="font-mono text-[10.5px] text-[#ffffff] tracking-wide font-semibold uppercase">Architectural Stack</span>
        </div>
        <h2 class="font-mono text-xl md:text-2xl lg:text-3xl font-black text-white mb-4 tracking-tight leading-loose">
          Technical <span class="bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">Capabilities</span>
        </h2>
        <p class="font-mono text-[11px] text-emerald-400/90 max-w-md mx-auto leading-relaxed font-semibold">
          // Core production technologies & AI-assisted development strengths
        </p>
      </div>
      
      <!-- Grid: 6 Balanced Skill Domains -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <div
          v-for="(section, i) in expertiseSections"
          :key="section.title"
          class="bg-[#0A0A0A] border border-[#2A2A2A] rounded-none p-6 hover:border-white hover:bg-[#121212] transition-all duration-300 scroll-reveal group relative flex flex-col justify-between overflow-hidden"
          :ref="el => { if(el) sectionRefs[i] = el }"
          :style="{ transitionDelay: `${i * 0.08}s` }"
        >
          <!-- Corner decorations -->
          <div class="absolute top-0 left-0 w-2.5 h-2.5 border-l-2 border-t-2 border-[#A1A1AA]/60 group-hover:border-white transition-colors pointer-events-none"></div>
          <div class="absolute bottom-0 right-0 w-2.5 h-2.5 border-r-2 border-b-2 border-[#A1A1AA]/60 group-hover:border-white transition-colors pointer-events-none"></div>

          <!-- Header -->
          <div>
            <div class="flex items-start justify-between gap-3 mb-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-none bg-[#121212] border border-[#2A2A2A] group-hover:border-white flex items-center justify-center transition-colors">
                  <i :class="section.icon" class="text-xs text-white"></i>
                </div>
                <div>
                  <h5 class="font-mono text-xs sm:text-[13px] font-bold text-white tracking-wide group-hover:text-white transition-colors">
                    {{ section.title }}
                  </h5>
                  <span class="font-mono text-[8.5px] text-[#A1A1AA] uppercase tracking-wider block mt-0.5 font-medium">
                    {{ section.subtitle }}
                  </span>
                </div>
              </div>
              <span class="font-mono text-[9px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-none font-semibold uppercase tracking-wider">
                {{ section.code }}
              </span>
            </div>

            <!-- Divider -->
            <div class="w-full h-px bg-[#2A2A2A] group-hover:bg-white/20 transition-colors mb-4"></div>
          </div>

          <!-- Skills Chips -->
          <div class="flex flex-wrap gap-2 pt-1">
            <span
              v-for="skill in section.skills"
              :key="skill"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none border border-[#2A2A2A] bg-[#121212] font-mono text-[11px] text-[#A1A1AA] cursor-default transition-all duration-200 hover:text-white hover:border-white hover:bg-[#1a1a1a]"
            >
              <span class="text-white/40 font-bold text-[9px]">//</span>
              {{ skill }}
            </span>
          </div>
        </div>
      </div>

      <!-- Scrolling tech marquee -->
      <div class="border border-[#2A2A2A] rounded-none p-6 bg-[#0A0A0A] mt-8 scroll-reveal" ref="marqueeRef">
        <p class="font-mono text-[10px] text-[#A1A1AA] tracking-[0.2em] uppercase mb-4 font-semibold">// Core Technology Inventory</p>
        <div class="flex overflow-hidden relative w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div class="flex gap-4 animate-marquee w-max hover:[animation-play-state:paused]">
            <div
              v-for="(tech, idx) in [...technologies, ...technologies]"
              :key="idx"
              class="flex items-center gap-2 px-3.5 py-2 bg-[#121212] border border-[#2A2A2A] rounded-none text-[11px] font-mono text-[#A1A1AA] hover:text-white hover:border-white transition-all duration-200 cursor-default whitespace-nowrap"
            >
              <i :class="tech.icon" class="text-sm" :style="{ color: tech.color }"></i>
              {{ tech.name }}
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

const videoColorOn = ref(false);
const toggleVideoColor = () => {
  videoColorOn.value = !videoColorOn.value;
};

const stats = computed(() => [
  { value: settings.value?.quests_cleared || '15+', label: 'Products Shipped' },
  { value: settings.value?.time_played || '3+ Yrs', label: 'Years Experience' },
  { value: settings.value?.uptime_focus || '99.9%', label: 'Uptime Focus' },
]);

const expertiseSections = [
  {
    title: 'Frontend Systems',
    code: '// UI-01',
    subtitle: 'Modern Web & High-Conversion UIs',
    icon: 'fa-solid fa-wand-magic-sparkles',
    badgeClass: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30',
    skills: ['React', 'Tailwind CSS', 'JavaScript ES6+', 'HTML5 / CSS3', 'Responsive Design']
  },
  {
    title: 'Backend & APIs',
    code: '// API-02',
    subtitle: 'High-Throughput Engines & Logic',
    icon: 'fa-solid fa-server',
    badgeClass: 'text-red-400 bg-red-950/40 border-red-500/30',
    skills: ['PHP', 'Laravel', 'RESTful APIs', 'Authentication / JWT', 'Microservices']
  },
  {
    title: 'Mobile Engineering',
    code: '// MOB-03',
    subtitle: 'Cross-Platform Mobile Apps',
    icon: 'fa-solid fa-mobile-screen-button',
    badgeClass: 'text-sky-400 bg-sky-950/40 border-sky-500/30',
    skills: ['Flutter', 'Firebase', 'State Management', 'Mobile UI / UX', 'Cross-Platform']
  },
  {
    title: 'Database Architecture',
    code: '// DB-04',
    subtitle: 'Relational & Structured Storage',
    icon: 'fa-solid fa-database',
    badgeClass: 'text-blue-400 bg-blue-950/40 border-blue-500/30',
    skills: ['SQL / MySQL', 'PostgreSQL', 'Query Optimization', 'Database Schema Design', 'Indexing']
  },
  {
    title: 'AI-Assisted Workflows',
    code: '// AI-05',
    subtitle: 'Accelerated 5x-10x Development',
    icon: 'fa-solid fa-robot',
    badgeClass: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
    skills: ['AI-Augmented Coding', 'Rapid Prototyping', 'Prompt Engineering', 'Automated Workflows', 'High-Velocity Delivery']
  },
  {
    title: 'Cloud & Infrastructure',
    code: '// CLD-06',
    subtitle: 'Deployment & DevOps Tooling',
    icon: 'fa-solid fa-cloud',
    badgeClass: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
    skills: ['Firebase (Optional)', 'Docker', 'Git / GitHub', 'Postman / API Docs', 'Linux / Nginx']
  }
];

const technologies = [
  { name: 'PHP', color: '#777BB4', icon: 'fa-brands fa-php' },
  { name: 'Laravel', color: '#FF2D20', icon: 'fa-brands fa-laravel' },
  { name: 'React', color: '#61DAFB', icon: 'fa-brands fa-react' },
  { name: 'Tailwind CSS', color: '#38B2AC', icon: 'fa-solid fa-wind' },
  { name: 'Flutter', color: '#02569B', icon: 'fa-solid fa-mobile-screen' },
  { name: 'SQL / MySQL', color: '#4479A1', icon: 'fa-solid fa-database' },
  { name: 'PostgreSQL', color: '#336791', icon: 'fa-solid fa-database' },
  { name: 'Firebase', color: '#FFCA28', icon: 'fa-solid fa-fire' },
  { name: 'Docker', color: '#2496ED', icon: 'fa-brands fa-docker' },
  { name: 'JavaScript', color: '#F7DF1E', icon: 'fa-brands fa-js' },
  { name: 'HTML5', color: '#E34F26', icon: 'fa-brands fa-html5' },
  { name: 'Git', color: '#F05032', icon: 'fa-brands fa-git-alt' },
];

let observer = null;

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
});

onUnmounted(() => observer?.disconnect());
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

<template>
  <section class="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden" id="about">

    <!-- Decorative background orbs -->
    <div class="absolute top-1/3 right-0 w-80 h-80 bg-[#ffffff]/5 rounded-none blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-1/4 left-0 w-64 h-64 bg-[#00FFFF]/4 rounded-none blur-[100px] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto relative z-10">

      <!-- Section header -->
      <div class="text-center mb-16 scroll-reveal" ref="headerRef">
        <div class="inline-flex items-center gap-2 border border-[#ffffff]/20 bg-green-950/20 rounded-none px-4 py-1.5 mb-5">
          <i class="fa-solid fa-gamepad text-[#ffffff] text-[10px]"></i>
          <span class="font-mono text-[10.5px] text-[#ffffff] tracking-wide font-semibold uppercase">Character Screen</span>
        </div>
        <h1 class="font-mono text-xl md:text-2xl lg:text-3xl font-black text-white mb-4 tracking-tight leading-loose">
          Player One +<br><span class="bg-gradient-to-r from-[#ffffff] to-neutral-500 bg-clip-text text-transparent">Skill Tree</span>
        </h1>
        <p class="font-mono text-[11px] text-emerald-400/90 max-w-md mx-auto leading-relaxed font-semibold">
          // Guild Leader at Trawbit Technologies focused on scalable architectures
        </p>
      </div>

      <!-- Bio Card & Animation -->
      <div class="max-w-6xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 scroll-reveal items-stretch" ref="bioRef">
        
        <!-- Bio text -->
        <div class="bg-[#0A0A0A] border border-[#2A2A2A] rounded-none p-6 sm:p-8 flex flex-col justify-between gap-6 text-left hover:border-white transition-colors duration-400 h-full">
          <h3 class="font-mono text-xs font-semibold text-white tracking-wider flex items-center gap-2">
            <span class="text-white font-bold">//</span> Character Lore
          </h3>
          <p class="font-sans text-[11px] leading-loose text-[#A1A1AA] flex-1">
            Co-Founder & AI-Augmented Full-Stack Engineer building scalable SaaS platforms, intelligent automation systems, and AI-powered web and mobile applications. Passionate about creating high-performance digital products that blend exceptional user experiences with robust engineering.
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
          <div class="absolute top-0 right-6 flex flex-col items-center z-20 cursor-pointer" @click="toggleVideoColor" title="Toggle Color">
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
            <span class="font-mono text-[8px] mt-2 font-bold tracking-widest transition-colors duration-300" :class="videoColorOn ? 'text-white' : 'text-[#A1A1AA]'">RGB</span>
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

      <!-- Bento Grid: Expertise -->
      <h2 class="font-mono text-xs tracking-[0.2em] font-extrabold text-[#ffffff] uppercase mb-8 flex items-center justify-center scroll-reveal" ref="expertiseTitleRef">
        <span class="inline-block w-4 h-px bg-[#ffffff] mr-3"></span>
        Unlocked Abilities
        <span class="inline-block w-4 h-px bg-[#ffffff] ml-3"></span>
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
        <div
          v-for="(section, i) in expertiseSections"
          :key="section.title"
          class="bg-[#0A0A0A] border border-[#2A2A2A] rounded-none p-6 hover:border-[#ffffff]/20 hover:bg-[#121212] transition-all duration-400 scroll-reveal group"
          :ref="el => { if(el) sectionRefs[i] = el }"
          :style="{ transitionDelay: `${i * 0.1}s` }"
        >
          <div class="flex items-center justify-between mb-6">
            <h5 class="font-mono text-sm text-white font-bold">
              {{ section.title }}
            </h5>
            <i :class="section.icon" class="text-[#ffffff]/50 group-hover:text-[#ffffff] transition-colors text-lg"></i>
          </div>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="skill in section.skills"
              :key="skill"
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-none border border-[#2A2A2A] bg-[#2A2A2A] font-mono text-[11px] text-[#A1A1AA] cursor-default transition-all duration-250 hover:text-white hover:border-[#ffffff]/40 hover:bg-[#ffffff]/10 hover:shadow-[0_0_12px_rgba(255, 255, 255,0.15)]"
            >
              {{ skill }}
            </div>
          </div>
        </div>
      </div>

      <!-- Scrolling tech marquee -->
      <div class="border border-[#2A2A2A] rounded-none p-6 bg-[#0A0A0A] mt-8 scroll-reveal" ref="marqueeRef">
        <p class="font-mono text-[10px] text-[#A1A1AA] tracking-[0.2em] uppercase mb-4 font-semibold">// Complete Skill Inventory</p>
        <div class="flex overflow-hidden relative w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div class="flex gap-4 animate-marquee w-max hover:[animation-play-state:paused]">
            <div
              v-for="(tech, idx) in [...technologies, ...technologies]"
              :key="idx"
              class="flex items-center gap-2 px-3.5 py-2 bg-[#2A2A2A] border border-[#2A2A2A] rounded-none text-[11px] font-mono text-[#A1A1AA] hover:text-white hover:border-[#2A2A2A] transition-all duration-200 cursor-default whitespace-nowrap"
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
import { ref, onMounted, onUnmounted } from 'vue';

const headerRef = ref(null);
const bioRef = ref(null);
const expertiseTitleRef = ref(null);
const sectionRefs = ref([]);
const marqueeRef = ref(null);

const videoColorOn = ref(false);
const toggleVideoColor = () => {
  videoColorOn.value = !videoColorOn.value;
};

const stats = [
  { value: '10+', label: 'Quests Cleared' },
  { value: '3+', label: 'Time Played' },
  { value: '24/7', label: 'XP Multiplier' },
];

const expertiseSections = [
  {
    title: 'Frontend Magic',
    icon: 'fa-solid fa-wand-magic-sparkles',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Vue.js', 'React', 'Tailwind CSS', 'Bootstrap']
  },
  {
    title: 'Backend Sorcery',
    icon: 'fa-solid fa-server',
    skills: ['Node.js', 'Express.js', 'Python', 'Django', 'PHP', 'Laravel']
  },
  {
    title: 'Data Vaults',
    icon: 'fa-solid fa-database',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL']
  },
  {
    title: 'Server Realms',
    icon: 'fa-solid fa-cloud',
    skills: ['AWS', 'Geoapify', 'REST APIs', 'System Architecture', 'AI Integrations']
  },
  {
    title: 'App Development',
    icon: 'fa-solid fa-mobile-screen-button',
    skills: ['React Native']
  }
];

const technologies = [
  { name: 'HTML5', color: '#E34F26', icon: 'fa-brands fa-html5' },
  { name: 'CSS3', color: '#1572B6', icon: 'fa-brands fa-css3-alt' },
  { name: 'JavaScript', color: '#F7DF1E', icon: 'fa-brands fa-js' },
  { name: 'Vue.js', color: '#4FC08D', icon: 'fa-brands fa-vuejs' },
  { name: 'React', color: '#61DAFB', icon: 'fa-brands fa-react' },
  { name: 'Tailwind', color: '#38B2AC', icon: 'fa-solid fa-wind' },
  { name: 'Node.js', color: '#339933', icon: 'fa-brands fa-node' },
  { name: 'Express', color: '#ffffff', icon: 'fa-solid fa-server' },
  { name: 'MongoDB', color: '#47A248', icon: 'fa-brands fa-envira' },
  { name: 'Python', color: '#3776AB', icon: 'fa-brands fa-python' },
  { name: 'Django', color: '#2BA977', icon: 'fa-solid fa-laptop-code' },
  { name: 'AWS', color: '#FF9900', icon: 'fa-brands fa-aws' },
  { name: 'React Native', color: '#61DAFB', icon: 'fa-brands fa-react' },
];

let observer = null;

onMounted(() => {
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

<template>
  <section class="py-28 px-6 relative overflow-hidden" id="about">

    <!-- Decorative background orbs -->
    <div class="absolute top-1/3 right-0 w-80 h-80 bg-violet-600/5 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-1/4 left-0 w-64 h-64 bg-cyan-600/4 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto relative z-10">

      <!-- Section header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 border border-violet-500/20 bg-violet-950/20 rounded-full px-4 py-1.5 mb-5">
          <i class="fa-solid fa-user text-violet-400 text-[10px]"></i>
          <span class="font-mono text-[10.5px] text-violet-300 tracking-wide font-semibold uppercase">Background</span>
        </div>
        <h1 class="font-mono text-4xl md:text-5xl font-black text-white mb-3 tracking-tight leading-none">
          Education & <span class="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Skills</span>
        </h1>
        <p class="font-mono text-[11px] text-emerald-400/90 max-w-md mx-auto leading-relaxed font-semibold">
          // Continuous learner · Builder at heart · 3 years of shipping
        </p>
      </div>

      <!-- Stats row -->
      <div class="grid grid-cols-2 gap-4 max-w-xl mx-auto mb-16">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="flex flex-col items-center justify-center p-5 bg-neutral-950/60 border border-white/6 rounded-2xl hover:border-indigo-500/25 transition-all duration-300 group"
        >
          <span class="font-mono text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-1.5">{{ stat.value }}</span>
          <span class="font-mono text-[10px] text-neutral-400 text-center tracking-wider font-bold uppercase">{{ stat.label }}</span>
        </div>
      </div>

      <!-- Education + skills two-column layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">

        <!-- Education column -->
        <div>
          <h2 class="font-mono text-xs tracking-[0.2em] font-extrabold text-indigo-400 uppercase mb-6 flex items-center">
            <span class="inline-block w-4 h-px bg-indigo-500 mr-3"></span>
            Education Timeline
          </h2>
          <div class="relative flex flex-col gap-0">
            <!-- Timeline line -->
            <div class="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-indigo-500/40 via-violet-500/20 to-transparent"></div>

            <div
              v-for="(edu, i) in education"
              :key="i"
              class="relative flex gap-4 pb-8 group/edu"
            >
              <!-- Dot -->
              <div class="relative z-10 flex-shrink-0">
                <div class="w-[38px] h-[38px] rounded-full bg-neutral-950 border-2 border-white/10 group-hover/edu:border-indigo-500/50 transition-colors duration-300 flex items-center justify-center">
                  <i class="fa-solid text-neutral-500 group-hover/edu:text-indigo-400 transition-colors text-sm" :class="edu.icon"></i>
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1 bg-neutral-950/50 border border-white/5 rounded-xl p-4 group-hover/edu:border-indigo-500/20 group-hover/edu:bg-neutral-950/70 transition-all duration-300">
                <h4 class="font-mono text-[15px] font-black text-white mb-1.5">{{ edu.title }}</h4>
                <p class="font-mono text-[11px] text-indigo-400 mb-3 tracking-wide font-semibold">{{ edu.school }}</p>
                <div class="flex flex-wrap gap-2">
                  <span class="px-2 py-0.5 rounded bg-white/4 border border-white/8 font-mono text-[9.5px] text-neutral-355">{{ edu.department }}</span>
                  <span class="px-2 py-0.5 rounded bg-indigo-950/40 border border-indigo-500/20 font-mono text-[9.5px] text-indigo-300">{{ edu.subject }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills column -->
        <div>
          <h2 class="font-mono text-xs tracking-[0.2em] font-extrabold text-violet-400 uppercase mb-6 flex items-center">
            <span class="inline-block w-4 h-px bg-violet-500 mr-3"></span>
            Tech Stack
          </h2>
          <div class="flex flex-col gap-5">
            <div
              v-for="cat in categories"
              :key="cat"
              class="bg-neutral-950/50 border border-white/6 rounded-xl p-5 hover:border-violet-500/20 transition-all duration-300"
            >
              <h5 class="font-mono text-[11px] mb-10 text-violet-400 uppercase tracking-[0.2em] font-bold">
                <i class="fa-solid mr-3 mb-10" :class="cat === 'Frontend' ? 'fa-palette' : 'fa-server'"></i>
                {{ cat }}
              </h5>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="tech in technologies.filter(t => t.category === cat)"
                  :key="tech.name"
                  class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs text-neutral-400 cursor-default transition-all duration-250 hover:text-white"
                  :style="{
                    'border-color': hoveredBadge === tech.name ? tech.color + '50' : 'rgba(255,255,255,0.06)',
                    'background': hoveredBadge === tech.name ? tech.color + '10' : 'rgba(255,255,255,0.02)',
                    'box-shadow': hoveredBadge === tech.name ? `0 0 16px ${tech.color}20` : 'none',
                  }"
                  @mouseenter="hoveredBadge = tech.name"
                  @mouseleave="hoveredBadge = null"
                >
                  <i :class="tech.icon" class="text-sm transition-colors duration-200" :style="{ color: hoveredBadge === tech.name ? tech.color : '#666' }"></i>
                  {{ tech.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scrolling tech marquee -->
      <div class="border border-white/5 rounded-2xl p-6 bg-neutral-950/40 mt-8">
        <p class="font-mono text-[10px] text-neutral-500 tracking-[0.2em] uppercase mb-4 font-semibold">// All Technologies</p>
        <div class="flex overflow-hidden relative w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div class="flex gap-4 animate-marquee w-max">
            <div
              v-for="(tech, idx) in [...technologies, ...technologies]"
              :key="idx"
              class="flex items-center gap-2 px-3.5 py-2 bg-white/3 border border-white/5 rounded-lg text-[11px] font-mono text-neutral-400 hover:text-white hover:border-neutral-600 transition-all duration-200 cursor-default whitespace-nowrap"
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
import { ref } from 'vue';

const hoveredBadge = ref(null);

const stats = [
  { value: '10+', label: 'Projects Shipped' },
  { value: '12+', label: 'Technologies' },
];

const education = [
  { title: 'Higher Secondary (VHSE)', school: 'KMVHSE Kodakkad, Kasargod', department: 'Science', subject: 'Junior Software Dev', icon: 'fa-graduation-cap' },
  { title: 'Under Graduation (BSc CS)', school: 'IHRD Cas Cheemeni, Kasargod', department: 'Computer Science', subject: 'BSc CS Program', icon: 'fa-university' },
  { title: 'Skill Course', school: 'Techmindz, Kochi, Kerala', department: 'Fullstack Development', subject: 'MERN Stack', icon: 'fa-laptop-code' },
];

const technologies = [
  { name: 'HTML5', color: '#E34F26', icon: 'fa-brands fa-html5', category: 'Frontend' },
  { name: 'CSS3', color: '#1572B6', icon: 'fa-brands fa-css3-alt', category: 'Frontend' },
  { name: 'JavaScript', color: '#F7DF1E', icon: 'fa-brands fa-js', category: 'Frontend' },
  { name: 'Vue.js', color: '#4FC08D', icon: 'fa-brands fa-vuejs', category: 'Frontend' },
  { name: 'React', color: '#61DAFB', icon: 'fa-brands fa-react', category: 'Frontend' },
  { name: 'Bootstrap', color: '#7952B3', icon: 'fa-brands fa-bootstrap', category: 'Frontend' },
  { name: 'Tailwind', color: '#38B2AC', icon: 'fa-solid fa-wind', category: 'Frontend' },
  { name: 'Node.js', color: '#339933', icon: 'fa-brands fa-node', category: 'Backend' },
  { name: 'Express', color: '#ffffff', icon: 'fa-solid fa-server', category: 'Backend' },
  { name: 'MongoDB', color: '#47A248', icon: 'fa-brands fa-envira', category: 'Backend' },
  { name: 'Python', color: '#3776AB', icon: 'fa-brands fa-python', category: 'Backend' },
  { name: 'Django', color: '#2BA977', icon: 'fa-solid fa-laptop-code', category: 'Backend' },
  { name: 'PHP', color: '#777BB4', icon: 'fa-brands fa-php', category: 'Backend' },
  { name: 'Laravel', color: '#FF2D20', icon: 'fa-brands fa-laravel', category: 'Backend' },
  { name: 'PostgreSQL', color: '#336791', icon: 'fa-solid fa-database', category: 'Backend' },
];

const categories = ['Frontend', 'Backend'];
</script>

<style scoped>
.animate-marquee {
  animation: marquee 30s linear infinite;
}
.animate-marquee:hover {
  animation-play-state: paused;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
</style>

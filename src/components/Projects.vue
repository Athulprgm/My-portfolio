<template>
  <section class="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden" id="project">

    <!-- Section background glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ffffff]/5 blur-[100px] pointer-events-none rounded-none"></div>

    <div class="max-w-6xl mx-auto relative z-10">

      <!-- Section header -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center gap-2 border border-[#ffffff]/20 bg-green-950/20 rounded-none px-4 py-1.5 mb-5">
          <i class="fa-solid fa-code text-[#ffffff] text-[10px]"></i>
          <span class="font-mono text-[10.5px] text-[#ffffff] tracking-wide font-semibold uppercase">Game Saves</span>
        </div>
        <h1 class="font-mono text-xl md:text-2xl lg:text-3xl font-black text-white mb-4 tracking-tight leading-loose">
          Completed <span class="bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">Quests</span>
        </h1>
        <p class="font-mono text-[11px] text-emerald-400/90 max-w-md mx-auto leading-relaxed font-semibold">
          // High-score campaigns logged in the global leaderboard
        </p>
      </div>

      <!-- Maintenance Mode -->
      <div class="relative w-full max-w-3xl mx-auto py-24 bg-[#050505] border border-[#2A2A2A] overflow-hidden group my-12">
        <!-- Scanline animation -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden z-20">
           <div class="w-full h-1 bg-amber-500/20 blur-[2px] maintenance-scanline"></div>
        </div>
        
        <!-- Background Grid -->
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>

        <!-- Corner accents -->
        <div class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-500/40 z-10"></div>
        <div class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-500/40 z-10"></div>
        <div class="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-500/40 z-10"></div>
        <div class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-500/40 z-10"></div>

        <div class="relative z-30 flex flex-col items-center justify-center px-4">
          <!-- Animated Icon -->
          <div class="relative mb-10 w-20 h-20 flex items-center justify-center">
            <i class="fa-solid fa-server text-5xl text-amber-500/80"></i>
            <i class="fa-solid fa-gear text-2xl text-amber-400 absolute -bottom-2 -right-2 animate-[spin_4s_linear_infinite]"></i>
            <i class="fa-solid fa-gear text-sm text-amber-300 absolute bottom-4 -left-2 animate-[spin_3s_linear_infinite_reverse]"></i>
          </div>

          <!-- Glitch Text -->
          <h2 class="font-mono text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-6 tracking-[0.2em] uppercase glitch-text text-center">
            System Upgrading
          </h2>

          <div class="font-mono text-[11px] sm:text-xs text-[#A1A1AA] max-w-lg mx-auto space-y-3 mb-10 text-left w-full sm:w-auto">
            <p class="opacity-80">> INITIALIZING MAINTENANCE PROTOCOLS...</p>
            <p>> <span class="text-amber-400 font-bold">WARNING:</span> PROJECTS DATABANK OFFLINE</p>
            <p class="flex items-center">> RECOMPILING SAVE FILES <span class="w-2 h-4 bg-emerald-400 inline-block ml-2 animate-pulse"></span></p>
          </div>

          <!-- Progress Bar -->
          <div class="w-full max-w-xs sm:max-w-sm h-1.5 bg-[#121212] overflow-hidden rounded-none border border-[#2A2A2A]">
            <div class="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 progress-bar-anim w-1/2"></div>
          </div>
        </div>
      </div>

      <div v-show="false">
      <!-- Error state -->
      <div v-if="error" class="text-center py-16">
        <i class="fa-solid fa-triangle-exclamation text-amber-400 text-3xl mb-4 block"></i>
        <p class="font-mono text-sm text-[#A1A1AA] mb-4">SYSTEM_ERROR: Failed to fetch save files — <span class="text-amber-400">{{ error }}</span></p>
        <button
          @click="fetchProjects"
          class="font-mono text-xs px-4 py-2 border border-[#ffffff]/40 text-[#ffffff] rounded hover:bg-[#ffffff]/10 transition-colors"
        >
          $ retry
        </button>
      </div>

      <!-- Skeleton loading grid -->
      <div v-else-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="i in 6"
          :key="`skeleton-${i}`"
          class="bg-[#0A0A0A] border border-[#2A2A2A] rounded-none overflow-hidden animate-pulse"
        >
          <div class="w-full h-48 bg-[#121212]"></div>
          <div class="p-5 flex flex-col gap-3">
            <div class="flex gap-1.5">
              <div class="h-4 w-14 bg-[#121212] rounded"></div>
              <div class="h-4 w-10 bg-[#121212] rounded"></div>
            </div>
            <div class="h-4 w-4/5 bg-[#121212] rounded"></div>
            <div class="h-3 w-full bg-[#121212] rounded"></div>
            <div class="h-3 w-3/4 bg-[#121212] rounded"></div>
            <div class="pt-2.5 border-t border-[#2A2A2A] flex items-center justify-between">
              <div class="h-3 w-32 bg-[#121212] rounded"></div>
              <div class="w-7 h-7 rounded-none bg-[#121212]"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Projects grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card group relative bg-[#0A0A0A] backdrop-blur border-2 border-[#2A2A2A] rounded-none overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-[#2A2A2A] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          @click="handleProjectClick(project)"
        >
          <!-- Card image -->
          <div class="relative w-full h-48 overflow-hidden border-b-2 border-[#2A2A2A] group-hover:border-[#2A2A2A] transition-colors">
            <img
              :src="getImageUrl(project.thumbnail, project.image)"
              :alt="project.title"
              loading="lazy"
              @error="handleImageError"
              class="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
            />
            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-neutral-950/50 to-transparent pointer-events-none"></div>

            <!-- AI badge -->
            <div
              v-if="project.id === 4"
              class="absolute top-3 right-3 flex items-center gap-1.5 bg-cyan-950/90 backdrop-blur border border-cyan-500/40 text-[#A1A1AA] font-mono text-[9px] px-2.5 py-1 rounded-none"
            >
              <span class="w-1.5 h-1.5 bg-cyan-400 rounded-none animate-ping"></span>
              AI Engine Active
            </div>

            <!-- Level badge Removed -->

            <!-- Project number badge -->
            <div class="absolute top-3 left-3 w-7 h-7 rounded-none bg-[#0A0A0A] border border-[#2A2A2A] flex items-center justify-center font-mono text-[10px] text-[#A1A1AA]">
              {{ String(project.id).padStart(2, '0') }}
            </div>
          </div>

          <!-- Card body -->
          <div class="flex flex-col flex-1 p-5 gap-3">
            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-2.5 py-0.5 rounded font-mono text-[9.5px] font-semibold tracking-wider uppercase border"
                :class="tagStyle(tag)"
              >{{ tag }}</span>
            </div>

            <!-- Title + description -->
            <h3 class="font-mono text-[15px] font-black text-white leading-tight group-hover:text-[#ffffff] transition-colors duration-200">
              {{ project.title }}
            </h3>
            <p class="font-sans text-[13px] text-[#A1A1AA] leading-relaxed line-clamp-2 flex-1">
              {{ project.description }}
            </p>

            <!-- CTA -->
            <div class="pt-2.5 border-t border-[#2A2A2A] flex items-center justify-between">
              <span class="font-mono text-[10.5px] text-[#A1A1AA] uppercase font-bold tracking-widest">
                {{ project.hasDetails ? 'PRESS START TO PLAY' : 'LOCKED' }}
              </span>
              <div
                v-if="project.hasDetails"
                class="w-7 h-7 rounded-none bg-[#ffffff]/10 border border-[#ffffff]/40 flex items-center justify-center group-hover:bg-[#ffffff]/20 group-hover:border-[#ffffff] transition-all duration-300"
              >
                <i class="fa-solid fa-arrow-right text-[#ffffff] group-hover:text-white text-[10px] transition-all duration-300 group-hover:translate-x-0.5"></i>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- View All Button -->
      <div v-if="!error && !loading && hasMoreProjects" class="flex justify-center mt-12">
        <button
          @click="showAll = !showAll"
          class="flex items-center gap-2 px-6 py-2.5 bg-[#121212] hover:bg-[#121212] border border-[#2A2A2A] rounded-none font-mono text-[11px] text-white tracking-widest transition-all duration-300 uppercase"
        >
          {{ showAll ? 'Minimize Quests' : 'Load More Quests' }}
          <i class="fa-solid" :class="showAll ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
        </button>
      </div>
      </div>

      <!-- Bottom note -->
      <div class="text-center mt-14">
        <span class="font-mono text-[11px] text-[#A1A1AA]">
          // More save states available in the global databank on <a href="https://github.com/Athulprgm" target="_blank" rel="noopener" class="text-[#ffffff] hover:text-[#00FFFF] font-bold transition-colors">github.com/Athulprgm</a>
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProjects, getImageUrl } from '../composables/useProjects';

const { projects, loading, error, fetchProjects } = useProjects();

const showAll = ref(false);

const filteredProjects = computed(() => {
  let list = projects.value;
  if (!showAll.value) {
    return list.slice(0, 3);
  }
  return list;
});

const hasMoreProjects = computed(() => {
  let list = projects.value;
  return list.length > 3;
});

const tagColorMap = {
  'React': 'border-cyan-500/30 bg-cyan-950/30 text-[#A1A1AA]',
  'Vue': 'border-emerald-500/30 bg-emerald-950/30 text-emerald-400',
  'Node': 'border-green-500/30 bg-green-950/30 text-green-400',
  'MongoDB': 'border-green-500/30 bg-green-950/30 text-green-400',
  'Express': 'border-[#2A2A2A]/30 bg-[#121212] text-[#A1A1AA]',
  'Python': 'border-blue-500/30 bg-blue-950/30 text-blue-400',
  'Django': 'border-teal-500/30 bg-teal-950/30 text-teal-400',
  'AI': 'border-violet-500/30 bg-violet-950/30 text-violet-400',
  'AWS': 'border-orange-500/30 bg-orange-950/30 text-orange-400',
};

const tagStyle = (tag) => {
  for (const key of Object.keys(tagColorMap)) {
    if (tag.toLowerCase().includes(key.toLowerCase())) return tagColorMap[key];
  }
  return 'border-[#2A2A2A] bg-[#2A2A2A] text-[#A1A1AA]';
};

const handleProjectClick = (project) => {
  if (project.hasDetails) {
    window.history.pushState({}, '', `/project/${project.id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo(0, 0);
  }
};

const handleImageError = (e) => {
  e.target.src = '/360_F_541698271_tqSibLbJ2iPhcN8hrDy9cFDjbe98JYbQ.webp';
};

onMounted(() => {
  fetchProjects();
});
</script>

<style scoped>
.group-hover\:scale-108:hover {
  transform: scale(1.08);
}

.maintenance-scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(245, 158, 11, 0.4);
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.6);
  animation: scan 3s linear infinite;
}

@keyframes scan {
  0% { transform: translateY(-100%); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(500px); opacity: 0; }
}

.progress-bar-anim {
  animation: progress 2.5s ease-in-out infinite;
}

@keyframes progress {
  0% { width: 0%; margin-left: 0%; }
  50% { width: 100%; margin-left: 0%; }
  100% { width: 0%; margin-left: 100%; }
}

.glitch-text {
  position: relative;
}
.glitch-text::before, .glitch-text::after {
  content: "SYSTEM UPGRADING";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  display: flex;
  justify-content: center;
}
.glitch-text::before {
  color: #0ff;
  z-index: -1;
  animation: glitch-anim 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
}
.glitch-text::after {
  color: #f0f;
  z-index: -2;
  animation: glitch-anim-2 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
}

@keyframes glitch-anim {
  0% { transform: translate(0) }
  20% { transform: translate(-2px, 2px) }
  40% { transform: translate(-2px, -2px) }
  60% { transform: translate(2px, 2px) }
  80% { transform: translate(2px, -2px) }
  100% { transform: translate(0) }
}
@keyframes glitch-anim-2 {
  0% { transform: translate(0) }
  20% { transform: translate(2px, -2px) }
  40% { transform: translate(2px, 2px) }
  60% { transform: translate(-2px, -2px) }
  80% { transform: translate(-2px, 2px) }
  100% { transform: translate(0) }
}
</style>

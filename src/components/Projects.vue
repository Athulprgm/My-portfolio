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
      <div class="text-center py-20 bg-[#0A0A0A] border border-[#2A2A2A] rounded-none my-12 relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none"></div>
        <i class="fa-solid fa-screwdriver-wrench text-amber-400 text-4xl mb-6 block animate-pulse"></i>
        <h2 class="font-mono text-xl md:text-2xl font-bold text-white mb-3 tracking-widest uppercase">System Maintenance</h2>
        <p class="font-mono text-sm text-[#A1A1AA] max-w-md mx-auto">
          // The projects databank is currently undergoing upgrades.
          <br><br>
          <span class="text-emerald-400">STATUS:</span> Restoring save files...
        </p>
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
</style>

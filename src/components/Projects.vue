<template>
  <section class="py-28 px-6 relative overflow-hidden" id="project">

    <!-- Section background glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/5 blur-[100px] pointer-events-none rounded-full"></div>

    <div class="max-w-6xl mx-auto relative z-10">

      <!-- Section header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 border border-indigo-500/20 bg-indigo-950/20 rounded-full px-4 py-1.5 mb-5">
          <i class="fa-solid fa-code text-indigo-400 text-[10px]"></i>
          <span class="font-mono text-[10.5px] text-indigo-300 tracking-wide font-semibold uppercase">Selected Work</span>
        </div>
        <h1 class="font-mono text-4xl md:text-5xl font-black text-white mb-3 tracking-tight leading-none">
          Featured <span class="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Projects</span>
        </h1>
        <p class="font-mono text-[11px] text-emerald-400/90 max-w-md mx-auto leading-relaxed font-semibold">
          // Real solutions shipped for real users — click any card to explore
        </p>
      </div>

      <!-- Projects grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="project in projects"
          :key="project.id"
          class="project-card group relative bg-neutral-950/60 backdrop-blur border border-white/6 rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-400 hover:-translate-y-2 hover:border-indigo-500/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          @click="handleProjectClick(project)"
        >
          <!-- Card image -->
          <div class="relative w-full h-48 overflow-hidden">
            <img
              :src="project.image"
              :alt="project.title"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 brightness-75 group-hover:brightness-90"
            />
            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>

            <!-- AI badge -->
            <div
              v-if="project.id === 4"
              class="absolute top-3 right-3 flex items-center gap-1.5 bg-violet-950/90 backdrop-blur border border-violet-500/40 text-violet-300 font-mono text-[9px] px-2.5 py-1 rounded-full"
            >
              <span class="w-1.5 h-1.5 bg-violet-400 rounded-full animate-ping"></span>
              AI Engine Active
            </div>

            <!-- Project number badge -->
            <div class="absolute top-3 left-3 w-7 h-7 rounded-full bg-neutral-950/80 border border-white/10 flex items-center justify-center font-mono text-[10px] text-neutral-500">
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
            <h3 class="font-mono text-[15px] font-black text-white leading-tight group-hover:text-indigo-300 transition-colors duration-200">
              {{ project.title }}
            </h3>
            <p class="font-sans text-[13px] text-neutral-400 leading-relaxed line-clamp-2 flex-1">
              {{ project.description }}
            </p>

            <!-- CTA -->
            <div class="pt-2.5 border-t border-white/5 flex items-center justify-between">
              <span class="font-mono text-[10.5px] text-neutral-500">
                {{ project.hasDetails ? '$ git checkout details' : '$ npm install soon' }}
              </span>
              <div
                v-if="project.hasDetails"
                class="w-7 h-7 rounded-full bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-300"
              >
                <i class="fa-solid fa-arrow-right text-indigo-400 group-hover:text-white text-[10px] transition-all duration-300 group-hover:translate-x-0.5"></i>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Bottom note -->
      <div class="text-center mt-14">
        <span class="font-mono text-[11px] text-neutral-500">
          // More projects available on <a href="https://github.com/Athulprgm" target="_blank" rel="noopener" class="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">github.com/Athulprgm</a>
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { projectsData } from '../data/projectsData';

const projects = projectsData;

const tagColorMap = {
  'React': 'border-cyan-500/30 bg-cyan-950/30 text-cyan-400',
  'Vue': 'border-emerald-500/30 bg-emerald-950/30 text-emerald-400',
  'Node': 'border-green-500/30 bg-green-950/30 text-green-400',
  'MongoDB': 'border-green-500/30 bg-green-950/30 text-green-400',
  'Express': 'border-neutral-500/30 bg-neutral-900/50 text-neutral-400',
  'Python': 'border-blue-500/30 bg-blue-950/30 text-blue-400',
  'Django': 'border-teal-500/30 bg-teal-950/30 text-teal-400',
  'AI': 'border-violet-500/30 bg-violet-950/30 text-violet-400',
  'AWS': 'border-orange-500/30 bg-orange-950/30 text-orange-400',
};

const tagStyle = (tag) => {
  for (const key of Object.keys(tagColorMap)) {
    if (tag.toLowerCase().includes(key.toLowerCase())) return tagColorMap[key];
  }
  return 'border-white/10 bg-white/3 text-neutral-500';
};

const handleProjectClick = (project) => {
  if (project.hasDetails) {
    window.history.pushState({}, '', `/project/${project.id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo(0, 0);
  }
};
</script>

<style scoped>
.group-hover\:scale-108:hover {
  transform: scale(1.08);
}
</style>

<template>
  <div class="min-h-screen bg-[#050505] text-white font-sans py-24 px-6 relative overflow-x-hidden">
    <!-- Navigation -->
    <div class="fixed top-0 left-0 w-full h-16 bg-neutral-950/80 backdrop-blur-md border-b border-white/5 px-6 flex items-center justify-between z-50 no-print">
      <button @click="handleBack" class="flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors">
        <i class="fa-solid fa-arrow-left"></i>
        <span>cd ..</span>
      </button>
      <div class="flex items-center gap-2">
        <button @click="handlePrint" class="flex items-center gap-2 px-3.5 py-1.5 border border-white/10 rounded font-mono text-xs text-neutral-300 hover:border-indigo-500/40 hover:text-white transition-all print-btn">
          <i class="fa-solid fa-file-pdf"></i>
          <span>Download PDF</span>
        </button>
        <a
          v-if="detailData.repoUrl && detailData.repoUrl !== '#'"
          :href="detailData.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-3.5 py-1.5 border border-white/10 rounded font-mono text-xs text-neutral-300 hover:border-indigo-500/40 hover:text-white transition-all"
        >
          <i class="fa-brands fa-github"></i>
          <span>Repo</span>
        </a>
        <a
          v-if="detailData.liveUrl && detailData.liveUrl !== '#'"
          :href="detailData.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-3.5 py-1.5 border border-white/10 rounded font-mono text-xs text-neutral-300 hover:border-emerald-500/40 hover:text-white transition-all"
        >
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
          <span>Live Demo</span>
        </a>
      </div>
    </div>

    <div class="max-w-6xl mx-auto mt-8">
      <!-- Hero Section -->
      <div class="pt-8 pb-16 border-b border-white/5 text-left">
        <div class="max-w-3xl">
          <h1 class="font-mono text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            {{ detailData.heroTitle }} 
            <span class="text-indigo-400">{{ detailData.heroSubject }}</span>
          </h1>
          <p class="font-mono text-xs text-neutral-500 mb-8">{{ detailData.tagline }}</p>

          <div class="flex gap-8 items-center flex-wrap">
            <template v-for="(stat, idx) in detailData.stats" :key="idx">
              <div class="flex flex-col gap-1">
                <span class="font-sans text-xl font-bold text-white">{{ stat.val }}</span>
                <span class="font-mono text-[9px] text-neutral-500 uppercase tracking-widest font-semibold">{{ stat.label }}</span>
              </div>
              <div v-if="idx < detailData.stats.length - 1" class="w-[1px] h-8 bg-white/10 hidden sm:block"></div>
            </template>
          </div>
        </div>
      </div>

      <!-- content grid -->
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 mt-12 text-left">
        <!-- Left Column -->
        <div class="flex flex-col gap-12">
          <!-- Abstract -->
          <section class="bg-neutral-900/20 border border-white/5 rounded-xl p-8">
            <h3 class="font-mono text-sm font-semibold text-white mb-4 tracking-wider flex items-center gap-2.5">
              <i class="fa-solid fa-align-left text-neutral-500"></i> Abstract
            </h3>
            <p class="text-sm text-neutral-400 leading-relaxed font-sans">{{ detailData.abstract }}</p>
          </section>

          <!-- Highlights (if any) -->
          <section v-if="detailData.highlights" class="bg-neutral-900/20 border border-white/5 rounded-xl p-8">
            <h3 class="font-mono text-sm font-semibold text-white mb-6 tracking-wider flex items-center gap-2.5">
              <i class="fa-solid fa-star text-neutral-500"></i> Featured Highlights
            </h3>
            <div class="flex flex-col gap-6">
              <div v-for="(item, idx) in detailData.highlights" :key="idx" class="flex flex-col sm:flex-row gap-6 border-b border-white/3 last:border-b-0 pb-6 last:pb-0">
                <div class="relative w-full sm:w-[220px] aspect-video rounded-lg overflow-hidden border border-white/5 flex-shrink-0">
                  <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
                  <span class="absolute top-2 left-2 bg-neutral-950/80 backdrop-blur-xs border border-indigo-500/20 text-indigo-400 font-mono text-[9px] px-2 py-0.5 rounded-full">{{ item.tag }}</span>
                </div>
                <div class="flex flex-col justify-center">
                  <h4 class="font-mono text-sm font-bold text-white mb-2">{{ item.title }}</h4>
                  <p class="text-xs text-neutral-400 leading-relaxed">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Gallery -->
          <section class="bg-neutral-900/20 border border-white/5 rounded-xl p-8">
            <h3 class="font-mono text-sm font-semibold text-white mb-6 tracking-wider flex items-center gap-2.5">
              <i class="fa-solid fa-images text-neutral-500"></i> Interface Gallery
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div
                v-for="(img, index) in detailData.gallery"
                :key="index"
                class="relative aspect-video rounded-lg overflow-hidden border border-white/5 group cursor-pointer transition-all duration-300"
                @click="selectedImage = index"
              >
                <img :src="img" :alt="`Screen ${index + 1}`" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute inset-0 bg-neutral-950/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <i class="fa-solid fa-maximize text-white text-sm"></i>
                </div>
              </div>
            </div>
          </section>

          <!-- Key Features -->
          <section class="bg-neutral-900/20 border border-white/5 rounded-xl p-8">
            <h3 class="font-mono text-sm font-semibold text-white mb-6 tracking-wider flex items-center gap-2.5">
              <i class="fa-solid fa-bolt text-neutral-500"></i> Key Features
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div v-for="(feature, idx) in detailData.features" :key="idx" class="flex gap-4 p-4 border border-white/3 rounded-lg bg-neutral-900/30 hover:border-white/8 transition-colors">
                <div class="text-indigo-400 mt-0.5 text-xs flex-shrink-0">
                  <i class="fa-solid fa-check"></i>
                </div>
                <div>
                  <h4 class="font-mono text-xs font-semibold text-white mb-2 tracking-wide">{{ feature.title }}</h4>
                  <p class="text-xs text-neutral-400 leading-relaxed font-sans">{{ feature.desc }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Right Column -->
        <div class="flex flex-col gap-12">
          <!-- Tech Stack -->
          <section class="bg-neutral-900/20 border border-white/5 rounded-xl p-8">
            <h3 class="font-mono text-sm font-semibold text-white mb-6 tracking-wider flex items-center gap-2.5">
              <i class="fa-solid fa-layer-group text-neutral-500"></i> Tech Stack
            </h3>
            <div class="flex flex-col gap-3">
              <div v-for="(tech, idx) in detailData.technologies" :key="idx" class="flex items-center gap-4 py-2 border-b border-white/3 last:border-b-0">
                <div class="text-lg text-neutral-500 w-6 text-center">
                  <i :class="tech.icon"></i>
                </div>
                <div class="flex flex-col">
                  <span class="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">{{ tech.name }}</span>
                  <span class="font-sans text-xs text-neutral-200 font-semibold mt-0.5">{{ tech.stack }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Modules -->
          <section class="bg-neutral-900/20 border border-white/5 rounded-xl p-8">
            <h3 class="font-mono text-sm font-semibold text-white mb-6 tracking-wider flex items-center gap-2.5">
              <i class="fa-solid fa-cubes text-neutral-500"></i> System Modules
            </h3>
            <div class="flex flex-col gap-6">
              <div v-for="(mod, idx) in detailData.modules" :key="idx">
                <h4 class="font-mono text-[10px] text-cyan-400 uppercase tracking-widest border-b border-white/5 pb-1 mb-2 font-semibold">{{ mod.title }}</h4>
                <ul class="list-disc pl-4 text-xs text-neutral-400 flex flex-col gap-1.5">
                  <li v-for="(it, i) in mod.items" :key="i" class="font-mono text-[11px]">{{ it }}</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <Transition name="fade">
      <div
        v-if="selectedImage !== null"
        class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        @click="selectedImage = null"
      >
        <div
          class="relative max-w-4xl w-full aspect-video flex items-center justify-center"
          @click.stop
        >
          <button
            class="absolute -top-10 right-0 text-white hover:text-indigo-400 text-lg transition-colors cursor-pointer"
            @click="selectedImage = null"
          >
            <i class="fa-solid fa-times"></i>
          </button>
          <img :src="detailData.gallery[selectedImage]" alt="Full view" class="w-full h-full object-contain rounded-lg border border-white/10" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  backAction: {
    type: Function,
    default: null
  }
});

const selectedImage = ref(null);
const detailData = props.project.detailData;

const handleBack = () => {
  if (props.backAction) {
    props.backAction();
  } else if (typeof window !== "undefined") {
    window.location.href = "/";
  }
};

const handlePrint = () => {
  window.print();
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

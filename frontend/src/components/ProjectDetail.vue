<template>
  <div class="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-body pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 relative overflow-x-hidden transition-colors">
    <!-- Top Fixed Navigation Bar -->
    <div class="fixed top-0 left-0 w-full h-14 sm:h-16 studio-glass border-x-0 border-t-0 px-3 sm:px-6 flex items-center justify-between z-50 no-print pt-safe">
      <button
        @click="handleBack"
        class="flex items-center gap-1.5 sm:gap-2 font-mono-clean text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer min-h-[44px] pr-2"
        aria-label="Back to Portfolio"
      >
        <i class="fa-solid fa-arrow-left"></i>
        <span class="hidden sm:inline">Back to Portfolio</span>
        <span class="sm:hidden font-medium">Back</span>
      </button>

      <div class="flex items-center gap-1.5 sm:gap-2">
        <button
          @click="handlePrint"
          class="flex items-center justify-center gap-2 px-2.5 sm:px-3.5 py-1.5 border border-[var(--border-color)] rounded-full font-mono-clean text-xs text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-all cursor-pointer bg-[var(--bg-card)] min-h-[34px]"
          title="Download PDF"
          aria-label="Download PDF"
        >
          <i class="fa-solid fa-file-pdf"></i>
          <span class="hidden sm:inline">Download PDF</span>
        </button>

        <a
          v-if="detailData.repoUrl"
          :href="detailData.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-2 px-2.5 sm:px-3.5 py-1.5 border border-[var(--border-color)] rounded-full font-mono-clean text-xs text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-all bg-[var(--bg-card)] min-h-[34px]"
          title="Source Code"
          aria-label="Source Code"
        >
          <i class="fa-brands fa-github"></i>
          <span class="hidden sm:inline">Source Code</span>
        </a>

        <a
          v-if="detailData.liveUrl"
          :href="detailData.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-worth !py-1.5 !px-3 sm:!px-4 !text-[11px] min-h-[34px]"
        >
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
          <span>Live Demo</span>
        </a>
      </div>
    </div>

    <div class="max-w-6xl mx-auto mt-4 sm:mt-8">
      <!-- Hero Section -->
      <div class="pt-4 sm:pt-8 pb-10 sm:pb-16 border-b border-[var(--border-color)] text-left">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--border-color)] text-[10px] font-mono-clean uppercase tracking-widest text-emerald-500 mb-4">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>PROJECT SPECIFICATION</span>
          </div>

          <h1 class="font-heading text-2xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            {{ detailData.heroTitle }}
            <span
              v-if="detailData.heroSubject"
              class="font-serif-editorial font-normal text-emerald-500 dark:text-emerald-400 block sm:inline mt-1 sm:mt-0"
            >
              {{ detailData.heroSubject }}
            </span>
          </h1>
          <p class="font-body text-sm sm:text-base text-[var(--text-secondary)] mb-8 leading-relaxed">
            {{ detailData.tagline }}
          </p>

          <div v-if="detailData.stats.length > 0" class="flex gap-4 sm:gap-8 items-center flex-wrap">
            <template v-for="(stat, idx) in detailData.stats" :key="idx">
              <div class="flex flex-col gap-0.5 sm:gap-1">
                <span class="font-heading text-lg sm:text-2xl font-bold text-[var(--text-primary)]">{{ stat.val }}</span>
                <span class="font-mono-clean text-[9px] sm:text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-semibold">{{ stat.label }}</span>
              </div>
              <div v-if="idx < detailData.stats.length - 1" class="w-[1px] h-6 sm:h-8 bg-[var(--border-color)] hidden sm:block"></div>
            </template>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div
        class="grid grid-cols-1 gap-6 sm:gap-8 lg:gap-10 mt-8 sm:mt-10 text-left"
        :class="hasSidebarContent ? 'lg:grid-cols-[1fr_320px]' : 'max-w-4xl mx-auto'"
      >
        <!-- Main Column -->
        <div class="flex flex-col gap-6 sm:gap-8">
          <!-- Abstract / Overview -->
          <section v-if="detailData.abstract" class="worth-card rounded-2xl sm:rounded-3xl p-5 sm:p-8">
            <h3 class="font-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-3 sm:mb-4 flex items-center gap-2.5">
              <i class="fa-solid fa-align-left text-emerald-500 text-sm"></i>
              <span>Project Overview</span>
            </h3>
            <p class="text-sm sm:text-[15px] text-[var(--text-secondary)] leading-relaxed font-body whitespace-pre-line">
              {{ detailData.abstract }}
            </p>
          </section>

          <!-- Featured Highlights -->
          <section v-if="detailData.highlights && detailData.highlights.length > 0" class="worth-card rounded-2xl sm:rounded-3xl p-5 sm:p-8">
            <h3 class="font-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-4 sm:mb-6 flex items-center gap-2.5">
              <i class="fa-solid fa-star text-emerald-500 text-sm"></i>
              <span>Featured Highlights</span>
            </h3>
            <div class="flex flex-col gap-5 sm:gap-6">
              <div
                v-for="(item, idx) in detailData.highlights"
                :key="idx"
                class="flex flex-col gap-2 border-b border-[var(--border-color)] last:border-b-0 pb-5 sm:pb-6 last:pb-0"
              >
                <div class="flex items-center gap-2.5">
                  <span
                    v-if="item.tag"
                    class="bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono-clean text-[9px] px-2.5 py-0.5 rounded-full"
                  >
                    {{ item.tag }}
                  </span>
                  <h4 class="font-heading text-sm sm:text-base font-bold text-[var(--text-primary)]">{{ item.title }}</h4>
                </div>
                <p class="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-body">{{ item.desc }}</p>
              </div>
            </div>
          </section>

          <!-- Key Features -->
          <section v-if="detailData.features.length > 0" class="worth-card rounded-2xl sm:rounded-3xl p-5 sm:p-8">
            <h3 class="font-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-4 sm:mb-6 flex items-center gap-2.5">
              <i class="fa-solid fa-bolt text-emerald-500 text-sm"></i>
              <span>Key Features</span>
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div
                v-for="(feature, idx) in detailData.features"
                :key="idx"
                class="flex gap-3.5 p-3.5 sm:p-4 border border-[var(--border-color)] rounded-xl sm:rounded-2xl bg-[var(--bg-subtle)]/50 hover:border-emerald-500/40 transition-colors"
              >
                <div class="text-emerald-500 mt-0.5 text-xs flex-shrink-0">
                  <i class="fa-solid fa-check"></i>
                </div>
                <div>
                  <h4 class="font-heading text-sm font-bold text-[var(--text-primary)] mb-1">{{ feature.title }}</h4>
                  <p class="text-xs text-[var(--text-secondary)] leading-relaxed font-body">{{ feature.desc }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Sidebar Column -->
        <div v-if="hasSidebarContent" class="flex flex-col gap-6 sm:gap-8">
          <!-- Tech Stack -->
          <section v-if="computedTechStack.length > 0" class="worth-card rounded-2xl sm:rounded-3xl p-5 sm:p-7">
            <h3 class="font-heading text-base font-bold text-[var(--text-primary)] mb-4 sm:mb-5 flex items-center gap-2.5">
              <i class="fa-solid fa-layer-group text-emerald-500 text-sm"></i>
              <span>Technologies</span>
            </h3>
            <div class="flex flex-col gap-2.5 sm:gap-3">
              <div
                v-for="(tech, idx) in computedTechStack"
                :key="idx"
                class="flex items-center gap-3.5 py-2 sm:py-2.5 border-b border-[var(--border-color)] last:border-b-0"
              >
                <div class="text-base text-emerald-500 w-6 text-center">
                  <i :class="tech.icon || 'fa-solid fa-code'"></i>
                </div>
                <div class="flex flex-col">
                  <span class="font-mono-clean text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{{ tech.name }}</span>
                  <span class="font-body text-xs text-[var(--text-primary)] font-semibold mt-0.5">{{ tech.stack }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- System Modules -->
          <section v-if="detailData.modules.length > 0" class="worth-card rounded-2xl sm:rounded-3xl p-5 sm:p-7">
            <h3 class="font-heading text-base font-bold text-[var(--text-primary)] mb-4 sm:mb-5 flex items-center gap-2.5">
              <i class="fa-solid fa-cubes text-emerald-500 text-sm"></i>
              <span>System Modules</span>
            </h3>
            <div class="flex flex-col gap-4 sm:gap-5">
              <div v-for="(mod, idx) in detailData.modules" :key="idx">
                <h4 class="font-mono-clean text-[10px] text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border-color)] pb-1.5 mb-2 sm:mb-2.5 font-semibold">
                  {{ mod.title }}
                </h4>
                <ul class="list-disc pl-4 text-xs text-[var(--text-secondary)] flex flex-col gap-1.5">
                  <li v-for="(it, i) in mod.items" :key="i" class="font-mono-clean text-[11px]">{{ it }}</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- Fullscreen Image Lightbox -->
    <Transition name="fade">
      <div
        v-if="selectedImage !== null"
        class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        @click="selectedImage = null"
      >
        <div class="relative max-w-4xl w-full aspect-video flex items-center justify-center" @click.stop>
          <button
            class="absolute -top-11 right-0 text-white hover:text-emerald-400 text-sm font-mono-clean uppercase tracking-wider px-3 py-1 rounded-full border border-white/20 transition-colors cursor-pointer"
            @click="selectedImage = null"
          >
            Close ×
          </button>
          <img
            :src="getImageUrl(galleryImages[selectedImage])"
            alt="Full view"
            @error="handleImageError"
            class="w-full h-full object-contain rounded-2xl border border-white/15"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { getImageUrl } from '../composables/useProjects';

const props = defineProps({
  project: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  backAction: {
    type: Function,
    default: null,
  },
});

const ensureHttp = (url) => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed || trimmed === '#') return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return `https://${trimmed}`;
};

const selectedImage = ref(null);

const detailData = computed(() => {
  const p = props.project || {};
  const d = p.detailData || {};

  return {
    heroTitle: d.heroTitle || p.title || 'Project Case Study',
    heroSubject: d.heroSubject || '',
    tagline: d.tagline || p.description || '',
    stats: Array.isArray(d.stats) ? d.stats : [],
    abstract: d.abstract || p.description || '',
    highlights: Array.isArray(d.highlights) ? d.highlights : null,
    gallery: Array.isArray(d.gallery) ? d.gallery : [],
    features: Array.isArray(d.features) ? d.features : [],
    technologies: Array.isArray(d.technologies) ? d.technologies : [],
    modules: Array.isArray(d.modules) ? d.modules : [],
    repoUrl: ensureHttp(d.repoUrl || p.repoUrl),
    liveUrl: ensureHttp(d.liveUrl || p.liveUrl),
  };
});

const computedTechStack = computed(() => {
  if (detailData.value.technologies.length > 0) {
    return detailData.value.technologies;
  }
  const tags = props.project?.tags || [];
  if (Array.isArray(tags) && tags.length > 0) {
    return tags.map((tag) => ({
      name: 'Stack',
      stack: tag,
      icon: 'fa-solid fa-code',
    }));
  }
  return [];
});

const hasSidebarContent = computed(() => {
  return computedTechStack.value.length > 0 || detailData.value.modules.length > 0;
});

const galleryImages = computed(() => {
  const images = [];
  if (props.project) {
    if (props.project.thumbnail) images.push(props.project.thumbnail);
    if (Array.isArray(props.project.image)) {
      images.push(...props.project.image);
    } else if (typeof props.project.image === 'string' && props.project.image) {
      images.push(props.project.image);
    }
  }
  if (Array.isArray(detailData.value.gallery)) {
    images.push(...detailData.value.gallery);
  }

  const valid = [];
  const seen = new Set();
  for (const img of images) {
    if (img && typeof img === 'string' && img.trim() !== '' && !seen.has(img)) {
      seen.add(img);
      valid.push(img);
    }
  }
  return valid;
});

const handleImageError = (e) => {
  e.target.src = '/projects/jeevalink.jpg';
};

const handleBack = () => {
  if (props.backAction) {
    props.backAction();
  } else if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
};

const handlePrint = () => {
  window.print();
};

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && selectedImage.value !== null) {
    selectedImage.value = null;
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

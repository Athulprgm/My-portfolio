<template>
  <div
    class="w-full pt-16 pb-28 sm:pb-36 min-h-screen flex flex-col justify-center"
  >
    <!-- Eyebrow & Heading with Scroll Reveal (Centered Container) -->
    <div class="w-full max-w-6xl mx-auto px-6 sm:px-8 mb-8 scroll-reveal">
      <div class="flex items-center gap-2 mb-2">
        <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
        <span class="text-xs font-mono-clean tracking-widest uppercase text-[var(--text-muted)]">
          04 // CAPABILITIES
        </span>
      </div>
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 class="text-3xl sm:text-5xl font-sans-clean font-extrabold tracking-tight text-[var(--text-primary)]">
            ACROSS THE STACK.
          </h2>
        </div>

        <!-- Interactive Discipline Filter Pills -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none select-none">
          <button
            v-for="cat in filterCategories"
            :key="cat.id"
            @click="activeFilter = cat.id"
            class="px-2.5 py-1 rounded-sm text-[10px] font-mono-clean uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap"
            :class="activeFilter === cat.id
              ? 'bg-[var(--accent-solid)] text-[var(--accent-text)] font-bold shadow-xs'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-color)] bg-[var(--bg-card)]'"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>
      <div class="scroll-reveal-line h-[1px] bg-[var(--border-color)] mt-6 w-full"></div>
    </div>

    <!-- ── Full-Screen Bleed Bi-Directional Kinetic Logo Showcase ── -->
    <div class="w-full scroll-reveal overflow-hidden relative select-none py-6 border-y border-[var(--border-color)] bg-[var(--bg-subtle)]/40 backdrop-blur-xs mb-16">
      <!-- Gradient Edge Masks for High-End Fade -->
      <div class="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[var(--sheet-bg)] via-[var(--sheet-bg)]/80 to-transparent z-10"></div>
      <div class="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[var(--sheet-bg)] via-[var(--sheet-bg)]/80 to-transparent z-10"></div>

      <!-- Rail 01: Client, Reactive UI & Mobile Runtimes (Flows Left) -->
      <div class="mb-3 overflow-hidden">
        <div class="rail-left flex items-center gap-3 w-max">
          <!-- Track A1 -->
          <div
            v-for="(tech, i) in rail1Logos"
            :key="'r1a-' + i"
            @click="setCategoryFilter(tech.category)"
            class="tech-card flex items-center gap-3 px-4 py-2 rounded-sm border transition-all duration-300 shrink-0 cursor-pointer group"
            :class="[
              activeFilter !== 'all' && tech.category !== activeFilter
                ? 'opacity-25 grayscale scale-95 border-transparent bg-transparent'
                : 'opacity-100 hover:border-[var(--text-primary)] hover:bg-[var(--bg-surface)] bg-[var(--bg-card)] border-[var(--border-color)] hover:shadow-md hover:-translate-y-0.5'
            ]"
          >
            <span class="w-5 h-5 flex items-center justify-center shrink-0">
              <i v-if="tech.icon" :class="tech.icon" class="text-base transition-transform duration-300 group-hover:scale-125"></i>
              <span v-else-if="tech.svg" v-html="tech.svg" class="w-5 h-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-125"></span>
            </span>

            <div class="flex flex-col text-left">
              <div class="flex items-center gap-1.5">
                <span class="text-xs font-mono-clean uppercase tracking-wider font-bold text-[var(--text-primary)] group-hover:text-emerald-500 transition-colors whitespace-nowrap">
                  {{ tech.name }}
                </span>
                <span class="text-[9px] font-mono text-[var(--text-muted)] opacity-70">
                  {{ tech.ver }}
                </span>
              </div>
              <span class="text-[8px] font-mono-clean uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] whitespace-nowrap">
                {{ tech.tag }}
              </span>
            </div>
          </div>

          <!-- Track A2 (Seamless Duplicate) -->
          <div
            v-for="(tech, i) in rail1Logos"
            :key="'r1b-' + i"
            aria-hidden="true"
            @click="setCategoryFilter(tech.category)"
            class="tech-card flex items-center gap-3 px-4 py-2 rounded-sm border transition-all duration-300 shrink-0 cursor-pointer group"
            :class="[
              activeFilter !== 'all' && tech.category !== activeFilter
                ? 'opacity-25 grayscale scale-95 border-transparent bg-transparent'
                : 'opacity-100 hover:border-[var(--text-primary)] hover:bg-[var(--bg-surface)] bg-[var(--bg-card)] border-[var(--border-color)] hover:shadow-md hover:-translate-y-0.5'
            ]"
          >
            <span class="w-5 h-5 flex items-center justify-center shrink-0">
              <i v-if="tech.icon" :class="tech.icon" class="text-base transition-transform duration-300 group-hover:scale-125"></i>
              <span v-else-if="tech.svg" v-html="tech.svg" class="w-5 h-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-125"></span>
            </span>

            <div class="flex flex-col text-left">
              <div class="flex items-center gap-1.5">
                <span class="text-xs font-mono-clean uppercase tracking-wider font-bold text-[var(--text-primary)] group-hover:text-emerald-500 transition-colors whitespace-nowrap">
                  {{ tech.name }}
                </span>
                <span class="text-[9px] font-mono text-[var(--text-muted)] opacity-70">
                  {{ tech.ver }}
                </span>
              </div>
              <span class="text-[8px] font-mono-clean uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] whitespace-nowrap">
                {{ tech.tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Rail 02: Backends, ACID Databases & Infrastructure (Flows Right - Counter Direction) -->
      <div class="overflow-hidden">
        <div class="rail-right flex items-center gap-3 w-max">
          <!-- Track B1 -->
          <div
            v-for="(tech, i) in rail2Logos"
            :key="'r2a-' + i"
            @click="setCategoryFilter(tech.category)"
            class="tech-card flex items-center gap-3 px-4 py-2 rounded-sm border transition-all duration-300 shrink-0 cursor-pointer group"
            :class="[
              activeFilter !== 'all' && tech.category !== activeFilter
                ? 'opacity-25 grayscale scale-95 border-transparent bg-transparent'
                : 'opacity-100 hover:border-[var(--text-primary)] hover:bg-[var(--bg-surface)] bg-[var(--bg-card)] border-[var(--border-color)] hover:shadow-md hover:-translate-y-0.5'
            ]"
          >
            <span class="w-5 h-5 flex items-center justify-center shrink-0">
              <i v-if="tech.icon" :class="tech.icon" class="text-base transition-transform duration-300 group-hover:scale-125"></i>
              <span v-else-if="tech.svg" v-html="tech.svg" class="w-5 h-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-125"></span>
            </span>

            <div class="flex flex-col text-left">
              <div class="flex items-center gap-1.5">
                <span class="text-xs font-mono-clean uppercase tracking-wider font-bold text-[var(--text-primary)] group-hover:text-emerald-500 transition-colors whitespace-nowrap">
                  {{ tech.name }}
                </span>
                <span class="text-[9px] font-mono text-[var(--text-muted)] opacity-70">
                  {{ tech.ver }}
                </span>
              </div>
              <span class="text-[8px] font-mono-clean uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] whitespace-nowrap">
                {{ tech.tag }}
              </span>
            </div>
          </div>

          <!-- Track B2 (Seamless Duplicate) -->
          <div
            v-for="(tech, i) in rail2Logos"
            :key="'r2b-' + i"
            aria-hidden="true"
            @click="setCategoryFilter(tech.category)"
            class="tech-card flex items-center gap-3 px-4 py-2 rounded-sm border transition-all duration-300 shrink-0 cursor-pointer group"
            :class="[
              activeFilter !== 'all' && tech.category !== activeFilter
                ? 'opacity-25 grayscale scale-95 border-transparent bg-transparent'
                : 'opacity-100 hover:border-[var(--text-primary)] hover:bg-[var(--bg-surface)] bg-[var(--bg-card)] border-[var(--border-color)] hover:shadow-md hover:-translate-y-0.5'
            ]"
          >
            <span class="w-5 h-5 flex items-center justify-center shrink-0">
              <i v-if="tech.icon" :class="tech.icon" class="text-base transition-transform duration-300 group-hover:scale-125"></i>
              <span v-else-if="tech.svg" v-html="tech.svg" class="w-5 h-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-125"></span>
            </span>

            <div class="flex flex-col text-left">
              <div class="flex items-center gap-1.5">
                <span class="text-xs font-mono-clean uppercase tracking-wider font-bold text-[var(--text-primary)] group-hover:text-emerald-500 transition-colors whitespace-nowrap">
                  {{ tech.name }}
                </span>
                <span class="text-[9px] font-mono text-[var(--text-muted)] opacity-70">
                  {{ tech.ver }}
                </span>
              </div>
              <span class="text-[8px] font-mono-clean uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] whitespace-nowrap">
                {{ tech.tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Capabilities Grid & Tools (Centered Container) -->
    <div class="w-full max-w-6xl mx-auto px-6 sm:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(cap, idx) in capabilities"
          :key="cap.id"
          class="scroll-reveal-scale worth-card p-6 sm:p-8 rounded-sm flex flex-col justify-between group transition-all duration-300 hover:border-[var(--text-primary)] hover:translate-y-[-3px] hover:shadow-lg"
          :class="`reveal-delay-${(idx + 1) * 100}`"
        >
          <div>
            <div class="flex items-center justify-between text-xs font-mono-clean text-[var(--text-muted)] mb-3">
              <span class="font-bold text-[var(--text-primary)] font-mono group-hover:text-emerald-500 transition-colors">
                // {{ cap.id }}
              </span>
              <span class="uppercase tracking-wider text-[10px]">{{ cap.category }}</span>
            </div>

            <h3 class="text-xl sm:text-2xl font-sans-clean font-bold text-[var(--text-primary)] mb-3 group-hover:translate-x-0.5 transition-transform">
              {{ cap.title }}
            </h3>

            <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 font-sans-clean">
              {{ cap.description }}
            </p>
          </div>

          <div class="pt-4 border-t border-[var(--border-color)] flex flex-wrap gap-1.5">
            <span
              v-for="tag in cap.technologies"
              :key="tag"
              class="worth-tag text-[10px] group-hover:border-[var(--text-secondary)] transition-colors"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useScrollReveal } from '../composables/useScrollReveal';

useScrollReveal();

const activeFilter = ref('all');

const filterCategories = [
  { id: 'all', label: 'All Stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Databases' },
  { id: 'mobile', label: 'Mobile & Cloud' },
];

const setCategoryFilter = (cat) => {
  activeFilter.value = activeFilter.value === cat ? 'all' : cat;
};

// Rail 01: Client, Reactive UI, Cross-Platform & Styling
const rail1Logos = [
  {
    name: 'React',
    category: 'frontend',
    tag: 'UI ARCHITECTURE',
    ver: 'v19',
    icon: 'fa-brands fa-react text-[#61DAFB]',
  },
  {
    name: 'Next.js',
    category: 'frontend',
    tag: 'HYBRID SSR',
    ver: 'v15',
    svg: '<svg class="w-4 h-4 fill-current" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M90 180c49.706 0 90-40.294 90-90s-40.294-90-90-90S0 40.294 0 90s40.294 90 90 90Zm34.802-53.766L67.11 48.75H52.5v82.5h15V70.825l50.052 70.827c2.518-1.503 4.93-3.149 7.25-4.918Z" /></svg>',
  },
  {
    name: 'Vue.js',
    category: 'frontend',
    tag: 'REACTIVE V-DOM',
    ver: 'v3',
    icon: 'fa-brands fa-vuejs text-[#42B883]',
  },
  {
    name: 'Flutter',
    category: 'mobile',
    tag: 'COMPILED APP',
    ver: 'v3.24',
    svg: '<svg class="w-4 h-4 fill-[#02569B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zM14.314 11.815l-5.467 5.467 5.467 5.468h7.37L16.03 17.28l5.654-5.465h-7.37z"/></svg>',
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    tag: 'DESIGN TOKENS',
    ver: 'v4',
    svg: '<svg class="w-4 h-4 fill-[#38BDF8]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/></svg>',
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    tag: 'STATIC TYPING',
    ver: 'v5.6',
    icon: 'fa-brands fa-js text-[#3178C6]',
  },
  {
    name: 'React Native',
    category: 'mobile',
    tag: 'NATIVE RUNTIME',
    ver: 'v0.76',
    icon: 'fa-brands fa-react text-[#61DAFB]',
  },
  {
    name: 'Vite',
    category: 'frontend',
    tag: 'ES MODULE HMR',
    ver: 'v6',
    icon: 'fa-solid fa-bolt text-[#BD34FE]',
  },
];

// Rail 02: Distributed Backends, Databases, APIs & Infrastructure
const rail2Logos = [
  {
    name: 'Node.js',
    category: 'backend',
    tag: 'ASYNC EVENT LOOP',
    ver: 'v22',
    icon: 'fa-brands fa-node-js text-[#68A063]',
  },
  {
    name: 'Laravel',
    category: 'backend',
    tag: 'FULL-STACK SUITE',
    ver: 'v11',
    icon: 'fa-brands fa-laravel text-[#FF2D20]',
  },
  {
    name: 'PostgreSQL',
    category: 'database',
    tag: 'ACID RELATIONAL',
    ver: 'v16',
    icon: 'fa-solid fa-database text-[#336791]',
  },
  {
    name: 'MySQL',
    category: 'database',
    tag: 'INDEXED STORAGE',
    ver: 'v8',
    icon: 'fa-solid fa-server text-[#00758F]',
  },
  {
    name: 'Redis',
    category: 'database',
    tag: 'IN-MEMORY CACHE',
    ver: 'v7',
    icon: 'fa-solid fa-layer-group text-[#DC382D]',
  },
  {
    name: 'MongoDB',
    category: 'database',
    tag: 'NOSQL DOCUMENTS',
    ver: 'v7',
    svg: '<svg class="w-4 h-4 fill-[#47A248]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C11.66 0 11.19.16 10.97.4 9.17 2.37 4.5 7.9 4.5 13.5c0 4.14 3.36 7.5 7.5 7.5s7.5-3.36 7.5-7.5c0-5.6-4.67-11.13-6.47-13.1-.22-.24-.69-.4-1.03-.4zm0 2c1.38 1.77 5.5 6.78 5.5 11.5 0 3.03-2.47 5.5-5.5 5.5s-5.5-2.47-5.5-5.5C6.5 8.78 10.62 3.77 12 2zm-.75 2.5v14c.25.03.5.05.75.05s.5-.02.75-.05v-14c-.24-.03-.49-.05-.75-.05s-.51.02-.75.05z"/></svg>',
  },
  {
    name: 'Firebase',
    category: 'mobile',
    tag: 'REALTIME SYNC',
    ver: 'v10',
    svg: '<svg class="w-4 h-4 fill-[#FFA611]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3.89 15.672L6.255.461A.54.54 0 0 1 7.27.283l3.543 6.643-6.923 8.746zm16.793 3.633L18.1 4.793a.54.54 0 0 0-.962-.162l-3.235 6.136 6.78 8.538zM12.752 9.539l-2.42-4.595a.54.54 0 0 0-.96 0L2.094 18.258l9.317 5.242a1.35 1.35 0 0 0 1.31 0l9.186-5.168-9.155-8.793z"/></svg>',
  },
  {
    name: 'Docker',
    category: 'backend',
    tag: 'CONTAINERIZATION',
    ver: 'OCI',
    icon: 'fa-brands fa-docker text-[#2496ED]',
  },
  {
    name: 'PHP 8.3',
    category: 'backend',
    tag: 'JIT ENGINE',
    ver: 'v8.3',
    icon: 'fa-brands fa-php text-[#777BB4]',
  },
  {
    name: 'Git & GitHub',
    category: 'backend',
    tag: 'ATOMIC VCS',
    ver: 'CLI',
    icon: 'fa-brands fa-github text-[var(--text-primary)]',
  },
];

const capabilities = [
  {
    id: '01',
    category: 'FRONTEND',
    title: 'Frontend Development',
    description: 'Building responsive and purposeful interfaces with a focus on usability, performance, and clean interaction.',
    technologies: ['React', 'Vue', 'Next.js', 'Tailwind CSS', 'CSS'],
  },
  {
    id: '02',
    category: 'BACKEND',
    title: 'Backend & APIs',
    description: 'Building APIs, business logic, authentication, integrations, and server-side applications.',
    technologies: ['Node.js', 'Express.js', 'Laravel', 'PHP', 'Firebase'],
  },
  {
    id: '03',
    category: 'DATABASE',
    title: 'Data & Storage',
    description: 'Designing practical data structures and reliable data layers for modern applications.',
    technologies: ['SQL', 'MongoDB', 'Firebase'],
  },
  {
    id: '04',
    category: 'MOBILE & TOOLING',
    title: 'Mobile Development',
    description: 'Building cross-platform mobile applications designed for real-world use with modern toolchains.',
    technologies: ['Flutter', 'Firebase', 'Git', 'GitHub', 'Docker'],
  },
];
</script>

<style scoped>
.rail-left {
  animation: slide-left 36s linear infinite;
  will-change: transform;
}

.rail-right {
  animation: slide-right 38s linear infinite;
  will-change: transform;
}

.rail-left:hover,
.rail-right:hover {
  animation-play-state: paused;
}

@keyframes slide-left {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}

@keyframes slide-right {
  0% {
    transform: translate3d(-50%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

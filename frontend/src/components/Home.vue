<template>
  <section
    class="relative min-h-[90vh] lg:min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden noise-overlay hero-grid"
    id="home"
    ref="containerRef"
  >
    <!-- Fixed Atmospheric Ambient Glow (Theme-Aware, Static, NO Cursor Following Light) -->
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[420px] pointer-events-none z-0 blur-[140px] opacity-35 transition-all duration-700 rounded-full"
      :style="{ background: currentTheme.glow }"
    ></div>

    <!-- Minimal Corner Framing Accents -->
    <div class="absolute top-0 left-0 w-20 h-20 border-l border-t border-white/10 pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-20 h-20 border-r border-b border-white/10 pointer-events-none"></div>

    <!-- Main Content Container -->
    <div class="w-full max-w-6xl flex flex-col z-10 relative">

      <!-- Main Content Grid: Modern Editorial Split -->
      <div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        <!-- ==================== LEFT: EDITORIAL NARRATIVE (Cols 1-7, Order-2 on Mobile) ==================== -->
        <div class="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-center text-left">

          <!-- Eyebrow Tag -->
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#2A2A2A] text-xs font-mono text-[#A1A1AA] mb-5 w-fit">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-xs text-white/90 font-medium">Co-Founder & Full-Stack Developer</span>
          </div>

          <!-- Master Headline -->
          <h1 class="font-sans text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-white leading-[1.12] tracking-tight mb-6">
            Building reliable web & mobile apps,<br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
              crafted with care and precision.
            </span>
          </h1>

          <!-- Narrative Description with Dynamic Rotating Specialty -->
          <p class="font-sans text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-xl mb-6 font-normal">
            Hi, I'm <span class="text-white font-semibold">Athul Krishna</span> — {{ settings.bio_tagline || 'Co-Founder & Full-Stack Developer' }} at Trawbit Technologies. Focused on
            <span class="text-white font-medium underline decoration-emerald-400/60 underline-offset-4 transition-all">
              {{ currentRolePhrase }}
            </span>
            with clean architecture, solid engineering, and great user experience.
          </p>

          <!-- Tech Stack Capsule Bar -->
          <div class="flex flex-wrap items-center gap-2 mb-8">
            <span class="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-widest mr-1 flex items-center gap-1.5">
              <i class="fa-solid fa-layer-group text-[9px] text-white/60"></i> Core Stack:
            </span>
            <span 
              v-for="tech in techStack" 
              :key="tech"
              class="px-2.5 py-1 bg-[#121212] border border-[#2A2A2A] text-white/90 font-mono text-[10px] tracking-wide hover:border-white hover:text-white hover:bg-[#1f1f1f] transition-all cursor-default"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Action CTAs -->
          <div class="flex flex-wrap items-center gap-3.5 mb-10">
            <button
              @click="scrollToProjects"
              class="group relative inline-flex items-center gap-3 px-6 py-3.5 !bg-white !text-black font-mono text-xs font-bold uppercase tracking-wider rounded-none hover:!bg-neutral-200 active:scale-95 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer"
            >
              <span class="text-black font-black">EXPLORE WORK</span>
              <i class="fa-solid fa-arrow-right-long text-xs text-black group-hover:translate-x-1 transition-transform"></i>
            </button>

            <a
              href="#contact"
              @click.prevent="scrollToContact"
              class="inline-flex items-center gap-2.5 px-5 py-3.5 bg-[#121212] border border-[#2A2A2A] text-white hover:border-white hover:bg-[#1c1c1c] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-none shadow-sm"
            >
              <i class="fa-regular fa-paper-plane text-xs text-white/80"></i>
              <span>GET IN TOUCH</span>
            </a>

            <!-- Quick Copy Email Button with Toast Feedback -->
            <button
              @click="copyEmail"
              class="inline-flex items-center gap-2 px-3.5 py-3.5 bg-[#121212] border border-[#2A2A2A] hover:border-white text-[#A1A1AA] hover:text-white font-mono text-xs tracking-wider transition-all cursor-pointer rounded-none shadow-sm"
              :title="copiedEmail ? 'Copied to clipboard!' : 'Copy Email Address'"
            >
              <i :class="copiedEmail ? 'fa-solid fa-check text-emerald-400' : 'fa-regular fa-copy text-white/70'"></i>
              <span :class="copiedEmail ? 'text-emerald-400' : 'text-white'">{{ copiedEmail ? 'COPIED!' : 'EMAIL' }}</span>
            </button>

            <!-- Social Links -->
            <div class="flex items-center gap-1.5 ml-0 sm:ml-1">
              <a
                href="https://github.com/Athulprgm"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 flex items-center justify-center border border-[#2A2A2A] bg-[#121212] text-[#A1A1AA] hover:text-white hover:border-white transition-all rounded-none"
                title="GitHub Profile"
              >
                <i class="fa-brands fa-github text-sm"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/athul-krishna-k/"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 flex items-center justify-center border border-[#2A2A2A] bg-[#121212] text-[#A1A1AA] hover:text-white hover:border-white transition-all rounded-none"
                title="LinkedIn Profile"
              >
                <i class="fa-brands fa-linkedin-in text-sm"></i>
              </a>
              <a
                href="/Athul_Krishna_Resume.pdf"
                download
                class="w-10 h-10 flex items-center justify-center border border-[#2A2A2A] bg-[#121212] text-[#A1A1AA] hover:text-white hover:border-white transition-all rounded-none"
                title="Download Resume"
              >
                <i class="fa-solid fa-file-arrow-down text-sm"></i>
              </a>
            </div>
          </div>

          <!-- Architecture Metrics Strip -->
          <div class="pt-6 border-t border-[#2A2A2A] grid grid-cols-3 gap-6 max-w-xl">
            <div v-for="stat in keyStats" :key="stat.label" class="flex flex-col">
              <span class="font-mono text-2xl sm:text-3xl font-black text-white tracking-tight">
                {{ stat.value }}
              </span>
              <span class="font-mono text-[9.5px] text-[#A1A1AA] uppercase tracking-wider mt-1">
                {{ stat.label }}
              </span>
            </div>
          </div>

        </div>

        <!-- ==================== RIGHT: MEDIUM CLASSIC ID CARD (Order-1 on Mobile) ==================== -->
        <div 
          class="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center justify-center relative select-none mb-6 lg:mb-0 pt-2 lg:pt-0"
        >
          
          <!-- Soft Atmospheric Backlight Glow -->
          <div 
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-80 sm:w-88 sm:h-96 rounded-full blur-[90px] opacity-30 pointer-events-none transition-colors duration-700 -z-10"
            :style="{ background: currentTheme.glow }"
          ></div>

          <!-- Continuous Swinging Lanyard & Card Assembly -->
          <div class="relative flex flex-col items-center animate-lanyard-swing">

            <!-- ================= LANYARD RIBBON ================= -->
            <div class="relative flex flex-col items-center z-20 pointer-events-none -mb-3">
              
              <!-- Responsive Woven Fabric Ribbon Straps: directly to top navbar on mobile & desktop -->
              <div class="relative w-9 sm:w-10 lg:w-12 h-20 sm:h-24 lg:h-[500px] -mt-14 sm:-mt-18 lg:-mt-[480px] flex justify-center overflow-hidden">
                <!-- Left Ribbon Strap -->
                <div class="w-3.5 sm:w-4 h-full bg-gradient-to-b from-[#18181b] via-[#242428] to-[#18181b] border-x border-[#333338] shadow-md -mr-1 rotate-[-1.5deg] relative flex items-center justify-center">
                  <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:3px_3px]"></div>
                </div>
                <!-- Right Ribbon Strap -->
                <div class="w-3.5 sm:w-4 h-full bg-gradient-to-b from-[#18181b] via-[#242428] to-[#18181b] border-x border-[#333338] shadow-md -ml-1 rotate-[1.5deg] relative flex items-center justify-center">
                  <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:3px_3px]"></div>
                </div>
              </div>

              <!-- Metallic Crimp Buckle / Clamp -->
              <div class="relative z-10 w-7 sm:w-8 h-2.5 sm:h-3 rounded-[1px] bg-gradient-to-b from-[#d4d4d8] via-[#71717a] to-[#27272a] border border-[#a1a1aa]/60 shadow-sm flex items-center justify-between px-1.5 -mt-0.5">
                <div class="w-0.5 h-0.5 rounded-full bg-[#18181b]"></div>
                <div class="w-0.5 h-0.5 rounded-full bg-[#18181b]"></div>
              </div>

              <!-- Metallic Clasp Hook (passing through badge slot) -->
              <div class="w-2 sm:w-2.5 h-4.5 sm:h-5 rounded-b-sm bg-gradient-to-b from-[#d4d4d8] via-[#a1a1aa] to-[#52525b] border border-[#d4d4d8]/40 -mt-0.5 shadow-sm relative z-30">
                <div class="absolute top-0.5 left-1/2 -translate-x-1/2 w-1 h-2 bg-[#27272a] rounded-xs"></div>
              </div>
            </div>

            <!-- ================= MEDIUM MINIMAL ID CARD ================= -->
            <div 
              class="id-card-assembly relative w-full max-w-[260px] sm:max-w-[285px] rounded-2xl p-3.5 bg-gradient-to-b from-[#18181b] via-[#121214] to-[#0a0a0c] border border-white/[0.12] shadow-[0_22px_55px_-12px_rgba(0,0,0,0.95)] backdrop-blur-xl cursor-default overflow-hidden"
            >
              <!-- Lanyard Punch Hole Slot -->
              <div class="relative w-full flex justify-center mb-2.5 z-20">
                <div class="w-11 h-2 rounded-full bg-[#050505] border border-white/20 shadow-inner"></div>
              </div>

            <!-- Header: Clean Brand Header -->
            <div class="flex items-center justify-between px-1 mb-2.5 z-20 relative">
              <span class="font-mono text-[10px] uppercase tracking-widest text-neutral-200 font-bold">
                TRAWBIT
              </span>
              <span class="font-mono text-[8.5px] uppercase tracking-wider text-[#71717a]">
                IDENTIFICATION PASS
              </span>
            </div>

            <!-- Crisp Framed Photo / Video Window -->
            <div class="relative w-full aspect-square rounded-xl overflow-hidden bg-[#0a0a0c] border border-white/10 shadow-inner flex items-center justify-center mb-3">
              <!-- High-Fidelity Despilled Keyed Video -->
              <ChromaVideo
                src="/profile-video.mp4"
                chromaColor="green"
                :zoom="1.0"
                :tolerance="42"
                :smoothness="22"
                :maxResolution="540"
                canvasClass="w-full h-full object-cover relative z-10"
              />
            </div>

            <!-- Identity Credential Information -->
            <div class="px-1 mb-2.5">
              <h3 class="font-sans text-base sm:text-lg font-bold text-white tracking-tight leading-tight mb-0.5">
                Athul Krishna
              </h3>
              <p class="font-sans text-xs sm:text-[11.5px] text-[#a1a1aa] font-medium leading-tight">
                Co-Founder & Developer
              </p>
              <p class="font-mono text-[9.5px] text-[#71717a] mt-1">
                Kerala, India
              </p>
            </div>

            <!-- Bottom Clean Barcode Strip -->
            <div class="pt-2 border-t border-white/10 flex items-center justify-between px-1">
              <!-- Clean Single-Line Barcode -->
              <div class="flex items-center gap-[1.5px] h-3.5 opacity-80">
                <div class="w-[2px] h-full bg-white"></div>
                <div class="w-[1px] h-full bg-white"></div>
                <div class="w-[3px] h-full bg-white"></div>
                <div class="w-[1px] h-full bg-white"></div>
                <div class="w-[2px] h-full bg-white"></div>
                <div class="w-[4px] h-full bg-white"></div>
                <div class="w-[1px] h-full bg-white"></div>
                <div class="w-[2px] h-full bg-white"></div>
                <div class="w-[1px] h-full bg-white"></div>
                <div class="w-[3px] h-full bg-white"></div>
                <div class="w-[2px] h-full bg-white"></div>
                <div class="w-[1px] h-full bg-white"></div>
                <div class="w-[2px] h-full bg-white"></div>
              </div>
              <span class="font-mono text-[8.5px] text-[#71717a] tracking-wider font-medium">
                TRAWBIT-AK
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import ChromaVideo from './ChromaVideo.vue';
import { useProjects } from '../composables/useProjects';
import { useSettings } from '../composables/useSettings';

const { projects, fetchProjects } = useProjects();
const { settings, fetchSettings: fetchSiteSettings } = useSettings();

const containerRef = ref(null);

// ================= THEME ACCENT MOODS =================
const activeTheme = ref('emerald');
const themes = [
  { id: 'emerald', name: 'Emerald', primary: '#10b981', glow: 'rgba(16, 185, 129, 0.22)' },
  { id: 'cyan', name: 'Cyan', primary: '#06b6d4', glow: 'rgba(6, 182, 212, 0.22)' },
  { id: 'mono', name: 'Silver', primary: '#ffffff', glow: 'rgba(255, 255, 255, 0.18)' },
];

const currentTheme = computed(() => themes.find(t => t.id === activeTheme.value) || themes[0]);

// ================= DYNAMIC ROTATING SPECIALTY =================
const defaultRolePhrases = [
  'full-stack web applications with Laravel, PHP & Node.js',
  'clean, fast frontend interfaces with React, Next.js & Vue.js',
  'cross-platform mobile applications with Flutter & Firebase',
  'robust database design, REST APIs & cloud hosting',
];

const rolePhrases = computed(() => {
  if (Array.isArray(settings.value?.role_phrases) && settings.value.role_phrases.length > 0) {
    return settings.value.role_phrases;
  }
  return defaultRolePhrases;
});

const currentRoleIndex = ref(0);
const currentRolePhrase = computed(() => {
  const phrases = rolePhrases.value;
  if (!phrases || phrases.length === 0) return '';
  return phrases[currentRoleIndex.value % phrases.length];
});

let roleTimer = null;
const initRoleCycle = () => {
  if (roleTimer) clearInterval(roleTimer);
  roleTimer = setInterval(() => {
    const len = rolePhrases.value.length || 1;
    currentRoleIndex.value = (currentRoleIndex.value + 1) % len;
  }, 3400);
};

// ================= DYNAMIC TECH STACK & METRICS =================
const defaultTech = ['PHP', 'Laravel', 'React', 'Next.js', 'Vue.js', 'Node.js', 'Tailwind CSS', 'Flutter', 'SQL', 'Firebase'];

const techStack = computed(() => {
  if (projects.value && projects.value.length > 0) {
    const allTags = projects.value.flatMap(p => p.tags || []);
    const uniqueTags = [...new Set(allTags)].filter(Boolean);
    if (uniqueTags.length >= 4) {
      return uniqueTags.slice(0, 8);
    }
  }
  return defaultTech;
});

const keyStats = computed(() => [
  { value: settings.value?.experience_years || '3+ Yrs', label: 'Experience' },
  { value: settings.value?.shipped_works || '15+', label: 'Projects Shipped' },
  { value: settings.value?.uptime_focus || '100%', label: 'Commitment' },
]);

// One-Click Copy Email
const copiedEmail = ref(false);
const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('athul@trawbit.com');
    copiedEmail.value = true;
    setTimeout(() => {
      copiedEmail.value = false;
    }, 2000);
  } catch (err) {
    console.error('Clipboard copy failed', err);
  }
};

onMounted(() => {
  fetchProjects();
  fetchSiteSettings();
  initRoleCycle();
});

onUnmounted(() => {
  if (roleTimer) clearInterval(roleTimer);
});

// Smooth Scrolling Actions
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.pageYOffset - 80,
      behavior: 'smooth',
    });
  }
};
const scrollToProjects = () => scrollToSection('project');
const scrollToContact = () => scrollToSection('contact');
</script>

<style scoped>
@keyframes lanyard-swing {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(1.2deg);
  }
  75% {
    transform: rotate(-1.2deg);
  }
}

.animate-lanyard-swing {
  transform-origin: top center;
  animation: lanyard-swing 6s ease-in-out infinite;
  will-change: transform;
}

@media (min-width: 1024px) {
  .animate-lanyard-swing {
    transform-origin: 50% -480px;
  }
}
</style>




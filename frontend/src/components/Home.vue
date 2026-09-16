<template>
  <section
    class="relative min-h-[90vh] lg:min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden noise-overlay hero-grid"
    id="home"
    ref="containerRef"
  >
    <!-- Background Interactive Canvas (Constellation & Proximity Mesh) -->
    <canvas ref="canvasRef" class="absolute inset-0 pointer-events-none z-0 opacity-35"></canvas>

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

        <!-- ==================== LEFT: EDITORIAL NARRATIVE (Cols 1-7) ==================== -->
        <div class="lg:col-span-7 flex flex-col justify-center text-left">

          <!-- Master Headline -->
          <h1 class="font-sans text-4xl sm:text-5xl lg:text-[3.6rem] font-black text-white leading-[1.08] tracking-[-0.035em] mb-6">
            Engineering<br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
              systems that scale,
            </span><br />
            <span class="relative inline-block text-white">
              crafted with precision.
              <svg class="absolute -bottom-1.5 left-0 w-full text-emerald-400/60" height="6" viewBox="0 0 200 6" fill="none">
                <path d="M1 4.5C50 1.5 150 1.5 199 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </span>
          </h1>

          <!-- Narrative Description with Dynamic Rotating Specialty -->
          <p class="font-sans text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-xl mb-6 font-normal">
            Hi, I'm <span class="text-white font-bold">Athul Krishna</span> — {{ settings.bio_tagline || 'Co-Founder & AI-Assisted Full-Stack Architect' }}. Specializing in
            <span class="text-white font-medium underline decoration-emerald-400/60 underline-offset-4 transition-all">
              {{ currentRolePhrase }}
            </span>
            with zero compromise on performance or design fidelity.
          </p>

          <!-- Tech Stack Capsule Bar -->
          <div class="flex flex-wrap items-center gap-2 mb-8">
            <span class="font-mono text-[9px] text-[#A1A1AA] uppercase tracking-widest mr-1 flex items-center gap-1.5">
              <i class="fa-solid fa-layer-group text-[8px] text-white/60"></i> Stack:
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
              class="group relative inline-flex items-center gap-3 px-6 py-3.5 !bg-white !text-black font-mono text-xs font-black uppercase tracking-wider rounded-none hover:!bg-neutral-200 active:scale-95 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer"
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
              <span class="text-[10px] uppercase font-bold" :class="copiedEmail ? 'text-emerald-400' : 'text-white'">{{ copiedEmail ? 'COPIED!' : 'EMAIL' }}</span>
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
              <span class="font-mono text-[9px] text-[#A1A1AA] uppercase tracking-wider mt-1">
                {{ stat.label }}
              </span>
            </div>
          </div>

        </div>

        <!-- ==================== RIGHT: SCULPTURAL HOLOGRAPHIC PORTAL ==================== -->
        <div class="lg:col-span-5 flex items-center justify-center relative select-none mt-8 lg:mt-0">
          
          <!-- Soft Behind Halo Glow -->
          <div 
            class="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full blur-3xl opacity-35 pointer-events-none transition-colors duration-700"
            :style="{ background: currentTheme.glow }"
          ></div>

          <!-- Celestial Concentric Orbit Rings -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="w-80 h-80 rounded-full border border-white/[0.05] animate-[spin_55s_linear_infinite]"></div>
            <div class="w-64 h-64 rounded-full border border-dashed border-white/[0.08] animate-[spin_35s_linear_infinite_reverse]"></div>
            <div class="w-48 h-48 rounded-full border border-white/[0.04]"></div>
          </div>

          <!-- Central Borderless Avatar Portal -->
          <div class="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-1 bg-gradient-to-b from-white/25 via-white/10 to-white/5 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div class="w-full h-full rounded-full overflow-hidden bg-[#0A0A0A] border border-white/10 relative flex items-center justify-center">
              <!-- Underlay Portrait Image -->
              <img 
                src="/profile.png" 
                alt="Athul Krishna" 
                class="absolute inset-0 w-full h-full object-cover rounded-full opacity-30 pointer-events-none" 
              />
              <!-- Keyed Green-Screen ChromaVideo -->
              <ChromaVideo
                src="/profile-video.mp4"
                chromaColor="green"
                :zoom="1.08"
                canvasClass="w-full h-full object-cover rounded-full relative z-10"
              />
              <!-- Bottom smooth vignette so character base curves into the portal -->
              <div class="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent pointer-events-none z-15"></div>
              <!-- Subtle Organic Scanline Sweep -->
              <div class="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.04] to-transparent h-16 w-full scan-sweep z-20"></div>
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
const canvasRef = ref(null);

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
  'AI-accelerated full stack engineering with PHP, Laravel & SQL',
  'high-performance web interfaces with React & Tailwind CSS',
  'cross-platform mobile applications with Flutter & Firebase',
  'scalable backend APIs & automated development workflows',
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
  }, 3200);
};

// ================= DYNAMIC TECH STACK & METRICS =================
const defaultTech = ['PHP', 'Laravel', 'React', 'Tailwind CSS', 'Flutter', 'SQL', 'Firebase'];

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
  { value: settings.value?.experience_years || '03+', label: 'Years Exp.' },
  { value: settings.value?.shipped_works || '15+', label: 'Shipped Works' },
  { value: settings.value?.uptime_focus || '99.9%', label: 'Uptime Focus' },
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

// ================= CONSTELLATION CANVAS =================
let rafId = null;
let isSectionVisible = true;
const particles = [];
const PARTICLE_COUNT = 36;

const initParticles = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  const resizeCanvas = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  resizeCanvas();

  particles.length = 0;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.3 + 0.6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.45 + 0.15,
    });
  }

  const animate = () => {
    if (!isSectionVisible) {
      rafId = requestAnimationFrame(animate);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctx.fill();

      // Constellation connections
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 80) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.07 * (1 - dist / 80)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    rafId = requestAnimationFrame(animate);
  };

  animate();
};

let observer = null;

onMounted(() => {
  fetchProjects();
  fetchSiteSettings();
  initParticles();
  initRoleCycle();

  observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      isSectionVisible = e.isIntersecting;
    });
  }, { threshold: 0.05 });

  if (containerRef.value) observer.observe(containerRef.value);

  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
  if (roleTimer) clearInterval(roleTimer);
  if (observer) observer.disconnect();
  window.removeEventListener('resize', handleResize);
});

const handleResize = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
};

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
.scan-sweep {
  animation: scan 4.5s ease-in-out infinite;
}

@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(350%); }
}
</style>




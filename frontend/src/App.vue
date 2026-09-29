<template>
  <LoadingScreenWrapper>
    <div class="App bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] relative transition-colors duration-300">

      <!-- ── Persistent Background System & Ambient Space ── -->
      <BackgroundSystem />

      <!-- ── Admin Panel ──────────────────────── -->
      <template v-if="currentRoute === 'admin'">
        <AdminPanel />
      </template>

      <!-- ── Project loading spinner ─────────── -->
      <template v-else-if="projectLoading">
        <div class="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] relative z-20">
          <div class="flex flex-col items-center gap-4">
            <div class="w-8 h-8 border-2 border-[var(--text-primary)] border-t-transparent rounded-full animate-spin"></div>
            <span class="font-mono text-xs text-[var(--text-muted)]">// loading project specifications</span>
          </div>
        </div>
      </template>

      <!-- ── Project error state ──────────────── -->
      <template v-else-if="projectError">
        <div class="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] relative z-20">
          <div class="text-center flex flex-col items-center gap-4 p-8 worth-card rounded-sm max-w-md">
            <span class="text-[var(--text-primary)] font-mono text-xs font-bold">[ERROR 404]</span>
            <p class="font-mono text-sm text-[var(--text-muted)]">{{ projectError }}</p>
            <button @click="goBack" class="btn-worth text-xs py-2 px-4 cursor-pointer">
              ← Return to Experience
            </button>
          </div>
        </div>
      </template>

      <!-- ── Project detail view ──────────────── -->
      <template v-else-if="selectedProject">
        <ProjectDetail :project="selectedProject" :backAction="goBack" />
      </template>

      <!-- ── Continuous Cinematic Editorial Experience ── -->
      <template v-else>
        <ScrollProgress />
        <NavBar />
        
        <main class="relative z-10 w-full">
          <!-- ── Section 01: Hero Intro (Home - Sticky Pin Deep Obsidian / Alabaster) ── -->
          <section id="intro" class="sticky top-0 h-screen w-full z-0 overflow-hidden bg-[var(--hero-bg)] text-[var(--text-primary)] transition-colors duration-300">
            <HeroIntro />
          </section>

          <!-- ── Section 02: About & Philosophy (Cinematic Card / Curtain Over Home - Studio Surface) ── -->
          <section
            id="about"
            class="relative w-full z-20 bg-[var(--sheet-bg)] text-[var(--text-primary)] border-t border-[var(--sheet-border)] rounded-t-[30px] sm:rounded-t-[40px] shadow-[var(--sheet-shadow)] transition-colors duration-300"
          >
            <!-- Minimalist Architectural Notch with Emerald Glow -->
            <div class="flex justify-center pt-3.5 pb-1 select-none pointer-events-none">
              <div
                class="w-14 h-1 rounded-full bg-[var(--notch-bg)] transition-all"
                :style="{ boxShadow: 'var(--notch-shadow)' }"
              ></div>
            </div>

            <IdentityNarrative />
          </section>

          <!-- ── Section 03: Selected Works ── -->
          <section id="works" class="relative w-full z-20 border-t border-[var(--border-color)] bg-[var(--sheet-bg)] text-[var(--text-primary)] transition-colors duration-300">
            <ProjectsShowcase />
          </section>

          <!-- ── Section 04: Technical Disciplines (Stack) ── -->
          <section id="stack" class="relative w-full z-20 border-t border-[var(--border-color)] bg-[var(--sheet-bg)] text-[var(--text-primary)] transition-colors duration-300">
            <TechSequence />
          </section>

          <!-- ── Section 05: Conclusion & Contact ── -->
          <section id="contact" class="relative w-full z-20 border-t border-[var(--border-color)] bg-[var(--sheet-bg)] text-[var(--text-primary)] transition-colors duration-300">
            <ContactExperience />
          </section>
        </main>

        <ScrollToTop />
      </template>
    </div>
  </LoadingScreenWrapper>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineAsyncComponent, nextTick } from 'vue';
import BackgroundSystem     from './components/BackgroundSystem.vue';
import ScrollProgress       from './components/ScrollProgress.vue';
import NavBar               from './components/NavBar.vue';
import HeroIntro            from './components/HeroIntro.vue';
import ProjectsShowcase     from './components/ProjectsShowcase.vue';
import IdentityNarrative    from './components/IdentityNarrative.vue';
import TechSequence         from './components/TechSequence.vue';
import ContactExperience    from './components/ContactExperience.vue';
import ScrollToTop          from './components/ScrollToTop.vue';
import LoadingScreenWrapper from './components/LoadingScreenWrapper.vue';
import { fetchProjectById } from './composables/useProjects';
import { useTheme } from './composables/useTheme';
import { useScrollReveal } from './composables/useScrollReveal';

// Async Lazy-Loaded Components
const AdminPanel = defineAsyncComponent(() => import('./components/AdminPanel.vue'));
const ProjectDetail = defineAsyncComponent(() => import('./components/ProjectDetail.vue'));

const { initTheme } = useTheme();
const { scanAndObserve } = useScrollReveal();

// ── Routing state ─────────────────────────────────────────────────
const currentRoute    = ref('home');   // 'home' | 'admin' | 'project'
const selectedProject = ref(null);
const projectLoading  = ref(false);
const projectError    = ref(null);

const parseRoute = async () => {
  const path = window.location.pathname;

  // /admin
  if (path === '/admin' || path.startsWith('/admin')) {
    currentRoute.value    = 'admin';
    selectedProject.value = null;
    return;
  }

  // /project/:id
  const match = path.match(/\/project\/(\d+)/);
  if (match) {
    currentRoute.value   = 'project';
    projectLoading.value = true;
    projectError.value   = null;
    try {
      selectedProject.value = await fetchProjectById(parseInt(match[1]));
    } catch (err) {
      projectError.value    = err.message;
      selectedProject.value = null;
    } finally {
      projectLoading.value = false;
    }
    return;
  }

  // /
  currentRoute.value    = 'home';
  selectedProject.value = null;
  projectError.value    = null;
  nextTick(() => {
    setTimeout(scanAndObserve, 100);
  });
};

const goBack = () => {
  window.history.pushState({}, '', '/');
  parseRoute();
};

onMounted(() => {
  initTheme();
  parseRoute();
  window.addEventListener('popstate', parseRoute);
});

onUnmounted(() => {
  window.removeEventListener('popstate', parseRoute);
});
</script>

<style>
section {
  scroll-margin-top: 70px;
}
</style>

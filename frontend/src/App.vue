<template>
  <LoadingScreenWrapper>
    <div class="App bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] relative overflow-x-clip">
      <!-- Quiet Swiss background: column guides + grain -->
      <BackgroundSystem />

      <!-- Admin Panel Route -->
      <template v-if="currentRoute === 'admin'">
        <AdminPanel />
      </template>

      <!-- Project Loading State -->
      <template v-else-if="projectLoading">
        <div class="min-h-screen flex items-center justify-center relative z-20">
          <div class="flex flex-col items-center gap-5">
            <div class="w-24 h-px bg-[var(--border-color)] overflow-hidden relative">
              <div class="absolute inset-y-0 left-0 w-1/3 bg-[var(--accent)] animate-[swLoad_1.1s_ease-in-out_infinite]"></div>
            </div>
            <span class="sw-label">Loading project</span>
          </div>
        </div>
      </template>

      <!-- Project Error State -->
      <template v-else-if="projectError">
        <div class="min-h-screen flex items-center justify-center relative z-20 px-5">
          <div class="flex flex-col items-start gap-6 max-w-md w-full">
            <span class="sw-label">Error — 404</span>
            <p class="text-3xl font-heading tracking-tight leading-tight">{{ projectError }}</p>
            <button @click="goBack" class="btn-worth">← Back to portfolio</button>
          </div>
        </div>
      </template>

      <!-- Project Detail Route -->
      <template v-else-if="selectedProject">
        <ProjectDetail :project="selectedProject" :backAction="goBack" />
      </template>

      <!-- Main Portfolio -->
      <template v-else>
        <ScrollProgress />
        <NavBar />

        <main class="relative z-10 w-full">
          <section id="intro" class="relative w-full">
            <HeroIntro />
          </section>

          <section id="about" class="relative w-full">
            <IdentityNarrative />
          </section>

          <section id="works" class="relative w-full">
            <ProjectsShowcase />
          </section>

          <section id="stack" class="relative w-full">
            <TechSequence />
          </section>

          <section id="contact" class="relative w-full">
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
import BackgroundSystem from './components/BackgroundSystem.vue';
import ScrollProgress from './components/ScrollProgress.vue';
import NavBar from './components/NavBar.vue';
import HeroIntro from './components/HeroIntro.vue';
import ProjectsShowcase from './components/ProjectsShowcase.vue';
import IdentityNarrative from './components/IdentityNarrative.vue';
import TechSequence from './components/TechSequence.vue';
import ContactExperience from './components/ContactExperience.vue';
import ScrollToTop from './components/ScrollToTop.vue';
import LoadingScreenWrapper from './components/LoadingScreenWrapper.vue';
import { fetchProjectById } from './composables/useProjects';
import { useTheme } from './composables/useTheme';
import { useScrollReveal } from './composables/useScrollReveal';

const AdminPanel = defineAsyncComponent(() => import('./components/AdminPanel.vue'));
const ProjectDetail = defineAsyncComponent(() => import('./components/ProjectDetail.vue'));

const { initTheme } = useTheme();
const { scanAndObserve } = useScrollReveal();

const currentRoute = ref('home');
const selectedProject = ref(null);
const projectLoading = ref(false);
const projectError = ref(null);

const parseRoute = async () => {
  const path = window.location.pathname;

  if (path === '/admin' || path.startsWith('/admin')) {
    currentRoute.value = 'admin';
    selectedProject.value = null;
    return;
  }

  const match = path.match(/\/project\/(\d+)/);
  if (match) {
    currentRoute.value = 'project';
    projectLoading.value = true;
    projectError.value = null;
    try {
      selectedProject.value = await fetchProjectById(parseInt(match[1], 10));
    } catch (err) {
      projectError.value = err.message;
      selectedProject.value = null;
    } finally {
      projectLoading.value = false;
    }
    return;
  }

  currentRoute.value = 'home';
  selectedProject.value = null;
  projectError.value = null;
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
@keyframes swLoad {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(300%); }
}
</style>

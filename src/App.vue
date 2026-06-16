<template>
  <LoadingScreenWrapper>
    <div class="App">
      <!-- Global Interaction Components -->
      <CursorFollower />

      <!-- Animated Background Orbs -->
      <div class="animated-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>

      <!-- ── Admin Panel ──────────────────────── -->
      <template v-if="currentRoute === 'admin'">
        <AdminPanel />
      </template>

      <!-- ── Project loading spinner ─────────── -->
      <template v-else-if="projectLoading">
        <div class="min-h-screen flex items-center justify-center bg-[#050505]">
          <div class="flex flex-col items-center gap-4">
            <div class="w-8 h-8 border-2 border-[#ffffff] border-t-transparent rounded-full animate-spin"></div>
            <span class="font-mono text-xs text-[#A1A1AA]">// fetching project data</span>
          </div>
        </div>
      </template>

      <!-- ── Project error state ──────────────── -->
      <template v-else-if="projectError">
        <div class="min-h-screen flex items-center justify-center bg-[#050505]">
          <div class="text-center flex flex-col items-center gap-4">
            <i class="fa-solid fa-triangle-exclamation text-amber-400 text-3xl"></i>
            <p class="font-mono text-sm text-[#A1A1AA]">{{ projectError }}</p>
            <button @click="goBack" class="font-mono text-xs px-4 py-2 border border-[#ffffff]/40 text-[#ffffff] rounded hover:bg-[#ffffff]/10 transition-colors">
              $ cd ..
            </button>
          </div>
        </div>
      </template>

      <!-- ── Project detail ───────────────────── -->
      <template v-else-if="selectedProject">
        <ProjectDetail :project="selectedProject" :backAction="goBack" />
      </template>

      <!-- ── Main portfolio ───────────────────── -->
      <template v-else>
        <NavBar />
        <main>
          <Home />
          <Projects />
          <About />
          <Journey />
          <Capabilities />
          <Contact />
        </main>
        <ScrollToTop />
        <SpecialDayPopup />
      </template>
    </div>
  </LoadingScreenWrapper>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import NavBar               from './components/NavBar.vue';
import Home                 from './components/Home.vue';
import Projects             from './components/Projects.vue';
import About                from './components/About.vue';
import Journey              from './components/Journey.vue';
import Capabilities         from './components/Capabilities.vue';
import Contact              from './components/Contact.vue';
import ScrollToTop          from './components/ScrollToTop.vue';
import SpecialDayPopup      from './components/SpecialDayPopup.vue';
import LoadingScreenWrapper from './components/LoadingScreenWrapper.vue';
import ProjectDetail        from './components/ProjectDetail.vue';
import AdminPanel           from './components/AdminPanel.vue';
import CursorFollower       from './components/CursorFollower.vue';
import ScrollProgress       from './components/ScrollProgress.vue';
import { fetchProjectById } from './composables/useProjects';

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
};

const goBack = () => {
  window.history.pushState({}, '', '/');
  parseRoute();
};

onMounted(() => {
  parseRoute();
  window.addEventListener('popstate', parseRoute);
});

onUnmounted(() => {
  window.removeEventListener('popstate', parseRoute);
});
</script>

<style>
section {
  scroll-margin-top: 80px;
}
</style>

<template>
  <LoadingScreenWrapper>
    <div class="App">
      <!-- Animated Background Orbs -->
      <div class="animated-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>

      <template v-if="!selectedProject">
        <NavBar />
        
        <main>
          <Home />
          <Projects />
          <About />
          <Contact />
        </main>

        <ScrollToTop />
        <SpecialDayPopup />
      </template>

      <template v-else>
        <ProjectDetail :project="selectedProject" :backAction="goBack" />
      </template>
    </div>
  </LoadingScreenWrapper>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavBar from './components/NavBar.vue';
import Home from './components/Home.vue';
import Projects from './components/Projects.vue';
import About from './components/About.vue';
import Contact from './components/Contact.vue';
import ScrollToTop from './components/ScrollToTop.vue';
import SpecialDayPopup from './components/SpecialDayPopup.vue';
import LoadingScreenWrapper from './components/LoadingScreenWrapper.vue';
import ProjectDetail from './components/ProjectDetail.vue';
import { projectsData } from './data/projectsData';

const selectedProject = ref(null);

const parseRoute = () => {
  const path = window.location.pathname;
  const match = path.match(/\/project\/(\d+)/);
  if (match) {
    const id = parseInt(match[1]);
    selectedProject.value = projectsData.find(p => p.id === id);
  } else {
    selectedProject.value = null;
  }
};

const goBack = () => {
  window.history.pushState({}, '', '/');
  selectedProject.value = null;
};

onMounted(() => {
  parseRoute();
  window.addEventListener('popstate', parseRoute);
});
</script>

<style>
section {
  scroll-margin-top: 80px;
}
</style>

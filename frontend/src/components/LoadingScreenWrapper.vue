<template>
  <slot />
  <LoadingScreen
    v-if="isLoading"
    @loading-exiting="handleLoadingExiting"
    @loading-complete="handleLoadingComplete"
  />
</template>

<script setup>
import { ref, provide } from 'vue';
import LoadingScreen from './LoadingScreen.vue';

// Only skip loading screen on explicit /admin routes
const isAdminRoute = window.location.pathname.startsWith('/admin');

const isLoading = ref(!isAdminRoute);
const heroRevealReady = ref(isAdminRoute);

provide('heroRevealReady', heroRevealReady);

const handleLoadingExiting = () => {
  heroRevealReady.value = true;
};

const handleLoadingComplete = () => {
  heroRevealReady.value = true;
  isLoading.value = false;
};
</script>

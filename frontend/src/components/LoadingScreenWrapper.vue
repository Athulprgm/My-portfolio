<template>
  <slot />
  <LoadingScreen v-if="isLoading" @loading-complete="handleLoadingComplete" />
</template>

<script setup>
import { ref } from 'vue';
import LoadingScreen from './LoadingScreen.vue';

// Only skip loading screen on explicit /admin routes
const isAdminRoute = window.location.pathname.startsWith('/admin');

const isLoading = ref(!isAdminRoute);

const handleLoadingComplete = () => {
  isLoading.value = false;
};
</script>

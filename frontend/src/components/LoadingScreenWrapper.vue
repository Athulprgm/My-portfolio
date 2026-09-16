<template>
  <slot />
  <LoadingScreen v-if="isLoading" @loading-complete="handleLoadingComplete" />
</template>

<script setup>
import { ref } from 'vue';
import LoadingScreen from './LoadingScreen.vue';

const isLoading = ref(true);

const handleLoadingComplete = () => {
  isLoading.value = false;
};
</script>

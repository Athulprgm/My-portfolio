<template>
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
    <div class="absolute inset-0 bg-[var(--bg-primary)]"></div>

    <!-- Swiss column guides -->
    <div class="absolute inset-0 sw-container h-full">
      <div class="sw-grid h-full">
        <div
          v-for="n in 12"
          :key="n"
          class="h-full border-l border-[var(--grid-line)]"
          :class="[n > 4 ? 'hidden md:block' : '', n === 12 || n === 4 ? 'border-r md:border-r-0' : '', n === 12 ? 'md:border-r' : '']"
        ></div>
      </div>
    </div>

    <!-- Fine paper grain -->
    <div class="absolute inset-0 noise-overlay opacity-[0.035] dark:opacity-[0.05] mix-blend-multiply dark:mix-blend-screen"></div>
  </div>
</template>

<script setup>
</script>

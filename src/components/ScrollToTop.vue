<template>
  <div
    class="fixed bottom-10 right-8 z-40 transition-all duration-300 pointer-events-none opacity-0 translate-y-5"
    :class="{ 'opacity-100 translate-y-0 pointer-events-auto': isVisible }"
    @click="scrollToTop"
  >
    <div class="flex items-center gap-2.5 px-5 py-3 bg-[#121212] border border-[#2A2A2A] rounded font-mono text-xs text-white font-medium shadow-2xl cursor-pointer hover:border-indigo-500 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(99,102,241,0.2)] transition-all duration-300">
      <i class="fa-solid fa-arrow-up text-indigo-400"></i>
      <span>cd /top</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);

const toggleVisibility = () => {
  if (window.scrollY > 300) {
    isVisible.value = true;
  } else {
    isVisible.value = false;
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", toggleVisibility);
});

onUnmounted(() => {
  window.removeEventListener("scroll", toggleVisibility);
});
</script>

<template>
  <section class="py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden bg-[#0A0A0A] border-y border-[#2A2A2A]" id="capabilities">
    <div class="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-4">
      
      <!-- Section Title Label -->
      <div class="w-full md:w-1/4 flex-shrink-0 text-center md:text-left scroll-reveal" ref="titleRef">
        <h3 class="font-mono text-sm uppercase tracking-widest text-[#A1A1AA] font-semibold mb-2">// Selected</h3>
        <h2 class="font-mono text-2xl lg:text-3xl font-black text-white">Capabilities</h2>
      </div>

      <!-- Metrics Grid -->
      <div class="w-full md:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4">
        <div 
          v-for="(item, i) in capabilities" 
          :key="i"
          class="flex flex-col items-center md:items-start group scroll-reveal"
          :ref="el => { if(el) itemRefs[i] = el }"
          :style="{ transitionDelay: `${i * 0.15}s` }"
        >
          <div class="relative overflow-hidden mb-2">
            <!-- Glitch text effect on hover -->
            <span class="block font-mono text-4xl lg:text-5xl font-black text-white group-hover:text-[#ffffff] transition-colors duration-300">
              {{ item.metric }}
            </span>
          </div>
          <p class="font-sans text-[11px] lg:text-xs text-[#A1A1AA] uppercase tracking-widest font-semibold max-w-[120px] text-center md:text-left">
            {{ item.label }}
          </p>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const titleRef = ref(null);
const itemRefs = ref([]);

const capabilities = [
  { metric: 'MERN', label: 'Full Stack Development' },
  { metric: 'AI',   label: 'System Automation' },
  { metric: 'AWS',  label: 'Cloud Infrastructure' },
  { metric: 'API',  label: 'Backend Architecture' },
];

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  if (titleRef.value) observer.observe(titleRef.value);
  itemRefs.value.forEach(el => observer.observe(el));
});

onUnmounted(() => observer?.disconnect());
</script>

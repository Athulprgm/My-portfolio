<template>
  <div 
    class="dev-buddy-wrapper fixed bottom-10 left-8 z-40 flex flex-col items-start select-none no-print"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Dialogue Bubble -->
    <Transition name="bubble-fade">
      <div 
        v-if="showBubble && activeQuote" 
        class="dialogue-bubble mb-3 w-[230px] bg-neutral-900/95 backdrop-blur-md border border-white/8 rounded-xl p-3.5 shadow-2xl relative"
      >
        <!-- Dialogue Text -->
        <p class="font-mono text-[10.5px] leading-relaxed text-neutral-300 m-0">
          <span class="text-indigo-400 font-bold">// </span>{{ activeQuote }}
        </p>
        
        <!-- Speech Bubble Tail pointing down -->
        <div class="absolute bottom-[-5px] left-12 w-2.5 h-2.5 bg-neutral-900 border-r border-b border-white/8 rotate-45"></div>
      </div>
    </Transition>

    <!-- Mascot Video Container -->
    <div 
      class="mascot-container relative w-28 h-28 rounded-full border border-white/5 bg-neutral-950/40 backdrop-blur-xs cursor-pointer shadow-lg hover:border-indigo-500/40 transition-all duration-300 flex items-center justify-center overflow-hidden"
      :class="{ 'scale-105 shadow-[0_0_15px_rgba(99,102,241,0.25)]': isHovered, 'animate-bounce-subtle': !isHovered }"
      @click="triggerNewQuote"
    >
      <ChromaVideo
        class="w-full h-full object-cover rounded-full"
        src="/New folder/Transparent_character_animation_PNG_202605281117.mp4"
        :tolerance="75"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ChromaVideo from './ChromaVideo.vue';

const isHovered = ref(false);
const showBubble = ref(false);
const activeQuote = ref('');

const quotes = [
  "Let's build something epic today!",
  "Have you checked your console logs lately?",
  "Coffee status: ☕ [Active]. Writing clean code...",
  "Remember to compile before you commit!",
  "It's not a bug. It's an undocumented feature.",
  "MERN or Vue? Why not both! 🚀",
  "This portfolio runs on pure hope and clean loops.",
  "Errors are just steps towards compiling successfully.",
  "Code is poetry. Make every character count.",
  "0 bugs detected... well, so far!",
  "git branch -m 'perfect-design'",
  "Keep coding, you are doing awesome!"
];

let bubbleTimer = null;
let quoteCycleTimer = null;

const triggerNewQuote = () => {
  showBubble.value = false;
  
  setTimeout(() => {
    let newQuote;
    do {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (newQuote === activeQuote.value);
    
    activeQuote.value = newQuote;
    showBubble.value = true;

    // Auto hide bubble after 6 seconds
    if (bubbleTimer) clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => {
      showBubble.value = false;
    }, 6000);
  }, 200);
};

onMounted(() => {
  // Trigger initial quote after 3.5 seconds
  setTimeout(() => {
    triggerNewQuote();
  }, 3500);

  // Cycle quote every 25 seconds
  quoteCycleTimer = setInterval(() => {
    if (!isHovered.value) {
      triggerNewQuote();
    }
  }, 25000);
});

onUnmounted(() => {
  if (bubbleTimer) clearTimeout(bubbleTimer);
  if (quoteCycleTimer) clearInterval(quoteCycleTimer);
});
</script>

<style scoped>
.animate-bounce-subtle {
  animation: bounceSubtle 3s ease-in-out infinite;
}

@keyframes bounceSubtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.bubble-fade-enter-active,
.bubble-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.bubble-fade-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
}

.bubble-fade-leave-to {
  opacity: 0;
  transform: translateY(4px) scale(0.98);
}
</style>

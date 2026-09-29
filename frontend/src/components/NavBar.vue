<template>
  <header
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300 select-none"
    :class="scrolled 
      ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-color)] py-4' 
      : 'bg-transparent py-6'"
  >
    <div class="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
      
      <!-- Wordmark -->
      <a
        href="#intro"
        class="flex items-center gap-2 group cursor-pointer"
        @click.prevent="scrollToChapter('intro')"
      >
        <span class="font-sans-clean font-bold text-sm tracking-widest uppercase text-[var(--text-primary)]">
          ATHUL KRISHNA
        </span>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8 text-xs font-mono-clean uppercase tracking-wider">
        <button
          v-for="item in navLinks"
          :key="item.id"
          @click="scrollToChapter(item.id)"
          class="transition-colors cursor-pointer py-1"
          :class="activeChapter === item.id
            ? 'text-[var(--text-primary)] font-bold border-b border-[var(--text-primary)]'
            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'"
        >
          {{ item.label }}
        </button>
      </nav>

      <!-- Right: Theme Switcher & Contact Button -->
      <div class="flex items-center gap-3">
        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="px-2.5 py-1.5 border border-[var(--border-color)] hover:border-[var(--text-primary)] rounded-sm text-xs font-mono-clean text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer bg-[var(--bg-card)] flex items-center gap-1.5"
          :title="theme === 'light' ? 'Switch to Dark' : 'Switch to Light'"
        >
          <i :class="theme === 'light' ? 'fa-solid fa-moon text-xs' : 'fa-solid fa-sun text-xs text-amber-400'"></i>
          <span class="text-[10px] uppercase font-bold tracking-wider">{{ theme === 'light' ? 'DARK' : 'LIGHT' }}</span>
        </button>

        <!-- Minimal Contact CTA -->
        <button
          @click="scrollToChapter('contact')"
          class="btn-worth text-xs py-1.5 px-3.5 cursor-pointer"
        >
          <span>CONTACT</span>
        </button>

        <!-- Mobile Menu Toggle -->
        <button
          @click="mobileOpen = !mobileOpen"
          class="md:hidden p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-color)] rounded-sm text-xs font-mono-clean uppercase cursor-pointer"
        >
          {{ mobileOpen ? 'CLOSE' : 'MENU' }}
        </button>
      </div>

    </div>

    <!-- Mobile Drawer -->
    <Transition name="fade">
      <div
        v-if="mobileOpen"
        class="md:hidden fixed inset-x-0 top-[68px] bg-[var(--bg-primary)]/98 backdrop-blur-xl border-b border-[var(--border-color)] p-6 flex flex-col gap-4 shadow-xl z-50"
      >
        <button
          v-for="item in navLinks"
          :key="item.id"
          @click="scrollToChapter(item.id); mobileOpen = false"
          class="text-left py-2 text-xs font-mono-clean uppercase tracking-wider border-b border-[var(--border-color)]/40"
          :class="activeChapter === item.id ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-secondary)]'"
        >
          {{ item.label }}
        </button>

        <button
          @click="scrollToChapter('contact'); mobileOpen = false"
          class="w-full btn-worth py-2.5 text-center justify-center mt-2 cursor-pointer"
        >
          LET'S TALK →
        </button>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useTheme } from '../composables/useTheme';
import { useSmoothScroll } from '../composables/useSmoothScroll';

const { theme, toggleTheme } = useTheme();
const { scrollTo: smoothScrollTo } = useSmoothScroll();

const scrolled = ref(false);
const mobileOpen = ref(false);
const activeChapter = ref('intro');

const navLinks = [
  { id: 'intro', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'works', label: 'Works' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

const scrollToChapter = (id) => {
  smoothScrollTo('#' + id, { offset: -75, duration: 1.0 });
};

let scrollRaf = null;
const handleScroll = () => {
  if (scrollRaf) return;
  scrollRaf = requestAnimationFrame(() => {
    scrolled.value = window.scrollY > 20;

    if (window.scrollY < 200) {
      activeChapter.value = 'intro';
    } else {
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) {
            activeChapter.value = navLinks[i].id;
            break;
          }
        }
      }
    }
    scrollRaf = null;
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (scrollRaf) cancelAnimationFrame(scrollRaf);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

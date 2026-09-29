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

      <!-- Right: Social, Theme Switcher & Contact Button -->
      <div class="flex items-center gap-3">
        <!-- Direct Instagram Option Link -->
        <a
          href="https://www.instagram.com/_athul_krishnaa?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          class="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono-clean text-[var(--text-muted)] hover:text-[#E1306C] border border-[var(--border-color)] hover:border-[#E1306C] rounded-sm transition-all bg-[var(--bg-card)]"
          title="Instagram @_athul_krishnaa"
        >
          <svg class="w-3.5 h-3.5 fill-current text-[#E1306C]" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span class="hidden lg:inline text-[11px] font-semibold">@_athul_krishnaa</span>
        </a>

        <!-- Theme Toggle Pill -->
        <button
          @click="toggleTheme($event)"
          class="flex items-center gap-0.5 p-1 border border-[var(--border-color)] hover:border-[var(--text-primary)] rounded-full text-xs font-mono-clean transition-all cursor-pointer bg-[var(--bg-card)]"
          :title="theme === 'light' ? 'Switch to Dark mode' : 'Switch to Light mode'"
          aria-label="Toggle color theme"
        >
          <span
            class="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
            :class="theme === 'light' ? 'bg-[var(--accent-solid)] text-[var(--accent-text)] shadow-xs font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'"
          >
            <i class="fa-solid fa-sun text-[11px]"></i>
          </span>
          <span
            class="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
            :class="theme === 'dark' ? 'bg-[var(--accent-solid)] text-[var(--accent-text)] shadow-xs font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'"
          >
            <i class="fa-solid fa-moon text-[11px]"></i>
          </span>
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

        <!-- Direct Instagram Option in Mobile Drawer -->
        <a
          href="https://www.instagram.com/_athul_krishnaa?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          class="py-2.5 px-3 text-xs font-mono-clean uppercase tracking-wider border border-[var(--border-color)] rounded-sm text-[var(--text-primary)] flex items-center justify-between hover:border-[#E1306C] hover:text-[#E1306C]"
          @click="mobileOpen = false"
        >
          <span class="flex items-center gap-2">
            <svg class="w-3.5 h-3.5 fill-current text-[#E1306C]" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Instagram @_athul_krishnaa</span>
          </span>
          <span>↗</span>
        </a>

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

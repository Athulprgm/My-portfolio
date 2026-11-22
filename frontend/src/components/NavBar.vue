<template>
  <header
    class="fixed top-0 left-0 w-full z-50 select-none transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
    :class="hidden && !mobileOpen ? '-translate-y-full' : 'translate-y-0'"
  >
    <div
      class="transition-colors duration-500"
      :class="scrolled && !mobileOpen ? 'bg-[var(--bg-glass)] backdrop-blur-md border-b border-[var(--border-color)]' : 'border-b border-transparent'"
    >
      <div class="sw-container">
        <div class="sw-grid items-center h-16">
          <!-- Wordmark -->
          <a
            href="#intro"
            class="group col-span-2 md:col-span-3 font-heading font-medium text-[15px] tracking-[-0.02em] text-[var(--text-primary)] flex items-center gap-2.5"
            @click.prevent="scrollToChapter('intro')"
            aria-label="Athul Krishna — Home"
          >
            <span class="relative w-7 h-7 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] group-hover:border-[var(--accent)] overflow-hidden shrink-0 transition-colors duration-300">
              <picture>
                <source srcset="/avatar.webp" type="image/webp" />
                <img
                  src="/avatar.png"
                  alt="Athul Krishna"
                  width="56"
                  height="56"
                  class="w-full h-full object-cover object-top scale-110 translate-y-0.5 transition-transform duration-500 group-hover:scale-125"
                />
              </picture>
            </span>
            <span>
              Athul Krishna<sup class="text-[9px] text-[var(--text-muted)] font-mono-clean">©26</sup>
            </span>
          </a>

          <!-- Desktop links -->
          <nav class="hidden md:flex md:col-span-6 items-center gap-7" aria-label="Primary navigation">
            <button
              v-for="(item, idx) in navLinks.slice(1)"
              :key="item.id"
              @click="scrollToChapter(item.id)"
              class="group flex items-baseline gap-1.5 text-[13px] cursor-pointer"
              :class="activeChapter === item.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'"
            >
              <span class="font-mono-clean text-[9px]" :class="activeChapter === item.id ? 'text-[var(--accent)]' : ''">0{{ idx + 2 }}</span>
              <span class="sw-roll">
                <span><span>{{ item.label }}</span><span>{{ item.label }}</span></span>
              </span>
            </button>
          </nav>

          <!-- Right controls -->
          <div class="col-span-2 md:col-span-3 flex items-center justify-end gap-5">
            <button
              @click="toggleTheme($event)"
              class="group flex items-center gap-2 text-[12px] font-mono-clean uppercase tracking-[0.06em] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              :title="theme === 'light' ? 'Switch to dark' : 'Switch to light'"
              aria-label="Toggle color theme"
            >
              <span
                class="relative w-3.5 h-3.5 rounded-full border border-current overflow-hidden transition-transform duration-700"
                :class="theme === 'dark' ? 'rotate-180' : 'rotate-0'"
              >
                <span class="absolute inset-y-0 left-0 w-1/2 bg-current"></span>
              </span>
              <span class="hidden sm:inline">{{ theme === 'light' ? 'Dark' : 'Light' }}</span>
            </button>

            <button
              @click="scrollToChapter('contact')"
              class="hidden md:inline-flex group items-center gap-2 text-[13px] text-[var(--text-primary)] cursor-pointer"
            >
              <span class="sw-dot"></span>
              <span class="sw-link">Let's talk</span>
            </button>

            <!-- Mobile trigger -->
            <button
              @click="mobileOpen = !mobileOpen"
              class="md:hidden text-[12px] font-mono-clean uppercase tracking-[0.06em] text-[var(--text-primary)] cursor-pointer"
              :aria-expanded="mobileOpen"
              aria-label="Toggle navigation menu"
            >
              {{ mobileOpen ? 'Close' : 'Menu' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile full-screen menu -->
    <Transition name="menu">
      <div
        v-if="mobileOpen"
        class="md:hidden fixed inset-0 top-16 bg-[var(--bg-primary)] z-40 flex flex-col justify-between sw-container pb-8"
      >
        <nav class="flex flex-col pt-6">
          <button
            v-for="(item, idx) in navLinks"
            :key="item.id"
            @click="scrollToChapter(item.id); mobileOpen = false"
            class="flex items-baseline justify-between py-3 border-b border-[var(--border-color)] text-left cursor-pointer"
          >
            <span
              class="font-heading text-5xl tracking-[-0.045em] leading-none"
              :class="activeChapter === item.id ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'"
            >{{ item.label }}</span>
            <span class="sw-label">0{{ idx + 1 }}</span>
          </button>
        </nav>
        <div class="flex items-end justify-between sw-label">
          <span>Kerala, IN<br />{{ istTime }} IST</span>
          <a href="mailto:athul@trawbit.com" class="text-[var(--text-primary)]">athul@trawbit.com</a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useTheme } from '../composables/useTheme';
import { useSmoothScroll } from '../composables/useSmoothScroll';

const { theme, toggleTheme } = useTheme();
const { scrollTo: smoothScrollTo, registerScrollCallback, stopScroll, startScroll } = useSmoothScroll();

const scrolled = ref(false);
const hidden = ref(false);
const mobileOpen = ref(false);
const activeChapter = ref('intro');
const istTime = ref('');

const navLinks = [
  { id: 'intro', label: 'Index' },
  { id: 'about', label: 'About' },
  { id: 'works', label: 'Work' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

const updateClock = () => {
  try {
    istTime.value = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    istTime.value = '--:--';
  }
};

const scrollToChapter = (id) => {
  if (id === 'intro') {
    smoothScrollTo(0, { offset: 0, duration: 1.2 });
    return;
  }
  smoothScrollTo('#' + id, { offset: 0, duration: 1.2 });
};

let scrollRaf = null;
let unregisterScroll = null;
let clockInterval = null;
let lastY = 0;

const handleScroll = () => {
  if (scrollRaf) return;
  scrollRaf = requestAnimationFrame(() => {
    const y = window.scrollY;
    scrolled.value = y > 24;
    hidden.value = y > 160 && y > lastY + 2;
    if (y < lastY - 2) hidden.value = false;
    lastY = y;

    if (y < window.innerHeight * 0.45) {
      activeChapter.value = 'intro';
    } else {
      for (let i = navLinks.length - 1; i >= 1; i--) {
        const el = document.getElementById(navLinks[i].id);
        if (el && el.getBoundingClientRect().top <= 240) {
          activeChapter.value = navLinks[i].id;
          break;
        }
      }
    }
    scrollRaf = null;
  });
};

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && mobileOpen.value) mobileOpen.value = false;
};

watch(mobileOpen, (open) => {
  if (open) stopScroll?.();
  else startScroll?.();
});

onMounted(() => {
  updateClock();
  clockInterval = setInterval(updateClock, 30000);
  unregisterScroll = registerScrollCallback(handleScroll);
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('keydown', handleKeyDown);
  handleScroll();
});

onUnmounted(() => {
  if (clockInterval) clearInterval(clockInterval);
  if (unregisterScroll) unregisterScroll();
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('keydown', handleKeyDown);
  if (scrollRaf) cancelAnimationFrame(scrollRaf);
});
</script>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.4s cubic-bezier(0.65, 0, 0.35, 1), clip-path 0.6s cubic-bezier(0.65, 0, 0.35, 1);
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  clip-path: inset(0 0 100% 0);
}
.menu-enter-to,
.menu-leave-from {
  clip-path: inset(0 0 0 0);
}
</style>

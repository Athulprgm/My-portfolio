<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 transition-all duration-500"
    :class="scrolled ? 'h-14 bg-neutral-950/85 backdrop-blur-xl border-b border-white/6 shadow-[0_1px_30px_rgba(0,0,0,0.4)]' : 'h-18 bg-transparent'"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 h-full flex justify-between items-center">

      <!-- Logo -->
      <a
        href="#home"
        class="flex items-center gap-1 hover:opacity-80 transition-opacity duration-200 select-none"
        @click.prevent="scrollToSection('home')"
      >
        <span class="font-mono text-base font-black text-white tracking-tight">athulkrishna</span>
        <span class="font-mono text-base font-black text-indigo-400 tracking-tight">.online</span>
        <span class="ml-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#4ade80] animate-pulse"></span>
      </a>

      <!-- Desktop nav -->
      <ul class="hidden md:flex items-center gap-1 list-none m-0 p-0">
        <li v-for="item in navItems" :key="item.id">
          <a
            :href="`#${item.id}`"
            class="relative px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-all duration-200 rounded-md flex items-center gap-1.5"
            :class="activeSection === item.id
              ? 'text-white bg-white/5'
              : 'text-neutral-500 hover:text-neutral-200 hover:bg-white/3'"
            @click.prevent="scrollToSection(item.id)"
          >
            <span
              class="font-bold transition-opacity duration-200"
              :class="activeSection === item.id ? 'text-indigo-400 opacity-100' : 'text-indigo-500 opacity-0 group-hover:opacity-100'"
            >/ </span>
            {{ item.label }}
            <!-- Active underline -->
            <span
              v-if="activeSection === item.id"
              class="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
            ></span>
          </a>
        </li>

        <!-- Resume button -->
        <li class="ml-2">
          <a
            :href="resumeUrl"
            download="Athul_Krishna_Resume.pdf"
            class="flex items-center gap-2 px-4 py-1.5 bg-indigo-600/90 hover:bg-indigo-500 border border-indigo-500/50 rounded-lg text-white font-mono text-[11px] tracking-wider hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all duration-200"
          >
            <i class="fa-solid fa-cloud-arrow-down text-[10px]"></i>
            Resume
          </a>
        </li>
      </ul>

      <!-- Mobile toggle -->
      <button
        class="md:hidden text-neutral-300 hover:text-white text-xl cursor-pointer bg-white/5 w-9 h-9 rounded-lg flex items-center justify-center transition-all"
        @click="menuOpen = !menuOpen"
      >
        <i class="fa-solid transition-all duration-300" :class="menuOpen ? 'fa-xmark' : 'fa-bars'"></i>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="menu-slide">
      <div
        v-if="menuOpen"
        class="md:hidden fixed left-0 w-full bg-neutral-950/98 backdrop-blur-xl border-b border-white/5 flex flex-col py-6 px-6 gap-2 transition-all duration-500"
        :class="scrolled ? 'top-14' : 'top-18'"
      >
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="font-mono text-sm py-3 px-4 rounded-lg transition-all duration-200"
          :class="activeSection === item.id
            ? 'text-white bg-indigo-600/15 border border-indigo-500/30'
            : 'text-neutral-400 hover:text-white hover:bg-white/5'"
          @click.prevent="scrollToSection(item.id); menuOpen = false"
        >
          <span class="text-indigo-400 mr-2">./</span>{{ item.label }}
        </a>
        <a
          :href="resumeUrl"
          download="Athul_Krishna_Resume.pdf"
          class="mt-2 flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 rounded-lg text-white font-mono text-sm font-semibold hover:bg-indigo-500 transition-colors"
        >
          <i class="fa-solid fa-cloud-arrow-down"></i> Download Resume
        </a>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const menuOpen = ref(false);
const scrolled = ref(false);
const activeSection = ref('home');

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'project', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const base = import.meta.env.BASE_URL || '/';
const resumeUrl = `${base}Athul_Krishna_Resume.pdf`;

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
  }
};

const handleScroll = () => {
  scrolled.value = window.scrollY > 40;
  const sections = ['home', 'project', 'about', 'contact'];
  const scrollPos = window.scrollY + 200;
  for (let i = sections.length - 1; i >= 0; i--) {
    const sec = document.getElementById(sections[i]);
    if (sec && sec.offsetTop <= scrollPos) { activeSection.value = sections[i]; break; }
  }
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped>
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

<template>
  <nav
    class="fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full border border-white/10 backdrop-blur-xl shadow-2xl flex items-center"
    :class="scrolled ? 'top-4 w-[90%] lg:w-max h-14 bg-black/60' : 'top-6 w-[95%] lg:w-max h-16 bg-black/30'"
  >
    <div class="w-full lg:w-auto px-5 lg:px-8 h-full flex justify-between items-center lg:gap-16">

      <!-- Logo -->
      <a
        href="#home"
        class="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 select-none"
        @click.prevent="scrollToSection('home')"
      >
        <span class="font-mono text-base font-black text-white tracking-tight">athulkrishna</span>
        <span class="font-mono text-base font-black text-[#A1A1AA] tracking-tight">.online</span>
        <span class="w-2 h-4 bg-white animate-pulse"></span>
      </a>

      <!-- Desktop nav -->
      <ul class="hidden md:flex items-center gap-1 list-none m-0 p-0">
        <li v-for="item in navItems" :key="item.id">
          <a
            :href="`#${item.id}`"
            class="relative px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-all duration-300 rounded-full flex items-center gap-1.5 border border-transparent"
            :class="activeSection === item.id
              ? 'text-white border-white/20 bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]'
              : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'"
            @click.prevent="scrollToSection(item.id)"
          >
            <span
              class="font-bold transition-opacity duration-200"
              :class="activeSection === item.id ? 'text-white opacity-100' : 'opacity-0 group-hover:opacity-100'"
            >> </span>
            {{ item.label }}
          </a>
        </li>

        <!-- Resume button -->
        <li class="ml-4">
          <button
            @click="openCvModal"
            class="flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40 active:scale-95 font-mono text-[10px] tracking-wider transition-all cursor-pointer rounded-full uppercase font-black backdrop-blur-sm"
          >
            <i class="fa-solid fa-cloud-arrow-down"></i>
            RESUME
          </button>
        </li>
      </ul>

      <!-- Mobile toggle -->
      <button
        class="md:hidden text-[#A1A1AA] hover:text-white text-xl cursor-pointer bg-white/5 border border-white/10 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10 active:scale-95"
        @click="menuOpen = !menuOpen"
      >
        <i class="fa-solid transition-all duration-300" :class="menuOpen ? 'fa-xmark' : 'fa-bars'"></i>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="menu-slide">
      <div
        v-if="menuOpen"
        class="md:hidden fixed left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-black/80 backdrop-blur-xl border border-white/10 flex flex-col py-6 px-6 gap-3 transition-all duration-500 rounded-3xl shadow-2xl z-40"
        :class="scrolled ? 'top-24' : 'top-28'"
      >
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="font-mono text-[10px] py-4 px-5 rounded-2xl transition-all duration-300 border"
          :class="activeSection === item.id
            ? 'text-white border-white/20 bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
            : 'text-[#A1A1AA] border-transparent hover:text-white hover:bg-white/5'"
          @click.prevent="scrollToSection(item.id); menuOpen = false"
        >
          <span class="text-white mr-2">></span>{{ item.label }}
        </a>
        <button
          @click="openCvModal"
          class="mt-2 flex items-center justify-center gap-2 py-4 px-4 bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40 active:scale-95 font-mono text-[10px] font-black uppercase transition-all cursor-pointer rounded-2xl backdrop-blur-md"
        >
          <i class="fa-solid fa-cloud-arrow-down"></i> RESUME
        </button>
      </div>
    </Transition>
  </nav>

  <!-- CV Selection Modal -->
  <Transition name="modal">
    <div
      v-if="showCvModal"
      class="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 animate-fade-in"
      @click.self="showCvModal = false"
    >
      <div class="bg-[#0A0A0A] border-2 border-white rounded-none w-full max-w-md shadow-[8px_8px_0_rgba(255,255,255,0.1)] p-6 relative overflow-hidden transform transition-all duration-300">

        <!-- Header -->
        <div class="flex items-center justify-between mb-6 pb-4 border-b-2 border-[#2A2A2A] relative z-10">
          <div>
            <h3 class="font-mono text-[10px] font-bold text-white flex items-center gap-2 uppercase">
              <i class="fa-solid fa-file-pdf"></i>
              SELECT CV FILE
            </h3>
            <p class="font-mono text-[8px] text-[#A1A1AA] mt-2">// choose profile.exe</p>
          </div>
          <button @click="showCvModal = false" class="text-[#A1A1AA] hover:text-white transition-colors cursor-pointer w-8 h-8 flex items-center justify-center border border-transparent hover:border-[#2A2A2A] rounded-none bg-[#121212]">
            <i class="fa-solid fa-times text-sm"></i>
          </button>
        </div>

        <!-- Content -->
        <div class="relative z-10">
          <!-- Loading State -->
          <div v-if="loadingCvs" class="flex flex-col items-center justify-center py-10 gap-3">
            <div class="w-8 h-8 border-4 border-[#2A2A2A] border-t-white rounded-none animate-spin"></div>
            <span class="font-mono text-[8px] text-[#A1A1AA] uppercase animate-pulse">Loading_System...</span>
          </div>

          <!-- Error State -->
          <div v-else-if="cvsError" class="text-center py-6 border border-[#2A2A2A] bg-[#121212] p-4">
            <i class="fa-solid fa-triangle-exclamation text-white text-lg mb-2 block animate-pulse"></i>
            <p class="font-mono text-[8px] text-[#A1A1AA] uppercase">SYSTEM_ERROR: {{ cvsError }}</p>
            <button @click="openCvModal" class="mt-4 px-6 py-2 bg-[#121212] text-white font-black uppercase text-[8px] hover:bg-[#2A2A2A] hover:border-white transition-colors rounded-none border-b-2 border-r-2 border-[#2A2A2A] active:border-0 active:translate-y-0.5">
              REBOOT
            </button>
          </div>

          <!-- Empty State -->
          <div v-else-if="cvsList.length === 0" class="text-center py-8 border border-[#2A2A2A] bg-[#121212]">
            <i class="fa-solid fa-folder-open text-[#A1A1AA] text-xl mb-2 block"></i>
            <p class="font-mono text-[9px] text-white uppercase">DIRECTORY_EMPTY</p>
            <p class="font-mono text-[7px] text-[#A1A1AA] mt-2">Add profiles in admin.</p>
          </div>

          <!-- CV List -->
          <div v-else class="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
            <div
              v-for="cv in cvsList"
              :key="cv.id"
              class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#121212] border border-[#2A2A2A] hover:border-white rounded-none transition-all group gap-4"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-white text-black flex items-center justify-center rounded-none group-hover:scale-110 transition-transform">
                  <i class="fa-solid fa-file-pdf text-xs"></i>
                </div>
                <span class="font-mono text-[8px] font-bold text-white group-hover:text-white transition-colors uppercase tracking-widest leading-loose">
                  {{ cv.title }}
                </span>
              </div>

              <div class="flex gap-2 w-full sm:w-auto">
                <!-- View Button -->
                <a
                  :href="getImageUrl(cv.file_path)"
                  target="_blank"
                  class="flex-1 sm:flex-none flex items-center justify-center px-3 py-2 border border-[#2A2A2A] rounded-none text-[#A1A1AA] hover:text-white hover:border-white transition-all text-[8px] hover:bg-[#2A2A2A] uppercase font-bold"
                  title="View CV"
                >
                  <i class="fa-solid fa-eye mr-2 sm:mr-0"></i><span class="sm:hidden">VIEW</span>
                </a>
                <!-- Download Button -->
                <a
                  :href="getImageUrl(cv.file_path)"
                  download
                  target="_blank"
                  class="flex-1 sm:flex-none flex items-center justify-center px-3 py-2 bg-[#121212] text-white hover:bg-[#2A2A2A] hover:border-white rounded-none border-b-2 border-r-2 border-[#2A2A2A] active:border-0 active:translate-y-0.5 active:translate-x-0.5 transition-all text-[8px] font-black uppercase"
                  title="Download CV"
                >
                  <i class="fa-solid fa-download mr-2 sm:mr-0"></i><span class="sm:hidden">DL</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { getImageUrl } from '../utils/api';
import { getCvs } from '../composables/useCvs';

const menuOpen = ref(false);
const scrolled = ref(false);
const activeSection = ref('home');

const showCvModal = ref(false);
const cvsList = ref([]);
const loadingCvs = ref(false);
const cvsError = ref(null);

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'project', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const openCvModal = async () => {
  showCvModal.value = true;
  menuOpen.value    = false;
  loadingCvs.value  = true;
  cvsError.value    = null;
  try {
    cvsList.value = await getCvs();
  } catch (e) {
    console.error('Failed to load CVs:', e);
    cvsError.value = 'Failed to load CVs. Please try again.';
  } finally {
    loadingCvs.value = false;
  }
};

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
  }
};

// Throttle scroll handler to one update per animation frame to avoid
// layout thrashing (offsetTop forces reflow on every call).
let _scrollRafId = null;
const handleScroll = () => {
  if (_scrollRafId) return;
  _scrollRafId = requestAnimationFrame(() => {
    _scrollRafId = null;
    scrolled.value = window.scrollY > 40;
    const sections = ['home', 'project', 'about', 'contact'];
    const scrollPos = window.scrollY + 200;
    for (let i = sections.length - 1; i >= 0; i--) {
      const sec = document.getElementById(sections[i]);
      if (sec && sec.offsetTop <= scrollPos) { activeSection.value = sections[i]; break; }
    }
  });
};

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }));
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (_scrollRafId) cancelAnimationFrame(_scrollRafId);
});
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

/* Modal transition */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
.modal-enter-active .transform, .modal-leave-active .transform {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-enter-from .transform, .modal-leave-to .transform {
  transform: scale(0.95) translateY(-8px);
}
</style>

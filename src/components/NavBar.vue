<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 transition-all duration-500"
    :class="scrolled ? 'h-14 bg-[#0A0A0A] backdrop-blur-xl border-b border-[#2A2A2A] shadow-[0_1px_30px_rgba(0,0,0,0.4)]' : 'h-18 bg-transparent'"
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
              ? 'text-white bg-[#2A2A2A]'
              : 'text-[#A1A1AA] hover:text-neutral-200 hover:bg-[#2A2A2A]'"
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
          <button
            @click="openCvModal"
            class="flex items-center gap-2 px-4 py-1.5 bg-indigo-600/90 hover:bg-indigo-500 border border-indigo-500/50 rounded-lg text-white font-mono text-[11px] tracking-wider hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <i class="fa-solid fa-cloud-arrow-down text-[10px]"></i>
            Resume
          </button>
        </li>
      </ul>

      <!-- Mobile toggle -->
      <button
        class="md:hidden text-[#A1A1AA] hover:text-white text-xl cursor-pointer bg-[#2A2A2A] w-9 h-9 rounded-lg flex items-center justify-center transition-all"
        @click="menuOpen = !menuOpen"
      >
        <i class="fa-solid transition-all duration-300" :class="menuOpen ? 'fa-xmark' : 'fa-bars'"></i>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="menu-slide">
      <div
        v-if="menuOpen"
        class="md:hidden fixed left-0 w-full bg-[#0A0A0A] backdrop-blur-xl border-b border-[#2A2A2A] flex flex-col py-6 px-6 gap-2 transition-all duration-500"
        :class="scrolled ? 'top-14' : 'top-18'"
      >
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="font-mono text-sm py-3 px-4 rounded-lg transition-all duration-200"
          :class="activeSection === item.id
            ? 'text-white bg-indigo-600/15 border border-indigo-500/30'
            : 'text-[#A1A1AA] hover:text-white hover:bg-[#2A2A2A]'"
          @click.prevent="scrollToSection(item.id); menuOpen = false"
        >
          <span class="text-indigo-400 mr-2">./</span>{{ item.label }}
        </a>
        <button
          @click="openCvModal"
          class="mt-2 flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 rounded-lg text-white font-mono text-sm font-semibold hover:bg-indigo-500 transition-colors cursor-pointer"
        >
          <i class="fa-solid fa-cloud-arrow-down"></i> Resume
        </button>
      </div>
    </Transition>
  </nav>

  <!-- CV Selection Modal -->
  <Transition name="modal">
    <div
      v-if="showCvModal"
      class="fixed inset-0 z-[100] bg-[#0A0A0A] backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      @click.self="showCvModal = false"
    >
      <div class="bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl w-full max-w-md shadow-2xl p-6 relative overflow-hidden transform transition-all duration-300">
        <!-- Neon background glows -->
        <div class="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Header -->
        <div class="flex items-center justify-between mb-6 pb-4 border-b border-[#2A2A2A] relative z-10">
          <div>
            <h3 class="font-mono text-sm font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-file-pdf text-indigo-400"></i>
              Select Resume / CV
            </h3>
            <p class="font-mono text-[10px] text-[#A1A1AA] mt-0.5">// choose developer profile</p>
          </div>
          <button @click="showCvModal = false" class="text-[#A1A1AA] hover:text-white transition-colors cursor-pointer w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#2A2A2A]">
            <i class="fa-solid fa-times text-sm"></i>
          </button>
        </div>

        <!-- Content -->
        <div class="relative z-10">
          <!-- Loading State -->
          <div v-if="loadingCvs" class="flex flex-col items-center justify-center py-10 gap-3">
            <div class="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span class="font-mono text-[11px] text-[#A1A1AA]">Loading CV profiles...</span>
          </div>

          <!-- Error State -->
          <div v-else-if="cvsError" class="text-center py-6">
            <i class="fa-solid fa-triangle-exclamation text-red-400 text-lg mb-2 block"></i>
            <p class="font-mono text-xs text-red-300">{{ cvsError }}</p>
            <button @click="openCvModal" class="mt-4 px-4 py-1.5 bg-[#121212] border border-[#2A2A2A] rounded-lg text-[#A1A1AA] hover:text-white text-xs font-mono transition-colors">
              Retry
            </button>
          </div>

          <!-- Empty State -->
          <div v-else-if="cvsList.length === 0" class="text-center py-8">
            <i class="fa-solid fa-folder-open text-[#A1A1AA] text-xl mb-2 block"></i>
            <p class="font-mono text-xs text-[#A1A1AA]">No CVs found</p>
            <p class="font-sans text-[10px] text-[#A1A1AA] mt-1">Add profiles in the admin panel.</p>
          </div>

          <!-- CV List -->
          <div v-else class="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-1">
            <div
              v-for="cv in cvsList"
              :key="cv.id"
              class="flex items-center justify-between p-3.5 bg-[#121212] border border-[#2A2A2A] hover:border-indigo-500/30 rounded-xl transition-all group"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-indigo-950/40 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-600/10 transition-colors">
                  <i class="fa-solid fa-file-pdf text-indigo-400 text-xs"></i>
                </div>
                <span class="font-mono text-xs font-medium text-neutral-200 group-hover:text-white transition-colors">
                  {{ cv.title }}
                </span>
              </div>

              <div class="flex gap-2">
                <!-- View Button -->
                <a
                  :href="getImageUrl(cv.file_path)"
                  target="_blank"
                  class="flex items-center justify-center w-8 h-8 border border-[#2A2A2A] rounded-lg text-[#A1A1AA] hover:text-white hover:border-[#2A2A2A] transition-all text-xs hover:bg-[#2A2A2A]"
                  title="View CV"
                >
                  <i class="fa-solid fa-eye"></i>
                </a>
                <!-- Download Button -->
                <a
                  :href="getImageUrl(cv.file_path)"
                  download
                  target="_blank"
                  class="flex items-center justify-center w-8 h-8 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition-all text-xs shadow-md shadow-indigo-600/10"
                  title="Download CV"
                >
                  <i class="fa-solid fa-download"></i>
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
import apiClient, { getImageUrl } from '../utils/api';

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
  menuOpen.value = false;
  if (cvsList.value.length === 0) {
    loadingCvs.value = true;
    cvsError.value = null;
    try {
      const res = await apiClient.get('/cvs');
      cvsList.value = res.data;
    } catch (e) {
      console.error('Failed to fetch CVs:', e);
      cvsError.value = 'Failed to load CVs. Please try again.';
    } finally {
      loadingCvs.value = false;
    }
  }
};

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

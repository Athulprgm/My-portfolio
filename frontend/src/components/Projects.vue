<template>
  <section class="py-28 sm:py-36 px-6 sm:px-8 border-b border-[#1E1E1E] bg-black text-white" id="work">
    <div class="max-w-7xl mx-auto">

      <!-- Section Header with Technical Eyebrow & Filter Bar -->
      <div class="mb-16 sm:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 scroll-reveal">
        <div class="flex flex-col items-start max-w-2xl">
          <div class="text-[11px] font-mono tracking-[0.2em] text-[#10B981] font-bold mb-3 uppercase flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-[#10B981]"></span>
            <span>03 / SELECTED CLIENT &amp; PRODUCT WORK</span>
          </div>
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            FEATURED PROJECTS
          </h2>
          <p class="text-lg text-[#888888] font-normal leading-relaxed">
            Real commercial platforms, mobile applications, and business software engineered to drive growth and streamline operations.
          </p>
        </div>

        <!-- Interactive Category Filter Tabs (Sharp Glassmorphic Rectangles) -->
        <div class="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="selectedCategory = cat.id"
            class="px-4 py-2 border transition-all uppercase cursor-pointer"
            :class="selectedCategory === cat.id
              ? 'bg-white text-black font-bold border-white shadow-[0_0_20px_rgba(255,255,255,0.25)]'
              : 'glass-panel text-[#888888] hover:text-white hover:border-white/30 border-white/10'"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>

      <!-- Ambient Glow Orbs for Glass Refraction -->
      <div class="relative">
        <div class="absolute top-1/4 -left-48 w-96 h-96 bg-[#10B981]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="absolute top-3/4 -right-48 w-96 h-96 bg-[#06B6D4]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <!-- Large Editorial Case-Study Blocks with Alternating Slide Animation -->
        <div class="space-y-24 sm:space-y-36 relative z-10">

        <article
          v-for="(project, index) in filteredProjects"
          :key="project.title"
          class="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
        >
          <!-- Editorial Visual Mockup (Alternates Left / Right) -->
          <div
            class="glass-panel border-white/15 hover:border-white/40 cursor-pointer editorial-img-wrap shadow-2xl transition-all duration-500 hover:-translate-y-1.5 box-hover-slide"
            :class="[
              index % 2 === 0 ? 'order-2 lg:order-1 lg:col-span-7 scroll-reveal-left' : 'order-2 lg:col-span-7 scroll-reveal-right'
            ]"
            @click="openProject(project)"
          >
            <!-- Browser Header -->
            <div class="flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-md border-b border-white/10 text-xs font-mono text-[#666666]">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-[#222222] border border-[#333333]"></span>
                <span class="w-2 h-2 bg-[#222222] border border-[#333333]"></span>
                <span class="w-2 h-2 bg-[#222222] border border-[#333333]"></span>
                <span class="ml-2 text-[10px] text-white font-mono uppercase">{{ project.domain }}</span>
              </div>
              <div class="flex items-center gap-2 text-[10px] font-mono text-[#10B981]">
                <span class="w-1.5 h-1.5 bg-[#10B981]"></span>
                <span>{{ project.status }}</span>
              </div>
            </div>

            <!-- Image Viewport with Hover Overlay -->
            <div class="relative w-full aspect-[16/10] bg-black overflow-hidden flex items-center justify-center p-6 sm:p-10 group/img">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover shadow-2xl border border-[#222222] transition-transform duration-700 group-hover/img:scale-105"
                @error="onImageError($event, index)"
              />

              <!-- Overlay Vignette -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/80 via-transparent to-transparent pointer-events-none"></div>

              <!-- Interactive Floating Overlay on Hover -->
              <div class="absolute inset-0 bg-black/50 backdrop-blur-[4px] opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <div class="px-5 py-2.5 glass-panel border-white text-white font-mono text-xs uppercase tracking-wider font-bold shadow-2xl">
                  EXPLORE PROJECT DETAILS ↗
                </div>
              </div>

              <!-- Floating Impact Metric Chip (Glassmorphic) -->
              <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono pointer-events-none">
                <div class="px-3 py-1.5 glass-panel border-[#10B981]/40 text-[#10B981] flex items-center gap-2 shadow-lg">
                  <span class="w-1.5 h-1.5 bg-[#10B981]"></span>
                  <span>{{ project.metric }}</span>
                </div>
                <div class="px-3 py-1.5 glass-panel border-white/10 text-[#888888] hidden sm:block">
                  {{ project.categoryLabel }}
                </div>
              </div>
            </div>
          </div>

          <!-- Editorial Meta & Story (Alternates Right / Left) -->
          <div
            class="flex flex-col items-start"
            :class="[
              index % 2 === 0 ? 'order-1 lg:order-2 lg:col-span-5 scroll-reveal-right' : 'order-1 lg:col-span-5 scroll-reveal-left'
            ]"
          >
            <!-- Project Number & Tags -->
            <div class="text-xs font-mono tracking-widest text-[#10B981] font-semibold mb-3 uppercase flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-[#10B981]"></span>
              <span>PROJECT {{ project.index }} · {{ project.tags }}</span>
            </div>

            <h3 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              {{ project.title }}
            </h3>
            <div class="text-sm font-mono text-[#888888] uppercase tracking-wider mb-6">
              {{ project.subtitle }}
            </div>

            <p class="text-base text-[#888888] leading-relaxed mb-6">
              {{ project.description }}
            </p>

            <!-- Key Feature Badges (Client-Friendly Glassmorphic) -->
            <div class="flex flex-wrap gap-2 mb-8">
              <span
                v-for="feature in project.features"
                :key="feature"
                class="px-3 py-1 glass-panel border-white/10 text-[11px] font-mono text-white"
              >
                {{ feature }}
              </span>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-4">
              <button
                @click="openProject(project)"
                class="btn-slide-fill px-6 py-3 text-xs font-bold tracking-wider uppercase flex items-center gap-2 group/btn cursor-pointer"
              >
                <span>VIEW CASE STUDY</span>
                <span class="arrow-slide">→</span>
              </button>

              <button
                @click="openProject(project)"
                class="px-4 py-3 border border-[#222222] bg-[#0A0A0A] hover:border-white text-xs font-mono text-[#888888] hover:text-white transition-colors cursor-pointer"
              >
                DETAILS
              </button>
            </div>
          </div>
        </article>

        </div>
      </div>

      <!-- Additional Curated Work Link -->
      <div class="mt-28 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#888888] scroll-reveal">
        <div class="flex items-center gap-2">
          <span class="text-[#10B981]">//</span>
          <span>LOOKING TO BUILD A CUSTOM PLATFORM OR MOBILE APPLICATION?</span>
        </div>
        <button
          @click="scrollToContactAndClose"
          class="text-white hover:text-[#10B981] transition-colors uppercase font-bold flex items-center gap-2 group cursor-pointer"
        >
          <span>START A PROJECT DISCUSSION</span>
          <span class="arrow-slide">→</span>
        </button>
      </div>

    </div>

    <!-- ══════════════════ CLIENT-FRIENDLY CASE STUDY MODAL ══════════════════ -->
    <Transition name="case-study-modal">
      <div
        v-if="activeCaseStudy"
        class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        @click.self="activeCaseStudy = null"
      >
        <div class="modal-card glass-panel border-white/20 max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative">
          <!-- Close Button -->
          <button
            @click="activeCaseStudy = null"
            class="absolute top-6 right-6 text-[#888888] hover:text-white text-xs font-mono uppercase tracking-wider cursor-pointer border border-[#222222] hover:border-white px-2.5 py-1.5 transition-colors"
          >
            [CLOSE ×]
          </button>

          <!-- Top Meta -->
          <div class="text-xs font-mono text-[#10B981] uppercase tracking-widest mb-2 font-semibold flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-[#10B981]"></span>
            <span>CASE STUDY // {{ activeCaseStudy.tags }}</span>
          </div>

          <h3 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            {{ activeCaseStudy.title }}
          </h3>
          <p class="text-sm font-mono text-[#888888] uppercase tracking-wider mb-8">
            {{ activeCaseStudy.subtitle }}
          </p>

          <!-- Modal Image Frame -->
          <div class="aspect-video w-full bg-black border border-[#222222] mb-8 overflow-hidden relative">
            <img :src="activeCaseStudy.image" :alt="activeCaseStudy.title" class="w-full h-full object-cover" />
            <div class="absolute bottom-3 left-3 px-3 py-1 bg-black/90 border border-[#222222] text-xs font-mono text-[#10B981]">
              KEY RESULT: {{ activeCaseStudy.metric }}
            </div>
          </div>

          <!-- Client-Centric Story -->
          <div class="space-y-6 text-sm sm:text-base text-[#888888] leading-relaxed">
            <div>
              <h4 class="text-xs font-mono text-white uppercase tracking-wider mb-2 font-bold flex items-center gap-2">
                <span class="text-[#10B981]">[01]</span>
                <span>The Client Challenge</span>
              </h4>
              <p>{{ activeCaseStudy.details.problem }}</p>
            </div>

            <div>
              <h4 class="text-xs font-mono text-white uppercase tracking-wider mb-2 font-bold flex items-center gap-2">
                <span class="text-[#10B981]">[02]</span>
                <span>What I Designed &amp; Delivered</span>
              </h4>
              <p>{{ activeCaseStudy.details.solution }}</p>
            </div>

            <div>
              <h4 class="text-xs font-mono text-white uppercase tracking-wider mb-2 font-bold flex items-center gap-2">
                <span class="text-[#10B981]">[03]</span>
                <span>Delivered Features &amp; Capabilities</span>
              </h4>
              <div class="flex flex-wrap gap-2 mt-2">
                <span
                  v-for="t in activeCaseStudy.features"
                  :key="t"
                  class="px-3 py-1 bg-black border border-[#222222] text-xs font-mono text-white"
                >
                  ✓ {{ t }}
                </span>
              </div>
            </div>
          </div>

          <!-- Bottom Modal Actions -->
          <div class="mt-10 pt-6 border-t border-[#222222] flex items-center justify-between">
            <button
              @click="activeCaseStudy = null"
              class="text-xs font-mono uppercase text-[#888888] hover:text-white cursor-pointer"
            >
              ← Back to Overview
            </button>
            <button
              @click="scrollToContactAndClose"
              class="btn-slide-fill px-6 py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Start Similar Project →
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeCaseStudy = ref(null);
const selectedCategory = ref('all');

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'saas', label: 'Business Software' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'web', label: 'Web Platforms' },
];

const featuredProjects = [
  {
    index: '01',
    category: 'mobile',
    categoryLabel: 'MOBILE & GEOSPATIAL APP',
    title: 'JEEVALINK',
    subtitle: 'Location-Based Emergency Blood Donation Platform',
    tags: 'MOBILE APP · EMERGENCY HEALTHCARE',
    domain: 'jeevalink.org',
    status: 'ACTIVE PRODUCTION',
    metric: 'Under 60s Emergency Matching',
    description: 'A location-aware blood donation platform connecting emergency blood donors, volunteer coordinators, and hospital triage requests in real-time.',
    features: ['GPS Location Matching', 'Hospital Request Portal', 'Instant Emergency Alerts', 'Verified Donor Accounts'],
    image: '/image.png',
    details: {
      problem: 'Emergency blood donation workflows in regional areas suffered from delayed phone trees, outdated contact lists, and lack of nearby donor discovery during critical hours.',
      solution: 'Designed and engineered an easy-to-use mobile and web platform that maps nearby eligible donors on a live map, dispatches instant notifications, and gives hospital coordinators a single dashboard to manage urgent requests.',
    }
  },
  {
    index: '02',
    category: 'saas',
    categoryLabel: 'RETAIL MANAGEMENT SOFTWARE',
    title: 'POS & RETAIL MANAGEMENT',
    subtitle: 'Multi-Store Inventory, Billing & Sales Platform',
    tags: 'BUSINESS SOFTWARE · INVENTORY · POS',
    domain: 'pos.trawbit.com',
    status: 'COMMERCIAL SYSTEM',
    metric: 'Sub-Second Barcode Checkout',
    description: 'A multi-outlet store management system with high-speed barcode checkout, automated inventory tracking, and live profit-and-loss reporting.',
    features: ['Fast Barcode Checkout', 'Multi-Store Inventory Sync', 'Low-Stock Automated Alerts', 'Daily Profit & Loss Reports'],
    image: '/profile.png',
    details: {
      problem: 'Retail business owners were losing hours daily managing inventory across multiple outlets by hand, dealing with checkout delays during rush hours, and lacking real-time sales visibility.',
      solution: 'Architected an all-in-one retail management platform with instant barcode scanning, automatic low-stock alerts, digital receipts, and real-time revenue analytics accessible from phone or laptop.',
    }
  },
  {
    index: '03',
    category: 'web',
    categoryLabel: 'DIGITAL CATALOG PLATFORM',
    title: 'LIBGO',
    subtitle: 'Modern Digital Library & Member Management',
    tags: 'WEB PLATFORM · CATALOG · SUBSCRIPTIONS',
    domain: 'libgo.app',
    status: 'ACTIVE SYSTEM',
    metric: '10,000+ Titles Instant Search',
    description: 'A digital library management ecosystem supporting instant catalog search, circulation tracking, member accounts, and automated return reminders.',
    features: ['Instant Title & Author Search', 'Digital Member Cards', 'Automated Due Date Reminders', 'Multi-Branch Circulation'],
    image: '/Window-controls-Mac-icons-400x200w.png',
    details: {
      problem: 'Traditional library systems had slow, clunky book search, manual paper register checkouts, and high rates of unreturned titles due to lack of member reminders.',
      solution: 'Built a clean, fast web platform where members can search thousands of titles in milliseconds, reserve books online, and receive automated return notifications.',
    }
  },
];

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') return featuredProjects;
  return featuredProjects.filter((p) => p.category === selectedCategory.value);
});

const onImageError = (e, idx) => {
  e.target.src = '/image.png';
};

const openProject = (project) => {
  activeCaseStudy.value = project;
};

const scrollToContactAndClose = () => {
  activeCaseStudy.value = null;
  const el = document.getElementById('contact');
  if (el) {
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
};
</script>

<style scoped>
.case-study-modal-enter-active,
.case-study-modal-leave-active {
  transition: opacity 0.25s ease;
}
.case-study-modal-enter-from,
.case-study-modal-leave-to {
  opacity: 0;
}

.case-study-modal-enter-active .modal-card {
  animation: modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes modalSlideUp {
  0% {
    opacity: 0;
    transform: translateY(32px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

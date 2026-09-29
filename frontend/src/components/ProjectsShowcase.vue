<template>
  <section
    ref="horizontalTrackContainer"
    :class="viewMode === 'side' ? 'projects-scroll-track' : 'pt-12 pb-24 px-6 sm:px-8 max-w-6xl mx-auto'"
  >
    <!-- ══════════════════ VIEW 1: HORIZONTAL SIDE-SCROLLING SHOWCASE ══════════════════ -->
    <div
      v-if="viewMode === 'side'"
      class="projects-sticky-frame pt-20 sm:pt-22 pb-4 sm:pb-6 px-4 sm:px-10"
    >
      <!-- Top Bar: Header, Stage Indicator, Arrow Buttons & View Mode -->
      <div class="flex items-center justify-between gap-4 max-w-7xl mx-auto w-full border-b border-[var(--border-color)] pb-2.5 shrink-0">
        <div class="flex items-center gap-4">
          <div>
            <span class="text-[10px] font-mono-clean tracking-widest uppercase text-[var(--text-muted)] block">
              03 // SELECTED WORK
            </span>
            <h2 class="text-xl sm:text-2xl lg:text-3xl font-sans-clean font-extrabold tracking-tight text-[var(--text-primary)]">
              THINGS I'VE BUILT.
            </h2>
          </div>

          <!-- Interactive Project Jump Dots (Desktop) -->
          <div class="hidden lg:flex items-center gap-1.5 ml-6 pl-6 border-l border-[var(--border-color)]">
            <button
              v-for="(proj, idx) in projectList"
              :key="proj.id"
              @click="goToCardIndex(idx)"
              class="px-2.5 py-1 rounded-full text-[10px] font-mono-clean uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
              :class="activeCardIndex === idx
                ? 'bg-[var(--accent-solid)] text-[var(--accent-text)] font-bold shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--badge-bg)]'"
            >
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="activeCardIndex === idx ? 'bg-emerald-400' : 'bg-transparent border border-[var(--text-muted)]'"
              ></span>
              <span>{{ proj.num }} {{ proj.shortName }}</span>
            </button>
          </div>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Stage Badge (Mobile/Tablet) -->
          <div class="lg:hidden flex items-center gap-1.5 px-2.5 py-1 bg-[var(--badge-bg)] border border-[var(--border-color)] rounded-full text-[11px] font-mono-clean text-[var(--text-primary)] font-semibold">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>0{{ activeCardIndex + 1 }}/04</span>
          </div>

          <!-- Prev/Next Step Arrows -->
          <div class="flex items-center border border-[var(--border-color)] rounded-sm bg-[var(--bg-card)]">
            <button
              @click="prevCard"
              :disabled="activeCardIndex === 0"
              class="px-2.5 py-1 text-xs font-mono-clean text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer border-r border-[var(--border-color)] transition-colors"
              title="Previous project"
            >
              ←
            </button>
            <button
              @click="nextCard"
              :disabled="activeCardIndex === projectList.length - 1"
              class="px-2.5 py-1 text-xs font-mono-clean text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              title="Next project"
            >
              →
            </button>
          </div>

          <!-- View Mode Toggle -->
          <div class="flex items-center border border-[var(--border-color)] rounded-sm p-0.5 bg-[var(--bg-card)]">
            <button
              @click="viewMode = 'side'"
              class="px-2.5 py-1 text-[11px] font-mono-clean uppercase tracking-wider rounded-sm transition-all cursor-pointer font-semibold bg-[var(--accent-solid)] text-[var(--accent-text)]"
            >
              SIDE
            </button>
            <button
              @click="viewMode = 'index'"
              class="px-2.5 py-1 text-[11px] font-mono-clean uppercase tracking-wider rounded-sm transition-all cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              INDEX
            </button>
          </div>
        </div>
      </div>

      <!-- Center Horizontal Sliding Track Canvas -->
      <div class="relative w-full flex-1 min-h-0 flex items-center overflow-hidden py-2">
        <div
          ref="cardsRowRef"
          class="flex flex-row items-center gap-6 sm:gap-8 will-change-transform pl-2 sm:pl-4 pr-16 sm:pr-40"
          :style="{ transform: `translate3d(-${currentTranslateX}px, 0, 0)` }"
        >
          <!-- Individual Sized Horizontal Split Cards (Fit Any Screen Height) -->
          <div
            v-for="(proj, idx) in projectList"
            :key="proj.id"
            class="w-[86vw] sm:w-[680px] md:w-[760px] lg:w-[840px] shrink-0 worth-card rounded-2xl p-4 sm:p-6 border border-[var(--border-color)] bg-[var(--bg-card)] shadow-2xl transition-all duration-300 group hover:border-[var(--text-primary)] flex flex-col justify-between max-h-[64vh] min-h-[360px] overflow-hidden"
            :class="activeCardIndex === idx ? 'opacity-100 scale-100 ring-1 ring-[var(--border-color)]' : 'opacity-85 scale-[0.98]'"
          >
            <div class="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center h-full">
              
              <!-- Left: Mockup Visual (Col 7) -->
              <div
                class="md:col-span-7 relative overflow-hidden rounded-xl border border-[var(--border-color)] aspect-[16/10] bg-[var(--bg-surface)] cursor-pointer group/mockup"
                @click="openCaseStudy(proj)"
              >
                <img
                  :src="proj.image"
                  :alt="proj.title"
                  class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/mockup:scale-105"
                  @error="onImageError"
                />
                <div class="absolute inset-0 bg-black/5 group-hover/mockup:bg-black/0 transition-colors pointer-events-none"></div>

                <!-- Hover Floating Inspect Badge -->
                <div class="absolute bottom-3 right-3 px-3 py-1.5 bg-[var(--bg-card)]/90 backdrop-blur-md border border-[var(--border-color)] rounded-xs text-[10px] font-mono-clean text-[var(--text-primary)] font-bold flex items-center gap-1.5 opacity-0 group-hover/mockup:opacity-100 transition-opacity">
                  <span>INSPECT SPEC</span>
                  <span>↗</span>
                </div>
              </div>

              <!-- Right: Content Narrative & Metrics (Col 5) -->
              <div class="md:col-span-5 flex flex-col justify-between h-full space-y-3">
                <div>
                  <!-- Category & Year -->
                  <div class="flex items-center justify-between text-[11px] font-mono-clean text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                    <span>{{ proj.num }} // {{ proj.category }}</span>
                    <span>{{ proj.year }}</span>
                  </div>

                  <!-- Title -->
                  <h3
                    @click="openCaseStudy(proj)"
                    class="text-xl sm:text-2xl font-sans-clean font-extrabold text-[var(--text-primary)] tracking-tight mb-2 cursor-pointer hover:underline"
                  >
                    {{ proj.title }}
                  </h3>

                  <!-- Concise Summary Description -->
                  <p class="text-xs sm:text-sm text-[var(--text-secondary)] font-sans-clean leading-relaxed mb-3 line-clamp-2 sm:line-clamp-3">
                    {{ proj.description }}
                  </p>

                  <!-- Live Impact Pill -->
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--badge-bg)] border border-[var(--border-color)] rounded-xs text-[11px] font-mono-clean text-[var(--text-primary)] font-semibold mb-3">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{{ proj.metric }}</span>
                  </div>

                  <!-- Tech Stack Pills -->
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="tech in proj.stack"
                      :key="tech"
                      class="worth-tag text-[9px] py-0.5 px-2"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>

                <!-- Bottom Button & Link -->
                <div class="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
                  <button
                    @click="openCaseStudy(proj)"
                    class="btn-worth text-xs py-2 px-4 cursor-pointer"
                  >
                    <span>{{ proj.buttonText || 'VIEW CASE STUDY' }}</span>
                    <span>→</span>
                  </button>

                  <span class="text-[11px] font-mono-clean text-[var(--text-muted)]">
                    {{ proj.domain }}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════════════ VIEW 2: SWISS INDEX TABLE ══════════════════ -->
    <div v-else>
      <div class="flex items-center justify-between mb-8">
        <div>
          <span class="text-xs font-mono-clean tracking-widest uppercase text-[var(--text-muted)] block mb-1">
            03 // SELECTED WORK
          </span>
          <h2 class="text-3xl sm:text-4xl font-sans-clean font-extrabold tracking-tight text-[var(--text-primary)]">
            THINGS I'VE BUILT.
          </h2>
          <p class="text-xs font-mono-clean text-[var(--text-secondary)] mt-1">
            A selection of products, platforms, and software systems I've worked on.
          </p>
        </div>

        <div class="flex items-center border border-[var(--border-color)] rounded-sm p-0.5 bg-[var(--bg-card)]">
          <button
            @click="viewMode = 'side'"
            class="px-3 py-1.5 text-xs font-mono-clean uppercase tracking-wider rounded-sm transition-all cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            SIDE
          </button>
          <button
            @click="viewMode = 'index'"
            class="px-3 py-1.5 text-xs font-mono-clean uppercase tracking-wider rounded-sm transition-all cursor-pointer font-semibold bg-[var(--accent-solid)] text-[var(--accent-text)]"
          >
            INDEX
          </button>
        </div>
      </div>

      <div class="worth-card rounded-sm overflow-hidden border border-[var(--border-color)]">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse font-mono-clean text-xs">
            <thead>
              <tr class="border-b border-[var(--border-color)] bg-[var(--bg-subtle)] text-[var(--text-muted)] uppercase text-[10px] tracking-wider">
                <th class="py-4 px-6">#</th>
                <th class="py-4 px-6 font-sans-clean font-bold">PROJECT</th>
                <th class="py-4 px-6 hidden sm:table-cell">DELIVERABLES &amp; STACK</th>
                <th class="py-4 px-6 hidden md:table-cell">YEAR</th>
                <th class="py-4 px-6 hidden lg:table-cell">KEY METRIC</th>
                <th class="py-4 px-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--border-color)]">
              <tr
                v-for="proj in projectList"
                :key="proj.id"
                class="group hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer"
                @click="openCaseStudy(proj)"
              >
                <td class="py-5 px-6 font-bold text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">
                  {{ proj.num }}
                </td>
                <td class="py-5 px-6">
                  <span class="font-sans-clean font-bold text-sm text-[var(--text-primary)] block group-hover:underline">
                    {{ proj.title }}
                  </span>
                  <span class="text-[11px] text-[var(--text-muted)]">{{ proj.domain }}</span>
                </td>
                <td class="py-5 px-6 hidden sm:table-cell">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="t in proj.stack.slice(0, 3)"
                      :key="t"
                      class="px-2 py-0.5 border border-[var(--border-color)] rounded-xs text-[10px] text-[var(--text-secondary)] bg-[var(--bg-card)]"
                    >
                      {{ t }}
                    </span>
                  </div>
                </td>
                <td class="py-5 px-6 hidden md:table-cell text-[var(--text-secondary)]">
                  {{ proj.year }}
                </td>
                <td class="py-5 px-6 hidden lg:table-cell text-[var(--text-primary)] font-semibold">
                  {{ proj.metric }}
                </td>
                <td class="py-5 px-6 text-right">
                  <span class="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border-color)] group-hover:border-[var(--text-primary)] rounded-sm text-[11px] font-semibold text-[var(--text-primary)] bg-[var(--bg-card)]">
                    <span>INSPECT</span>
                    <span>↗</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ── Case Study Inspection Modal ── -->
    <Transition name="modal">
      <div
        v-if="selectedCaseStudy"
        class="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        @click.self="selectedCaseStudy = null"
      >
        <div class="worth-card border-[var(--border-color)] max-w-3xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative rounded-sm bg-[var(--bg-surface)]">
          <!-- Close Button -->
          <button
            @click="selectedCaseStudy = null"
            class="absolute top-6 right-6 text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xs font-mono-clean uppercase tracking-wider cursor-pointer border border-[var(--border-color)] hover:border-[var(--text-primary)] px-3 py-1.5 transition-colors rounded-sm bg-[var(--bg-card)]"
          >
            [CLOSE ×]
          </button>

          <!-- Top Meta -->
          <div class="text-xs font-mono-clean text-[var(--text-muted)] uppercase tracking-widest mb-2 font-semibold flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-[var(--text-primary)]"></span>
            <span>CASE STUDY // {{ selectedCaseStudy.num }}</span>
          </div>

          <h3 class="text-2xl sm:text-4xl font-sans-clean font-extrabold text-[var(--text-primary)] tracking-tight mb-2">
            {{ selectedCaseStudy.title }}
          </h3>
          <p class="text-xs font-mono-clean text-[var(--text-muted)] uppercase tracking-wider mb-8">
            {{ selectedCaseStudy.domain }} · {{ selectedCaseStudy.role }} ({{ selectedCaseStudy.year }})
          </p>

          <!-- Modal Mockup Frame -->
          <div class="aspect-video w-full bg-black border border-[var(--border-color)] mb-8 overflow-hidden rounded-sm relative">
            <img :src="selectedCaseStudy.image" :alt="selectedCaseStudy.title" class="w-full h-full object-cover" />
            <div class="absolute bottom-3 left-3 px-3 py-1 bg-black/90 border border-white/10 text-xs font-mono-clean text-emerald-400">
              IMPACT: {{ selectedCaseStudy.metric }}
            </div>
          </div>

          <!-- Narrative Breakdown -->
          <div class="space-y-6 text-sm text-[var(--text-secondary)] leading-relaxed font-sans-clean">
            <div>
              <h4 class="text-xs font-mono-clean text-[var(--text-primary)] uppercase tracking-wider mb-2 font-bold flex items-center gap-2">
                <span>[01]</span>
                <span>The Core Challenge</span>
              </h4>
              <p>{{ selectedCaseStudy.caseData.problem }}</p>
            </div>

            <div>
              <h4 class="text-xs font-mono-clean text-[var(--text-primary)] uppercase tracking-wider mb-2 font-bold flex items-center gap-2">
                <span>[02]</span>
                <span>Architecture &amp; Delivery</span>
              </h4>
              <p>{{ selectedCaseStudy.caseData.solution }}</p>
            </div>

            <div>
              <h4 class="text-xs font-mono-clean text-[var(--text-primary)] uppercase tracking-wider mb-2 font-bold flex items-center gap-2">
                <span>[03]</span>
                <span>Production Deliverables</span>
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                <div
                  v-for="deliv in selectedCaseStudy.caseData.deliverables"
                  :key="deliv"
                  class="p-2.5 bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded-xs text-xs font-mono-clean text-[var(--text-primary)] flex items-center gap-2"
                >
                  <span class="text-emerald-500 font-bold">✓</span>
                  <span>{{ deliv }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Bottom Actions -->
          <div class="mt-10 pt-6 border-t border-[var(--border-color)] flex items-center justify-between">
            <button
              @click="selectedCaseStudy = null"
              class="text-xs font-mono-clean uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              ← Back to Showcase
            </button>
            <button
              @click="scrollToContactAndClose"
              class="btn-worth cursor-pointer"
            >
              <span>DISCUSS SIMILAR PROJECT</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useSmoothScroll } from '../composables/useSmoothScroll';

const viewMode = ref('side'); // 'side' | 'index'
const selectedCaseStudy = ref(null);
const horizontalTrackContainer = ref(null);
const cardsRowRef = ref(null);

const currentTranslateX = ref(0);
const horizontalProgress = ref(0);
const activeCardIndex = ref(0);
const isCompleted = ref(false);

const { scrollTo: smoothScrollTo, registerScrollCallback } = useSmoothScroll();
let unregisterScroll = null;

// Curated Projects Data with short names for top jump pills
const projectList = [
  {
    id: 1,
    num: '01',
    shortName: 'JEEVALINK',
    title: 'Jeevalink',
    category: 'HEALTHCARE · DIGITAL PLATFORM',
    domain: 'jeevalink.org',
    role: 'Lead Architect & Full-Stack',
    year: '2025',
    metric: 'Under 60s emergency matching',
    description: 'A digital platform connecting blood donors, volunteers, and emergency blood requests through web and mobile experiences.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Firebase', 'Flutter'],
    image: '/projects/jeevalink.jpg',
    buttonText: 'VIEW CASE STUDY',
    caseData: {
      problem: 'Regional hospitals faced life-threatening communication delays due to manual telephone trees and outdated donor registers during urgent emergency transfusions.',
      solution: 'A digital platform connecting blood donors, volunteers, and emergency blood requests through web and mobile experiences with real-time GPS dispatch indexing.',
      deliverables: ['Real-Time Donor Matching', 'Emergency Triage Dashboard', 'Volunteer Mobilization App', 'Verified Blood Inventory Ledger'],
    },
  },
  {
    id: 2,
    num: '02',
    shortName: 'LIBGO',
    title: 'Libgo',
    category: 'DIGITAL LIBRARY',
    domain: 'libgo.app',
    role: 'Full-Stack Lead Engineer',
    year: '2025',
    metric: '10,000+ catalog titles indexed',
    description: 'A modern digital library platform designed to simplify resource management, access, and everyday library operations.',
    stack: ['Vue', 'Laravel', 'MySQL'],
    image: '/projects/libgo.jpg',
    buttonText: 'VIEW CASE STUDY',
    caseData: {
      problem: 'Academic and institutional libraries struggled with slow legacy desktop software, paper checkout slips, and overdue book losses caused by absent member notification systems.',
      solution: 'A modern digital library platform designed to simplify resource management, access, and everyday library operations with sub-second catalog search and QR borrower cards.',
      deliverables: ['Sub-Second Catalog Search', 'Digital QR Borrower Identification', 'Automated Renewal Queues', 'Multi-Branch Inventory Matrix'],
    },
  },
  {
    id: 3,
    num: '03',
    shortName: 'TRAWBIT',
    title: 'Trawbit Technologies',
    category: 'SOFTWARE · PRODUCT DEVELOPMENT',
    domain: 'trawbit.com',
    role: 'Co-Founder & Technical Architect',
    year: '2026',
    metric: 'Production Software Delivery',
    description: 'A software company building digital products, websites, applications, and technology solutions for real-world business needs.',
    stack: ['React', 'Next.js', 'Laravel', 'Node.js', 'MongoDB'],
    image: '/projects/pos_retail.jpg',
    buttonText: 'VIEW COMPANY',
    caseData: {
      problem: 'Modern businesses require resilient, scalable digital systems built with velocity, clean architectures, and reliable long-term maintenance.',
      solution: 'A software company building digital products, websites, applications, and technology solutions for real-world business needs from concept to production.',
      deliverables: ['Commercial Web Platforms', 'Distributed API Architectures', 'Enterprise POS Systems', 'Cross-Platform Mobile Apps'],
    },
  },
  {
    id: 4,
    num: '04',
    shortName: 'RETAIL POS',
    title: 'Enterprise Retail POS',
    category: 'COMMERCE INFRASTRUCTURE',
    domain: 'pos.trawbit.com',
    role: 'Co-Founder & Technical Architect',
    year: '2026',
    metric: 'Sub-second barcode checkout',
    description: 'A multi-outlet store management system with high-speed barcode checkout, automated inventory replenishment tracking, and live gross revenue analytics.',
    stack: ['Laravel', 'Vue 3', 'MySQL', 'TailwindCSS'],
    image: '/projects/pos_retail.jpg',
    buttonText: 'VIEW CASE STUDY',
    caseData: {
      problem: 'Retail store owners lacked real-time visibility into multi-branch stock levels, suffering from checkout bottlenecks during peak shopping hours and manual inventory reconciliation errors.',
      solution: 'Architected an all-in-one retail POS operating system supporting instant barcode scanning, low-stock threshold triggers, digital receipts, and real-time revenue analytics accessible from mobile or desktop.',
      deliverables: ['Sub-Second Barcode Checkout Flow', 'Multi-Store Synchronized Stock Ledger', 'Live Gross Profit & Revenue Stream', 'Thermal Receipt & Digital Dispatch'],
    },
  },
];

// High performance side-scrolling physics with completion buffer
const updateHorizontalScroll = () => {
  if (viewMode.value !== 'side' || !horizontalTrackContainer.value || !cardsRowRef.value) return;

  const rect = horizontalTrackContainer.value.getBoundingClientRect();
  const vh = window.innerHeight;
  const totalVerticalDistance = horizontalTrackContainer.value.offsetHeight - vh;

  if (totalVerticalDistance <= 0) return;

  // Raw scroll progress in the container: 0 to 1
  const rawProgress = Math.max(0, Math.min(1, -rect.top / totalVerticalDistance));

  // Continuous full-span horizontal travel (0 to 1.0)
  const travelZone = 1.0;
  const travelProgress = Math.min(1, rawProgress / travelZone);
  horizontalProgress.value = travelProgress;

  // Calculate maximum horizontal travel so the last card is fully, completely shown
  const trackWidth = cardsRowRef.value.scrollWidth;
  const viewportWidth = window.innerWidth;
  const maxScrollX = Math.max(0, trackWidth - viewportWidth);

  currentTranslateX.value = travelProgress * maxScrollX;

  // Track active project index
  const index = Math.min(
    projectList.length - 1,
    Math.floor(travelProgress * (projectList.length - 0.05))
  );
  activeCardIndex.value = Math.max(0, index);

  // Set completion state
  isCompleted.value = rawProgress >= 0.96;
};

// Arrow navigation helpers
const goToCardIndex = (idx) => {
  if (!horizontalTrackContainer.value) return;
  const vh = window.innerHeight;
  const totalVerticalDistance = horizontalTrackContainer.value.offsetHeight - vh;
  const targetTravel = idx / (projectList.length - 1);
  const targetRawProgress = targetTravel * 1.0;
  const containerDocTop = horizontalTrackContainer.value.getBoundingClientRect().top + window.scrollY;
  const targetScrollY = containerDocTop + targetRawProgress * totalVerticalDistance;

  smoothScrollTo(targetScrollY, { offset: 0, duration: 0.7 });
};

const nextCard = () => {
  if (activeCardIndex.value < projectList.length - 1) {
    goToCardIndex(activeCardIndex.value + 1);
  }
};

const prevCard = () => {
  if (activeCardIndex.value > 0) {
    goToCardIndex(activeCardIndex.value - 1);
  }
};

const openCaseStudy = (proj) => {
  selectedCaseStudy.value = proj;
};

const onImageError = (e) => {
  e.target.src = '/projects/jeevalink.jpg';
};

const scrollToContactAndClose = () => {
  selectedCaseStudy.value = null;
  smoothScrollTo('#contact', { offset: -80, duration: 1.85 });
};

onMounted(() => {
  setTimeout(() => {
    updateHorizontalScroll();
  }, 60);

  unregisterScroll = registerScrollCallback(() => {
    updateHorizontalScroll();
  });

  window.addEventListener('resize', updateHorizontalScroll, { passive: true });
});

onUnmounted(() => {
  if (unregisterScroll) unregisterScroll();
  window.removeEventListener('resize', updateHorizontalScroll);
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

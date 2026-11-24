<template>
  <div class="sw-container pt-20 sm:pt-40 pb-16 sm:pb-36">
    <!-- ══════════════════ SECTION HEADER ══════════════════ -->
    <div class="sw-grid gap-y-6 items-end mb-10 sm:mb-16 scroll-reveal">
      <div class="col-span-4 md:col-span-3 sw-label">
        <span>Selected work</span>
      </div>

      <h2 class="col-span-4 md:col-span-6 sw-h2">
        Things I've <span class="font-serif-editorial text-[1.08em] text-[var(--accent)]">built.</span>
      </h2>

      <div class="col-span-4 md:col-span-3 flex md:justify-end items-center">
        <span class="sw-label">01 — {{ formatNum(projectList.length) }}</span>
      </div>
    </div>

    <!-- ══════════════════ FULL-WIDTH TYPOGRAPHIC PROJECT INDEX ══════════════════ -->
    <div class="sw-grid items-start">
      <div class="col-span-4 md:col-span-12">
        <ul class="border-b border-[var(--border-strong)]">
          <li
            v-for="(proj, idx) in projectList"
            :key="proj.id"
            class="scroll-reveal"
            :class="`reveal-delay-${Math.min(idx + 1, 4) * 100}`"
          >
            <div
              @mouseenter="setActive(idx)"
              @click="openCaseStudy(proj)"
              role="button"
              tabindex="0"
              @keydown.enter="openCaseStudy(proj)"
              class="group relative w-full text-left border-t border-[var(--border-strong)] py-5 sm:py-8 cursor-pointer select-none overflow-hidden"
            >
              <!-- Animated signal-orange top sweep bar on active row -->
              <span
                class="absolute top-0 left-0 h-[2px] bg-[var(--accent)] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                :class="activeIdx === idx ? 'w-full' : 'w-0'"
                aria-hidden="true"
              ></span>

              <!-- Row Top Meta + Title -->
              <div class="flex items-baseline justify-between gap-3 sm:gap-4">
                <div class="flex items-baseline gap-3 sm:gap-6 min-w-0">
                  <span
                    class="font-mono-clean text-[11px] shrink-0 transition-colors duration-300 flex items-center gap-1.5"
                    :class="activeIdx === idx ? 'text-[var(--accent)] font-medium' : 'text-[var(--text-muted)]'"
                  >
                    <span
                      class="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] transition-transform duration-300"
                      :class="activeIdx === idx ? 'scale-100' : 'scale-0'"
                    ></span>
                    <span>{{ proj.num }}</span>
                  </span>

                  <h3
                    class="font-heading font-medium text-[clamp(1.75rem,5.2vw,4.75rem)] leading-[0.92] tracking-[-0.05em] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] truncate"
                    :class="activeIdx === idx
                      ? 'text-[var(--text-primary)] translate-x-1 sm:translate-x-2'
                      : 'text-[var(--text-muted)] opacity-55 group-hover:opacity-90'"
                  >
                    {{ proj.title }}
                  </h3>
                </div>

                <!-- Right Category + Arrow -->
                <div class="flex items-center gap-3 sm:gap-6 shrink-0">
                  <span class="hidden sm:inline sw-label !text-[10px]">
                    {{ proj.category }}
                  </span>
                  <span
                    class="w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center text-xs transition-all duration-500"
                    :class="activeIdx === idx
                      ? 'border-[var(--accent)] bg-[var(--accent)] text-white rotate-45'
                      : 'border-[var(--border-color)] text-[var(--text-muted)]'"
                  >
                    ↗
                  </span>
                </div>
              </div>

              <!-- Expandable Editorial Drawer inside the active row -->
              <div
                class="grid transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                :class="activeIdx === idx ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'"
              >
                <div class="overflow-hidden">
                  <div class="pl-6 sm:pl-11 pr-2 pt-1 flex flex-col gap-3">
                    <p class="text-[14px] sm:text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-[64ch]">
                      {{ proj.description }}
                    </p>

                    <div class="flex flex-wrap items-center gap-1.5 pt-1">
                      <span
                        v-for="tech in proj.stack"
                        :key="tech"
                        class="worth-tag !text-[9.5px] !py-0.5 !px-2"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- ══════════════════ CASE STUDY DRAWER ══════════════════ -->
    <Teleport to="body">
      <Transition name="scrim">
        <div
          v-if="selectedCaseStudy"
          class="fixed inset-0 z-[100] bg-black/50 backdrop-blur-[2px]"
          @click="closeCaseStudy"
        ></div>
      </Transition>
      <Transition name="drawer">
        <aside
          v-if="selectedCaseStudy"
          data-lenis-prevent
          class="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-[760px] bg-[var(--bg-primary)] text-[var(--text-primary)] border-l border-[var(--border-color)] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          :aria-label="selectedCaseStudy.title"
        >
          <div class="sticky top-0 z-10 flex items-center justify-between px-5 sm:px-10 h-14 sm:h-16 bg-[var(--bg-glass)] backdrop-blur-md border-b border-[var(--border-color)] pt-safe">
            <span class="sw-label">Case study — {{ selectedCaseStudy.num }}/{{ formatNum(projectList.length) }}</span>
            <button @click="closeCaseStudy" class="group sw-label !text-[var(--text-primary)] flex items-center gap-2 cursor-pointer min-h-[44px] min-w-[44px] justify-end -mr-2 p-2">
              <span class="sw-link">Close</span>
              <span class="transition-transform duration-500 group-hover:rotate-90">✕</span>
            </button>
          </div>

          <div class="px-5 sm:px-10 pt-8 sm:pt-10 pb-12 pb-safe">
            <h3 class="font-heading font-medium text-[clamp(2.1rem,7.5vw,5.5rem)] leading-[0.9] tracking-[-0.055em] mb-6 sm:mb-8">
              {{ selectedCaseStudy.title }}<span class="text-[var(--accent)]">.</span>
            </h3>

            <dl class="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5 border-t border-[var(--text-primary)] pt-4 mb-8 sm:mb-10">
              <div>
                <dt class="sw-label mb-1">Role</dt>
                <dd class="text-[13px] leading-snug">{{ selectedCaseStudy.role }}</dd>
              </div>
              <div>
                <dt class="sw-label mb-1">Year</dt>
                <dd class="text-[13px]">{{ selectedCaseStudy.year }}</dd>
              </div>
              <div>
                <dt class="sw-label mb-1">Domain</dt>
                <dd class="text-[13px]">{{ selectedCaseStudy.domain }}</dd>
              </div>
              <div>
                <dt class="sw-label mb-1">Impact</dt>
                <dd class="text-[13px] leading-snug text-[var(--accent)]">{{ selectedCaseStudy.metric }}</dd>
              </div>
            </dl>

            <p class="text-lg sm:text-2xl leading-[1.35] sm:leading-[1.3] tracking-[-0.02em] mb-8 sm:mb-12">
              {{ selectedCaseStudy.description }}
            </p>

            <div class="space-y-8 sm:space-y-10">
              <div class="grid grid-cols-12 gap-x-4 border-t border-[var(--border-color)] pt-4">
                <span class="col-span-12 sm:col-span-4 sw-label mb-2 sm:mb-3">01 — Challenge</span>
                <p class="col-span-12 sm:col-span-8 text-[14px] sm:text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  {{ selectedCaseStudy.caseData.problem }}
                </p>
              </div>
              <div class="grid grid-cols-12 gap-x-4 border-t border-[var(--border-color)] pt-4">
                <span class="col-span-12 sm:col-span-4 sw-label mb-2 sm:mb-3">02 — Architecture</span>
                <p class="col-span-12 sm:col-span-8 text-[14px] sm:text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  {{ selectedCaseStudy.caseData.solution }}
                </p>
              </div>
              <div class="grid grid-cols-12 gap-x-4 border-t border-[var(--border-color)] pt-4">
                <span class="col-span-12 sm:col-span-4 sw-label mb-2 sm:mb-3">03 — Deliverables</span>
                <ul class="col-span-12 sm:col-span-8">
                  <li
                    v-for="(deliv, i) in selectedCaseStudy.caseData.deliverables"
                    :key="deliv"
                    class="flex items-baseline gap-4 py-2.5 border-b border-[var(--border-color)] text-[14px] sm:text-[15px]"
                  >
                    <span class="font-mono-clean text-[10px] text-[var(--text-muted)]">{{ formatNum(i + 1) }}</span>
                    <span>{{ deliv }}</span>
                  </li>
                </ul>
              </div>
              <div class="grid grid-cols-12 gap-x-4 border-t border-[var(--border-color)] pt-4">
                <span class="col-span-12 sm:col-span-4 sw-label mb-2 sm:mb-3">04 — Stack</span>
                <div class="col-span-12 sm:col-span-8 flex flex-wrap gap-1.5">
                  <span v-for="tech in selectedCaseStudy.stack" :key="tech" class="worth-tag">{{ tech }}</span>
                </div>
              </div>
            </div>

            <div class="mt-10 sm:mt-14 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button @click="scrollToContactAndClose" class="btn-worth cursor-pointer text-center justify-center min-h-[44px]">
                Build something similar →
              </button>
              <a
                v-if="selectedCaseStudy.liveUrl"
                :href="selectedCaseStudy.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-worth-outline text-center justify-center min-h-[44px]"
              >
                Visit site ↗
              </a>
              <button
                @click="nextCaseStudy"
                class="sm:ml-auto group sw-label !text-[var(--text-primary)] flex items-center justify-center sm:justify-start gap-2 cursor-pointer py-3 sm:py-0 min-h-[44px]"
              >
                <span class="sw-link">Next project</span>
                <span class="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </aside>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useSmoothScroll } from '../composables/useSmoothScroll';
import { useScrollReveal } from '../composables/useScrollReveal';
import { useProjects } from '../composables/useProjects';

useScrollReveal();

const { scrollTo: smoothScrollTo, stopScroll, startScroll } = useSmoothScroll();
const { projects: apiProjects, fetchProjects } = useProjects();

const activeIdx = ref(0);
const selectedCaseStudy = ref(null);

const formatNum = (n) => String(n).padStart(2, '0');

const defaultProjects = [
  {
    id: 1,
    num: '01',
    title: 'Jeevalink',
    category: 'Healthcare platform',
    domain: 'jeevalink.org',
    role: 'Lead architect & full-stack',
    year: '2025',
    metric: 'Under 60s emergency matching',
    description:
      'A real-time platform connecting blood donors, volunteer coordinators, and urgent hospital blood requests across web and mobile.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Firebase', 'Flutter'],
    image: '/projects/jeevalink.jpg',
    caseData: {
      problem:
        'Regional hospitals faced life-threatening communication delays due to manual telephone trees and outdated donor registers during urgent emergency transfusions.',
      solution:
        'Engineered a location-aware web and mobile platform with live GPS donor indexing, instant emergency triage dispatch, and verified blood inventory tracking.',
      deliverables: [
        'Real-time donor matching',
        'Emergency triage dashboard',
        'Volunteer mobilization app',
        'Verified blood inventory ledger',
      ],
    },
  },
  {
    id: 2,
    num: '02',
    title: 'Libgo',
    category: 'Digital library',
    domain: 'libgo.app',
    role: 'Full-stack lead engineer',
    year: '2025',
    metric: '10,000+ catalog titles indexed',
    description:
      'A modern digital library platform built to streamline institutional cataloging, QR member checkouts, and automated circulation.',
    stack: ['Vue 3', 'Laravel', 'MySQL'],
    image: '/projects/libgo.jpg',
    caseData: {
      problem:
        'Academic and institutional libraries struggled with sluggish legacy desktop tools, paper checkout registers, and overdue book losses caused by missing reminders.',
      solution:
        'Built an intuitive web ecosystem with sub-second catalog search, digital QR borrower IDs, automated renewal queues, and multi-branch inventory visibility.',
      deliverables: [
        'Sub-second catalog search',
        'Digital QR borrower cards',
        'Automated renewal queues',
        'Multi-branch inventory matrix',
      ],
    },
  },
  {
    id: 3,
    num: '03',
    title: 'Retail POS',
    category: 'Commerce infrastructure',
    domain: 'pos.trawbit.com',
    role: 'Co-founder & architect',
    year: '2026',
    metric: 'Sub-second barcode checkout',
    description:
      'A multi-outlet retail operating system with instant barcode checkout, automated stock replenishment alerts, and live gross revenue analytics.',
    stack: ['Laravel', 'Vue 3', 'MySQL', 'Tailwind CSS'],
    image: '/projects/pos_retail.jpg',
    caseData: {
      problem:
        'Retail store owners lacked real-time visibility into multi-branch stock levels, facing peak-hour checkout bottlenecks and error-prone manual reconciliation.',
      solution:
        'Architected an all-in-one POS platform with instant barcode scanning, low-stock threshold alerts, thermal & digital receipts, and live profit dashboards.',
      deliverables: [
        'Sub-second barcode checkout flow',
        'Multi-store stock ledger',
        'Live gross profit analytics',
        'Thermal & digital receipt engine',
      ],
    },
  },
  {
    id: 4,
    num: '04',
    title: 'Trawbit',
    category: 'Software venture',
    domain: 'trawbit.com',
    liveUrl: 'https://trawbit.com',
    role: 'Co-founder & technical lead',
    year: '2026',
    metric: 'Commercial software studio',
    description:
      'Co-founded software engineering venture designing and shipping commercial web platforms, mobile applications, and business automation systems.',
    stack: ['React', 'Next.js', 'Laravel', 'Node.js', 'MongoDB'],
    visualType: 'trawbit',
    image: '/projects/exam_engine.jpg',
    caseData: {
      problem:
        'Growing businesses often face fragile prototypes or bloated agency deliverables instead of dependable software built for long-term operational scale.',
      solution:
        'Co-founded Trawbit Technologies to deliver focused, production-grade software systems across retail commerce, healthcare, education, and custom SaaS.',
      deliverables: [
        'Commercial web platforms',
        'Distributed API architectures',
        'Enterprise POS systems',
        'Cross-platform mobile apps',
      ],
    },
  },
];

const extractDomain = (url, fallback) => {
  if (!url || typeof url !== 'string') return fallback;
  try {
    const normalized = url.startsWith('http') ? url : `https://${url}`;
    return new URL(normalized).hostname.replace(/^www\./, '');
  } catch {
    return fallback;
  }
};

const projectList = computed(() => {
  if (!Array.isArray(apiProjects.value) || apiProjects.value.length === 0) {
    return defaultProjects;
  }

  return apiProjects.value.map((p, idx) => {
    const matchedDefault = defaultProjects.find(
      (dp) => dp.title.toLowerCase() === (p.title || '').toLowerCase()
    );
    const d = p.detailData || {};
    const firstStat = Array.isArray(d.stats) && d.stats.length > 0 ? d.stats[0] : null;
    const metricFromStat = firstStat
      ? [firstStat.val, firstStat.label].filter(Boolean).join(' ').trim()
      : '';
    const featureDeliverables = Array.isArray(d.features) && d.features.length > 0
      ? d.features.map((f) => (typeof f === 'string' ? f : f.title || f.desc)).filter(Boolean)
      : null;

    const liveUrl = d.liveUrl || p.liveUrl || matchedDefault?.liveUrl || '';
    const repoUrl = d.repoUrl || p.repoUrl || '';

    return {
      id: p.id ?? idx + 1,
      num: formatNum(idx + 1),
      title: p.title || matchedDefault?.title || 'Project',
      category: d.heroSubject || matchedDefault?.category || 'Software platform',
      domain: extractDomain(liveUrl, matchedDefault?.domain || 'production'),
      liveUrl,
      repoUrl,
      role: (d.heroTitle && d.heroTitle !== p.title ? d.heroTitle : null) || matchedDefault?.role || 'Full-stack lead engineer',
      year: matchedDefault?.year || (p.created_at ? String(p.created_at).slice(0, 4) : '2026'),
      metric: metricFromStat || matchedDefault?.metric || 'Production system',
      description: p.description || matchedDefault?.description || '',
      stack: Array.isArray(p.tags) && p.tags.length > 0 ? p.tags : (matchedDefault?.stack || []),
      caseData: {
        problem:
          (d.abstract && d.abstract !== p.description ? d.abstract : null) ||
          matchedDefault?.caseData?.problem ||
          p.description ||
          '',
        solution:
          (d.tagline && d.tagline !== p.description ? d.tagline : null) ||
          matchedDefault?.caseData?.solution ||
          d.abstract ||
          p.description ||
          '',
        deliverables:
          featureDeliverables ||
          matchedDefault?.caseData?.deliverables ||
          (Array.isArray(p.tags) ? p.tags : []),
      },
    };
  });
});

const setActive = (idx) => {
  activeIdx.value = idx;
};

/* ── Case study drawer ── */
const openCaseStudy = (proj) => {
  selectedCaseStudy.value = proj;
  stopScroll();
};

const closeCaseStudy = () => {
  selectedCaseStudy.value = null;
  startScroll();
};

const nextCaseStudy = () => {
  if (!selectedCaseStudy.value) return;
  const list = projectList.value;
  const i = list.findIndex((p) => p.id === selectedCaseStudy.value.id);
  const next = (i + 1) % list.length;
  activeIdx.value = next;
  selectedCaseStudy.value = list[next];
  const drawer = document.querySelector('aside[role="dialog"]');
  if (drawer) drawer.scrollTop = 0;
};

const scrollToContactAndClose = () => {
  closeCaseStudy();
  setTimeout(() => {
    smoothScrollTo('#contact', { offset: 0, duration: 1.25 });
  }, 60);
};

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && selectedCaseStudy.value) closeCaseStudy();
};

onMounted(() => {
  fetchProjects();
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  startScroll();
});
</script>

<style scoped>
.scrim-enter-active,
.scrim-leave-active {
  transition: opacity 0.5s ease;
}
.scrim-enter-from,
.scrim-leave-to {
  opacity: 0;
}
.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1);
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}
</style>

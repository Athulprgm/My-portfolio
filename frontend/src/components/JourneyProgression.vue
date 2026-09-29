<template>
  <section
    id="journey"
    class="relative py-28 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto z-10 border-t border-[var(--border-color)]"
  >
    <!-- Top Metadata Eyebrow -->
    <div class="flex items-center justify-between mb-16 text-xs font-mono-clean tracking-widest uppercase text-[var(--text-muted)]">
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 bg-[var(--text-primary)]"></span>
        <span>06 // PROGRESSION &amp; FOUNDATIONS</span>
      </div>
      <span>TRAJECTORY</span>
    </div>

    <!-- Editorial Header Statement -->
    <div class="max-w-3xl mb-16">
      <h2 class="text-3xl sm:text-5xl lg:text-6xl font-sans-clean font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.05] mb-4">
        CHRONOLOGY &amp; RIGOR
      </h2>
      <p class="text-base sm:text-lg text-[var(--text-secondary)] font-sans-clean">
        Computer science foundations paired with pragmatic commercial execution.
      </p>
    </div>

    <!-- The 5-Step Visual Progression Grid (Worth Agency Hairline Columns) -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      
      <div
        v-for="(step, idx) in progressionSteps"
        :key="step.title"
        class="worth-card p-6 rounded-sm flex flex-col justify-between group relative"
      >
        <!-- Top Sequence Identifier & Arrow -->
        <div>
          <div class="flex items-center justify-between text-xs font-mono-clean text-[var(--text-muted)] mb-4 pb-3 border-b border-[var(--border-color)]">
            <span>PHASE 0{{ idx + 1 }}</span>
            <span class="text-[var(--text-primary)] font-bold group-hover:translate-x-1 transition-transform">
              {{ idx < progressionSteps.length - 1 ? '→' : '↺' }}
            </span>
          </div>

          <h3 class="text-xl sm:text-2xl font-sans-clean font-bold text-[var(--text-primary)] tracking-tight mb-2">
            {{ step.title }}
          </h3>

          <div class="text-[10px] font-mono-clean text-[var(--text-muted)] uppercase tracking-wider mb-4 font-semibold">
            {{ step.subtitle }}
          </div>

          <p class="text-xs text-[var(--text-secondary)] leading-relaxed font-sans-clean">
            {{ step.text }}
          </p>
        </div>

        <div class="mt-6 pt-4 border-t border-[var(--border-color)] text-[10px] font-mono-clean text-[var(--text-muted)]">
          {{ step.milestone }}
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const progressionSteps = [
  {
    title: 'ACADEMIA',
    subtitle: 'BSC COMPUTER SCIENCE',
    text: 'Formal education in algorithmic complexity, relational data structures, and computer organization at Kannur University.',
    milestone: '// FOUNDATIONAL CS',
  },
  {
    title: 'FULL-STACK',
    subtitle: 'MODERN WEB MASTERY',
    text: 'Deep immersion into modern reactive frontend architectures, PHP/Laravel enterprise ecosystem, and RESTful API standards.',
    milestone: '// 2024 SYSTEM EXPANSION',
  },
  {
    title: 'TRAWBIT',
    subtitle: 'CO-FOUNDER & TECH LEAD',
    text: 'Formed Trawbit Technologies to engineer commercial software platforms for retail, inventory management, and healthcare.',
    milestone: '// 2025 ACTIVE COMMERCIAL',
  },
  {
    title: 'SCALE',
    subtitle: 'ENTERPRISE PRODUCTION',
    text: 'Deploying sub-second POS systems, cloud databases, and multi-tenant architectures handling live business transactions.',
    milestone: '// 2026 ACTIVE PRODUCTION',
  },
  {
    title: 'HORIZON',
    subtitle: 'SYSTEM EXPANSION',
    text: 'Continuously refining software architectures, exploring high-frequency digital systems, and engineering products with purpose.',
    milestone: '// CONTINUOUS ITERATION',
  },
];
</script>

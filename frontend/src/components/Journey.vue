<template>
  <section class="py-28 sm:py-36 px-6 sm:px-8 border-b border-[#1E1E1E] bg-black text-white" id="experience">
    <div class="max-w-7xl mx-auto">

      <!-- Section Header -->
      <div class="mb-16 sm:mb-20 scroll-reveal">
        <div class="text-[11px] font-mono tracking-[0.2em] text-[#10B981] font-bold mb-3 uppercase flex items-center gap-2">
          <span class="w-1.5 h-1.5 bg-[#10B981]"></span>
          <span>08 / BACKGROUND</span>
        </div>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
          EXPERIENCE &amp; FOUNDATIONS
        </h2>
        <p class="text-lg text-[#888888] font-normal leading-relaxed max-w-xl">
          Academic computer science rigor paired with real-world startup execution.
        </p>
      </div>

      <!-- Editorial Timeline List with Staggered Slide In (Sharp Zero-Radius Rows) -->
      <div class="border-t border-white/10">

        <div
          v-for="(item, index) in experienceList"
          :key="item.role"
          class="relative py-10 sm:py-12 border-b border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-start group hover:glass-panel transition-all px-4 sm:px-6 scroll-reveal before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#10B981] before:scale-y-0 hover:before:scale-y-100 before:transition-transform before:duration-300 before:origin-top"
          :class="`stagger-${index + 1}`"
        >
          <!-- Column 1: Period -->
          <div class="md:col-span-3 text-xs font-mono text-[#888888] group-hover:text-white transition-colors uppercase tracking-wider flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-[#222222] group-hover:bg-[#10B981] transition-colors"></span>
            <span>{{ item.period }}</span>
          </div>

          <!-- Column 2: Role & Organization -->
          <div class="md:col-span-4 flex flex-col">
            <h3 class="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1 group-hover:text-white transition-colors">
              {{ item.role }}
            </h3>
            <span class="text-sm font-mono text-[#10B981]">
              {{ item.org }}
            </span>
          </div>

          <!-- Column 3: Description -->
          <div class="md:col-span-5 text-sm sm:text-base text-[#888888] leading-relaxed">
            <p>{{ item.description }}</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="px-2.5 py-0.5 glass-panel border-white/10 text-[11px] font-mono text-[#888888] group-hover:border-white/30 group-hover:text-white transition-colors"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
const experienceList = [
  {
    period: '2025 — PRESENT',
    role: 'Co-Founder & Full-Stack Lead',
    org: 'Trawbit Technologies',
    description: 'Leading end-to-end product architecture and commercial delivery. Building multi-tenant POS platforms, cross-platform mobile apps, and high-throughput APIs for clients.',
    tags: ['Architecture', 'SaaS', 'Laravel', 'Vue', 'Flutter', 'Cloud'],
  },
  {
    period: '2024',
    role: 'Full-Stack Systems Specialization',
    org: 'Advanced Software Engineering',
    description: 'Deep immersion into high-performance web systems, reactive frontend state management, relational database indexing, and test-driven development.',
    tags: ['FullStack', 'React', 'Next.js', 'APIs', 'PostgreSQL'],
  },
  {
    period: '2021 — 2023',
    role: 'BSc Computer Science',
    org: 'Kannur University Affiliate (IHRD)',
    description: 'Graduated with comprehensive focus on computational theory, algorithm design, relational database modeling, and software engineering methodologies.',
    tags: ['ComputerScience', 'Algorithms', 'SQL', 'DataStructures'],
  },
];
</script>

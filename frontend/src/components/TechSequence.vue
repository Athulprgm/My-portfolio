<template>
  <section
    class="pt-12 sm:pt-16 pb-24 sm:pb-32 px-6 sm:px-8 max-w-6xl mx-auto"
  >
    <!-- Eyebrow & Heading with Scroll Reveal -->
    <div class="mb-12 scroll-reveal">
      <div class="flex items-center gap-2 mb-2">
        <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
        <span class="text-xs font-mono-clean tracking-widest uppercase text-[var(--text-muted)]">
          04 // TECHNICAL DISCIPLINES
        </span>
      </div>
      <h2 class="text-3xl sm:text-5xl font-sans-clean font-extrabold tracking-tight text-[var(--text-primary)]">
        TECHNICAL DISCIPLINES
      </h2>
      <div class="scroll-reveal-line h-[1px] bg-[var(--border-color)] mt-6 w-full"></div>
    </div>

    <!-- 4 Capabilities Grid (Worth Agency Minimal Style) with Staggered Entrance -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="(cap, idx) in capabilities"
        :key="cap.id"
        class="scroll-reveal-scale worth-card p-6 sm:p-8 rounded-sm flex flex-col justify-between group transition-all duration-300 hover:border-[var(--text-primary)] hover:translate-y-[-3px] hover:shadow-lg"
        :class="`reveal-delay-${(idx + 1) * 100}`"
      >
        <div>
          <div class="flex items-center justify-between text-xs font-mono-clean text-[var(--text-muted)] mb-3">
            <span class="font-bold text-[var(--text-primary)] font-mono group-hover:text-emerald-500 transition-colors">
              // {{ cap.id }}
            </span>
            <span class="uppercase tracking-wider text-[10px]">{{ cap.category }}</span>
          </div>

          <h3 class="text-xl sm:text-2xl font-sans-clean font-bold text-[var(--text-primary)] mb-3 group-hover:translate-x-0.5 transition-transform">
            {{ cap.title }}
          </h3>

          <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 font-sans-clean">
            {{ cap.description }}
          </p>
        </div>

        <div class="pt-4 border-t border-[var(--border-color)] flex flex-wrap gap-1.5">
          <span
            v-for="tag in cap.technologies"
            :key="tag"
            class="worth-tag text-[10px] group-hover:border-[var(--text-secondary)] transition-colors"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useScrollReveal } from '../composables/useScrollReveal';

useScrollReveal();

const capabilities = [
  {
    id: '01',
    category: 'BACKEND & APIS',
    title: 'Distributed Systems & Services',
    description: 'Engineering high-throughput RESTful APIs, background queue workers, transaction integrity, and secure authentication flows.',
    technologies: ['Laravel', 'PHP 8.3', 'Node.js', 'Express', 'REST APIs'],
  },
  {
    id: '02',
    category: 'INTERFACES & UX',
    title: 'Reactive Client Frontends',
    description: 'Crafting responsive, accessible user interfaces with micro-interactions, clean state management, and optimized render performance.',
    technologies: ['Vue 3', 'React', 'TypeScript', 'TailwindCSS', 'Vite'],
  },
  {
    id: '03',
    category: 'DATA & STORAGE',
    title: 'Relational Schemas & Caching',
    description: 'Designing normalized database architectures, composite indexes, query optimization, and low-latency in-memory cache layers.',
    technologies: ['PostgreSQL', 'MySQL', 'Redis', 'ACID Schemas'],
  },
  {
    id: '04',
    category: 'INFRASTRUCTURE',
    title: 'Cloud Deployment & DevOps',
    description: 'Containerizing multi-service software for zero-drift deployment across cloud infrastructure with automated CI/CD pipelines.',
    technologies: ['Docker', 'Nginx', 'GitHub Actions', 'Linux'],
  },
];
</script>

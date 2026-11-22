<template>
  <div class="pt-28 sm:pt-40 pb-24 sm:pb-36">
    <!-- Section head -->
    <div class="sw-container">
      <div class="sw-grid gap-y-6 items-end mb-14 sm:mb-20 scroll-reveal">
        <div class="col-span-4 md:col-span-3 sw-label">(04) — Capabilities</div>
        <h2 class="col-span-4 md:col-span-9 sw-h2">
          Tools of the <span class="font-serif-editorial text-[1.08em]">craft.</span>
        </h2>
      </div>
    </div>

    <!-- Full-bleed typographic marquee -->
    <div class="relative overflow-hidden border-y border-[var(--border-color)] py-5 sm:py-7 select-none scroll-reveal group/marquee">
      <div class="sw-marquee flex w-max items-center group-hover/marquee:[animation-play-state:paused]">
        <template v-for="copy in 2" :key="'m-' + copy">
          <span
            v-for="(tech, i) in marqueeItems"
            :key="`m-${copy}-${i}`"
            class="flex items-center font-heading font-medium text-[clamp(2.5rem,7vw,6.5rem)] leading-none tracking-[-0.05em] whitespace-nowrap"
            :aria-hidden="copy === 2 ? 'true' : undefined"
          >
            <span :class="i % 2 === 1 ? 'sw-outline' : 'text-[var(--text-primary)]'">{{ tech }}</span>
            <span class="mx-[0.35em] text-[var(--accent)] text-[0.5em]">✳</span>
          </span>
        </template>
      </div>
    </div>

    <!-- Capability columns -->
    <div class="sw-container mt-16 sm:mt-24">
      <div class="sw-grid gap-y-14">
        <div
          v-for="(cap, idx) in capabilities"
          :key="cap.id"
          class="group col-span-4 md:col-span-6 lg:col-span-3 border-t border-[var(--text-primary)] pt-4 scroll-reveal"
          :class="`reveal-delay-${(idx + 1) * 100}`"
        >
          <div class="flex justify-between sw-label mb-10 sm:mb-16">
            <span class="group-hover:!text-[var(--accent)] transition-colors">{{ cap.id }}</span>
            <span>{{ cap.category }}</span>
          </div>

          <h3 class="text-[1.65rem] leading-[1.02] tracking-[-0.035em] mb-4">
            {{ cap.title }}
          </h3>
          <p class="text-[14px] leading-relaxed text-[var(--text-secondary)] mb-8 max-w-[34ch]">
            {{ cap.description }}
          </p>

          <ul>
            <li
              v-for="tag in cap.technologies"
              :key="tag"
              class="flex items-center justify-between py-2 border-b border-[var(--border-color)] text-[14px] text-[var(--text-primary)] transition-all duration-300 hover:pl-2"
            >
              <span>{{ tag }}</span>
              <span class="font-mono-clean text-[10px] text-[var(--text-muted)]">↘</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useScrollReveal } from '../composables/useScrollReveal';

useScrollReveal();

const marqueeItems = [
  'React',
  'Vue',
  'Next.js',
  'Laravel',
  'Node.js',
  'Flutter',
  'TypeScript',
  'PostgreSQL',
  'Tailwind',
  'Firebase',
  'Docker',
  'MongoDB',
];

const capabilities = [
  {
    id: '01',
    category: 'Frontend',
    title: 'Interface & interaction',
    description:
      'Expressive, responsive interfaces engineered for clarity, smooth motion, accessibility and instant feedback.',
    technologies: ['React', 'Vue 3', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: '02',
    category: 'Backend',
    title: 'APIs & server systems',
    description:
      'Secure REST APIs, authentication pipelines, business logic, webhooks and dependable server architecture.',
    technologies: ['Laravel', 'PHP 8.3', 'Node.js', 'Express.js', 'Docker'],
  },
  {
    id: '03',
    category: 'Data',
    title: 'Storage & data layers',
    description:
      'Indexed relational schemas, caching pipelines and real-time document stores built to stay fast at scale.',
    technologies: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase'],
  },
  {
    id: '04',
    category: 'Mobile & cloud',
    title: 'Apps & delivery',
    description:
      'Cross-platform mobile apps and automated cloud deployments with monitoring and reliable uptime.',
    technologies: ['Flutter', 'React Native', 'Firebase', 'CI/CD', 'Git & GitHub'],
  },
];
</script>

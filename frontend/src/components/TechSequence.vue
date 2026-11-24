<template>
  <div class="pt-20 sm:pt-40 pb-16 sm:pb-36">
    <!-- Section head -->
    <div class="sw-container">
      <div class="sw-grid gap-y-6 items-end mb-10 sm:mb-20 scroll-reveal">
        <div class="col-span-4 md:col-span-3 sw-label">Capabilities</div>
        <h2 class="col-span-4 md:col-span-9 sw-h2">
          Tools of the <span class="font-serif-editorial text-[1.08em]">craft.</span>
        </h2>
      </div>
    </div>

    <!-- Capability columns -->
    <div class="sw-container">
      <div class="sw-grid gap-y-10 sm:gap-y-14">
        <div
          v-for="(cap, idx) in capabilities"
          :key="cap.id"
          class="group col-span-4 md:col-span-6 lg:col-span-3 border-t border-[var(--text-primary)] pt-4 scroll-reveal"
          :class="`reveal-delay-${(idx + 1) * 100}`"
        >
          <div class="sw-label mb-4 sm:mb-14">
            <span>{{ cap.category }}</span>
          </div>

          <h3 class="text-[1.45rem] sm:text-[1.65rem] leading-[1.05] tracking-[-0.035em] mb-3 sm:mb-4">
            {{ cap.title }}
          </h3>
          <p class="text-[14px] leading-relaxed text-[var(--text-secondary)] mb-6 sm:mb-8 max-w-[34ch]">
            {{ cap.description }}
          </p>

          <ul>
            <li
              v-for="tag in cap.technologies"
              :key="tag"
              class="py-2.5 sm:py-2 border-b border-[var(--border-color)] text-[14px] text-[var(--text-primary)]"
            >
              <span>{{ tag }}</span>
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

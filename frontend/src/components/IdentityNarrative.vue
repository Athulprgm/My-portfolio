<template>
  <div class="sw-container pt-20 sm:pt-40 pb-16 sm:pb-36">
    <!-- Section head -->
    <div class="sw-grid gap-y-8 scroll-reveal">
      <div class="col-span-4 md:col-span-3 sw-label">About</div>

      <p class="col-span-4 md:col-span-9 font-heading text-[clamp(1.5rem,3.7vw,3.6rem)] leading-[1.12] sm:leading-[1.06] tracking-[-0.035em] text-[var(--text-primary)]">
        I'm Athul — {{ aboutRolePhrase }}
        <span class="text-[var(--text-muted)]">I believe good software should feel</span>
        <span class="font-serif-editorial text-[1.08em] text-[var(--accent)]">effortlessly simple,</span>
        <span class="text-[var(--text-muted)]">and that every calm interface is held up by disciplined engineering.</span>
      </p>
    </div>

    <!-- Two-column story -->
    <div class="sw-grid gap-y-6 mt-10 sm:mt-20 text-[14px] sm:text-[15px] leading-[1.65] text-[var(--text-secondary)]">
      <p class="col-span-4 md:col-span-4 md:col-start-4 scroll-reveal reveal-delay-100">
        I build practical, dependable AI-driven software and digital products — intelligent workflows, resilient
        backends, and codebases that stay clean long after launch. I move fluidly between AI systems, frontend
        frameworks, server APIs, databases and cloud, picking the sharpest tool for each problem.
      </p>
      <p class="col-span-4 md:col-span-4 md:col-start-9 scroll-reveal reveal-delay-200">
        At <span class="text-[var(--text-primary)]">Trawbit Technologies</span> I partner with founders and businesses to
        take ambitious ideas from first blueprint into live commercial production.
        <a href="https://trawbit.com" target="_blank" rel="noopener noreferrer" class="sw-link text-[var(--text-primary)] mt-4">
          Visit trawbit.com ↗
        </a>
      </p>
    </div>

    <!-- Numbers -->
    <div class="sw-grid gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-10 mt-14 sm:mt-28">
      <div
        v-for="(stat, i) in stats"
        :key="stat.label"
        class="col-span-2 md:col-span-3 border-t border-[var(--text-primary)] pt-4 scroll-reveal"
        :class="`reveal-delay-${(i + 1) * 100}`"
      >
        <div class="sw-label mb-3 sm:mb-14 min-h-[2.4em] flex items-start">
          <span>{{ stat.label }}</span>
        </div>
        <span
          class="block font-heading font-medium text-[clamp(2rem,6.5vw,6.5rem)] leading-[0.9] tracking-[-0.05em] sm:tracking-[-0.06em] text-[var(--text-primary)]"
          :data-count-to="stat.to"
          :data-count-prefix="stat.prefix || undefined"
          :data-count-suffix="stat.suffix"
        >{{ stat.prefix || '' }}{{ stat.to }}{{ stat.suffix }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useScrollReveal } from '../composables/useScrollReveal';
import { useSettings } from '../composables/useSettings';

useScrollReveal();

const { settings, aboutRolePhrase, fetchSettings } = useSettings();

const parseStat = (raw, fallbackTo, fallbackSuffix) => {
  if (!raw || typeof raw !== 'string') return { to: fallbackTo, suffix: fallbackSuffix };
  const match = raw.trim().match(/^([<>]?)(\d+(?:\.\d+)?)\s*(.*)$/);
  if (!match) return { to: fallbackTo, suffix: fallbackSuffix };
  return {
    prefix: match[1] || undefined,
    to: match[2],
    suffix: match[3] || fallbackSuffix,
  };
};

const stats = computed(() => {
  const shipped = parseStat(settings.value?.shipped_works, '15', '+');
  const uptime = parseStat(settings.value?.uptime_focus, '99.9', '%');
  const years = parseStat(settings.value?.experience_years, '3', '+');

  return [
    { label: 'Products shipped', ...shipped },
    { label: 'Uptime SLA', ...uptime },
    { label: 'API latency', to: '60', prefix: '<', suffix: 'ms' },
    { label: 'Years building', ...years },
  ];
});

onMounted(() => {
  fetchSettings();
});
</script>

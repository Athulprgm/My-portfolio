<template>
  <div class="sw-container pt-28 sm:pt-40 pb-24 sm:pb-36">
    <!-- Section head -->
    <div class="sw-grid gap-y-8 scroll-reveal">
      <div class="col-span-4 md:col-span-3 sw-label">(02) — About</div>

      <p class="col-span-4 md:col-span-9 font-heading text-[clamp(1.75rem,3.7vw,3.6rem)] leading-[1.06] tracking-[-0.035em] text-[var(--text-primary)]">
        I'm Athul — a full-stack developer and co-founder of Trawbit Technologies.
        <span class="text-[var(--text-muted)]">I believe good software should feel</span>
        <span class="font-serif-editorial text-[1.08em] text-[var(--accent)]">effortlessly simple,</span>
        <span class="text-[var(--text-muted)]">and that every calm interface is held up by disciplined engineering.</span>
      </p>
    </div>

    <!-- Editorial portrait + two-column story -->
    <div class="sw-grid gap-y-10 items-start mt-16 sm:mt-24 text-[15px] leading-[1.65] text-[var(--text-secondary)]">
      <!-- Editorial Swiss Portrait Frame -->
      <figure class="col-span-4 md:col-span-3 scroll-reveal">
        <div class="group relative border border-[var(--border-strong)] bg-[var(--bg-surface)] overflow-hidden">
          <!-- Top technical meta bar -->
          <div class="flex items-center justify-between px-3.5 py-2 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/60">
            <span class="sw-label !text-[10px]">Fig. 01 — Portrait</span>
            <span class="flex items-center gap-1.5 font-mono-clean text-[10px] uppercase tracking-[0.06em] text-[var(--text-primary)]">
              <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
              <span>AK / 26</span>
            </span>
          </div>

          <!-- Portrait stage with architectural grid & signal accent glow -->
          <div class="relative aspect-[4/4.4] w-full overflow-hidden architectural-grid flex items-end justify-center pt-4">
            <div
              class="absolute inset-x-6 bottom-0 h-3/4 rounded-full blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
              style="background: radial-gradient(circle, var(--accent) 0%, transparent 70%);"
              aria-hidden="true"
            ></div>
            <picture class="relative z-10 w-full h-full flex items-end justify-center">
              <source srcset="/avatar.webp" type="image/webp" />
              <img
                src="/avatar.png"
                alt="Athul Krishna — Full-Stack Engineer & Co-Founder"
                loading="lazy"
                width="512"
                height="512"
                class="w-[92%] h-[96%] object-contain object-bottom select-none transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]"
              />
            </picture>
          </div>

          <!-- Caption footer -->
          <figcaption class="px-3.5 py-2.5 border-t border-[var(--border-color)] bg-[var(--bg-primary)]/60 flex items-center justify-between">
            <span class="font-heading text-[13px] font-medium text-[var(--text-primary)] tracking-[-0.01em]">Athul Krishna K</span>
            <span class="sw-label !text-[9.5px]">Kerala, IN</span>
          </figcaption>
        </div>
      </figure>

      <div class="col-span-4 md:col-span-4 md:col-start-5 scroll-reveal reveal-delay-100 space-y-4">
        <span class="sw-label block">Story</span>
        <p>
          I craft practical, dependable and expressive digital products — tactile interfaces, resilient backends,
          and codebases that stay clean long after launch. I move fluidly between frontend frameworks, server
          APIs, databases, mobile and cloud, picking the sharpest tool for each problem.
        </p>
      </div>

      <div class="col-span-4 md:col-span-4 md:col-start-9 scroll-reveal reveal-delay-200 space-y-4">
        <span class="sw-label block">Venture</span>
        <p>
          At <span class="text-[var(--text-primary)]">Trawbit Technologies</span> I partner with founders and businesses to
          take ambitious ideas from first blueprint into live commercial production.
          <a href="https://trawbit.com" target="_blank" rel="noopener noreferrer" class="sw-link text-[var(--text-primary)] mt-4">
            Visit trawbit.com ↗
          </a>
        </p>
      </div>
    </div>

    <!-- Numbers -->
    <div class="sw-grid gap-y-10 mt-20 sm:mt-28">
      <div
        v-for="(stat, i) in stats"
        :key="stat.label"
        class="col-span-2 md:col-span-3 border-t border-[var(--text-primary)] pt-4 scroll-reveal"
        :class="`reveal-delay-${(i + 1) * 100}`"
      >
        <div class="flex items-start justify-between sw-label mb-8 sm:mb-14">
          <span>{{ stat.label }}</span>
          <span>0{{ i + 1 }}</span>
        </div>
        <span
          class="block font-heading font-medium text-[clamp(3rem,7vw,6.5rem)] leading-[0.85] tracking-[-0.06em] text-[var(--text-primary)]"
          :data-count-to="stat.to"
          :data-count-prefix="stat.prefix || undefined"
          :data-count-suffix="stat.suffix"
        >{{ stat.prefix || '' }}{{ stat.to }}{{ stat.suffix }}</span>
      </div>
    </div>

    <!-- Process -->
    <div class="mt-24 sm:mt-36">
      <div class="sw-grid mb-8 scroll-reveal">
        <div class="col-span-4 md:col-span-3 sw-label">Process</div>
        <div class="col-span-4 md:col-span-9 font-heading text-2xl sm:text-3xl tracking-[-0.03em] text-[var(--text-primary)]">
          How ideas become <span class="font-serif-editorial text-[1.1em]">software.</span>
        </div>
      </div>

      <div class="sw-grid">
        <div class="hidden md:block md:col-span-3"></div>
        <div class="col-span-4 md:col-span-9">
          <div
            v-for="(step, idx) in processSteps"
            :key="step.title"
            class="group grid grid-cols-12 gap-x-4 items-baseline py-5 sm:py-6 border-t border-[var(--border-color)] last:border-b scroll-reveal"
          >
            <span class="col-span-2 sm:col-span-1 font-mono-clean text-[11px] text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
              0{{ idx + 1 }}
            </span>
            <h3 class="col-span-10 sm:col-span-4 text-xl sm:text-2xl tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2">
              {{ step.title }}
            </h3>
            <p class="col-span-10 col-start-3 sm:col-start-auto sm:col-span-7 text-[14px] leading-relaxed text-[var(--text-secondary)] mt-2 sm:mt-0">
              {{ step.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useScrollReveal } from '../composables/useScrollReveal';
import { useSettings } from '../composables/useSettings';

useScrollReveal();

const { settings, fetchSettings } = useSettings();

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

const processSteps = [
  {
    title: 'Discover & scope',
    desc: 'Clarify business goals, user journeys and technical constraints before a single line is written.',
  },
  {
    title: 'System blueprint',
    desc: 'Design prototypes, data schemas and modular API architecture built for longevity.',
  },
  {
    title: 'Craft & engineer',
    desc: 'Build responsive interfaces and resilient full-stack logic in transparent weekly iterations.',
  },
  {
    title: 'Launch & scale',
    desc: 'Deploy to production with telemetry, performance tuning and continuous refinement.',
  },
];
</script>

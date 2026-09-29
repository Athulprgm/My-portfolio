<template>
  <div
    class="pt-16 pb-24 sm:pb-32 px-6 sm:px-8 max-w-6xl mx-auto"
  >
    <!-- Eyebrow & Section Heading -->
    <div class="mb-12">
      <div class="flex items-center gap-2 mb-2">
        <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
        <span class="text-xs font-mono-clean tracking-widest uppercase text-[var(--text-muted)]">
          02 // ABOUT
        </span>
      </div>
      <h2 class="text-3xl sm:text-5xl font-sans-clean font-extrabold tracking-tight text-[var(--text-primary)]">
        BUILDING ACROSS THE STACK.
      </h2>
      <div class="h-[1px] bg-[var(--border-color)] mt-6 w-full"></div>
    </div>

    <!-- Editorial 2-Column Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <div class="lg:col-span-7 space-y-6 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-sans-clean">
        <p class="text-xl sm:text-2xl text-[var(--text-primary)] font-semibold leading-snug">
          “Good software should feel simple. Behind every simple experience is thoughtful engineering.”
        </p>

        <p>
          I’m a Full-Stack Developer focused on building practical, reliable, and well-crafted digital products. I focus on clean interfaces, reliable systems, maintainable code, and products that solve real problems.
        </p>

        <p>
          I work across frontend, backend, databases, mobile development, and cloud services — choosing the right tools for the problem rather than limiting the product to a single stack.
        </p>

        <p>
          As a Co-Founder at <strong class="text-[var(--text-primary)] font-semibold">Trawbit Technologies</strong>, I also work on real-world software products and digital solutions from concept to production.
        </p>
      </div>

      <!-- Right Column: Concise Metrics & Background -->
      <div class="lg:col-span-5 space-y-4">
        <div class="worth-card p-6 rounded-sm transition-all duration-200 hover:border-[var(--text-primary)] hover:translate-y-[-2px]">
          <span class="text-[10px] font-mono-clean uppercase tracking-wider text-[var(--text-muted)] block mb-1">CO-FOUNDER · VENTURE</span>
          <h3 class="text-lg font-sans-clean font-bold text-[var(--text-primary)] mb-1">Building more than software.</h3>
          <p class="text-xs text-[var(--text-secondary)] font-sans-clean leading-relaxed mb-3">
            As a Co-Founder at Trawbit Technologies, I work across engineering, product development, and digital solutions — turning ideas into usable software.
          </p>
          <a
            href="https://trawbit.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[11px] font-mono-clean text-[var(--text-primary)] hover:underline inline-flex items-center gap-1 font-bold"
          >
            <span>VISIT TRAWBIT</span>
            <span>↗</span>
          </a>
        </div>

        <div class="worth-card p-6 rounded-sm transition-all duration-200 hover:border-[var(--text-primary)] hover:translate-y-[-2px]">
          <span class="text-[10px] font-mono-clean uppercase tracking-wider text-[var(--text-muted)] block mb-1">ENGINEERING PHILOSOPHY</span>
          <h3 class="text-lg font-sans-clean font-bold text-[var(--text-primary)] mb-1">Clean &amp; Maintainable</h3>
          <p class="text-xs text-[var(--text-secondary)] font-sans-clean leading-relaxed mb-3">
            Grounded in core computational theory, data structures, relational database modeling, and software engineering methodologies that scale.
          </p>
          <div class="flex flex-wrap gap-1">
            <span class="worth-tag text-[9px] py-0.5 px-2">Architecture</span>
            <span class="worth-tag text-[9px] py-0.5 px-2">Clean Code</span>
            <span class="worth-tag text-[9px] py-0.5 px-2">Scalability</span>
            <span class="worth-tag text-[9px] py-0.5 px-2">Reliability</span>
          </div>
        </div>

        <!-- 3 Numbers with Animated Counting Triggered on Scroll -->
        <div class="grid grid-cols-3 gap-3 pt-2 font-mono-clean text-center">
          <div class="p-3 bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded-sm group hover:border-[var(--text-primary)] transition-colors">
            <span
              class="text-xl sm:text-2xl font-bold text-[var(--text-primary)] block font-mono"
              data-count-to="15"
              data-count-suffix="+"
            >0+</span>
            <span class="text-[9px] text-[var(--text-muted)] uppercase tracking-wider group-hover:text-[var(--text-primary)] transition-colors">Shipped</span>
          </div>
          <div class="p-3 bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded-sm group hover:border-[var(--text-primary)] transition-colors">
            <span
              class="text-xl sm:text-2xl font-bold text-[var(--text-primary)] block font-mono"
              data-count-to="99.9"
              data-count-suffix="%"
            >0.0%</span>
            <span class="text-[9px] text-[var(--text-muted)] uppercase tracking-wider group-hover:text-[var(--text-primary)] transition-colors">Uptime</span>
          </div>
          <div class="p-3 bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded-sm group hover:border-[var(--text-primary)] transition-colors">
            <span
              class="text-xl sm:text-2xl font-bold text-[var(--text-primary)] block font-mono"
              data-count-to="60"
              data-count-prefix="<"
              data-count-suffix="ms"
            >&lt;0ms</span>
            <span class="text-[9px] text-[var(--text-muted)] uppercase tracking-wider group-hover:text-[var(--text-primary)] transition-colors">Latency</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useScrollReveal } from '../composables/useScrollReveal';

useScrollReveal();
</script>

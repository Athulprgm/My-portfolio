<template>
  <div
    class="pt-16 pb-24 sm:pb-32 px-6 sm:px-8 max-w-6xl mx-auto"
  >
    <!-- Eyebrow & Section Heading -->
    <div class="mb-12">
      <div class="flex items-center gap-2 mb-2">
        <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
        <span class="text-xs font-mono-clean tracking-widest uppercase text-[var(--text-muted)]">
          02 // ABOUT &amp; VENTURE
        </span>
      </div>
      <h2 class="text-3xl sm:text-5xl font-sans-clean font-extrabold tracking-tight text-[var(--text-primary)]">
        PHILOSOPHY &amp; BACKGROUND
      </h2>
      <div class="h-[1px] bg-[var(--border-color)] mt-6 w-full"></div>
    </div>

    <!-- Editorial 2-Column Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <div class="lg:col-span-7 space-y-6 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-sans-clean">
        <p class="text-xl sm:text-2xl text-[var(--text-primary)] font-semibold leading-snug">
          “Bridging rigorous systems architecture with refined product intuition. Designing software where performance, simplicity, and business utility converge.”
        </p>

        <p>
          I work across the entire lifecycle — from relational database design and distributed backend architectures in Laravel and Node.js, to responsive, accessible client interfaces in Vue 3, React, and React Native.
        </p>

        <p>
          As co-founder and technical lead at <strong class="text-[var(--text-primary)] font-semibold">Trawbit Technologies</strong>, I lead commercial software engineering: multi-branch retail POS engines, emergency healthcare dispatch networks, and enterprise automation tools.
        </p>
      </div>

      <!-- Right Column: Concise Metrics & Background -->
      <div class="lg:col-span-5 space-y-4">
        <div class="worth-card p-6 rounded-sm transition-all duration-200 hover:border-[var(--text-primary)] hover:translate-y-[-2px]">
          <span class="text-[10px] font-mono-clean uppercase tracking-wider text-[var(--text-muted)] block mb-1">VENTURE LEADERSHIP</span>
          <h3 class="text-lg font-sans-clean font-bold text-[var(--text-primary)] mb-1">Trawbit Technologies</h3>
          <p class="text-xs text-[var(--text-secondary)] font-sans-clean leading-relaxed">
            Co-Founder &amp; Tech Lead delivering production software with 99.9% uptime SLAs and sub-second transaction throughput.
          </p>
        </div>

        <div class="worth-card p-6 rounded-sm transition-all duration-200 hover:border-[var(--text-primary)] hover:translate-y-[-2px]">
          <span class="text-[10px] font-mono-clean uppercase tracking-wider text-[var(--text-muted)] block mb-1">ACADEMIC FOUNDATIONS</span>
          <h3 class="text-lg font-sans-clean font-bold text-[var(--text-primary)] mb-1">B.Sc. in Computer Science</h3>
          <p class="text-xs text-[var(--text-secondary)] font-sans-clean leading-relaxed mb-3">
            Kannur University. Grounded in core computational theory, data structures, relational database modeling, and software engineering methodologies.
          </p>
          <div class="flex flex-wrap gap-1">
            <span class="worth-tag text-[9px] py-0.5 px-2">Data Structures</span>
            <span class="worth-tag text-[9px] py-0.5 px-2">RDBMS &amp; SQL</span>
            <span class="worth-tag text-[9px] py-0.5 px-2">OS &amp; Networks</span>
            <span class="worth-tag text-[9px] py-0.5 px-2">System Design</span>
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

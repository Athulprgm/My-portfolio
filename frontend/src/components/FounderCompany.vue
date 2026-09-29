<template>
  <section
    id="company"
    class="relative py-28 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto z-10 border-t border-[var(--border-color)]"
  >
    <!-- Top Metadata Eyebrow -->
    <div class="flex items-center justify-between mb-16 text-xs font-mono-clean tracking-widest uppercase text-[var(--text-muted)]">
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 bg-[var(--text-primary)]"></span>
        <span>05 // VENTURE &amp; ENTREPRENEURSHIP</span>
      </div>
      <span>TRAWBIT TECHNOLOGIES</span>
    </div>

    <!-- Editorial Spatial Narrative Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      
      <!-- Left Column: The Founder Manifesto -->
      <div class="lg:col-span-6 flex flex-col">
        <div class="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-sm bg-[var(--bg-subtle)] border border-[var(--border-color)] text-xs font-mono-clean tracking-widest uppercase text-[var(--text-primary)] self-start font-semibold">
          <span>CO-FOUNDER &amp; TECHNICAL LEAD</span>
        </div>

        <h2 class="text-3xl sm:text-5xl lg:text-6xl font-sans-clean font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.06] mb-8">
          SOFTWARE ENGINEERED FOR COMMERCIAL LEVERAGE.
        </h2>

        <p class="text-xl sm:text-2xl text-[var(--text-secondary)] font-normal leading-relaxed mb-6">
          “We founded Trawbit Technologies to eliminate operational friction. We engineer dependable software products that manage real revenue, inventory, and mission-critical workflows.”
        </p>

        <p class="text-base text-[var(--text-secondary)] leading-relaxed mb-8 font-sans-clean">
          Rather than creating fragile prototypes, our focus is durable engineering: multi-store retail POS systems, high-throughput cloud databases, and bespoke web platforms. As co-founder, I steer both the technical blueprint and product trajectory.
        </p>

        <!-- Company Metrics (Worth Hairline Metrics) -->
        <div class="grid grid-cols-3 gap-4 pt-8 border-t border-[var(--border-color)]">
          <div class="flex flex-col">
            <span class="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-mono-clean">15+</span>
            <span class="text-[10px] font-mono-clean text-[var(--text-muted)] uppercase tracking-wider mt-1">Systems Shipped</span>
          </div>
          <div class="flex flex-col">
            <span class="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-mono-clean">99.9%</span>
            <span class="text-[10px] font-mono-clean text-[var(--text-muted)] uppercase tracking-wider mt-1">Uptime SLA</span>
          </div>
          <div class="flex flex-col">
            <span class="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-mono-clean">&lt;60ms</span>
            <span class="text-[10px] font-mono-clean text-[var(--text-muted)] uppercase tracking-wider mt-1">API Latency</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Product Verticals Built at Trawbit -->
      <div class="lg:col-span-6 flex flex-col space-y-4 pt-2">
        <span class="text-xs font-mono-clean uppercase tracking-widest text-[var(--text-muted)] block mb-2">
          [ COMMERCIAL OFFERINGS ]
        </span>

        <!-- Vertical 01 -->
        <div class="worth-card p-6 sm:p-8 rounded-sm">
          <div class="flex items-center justify-between mb-3 text-xs font-mono-clean text-[var(--text-muted)]">
            <span class="font-bold text-[var(--text-primary)]">01 // RETAIL &amp; COMMERCE</span>
            <span>ENTERPRISE POS</span>
          </div>
          <h3 class="text-2xl font-sans-clean font-bold text-[var(--text-primary)] mb-2">
            Multi-Branch Inventory &amp; Point of Sale
          </h3>
          <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 font-sans-clean">
            Engineered an all-in-one POS and multi-outlet inventory platform handling thousands of daily transactions, barcode scanning, and real-time revenue analytics.
          </p>
          <div class="flex flex-wrap gap-2 text-[10px] font-mono-clean text-[var(--text-secondary)]">
            <span class="px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded-xs">Laravel</span>
            <span class="px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded-xs">Vue 3</span>
            <span class="px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded-xs">MySQL</span>
            <span class="px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded-xs">WebSockets</span>
          </div>
        </div>

        <!-- Vertical 02 -->
        <div class="worth-card p-6 sm:p-8 rounded-sm">
          <div class="flex items-center justify-between mb-3 text-xs font-mono-clean text-[var(--text-muted)]">
            <span class="font-bold text-[var(--text-primary)]">02 // HEALTHCARE &amp; EMERGENCY</span>
            <span>CRITICAL NETWORKS</span>
          </div>
          <h3 class="text-2xl font-sans-clean font-bold text-[var(--text-primary)] mb-2">
            Geospatial Emergency Healthcare Systems
          </h3>
          <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 font-sans-clean">
            Decentralized blood bank matching and triage dispatch software connecting emergency coordinators with local donors in under 60 seconds.
          </p>
          <div class="flex flex-wrap gap-2 text-[10px] font-mono-clean text-[var(--text-secondary)]">
            <span class="px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded-xs">React Native</span>
            <span class="px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded-xs">Node.js</span>
            <span class="px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded-xs">PostgreSQL</span>
            <span class="px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded-xs">Google Maps</span>
          </div>
        </div>

        <!-- Vertical 03 -->
        <div class="worth-card p-6 sm:p-8 rounded-sm">
          <div class="flex items-center justify-between mb-3 text-xs font-mono-clean text-[var(--text-muted)]">
            <span class="font-bold text-[var(--text-primary)]">03 // CLIENT SERVICES</span>
            <span>CUSTOM ARCHITECTURES</span>
          </div>
          <h3 class="text-2xl font-sans-clean font-bold text-[var(--text-primary)] mb-2">
            Bespoke Digital Product Engineering
          </h3>
          <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 font-sans-clean">
            Partnering directly with founders and business stakeholders to design, architect, and ship high-velocity web platforms from concept to cloud.
          </p>
          <div class="flex flex-wrap gap-2 text-[10px] font-mono-clean text-[var(--text-secondary)]">
            <span class="px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded-xs">Architecture</span>
            <span class="px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded-xs">UI/UX Design</span>
            <span class="px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded-xs">Cloud Deploy</span>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
</script>

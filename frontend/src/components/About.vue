<template>
  <section class="border-b border-[#1E1E1E] bg-black text-white" id="about">

    <!-- ══════════════════ SECTION 04 — FOUNDER + BUILDER ══════════════════ -->
    <div class="py-28 sm:py-36 px-6 sm:px-8 border-b border-[#1E1E1E]">
      <div class="max-w-7xl mx-auto">
        <div class="text-[11px] font-mono tracking-[0.2em] text-[#10B981] font-bold mb-8 uppercase scroll-reveal flex items-center gap-2">
          <span class="w-1.5 h-1.5 bg-[#10B981]"></span>
          <span>04 / DUAL PERSPECTIVE</span>
        </div>

        <!-- Split Editorial Layout with Slide-in from Left and Right -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

          <!-- Left: The Builder (Slide from left, sharp glass box) -->
          <div class="flex flex-col items-start p-8 sm:p-10 glass-panel box-hover-slide scroll-reveal-left border-white/10">
            <div class="text-xs font-mono tracking-widest text-[#888888] uppercase mb-4 flex items-center gap-2">
              <span class="w-2 h-2 bg-white"></span>
              <span>[CRAFTSMANSHIP]</span>
            </div>
            <h3 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              THE BUILDER
            </h3>
            <p class="text-xl sm:text-2xl text-[#888888] font-normal leading-relaxed">
              “I care about clean design, thoughtful details, and software that runs smoothly without bugs.”
            </p>
            <div class="mt-8 pt-6 border-t border-white/10 text-xs font-mono text-[#666666] space-y-2.5 w-full">
              <div class="flex items-center gap-2">
                <span class="text-[#10B981]">✓</span>
                <span class="text-[#CCCCCC]">FAST LOADING SPEEDS &amp; ZERO LAG</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[#10B981]">✓</span>
                <span class="text-[#CCCCCC]">CRASH-RESISTANT &amp; SECURE SYSTEMS</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[#10B981]">✓</span>
                <span class="text-[#CCCCCC]">INTUITIVE INTERFACES CUSTOMERS LOVE</span>
              </div>
            </div>
          </div>

          <!-- Right: The Co-Founder (Slide from right, sharp glass box) -->
          <div class="flex flex-col items-start p-8 sm:p-10 glass-panel box-hover-slide scroll-reveal-right border-white/10">
            <div class="text-xs font-mono tracking-widest text-[#10B981] uppercase mb-4 flex items-center gap-2">
              <span class="w-2 h-2 bg-[#10B981]"></span>
              <span>[BUSINESS MINDSET]</span>
            </div>
            <h3 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              THE PARTNER
            </h3>
            <p class="text-xl sm:text-2xl text-[#888888] font-normal leading-relaxed">
              “I care about solving your real business problem, keeping costs smart, and turning your vision into a product people buy.”
            </p>
            <div class="mt-8 pt-6 border-t border-white/10 text-xs font-mono text-[#666666] space-y-2.5 w-full">
              <div class="flex items-center gap-2">
                <span class="text-[#06B6D4]">✓</span>
                <span class="text-[#CCCCCC]">FOCUS ON REAL CUSTOMERS &amp; REVENUE</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[#06B6D4]">✓</span>
                <span class="text-[#CCCCCC]">SPEED TO MARKET OVER UNNECESSARY COMPLEXITY</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[#06B6D4]">✓</span>
                <span class="text-[#CCCCCC]">DIRECT COMMUNICATION &amp; WEEKLY PROGRESS</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- ══════════════════ SECTION 05 — HOW WE WORK TOGETHER ══════════════════ -->
    <div class="py-28 sm:py-36 px-6 sm:px-8 border-b border-white/10">
      <div class="max-w-7xl mx-auto">
        <div class="mb-16 sm:mb-20 scroll-reveal">
          <div class="text-[11px] font-mono tracking-[0.2em] text-[#10B981] font-bold mb-3 uppercase flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-[#10B981]"></span>
            <span>05 / WORKING PROCESS</span>
          </div>
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            FROM IDEA TO LIVE PRODUCT
          </h2>
        </div>

        <!-- 4-Stage Process with Sharp Glass Rectangles and Staggered Slide In -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <!-- 01 DISCOVER -->
          <div class="flex flex-col p-6 glass-panel box-hover-slide scroll-reveal stagger-1 border-white/10">
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-mono text-[#888888] font-bold">01</span>
              <span class="w-1.5 h-1.5 bg-[#888888]"></span>
            </div>
            <h4 class="text-xl font-bold text-white tracking-tight mb-3">
              DISCOVER
            </h4>
            <p class="text-sm text-[#888888] leading-relaxed">
              We define your business goals, target audience, and key product requirements before starting work.
            </p>
          </div>

          <!-- 02 DESIGN -->
          <div class="flex flex-col p-6 glass-panel box-hover-slide scroll-reveal stagger-2 border-[#10B981]/30">
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-mono text-[#10B981] font-bold">02</span>
              <span class="w-1.5 h-1.5 bg-[#10B981]"></span>
            </div>
            <h4 class="text-xl font-bold text-white tracking-tight mb-3">
              DESIGN
            </h4>
            <p class="text-sm text-[#888888] leading-relaxed">
              We create clean, modern visual prototypes and clear screen flows your customers can test and love.
            </p>
          </div>

          <!-- 03 DEVELOP -->
          <div class="flex flex-col p-6 glass-panel box-hover-slide scroll-reveal stagger-3 border-[#06B6D4]/30">
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-mono text-[#06B6D4] font-bold">03</span>
              <span class="w-1.5 h-1.5 bg-[#06B6D4]"></span>
            </div>
            <h4 class="text-xl font-bold text-white tracking-tight mb-3">
              DEVELOP
            </h4>
            <p class="text-sm text-[#888888] leading-relaxed">
              We engineer high-speed, secure web and mobile applications with automated tests and weekly progress demos.
            </p>
          </div>

          <!-- 04 LAUNCH -->
          <div class="flex flex-col p-6 glass-panel box-hover-slide scroll-reveal stagger-4 border-white/20">
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-mono text-white font-bold">04</span>
              <span class="w-1.5 h-1.5 bg-white"></span>
            </div>
            <h4 class="text-xl font-bold text-white tracking-tight mb-3">
              LAUNCH &amp; GROW
            </h4>
            <p class="text-sm text-[#888888] leading-relaxed">
              We deploy your product to the cloud, monitor 24/7 reliability, and provide continuous improvements as you scale.
            </p>
          </div>

        </div>
      </div>
    </div>

    <!-- ══════════════════ SECTION 05.1 — ABOUT & BIO ══════════════════ -->
    <div class="py-28 sm:py-36 px-6 sm:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          <!-- Left: Narrative (Slide from left) -->
          <div class="lg:col-span-8 flex flex-col items-start scroll-reveal-left">
            <div class="text-[11px] font-mono tracking-[0.2em] text-[#10B981] font-bold mb-4 uppercase flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-[#10B981]"></span>
              <span>05.1 / BACKGROUND &amp; PHILOSOPHY</span>
            </div>
            <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-8">
              BUILT WITH CARE.<br />
              DELIVERED WITH PURPOSE.
            </h2>
            <p class="text-lg sm:text-xl text-[#888888] leading-relaxed max-w-2xl font-normal">
              Athul Krishna is a full-stack developer and software startup co-founder dedicated to building practical, revenue-generating digital products across web, mobile, and business automation.
            </p>
            <p class="text-sm sm:text-base text-[#666666] leading-relaxed max-w-2xl mt-4">
              By combining high-level product strategy with end-to-end execution, he helps businesses launch polished digital experiences without the typical agency overhead.
            </p>
          </div>

          <!-- Right: Metadata Grid (Slide from right, Sharp Glassmorphic Card) -->
          <div class="lg:col-span-4 glass-panel border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl scroll-reveal-right box-hover-slide">
            <div>
              <div class="text-[10px] font-mono tracking-widest text-[#666666] uppercase mb-1">
                ROLE
              </div>
              <div class="text-sm font-semibold text-white">
                Full-Stack Developer &amp; Product Builder
              </div>
            </div>

            <div class="pt-4 border-t border-[#1E1E1E]">
              <div class="text-[10px] font-mono tracking-widest text-[#666666] uppercase mb-1">
                FOCUS
              </div>
              <div class="text-sm font-semibold text-white">
                Web Apps · Mobile Apps · POS &amp; Business Software
              </div>
            </div>

            <div class="pt-4 border-t border-[#1E1E1E]">
              <div class="text-[10px] font-mono tracking-widest text-[#666666] uppercase mb-1">
                COMPANY
              </div>
              <div class="text-sm font-semibold text-white">
                Co-Founder @ Trawbit Technologies
              </div>
            </div>

            <div class="pt-4 border-t border-[#1E1E1E]">
              <div class="text-[10px] font-mono tracking-widest text-[#666666] uppercase mb-1">
                LOCATION
              </div>
              <div class="text-sm font-semibold text-white">
                Kerala, India · Serving Clients Worldwide
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
</script>

<template>
  <section
    class="profile-container relative min-h-screen py-20 sm:py-28 px-4 sm:px-6 flex justify-center items-center overflow-hidden"
    id="home"
    ref="containerRef"
    @mousemove="handleContainerMouseMove"
  >
    <!-- Dynamic cursor spotlight -->
    <div class="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(600px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(99,102,241,0.06),transparent_60%)] transition-all duration-75"></div>

    <!-- Decorative corner lines -->
    <div class="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-indigo-500/10 pointer-events-none z-0"></div>
    <div class="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-indigo-500/10 pointer-events-none z-0"></div>

    <div class="profile-wrapper w-full max-w-6xl flex justify-center items-center gap-10 lg:gap-14 flex-wrap z-10">

      <!-- ========== ID CARD ========== -->
      <div
        class="id-card-container w-full max-w-[300px] sm:max-w-[330px] flex-shrink-0 relative [perspective:1200px] group"
        ref="profileRef"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
      >
        <!-- Glow halo behind card -->
        <div class="absolute -inset-4 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-pink-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

        <div
          class="id-card-inner relative w-full [transform-style:preserve-3d] transition-transform duration-300 ease-out"
          :style="{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }"
        >
          <div class="id-card-face relative w-full rounded-2xl overflow-hidden border border-white/8 shadow-2xl" style="background: linear-gradient(145deg, #111116 0%, #0d0d12 60%, #111116 100%);">

            <!-- Top accent stripe with shimmer -->
            <div class="relative h-1.5 w-full overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500"></div>
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer-anim"></div>
            </div>

            <div class="p-5 sm:p-6 flex flex-col items-center">
              <!-- Header row -->
              <div class="w-full flex justify-between items-center mb-5">
                <span class="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase font-semibold">Trawbit Tech</span>
                <div class="flex items-center gap-1.5 bg-emerald-950/50 border border-emerald-500/25 px-2.5 py-1 rounded-full">
                  <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_6px_#4ade80] animate-pulse"></span>
                  <span class="font-mono text-[9px] text-emerald-400 font-bold tracking-widest">ACTIVE</span>
                </div>
              </div>

              <!-- Avatar wide view -->
              <div class="mb-5 flex justify-center">
                <div class="w-[130px] h-[130px] rounded-full border border-indigo-500/30 bg-black/40 overflow-hidden group-hover:border-indigo-400 group-hover:shadow-[0_0_25px_rgba(99,102,241,0.35)] transition-all duration-500 flex-shrink-0">
                  <ChromaVideo
                    class="w-full h-full animate-pulse-slow"
                    src="/New folder/Animated_movement_no_zoom_developer_202605281113.mp4"
                    :tolerance="55"
                    :zoom="0.8"
                    canvasClass="object-cover rounded-full"
                  />
                </div>
              </div>

              <!-- Name & title -->
              <h2 class="font-mono text-[1.2rem] font-black text-white text-center tracking-tight leading-tight mb-1">ATHUL KRISHNA K</h2>
              <p class="font-mono text-[10px] text-cyan-400 text-center uppercase tracking-[0.2em] font-semibold mb-5">Co-Founder · Full Stack Dev</p>

              <!-- Info rows -->
              <div class="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3 flex flex-col gap-2.5 mb-5">
                <div v-for="row in cardInfo" :key="row.label" class="grid grid-cols-[55px_10px_1fr] items-center">
                  <span class="font-mono text-[9.5px] text-neutral-400 tracking-wider font-bold uppercase">{{ row.label }}</span>
                  <span class="font-mono text-[11px] text-neutral-500 text-center">:</span>
                  <span class="font-mono text-[11.5px] text-neutral-200 font-medium">{{ row.value }}</span>
                </div>
              </div>

              <!-- Footer -->
              <div class="w-full border-t border-white/5 pt-3 flex items-center justify-between">
                <span class="font-mono text-[9.5px] text-neutral-500 tracking-wider">ID: TT-0003</span>
                <div class="flex items-center gap-1.5 text-[9.5px] font-mono text-neutral-400">
                  <i class="fa-solid fa-shield-halved text-indigo-500/60"></i>
                  <span>VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ========== CODE WINDOW / HERO TEXT ========== -->
      <div class="introduce code-window min-w-0 max-w-[660px] w-full flex-1 flex flex-col" ref="textRef">

        <!-- Hero headline above window -->
        <div class="mb-6 text-left">
          <div class="inline-flex items-center gap-2 border border-indigo-500/20 bg-indigo-950/20 rounded-full px-3.5 py-1 mb-4">
            <span class="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
            <span class="font-mono text-[10.5px] text-indigo-300 tracking-wide font-semibold">Available for new projects</span>
          </div>
          <h1 class="font-mono text-4xl sm:text-5xl md:text-6xl font-black leading-none tracking-tight mb-3">
            <span class="text-white">Building</span>
            <span class="block bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">Scalable Systems.</span>
          </h1>
          <p class="font-sans text-base text-neutral-300 leading-relaxed max-w-lg mt-3">
            Co-Founder @ <span class="text-white font-semibold">Trawbit Technologies</span> · MERN specialist crafting high-performance web architectures from Kasaragod, Kerala.
          </p>
        </div>

        <!-- Code editor window -->
        <div class="bg-neutral-950/70 backdrop-blur-md rounded-xl border border-white/8 shadow-2xl overflow-hidden">
          <!-- Window chrome bar -->
          <div class="bg-neutral-950/90 h-10 flex items-center justify-between border-b border-white/5 px-4">
            <div class="flex gap-1.5">
              <div class="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-default"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-default"></div>
              <div class="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-default"></div>
            </div>
            <div class="flex gap-0.5">
              <div
                v-for="tab in tabs"
                :key="tab.id"
                class="px-3.5 py-1.5 text-[10.5px] font-mono cursor-pointer transition-all duration-200 flex items-center gap-1.5 rounded-t"
                :class="activeTab === tab.id
                  ? 'bg-neutral-900 text-white border-t border-indigo-500'
                  : 'text-neutral-500 hover:text-neutral-300'"
                @click="activeTab = tab.id"
              >
                <i :class="tab.icon" class="text-[9.5px]"></i>
                {{ tab.label }}
              </div>
            </div>
            <span class="font-mono text-[9.5px] text-neutral-600 tracking-wider">UTF-8</span>
          </div>

          <!-- CODE TAB -->
          <div v-if="activeTab === 'code'" class="p-5 font-mono text-[13.5px] leading-relaxed select-none h-[320px] overflow-y-auto">
            <div v-for="(line, i) in codeLines" :key="i" class="flex mb-0.5 group/line hover:bg-white/[0.02] rounded px-1 -mx-1">
              <span class="text-neutral-650 w-7 text-right pr-3.5 select-none text-[11px] group-hover/line:text-neutral-400">{{ i + 1 }}</span>
              <span v-html="line" class="flex-1"></span>
            </div>
          </div>

          <!-- TERMINAL TAB -->
          <div v-else class="flex flex-col h-[320px]">
            <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-1.5 text-[13px] font-mono" ref="terminalBodyRef">
              <div v-for="(item, idx) in terminalHistory" :key="idx" class="whitespace-pre-wrap leading-relaxed">
                <span v-if="item.type === 'input'" class="text-emerald-400 font-semibold">athul@dev:~$ </span>
                <span :class="item.type === 'input' ? 'text-white' : 'text-neutral-500'">{{ item.text }}</span>
              </div>
              <div v-if="isTypingCommand" class="flex items-center">
                <span class="text-emerald-400 font-semibold">athul@dev:~$ </span>
                <span class="text-white ml-1">{{ currentTypingText }}</span>
                <span class="inline-block bg-neutral-400 w-1.5 h-3.5 ml-0.5 animate-ping"></span>
              </div>
              <div v-else class="flex items-center">
                <span class="text-emerald-400 font-semibold">athul@dev:~$ </span>
                <span class="inline-block bg-neutral-400 w-1.5 h-3.5 ml-0.5 animate-ping"></span>
              </div>
            </div>
            <div class="flex items-center gap-2.5 p-3 bg-neutral-950/80 border-t border-white/5 flex-wrap">
              <span class="text-[10px] text-neutral-600 font-mono">Run:</span>
              <div class="flex gap-2 flex-wrap">
                <button
                  v-for="cmd in terminalCmds"
                  :key="cmd"
                  :disabled="isTypingCommand"
                  @click="runCommand(cmd)"
                  class="border border-white/8 hover:border-indigo-500/50 text-neutral-400 hover:text-indigo-300 font-mono text-[10px] px-2.5 py-1 rounded bg-white/2 hover:bg-indigo-500/8 disabled:opacity-30 transition-all"
                >{{ cmd }}</button>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA row -->
        <div class="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4 mt-6">
          <button
            @click="scrollToProjects"
            class="flex justify-center items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-mono text-xs font-bold tracking-wider uppercase rounded-lg hover:shadow-[0_0_25px_rgba(99,102,241,0.45)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
          >
            <i class="fa-solid fa-terminal"></i> View Projects
          </button>
          <a
            href="#contact"
            @click.prevent="scrollToContact"
            class="flex justify-center items-center gap-2 px-6 py-3 border border-white/10 hover:border-indigo-500/30 bg-white/2 hover:bg-indigo-500/5 text-neutral-300 hover:text-white font-mono text-xs font-bold tracking-wider uppercase rounded-lg hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
          >
            <i class="fa-solid fa-paper-plane"></i> Contact Me
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import ChromaVideo from './ChromaVideo.vue';

const profileRef = ref(null);
const textRef = ref(null);
const containerRef = ref(null);
const terminalBodyRef = ref(null);

const rotateX = ref(0);
const rotateY = ref(0);
const activeTab = ref('code');

const cardInfo = [
  { label: 'ID', value: 'TT0003' },
  { label: 'DOB', value: '15-04-2005' },
  { label: 'Phone', value: '8590595077' },
  { label: 'Email', value: 'athul@trawbit.com' },
];

const tabs = [
  { id: 'code', label: 'Portal.vue', icon: 'fa-brands fa-vuejs text-emerald-400' },
  { id: 'terminal', label: 'terminal.sh', icon: 'fa-solid fa-terminal text-neutral-500' },
];

const codeLines = [
  `<span class="text-violet-400">class</span> <span class="text-blue-300">Architect</span> <span class="text-violet-400">extends</span> <span class="text-blue-300">FullStackDev</span> <span class="text-orange-400">{</span>`,
  `  <span class="text-violet-400">constructor</span><span class="text-orange-400">()</span> <span class="text-orange-400">{</span>`,
  `    <span class="text-violet-400">super</span><span class="text-orange-400">()</span><span class="text-cyan-400">;</span>`,
  `    <span class="text-neutral-300">this</span><span class="text-cyan-400">.</span><span class="text-emerald-400">name</span> <span class="text-cyan-400">=</span> <span class="text-green-400">"Athul Krishna K"</span><span class="text-cyan-400">;</span>`,
  `    <span class="text-neutral-300">this</span><span class="text-cyan-400">.</span><span class="text-emerald-400">stack</span> <span class="text-cyan-400">=</span> <span class="text-orange-400">[</span><span class="text-green-400">"MERN"</span><span class="text-neutral-400">,</span> <span class="text-green-400">"Vue"</span><span class="text-neutral-400">,</span> <span class="text-green-400">"AWS"</span><span class="text-orange-400">]</span><span class="text-cyan-400">;</span>`,
  `    <span class="text-neutral-300">this</span><span class="text-cyan-400">.</span><span class="text-emerald-400">focus</span> <span class="text-cyan-400">=</span> <span class="text-green-400">"Scalable Architecture"</span><span class="text-cyan-400">;</span>`,
  `    <span class="text-neutral-300">this</span><span class="text-cyan-400">.</span><span class="text-emerald-400">status</span> <span class="text-cyan-400">=</span> <span class="text-green-400">"Available for Hire"</span><span class="text-cyan-400">;</span>`,
  `  <span class="text-orange-400">}</span>`,
  ``,
  `  <span class="text-violet-400">async</span> <span class="text-blue-300">deploy</span><span class="text-orange-400">()</span> <span class="text-orange-400">{</span>`,
  `    <span class="text-violet-400">await</span> <span class="text-blue-300">build</span><span class="text-orange-400">({</span>`,
  `      <span class="text-emerald-400">performance</span><span class="text-cyan-400">:</span> <span class="text-green-400">"Optimized"</span><span class="text-neutral-400">,</span>`,
  `      <span class="text-emerald-400">scalable</span><span class="text-cyan-400">:</span> <span class="text-orange-400">true</span><span class="text-neutral-400">,</span>`,
  `    <span class="text-orange-400">})</span><span class="text-cyan-400">;</span>`,
  `  <span class="text-orange-400">}</span>`,
  `<span class="text-orange-400">}</span>`,
];

const terminalHistory = ref([
  { type: 'output', text: 'Trawbit Systems Kernel v2.5.0-Release' },
  { type: 'output', text: 'Initializing secure shell…' },
  { type: 'output', text: 'Connection established. Ready.' },
]);
const currentTypingText = ref('');
const isTypingCommand = ref(false);
const terminalCmds = ['npm run dev', 'git status', 'cat bio.md', 'clear'];

const scrollTerminal = async () => {
  await nextTick();
  if (terminalBodyRef.value) terminalBodyRef.value.scrollTop = terminalBodyRef.value.scrollHeight;
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('animate-in'); }),
    { threshold: 0.1 }
  );
  if (profileRef.value) observer.observe(profileRef.value);
  if (textRef.value) observer.observe(textRef.value);
});

const handleMouseMove = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const mx = e.clientX - rect.left - rect.width / 2;
  const my = e.clientY - rect.top - rect.height / 2;
  rotateX.value = -(my / (rect.height / 2)) * 10;
  rotateY.value = (mx / (rect.width / 2)) * 10;
};
const handleMouseLeave = () => { rotateX.value = 0; rotateY.value = 0; };

const handleContainerMouseMove = (e) => {
  const c = containerRef.value;
  if (!c) return;
  const rect = c.getBoundingClientRect();
  c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
};

const runCommand = (cmdText) => {
  if (isTypingCommand.value) return;
  isTypingCommand.value = true;
  currentTypingText.value = '';
  let index = 0;
  const interval = setInterval(() => {
    currentTypingText.value += cmdText[index++];
    scrollTerminal();
    if (index >= cmdText.length) {
      clearInterval(interval);
      setTimeout(() => {
        let output = '';
        if (cmdText === 'npm run dev') output = '> my-portfolio-vue@1.0.0 dev\n> vite\n\n  VITE v7.3.3  ready in 280 ms\n\n  ➜  Local:   http://localhost:5173/';
        else if (cmdText === 'git status') output = "On branch main\nYour branch is up to date.\n\nnothing to commit, working tree clean";
        else if (cmdText === 'cat bio.md') output = '# Athul Krishna K\nCo-Founder @ Trawbit Technologies\nMERN · Vue · AWS · Python\nKasaragod, Kerala, India\nStatus: Available for hire.';
        else if (cmdText === 'clear') { terminalHistory.value = []; isTypingCommand.value = false; currentTypingText.value = ''; scrollTerminal(); return; }
        else output = `command not found: ${cmdText}`;
        terminalHistory.value.push({ type: 'input', text: cmdText });
        terminalHistory.value.push({ type: 'output', text: output });
        isTypingCommand.value = false;
        currentTypingText.value = '';
        scrollTerminal();
      }, 200);
    }
  }, 45);
};

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
};
const scrollToProjects = () => scrollToSection('project');
const scrollToContact = () => scrollToSection('contact');
</script>

<style scoped>
.shimmer-anim {
  animation: shimmer 2.5s ease-in-out infinite;
}
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
</style>

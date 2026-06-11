<template>
  <section
    class="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 flex items-center justify-center overflow-hidden noise-overlay hero-grid"
    id="home"
    ref="containerRef"
    @mousemove="handleContainerMouseMove"
  >
    <!-- Background Canvas for Particles -->
    <canvas ref="canvasRef" class="absolute inset-0 pointer-events-none z-0 opacity-40"></canvas>

    <!-- Dynamic cursor spotlight -->
    <div class="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(600px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255, 255, 255,0.06),transparent_60%)] transition-all duration-75"></div>

    <!-- Decorative corner lines -->
    <div class="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#ffffff]/20 pointer-events-none z-0"></div>
    <div class="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#ffffff]/20 pointer-events-none z-0"></div>

    <div class="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-20 items-center z-10 relative mt-8 lg:mt-0">
      
      <!-- ========== LEFT: 3D Profile Card Widget (ID Badge Style) ========== -->
      <div class="w-full flex justify-center lg:justify-start">
        <div 
          class="w-full max-w-sm rounded-2xl border border-[#2A2A2A] bg-[#0A0A0A] backdrop-blur overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          ref="profileRef"
        >
          <div 
            class="w-full h-full relative p-6 flex flex-col"
          >
            <!-- Background effects inside card -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#ffffff]/5 to-transparent opacity-50 pointer-events-none"></div>
            
            <!-- Card Header -->
            <div class="flex justify-between items-center mb-8 relative z-10 pointer-events-none">
              <span class="font-mono text-[9px] text-[#A1A1AA] uppercase tracking-widest font-semibold">Trawbit Tech</span>
              <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-[#ffffff]/20 bg-[#ffffff]/10">
                <span class="w-1.5 h-1.5 rounded-full bg-[#ffffff] animate-pulse"></span>
                <span class="font-mono text-[8px] text-[#ffffff] font-bold uppercase tracking-wider">Active</span>
              </div>
            </div>

            <!-- Profile Video / Avatar -->
            <div class="relative w-36 h-36 mx-auto mb-6 z-10 pointer-events-none">
              <div class="w-full h-full rounded-full overflow-hidden bg-[#0A0A0A] p-1 border border-[#2A2A2A]">
                <ChromaVideo src="/profile-video.mp4" chromaColor="green" :zoom="1.0" canvasClass="w-full h-full object-cover rounded-full" />
              </div>
            </div>

            <!-- Name and Title -->
            <div class="text-center mb-8 relative z-10 pointer-events-none">
              <h2 class="font-mono text-2xl font-bold text-white tracking-tight">ATHUL<br>KRISHNA K</h2>
              <p class="font-mono text-[9px] text-[#A1A1AA] mt-2 uppercase tracking-widest font-semibold">Co-Founder • AI-Augmented Full-Stack Engineer</p>
            </div>

            <!-- Info Box -->
            <div class="border border-[#2A2A2A] rounded-xl p-4 bg-[#0A0A0A] mb-6 relative z-10 pointer-events-none group-hover:border-[#ffffff]/30 transition-colors">
              <div class="space-y-3">
                <div v-for="info in cardInfo" :key="info.label" class="flex items-center font-mono text-[10px]">
                  <span class="text-[#A1A1AA] w-16 uppercase tracking-wider">{{ info.label }}</span>
                  <span class="text-[#A1A1AA] mr-2">:</span>
                  <span class="text-white font-medium truncate group-hover:text-[#ffffff] transition-colors">{{ info.value }}</span>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="mt-auto flex justify-between items-center relative z-10 pt-2 border-t border-[#2A2A2A] pointer-events-none">
              <span class="font-mono text-[9px] text-[#A1A1AA] group-hover:text-[#A1A1AA] transition-colors">ID: TT-0003</span>
              <span class="font-mono text-[9px] text-[#A1A1AA] flex items-center gap-1.5">
                <i class="fa-solid fa-shield-halved text-[#A1A1AA]/70"></i> VERIFIED
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- ========== RIGHT: CONTENT ========== -->
      <div class="flex flex-col justify-center text-left text-reveal text-reveal-delay-3 w-full">
         
         <!-- Status Pill -->
         <div class="inline-flex items-center gap-2 border border-[#2A2A2A] bg-[#121212] rounded-full px-3.5 py-1 mb-6 w-max">
           <span class="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(129,140,248,0.8)]"></span>
           <span class="font-mono text-[9px] text-[#A1A1AA] tracking-[0.1em] uppercase">Professional</span>
         </div>

         <!-- Giant Typography -->
         <h1 class="font-mono text-3xl sm:text-4xl lg:text-5xl leading-tight font-black tracking-tight text-white mb-4">
            AI-Augmented<br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mt-2 block">Full-Stack Engineer.</span>
         </h1>

         <!-- Paragraph -->
         <p class="font-sans text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-8 max-w-xl">
           Building Scalable Products, Intelligent Systems, and Exceptional Digital Experiences.
         </p>

         <!-- Terminal Widget -->
         <div class="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl shadow-2xl overflow-hidden mb-6 w-full max-w-2xl backdrop-blur-sm">
            <div class="bg-[#121212] px-4 py-2.5 flex items-center justify-between border-b border-[#2A2A2A]">
               <div class="flex gap-1.5">
                  <div class="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-green-500"></div>
               </div>
               <div class="flex items-center gap-4">
                  <span class="font-mono text-[10px] text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1.5"><i class="fa-brands fa-vuejs"></i> Portal.vue</span>
                  <span class="font-mono text-[10px] text-[#A1A1AA] flex items-center gap-1.5"><i class="fa-solid fa-angle-right text-[#A1A1AA]"></i> terminal.sh</span>
               </div>
               <span class="font-mono text-[9px] text-[#A1A1AA]">UTF-8</span>
            </div>
            <!-- Terminal code content (syntax highlighted) -->
            <div class="p-6 font-mono text-xs leading-loose text-[#A1A1AA] flex flex-col overflow-x-auto whitespace-nowrap">
               <div><span class="text-[#A1A1AA] mr-4 select-none">1</span><span class="text-pink-400">class</span> <span class="text-yellow-200">Architect</span> <span class="text-pink-400">extends</span> <span class="text-cyan-300">FullStackDev</span> {</div>
               <div><span class="text-[#A1A1AA] mr-4 select-none">2</span><span class="text-yellow-200">constructor</span>() {</div>
               <div><span class="text-[#A1A1AA] mr-4 select-none">3</span><span class="text-pink-400">super</span>();</div>
               <div><span class="text-[#A1A1AA] mr-4 select-none">4</span><span class="text-red-400">this</span>.<span class="text-white">name</span> = <span class="text-emerald-400">"Athul Krishna K"</span>;</div>
               <div><span class="text-[#A1A1AA] mr-4 select-none">5</span><span class="text-red-400">this</span>.<span class="text-white">stack</span> = [<span class="text-emerald-400">"MERN"</span>, <span class="text-emerald-400">"Vue"</span>, <span class="text-emerald-400">"AWS"</span>];</div>
               <div><span class="text-[#A1A1AA] mr-4 select-none">6</span><span class="text-red-400">this</span>.<span class="text-white">focus</span> = <span class="text-emerald-400">"Scalable Architecture"</span>;</div>
               <div><span class="text-[#A1A1AA] mr-4 select-none">7</span><span class="text-red-400">this</span>.<span class="text-white">status</span> = <span class="text-emerald-400">"Available for Hire"</span>;</div>
               <div><span class="text-[#A1A1AA] mr-4 select-none">8</span>}</div>
               <div><span class="text-[#A1A1AA] mr-4 select-none">9</span></div>
               <div><span class="text-[#A1A1AA] mr-4 select-none">10</span><span class="text-pink-400">async</span> <span class="text-yellow-200">deploy</span>() {</div>
               <div><span class="text-[#A1A1AA] mr-4 select-none">11</span><span class="text-pink-400">await</span> <span class="text-yellow-200">build</span>({</div>
               <div><span class="text-[#A1A1AA] mr-4 select-none">12</span><span class="text-cyan-300">performance:</span> <span class="text-emerald-400">"Optimized"</span>,</div>
               <div><span class="text-[#A1A1AA] mr-4 select-none">13</span><span class="text-cyan-300">scalable:</span> <span class="text-orange-400">true</span>,</div>
            </div>
         </div>

         <!-- Action Links -->
         <div class="flex items-center gap-6 mt-2">
            <button @click="scrollToProjects" class="font-mono text-xs font-bold text-white hover:text-[#A1A1AA] flex items-center gap-2 transition-colors group">
               <i class="fa-solid fa-angle-right"></i> VIEW INVENTORY
            </button>
            <a href="#contact" @click.prevent="scrollToContact" class="font-mono text-xs font-bold text-[#A1A1AA] hover:text-white flex items-center gap-2 transition-colors group px-4 py-2 border border-[#2A2A2A] bg-[#2A2A2A] rounded-lg hover:bg-[#2A2A2A]">
               <i class="fa-regular fa-paper-plane"></i> INITIATE COMMS
            </a>
         </div>
      </div>
    </div>v>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import ChromaVideo from './ChromaVideo.vue';

const profileRef = ref(null);
const containerRef = ref(null);
const terminalBodyRef = ref(null);
const canvasRef = ref(null);

const rotateX = ref(0);
const rotateY = ref(0);

const cardInfo = [
  { label: 'ID', value: 'TT0003' },
  { label: 'DOB', value: '15-04-2005' },
  { label: 'Phone', value: '8590595077' },
  { label: 'Email', value: 'athul@trawbit.com' },
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

// Canvas Particles
let rafId = null;
const particles = [];
const PARTICLE_COUNT = 40;

const initParticles = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      speedY: Math.random() * 0.5 + 0.1,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2
    });
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX;
      if (p.y < 0) {
        p.y = canvas.height;
        p.x = Math.random() * canvas.width;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctx.fill();
    });
    rafId = requestAnimationFrame(animate);
  };
  animate();
};

const handleResize = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('animate-in'); }),
    { threshold: 0.1 }
  );
  if (profileRef.value) observer.observe(profileRef.value);

  initParticles();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
  window.removeEventListener('resize', handleResize);
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
        if (cmdText === 'npm run dev') output = '> trawbit-systems@2.0.0 dev\n> vite\n\n  VITE v7.3.3  ready in 280 ms\n\n  ➜  Local:   http://localhost:5173/';
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

@keyframes shimmer {
  from { transform: translateX(-100%); }
  to { transform: translateX(200%); }
}
</style>

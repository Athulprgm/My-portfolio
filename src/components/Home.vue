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

    <div class="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-12 lg:gap-16 items-center z-10 relative mt-8 lg:mt-0">
      
      <!-- ========== LEFT: 3D Profile Card Widget (ID Badge Style) ========== -->
      <div class="w-full flex justify-center lg:justify-start">
        <div 
          class="w-full max-w-[345px] rounded-[2rem] border-2 border-purple-400/30 bg-purple-900/40 backdrop-blur-2xl shadow-[inset_0_0_40px_rgba(168,85,247,0.3),0_0_50px_rgba(0,0,0,0.8)] relative font-mono p-3 flex flex-col gap-3"
          ref="profileRef"
        >
          <!-- Top Shoulder Buttons Visuals -->
          <div class="absolute -top-1 left-6 w-12 h-2 bg-purple-800/80 rounded-t-lg border-t border-purple-400/50"></div>
          <div class="absolute -top-1 right-6 w-12 h-2 bg-purple-800/80 rounded-t-lg border-t border-purple-400/50"></div>

          <!-- Screen Area Bezel -->
          <div class="bg-black p-3 rounded-[1.25rem] border-b-2 border-r-2 border-purple-900/50 shadow-[inset_0_10px_30px_rgba(0,0,0,1)]">
            
            <!-- Dark Holographic Screen -->
            <div
              class="screen-box relative w-full aspect-[4/3] bg-[#020202] rounded-xl border border-[#1A1A1A] overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,1)]"
              :class="{ 'is-glitching': screenGlitch }"
            >
              <!-- Grid background -->
              <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none opacity-50"></div>
              <!-- Scanline -->
              <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none" style="z-index:2"></div>

              <!-- VIDEO (always mounted & playing) -->
              <div class="absolute inset-0 w-full h-full" style="z-index:3">
                <ChromaVideo
                  src="/New folder/create_animation_vedio __scene.mp4"
                  chromaColor="green"
                  :zoom="1.25"
                  canvasClass="w-full h-full object-cover filter drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] mix-blend-screen"
                />
                <!-- Spider-Man BGM -->
                <audio ref="bgmAudioRef" src="/New folder/spiderman_3_simbionte.mp3" loop preload="auto"></audio>
              </div>

              <!-- DETAILS PANEL (slides over video) -->
              <Transition name="screen-fade">
                <div v-if="showDetails" class="absolute inset-0 flex flex-col justify-center px-4 py-3 bg-[#020a06] font-mono" style="z-index:4">
                  <div class="flex items-center gap-2 mb-3 border-b border-emerald-500/30 pb-2">
                    <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]"></span>
                    <span class="text-[8px] text-emerald-400 tracking-[0.2em] uppercase font-bold">PROFILE // LOADED</span>
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <div v-for="item in profileDetails" :key="item.label" class="flex justify-between items-center">
                      <span class="text-[8px] text-purple-400 uppercase tracking-widest font-bold">{{ item.label }}</span>
                      <span class="text-[8px] text-emerald-300 font-bold tracking-wide">{{ item.value }}</span>
                    </div>
                  </div>
                  <div class="mt-3 border-t border-emerald-500/20 pt-2">
                    <span class="text-[7px] text-gray-600 font-mono">STATUS: <span class="text-emerald-400">AVAILABLE FOR HIRE</span></span>
                  </div>
                </div>
              </Transition>
            </div>
            
            <!-- Removed Logo inside bezel -->
          </div>

          <!-- Outer Terminal Data Dashboard -->
          <div class="flex flex-col bg-black/40 rounded-xl border border-purple-500/20 p-2.5 shadow-inner relative overflow-hidden mt-1">
            <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none"></div>
            
            <div class="flex items-center justify-end mb-1.5 border-b border-purple-500/20 pb-1.5 relative z-10">
              <div class="flex gap-1">
                <div class="w-1.5 h-2 bg-emerald-500 rounded-sm"></div>
                <div class="w-1.5 h-2 bg-emerald-500 rounded-sm"></div>
                <div class="w-1.5 h-2 bg-emerald-500 rounded-sm opacity-30"></div>
              </div>
            </div>
            
            <div class="relative z-10 flex items-center justify-between gap-2">
              <h2 class="text-[7px] font-black text-white tracking-tight whitespace-nowrap leading-tight font-sans uppercase">Athul Krishna K</h2>
              <div class="flex items-center gap-2 shrink-0">
                <p class="text-[7px] text-[#A1A1AA] uppercase tracking-widest font-mono font-bold whitespace-nowrap">ID: TT-0003</p>
                <span class="text-purple-500/40">|</span>
                <p class="text-[7px] text-indigo-400 uppercase tracking-widest font-mono font-black whitespace-nowrap">FULL-STACK</p>
              </div>
            </div>
          </div>

          <!-- 3 Buttons: DETAILS, SOUND, BACK -->
          <div class="flex items-center justify-between gap-3 px-3 py-2 mt-1">
            <!-- DETAILS Button (Realistic) -->
            <button
              @click="showDetailsPanel"
              :disabled="showDetails"
              class="flex-1 py-2.5 rounded shadow-[0_4px_6px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.2)] font-mono text-[9px] font-bold uppercase tracking-[0.15em] border-t border-purple-400/50 transition-all duration-150 flex items-center justify-center gap-1.5"
              :class="showDetails
                ? 'bg-gradient-to-b from-purple-900/40 to-purple-900/20 text-purple-700/50 shadow-none translate-y-1 border-t-0 cursor-not-allowed'
                : 'bg-gradient-to-b from-purple-700/80 to-purple-900/80 text-purple-100 hover:from-purple-600/80 hover:to-purple-800/80 active:translate-y-1 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] active:border-t-0'"
            >
              <i class="fa-solid fa-id-card text-[8px]"></i> DETAILS
            </button>

            <!-- SOUND Toggle Button -->
            <button
              @click="toggleSound"
              class="w-10 h-10 rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.2)] border-t transition-all duration-150 flex items-center justify-center shrink-0"
              :class="soundEnabled
                ? 'bg-gradient-to-b from-emerald-600/80 to-emerald-800/80 border-emerald-400/50 text-emerald-100 active:translate-y-1 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] active:border-t-0 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-gradient-to-b from-gray-700/80 to-gray-900/80 border-gray-400/50 text-gray-400 hover:from-gray-600/80 hover:to-gray-800/80 active:translate-y-1 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] active:border-t-0'"
              :title="soundEnabled ? 'Sound ON' : 'Sound OFF'"
            >
              <i class="fa-solid" :class="soundEnabled ? 'fa-volume-high' : 'fa-volume-xmark'"></i>
            </button>

            <!-- BACK Button (Realistic) -->
            <button
              @click="showVideoPanel"
              :disabled="!showDetails"
              class="flex-1 py-2.5 rounded shadow-[0_4px_6px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.2)] font-mono text-[9px] font-bold uppercase tracking-[0.15em] border-t transition-all duration-150 flex items-center justify-center gap-1.5"
              :class="!showDetails
                ? 'bg-gradient-to-b from-gray-800/40 to-gray-900/20 text-gray-600/50 border-gray-700/20 shadow-none translate-y-1 cursor-not-allowed border-t-0'
                : 'bg-gradient-to-b from-gray-600/80 to-gray-800/80 border-gray-400/50 text-gray-100 hover:from-gray-500/80 hover:to-gray-700/80 active:translate-y-1 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] active:border-t-0'"
            >
              <i class="fa-solid fa-rotate-left text-[8px]"></i> BACK
            </button>
          </div>

          <!-- Speaker Grills (decorative only) -->
          <div class="flex justify-end gap-1.5 px-4 pb-2 opacity-40">
            <div class="w-1 h-1 rounded-full bg-purple-400"></div>
            <div class="w-1 h-1 rounded-full bg-purple-400"></div>
            <div class="w-1 h-1 rounded-full bg-purple-400"></div>
            <div class="w-1 h-1 rounded-full bg-purple-400"></div>
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
         <div class="bg-[#0D0D12] border border-[#2A2A35] rounded-xl shadow-2xl overflow-hidden mb-6 w-full max-w-2xl backdrop-blur-sm relative group transition-all duration-300 hover:border-[#3A3A45] hover:shadow-[0_0_30px_rgba(0,0,0,0.6)]">
            <!-- Active Focus Frame Glow -->
            <div class="absolute inset-0 pointer-events-none border border-emerald-500/0 group-hover:border-emerald-500/20 rounded-xl transition-all duration-500"></div>

            <div class="bg-[#16161E] px-4 py-2.5 flex items-center justify-between border-b border-[#2A2A35]">
               <div class="flex gap-1.5">
                  <div class="w-3 h-3 rounded-full bg-[#EC6A5E] border border-[#D04E42]"></div>
                  <div class="w-3 h-3 rounded-full bg-[#F3BF4F] border border-[#D6A243]"></div>
                  <div class="w-3 h-3 rounded-full bg-[#61C554] border border-[#4A9B40]"></div>
               </div>
               <div class="flex items-center gap-4">
                  <span class="font-mono text-[11px] text-emerald-300 bg-emerald-950/40 px-2.5 py-0.5 rounded-md border border-emerald-500/20 flex items-center gap-1.5 shadow-sm"><i class="fa-brands fa-vuejs"></i> Portal.vue</span>
                  <span class="font-mono text-[11px] text-[#8A8A9A] flex items-center gap-1.5"><i class="fa-solid fa-angle-right text-[#5A5A6A]"></i> terminal.sh</span>
               </div>
               <span class="font-mono text-[10px] text-[#5A5A6A]">UTF-8</span>
            </div>
            <!-- Terminal code content (syntax highlighted) -->
            <div class="p-6 font-mono text-[13px] leading-[1.8] tracking-wide text-[#A1A1B5] flex flex-col overflow-x-auto whitespace-nowrap bg-[#0D0D12]">
               <div><span class="text-[#4A4A5A] mr-5 select-none text-right inline-block w-4">1</span><span class="text-pink-300">class</span> <span class="text-amber-200">Architect</span> <span class="text-pink-300">extends</span> <span class="text-cyan-200">FullStackDev</span> {</div>
               <div><span class="text-[#4A4A5A] mr-5 select-none text-right inline-block w-4">2</span><span class="text-amber-200 ml-4">constructor</span>() {</div>
               <div><span class="text-[#4A4A5A] mr-5 select-none text-right inline-block w-4">3</span><span class="text-pink-300 ml-8">super</span>();</div>
               <div><span class="text-[#4A4A5A] mr-5 select-none text-right inline-block w-4">4</span><span class="text-indigo-300 ml-8">this</span>.<span class="text-[#E1E1E6]">name</span> = <span class="text-emerald-300">"Athul Krishna K"</span>;</div>
               <div><span class="text-[#4A4A5A] mr-5 select-none text-right inline-block w-4">5</span><span class="text-indigo-300 ml-8">this</span>.<span class="text-[#E1E1E6]">stack</span> = [<span class="text-emerald-300">"MERN"</span>, <span class="text-emerald-300">"Vue"</span>, <span class="text-emerald-300">"AWS"</span>];</div>
               <div><span class="text-[#4A4A5A] mr-5 select-none text-right inline-block w-4">6</span><span class="text-indigo-300 ml-8">this</span>.<span class="text-[#E1E1E6]">focus</span> = <span class="text-emerald-300">"Scalable Architecture"</span>;</div>
               <div><span class="text-[#4A4A5A] mr-5 select-none text-right inline-block w-4">7</span><span class="text-indigo-300 ml-8">this</span>.<span class="text-[#E1E1E6]">status</span> = <span class="text-emerald-300">"Available for Hire"</span>;</div>
               <div><span class="text-[#4A4A5A] mr-5 select-none text-right inline-block w-4">8</span><span class="ml-4">}</span></div>
               <div><span class="text-[#4A4A5A] mr-5 select-none text-right inline-block w-4">9</span></div>
               <div><span class="text-[#4A4A5A] mr-5 select-none text-right inline-block w-4">10</span><span class="text-pink-300 ml-4">async</span> <span class="text-amber-200">deploy</span>() {</div>
               <div><span class="text-[#4A4A5A] mr-5 select-none text-right inline-block w-4">11</span><span class="text-pink-300 ml-8">await</span> <span class="text-amber-200">build</span>({</div>
               <div><span class="text-[#4A4A5A] mr-5 select-none text-right inline-block w-4">12</span><span class="text-cyan-200 ml-12">performance:</span> <span class="text-emerald-300">"Optimized"</span>,</div>
               <div><span class="text-[#4A4A5A] mr-5 select-none text-right inline-block w-4">13</span><span class="text-cyan-200 ml-12">scalable:</span> <span class="text-orange-300">true</span><span class="w-2 h-[15px] bg-emerald-400/80 animate-pulse inline-block align-middle ml-1 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span></div>
            </div>
         </div>

         <!-- Action Links -->
         <div class="flex items-center gap-6 mt-6">
            <!-- Cyberdeck Sync Button -->
            <button @click="scrollToProjects" class="relative group focus:outline-none flex items-center">
              <!-- Dark Industrial Button -->
              <span class="relative px-6 py-3 bg-[#111] border border-[#333] text-[#A1A1AA] font-mono text-xs font-bold tracking-[0.15em] hover:text-white hover:border-[#555] transition-all group-active:scale-95 flex items-center gap-3 shadow-lg">
                <i class="fa-solid fa-server group-hover:text-emerald-400 transition-colors"></i> SYS_OVERRIDE // PORTFOLIO
                <span class="absolute top-0 right-0 w-2 h-2 border-l border-b border-[#333] opacity-50"></span>
                <span class="absolute bottom-0 left-0 w-2 h-2 border-r border-t border-[#333] opacity-50"></span>
              </span>
            </button>

            <!-- Secondary Terminal Link -->
            <a href="#contact" @click.prevent="scrollToContact" class="font-mono text-xs font-bold text-[#A1A1AA] hover:text-white flex items-center gap-2 transition-colors group px-4 py-3 hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10">
               <span class="text-emerald-400">></span> INITIATE_COMMS<span class="animate-pulse">_</span>
            </a>
         </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import ChromaVideo from './ChromaVideo.vue';

const profileRef    = ref(null);
const containerRef  = ref(null);
const terminalBodyRef = ref(null);
const canvasRef     = ref(null);
const bgmAudioRef   = ref(null);
const showDetails   = ref(false);
const screenGlitch  = ref(false);
const soundEnabled  = ref(false);

// Automatically handle background music when sound/screen toggles
watch([soundEnabled, showDetails], ([isSoundOn, isDetailsOpen]) => {
  if (bgmAudioRef.value) {
    if (isSoundOn && !isDetailsOpen) {
      bgmAudioRef.value.volume = 0.15; // Very subtle, non-disturbing background volume
      bgmAudioRef.value.play().catch(() => console.warn('BGM play blocked'));
    } else {
      bgmAudioRef.value.pause();
    }
  }
});

const profileDetails = [
  { label: 'NAME',        value: 'Athul Krishna K'       },
  { label: 'DOB',         value: '15 · APR · 2005'       },
  { label: 'ID',          value: 'TT-0003'                },
  { label: 'DESIGNATION', value: 'Full-Stack Engineer'    },
  { label: 'COMPANY',     value: 'Trawbit Technologies'   },
  { label: 'LOCATION',    value: 'Kasaragod, Kerala'      },
  { label: 'EMAIL',       value: 'athul@trawbit.com'      },
];

const toggleSound = () => {
  soundEnabled.value = !soundEnabled.value;
};

let currentAudio = null;

const speakDetails = async () => {
  if (!soundEnabled.value) return;

  // Strict listing of requested fields, but with ellipses (...) to force natural pauses between fields
  const text = "Name... Athul Krishna K. ... Date of birth... 15 April 2005. ... Designation... Full Stack Engineer. ... Company... Trawbit Technologies. ... Location... Kasaragod, Kerala. ... Email... athul at trawbit dot com.";

  // Stop any currently playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (window.speechSynthesis) window.speechSynthesis.cancel();

  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;

  if (apiKey) {
    try {
      // Use Sarah's voice (very natural, clear human voice)
      const voiceId = "EXAVITQu4vr4xnSDxMaL"; 
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": apiKey
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.6, 
            similarity_boost: 0.85,
            style: 0.2,
            use_speaker_boost: true
          }
        })
      });

      if (!response.ok) throw new Error("ElevenLabs API failed.");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      currentAudio = new Audio(url);
      currentAudio.play();
      return; 
    } catch (error) {
      console.error("ElevenLabs error, falling back to browser TTS:", error);
    }
  }

  // Fallback: Make browser TTS sound clear and human
  if (window.speechSynthesis) {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Grab the best available human voice
    let voices = window.speechSynthesis.getVoices();
    
    const setHumanVoice = () => {
      voices = window.speechSynthesis.getVoices();
      const premiumVoice = voices.find(v => 
        v.name.includes('Natural') || 
        v.name.includes('Premium') || 
        v.name.includes('Google US') || 
        v.name.includes('Samantha') || 
        v.name.includes('Zira')
      );
      if (premiumVoice) utterance.voice = premiumVoice;
      
      utterance.rate = 0.9; // Slower rate so it's easy to understand
      utterance.pitch = 1.0; // Normal human pitch
      
      window.speechSynthesis.speak(utterance);
    };

    if (voices.length > 0) {
      setHumanVoice();
    } else {
      window.speechSynthesis.onvoiceschanged = setHumanVoice;
    }
  }
};

const triggerGlitch = (cb) => {
  // Force animation restart by toggling off first
  screenGlitch.value = false;
  // Next tick ensures DOM resets before re-enabling
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      screenGlitch.value = true;
      setTimeout(() => {
        cb();
        setTimeout(() => { screenGlitch.value = false; }, 350);
      }, 280);
    });
  });
};

const showDetailsPanel = () => triggerGlitch(() => { 
  showDetails.value = true;  
  speakDetails();
});

const showVideoPanel   = () => triggerGlitch(() => { 
  showDetails.value = false; 
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (window.speechSynthesis) window.speechSynthesis.cancel();
});

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
const scrollToContact  = () => scrollToSection('contact');
const scrollToSkills   = () => scrollToSection('skills');
</script>

<style scoped>
.shimmer-anim {
  animation: shimmer 2.5s ease-in-out infinite;
}
@keyframes shimmer {
  from { transform: translateX(-100%); }
  to   { transform: translateX(200%); }
}

/* Screen content fade */
.screen-fade-enter-active  { transition: opacity 0.3s ease 0.15s, transform 0.3s ease 0.15s; }
.screen-fade-leave-active  { transition: opacity 0.15s ease; }
.screen-fade-enter-from    { opacity: 0; transform: scale(1.03) translateY(3px); }
.screen-fade-leave-to      { opacity: 0; }

/* Glitch: CSS filter animation on the screen container itself */
@keyframes screen-glitch {
  0%   { filter: none;                                         transform: translateX(0); }
  10%  { filter: hue-rotate(60deg) brightness(1.6) contrast(1.2);  transform: translateX(3px); }
  20%  { filter: hue-rotate(180deg) brightness(0.7) contrast(1.5); transform: translateX(-4px); }
  30%  { filter: hue-rotate(90deg) saturate(3) brightness(1.4);    transform: translateX(2px); }
  40%  { filter: hue-rotate(270deg) brightness(1.2);               transform: translateX(-2px); }
  50%  { filter: brightness(2) contrast(0.8);                      transform: translateX(4px); }
  60%  { filter: hue-rotate(360deg) saturate(2) brightness(0.9);   transform: translateX(-3px); }
  80%  { filter: hue-rotate(90deg) brightness(1.1);                transform: translateX(1px); }
  100% { filter: none;                                         transform: translateX(0); }
}
.screen-box.is-glitching {
  animation: screen-glitch 0.55s ease-in-out forwards;
}

</style>


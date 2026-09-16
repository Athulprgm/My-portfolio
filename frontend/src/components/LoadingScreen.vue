<template>
  <div
    class="hello-loader fixed inset-0 w-screen h-screen bg-[#050505] text-white z-[9999] overflow-hidden flex flex-col justify-between items-center select-none cursor-default"
    :class="{ 'hello-loader-exit': isExiting }"
  >
    <!-- Soft Ambient Display Aura -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 50%, transparent 75%);"
    ></div>

    <!-- Minimal Subtle Header -->
    <header class="w-full pt-8 px-8 sm:px-12 flex justify-between items-center z-10 opacity-40">
      <span class="text-[11px] font-mono tracking-[0.3em] uppercase">ATHUL KRISHNA</span>
      <span class="text-[11px] font-mono tracking-[0.3em] uppercase">© 2026</span>
    </header>

    <!-- Center Stage: The Iconic Apple Cursive "hello" Writing Animation -->
    <main class="relative z-10 flex flex-col items-center justify-center my-auto w-full px-6">
      <div class="w-[210px] sm:w-[280px] md:w-[350px] lg:w-[400px] max-w-[70vw] flex items-center justify-center relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-109.06069946289062 -9 2504.0606994628906 746.156005859375"
          class="w-full h-auto overflow-visible filter drop-shadow-[0_0_15px_rgba(255,255,255,0.45)]"
        >
          <g transform="scale(1, -1) translate(0, -728.156005859375)">
            <!-- Path 1: Initial 'h' stroke -->
            <path
              ref="path1Ref"
              d="M-109.06069946289062,95.92639923095703 C1.9544999599456787,157.6403045654297 103.11389923095703,236.9969940185547 217.881103515625,372.07550048828125 C296,464.2846984863281 337.9999084472656,569.5725708007812 340,642.1939697265625 C341,696.1920166015625 314.6702880859375,737.156005859375 266,737.156005859375 C212,737.156005859375 178,696.1920166015625 157,602.1610107421875 C134,498.82000732421875 117,380.239990234375 74,0 "
              fill="none"
              stroke="#ffffff"
              stroke-width="50"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="writing-path"
            />
            <!-- Path 2: Continuous 'ello' loop & flourish -->
            <path
              ref="path2Ref"
              d="M78.21453094482422,37.160953521728516 C100.22924041748047,230.68260192871094 184,372 291,372 C355,372 395.6745910644531,321 384.1253967285156,248 C377.6238098144531,205 370.0873107910156,161 361.3063049316406,110 C351.0714111328125,46 380.3254089355469,-4 468.96173095703125,-4 C598.2246704101562,-4 739.2435302734375,67.83381652832031 811.4124145507812,179.0941619873047 C836,217 846,251 847,284 C848,344 814,389 754,389 C678,389 620,303 620,193 C620,75 684,-8 819.9180908203125,-8 C1004.7244873046875,-8 1209.4246826171875,213.84754943847656 1303.4808349609375,461.42327880859375 C1330.037353515625,531.3258056640625 1340,596.2349243164062 1340,641.593994140625 C1340,695.3764038085938 1323,736.673583984375 1275,736.673583984375 C1228,736.673583984375 1197,700.1784057617188 1169,642.5543823242188 C1136.1939697265625,575.7216186523438 1111.927734375,479.32598876953125 1102,370.3599853515625 C1077,96.94000244140625 1133,-4 1266.152099609375,-4 C1427.6083984375,-4 1607.1151123046875,220.92921447753906 1698.771728515625,462.18878173828125 C1725.037353515625,531.3258056640625 1735,596.2349243164062 1735,641.593994140625 C1735,695.3764038085938 1718,736.673583984375 1670,736.673583984375 C1623,736.673583984375 1592,700.1784057617188 1564,642.5543823242188 C1531.1939697265625,575.7216186523438 1506.927734375,479.32598876953125 1497,370.3599853515625 C1472,96.94000244140625 1528,-4 1646.906005859375,-4 C1765.623779296875,-4 1830.114990234375,99.48485565185547 1868.77880859375,209.3712158203125 C1907,318 1954,385 2052,385 C2133,385 2197,325 2197,212 C2197,87 2115.90087890625,-7 2013.41845703125,-8 C1923.234130859375,-9 1864,64 1870,174 C1877,296 1951,385 2048,385 C2104,385 2151.03564453125,360.1071472167969 2188,333 C2288.21435546875,259.8928527832031 2365.4287109375,305.0714416503906 2395,377.3571472167969 "
              fill="none"
              stroke="#ffffff"
              stroke-width="50"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="writing-path"
            />
          </g>
        </svg>
      </div>
    </main>

    <!-- Bottom Minimal Spacing -->
    <footer class="w-full pb-8 px-8 flex justify-center items-center z-10 h-6"></footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['loading-complete']);

const path1Ref = ref(null);
const path2Ref = ref(null);
const isExiting = ref(false);

let animTimeout1 = null;
let exitTimeout = null;
let anim2Instance = null;

const triggerExit = () => {
  if (isExiting.value) return;
  isExiting.value = true;
  if (animTimeout1) clearTimeout(animTimeout1);
  if (exitTimeout) clearTimeout(exitTimeout);

  // Smooth slide-up transition duration
  setTimeout(() => {
    emit('loading-complete');
  }, 750);
};

onMounted(() => {
  const p1 = path1Ref.value;
  const p2 = path2Ref.value;

  if (p1 && p2) {
    const len1 = p1.getTotalLength();
    const len2 = p2.getTotalLength();

    // Set initial dasharray & full offset (hidden)
    p1.style.strokeDasharray = `${len1} ${len1}`;
    p1.style.strokeDashoffset = `${len1}`;
    p2.style.strokeDasharray = `${len2} ${len2}`;
    p2.style.strokeDashoffset = `${len2}`;

    // Force layout reflow
    p1.getBoundingClientRect();

    // Animate Path 1: Initial 'h' stroke (~1050ms)
    p1.animate([
      { strokeDashoffset: len1 },
      { strokeDashoffset: 0 }
    ], {
      duration: 1050,
      easing: 'cubic-bezier(0.45, 0, 0.2, 1)',
      fill: 'forwards'
    });

    // Animate Path 2: Starts gracefully as p1 finishes for continuous handwriting flow (~2500ms)
    animTimeout1 = setTimeout(() => {
      anim2Instance = p2.animate([
        { strokeDashoffset: len2 },
        { strokeDashoffset: 0 }
      ], {
        duration: 2500,
        easing: 'cubic-bezier(0.35, 0.1, 0.25, 1)',
        fill: 'forwards'
      });

      // ONLY after the full handwriting animation has 100% finished drawing:
      anim2Instance.onfinish = () => {
        // Linger briefly (600ms) on the completed cursive signature before entering
        exitTimeout = setTimeout(() => {
          triggerExit();
        }, 600);
      };
    }, 850);

    // Safe maximum guard timeout ensuring screen is never stuck
    exitTimeout = setTimeout(() => {
      triggerExit();
    }, 4500);
  } else {
    // Fallback safe exit
    exitTimeout = setTimeout(() => {
      triggerExit();
    }, 3000);
  }
});

onUnmounted(() => {
  if (animTimeout1) clearTimeout(animTimeout1);
  if (exitTimeout) clearTimeout(exitTimeout);
  if (anim2Instance) {
    anim2Instance.onfinish = null;
  }
});
</script>

<style scoped>
.hello-loader {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  will-change: transform, opacity;
}

.writing-path {
  will-change: stroke-dashoffset;
}

/* Premium Apple-style exit: smooth upward slide */
.hello-loader-exit {
  transform: translateY(-100%) !important;
  opacity: 0.95;
  transition: transform 0.75s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.75s ease !important;
}
</style>

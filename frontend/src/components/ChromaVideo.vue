<template>
  <div class="chroma-video-container relative w-full h-full flex items-center justify-center overflow-hidden">
    <!-- Hidden video element -->
    <video
      ref="videoRef"
      :src="src"
      autoplay
      loop
      muted
      playsinline
      preload="auto"
      crossorigin="anonymous"
      class="absolute pointer-events-none opacity-0 w-0 h-0"
      @play="startRendering"
      @loadeddata="onDataLoaded"
      @loadedmetadata="onMetadataLoaded"
    ></video>
    <!-- Canvas element showing the keyed video -->
    <canvas
      ref="canvasRef"
      :class="['w-full h-full block', canvasClass]"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  tolerance: {
    type: Number,
    default: 45 // Distance tolerance
  },
  smoothness: {
    type: Number,
    default: 25 // Edge feathering range
  },
  zoom: {
    type: Number,
    default: 1.0 // Zoom level
  },
  chromaColor: {
    type: String,
    default: 'green' // 'green', 'black', 'auto', 'none'
  },
  canvasClass: {
    type: String,
    default: 'object-cover'
  },
  maxResolution: {
    type: Number,
    default: 540 // Crisp high-definition target cap
  },
  despill: {
    type: Boolean,
    default: true // Remove green spill along edges
  }
});

const emit = defineEmits(['loaded', 'playing', 'error']);

const videoRef = ref(null);
const canvasRef = ref(null);
let animationFrameId = null;
let observer = null;
const isVisible = ref(true);
const isReady = ref(false);

const onMetadataLoaded = () => {
  isReady.value = true;
  emit('loaded');
  startRendering();
};

const onDataLoaded = () => {
  if (videoRef.value && videoRef.value.paused) {
    videoRef.value.play().catch(() => {});
  }
  startRendering();
};

const startRendering = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  const video = videoRef.value;
  const canvas = canvasRef.value;
  if (!video || !canvas || !isVisible.value) return;

  const ctx = canvas.getContext('2d', { willReadFrequently: true, alpha: true });
  const maxRes = props.maxResolution || 540;

  const renderFrame = () => {
    if (!isVisible.value) return;

    if (!video || video.paused || video.ended || video.readyState < 2) {
      animationFrameId = requestAnimationFrame(renderFrame);
      return;
    }

    // Adapt canvas size to match video aspect ratio with high-definition cap
    if (video.videoWidth > 0 && video.videoHeight > 0) {
      let targetWidth = video.videoWidth;
      let targetHeight = video.videoHeight;
      const aspect = targetWidth / targetHeight;

      if (targetWidth > maxRes || targetHeight > maxRes) {
        if (targetWidth >= targetHeight) {
          targetWidth = maxRes;
          targetHeight = Math.round(maxRes / aspect);
        } else {
          targetHeight = maxRes;
          targetWidth = Math.round(maxRes * aspect);
        }
      }

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }
    }

    if (canvas.width > 0 && canvas.height > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const z = props.zoom;
      if (z !== 1.0) {
        const w = canvas.width * z;
        const h = canvas.height * z;
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) * 0.45;
        ctx.drawImage(video, x, y, w, h);
      } else {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      if (props.chromaColor !== 'none') {
        try {
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;
          const length = data.length;
          const mode = props.chromaColor;
          const tol = props.tolerance;
          const smooth = props.smoothness;
          const shouldDespill = props.despill;

          if (mode === 'green') {
            for (let i = 0; i < length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];

              // Green screen delta metric
              const maxRB = (r > b ? r : b);
              const greenDelta = g - maxRB;

              if (greenDelta > tol) {
                // Fully green background
                data[i + 3] = 0;
              } else if (greenDelta > tol - smooth) {
                // Soft edge blend
                const factor = (tol - greenDelta) / smooth;
                data[i + 3] = Math.round(data[i + 3] * Math.max(0, Math.min(1, factor)));
                if (shouldDespill && g > maxRB) {
                  data[i + 1] = Math.round(maxRB * 0.95 + g * 0.05);
                }
              } else if (shouldDespill && g > maxRB * 1.05) {
                // Despill subtle green bounce reflections on hair/edges
                data[i + 1] = Math.round((r + b) * 0.52);
              }
            }
          } else if (mode === 'black') {
            const tolSquared = tol * tol;
            const outerTolSquared = (tol + smooth) * (tol + smooth);
            for (let i = 0; i < length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              const distSq = r * r + g * g + b * b;

              if (distSq < tolSquared) {
                data[i + 3] = 0;
              } else if (distSq < outerTolSquared) {
                const dist = Math.sqrt(distSq);
                const alphaRatio = (dist - tol) / smooth;
                data[i + 3] = Math.round(data[i + 3] * alphaRatio);
              }
            }
          }

          ctx.putImageData(imgData, 0, 0);
        } catch (e) {
          // Fallback if cross-origin canvas security prevents reading
        }
      }
    }

    animationFrameId = requestAnimationFrame(renderFrame);
  };

  renderFrame();
};

onMounted(() => {
  const video = videoRef.value;
  const canvas = canvasRef.value;

  const ensurePlay = () => {
    if (video && isVisible.value) {
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  if (video) {
    ensurePlay();
    video.addEventListener('ended', ensurePlay);
    video.addEventListener('pause', () => {
      if (isVisible.value) {
        setTimeout(ensurePlay, 100);
      }
    });
  }

  // Handle visibility and mobile touch wakeups
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      ensurePlay();
      startRendering();
    }
  };
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // User interaction resume trigger
  const handleUserInteraction = () => {
    ensurePlay();
  };
  window.addEventListener('touchstart', handleUserInteraction, { passive: true });
  window.addEventListener('click', handleUserInteraction, { passive: true });

  if (canvas && typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      isVisible.value = entry.isIntersecting;

      if (entry.isIntersecting) {
        ensurePlay();
        startRendering();
      } else {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      }
    }, { threshold: 0.05 });

    observer.observe(canvas);
  } else {
    startRendering();
  }
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  if (observer) {
    observer.disconnect();
  }
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  window.removeEventListener('touchstart', handleUserInteraction);
  window.removeEventListener('click', handleUserInteraction);
});

watch(() => props.src, () => {
  if (videoRef.value) {
    videoRef.value.load();
    videoRef.value.play().catch(() => {});
  }
});
</script>

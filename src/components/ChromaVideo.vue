<template>
  <div class="chroma-video-container relative w-full h-full flex items-center justify-center">
    <!-- Hidden video element -->
    <video
      ref="videoRef"
      :src="src"
      autoplay
      loop
      muted
      playsinline
      preload="auto"
      class="absolute pointer-events-none opacity-0 w-0 h-0"
      @play="startRendering"
      @loadedmetadata="onMetadataLoaded"
    ></video>
    <!-- Canvas element showing the keyed video -->
    <canvas
      ref="canvasRef"
      :class="['w-full h-full', canvasClass]"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  tolerance: {
    type: Number,
    default: 50 // Color distance tolerance
  },
  zoom: {
    type: Number,
    default: 1.0 // Zoom level (CSS scale)
  },
  chromaColor: {
    type: String,
    default: 'black' // 'black', 'green', or 'auto'
  },
  canvasClass: {
    type: String,
    default: 'object-cover rounded-full'
  }
});

const videoRef = ref(null);
const canvasRef = ref(null);
let animationFrameId = null;
let observer = null;
const isVisible = ref(true);

// Target background color to remove
let bgR = null;
let bgG = null;
let bgB = null;

const onMetadataLoaded = () => {
  startRendering();
};

const startRendering = () => {
  // Prevent duplicate rendering loops
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  const video = videoRef.value;
  const canvas = canvasRef.value;
  if (!video || !canvas || !isVisible.value) return;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  
  const maxResolution = 256; // High performance target resolution cap

  let lastFrameTime = 0;
  const fpsLimit = 24; // Throttling to 24fps for cinematic feel and MASSIVE performance gains
  const frameInterval = 1000 / fpsLimit;

  const renderFrame = () => {
    if (!isVisible.value) return;

    if (!video || video.paused || video.ended) {
      animationFrameId = requestAnimationFrame(renderFrame);
      return;
    }

    const now = performance.now();
    const elapsed = now - lastFrameTime;

    if (elapsed < frameInterval) {
      animationFrameId = requestAnimationFrame(renderFrame);
      return;
    }
    
    lastFrameTime = now - (elapsed % frameInterval);

    // Set canvas sizes with resolution constraint
    if (canvas.width === 0 || canvas.height === 0 || canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        let targetWidth = video.videoWidth;
        let targetHeight = video.videoHeight;
        
        // Cap the canvas resolution to drastically reduce CPU/pixel-loop calculations
        if (targetWidth > maxResolution || targetHeight > maxResolution) {
          const aspect = targetWidth / targetHeight;
          if (targetWidth > targetHeight) {
            targetWidth = maxResolution;
            targetHeight = Math.round(maxResolution / aspect);
          } else {
            targetHeight = maxResolution;
            targetWidth = Math.round(maxResolution * aspect);
          }
        }
        
        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
          canvas.width = targetWidth;
          canvas.height = targetHeight;
        }
      }
    }

    if (canvas.width > 0 && canvas.height > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const z = props.zoom;
      if (z !== 1.0) {
        const w = canvas.width * z;
        const h = canvas.height * z;
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;
        ctx.drawImage(video, x, y, w, h);
      } else {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
      
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const length = data.length;

        // Determine background color key values if not yet initialized
        if (bgR === null) {
          if (props.chromaColor === 'black') {
            bgR = 0;
            bgG = 0;
            bgB = 0;
          } else if (props.chromaColor === 'green') {
            bgR = 0;
            bgG = 255;
            bgB = 0;
          } else {
            // Auto-detect background color from the top-left pixel on the first frame
            if (length > 0) {
              bgR = data[0];
              bgG = data[1];
              bgB = data[2];

              // If green color is dominant, optimize as a green-screen chroma keyer
              if (bgG > 100 && bgG > bgR * 1.2 && bgG > bgB * 1.2) {
                bgR = 0;
                bgG = 255;
                bgB = 0;
              }
            }
          }
        }

        const tol = props.tolerance;
        const tolSquared = tol * tol;
        const outerTolSquared = (tol + 20) * (tol + 20);

        for (let i = 0; i < length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          let distanceSquared;
          if (bgR === 0 && bgG === 255 && bgB === 0) {
            // Green screen mode: check green dominance
            const isGreen = g > 85 && g > r * 1.1 && g > b * 1.1;
            distanceSquared = isGreen ? 0 : 65025; // 255 squared
          } else {
            // Squared Euclidean distance in color space (avoids Math.sqrt)
            distanceSquared = (r - bgR) * (r - bgR) + (g - bgG) * (g - bgG) + (b - bgB) * (b - bgB);
          }

          if (distanceSquared < tolSquared) {
            data[i + 3] = 0; // Make pixel transparent
          } else if (distanceSquared < outerTolSquared) {
            // Only calculate square root for boundary pixels in the feathering range
            const distance = Math.sqrt(distanceSquared);
            const alphaRatio = (distance - tol) / 20;
            data[i + 3] = Math.round(data[i + 3] * alphaRatio);
          }
        }

        ctx.putImageData(imgData, 0, 0);
      } catch (e) {
        // Handle security exceptions when loading cross-origin sources
      }
    }

    animationFrameId = requestAnimationFrame(renderFrame);
  };

  renderFrame();
};

onMounted(() => {
  const video = videoRef.value;
  const canvas = canvasRef.value;
  
  if (video) {
    video.play().catch(() => {});
  }

  // Setup IntersectionObserver to pause processing when video is offscreen
  if (canvas && typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      isVisible.value = entry.isIntersecting;
      
      if (entry.isIntersecting) {
        if (video && video.paused) {
          video.play().catch(() => {});
        }
        startRendering();
      } else {
        if (video && !video.paused) {
          video.pause();
        }
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      }
    }, { threshold: 0.05 });
    
    observer.observe(canvas);
  } else {
    // Fallback if IntersectionObserver is not supported
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
});
</script>

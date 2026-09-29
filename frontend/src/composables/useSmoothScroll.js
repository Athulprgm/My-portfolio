import { ref, onMounted, onUnmounted } from 'vue';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let lenisInstance = null;
let rafId = null;
const scrollCallbacks = new Set();

const currentScroll = ref(0);
const scrollVelocity = ref(0);

function initLenis() {
  if (typeof window === 'undefined' || lenisInstance) return;

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  lenisInstance = new Lenis({
    duration: 1.05, // Silky, responsive momentum glide
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential deceleration curve
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0, // Standard 1.0 multiplier for natural scrolling pace
    touchMultiplier: 1.4,
    infinite: false,
  });

  lenisInstance.on('scroll', (e) => {
    currentScroll.value = e.scroll;
    scrollVelocity.value = e.velocity;

    for (const cb of scrollCallbacks) {
      cb(e);
    }
  });

  function raf(time) {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);
}

export function useSmoothScroll() {
  const registerScrollCallback = (fn) => {
    scrollCallbacks.add(fn);
    return () => scrollCallbacks.delete(fn);
  };

  const scrollTo = (target, options = {}) => {
    const { offset = -75, duration = 1.15, immediate = false } = options;

    if (lenisInstance) {
      lenisInstance.scrollTo(target, {
        offset,
        duration: immediate ? 0 : duration,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
      }
    }
  };

  onMounted(() => {
    if (!lenisInstance) {
      initLenis();
    }
  });

  return {
    lenis: lenisInstance,
    currentScroll,
    scrollVelocity,
    registerScrollCallback,
    scrollTo,
  };
}

export { lenisInstance };

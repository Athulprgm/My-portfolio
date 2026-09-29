import { onMounted, onUnmounted, nextTick } from 'vue';

let globalObserver = null;
const observedElements = new WeakSet();

function animateCounter(el) {
  const targetStr = el.getAttribute('data-count-to');
  if (!targetStr) return;

  const prefix = el.getAttribute('data-count-prefix') || '';
  const suffix = el.getAttribute('data-count-suffix') || '';
  const target = parseFloat(targetStr);
  const isDecimal = targetStr.includes('.');
  const duration = 1600; // ms
  const startTime = performance.now();

  function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

  function frame(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const eased = easeOutExpo(progress);
    const current = eased * target;

    if (isDecimal) {
      el.textContent = `${prefix}${current.toFixed(1)}${suffix}`;
    } else {
      el.textContent = `${prefix}${Math.round(current)}${suffix}`;
    }

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      el.textContent = `${prefix}${targetStr}${suffix}`;
    }
  }

  requestAnimationFrame(frame);
}

function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.classList.add('is-revealed');

      // Check if element or child has data-count-to
      if (el.hasAttribute('data-count-to')) {
        animateCounter(el);
      } else {
        const counters = el.querySelectorAll('[data-count-to]');
        counters.forEach(animateCounter);
      }

      observer.unobserve(el);
    }
  });
}

function initObserver() {
  if (typeof window === 'undefined') return null;

  if (!globalObserver) {
    globalObserver = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
    });
  }

  return globalObserver;
}

export function useScrollReveal() {
  const scanAndObserve = () => {
    if (typeof document === 'undefined') return;
    const observer = initObserver();
    if (!observer) return;

    const elements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-scale, .scroll-reveal-line, [data-scroll-reveal]'
    );

    elements.forEach((el) => {
      if (!observedElements.has(el)) {
        observedElements.add(el);
        observer.observe(el);
      }
    });
  };

  onMounted(() => {
    nextTick(() => {
      setTimeout(scanAndObserve, 80);
    });
  });

  return {
    scanAndObserve,
  };
}

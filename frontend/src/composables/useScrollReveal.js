import { onMounted, nextTick } from 'vue';

let globalObserver = null;
const observedElements = new WeakSet();
const animatedCounters = new WeakSet();

function setFinalCounterValue(el) {
  const targetStr = el.getAttribute('data-count-to');
  if (!targetStr) return;
  const prefix = el.getAttribute('data-count-prefix') || '';
  const suffix = el.getAttribute('data-count-suffix') || '';
  el.textContent = `${prefix}${targetStr}${suffix}`;
}

function animateCounter(el) {
  if (animatedCounters.has(el)) return;
  animatedCounters.add(el);

  const targetStr = el.getAttribute('data-count-to');
  if (!targetStr) return;

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    setFinalCounterValue(el);
    return;
  }

  const prefix = el.getAttribute('data-count-prefix') || '';
  const suffix = el.getAttribute('data-count-suffix') || '';
  const target = parseFloat(targetStr);
  const isDecimal = targetStr.includes('.');
  const duration = 1500;
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

function revealElement(el) {
  el.classList.add('is-revealed');

  if (el.hasAttribute('data-count-to')) {
    animateCounter(el);
  } else {
    const counters = el.querySelectorAll('[data-count-to]');
    counters.forEach(animateCounter);
  }
}

function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      revealElement(el);
      observer.unobserve(el);
    }
  });
}

function initObserver() {
  if (typeof window === 'undefined') return null;

  if (!globalObserver) {
    globalObserver = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px 0px -30px 0px',
      threshold: 0.05,
    });
  }

  return globalObserver;
}

export function useScrollReveal() {
  const scanAndObserve = () => {
    if (typeof document === 'undefined') return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const elements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-scale, .scroll-reveal-line, [data-scroll-reveal], [data-count-to]'
    );

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => revealElement(el));
      return;
    }

    const observer = initObserver();
    if (!observer) return;

    elements.forEach((el) => {
      if (!observedElements.has(el)) {
        observedElements.add(el);
        const rect = el.getBoundingClientRect();
        // Immediately reveal items already within the current viewport
        if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
          revealElement(el);
        } else {
          observer.observe(el);
        }
      }
    });
  };

  onMounted(() => {
    nextTick(() => {
      setTimeout(scanAndObserve, 60);
    });
  });

  return {
    scanAndObserve,
  };
}

import { ref, onMounted, onUnmounted } from 'vue';
import { useSmoothScroll } from './useSmoothScroll';

export function useScrollOverlay() {
  const heroStyle = ref({});
  const workInnerStyle = ref({});
  const identityInnerStyle = ref({});
  const techInnerStyle = ref({});
  const contactInnerStyle = ref({});

  // Element refs to attach to sections
  const heroTrackRef = ref(null);
  const workRef = ref(null);
  const identityRef = ref(null);
  const stackRef = ref(null);
  const contactRef = ref(null);

  const { registerScrollCallback } = useSmoothScroll();
  let unregisterLenis = null;

  // Cached positions to prevent layout thrashing (0 forced reflows during scroll)
  let vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  let cachedOffsets = {
    work: 0,
    identity: 0,
    stack: 0,
    contact: 0,
  };

  const measureOffsets = () => {
    if (typeof window === 'undefined') return;
    vh = window.innerHeight;

    const getTop = (el) => {
      if (!el) return 0;
      let top = 0;
      let curr = el;
      while (curr) {
        top += curr.offsetTop || 0;
        curr = curr.offsetParent;
      }
      return top;
    };

    cachedOffsets = {
      work: getTop(workRef.value),
      identity: getTop(identityRef.value),
      stack: getTop(stackRef.value),
      contact: getTop(contactRef.value),
    };
  };

  const updateTransforms = (scrollY = window.scrollY) => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      heroStyle.value = {};
      workInnerStyle.value = {};
      identityInnerStyle.value = {};
      techInnerStyle.value = {};
      contactInnerStyle.value = {};
      return;
    }

    // ── 1. Hero Zoom & Recede (100% GPU-accelerated: translate3d + scale + opacity) ──
    const heroPinDistance = vh * 0.45;
    const heroProgress = Math.min(Math.max(scrollY / heroPinDistance, 0), 1);
    const easedHeroP = heroProgress * heroProgress * (3 - 2 * heroProgress);

    const heroScale = (1 - easedHeroP * 0.12).toFixed(4);
    const heroOpacity = (1 - easedHeroP * 0.45).toFixed(3);
    const heroTranslateY = (easedHeroP * 24).toFixed(1);

    heroStyle.value = {
      transform: `translate3d(0, ${heroTranslateY}px, 0) scale(${heroScale})`,
      opacity: heroOpacity,
      willChange: 'transform, opacity',
    };

    // ── 2. Helper for Stacked Sheet Zoom Transitions (Calculated via Cached Offsets) ──
    const computeSectionStyle = (el, thisTop, nextTop) => {
      if (!el || !thisTop) return {};

      const rectTop = thisTop - scrollY;

      // Enter Progress: as sheet top moves from vh to 0
      let enterProgress = 1;
      if (rectTop > 0) {
        enterProgress = Math.max(0, Math.min(1, 1 - (rectTop / vh)));
      }
      const enterScale = 0.95 + 0.05 * enterProgress;
      const enterOpacity = 0.72 + 0.28 * enterProgress;

      // Exit Progress: as the next sheet slides over this sheet
      let exitProgress = 0;
      if (nextTop) {
        const nextRectTop = nextTop - scrollY;
        if (nextRectTop < vh) {
          exitProgress = Math.max(0, Math.min(1, (vh - nextRectTop) / (vh * 0.65)));
        }
      }

      const exitScale = 1 - exitProgress * 0.05;
      const exitOpacity = 1 - exitProgress * 0.25;
      const translateY = (exitProgress * -14).toFixed(1);

      const finalScale = (enterScale * exitScale).toFixed(4);
      const finalOpacity = (enterOpacity * exitOpacity).toFixed(3);

      return {
        transform: `translate3d(0, ${translateY}px, 0) scale(${finalScale})`,
        opacity: finalOpacity,
        willChange: 'transform, opacity',
      };
    };

    workInnerStyle.value = computeSectionStyle(workRef.value, cachedOffsets.work, cachedOffsets.identity);
    identityInnerStyle.value = computeSectionStyle(identityRef.value, cachedOffsets.identity, cachedOffsets.stack);
    techInnerStyle.value = computeSectionStyle(stackRef.value, cachedOffsets.stack, cachedOffsets.contact);
    contactInnerStyle.value = computeSectionStyle(contactRef.value, cachedOffsets.contact, 0);
  };

  const onScroll = () => {
    updateTransforms(window.scrollY);
  };

  const onResize = () => {
    measureOffsets();
    updateTransforms(window.scrollY);
  };

  onMounted(() => {
    setTimeout(() => {
      measureOffsets();
      updateTransforms(window.scrollY);
    }, 50);

    // Prefer Lenis high-precision 60fps momentum ticker
    unregisterLenis = registerScrollCallback((e) => {
      updateTransforms(e.scroll);
    });

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
  });

  onUnmounted(() => {
    if (unregisterLenis) unregisterLenis();
    window.removeEventListener('resize', onResize);
    window.removeEventListener('scroll', onScroll);
  });

  return {
    heroStyle,
    workInnerStyle,
    identityInnerStyle,
    techInnerStyle,
    contactInnerStyle,
    heroTrackRef,
    workRef,
    identityRef,
    stackRef,
    contactRef,
    updateTransforms,
    measureOffsets,
  };
}

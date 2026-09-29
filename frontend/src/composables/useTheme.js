import { ref } from 'vue';

const theme = ref('light'); // 'light' | 'dark'
let transitionTimer = null;

const triggerSmoothTransition = () => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.add('theme-transitioning');
  if (transitionTimer) clearTimeout(transitionTimer);
  transitionTimer = setTimeout(() => {
    root.classList.remove('theme-transitioning');
  }, 950);
};

const applyTheme = (val) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (val === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';
  }
  try {
    localStorage.setItem('worth_theme', val);
  } catch (e) {}
};

const initTheme = () => {
  if (typeof window === 'undefined') return;
  try {
    const saved = localStorage.getItem('worth_theme');
    if (saved === 'dark' || saved === 'light') {
      theme.value = saved;
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme.value = prefersDark ? 'dark' : 'light';
    }
  } catch (e) {
    theme.value = 'light';
  }
  applyTheme(theme.value);
};

// Immediately synchronize upon module load
if (typeof window !== 'undefined') {
  initTheme();
}

export function useTheme() {
  const toggleTheme = (event) => {
    const next = theme.value === 'light' ? 'dark' : 'light';

    // Check for native View Transitions API support (modern Chromium/Safari 18+)
    const canViewTransition =
      typeof document !== 'undefined' &&
      document.startViewTransition &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canViewTransition) {
      triggerSmoothTransition();
      theme.value = next;
      applyTheme(next);
      return;
    }

    // Circular ripple transition originating from click location
    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      theme.value = next;
      applyTheme(next);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath
        },
        {
          duration: 950,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    });
  };

  const setDark = () => {
    triggerSmoothTransition();
    theme.value = 'dark';
    applyTheme('dark');
  };

  const setLight = () => {
    triggerSmoothTransition();
    theme.value = 'light';
    applyTheme('light');
  };

  return {
    theme,
    toggleTheme,
    setDark,
    setLight,
    initTheme,
  };
}

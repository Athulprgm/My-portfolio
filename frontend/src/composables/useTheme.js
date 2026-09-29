import { ref } from 'vue';

const theme = ref('light'); // 'light' | 'dark'

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
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    applyTheme(theme.value);
  };

  const setDark = () => {
    theme.value = 'dark';
    applyTheme('dark');
  };

  const setLight = () => {
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

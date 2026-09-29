import { ref, watch, onMounted } from 'vue';

const theme = ref('light'); // 'light' | 'dark'

export function useTheme() {
  const initTheme = () => {
    const saved = localStorage.getItem('worth_theme');
    if (saved === 'dark' || saved === 'light') {
      theme.value = saved;
    } else {
      // Default to light as per Worth Agency signature, or system preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme.value = prefersDark ? 'dark' : 'light';
    }
    applyTheme(theme.value);
  };

  const applyTheme = (val) => {
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
    localStorage.setItem('worth_theme', val);
  };

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

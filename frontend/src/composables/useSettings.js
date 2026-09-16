import { ref } from 'vue';
import apiClient from '../utils/api';

let _cachedSettings = null;
let _fetchSettingsPromise = null;

const settings = ref(_cachedSettings || {
  experience_years: '3+ Yrs',
  shipped_works: '15+',
  uptime_focus: '100%',
  role_phrases: [
    'full-stack web applications with Laravel, PHP & Node.js',
    'clean, fast frontend interfaces with React, Next.js & Vue.js',
    'cross-platform mobile applications with Flutter & Firebase',
    'robust database design, REST APIs & cloud hosting',
  ],
  bio_tagline: 'Co-Founder & Full-Stack Developer',
  quests_cleared: '15+',
  time_played: '3+ Yrs',
});

const loadingSettings = ref(false);
const settingsError = ref(null);

export function useSettings() {
  const fetchSettings = async (force = false) => {
    if (_cachedSettings && !force) {
      settings.value = _cachedSettings;
      return settings.value;
    }

    if (_fetchSettingsPromise && !force) {
      await _fetchSettingsPromise;
      return settings.value;
    }

    loadingSettings.value = true;
    settingsError.value = null;

    _fetchSettingsPromise = apiClient
      .get('/settings')
      .then((res) => {
        _cachedSettings = res.data;
        settings.value = res.data;
        return res.data;
      })
      .catch((err) => {
        console.error('[useSettings] Fetch failed:', err);
        settingsError.value = err.message;
      })
      .finally(() => {
        loadingSettings.value = false;
        _fetchSettingsPromise = null;
      });

    return _fetchSettingsPromise;
  };

  const updateSettings = async (payload) => {
    loadingSettings.value = true;
    settingsError.value = null;
    try {
      const res = await apiClient.post('/admin/settings', payload);
      _cachedSettings = res.data;
      settings.value = res.data;
      return res.data;
    } catch (err) {
      console.error('[useSettings] Update failed:', err);
      settingsError.value = err.message;
      throw err;
    } finally {
      loadingSettings.value = false;
    }
  };

  return {
    settings,
    loadingSettings,
    settingsError,
    fetchSettings,
    updateSettings,
  };
}

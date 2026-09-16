import { ref } from 'vue';
import apiClient from '../utils/api';

let _cachedSettings = null;
let _fetchSettingsPromise = null;

const settings = ref(_cachedSettings || {
  experience_years: '03+',
  shipped_works: '15+',
  uptime_focus: '99.9%',
  role_phrases: [
    'modern React & Vue web applications styled with Tailwind CSS',
    'high-performance PHP & Laravel backends with SQL databases',
    'scalable cloud architectures & distributed APIs',
    'end-to-end full stack platforms with 99.9% uptime',
  ],
  bio_tagline: 'Co-Founder & Full-Stack Architect',
  quests_cleared: '10+',
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

import { ref, computed } from 'vue';
import apiClient from '../utils/api';

export const DEFAULT_ROLE_TITLE = 'AI software engineer';

let _cachedSettings = null;
let _fetchSettingsPromise = null;

const settings = ref(_cachedSettings || {
  experience_years: '3+ Yrs',
  shipped_works: '15+',
  uptime_focus: '100%',
  role_phrases: [
    'AI-powered software systems, LLM workflows & intelligent agents',
    'full-stack web applications with Laravel, PHP & Node.js',
    'clean, fast frontend interfaces with React, Next.js & Vue.js',
    'robust APIs, vector & relational databases, and cloud infrastructure',
  ],
  bio_tagline: DEFAULT_ROLE_TITLE,
  quests_cleared: '15+',
  time_played: '3+ Yrs',
});

const loadingSettings = ref(false);
const settingsError = ref(null);

const getIndefiniteArticle = (phrase) => {
  if (/^(ai|ml|llm|nlp|r&d|sql|sre)\b/i.test(phrase)) return 'an';
  if (/^(u[bcfhjkqrst]|eu|uni|use|user|util)/i.test(phrase)) return 'a';
  return /^[aeiou]/i.test(phrase) ? 'an' : 'a';
};

export function useSettings() {
  const roleTitle = computed(() => {
    const raw = settings.value?.bio_tagline;
    return typeof raw === 'string' && raw.trim() ? raw.trim() : DEFAULT_ROLE_TITLE;
  });

  const includesCoFounder = computed(() => /co-?founder/i.test(roleTitle.value));

  const aboutRolePhrase = computed(() => {
    const title = roleTitle.value;
    const article = getIndefiniteArticle(title);
    if (includesCoFounder.value) {
      return /trawbit/i.test(title)
        ? `${article} ${title}.`
        : `${article} ${title} at Trawbit Technologies.`;
    }
    return `${article} ${title} and co-founder of Trawbit Technologies.`;
  });

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
    roleTitle,
    includesCoFounder,
    aboutRolePhrase,
    loadingSettings,
    settingsError,
    fetchSettings,
    updateSettings,
  };
}

/**
 * useProjects — fetches all projects (card data) from the Laravel API.
 * Results are cached in-memory so the grid doesn't re-fetch on back navigation.
 */
import { ref } from 'vue';
import apiClient, { getImageUrl } from '../utils/api';

export { getImageUrl };

// Module-level cache
let _cachedProjects = null;
let _fetchPromise   = null;

export function clearProjectsCache() {
  _cachedProjects = null;
}

const projectsCache = ref(null);
const loading       = ref(false);
const error         = ref(null);

export function useProjects() {
  const projects = ref(_cachedProjects ?? []);

  const fetchProjects = async () => {
    // Return from cache if available
    if (_cachedProjects) {
      projects.value = _cachedProjects;
      return;
    }

    // Deduplicate concurrent calls
    if (_fetchPromise) {
      await _fetchPromise;
      projects.value = _cachedProjects ?? [];
      return;
    }

    loading.value = true;
    error.value   = null;

    _fetchPromise = apiClient.get('/projects')
      .then((res) => {
        const data = res.data;
        _cachedProjects  = data;
        projects.value   = data;
        projectsCache.value = data;
      })
      .catch((err) => {
        console.error('[useProjects] fetch error:', err);
        error.value = err.response?.data?.message || err.message;
      })
      .finally(() => {
        loading.value = false;
        _fetchPromise = null;
      });

    await _fetchPromise;
  };

  return { projects, loading, error, fetchProjects };
}

/**
 * Fetch a single project by ID (with full detailData).
 */
export async function fetchProjectById(id) {
  const res = await apiClient.get(`/projects/${id}`);
  return res.data;
}


/**
 * useProjects — fetches all projects (card data) from the Laravel API.
 * Results are cached in-memory so the grid doesn't re-fetch on back navigation.
 */
import { ref } from 'vue';
import apiClient, { getImageUrl } from '../utils/api';

export { getImageUrl };

function decodeHtml(html) {
  if (!html) return '';
  if (typeof document !== 'undefined') {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }
  return html
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#039;/g, "'")
    .replace(/&#x27;/g, "'");
}

export function unpackDescription(descriptionRaw) {
  let unpacked = {};
  let description = descriptionRaw || '';
  if (descriptionRaw) {
    const decoded = decodeHtml(descriptionRaw);
    if (decoded.startsWith('{') || decoded.startsWith('[')) {
      try {
        unpacked = JSON.parse(decoded);
        description = unpacked.description || '';
      } catch (e) {
        console.warn('[useProjects] Truncated JSON payload detected in database. Applying recovery fallback.');
        // Fallback for truncated JSON: extract the description text using regex
        const match = decoded.match(/"description"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
        if (match) {
          description = match[1].replace(/\\"/g, '"');
        } else {
          description = 'System Log: Truncated project data in database.';
        }
      }
    } else {
      description = decoded;
    }
  }
  return { unpacked, description };
}


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

    _fetchPromise = apiClient.get('/products')
      .then((res) => {
        // API shape: { success, data: { data: [...], meta: {...} } }
        const rawList = res.data?.data?.data ?? res.data?.data ?? res.data ?? [];
        const data = rawList.map(item => {
          const { unpacked, description } = unpackDescription(item.description);

          return {
            ...item,
            title: item.title || item.name || '',
            description: description,
            image: unpacked.image || item.image || [],
            thumbnail: unpacked.thumbnail || item.thumbnail || '',
            tags: unpacked.tags || (Array.isArray(item.tags) ? item.tags : (typeof item.tags === 'string' ? JSON.parse(item.tags) : [])),
            hasDetails: unpacked.has_details !== undefined ? !!unpacked.has_details : (item.hasDetails !== undefined ? !!item.hasDetails : (item.has_details !== undefined ? !!item.has_details : true)),
            sort_order: unpacked.sort_order !== undefined ? unpacked.sort_order : (item.sort_order ?? 0),
            detailData: unpacked.detailData || item.detailData || item.detail_data || {}
          };
        });
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
  const res = await apiClient.get(`/products/${id}`);
  const item = res.data?.data ?? res.data;
  if (!item) return null;

  const { unpacked, description } = unpackDescription(item.description);

  return {
    ...item,
    title: item.title || item.name || '',
    description: description,
    image: unpacked.image || item.image || [],
    thumbnail: unpacked.thumbnail || item.thumbnail || '',
    tags: unpacked.tags || (Array.isArray(item.tags) ? item.tags : (typeof item.tags === 'string' ? JSON.parse(item.tags) : [])),
    hasDetails: unpacked.has_details !== undefined ? !!unpacked.has_details : (item.hasDetails !== undefined ? !!item.hasDetails : (item.has_details !== undefined ? !!item.has_details : true)),
    sort_order: unpacked.sort_order !== undefined ? unpacked.sort_order : (item.sort_order ?? 0),
    detailData: unpacked.detailData || item.detailData || item.detail_data || {}
  };
}


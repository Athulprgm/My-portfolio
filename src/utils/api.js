import axios from 'axios';

// Resolve environment variables and fallbacks
const isProd = import.meta.env.PROD;
const rawEnvUrl = import.meta.env.VITE_API_URL;

// The real hosted backend root — always used for building image/storage URLs.
// In dev we cannot use a relative path for images because they are served
// from api.athul.online, not from localhost.
const getRealBackendRoot = () => {
  if (rawEnvUrl) {
    const base = rawEnvUrl.replace(/\/$/, '');
    return base.endsWith('/api') ? base.slice(0, -4) : base;
  }
  return 'https://api.athul.online';
};

const realBackendRoot = getRealBackendRoot();

// In DEV mode use a relative '/api' path so the Vite proxy tunnels the request
// server-side — this avoids CORS preflight blocks on the X-Admin-Key header.
// In production the full absolute URL is used directly.
const getNormalizedApiUrl = () => {
  if (!isProd) {
    return '/api'; // proxied by vite.config.js → https://api.athul.online/api
  }
  return `${realBackendRoot}/api`;
};

const apiBaseUrl = getNormalizedApiUrl();

// Create the production-grade Axios client
const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000, // 15 seconds — generous for a shared/hosted backend
  headers: {
    'Accept': 'application/json',
  },
});

// Retry only genuine 5xx server errors (not timeouts / connection drops)
apiClient.defaults.retry = 2;
apiClient.defaults.retryDelay = 500;

// Request Interceptor: Inject Admin Key on every request.
// The backend uses X-Admin-Key to route requests to the appropriate handler;
// sending it on reads allows the server to return admin-level data if needed.
apiClient.interceptors.request.use(
  (config) => {
    // If sending FormData, delete Content-Type to let browser/Axios set it with correct boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    // Inject admin key if available — backend ignores it if not needed.
    if (!config.headers['X-Admin-Key']) {
      const adminKey = sessionStorage.getItem('admin_key') || import.meta.env.VITE_ADMIN_KEY || '';
      if (adminKey) {
        config.headers['X-Admin-Key'] = adminKey;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Retries & Error Logging
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    // Reject immediately if no config or retry is disabled
    if (!config || config.retry === undefined) {
      return Promise.reject(error);
    }

    // ── Never retry these — they are permanent / connection-level failures ──
    const noRetryCode = ['ECONNABORTED', 'ECONNRESET', 'ECONNREFUSED', 'EPIPE'].includes(error.code);
    const isSocketHangUp = error.message?.toLowerCase().includes('socket hang up');
    const isTimeout = error.message?.toLowerCase().includes('timeout');
    if (noRetryCode || isSocketHangUp || isTimeout) {
      const url = config?.url ?? 'unknown';
      console.error(`[API Error] Connection failed (not retrying): ${error.message} — ${url}`);
      return Promise.reject(error);
    }

    // ── Log 401 clearly for debugging ──
    if (response?.status === 401) {
      console.error(`[API Error] 401 Unauthorized — ${config?.baseURL ?? ''}${config?.url ?? ''}. Check X-Admin-Key.`);
      return Promise.reject(error);
    }

    // ── Only retry genuine 5xx server errors ──
    const is5xxError = response && response.status >= 500;
    if (!is5xxError) {
      return Promise.reject(error);
    }

    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= config.retry) {
      console.error(`[API Error] Request failed after ${config.retry} retries:`, error.message);
      return Promise.reject(error);
    }

    config.__retryCount += 1;
    const backoffDelay = config.__retryCount * (config.retryDelay || 500);
    console.warn(
      `[API Warning] Server error ${response.status}. ` +
      `Retrying (${config.__retryCount}/${config.retry}) in ${backoffDelay}ms...`
    );

    await new Promise((resolve) => setTimeout(resolve, backoffDelay));
    return apiClient(config);
  }
);

/**
 * Gets the real backend root base URL (without '/api' suffix).
 * Always returns the absolute hosted URL — used to build storage image URLs.
 */
export function getApiBase() {
  return realBackendRoot;
}

export function getImageUrl(path, fallbackPath = '') {
  const isValid = (p) => {
    if (!p) return false;
    if (Array.isArray(p)) return p.length > 0 && isValid(p[0]);
    if (typeof p !== 'string') return false;
    const trimmed = p.trim();
    return trimmed !== '' && trimmed !== '[]' && trimmed !== '{}';
  };

  let resolvedPath = '';
  if (isValid(path)) {
    resolvedPath = Array.isArray(path) ? path[0] : path;
  } else if (isValid(fallbackPath)) {
    resolvedPath = Array.isArray(fallbackPath) ? fallbackPath[0] : fallbackPath;
  }

  if (!resolvedPath) {
    return '/360_F_541698271_tqSibLbJ2iPhcN8hrDy9cFDjbe98JYbQ.webp';
  }

  // Security: block javascript: URIs unconditionally
  if (resolvedPath.toLowerCase().startsWith('javascript:')) {
    return '/360_F_541698271_tqSibLbJ2iPhcN8hrDy9cFDjbe98JYbQ.webp';
  }

  // Already absolute, data URI, or blob URI
  // Only allow data: URIs that are images (block data:text/html etc.)
  if (resolvedPath.startsWith('http://') || resolvedPath.startsWith('https://') || resolvedPath.startsWith('blob:')) {
    return resolvedPath;
  }
  if (resolvedPath.startsWith('data:image/')) {
    return resolvedPath; // safe image data URI
  }
  if (resolvedPath.startsWith('data:')) {
    // Non-image data URI — block it
    return '/360_F_541698271_tqSibLbJ2iPhcN8hrDy9cFDjbe98JYbQ.webp';
  }

  const apiBase = getApiBase();
  
  // Format local storage path correctly
  if (resolvedPath.startsWith('/storage')) {
    return `${apiBase}${resolvedPath}`;
  }
  if (resolvedPath.startsWith('storage')) {
    return `${apiBase}/${resolvedPath}`;
  }

  // Any other relative path is assumed to be a frontend asset, so return as-is
  return resolvedPath.startsWith('/') ? resolvedPath : `/${resolvedPath}`;
}


export default apiClient;
